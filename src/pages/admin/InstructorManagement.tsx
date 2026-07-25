import React, { useEffect, useState } from 'react';
import { Briefcase, Search, Eye, ChevronDown, Filter } from 'lucide-react';
import { instructorAppsService } from '../../services/instructorApps';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Skeleton } from '../../components/ui/Skeleton';
import type { InstructorApplication } from '../../types';

const statusColors: Record<string, 'emerald' | 'gold' | 'red' | 'gray' | 'green'> = {
  pending: 'gold',
  under_review: 'emerald',
  shortlisted: 'emerald',
  accepted: 'green',
  rejected: 'red',
};

const STATUS_OPTIONS = ['pending', 'under_review', 'shortlisted', 'accepted', 'rejected'] as const;

export const InstructorManagement: React.FC = () => {
  const [apps, setApps] = useState<InstructorApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selected, setSelected] = useState<InstructorApplication | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    instructorAppsService.getAll().then(setApps).finally(() => setLoading(false));
  }, []);

  const filtered = apps.filter(a => {
    const q = search.toLowerCase();
    const matchesSearch = a.fullName.toLowerCase().includes(q) || a.email.toLowerCase().includes(q) || a.primaryInstrument?.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = async (id: string, status: string) => {
    setUpdating(true);
    try {
      const updated = await instructorAppsService.update(id, { status });
      setApps(prev => prev.map(a => a.id === id ? updated : a));
      setSelected(prev => prev?.id === id ? { ...prev, status: status as InstructorApplication['status'] } : prev);
    } catch { /* empty */ } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><Skeleton variant="table" count={5} /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center">
          <Briefcase className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-serif text-2xl font-bold text-gray-900">Instructor Applications</h1>
          <p className="text-xs text-gray-500">{apps.length} applications</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or instrument..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20 focus:border-academy-emerald"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-academy-emerald/20 focus:border-academy-emerald bg-white"
          >
            <option value="all">All Statuses</option>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-academy-sage text-academy-charcoal font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Primary Instrument</th>
                <th className="p-4">Experience</th>
                <th className="p-4">Status</th>
                <th className="p-4">Applied</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(a => (
                <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <p className="font-semibold text-gray-900">{a.fullName}</p>
                    <p className="text-gray-500 text-[11px]">{a.email}</p>
                  </td>
                  <td className="p-4"><Badge variant="emerald">{a.primaryInstrument}</Badge></td>
                  <td className="p-4">{a.yearsExperience} years</td>
                  <td className="p-4"><Badge variant={statusColors[a.status] || 'gray'}>{a.status.replace('_', ' ')}</Badge></td>
                  <td className="p-4 text-gray-500">{a.createdAt?.split('T')[0]}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => setSelected(a)} className="p-2 rounded-lg hover:bg-academy-sage text-gray-500 hover:text-academy-emerald transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-gray-400 text-sm">No applications found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Application Details" size="lg">
        {selected && (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Full Name</p><p className="font-semibold">{selected.fullName}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Email</p><p className="font-semibold">{selected.email}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Phone</p><p className="font-semibold">{selected.phone}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Primary Instrument</p><p className="font-semibold">{selected.primaryInstrument}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Experience</p><p className="font-semibold">{selected.yearsExperience} years</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Resume</p><p className="font-semibold">{selected.resumeFileName || '—'}</p></div>
            </div>
            <div><p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Qualifications</p><p className="text-gray-700">{selected.qualifications}</p></div>
            <div><p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Bio</p><p className="text-gray-700">{selected.bio}</p></div>

            <div className="border-t pt-4">
              <p className="text-gray-500 text-[10px] uppercase font-bold mb-2">Update Status</p>
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map(s => (
                  <button
                    key={s}
                    disabled={updating || selected.status === s}
                    onClick={() => handleStatusUpdate(selected.id, s)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selected.status === s
                        ? 'bg-academy-emerald text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-academy-sage hover:text-academy-emerald'
                    } disabled:opacity-50`}
                  >
                    {s.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
