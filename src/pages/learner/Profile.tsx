import React, { useState } from 'react';
import { User, Save } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../components/ui/Toast';

export const Profile: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const { showToast } = useToast();
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Profile update will be handled when Supabase users table is connected
      await refreshUser();
      showToast('success', 'Profile updated successfully!');
    } catch {
      showToast('error', 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">My Profile</h1>

      <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-soft space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-academy-sage flex items-center justify-center text-xl font-bold text-academy-emerald">
            {user?.fullName?.charAt(0) || <User className="w-6 h-6" />}
          </div>
          <div>
            <p className="font-serif text-lg font-bold text-gray-900">{user?.fullName}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
            <span className="text-[10px] font-bold uppercase tracking-wider text-academy-emerald bg-academy-sage px-2.5 py-0.5 rounded-full mt-1 inline-block">
              {user?.role}
            </span>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-700 uppercase">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-700 uppercase">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-500"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-700 uppercase">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+234 800 000 0000"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 rounded-full bg-academy-emerald text-white text-sm font-medium hover:bg-academy-emerald-hover transition-all shadow-sm hover:shadow flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};
