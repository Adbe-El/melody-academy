import React, { useState, useMemo } from 'react';
import { Users, Search, Filter, Eye, ChevronDown } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Skeleton } from '../../components/ui/Skeleton';

const statusColors: Record<string, 'emerald' | 'gold' | 'red' | 'gray' | 'green'> = {
  active: 'green',
  completed: 'emerald',
  paused: 'gold',
};

export const LearnerManagement: React.FC = () => {
  const { learners, loading } = useAdmin();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selected, setSelected] = useState<typeof learners[number] | null>(null);

  const filtered = useMemo(() => learners.filter(l => {
    const q = search.toLowerCase();
    const matchesSearch = l.fullName.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || l.programmeTitle?.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  }), [learners, search, statusFilter]);

  if (loading) return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-2"><Skeleton variant="table-row" count={5} /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-serif text-2xl font-bold text-gray-900">Learners</h1>
          <p className="text-xs text-gray-500">{learners.length} enrolled learners</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or programme..."
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
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="paused">Paused</option>
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
                <th className="p-4">Programme</th>
                <th className="p-4">Instructor</th>
                <th className="p-4">Progress</th>
                <th className="p-4">Status</th>
                <th className="p-4">Enrolled</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(l => (
                <tr key={l.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <p className="font-semibold text-gray-900">{l.fullName}</p>
                    <p className="text-gray-500 text-[11px]">{l.email}</p>
                  </td>
                  <td className="p-4">{l.programmeTitle || '—'}</td>
                  <td className="p-4">{l.instructorName || '—'}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-academy-emerald rounded-full" style={{ width: `${l.progressPercentage || 0}%` }} />
                      </div>
                      <span className="text-[10px] font-bold text-gray-500">{l.progressPercentage || 0}%</span>
                    </div>
                  </td>
                  <td className="p-4"><Badge variant={statusColors[l.status] || 'gray'}>{l.status}</Badge></td>
                  <td className="p-4 text-gray-500">{l.enrolledDate?.split('T')[0]}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => setSelected(l)} className="p-2 rounded-lg hover:bg-academy-sage text-gray-500 hover:text-academy-emerald transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="p-8 text-center text-gray-400 text-sm">No learners found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Learner Details" size="md">
        {selected && (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Full Name</p><p className="font-semibold">{selected.fullName}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Email</p><p className="font-semibold">{selected.email}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Programme</p><p className="font-semibold">{selected.programmeTitle || '—'}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Instructor</p><p className="font-semibold">{selected.instructorName || '—'}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Enrolled</p><p className="font-semibold">{selected.enrolledDate?.split('T')[0]}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Status</p><Badge variant={statusColors[selected.status] || 'gray'}>{selected.status}</Badge></div>
            </div>
            <div>
              <p className="text-gray-500 text-[10px] uppercase font-bold mb-2">Progress</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-academy-emerald rounded-full transition-all" style={{ width: `${selected.progressPercentage || 0}%` }} />
                </div>
                <span className="text-sm font-bold text-gray-700">{selected.progressPercentage || 0}%</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
