import React, { useState, useMemo, useCallback } from 'react';
import { GraduationCap, Search, Eye, ChevronDown, Filter } from 'lucide-react';
import { examRegistrationsService } from '../../services/examRegistrations';
import { useAdmin } from '../../context/AdminContext';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Skeleton } from '../../components/ui/Skeleton';

interface ExamRegistration {
  id: string;
  learner_name: string;
  email: string;
  phone?: string;
  exam_type: 'practical' | 'theory';
  exam_board: 'ABRSM' | 'Trinity' | 'MUSON' | 'ISoM';
  level: string;
  preferred_start_date?: string;
  notes?: string;
  status: 'new' | 'in_progress' | 'registered' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

const statusColors: Record<string, 'emerald' | 'gold' | 'red' | 'gray' | 'green'> = {
  new: 'gold',
  in_progress: 'emerald',
  registered: 'green',
  completed: 'green',
  cancelled: 'red',
};

const STATUS_OPTIONS = ['new', 'in_progress', 'registered', 'completed', 'cancelled'] as const;

export const ExamManagement: React.FC = () => {
  const { examRegistrations: exams, loading, refreshExamRegistrations } = useAdmin();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selected, setSelected] = useState<ExamRegistration | null>(null);
  const [updating, setUpdating] = useState(false);

  const filtered = useMemo(() => exams.filter(e => {
    const q = search.toLowerCase();
    const matchesSearch = e.learner_name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  }), [exams, search, statusFilter]);

  const handleStatusUpdate = useCallback(async (id: string, status: string) => {
    setUpdating(true);
    try {
      await examRegistrationsService.update(id, { status: status as ExamRegistration['status'] });
      await refreshExamRegistrations();
      setSelected(prev => prev?.id === id ? { ...prev, status: status as ExamRegistration['status'] } : prev);
    } catch { /* empty */ } finally {
      setUpdating(false);
    }
  }, [refreshExamRegistrations]);

  if (loading) return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-2"><Skeleton variant="table-row" count={5} /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center">
          <GraduationCap className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-serif text-2xl font-bold text-gray-900">Exam Registrations</h1>
          <p className="text-xs text-gray-500">{exams.length} registrations</p>
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
                <th className="p-4">Candidate</th>
                <th className="p-4">Exam Type</th>
                <th className="p-4">Board</th>
                <th className="p-4">Level</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(e => (
                <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <p className="font-semibold text-gray-900">{e.learner_name}</p>
                    <p className="text-gray-500 text-[11px]">{e.email}</p>
                  </td>
                  <td className="p-4"><Badge variant={e.exam_type === 'practical' ? 'emerald' : 'gold'}>{e.exam_type}</Badge></td>
                  <td className="p-4">{e.exam_board}</td>
                  <td className="p-4">{e.level}</td>
                  <td className="p-4"><Badge variant={statusColors[e.status] || 'gray'}>{e.status.replace('_', ' ')}</Badge></td>
                  <td className="p-4 text-right">
                    <button onClick={() => setSelected(e)} className="p-2 rounded-lg hover:bg-academy-sage text-gray-500 hover:text-academy-emerald transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-gray-400 text-sm">No exam registrations found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Registration Details" size="lg">
        {selected && (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Name</p><p className="font-semibold">{selected.learner_name}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Email</p><p className="font-semibold">{selected.email}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Phone</p><p className="font-semibold">{selected.phone || '—'}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Exam Type</p><p className="font-semibold">{selected.exam_type}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Board</p><p className="font-semibold">{selected.exam_board}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Level</p><p className="font-semibold">{selected.level}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Preferred Start</p><p className="font-semibold">{selected.preferred_start_date || '—'}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Registered</p><p className="font-semibold">{selected.created_at?.split('T')[0]}</p></div>
            </div>
            {selected.notes && <div><p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Notes</p><p className="text-gray-700">{selected.notes}</p></div>}

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
