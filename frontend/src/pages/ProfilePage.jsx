import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authFetch, getUser } from '../utils/auth';
import { backendUrl } from '../config/api';

const ProfilePage = () => {
  const user = getUser();
  const navigate = useNavigate();
  const [exporting, setExporting] = useState(false);
  const [exportData, setExportData] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');

  const handleExport = async () => {
    setExporting(true);
    try {
      const res = await authFetch(backendUrl('/api/ethics/export'));
      if (!res.ok) throw new Error('Export failed');
      const data = await res.json();
      setExportData(data);
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `my-data-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to export data: ' + err.message);
    }
    setExporting(false);
  };

  const handleDelete = async () => {
    if (!deletePassword) {
      setDeleteError('Please enter your password');
      return;
    }
    setDeleting(true);
    setDeleteError('');
    try {
      const res = await authFetch(backendUrl('/api/ethics/delete-account'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: deletePassword })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Deletion failed');
      }
      localStorage.removeItem('token');
      navigate('/login');
    } catch (err) {
      setDeleteError(err.message);
    }
    setDeleting(false);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-black uppercase mb-2 tracking-tight">👤 My Profile</h1>
      <p className="font-bold text-gray-600 mb-8">Manage your account and data</p>

      <div className="card-neo bg-white p-8 mb-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b-4 border-black pb-3">
            <span className="font-bold text-gray-600">Name</span>
            <span className="font-black text-lg">{user?.fullName}</span>
          </div>
          <div className="flex justify-between items-center border-b-4 border-black pb-3">
            <span className="font-bold text-gray-600">Standard</span>
            <span className="font-black text-lg bg-neo-yellow border-2 border-black px-3 py-1">Grade {user?.std}</span>
          </div>
          <div className="flex justify-between items-center border-b-4 border-black pb-3">
            <span className="font-bold text-gray-600">Board</span>
            <span className="font-black text-lg bg-neo-blue border-2 border-black px-3 py-1">{user?.board}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-600">Role</span>
            <span className="font-black uppercase text-sm">{user?.role || 'student'}</span>
          </div>
        </div>
      </div>

      <div className="card-neo bg-green-50 p-8 mb-8">
        <h2 className="font-black text-xl uppercase mb-2">📥 Download My Data</h2>
        <p className="font-medium text-gray-600 mb-4">Get a JSON file of your profile, progress, feedback, saved links, and more.</p>
        <button onClick={handleExport} disabled={exporting} className="btn-neo px-6 py-3 disabled:opacity-50">
          {exporting ? 'Exporting...' : 'Export My Data'}
        </button>
        {exportData && (
          <p className="text-xs font-bold text-green-600 mt-2">✓ Download started! Check your downloads folder.</p>
        )}
      </div>

      <div className="card-neo bg-red-50 p-8">
        <h2 className="font-black text-xl uppercase mb-2 text-red-700">🗑️ Delete Account</h2>
        <p className="font-medium text-gray-600 mb-4">Permanently delete your account and all associated data. This cannot be undone.</p>
        {!confirmDelete ? (
          <button onClick={() => setConfirmDelete(true)} className="border-4 border-red-700 bg-red-400 text-white px-6 py-3 font-black uppercase hover:bg-red-500">
            Delete My Account
          </button>
        ) : (
          <div className="space-y-3">
            <p className="font-black text-red-700">Are you sure? All your progress will be lost forever!</p>
            <p className="font-medium text-sm text-gray-600">Confirm your password to proceed:</p>
            <input type="password" placeholder="Enter your password" value={deletePassword} onChange={e => { setDeletePassword(e.target.value); setDeleteError(''); }}
              className="input-neo w-full font-medium tracking-widest" />
            {deleteError && <p className="text-xs font-bold text-red-600">{deleteError}</p>}
            <div className="flex gap-3">
              <button onClick={handleDelete} disabled={deleting} className="border-4 border-black bg-black text-white px-6 py-3 font-black uppercase hover:bg-gray-800 disabled:opacity-50">
                {deleting ? 'Deleting...' : 'Yes, Delete Everything'}
              </button>
              <button onClick={() => { setConfirmDelete(false); setDeletePassword(''); setDeleteError(''); }} className="border-4 border-black bg-white px-6 py-3 font-black uppercase hover:bg-gray-100">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
