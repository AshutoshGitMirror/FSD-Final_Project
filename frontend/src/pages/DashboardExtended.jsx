import { Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import HomeHub from './HomeHub';
import TopicPage from './TopicPage';
import LearnPage from './LearnPage';
import QuizPage from './QuizPage';
import ProgressPage from './ProgressPage';
import SavedLinksPage from './SavedLinksPage';
import LeaderboardPage from './LeaderboardPage';
import KnowledgeGraphPage from './KnowledgeGraphPage';
import SpacedRepetitionPage from './SpacedRepetitionPage';
import TeacherDashboard from './TeacherDashboard';
import ProfilePage from './ProfilePage';
import AchievementsPage from './AchievementsPage';
import MobileNavigation from '../components/MobileNavigation';
import { getUser } from '../utils/auth';

// ── Dashboard Extended ─────────────────────────────────────────
const DashboardExtended = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUser();

  const getLinkClass = (path, bgColorClass) => {
    const currentPath = location.pathname;
    let isActive = currentPath.includes(path);
    if (path === '/topic' && currentPath.endsWith('/dashboard')) isActive = true;
    return `block p-4 border-4 transition-transform active:translate-y-1 active:translate-x-1 font-black uppercase text-lg ${isActive ? `border-black ${bgColorClass} shadow-lg` : 'border-transparent hover:border-black bg-white hover:bg-gray-100'}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="h-screen flex font-sans bg-amber-50 overflow-hidden">
      {/* Mobile Navigation (visible < lg) */}
      <MobileNavigation />

      {/* Sidebar (hidden on mobile) */}
      <aside className="hidden lg:flex lg:flex-col w-72 border-r-4 border-black bg-white z-20 relative">
        <div className="p-8 border-b-4 border-black bg-gradient-to-r from-pink-500 to-rose-500 text-white">
          <Link to="/" className="font-black text-3xl tracking-tighter block hover:underline ">AI TUTOR</Link>
        </div>
        <nav className="flex-1 p-6 space-y-4 flex flex-col overflow-y-auto">
          <Link to="/dashboard"              className={getLinkClass('/home', 'bg-gradient-to-r from-amber-400 to-orange-400')}>🏠 Home</Link>
          <Link to="/dashboard/topic"        className={getLinkClass('/topic',        'bg-gradient-to-r from-blue-400 to-cyan-400')}>📚 Curriculum</Link>
          <Link to="/dashboard/concept-map"  className={getLinkClass('/concept-map',  'bg-green-400')}>🧠 Concept Map</Link>
          <Link to="/dashboard/review"       className={getLinkClass('/review',       'bg-purple-400 text-white')}>🔄 Review Hub</Link>
          <Link to="/dashboard/feynman"      className={getLinkClass('/feynman',      'bg-orange-300')}>💡 Feynman Sandbox</Link>
          <Link to="/dashboard/progress"     className={getLinkClass('/progress',     'bg-gradient-to-r from-pink-500 to-rose-500 text-white')}>📈 Progress</Link>
          <Link to="/dashboard/saved-links"  className={getLinkClass('/saved-links',  'bg-gradient-to-r from-amber-400 to-orange-400')}>🔗 Saved Links</Link>
          <Link to="/dashboard/leaderboard"  className={getLinkClass('/leaderboard',  'bg-gray-800 text-white')}>🏆 Leaderboard</Link>
          <Link to="/dashboard/achievements" className={getLinkClass('/achievements','bg-gradient-to-r from-yellow-400 to-amber-500')}>🏆 Achievements</Link>
          {(user?.role === 'teacher' || user?.role === 'admin') && (
            <Link to="/dashboard/teacher"    className={getLinkClass('/teacher', 'bg-red-400 text-white')}>🏫 Teacher Dashboard</Link>
          )}
        </nav>

        {/* Profile Button at bottom */}
        <div className="p-6 border-t-4 border-black">
          <Link
            to="/dashboard/profile"
            className="w-full flex items-center gap-4  p-4 bg-amber-50 hover:bg-gradient-to-r from-amber-400 to-orange-400 hover:shadow-lg transition-all active:translate-y-1 active:translate-x-1"
          >
            <div className="w-10 h-10 rounded-full  bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black flex items-center justify-center text-lg flex-shrink-0">
              {user?.fullName?.[0]?.toUpperCase() || '?'}
            </div>
            <div className="text-left overflow-hidden">
              <p className="font-black uppercase text-sm leading-none truncate">{user?.fullName || 'Scholar'}</p>
              <p className="text-xs font-bold text-gray-500 mt-1">Std {user?.std} · {user?.board}</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
        <Routes>
          <Route path="/"                           element={<HomeHub />} />
          <Route path="/home"                       element={<HomeHub />} />
          <Route path="/topic"                      element={<TopicPage />} />
          <Route path="/learn/:subject/:chapter"    element={<LearnPage />} />
          <Route path="/quiz/:subject/:chapter"     element={<QuizPage />} />
          <Route path="/progress"                   element={<ProgressPage />} />
          <Route path="/saved-links"                element={<SavedLinksPage />} />
          <Route path="/leaderboard"                element={<LeaderboardPage />} />
          <Route path="/concept-map"                element={<KnowledgeGraphPage />} />
          <Route path="/review"                     element={<SpacedRepetitionPage />} />
          <Route path="/teacher"                    element={<TeacherDashboard />} />
          <Route path="/profile"                    element={<ProfilePage />} />
          <Route path="/achievements"              element={<AchievementsPage />} />
        </Routes>
      </main>

    </div>
  );
};

export default DashboardExtended;
