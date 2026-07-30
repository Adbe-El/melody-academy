import React, { useState, useCallback, useEffect } from 'react';
import { Settings as SettingsIcon, Save, Bell, Building, Trash2 } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { getSettings, updateSettings, type AcademySettings } from '../../services/settings';
import { announcementsService } from '../../services/announcements';
import { Badge } from '../../components/ui/Badge';
import { Skeleton } from '../../components/ui/Skeleton';
import { useToast } from '../../components/ui/Toast';

export const Settings: React.FC = () => {
  const { announcements, loading, refreshAnnouncements } = useAdmin();
  const { showToast } = useToast();
  const [settings, setSettings] = useState<AcademySettings | null>(null);
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showNewAnnouncement, setShowNewAnnouncement] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', message: '', important: false });

  useEffect(() => {
    getSettings()
      .then(setSettings)
      .catch(() => setSettings({ id: 'academy', whatsapp_number: '', academy_name: 'Matt-Agba Music Consult', academy_email: '', academy_phone: '', address: '' }))
      .finally(() => setSettingsLoading(false));
  }, []);

  const handleSaveSettings = useCallback(async () => {
    if (!settings) return;
    setSaving(true);
    try {
      await updateSettings({
        academy_name: settings.academy_name,
        academy_email: settings.academy_email,
        academy_phone: settings.academy_phone,
        whatsapp_number: settings.whatsapp_number,
        address: settings.address,
      });
      showToast('success', 'Settings saved successfully!');
    } catch {
      showToast('error', 'Failed to save settings.');
    }
    setSaving(false);
  }, [settings, showToast]);

  const handleAddAnnouncement = useCallback(async () => {
    if (!newAnnouncement.title || !newAnnouncement.message) return;
    try {
      await announcementsService.create({
        title: newAnnouncement.title,
        message: newAnnouncement.message,
        important: newAnnouncement.important,
        publish_date: new Date().toISOString().split('T')[0],
      });
      await refreshAnnouncements();
      showToast('success', 'Announcement posted!');
    } catch {
      showToast('error', 'Failed to post announcement.');
    }
    setNewAnnouncement({ title: '', message: '', important: false });
    setShowNewAnnouncement(false);
  }, [newAnnouncement, refreshAnnouncements, showToast]);

  const handleDeleteAnnouncement = useCallback(async (id: string) => {
    if (!confirm('Delete this announcement?')) return;
    try {
      await announcementsService.delete(id);
      await refreshAnnouncements();
    } catch { /* empty */ }
  }, [refreshAnnouncements]);

  if (loading || settingsLoading) return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-2"><Skeleton variant="table-row" count={5} /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center">
          <SettingsIcon className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-serif text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-xs text-gray-500">Configure business details and announcements</p>
        </div>
      </div>

      {/* Business Info */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Building className="w-4 h-4 text-academy-emerald" />
          <h2 className="font-serif text-lg font-bold text-gray-900">Business Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Business Name</label>
            <input value={settings?.academy_name || ''} onChange={e => setSettings(s => s ? { ...s, academy_name: e.target.value } : s)} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20" />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Business Email</label>
            <input value={settings?.academy_email || ''} onChange={e => setSettings(s => s ? { ...s, academy_email: e.target.value } : s)} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20" placeholder="mattagbamusicconsult@gmail.com" />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Phone Number</label>
            <input value={settings?.academy_phone || ''} onChange={e => setSettings(s => s ? { ...s, academy_phone: e.target.value } : s)} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20" placeholder="+234 ..." />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">WhatsApp Number</label>
            <input value={settings?.whatsapp_number || ''} onChange={e => setSettings(s => s ? { ...s, whatsapp_number: e.target.value } : s)} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20" placeholder="2348012345678" />
          </div>
        </div>
        <div>
          <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Address</label>
          <input value={settings?.address || ''} onChange={e => setSettings(s => s ? { ...s, address: e.target.value } : s)} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20" placeholder="123 Music Street, Lagos" />
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSaveSettings}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-academy-emerald text-white text-sm font-semibold hover:bg-academy-emerald-dark transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>

      {/* Announcements */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-academy-emerald" />
            <h2 className="font-serif text-lg font-bold text-gray-900">Announcements</h2>
          </div>
          <button
            onClick={() => setShowNewAnnouncement(!showNewAnnouncement)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-academy-sage text-academy-emerald text-xs font-semibold hover:bg-academy-sage/80 transition-colors"
          >
            New Announcement
          </button>
        </div>

        {showNewAnnouncement && (
          <div className="bg-gray-50 rounded-2xl p-4 space-y-3 border border-gray-200">
            <input
              value={newAnnouncement.title}
              onChange={e => setNewAnnouncement(a => ({ ...a, title: e.target.value }))}
              placeholder="Announcement title"
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20"
            />
            <textarea
              value={newAnnouncement.message}
              onChange={e => setNewAnnouncement(a => ({ ...a, message: e.target.value }))}
              placeholder="Announcement message..."
              rows={3}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20 resize-none"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="important" checked={newAnnouncement.important} onChange={e => setNewAnnouncement(a => ({ ...a, important: e.target.checked }))} className="rounded border-gray-300" />
                <label htmlFor="important" className="text-xs font-medium text-gray-700">Mark as important</label>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowNewAnnouncement(false)} className="px-3 py-1.5 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-100">Cancel</button>
                <button onClick={handleAddAnnouncement} disabled={!newAnnouncement.title} className="px-3 py-1.5 rounded-xl bg-academy-emerald text-white text-xs font-semibold hover:bg-academy-emerald-dark disabled:opacity-50">Post</button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {announcements.map(a => (
            <div key={a.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-gray-900">{a.title}</h4>
                  {a.important && <Badge variant="red">Important</Badge>}
                </div>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{a.message}</p>
                <p className="text-[10px] text-gray-400 mt-1">{a.publish_date}</p>
              </div>
              <button onClick={() => handleDeleteAnnouncement(a.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors shrink-0">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          {announcements.length === 0 && <p className="text-xs text-gray-400 text-center py-4">No announcements yet.</p>}
        </div>
      </div>
    </div>
  );
};
