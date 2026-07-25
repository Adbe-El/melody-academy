import React, { useEffect, useState } from 'react';
import { Building2, Search, Eye, ChevronDown, Filter } from 'lucide-react';
import { consultancyRequestsService } from '../../services/consultancyRequests';
import { getCached, setCache, clearCache } from '../../lib/dataCache';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Skeleton } from '../../components/ui/Skeleton';
import type { ConsultancyRequest } from '../../types';

const statusColors: Record<string, 'emerald' | 'gold' | 'red' | 'gray' | 'green'> = {
  new: 'gold',
  in_discussion: 'emerald',
  completed: 'green',
};

const STATUS_OPTIONS = ['new', 'in_discussion', 'completed'] as const;

export const ConsultancyManagement: React.FC = () => {
  const [requests, setRequests] = useState<ConsultancyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selected, setSelected] = useState<ConsultancyRequest | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const cached = getCached<ConsultancyRequest[]>('admin_consultancy');
    if (cached) { setRequests(cached); setLoading(false); return; }
    consultancyRequestsService.getAll()
      .then(d => { setRequests(d); setCache('admin_consultancy', d); })
      .catch(() => setRequests([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = requests.filter(r => {
    const q = search.toLowerCase();
    const matchesSearch = r.organizationName?.toLowerCase().includes(q) || r.contactPerson?.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = async (id: string, status: string) => {
    setUpdating(true);
    try {
      const updated = await consultancyRequestsService.update(id, { status });
      setRequests(prev => prev.map(r => r.id === id ? updated : r));
      setSelected(prev => prev?.id === id ? { ...prev, status: status as ConsultancyRequest['status'] } : prev);
      clearCache('admin_consultancy');
    } catch { /* empty */ } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><Skeleton variant="table" count={5} /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center">
          <Building2 className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-serif text-2xl font-bold text-gray-900">Consultancy Requests</h1>
          <p className="text-xs text-gray-500">{requests.length} requests from organizations</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by organization, contact, or email..."
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
                <th className="p-4">Organization</th>
                <th className="p-4">Type</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Service</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-semibold text-gray-900">{r.organizationName}</td>
                  <td className="p-4"><Badge variant="emerald">{r.organizationType}</Badge></td>
                  <td className="p-4">
                    <p className="font-medium">{r.contactPerson}</p>
                    <p className="text-gray-500 text-[11px]">{r.email}</p>
                  </td>
                  <td className="p-4">{r.serviceNeeded}</td>
                  <td className="p-4"><Badge variant={statusColors[r.status] || 'gray'}>{r.status.replace('_', ' ')}</Badge></td>
                  <td className="p-4 text-right">
                    <button onClick={() => setSelected(r)} className="p-2 rounded-lg hover:bg-academy-sage text-gray-500 hover:text-academy-emerald transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-gray-400 text-sm">No consultancy requests found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Consultancy Request Details" size="lg">
        {selected && (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Organization</p><p className="font-semibold">{selected.organizationName}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Type</p><p className="font-semibold">{selected.organizationType}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Contact Person</p><p className="font-semibold">{selected.contactPerson}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Email</p><p className="font-semibold">{selected.email}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Phone</p><p className="font-semibold">{selected.phone}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Service Needed</p><p className="font-semibold">{selected.serviceNeeded}</p></div>
            </div>
            <div><p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Details</p><p className="text-gray-700">{selected.details}</p></div>

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
