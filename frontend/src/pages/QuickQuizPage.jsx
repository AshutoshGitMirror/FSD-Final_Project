import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authFetch } from '../utils/auth';
import { backendUrl } from '../config/api';
import confetti from 'canvas-confetti';
import { addToast } from '../components/ToastContainer';

const EMOJIS = ['😊', '🙂', '😅', '🔥'];

const QuickQuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reviewQueue, setReviewQueue] = useState([]);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      // Fetch due SR items
      const dueRes = await authFetch(backendUrl('/api/spaced-repetition/due'));
      const dueData = dueRes.ok ? await dueRes.json() : { items: [] };
      const items = (dueData.items || []).slice(0, 3);
      if (items.length === 0) {
        setQuestions([]);
        setLoading(false);
        return;
      }
      setReviewQueue(items);

      // Generate a real MCQ for each due item
      const qs = [];
      for (const item of items) {
        try {
          const qRes = await authFetch(backendUrl('/api/spaced-repetition/generate-question'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              concept: item.concept,
              subjectName: item.subjectName,
              chapterName: item.chapterName
            })
          });
          const qData = qRes.ok ? await qRes.json() : null;
          if (qData && qData.type === 'mcq' && qData.options && qData.options.length >= 2) {
            qs.push({
              concept: item.concept,
              subjectName: item.subjectName,
              chapterName: item.chapterName,
              _id: item._id,
              question: qData.question,
              options: qData.options,
              correct: qData.correctIndex,
              explanation: qData.explanation || ''
            });
          }
        } catch {}
      }

      if (qs.length === 0) {
        // Fallback: use the concept as an open-ended question
        setQuestions(items.map(it => ({
          concept: it.concept,
          subjectName: it.subjectName,
          chapterName: it.chapterName,
          _id: it._id,
          question: `What do you know about "${it.concept}"?`,
          options: ['I know this well', 'Somewhat familiar', 'Heard of it', 'Not sure'],
          correct: 0
        })));
      } else {
        setQuestions(qs);
      }
      setLoading(false);
    } catch {
      setQuestions([]);
      setLoading(false);
    }
  };

  const handleAnswer = (idx) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    const isCorrect = idx === questions[current].correct;
    if (isCorrect) {
      setScore(s => s + 1);
      confetti({ particleCount: 20, spread: 50, origin: { y: 0.8 } });
    }
  };

  const handleNext = async () => {
    // Record the review quality based on correctness
    const isCorrect = selected === questions[current].correct;
    const quality = isCorrect ? 4 : 1;
    const itemId = questions[current]._id;

    try {
      await authFetch(backendUrl('/api/spaced-repetition/review'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conceptId: itemId, quality })
      });
      addToast(`🔥 +10 XP`, 'xp', 1500);
    } catch {}

    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
      confetti({ particleCount: 100, spread: 140, origin: { y: 0.5 } });
      setTimeout(() => confetti({ particleCount: 60, spread: 120, origin: { y: 0.6, x: 0.3 } }), 300);
      addToast(`🎉 Review session done! ${score}/${questions.length} correct`, 'success', 4000);

      authFetch(backendUrl('/api/gamification/check'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'quiz_complete', metadata: { score: Math.round((score / questions.length) * 100) } })
      }).catch(() => {});
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-violet-400 rounded-full animate-spin mx-auto mb-4" />
          <p className="font-bold text-gray-500">Preparing your review...</p>
        </div>
      </div>
    );
  }

  if (finished) {
    const pct = score / questions.length;
    return (
      <div className="flex items-center justify-center h-[80vh] p-6">
        <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-xl border border-gray-100">
          <span className="text-7xl block mb-4 animate-bounce">{pct >= 0.67 ? '🎉' : '💪'}</span>
          <h2 className="text-3xl font-black mb-2">Review Complete!</h2>
          <p className="text-xl font-bold mb-2">{score}/{questions.length} correct</p>
          <p className="text-gray-400 mb-6">{pct === 1 ? 'Perfect recall! 🔥' : pct >= 0.67 ? 'Great memory! Keep it up!' : 'Keep practicing! You\'ll get there!'}</p>
          <div className="flex gap-3 justify-center">
            <Link to="/dashboard" className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold px-6 py-3 rounded-full">🏠 Home</Link>
            <button onClick={() => { setCurrent(0); setScore(0); setFinished(false); setSelected(null); setShowResult(false); setLoading(true); loadQuestions(); }}
              className="bg-gray-100 font-bold px-6 py-3 rounded-full hover:bg-gray-200">🔄 Try Again</button>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-[80vh] p-6">
        <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-xl border border-gray-100">
          <span className="text-7xl block mb-4">✅</span>
          <h2 className="text-3xl font-black mb-2">All Caught Up!</h2>
          <p className="text-gray-500 mb-6">No concepts due for review right now. Great job!</p>
          <Link to="/dashboard" className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold px-6 py-3 rounded-full inline-block">🏠 Home</Link>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const emoji = EMOJIS[Math.min(current, 3)];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-2xl font-black">⚡ Quick Review</h1>
          <p className="text-gray-500 text-sm">{q.subjectName} · {current + 1} of {questions.length}</p>
        </div>
        <span className="text-3xl">{emoji}</span>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-4">
        <p className="text-xs font-bold text-gray-400 uppercase mb-1">Review: {q.concept}</p>
        <h2 className="text-lg font-bold mb-5 leading-snug">{q.question}</h2>

        <div className="space-y-2.5">
          {q.options.map((opt, i) => {
            let style = 'bg-gray-50 hover:bg-gray-100 border border-gray-200';
            if (showResult) {
              if (i === q.correct) style = 'bg-green-100 border-green-400 border-2 text-green-800';
              else if (i === selected) style = 'bg-red-100 border-red-400 border-2 text-red-800';
              else style = 'opacity-40';
            }
            return (
              <button key={i} onClick={() => handleAnswer(i)} disabled={showResult}
                className={`w-full p-3.5 rounded-xl text-left font-medium text-sm transition-all ${style} ${!showResult ? 'hover:shadow-md active:scale-[0.99]' : ''}`}>
                <span className="inline-block w-6 h-6 rounded-full bg-gray-200 text-center leading-6 text-xs font-bold mr-3 shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {showResult && q.explanation && (
          <div className={`mt-4 p-3 rounded-xl text-sm font-medium ${selected === q.correct ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
            {selected === q.correct ? '✅ Correct! ' : '❌ '}
            {q.explanation}
          </div>
        )}
      </div>

      {showResult && (
        <button onClick={handleNext} className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 text-sm">
          {current < questions.length - 1 ? 'Next Question →' : 'See Results 🎉'}
        </button>
      )}

      <div className="flex gap-2 mt-5 justify-center">
        {questions.map((_, i) => (
          <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-violet-500 scale-125' : i < current ? 'bg-green-400' : 'bg-gray-300'}`} />
        ))}
      </div>
    </div>
  );
};

export default QuickQuizPage;
