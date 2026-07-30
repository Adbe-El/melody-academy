import React, { useState, useMemo, useCallback } from 'react';
import { Package, Search, Plus, Pencil, Trash2 } from 'lucide-react';
import { instrumentsService } from '../../services/instruments';
import { useAdmin } from '../../context/AdminContext';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Skeleton } from '../../components/ui/Skeleton';
import type { Instrument } from '../../types';

const CATEGORIES = ['Keyboard', 'Guitar', 'Strings', 'Drums & Percussion', 'Wind', 'Accessories'] as const;
const CONDITIONS = ['Brand New', 'Certified Pre-owned'] as const;

export const InstrumentManagement: React.FC = () => {
  const { instruments, loading, refreshInstruments } = useAdmin();
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Instrument | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ name: '', category_id: 'Keyboard', price: '', description: '', image_url: '', availability: true, condition: 'Brand New' as Instrument['condition'], specifications: '' as string });

  const filtered = useMemo(() => instruments.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) || i.category_id.toLowerCase().includes(search.toLowerCase())
  ), [instruments, search]);

  const resetForm = useCallback(() => setForm({ name: '', category_id: 'Keyboard', price: '', description: '', image_url: '', availability: true, condition: 'Brand New', specifications: '' }), []);

  const handleSave = useCallback(async () => {
    try {
      const payload = { ...form, specifications: form.specifications.split(',').map(s => s.trim()).filter(Boolean) };
      if (editing) {
        await instrumentsService.update(editing.id, payload);
      } else {
        await instrumentsService.create(payload);
      }
      await refreshInstruments();
      setEditing(null);
      setShowNew(false);
      resetForm();
    } catch { /* empty */ }
  }, [editing, form, resetForm, refreshInstruments]);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('Delete this instrument?')) return;
    try {
      await instrumentsService.delete(id);
      await refreshInstruments();
    } catch { /* empty */ }
  }, [refreshInstruments]);

  const openEdit = useCallback((i: Instrument) => {
    setForm({ name: i.name, category_id: i.category_id, price: i.price, description: i.description, image_url: i.image_url, availability: i.availability, condition: i.condition, specifications: (i.specifications || []).join(', ') });
    setEditing(i);
  }, []);

  if (loading) return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-2"><Skeleton variant="table-row" count={5} /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-gray-900">Instruments</h1>
            <p className="text-xs text-gray-500">{instruments.length} instruments</p>
          </div>
        </div>
        <button
          onClick={() => { resetForm(); setShowNew(true); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-academy-emerald text-white text-sm font-semibold hover:bg-academy-emerald-dark transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Instrument
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search instruments..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20 focus:border-academy-emerald"
        />
      </div>

      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-academy-sage text-academy-charcoal font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Condition</th>
                <th className="p-4">In Stock</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(i => (
                <tr key={i.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-semibold text-gray-900">{i.name}</td>
                  <td className="p-4"><Badge variant="emerald">{i.category_name}</Badge></td>
                  <td className="p-4 font-semibold">{i.price}</td>
                  <td className="p-4"><Badge variant={i.condition === 'Brand New' ? 'green' : 'gold'}>{i.condition}</Badge></td>
                  <td className="p-4">{i.availability ? <Badge variant="green">Yes</Badge> : <Badge variant="red">No</Badge>}</td>
                  <td className="p-4 text-right space-x-1">
                    <button onClick={() => openEdit(i)} className="p-2 rounded-lg hover:bg-academy-sage text-gray-500 hover:text-academy-emerald transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(i.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-gray-400 text-sm">No instruments found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={showNew || !!editing} onClose={() => { setShowNew(false); setEditing(null); }} title={editing ? 'Edit Instrument' : 'New Instrument'} size="lg">
        <div className="space-y-4 text-sm">
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Name</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Category</label>
              <select value={form.category_id} onChange={e => setForm(f => ({ ...f, category_id: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Condition</label>
              <select value={form.condition} onChange={e => setForm(f => ({ ...f, condition: e.target.value as Instrument['condition'] }))} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white">
                {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Price</label>
              <input value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20" placeholder="e.g. ₦250,000" />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Image URL</label>
              <input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Description</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20 resize-none" />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Specifications (comma-separated)</label>
            <input value={form.specifications} onChange={e => setForm(f => ({ ...f, specifications: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20" placeholder="e.g. 88 keys, weighted, USB output" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="availability" checked={form.availability} onChange={e => setForm(f => ({ ...f, availability: e.target.checked }))} className="rounded border-gray-300" />
            <label htmlFor="availability" className="text-sm font-medium text-gray-700">In Stock</label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => { setShowNew(false); setEditing(null); }} className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
            <button onClick={handleSave} disabled={!form.name} className="px-4 py-2 rounded-xl bg-academy-emerald text-white text-sm font-semibold hover:bg-academy-emerald-dark transition-colors disabled:opacity-50">
              {editing ? 'Save Changes' : 'Add Instrument'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
