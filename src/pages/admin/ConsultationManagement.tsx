import React, { useEffect, useState } from 'react';
import { MessageSquare, Search, Filter, Eye, ChevronDown } from 'lucide-react';
import { consultationsService, updateConsultationStatus } from '../../services/consultations';
import { getCached, setCache, clearCache } from '../../lib/dataCache';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Skeleton } from '../../components/ui/Skeleton';
import type { Consultation } from '../../types';

const statusColors: Record<string, 'emerald' | 'gold' | 'red' | 'gray' | 'green'> = {
  new: 'gold',
  contacted: 'emerald',
  scheduled: 'emerald',
  completed: 'green',
  enrolled: 'green',
  cancelled: 'red',
};

const STATUS_OPTIONS = ['new', 'contacted', 'scheduled', 'completed', 'enrolled', 'cancelled'] as const;

export const ConsultationManagement: React.FC = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selected, setSelected] = useState<Consultation | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    const cached = getCached<Consultation[]>('admin_consultations');
    if (cached) { setConsultations(cached); setLoading(false); return; }
    consultationsService.getAll()
      .then(d => { setConsultations(d); setCache('admin_consultations', d); })
      .catch(() => setConsultations([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = consultations.filter(c => {
    const matchesSearch = c.fullName.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = async (id: string, status: string) => {
    setUpdatingStatus(true);
    try {
      const updated = await updateConsultationStatus(id, status);
      setConsultations(prev => prev.map(c => c.id === id ? updated : c));
      setSelected(prev => prev?.id === id ? { ...prev, status: status as Consultation['status'] } : prev);
      clearCache('admin_consultations');
    } catch { /* empty */ } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-2"><Skeleton variant="table-row" count={5} /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-gray-900">Consultations</h1>
            <p className="text-xs text-gray-500">{consultations.length} total requests</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
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
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
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
                <th className="p-4">Instrument</th>
                <th className="p-4">Experience</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <p className="font-semibold text-gray-900">{c.fullName}</p>
                    <p className="text-gray-500 text-[11px]">{c.email}</p>
                  </td>
                  <td className="p-4">{c.preferredInstrument}</td>
                  <td className="p-4">{c.experienceLevel}</td>
                  <td className="p-4"><Badge variant={statusColors[c.status] || 'gray'}>{c.status}</Badge></td>
                  <td className="p-4 text-gray-500">{c.createdAt?.split('T')[0]}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => setSelected(c)} className="p-2 rounded-lg hover:bg-academy-sage text-gray-500 hover:text-academy-emerald transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-gray-400 text-sm">No consultations found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Consultation Details" size="lg">
        {selected && (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Full Name</p><p className="font-semibold">{selected.fullName}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Email</p><p className="font-semibold">{selected.email}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Phone</p><p className="font-semibold">{selected.phone}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Instrument</p><p className="font-semibold">{selected.preferredInstrument}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Age Group</p><p className="font-semibold">{selected.ageGroup}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Experience</p><p className="font-semibold">{selected.experienceLevel}</p></div>
            </div>
            <div><p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Goals</p><p className="text-gray-700">{selected.goals}</p></div>

            <div className="border-t pt-4">
              <p className="text-gray-500 text-[10px] uppercase font-bold mb-2">Update Status</p>
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map(s => (
                  <button
                    key={s}
                    disabled={updatingStatus || selected.status === s}
                    onClick={() => handleStatusUpdate(selected.id, s)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selected.status === s
                        ? 'bg-academy-emerald text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-academy-sage hover:text-academy-emerald'
                    } disabled:opacity-50`}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
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
