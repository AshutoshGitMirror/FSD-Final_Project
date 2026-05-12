import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUser } from '../utils/auth';
import DashboardRoutes from '../components/dashboard/DashboardRoutes';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import ProfileModal from '../components/dashboard/ProfileModal';

// ── Dashboard Extended ─────────────────────────────────────────
const DashboardExtended = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUser();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex font-sans bg-neo-bg">
      <DashboardSidebar
        user={user}
        currentPath={location.pathname}
        onProfileClick={() => setShowProfile(true)}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <DashboardRoutes />
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
