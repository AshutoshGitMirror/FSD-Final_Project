import { useState, useEffect } from 'react';
import { getUser, authFetch } from '../utils/auth';
import ReviewCard from '../components/ReviewCard';
import { backendUrl } from '../config/api';


const SpacedRepetitionPage = () => {
  const user = getUser();
  const [dueData, setDueData] = useState(null);
  const [stats, setStats] = useState(null);
  const [activeReview, setActiveReview] = useState(null);
  const [questionData, setQuestionData] = useState(null);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [tab, setTab] = useState('due');
  const [initializing, setInitializing] = useState(false);

  // Load due items and stats
  const loadData = async () => {
    try {
      const [due, s] = await Promise.all([
        authFetch(backendUrl('/api/spaced-repetition/due')).then(r => r.json()),
        authFetch(backendUrl('/api/spaced-repetition/stats')).then(r => r.json())
      ]);
      setDueData(due);
      setStats(s);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadData(); }, []);

  // Initialize SR concepts from the user's curriculum
  const initializeAllConcepts = async () => {
    setInitializing(true);
    try {
      // Fetch curriculum for this user's std/board
      const currRes = await authFetch(backendUrl(`/api/curriculum?std=${user?.std}&board=${user?.board}`));
      const curriculum = await currRes.json();

      // Init SR for every subject/chapter combo
      for (const subject of curriculum) {
        for (const chapter of (subject.chapters || [])) {
          await authFetch(backendUrl('/api/spaced-repetition/init'), {
            method: 'POST',
            body: JSON.stringify({
              subjectName: subject.subjectName,
              chapterName: chapter.chapterName
            })
          });
        }
      }

      // Reload data
      await loadData();
    } catch (err) {
      console.error('Init error:', err);
    }
    setInitializing(false);
  };

  // Start a review session for a concept
  const startReview = async (item) => {
    setActiveReview(item);
    setQuestionData(null);
    setLoadingQuestion(true);

    try {
      const res = await authFetch(backendUrl('/api/spaced-repetition/generate-question'), {
        method: 'POST',
        body: JSON.stringify({
          concept: item.concept,
          subjectName: item.subjectName,
          chapterName: item.chapterName
        })
      });
      const data = await res.json();
      setQuestionData(data);
    } catch (err) {
      console.error('Question gen error:', err);
      setQuestionData({ question: `Explain "${item.concept}" in your own words.`, type: 'open-ended' });
    }
    setLoadingQuestion(false);
  };

  // Rate a review
  const handleRate = async (quality) => {
    if (!activeReview) return;

    try {
      await authFetch(backendUrl('/api/spaced-repetition/review'), {
        method: 'POST',
        body: JSON.stringify({ conceptId: activeReview._id, quality })
      });

      // Refresh data
      const [due, s] = await Promise.all([
        authFetch(backendUrl('/api/spaced-repetition/due')).then(r => r.json()),
        authFetch(backendUrl('/api/spaced-repetition/stats')).then(r => r.json())
      ]);
      setDueData(due);
      setStats(s);
      setActiveReview(null);
      setQuestionData(null);
    } catch (err) {
      console.error('Review save error:', err);
    }
  };

  return (
    <div className="p-8 pb-24">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tight mb-2">🔄 Review Hub</h1>
          <p className="font-bold text-gray-500 text-sm">Spaced Repetition — AI-powered recall for lasting memory</p>
        </div>

        {/* Streak Badge */}
        {stats && (
          <div className="card-neo bg-neo-yellow p-4 text-center transform rotate-2">
            <span className="text-3xl block mb-1">🔥</span>
            <p className="font-black text-2xl">{stats.streak}</p>
            <p className="font-black uppercase text-xs">Day Streak</p>
          </div>
        )}
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 mb-8 border-b-4 border-black pb-4">
        <button
          onClick={() => setTab('due')}
          className={`border-4 border-black font-black uppercase px-6 py-3 transition-all ${tab === 'due' ? 'bg-neo-pink text-white shadow-neo -translate-y-0.5' : 'bg-white'}`}
        >
          📋 Due Reviews ({dueData?.totalDue || 0})
        </button>
        <button
          onClick={() => setTab('stats')}
          className={`border-4 border-black font-black uppercase px-6 py-3 transition-all ${tab === 'stats' ? 'bg-neo-blue shadow-neo -translate-y-0.5' : 'bg-white'}`}
        >
          📊 Mastery Stats
        </button>
      </div>

      {/* Active Review Session */}
      {activeReview && (
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black uppercase">Active Review</h2>
            <button
              onClick={() => { setActiveReview(null); setQuestionData(null); }}
              className="border-2 border-black px-3 py-1 font-bold text-sm hover:bg-gray-100"
            >
              ✕ Close
            </button>
          </div>
          <ReviewCard
            concept={activeReview.concept}
            chapter={activeReview.chapterName}
            subject={activeReview.subjectName}
            questionData={questionData}
            onRate={handleRate}
            loading={loadingQuestion}
          />
        </div>
      )}

      {/* Due Reviews Tab */}
      {tab === 'due' && !activeReview && (
        <div>
          {dueData?.totalDue > 0 ? (
            <div>
              <div className="card-neo bg-neo-yellow p-6 mb-8 transform -rotate-1">
                <span className="text-4xl mr-3">⏰</span>
                <span className="font-black text-xl">You have {dueData.totalDue} concept{dueData.totalDue > 1 ? 's' : ''} due for review!</span>
              </div>

              {Object.entries(dueData.bySubject || {}).map(([subject, items]) => (
                <div key={subject} className="mb-8">
                  <h3 className="font-black text-xl uppercase mb-4 bg-neo-pink text-white px-4 py-2 inline-block border-4 border-black">
                    {subject}
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((item) => {
                      const urgency = item.interval <= 1 ? 'border-red-500 bg-red-50' : item.interval <= 3 ? 'border-orange-400 bg-orange-50' : 'border-black bg-white';
                      return (
                        <div key={item._id} className={`card-neo ${urgency} p-5 hover:-translate-y-1 transition-all cursor-pointer`} onClick={() => startReview(item)}>
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-black text-base leading-tight">{item.concept}</h4>
                              <p className="font-bold text-xs text-gray-500 mt-1">{item.chapterName}</p>
                            </div>
                            <span className="text-2xl">{item.interval <= 1 ? '🔴' : item.interval <= 3 ? '🟡' : '🟢'}</span>
                          </div>
                          <div className="flex justify-between items-center border-t-2 border-black pt-2 mt-2">
                            <span className="text-xs font-bold text-gray-500">Rep: {item.repetitions}</span>
                            <span className="text-xs font-bold text-gray-500">EF: {item.easeFactor?.toFixed(1)}</span>
                            <button className="bg-neo-blue border-2 border-black px-3 py-1 font-black text-xs uppercase hover:shadow-neo">
                              Review →
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card-neo bg-green-100 p-12 text-center max-w-lg mx-auto">
              <span className="text-6xl block mb-4">{stats?.totalConcepts > 0 ? '🎉' : '🚀'}</span>
              <h3 className="font-black text-2xl uppercase mb-2">
                {stats?.totalConcepts > 0 ? 'All Caught Up!' : 'Get Started'}
              </h3>
              <p className="font-bold text-gray-600 mb-6">
                {stats?.totalConcepts > 0
                  ? 'No concepts due for review right now. Great job staying on top of your studies!'
                  : 'Initialize your spaced repetition concepts from your curriculum to start reviewing!'}
              </p>
              {(!stats || stats.totalConcepts === 0) && (
                <button
                  onClick={initializeAllConcepts}
                  disabled={initializing}
                  className="btn-neo py-4 px-8 text-lg bg-neo-pink text-white hover:bg-pink-600"
                >
                  {initializing ? '⏳ Initializing...' : '🧠 Initialize My Reviews'}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Stats Tab */}
      {tab === 'stats' && (
        <div className="space-y-6 max-w-3xl mx-auto">

          {/* Fun Summary Row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="card-neo bg-green-400 p-5 text-center">
              <span className="text-4xl block mb-1">⭐</span>
              <p className="font-black text-3xl">{Object.values(stats?.subjectStats || {}).reduce((s, v) => s + v.mastered, 0)}</p>
              <p className="font-black uppercase text-xs mt-1">Mastered</p>
            </div>
            <div className="card-neo bg-neo-yellow p-5 text-center">
              <span className="text-4xl block mb-1">📖</span>
              <p className="font-black text-3xl">{Object.values(stats?.subjectStats || {}).reduce((s, v) => s + v.learning, 0)}</p>
              <p className="font-black uppercase text-xs mt-1">Learning</p>
            </div>
            <div className="card-neo bg-neo-blue p-5 text-center">
              <span className="text-4xl block mb-1">🆕</span>
              <p className="font-black text-3xl">{Object.values(stats?.subjectStats || {}).reduce((s, v) => s + v.new, 0)}</p>
              <p className="font-black uppercase text-xs mt-1">Not Started</p>
            </div>
          </div>

          {/* Per-Subject Progress Bars */}
          {stats?.subjectStats && Object.entries(stats.subjectStats).map(([subject, s]) => {
            const masteredPct = s.total > 0 ? Math.round((s.mastered / s.total) * 100) : 0;
            const learningPct = s.total > 0 ? Math.round((s.learning / s.total) * 100) : 0;
            const emoji = subject === 'Mathematics' ? '🔢' : subject === 'Science' ? '🔬' : subject === 'English' ? '📝' : subject === 'Hindi' ? '🇮🇳' : subject === 'Social Science' ? '🌍' : '📚';

            return (
              <div key={subject} className="card-neo bg-white p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-black text-lg uppercase flex items-center gap-2">
                    <span className="text-2xl">{emoji}</span> {subject}
                  </h3>
                  <span className="font-black text-sm bg-neo-bg border-2 border-black px-3 py-1">
                    {s.mastered + s.learning} / {s.total} started
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-8 bg-gray-200 border-4 border-black overflow-hidden flex">
                  {masteredPct > 0 && (
                    <div
                      className="h-full bg-green-400 flex items-center justify-center font-black text-xs text-white transition-all duration-500"
                      style={{ width: `${masteredPct}%` }}
                    >
                      {masteredPct > 8 && `${masteredPct}%`}
                    </div>
                  )}
                  {learningPct > 0 && (
                    <div
                      className="h-full bg-yellow-400 flex items-center justify-center font-black text-xs transition-all duration-500"
                      style={{ width: `${learningPct}%` }}
                    >
                      {learningPct > 8 && `${learningPct}%`}
                    </div>
                  )}
                </div>

                {/* Legend */}
                <div className="flex gap-4 mt-2 text-xs font-bold text-gray-500">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-400 border border-black inline-block"></span> Mastered ({s.mastered})</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 bg-yellow-400 border border-black inline-block"></span> Learning ({s.learning})</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-200 border border-black inline-block"></span> New ({s.new})</span>
                </div>
              </div>
            );
          })}

          {(!stats || stats.totalConcepts === 0) && (
            <div className="card-neo bg-neo-bg p-12 text-center">
              <span className="text-6xl block mb-4">📚</span>
              <h3 className="font-black text-xl uppercase mb-2">No Data Yet</h3>
              <p className="font-bold text-gray-500">Complete quizzes to start tracking your memory retention!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SpacedRepetitionPage;
