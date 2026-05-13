import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authFetch } from '../utils/auth';
import { backendUrl } from '../config/api';
import confetti from 'canvas-confetti';
import { addToast } from '../components/ToastContainer';

const RATE_OPTIONS = [
  { value: 0, label: 'Forgot it', emoji: '😅', color: 'bg-red-100 hover:bg-red-200 border-red-300' },
  { value: 3, label: 'Kind of know it', emoji: '🤔', color: 'bg-amber-100 hover:bg-amber-200 border-amber-300' },
  { value: 5, label: 'Got it!', emoji: '😊', color: 'bg-green-100 hover:bg-green-200 border-green-300' },
];

const QuickQuizPage = () => {
  const [items, setItems] = useState([]);
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(null);

  useEffect(() => {
    authFetch(backendUrl('/api/spaced-repetition/due'))
      .then(r => r.ok ? r.json() : { items: [] })
      .then(data => {
        const due = (data.items || []).slice(0, 5);
        setItems(due);
        setTotal(due.length);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleRate = async (quality) => {
    if (!items[current]) return;
    setRating(quality);
    setCompleted(c => c + 1);

    // Dopamine hit: confetti + toast for "Got it!"
    if (quality >= 4) {
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
    }

    try {
      await authFetch(backendUrl('/api/spaced-repetition/review'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conceptId: items[current]._id, quality })
      });
      addToast(`🔥 +10 XP for reviewing "${items[current].concept}"`, 'xp', 2000);
    } catch {}

    setTimeout(() => {
      setRating(null);
      if (current < items.length - 1) {
        setCurrent(c => c + 1);
      } else {
        setFinished(true);
        confetti({ particleCount: 100, spread: 140, origin: { y: 0.5 } });
        setTimeout(() => confetti({ particleCount: 80, spread: 120, origin: { y: 0.6, x: 0.3 } }), 300);
        addToast(`🎉 Review session complete! +${completed + 1} concepts reviewed!`, 'success', 4000);
        authFetch(backendUrl('/api/gamification/check'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'review_complete', metadata: { quality } })
        }).catch(() => {});
      }
    }, 600);
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
    return (
      <div className="flex items-center justify-center h-[80vh] p-6">
        <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-xl border border-gray-100">
          <span className="text-7xl block mb-4 animate-bounce">🎉</span>
          <h2 className="text-3xl font-black mb-2">Session Complete!</h2>
          <p className="text-xl font-bold mb-2">
            <span className="text-violet-600">{completed}</span> concepts reviewed
          </p>
          <p className="text-gray-400 mb-6">
            {completed >= 4 ? 'Amazing focus! 🔥' : completed >= 2 ? 'Great progress! 💪' : 'Every review counts! ⭐'}
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/dashboard" className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all">🏠 Home</Link>
            <button onClick={() => { setCurrent(0); setCompleted(0); setFinished(false); setRating(null); setLoading(true);
              authFetch(backendUrl('/api/spaced-repetition/due')).then(r => r.ok ? r.json() : { items: [] }).then(data => {
                const due = (data.items || []).slice(0, 5); setItems(due); setTotal(due.length); setLoading(false);
              });
            }} className="bg-gray-100 font-bold px-6 py-3 rounded-full hover:bg-gray-200 transition-all">🔄 One More Set</button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-[80vh] p-6">
        <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-xl border border-gray-100">
          <span className="text-7xl block mb-4">✅</span>
          <h2 className="text-3xl font-black mb-2">All caught up!</h2>
          <p className="text-gray-500 mb-6">No concepts due for review. Come back later!</p>
          <Link to="/dashboard" className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold px-6 py-3 rounded-full inline-block">🏠 Home</Link>
        </div>
      </div>
    );
  }

  const item = items[current];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black">⚡ Quick Review</h1>
          <p className="text-gray-500 text-sm">{item.subjectName} · {current + 1} of {items.length}</p>
        </div>
        <span className="text-3xl">🧠</span>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-6 text-center">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Do you remember this?</p>
        <h2 className="text-2xl font-black mb-2">{item.concept}</h2>
        <p className="text-gray-500 text-sm mb-8">{item.chapterName}</p>

        <div className="space-y-3 max-w-sm mx-auto">
          {RATE_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => handleRate(opt.value)}
              disabled={rating !== null}
              className={`w-full p-4 rounded-2xl font-bold text-base border-2 transition-all ${
                rating === null ? opt.color + ' shadow-sm hover:shadow-md active:scale-[0.98]' :
                rating === opt.value ? opt.color.replace('hover:', '') + ' ring-2 ring-black scale-105' :
                'bg-gray-50 border-gray-100 opacity-40'
              }`}
            >
              <span className="mr-2">{opt.emoji}</span>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-6 justify-center">
        {items.map((_, i) => (
          <div key={i} className={`w-3 h-3 rounded-full transition-all ${
            i === current ? 'bg-violet-500 scale-125' :
            i < current ? 'bg-green-400' : 'bg-gray-300'
          }`} />
        ))}
      </div>
    </div>
  );
};

export default QuickQuizPage;
