import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Calendar, Search, Filter, Eye, ChevronDown } from 'lucide-react';
import { updateConsultationStatus } from '../../services/consultations';
import { consultancyRequestsService } from '../../services/consultancyRequests';
import { useAdmin } from '../../context/AdminContext';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Skeleton } from '../../components/ui/Skeleton';
import type { Consultation, ConsultancyRequest } from '../../types';

type Tab = 'individual' | 'corporate';

const INDIVIDUAL_STATUSES = ['new', 'contacted', 'scheduled', 'completed', 'enrolled', 'cancelled'] as const;
const CORPORATE_STATUSES = ['new', 'in_discussion', 'completed'] as const;

const individualStatusColors: Record<string, 'emerald' | 'gold' | 'red' | 'gray' | 'green'> = {
  new: 'gold', contacted: 'emerald', scheduled: 'emerald', completed: 'green', enrolled: 'green', cancelled: 'red',
};

const corporateStatusColors: Record<string, 'emerald' | 'gold' | 'red' | 'gray' | 'green'> = {
  new: 'gold', in_discussion: 'emerald', completed: 'green',
};

const formatStatus = (s: string) => s.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase());

export const BookingsManagement: React.FC = () => {
  const { consultations, consultancyRequests, loading, refreshConsultations, refreshConsultancyRequests } = useAdmin();
  const [tab, setTab] = useState<Tab>('individual');

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selected, setSelected] = useState<Consultation | ConsultancyRequest | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setSearch('');
    setStatusFilter('all');
    setSelected(null);
  }, [tab]);

  const filteredIndividual = useMemo(() => consultations.filter(c => {
    const q = search.toLowerCase();
    const matchesSearch = c.full_name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  }), [consultations, search, statusFilter]);

  const filteredCorporate = useMemo(() => consultancyRequests.filter(r => {
    const q = search.toLowerCase();
    const matchesSearch = r.organization_name?.toLowerCase().includes(q) || r.contact_person?.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  }), [consultancyRequests, search, statusFilter]);

  const handleIndividualStatusUpdate = useCallback(async (id: string, status: string) => {
    setUpdating(true);
    try {
      await updateConsultationStatus(id, status as Consultation['status']);
      await refreshConsultations();
      setSelected(null);
    } catch { /* empty */ } finally {
      setUpdating(false);
    }
  }, [refreshConsultations]);

  const handleCorporateStatusUpdate = useCallback(async (id: string, status: string) => {
    setUpdating(true);
    try {
      await consultancyRequestsService.update(id, { status: status as ConsultancyRequest['status'] });
      await refreshConsultancyRequests();
      setSelected(null);
    } catch { /* empty */ } finally {
      setUpdating(false);
    }
  }, [refreshConsultancyRequests]);

  const isIndividual = tab === 'individual';
  const currentStatuses = isIndividual ? INDIVIDUAL_STATUSES : CORPORATE_STATUSES;
  const currentStatusColors = isIndividual ? individualStatusColors : corporateStatusColors;
  const totalCount = isIndividual ? consultations.length : consultancyRequests.length;

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-2"><Skeleton variant="table-row" count={5} /></div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-serif text-2xl font-bold text-gray-900">Bookings</h1>
          <p className="text-xs text-gray-500">{totalCount} total {isIndividual ? 'consultations' : 'requests'}</p>
        </div>
      </div>

      <div className="flex bg-gray-100 rounded-xl p-1 w-fit">
        <button
          onClick={() => setTab('individual')}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
            isIndividual ? 'bg-academy-emerald text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Individual
        </button>
        <button
          onClick={() => setTab('corporate')}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
            !isIndividual ? 'bg-academy-emerald text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Corporate
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={isIndividual ? 'Search by name or email...' : 'Search by organization, contact, or email...'}
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
            {currentStatuses.map(s => <option key={s} value={s}>{formatStatus(s)}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {isIndividual ? (
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
                {filteredIndividual.map(c => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <p className="font-semibold text-gray-900">{c.full_name}</p>
                      <p className="text-gray-500 text-[11px]">{c.email}</p>
                    </td>
                    <td className="p-4">{c.preferred_instrument}</td>
                    <td className="p-4">{c.experience_level}</td>
                    <td className="p-4"><Badge variant={currentStatusColors[c.status] || 'gray'}>{c.status}</Badge></td>
                    <td className="p-4 text-gray-500">{c.created_at?.split('T')[0]}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => setSelected(c)} className="p-2 rounded-lg hover:bg-academy-sage text-gray-500 hover:text-academy-emerald transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredIndividual.length === 0 && (
                  <tr><td colSpan={6} className="p-8 text-center text-gray-400 text-sm">No consultations found.</td></tr>
                )}
              </tbody>
            </table>
          ) : (
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
                {filteredCorporate.map(r => (
                  <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-semibold text-gray-900">{r.organization_name}</td>
                    <td className="p-4"><Badge variant="emerald">{r.organization_type}</Badge></td>
                    <td className="p-4">
                      <p className="font-medium">{r.contact_person}</p>
                      <p className="text-gray-500 text-[11px]">{r.email}</p>
                    </td>
                    <td className="p-4">{r.service_needed}</td>
                    <td className="p-4"><Badge variant={currentStatusColors[r.status] || 'gray'}>{formatStatus(r.status)}</Badge></td>
                    <td className="p-4 text-right">
                      <button onClick={() => setSelected(r)} className="p-2 rounded-lg hover:bg-academy-sage text-gray-500 hover:text-academy-emerald transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredCorporate.length === 0 && (
                  <tr><td colSpan={6} className="p-8 text-center text-gray-400 text-sm">No consultancy requests found.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={isIndividual ? 'Consultation Details' : 'Consultancy Request Details'} size="lg">
        {selected && isIndividual && 'preferred_instrument' in selected && (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Full Name</p><p className="font-semibold">{selected.full_name}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Email</p><p className="font-semibold">{selected.email}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Phone</p><p className="font-semibold">{(selected as Consultation).phone}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Instrument</p><p className="font-semibold">{(selected as Consultation).preferred_instrument}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Age Group</p><p className="font-semibold">{(selected as Consultation).age_group}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Experience</p><p className="font-semibold">{(selected as Consultation).experience_level}</p></div>
            </div>
            <div><p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Goals</p><p className="text-gray-700">{(selected as Consultation).goals}</p></div>
            <div className="border-t pt-4">
              <p className="text-gray-500 text-[10px] uppercase font-bold mb-2">Update Status</p>
              <div className="flex flex-wrap gap-2">
                {INDIVIDUAL_STATUSES.map(s => (
                  <button
                    key={s}
                    disabled={updating || selected.status === s}
                    onClick={() => handleIndividualStatusUpdate(selected.id, s)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selected.status === s
                        ? 'bg-academy-emerald text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-academy-sage hover:text-academy-emerald'
                    } disabled:opacity-50`}
                  >
                    {formatStatus(s)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        {selected && !isIndividual && 'organization_name' in selected && (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Organization</p><p className="font-semibold">{(selected as ConsultancyRequest).organization_name}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Type</p><p className="font-semibold">{(selected as ConsultancyRequest).organization_type}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Contact Person</p><p className="font-semibold">{(selected as ConsultancyRequest).contact_person}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Email</p><p className="font-semibold">{(selected as ConsultancyRequest).email}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Phone</p><p className="font-semibold">{(selected as ConsultancyRequest).phone}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Service Needed</p><p className="font-semibold">{(selected as ConsultancyRequest).service_needed}</p></div>
            </div>
            <div><p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Details</p><p className="text-gray-700">{(selected as ConsultancyRequest).details}</p></div>
            <div className="border-t pt-4">
              <p className="text-gray-500 text-[10px] uppercase font-bold mb-2">Update Status</p>
              <div className="flex flex-wrap gap-2">
                {CORPORATE_STATUSES.map(s => (
                  <button
                    key={s}
                    disabled={updating || selected.status === s}
                    onClick={() => handleCorporateStatusUpdate(selected.id, s)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selected.status === s
                        ? 'bg-academy-emerald text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-academy-sage hover:text-academy-emerald'
                    } disabled:opacity-50`}
                  >
                    {formatStatus(s)}
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
