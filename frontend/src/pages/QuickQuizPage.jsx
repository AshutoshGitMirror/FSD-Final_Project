import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authFetch } from '../utils/auth';
import { backendUrl } from '../config/api';
import confetti from 'canvas-confetti';

const EMOJIS = ['😊', '🙂', '😅', '🔥'];

const QuickQuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch due SR items and generate quick questions
    authFetch(backendUrl('/api/spaced-repetition/due'))
      .then(r => r.ok ? r.json() : { items: [] })
      .then(data => {
        const items = (data.items || []).slice(0, 3);
        const qs = items.map(item => ({
          concept: item.concept,
          subject: item.subjectName,
          chapter: item.chapterName,
          _id: item._id,
          options: [
            `Review "${item.concept}" in ${item.subjectName}`,
            `Skip this concept`,
            `Mark as known`,
            `Ask AI to explain`
          ],
          correct: 0
        }));
        setQuestions(qs.length > 0 ? qs : generateFallback());
        setLoading(false);
      })
      .catch(() => { setQuestions(generateFallback()); setLoading(false); });
  }, []);

  const generateFallback = () => [
    { concept: 'Quick Review', subject: 'General', chapter: '', options: ['Start a chapter quiz', 'Review saved links', 'View concept map', 'Practice with AI'], correct: 0 },
    { concept: 'Daily Challenge', subject: 'General', chapter: '', options: ['Take a full quiz', 'Explore a subject', 'Check leaderboard', 'View progress'], correct: 0 },
    { concept: 'Keep Learning', subject: 'General', chapter: '', options: ['Continue where you left off', 'Try a new subject', 'Review flashcards', 'Teach the AI'], correct: 0 },
  ];

  const handleAnswer = (idx) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === 0) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
      if (score >= 2) confetti({ particleCount: 100, spread: 120, origin: { y: 0.6 } });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-violet-400 rounded-full animate-spin mx-auto mb-4" />
          <p className="font-bold text-gray-500">Preparing quick review...</p>
        </div>
      </div>
    );
  }

  if (finished) {
    const pct = score / questions.length;
    return (
      <div className="flex items-center justify-center h-[80vh] p-6">
        <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-xl border border-gray-100">
          <span className="text-7xl block mb-4">{pct >= 0.67 ? '🎉' : pct >= 0.33 ? '👍' : '💪'}</span>
          <h2 className="text-3xl font-black mb-2">Quick Review Done!</h2>
          <p className="text-xl font-bold text-gray-500 mb-2">{score}/{questions.length} correct</p>
          <p className="text-gray-400 mb-6">{pct === 1 ? 'Perfect! You\'re on fire! 🔥' : pct >= 0.67 ? 'Great job! Keep it up!' : 'Keep practicing!'}</p>
          <div className="flex gap-3 justify-center">
            <Link to="/dashboard" className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold px-6 py-3 rounded-full">🏠 Home</Link>
            <button onClick={() => { setCurrent(0); setScore(0); setFinished(false); setSelected(null); setShowResult(false); }}
              className="bg-gray-100 font-bold px-6 py-3 rounded-full hover:bg-gray-200">🔄 Try Again</button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const timerEmoji = EMOJIS[Math.min(current, 3)];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black">⚡ Quick Review</h1>
          <p className="text-gray-500 text-sm">{q.subject} · {current + 1} of {questions.length}</p>
        </div>
        <span className="text-4xl">{timerEmoji}</span>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
        <h2 className="text-xl font-bold mb-2 leading-snug">{q.concept}</h2>
        {q.chapter && <p className="text-sm text-gray-400 mb-4">{q.chapter}</p>}
        <div className="space-y-3">
          {q.options.map((opt, i) => {
            let style = 'bg-gray-50 hover:bg-gray-100 border border-gray-200';
            if (showResult) {
              if (i === q.correct) style = 'bg-green-100 border-green-400 border-2';
              else if (i === selected) style = 'bg-red-100 border-red-400 border-2';
              else style = 'opacity-40';
            }
            return (
              <button key={i} onClick={() => handleAnswer(i)} disabled={showResult}
                className={`w-full p-4 rounded-2xl text-left font-medium transition-all ${style} ${!showResult ? 'hover:shadow-md' : ''}`}>
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {showResult && (
        <button onClick={handleNext} className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all active:scale-95">
          {current < questions.length - 1 ? 'Next →' : 'See Results 🎉'}
        </button>
      )}

      <div className="flex gap-2 mt-6 justify-center">
        {questions.map((_, i) => (
          <div key={i} className={`w-3 h-3 rounded-full ${i === current ? 'bg-violet-500' : i < current ? 'bg-green-400' : 'bg-gray-300'}`} />
        ))}
      </div>
    </div>
  );
};

export default QuickQuizPage;
