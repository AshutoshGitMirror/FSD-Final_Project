import { useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import TopicPage from './TopicPage';
import LearnPage from './LearnPage';
import QuizPage from './QuizPage';
import ProgressPage from './ProgressPage';
import SavedLinksPage from './SavedLinksPage';
import LeaderboardPage from './LeaderboardPage';
import KnowledgeGraphPage from './KnowledgeGraphPage';
import SpacedRepetitionPage from './SpacedRepetitionPage';
import FeynmanPage from './FeynmanPage';
import { getUser } from '../utils/auth';

// ── Profile Modal ──────────────────────────────────────────────
const ProfileModal = ({ user, onClose, onLogout }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className="absolute inset-0 bg-black/40" />
    <div
      className="relative card-neo bg-white max-w-sm w-full p-0 overflow-hidden z-10"
      onClick={e => e.stopPropagation()}
    >
      {/* Header strip */}
      <div className="bg-neo-pink p-8 text-white relative">
        <button onClick={onClose} className="absolute top-4 right-4 font-black text-xl border-2 border-white w-8 h-8 flex items-center justify-center hover:bg-white hover:text-black transition-colors">✕</button>
        <div className="w-20 h-20 rounded-full border-4 border-white bg-neo-yellow flex items-center justify-center text-4xl font-black text-black shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] mb-4">
          {user?.fullName?.[0]?.toUpperCase() || '?'}
        </div>
        <h2 className="text-2xl font-black uppercase">{user?.fullName}</h2>
        <p className="font-bold opacity-80 text-sm">Active Scholar</p>
      </div>

      {/* Info rows */}
      <div className="divide-y-4 divide-black border-t-4 border-black">
        <div className="flex justify-between items-center p-5">
          <span className="font-black uppercase text-xs text-gray-500">Standard</span>
          <span className="font-black text-xl bg-neo-yellow border-2 border-black px-3 py-1">Grade {user?.std}</span>
        </div>
        <div className="flex justify-between items-center p-5">
          <span className="font-black uppercase text-xs text-gray-500">Board</span>
          <span className="font-black text-xl bg-neo-blue border-2 border-black px-3 py-1">{user?.board}</span>
        </div>
      </div>

      {/* Logout */}
      <div className="p-6 border-t-4 border-black">
        <button
          onClick={onLogout}
          className="w-full btn-neo py-4 text-lg bg-red-400 hover:bg-red-500 text-black"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  </div>
);

// ── Dashboard Extended ─────────────────────────────────────────
const DashboardExtended = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUser();
  const [showProfile, setShowProfile] = useState(false);

  const getLinkClass = (path, bgColorClass) => {
    const currentPath = location.pathname;
    let isActive = currentPath.includes(path);
    if (path === '/topic' && currentPath.endsWith('/dashboard')) isActive = true;
    return `block p-4 border-4 transition-transform active:translate-y-1 active:translate-x-1 font-black uppercase text-lg ${isActive ? `border-black ${bgColorClass} shadow-neo` : 'border-transparent hover:border-black bg-white hover:bg-gray-100'}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="h-screen flex font-sans bg-neo-bg overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 border-r-4 border-black bg-white flex flex-col z-20 relative">
        <div className="p-8 border-b-4 border-black bg-neo-pink text-white">
          <Link to="/" className="font-black text-3xl tracking-tighter block hover:underline drop-shadow-[2px_2px_0px_#000]">AI TUTOR</Link>
        </div>
        <nav className="flex-1 p-6 space-y-4 flex flex-col overflow-y-auto">
          <Link to="/dashboard/topic"        className={getLinkClass('/topic',        'bg-neo-blue')}>📚 Curriculum</Link>
          <Link to="/dashboard/concept-map"  className={getLinkClass('/concept-map',  'bg-green-400')}>🧠 Concept Map</Link>
          <Link to="/dashboard/review"       className={getLinkClass('/review',       'bg-purple-400 text-white')}>🔄 Review Hub</Link>
          <Link to="/dashboard/feynman"      className={getLinkClass('/feynman',      'bg-orange-300')}>💡 Feynman Sandbox</Link>
          <Link to="/dashboard/progress"     className={getLinkClass('/progress',     'bg-neo-pink text-white')}>📈 Progress</Link>
          <Link to="/dashboard/saved-links"  className={getLinkClass('/saved-links',  'bg-neo-yellow')}>🔗 Saved Links</Link>
          <Link to="/dashboard/leaderboard"  className={getLinkClass('/leaderboard',  'bg-gray-800 text-white')}>🏆 Leaderboard</Link>
        </nav>

        {/* Profile Button at bottom */}
        <div className="p-6 border-t-4 border-black">
          <button
            onClick={() => setShowProfile(true)}
            className="w-full flex items-center gap-4 border-4 border-black p-4 bg-neo-bg hover:bg-neo-yellow hover:shadow-neo transition-all active:translate-y-1 active:translate-x-1"
          >
            <div className="w-10 h-10 rounded-full border-4 border-black bg-neo-pink text-white font-black flex items-center justify-center text-lg flex-shrink-0">
              {user?.fullName?.[0]?.toUpperCase() || '?'}
            </div>
            <div className="text-left overflow-hidden">
              <p className="font-black uppercase text-sm leading-none truncate">{user?.fullName || 'Scholar'}</p>
              <p className="text-xs font-bold text-gray-500 mt-1">Std {user?.std} · {user?.board}</p>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/"                           element={<Navigate to="/dashboard/topic" replace />} />
          <Route path="/topic"                      element={<TopicPage />} />
          <Route path="/learn/:subject/:chapter"    element={<LearnPage />} />
          <Route path="/quiz/:subject/:chapter"     element={<QuizPage />} />
          <Route path="/progress"                   element={<ProgressPage />} />
          <Route path="/saved-links"                element={<SavedLinksPage />} />
          <Route path="/leaderboard"                element={<LeaderboardPage />} />
          <Route path="/concept-map"                element={<KnowledgeGraphPage />} />
          <Route path="/review"                     element={<SpacedRepetitionPage />} />
          <Route path="/feynman"                    element={<FeynmanPage />} />
        </Routes>
      </main>

      {/* Profile Modal */}
      {showProfile && (
        <ProfileModal
          user={user}
          onClose={() => setShowProfile(false)}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default DashboardExtended;
