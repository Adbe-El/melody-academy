import React, { useState, useMemo } from 'react';
import { Users, Search, Filter, Eye, ChevronDown, Plus, Copy, CheckCircle, RefreshCw } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Skeleton } from '../../components/ui/Skeleton';
import { supabase } from '../../lib/supabase';

const statusColors: Record<string, 'emerald' | 'gold' | 'red' | 'gray' | 'green'> = {
  active: 'green',
  completed: 'emerald',
  paused: 'gold',
};

function generatePassword(): string {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const all = upper + lower + digits;
  const array = new Uint8Array(10);
  crypto.getRandomValues(array);
  let pwd = '';
  pwd += upper[array[0] % upper.length];
  pwd += digits[array[1] % digits.length];
  for (let i = 2; i < 10; i++) {
    pwd += all[array[i] % all.length];
  }
  return pwd;
}

export const LearnerManagement: React.FC = () => {
  const { learners, programmes, loading, refreshLearners } = useAdmin();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selected, setSelected] = useState<typeof learners[number] | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState<{ fullName: string; email: string; password: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ fullName: '', email: '', programme_id: '', password: generatePassword() });
  const [createError, setCreateError] = useState('');

  const filtered = useMemo(() => learners.filter(l => {
    const q = search.toLowerCase();
    const matchesSearch = l.full_name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || l.programme_title?.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || l.certificate_status === statusFilter;
    return matchesSearch && matchesStatus;
  }), [learners, search, statusFilter]);

  const handleCreate = async () => {
    setCreating(true);
    setCreateError('');
    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.fullName } }
      });
      if (error) throw error;

      if (data.user) {
        const nameParts = form.fullName.trim().split(/\s+/);
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ') || '.';

        await supabase.from('users').insert({
          id: data.user.id,
          email: form.email,
          first_name: firstName,
          last_name: lastName,
          role: 'learner',
          status: 'active',
        });

        if (form.programme_id) {
          await supabase.from('learners').insert({
            user_id: data.user.id,
            programme_id: form.programme_id,
            enrolment_date: new Date().toISOString().split('T')[0],
            progress: 0,
            certificate_status: 'not_eligible',
          });
        }
      }

      setCreatedCredentials({ fullName: form.fullName, email: form.email, password: form.password });
      await refreshLearners();
      setForm({ fullName: '', email: '', programme_id: '', password: generatePassword() });
    } catch (err: unknown) {
      setCreateError(err instanceof Error ? err.message : 'Failed to create learner account.');
    } finally {
      setCreating(false);
    }
  };

  const copyCredentials = () => {
    if (!createdCredentials) return;
    navigator.clipboard.writeText(
      `Name: ${createdCredentials.fullName}\nEmail: ${createdCredentials.email}\nPassword: ${createdCredentials.password}\nLogin: https://zadrvszroluveuozckog.supabase.co/auth/login`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-2"><Skeleton variant="table-row" count={5} /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-gray-900">Learners</h1>
            <p className="text-xs text-gray-500">{learners.length} enrolled learners</p>
          </div>
        </div>
        <button
          onClick={() => { setCreatedCredentials(null); setShowCreate(true); setForm(f => ({ ...f, password: generatePassword() })); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-academy-emerald text-white text-sm font-semibold hover:bg-academy-emerald-dark transition-colors"
        >
          <Plus className="w-4 h-4" /> Create Learner
        </button>
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
            <option value="not_eligible">Not Eligible</option>
            <option value="eligible">Eligible</option>
            <option value="issued">Issued</option>
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
                    <p className="font-semibold text-gray-900">{l.full_name}</p>
                    <p className="text-gray-500 text-[11px]">{l.email}</p>
                  </td>
                  <td className="p-4">{l.programme_title || '—'}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-academy-emerald rounded-full" style={{ width: `${l.progress || 0}%` }} />
                      </div>
                      <span className="text-[10px] font-bold text-gray-500">{l.progress || 0}%</span>
                    </div>
                  </td>
                  <td className="p-4"><Badge variant={statusColors[l.certificate_status] || 'gray'}>{l.certificate_status}</Badge></td>
                  <td className="p-4 text-gray-500">{l.enrolment_date?.split('T')[0]}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => setSelected(l)} className="p-2 rounded-lg hover:bg-academy-sage text-gray-500 hover:text-academy-emerald transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-gray-400 text-sm">No learners found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Learner Detail Modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Learner Details" size="md">
        {selected && (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Full Name</p><p className="font-semibold">{selected.full_name}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Email</p><p className="font-semibold">{selected.email}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Programme</p><p className="font-semibold">{selected.programme_title || '—'}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Enrolled</p><p className="font-semibold">{selected.enrolment_date?.split('T')[0]}</p></div>
              <div><p className="text-gray-500 text-[10px] uppercase font-bold">Status</p><Badge variant={statusColors[selected.certificate_status] || 'gray'}>{selected.certificate_status}</Badge></div>
            </div>
            <div>
              <p className="text-gray-500 text-[10px] uppercase font-bold mb-2">Progress</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-academy-emerald rounded-full transition-all" style={{ width: `${selected.progress || 0}%` }} />
                </div>
                <span className="text-sm font-bold text-gray-700">{selected.progress || 0}%</span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Create Learner Modal */}
      <Modal isOpen={showCreate} onClose={() => { setShowCreate(false); setCreatedCredentials(null); setCreateError(''); }} title="Create Learner Account" size="md">
        {createdCredentials ? (
          <div className="space-y-4 text-sm">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center space-y-2">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto" />
              <p className="font-semibold text-green-800">Account Created Successfully!</p>
              <p className="text-xs text-green-700">Share these credentials with the learner:</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Name:</span>
                <span className="text-sm font-semibold">{createdCredentials.fullName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Email:</span>
                <span className="text-sm font-mono font-semibold">{createdCredentials.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Password:</span>
                <span className="text-sm font-mono font-semibold">{createdCredentials.password}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={copyCredentials} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-academy-sage text-academy-emerald text-sm font-semibold hover:bg-academy-sage/80 transition-colors">
                <Copy className="w-4 h-4" /> {copied ? 'Copied!' : 'Copy Credentials'}
              </button>
              <button onClick={() => { setShowCreate(false); setCreatedCredentials(null); }} className="flex-1 px-4 py-2.5 rounded-xl bg-academy-emerald text-white text-sm font-semibold hover:bg-academy-emerald-dark transition-colors">
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Full Name</label>
              <input value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20" placeholder="e.g. John Doe" />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Email</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20" placeholder="learner@example.com" />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Programme</label>
              <select value={form.programme_id} onChange={e => setForm(f => ({ ...f, programme_id: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-academy-emerald/20">
                <option value="">Select programme (optional)</option>
                {programmes.filter(p => p.status === 'active').map(p => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Password</label>
              <div className="flex gap-2">
                <input type="text" value={form.password} readOnly className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm font-mono bg-gray-50 focus:outline-none" />
                <button onClick={() => setForm(f => ({ ...f, password: generatePassword() }))} className="flex items-center gap-1 px-3 py-2 rounded-xl bg-academy-sage text-academy-emerald text-xs font-semibold hover:bg-academy-sage/80 transition-colors">
                  <RefreshCw className="w-3.5 h-3.5" /> Generate
                </button>
              </div>
            </div>
            {createError && <p className="text-xs text-red-600 bg-red-50 p-2 rounded-lg">{createError}</p>}
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => { setShowCreate(false); setCreateError(''); }} className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
              <button onClick={handleCreate} disabled={creating || !form.fullName || !form.email} className="px-4 py-2 rounded-xl bg-academy-emerald text-white text-sm font-semibold hover:bg-academy-emerald-dark transition-colors disabled:opacity-50">
                {creating ? 'Creating...' : 'Create Account'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
