import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authFetch, getUser } from '../utils/auth';
import { backendUrl } from '../config/api';

const STAR_LABELS = { 1:'🌱 Sprout', 2:'🌿 Learner', 3:'🌳 Star', 4:'⭐ Superstar', 5:'👑 Genius' };
const SUBJECT_ICONS = { 'Mathematics':'🔢','Science':'🔬','English':'📝','Hindi':'🇮🇳','Social Studies':'🌍','EVS':'🌿' };

const HomeHub = () => {
  const user = getUser();
  const [performance, setPerformance] = useState([]);
  const [progress, setProgress] = useState([]);
  const [curriculum, setCurriculum] = useState([]);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0);
  const [lastChapter, setLastChapter] = useState(null);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  useEffect(() => {
    Promise.all([
      authFetch(backendUrl('/api/performance')).then(r => r.ok ? r.json() : []),
      authFetch(backendUrl('/api/progress')).then(r => r.ok ? r.json() : []),
      fetch(backendUrl(`/api/curriculum?std=${user?.std || 10}&board=${user?.board || 'CBSE'}`)).then(r => r.ok ? r.json() : [])
    ]).then(([perf, prog, curr]) => {
      setPerformance(Array.isArray(perf) ? perf : []);
      setProgress(Array.isArray(prog) ? prog : []);
      setCurriculum(Array.isArray(curr) ? curr : []);

      // Find last studied chapter
      if (prog.length > 0) {
        const sorted = [...prog].sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
        setLastChapter(sorted[0]);
      }

      // Calculate streak from SR stats
      setLoading(false);
    }).catch(() => setLoading(false));

    // Fetch SR streak
    authFetch(backendUrl('/api/spaced-repetition/stats'))
      .then(r => r.ok ? r.json() : {})
      .then(data => { if (data.streak) setStreak(data.streak); })
      .catch(() => {});
  }, [user?.std, user?.board]);

  const bestSubject = performance.reduce((best, p) => p.starLevel > (best?.starLevel || 0) ? p : best, null);
  const totalCompleted = progress.filter(p => p.isCompleted).length;
  const totalChapters = curriculum.reduce((sum, s) => sum + (s.chapters?.length || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-violet-400 rounded-full animate-spin mx-auto mb-4" />
          <p className="font-bold text-gray-500">Setting up your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8 bg-gradient-to-r from-violet-100 via-fuchsia-50 to-amber-50 rounded-3xl p-8 border border-violet-200/50 shadow-sm">
        <h1 className="text-3xl font-black tracking-tight">{greeting}, {user?.fullName?.split(' ')[0] || 'Scholar'}! ✨</h1>
        <p className="text-gray-500 font-medium mt-1">Grade {user?.std} · {user?.board}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {/* Continue Learning */}
        <div className="md:col-span-2 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-violet-200 text-sm font-bold uppercase tracking-wide">Continue Learning</p>
              <h2 className="text-2xl font-black mt-2">
                {lastChapter ? `${lastChapter.subjectName} — ${lastChapter.chapterName}` : 'Start your first lesson!'}
              </h2>
              {lastChapter && (
                <p className="text-violet-200 text-sm mt-2">
                  {lastChapter.isCompleted ? '✅ Completed — pick another chapter!' : `📖 ${Math.round((lastChapter.quizScore / lastChapter.totalQuestions) * 100)}% mastered`}
                </p>
              )}
            </div>
            <span className="text-6xl opacity-30">📚</span>
          </div>
          <Link to={lastChapter ? `/dashboard/learn/${encodeURIComponent(lastChapter.subjectName)}/${encodeURIComponent(lastChapter.chapterName)}` : '/dashboard/topic'}
            className="inline-block mt-4 bg-white text-violet-700 font-bold px-6 py-3 rounded-full hover:shadow-xl transition-all active:scale-95">
            {lastChapter ? '▶ Continue' : '🚀 Start Learning'}
          </Link>
        </div>

        {/* Streak + Star Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">{streak > 0 ? '🔥' : '💪'}</div>
            <div>
              <p className="font-black text-2xl">{streak} day streak</p>
              <p className="text-gray-500 text-sm font-medium">{streak > 0 ? 'Keep going!' : 'Start today!'}</p>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm">Best Subject</span>
              <span className="text-lg">{bestSubject ? STAR_LABELS[bestSubject.starLevel] || '🌱 Sprout' : '🌱 Sprout'}</span>
            </div>
            {bestSubject && (
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full" style={{ width: `${Math.min(100, (bestSubject.averageScore || 0))}%` }} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <Link to="/dashboard/topic" className="bg-blue-50 rounded-2xl p-4 text-center hover:bg-blue-100 transition-all hover:-translate-y-1 hover:shadow-lg">
          <span className="text-3xl block mb-1">📚</span>
          <span className="font-bold text-sm">Curriculum</span>
        </Link>
        <Link to="/dashboard/leaderboard" className="bg-amber-50 rounded-2xl p-4 text-center hover:bg-amber-100 transition-all hover:-translate-y-1 hover:shadow-lg">
          <span className="text-3xl block mb-1">🏆</span>
          <span className="font-bold text-sm">Leaderboard</span>
        </Link>
        <Link to="/dashboard/review" className="bg-green-50 rounded-2xl p-4 text-center hover:bg-green-100 transition-all hover:-translate-y-1 hover:shadow-lg">
          <span className="text-3xl block mb-1">🔄</span>
          <span className="font-bold text-sm">Review</span>
        </Link>
        <Link to="/dashboard/concept-map" className="bg-purple-50 rounded-2xl p-4 text-center hover:bg-purple-100 transition-all hover:-translate-y-1 hover:shadow-lg">
          <span className="text-3xl block mb-1">🧠</span>
          <span className="font-bold text-sm">Concept Map</span>
        </Link>
      </div>

      {/* Subjects Grid */}
      <h2 className="font-black text-xl mb-4">Your Subjects</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {curriculum.map((subject) => {
          const perf = performance.find(p => p.subjectName === subject.subjectName);
          const completed = progress.filter(p => p.subjectName === subject.subjectName && p.isCompleted).length;
          const total = subject.chapters?.length || 0;
          const icon = SUBJECT_ICONS[subject.subjectName] || '📖';
          return (
            <Link key={subject.subjectName} to={`/dashboard/topic`}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all"
              onClick={() => { try { localStorage.setItem('selectedSubject', subject.subjectName); } catch {} }}>
              <span className="text-3xl block mb-2">{icon}</span>
              <h3 className="font-bold text-base">{subject.subjectName}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-bold text-gray-400">{completed}/{total} chapters</span>
                <span className="text-xs font-bold">{perf ? STAR_LABELS[perf.starLevel]?.split(' ')[0] || '🌱' : '🌱'}</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full" style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Summary Footer */}
      <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 text-center">
        <p className="font-bold text-gray-600">
          🎯 {totalCompleted} of {totalChapters} chapters completed
          {totalChapters > 0 && ` · ${Math.round((totalCompleted / totalChapters) * 100)}% overall`}
        </p>
      </div>
    </div>
  );
};

export default HomeHub;
