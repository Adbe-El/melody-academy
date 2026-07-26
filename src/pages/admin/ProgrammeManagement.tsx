import React, { useState, useMemo, useCallback } from 'react';
import { BookOpen, Search, Plus, Pencil, Trash2 } from 'lucide-react';
import { programmesService } from '../../services/programmes';
import { useAdmin } from '../../context/AdminContext';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Skeleton } from '../../components/ui/Skeleton';
import type { Programme } from '../../types';

const CATEGORIES = ['Keyboard', 'Guitar', 'Vocals', 'Drums', 'Production', 'Strings', 'Theory', 'Exam Prep'] as const;
const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'] as const;

export const ProgrammeManagement: React.FC = () => {
  const { programmes, loading, refreshProgrammes } = useAdmin();
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Programme | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'Keyboard' as Programme['category'], description: '', level: 'Beginner' as Programme['level'], duration: '', ageGroup: 'All Ages' as Programme['ageGroup'], imageUrl: '', featured: false });

  const filtered = useMemo(() => programmes.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  ), [programmes, search]);

  const resetForm = useCallback(() => setForm({ title: '', category: 'Keyboard', description: '', level: 'Beginner', duration: '', ageGroup: 'All Ages', imageUrl: '', featured: false }), []);

  const handleSave = useCallback(async () => {
    try {
      if (editing) {
        await programmesService.update(editing.id, form);
      } else {
        await programmesService.create(form);
      }
      await refreshProgrammes();
      setEditing(null);
      setShowNew(false);
      resetForm();
    } catch { /* empty */ }
  }, [editing, form, resetForm, refreshProgrammes]);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('Delete this programme?')) return;
    try {
      await programmesService.delete(id);
      await refreshProgrammes();
    } catch { /* empty */ }
  }, [refreshProgrammes]);

  const openEdit = useCallback((p: Programme) => {
    setForm({ title: p.title, category: p.category, description: p.description, level: p.level, duration: p.duration, ageGroup: p.ageGroup, imageUrl: p.imageUrl, featured: p.featured || false });
    setEditing(p);
  }, []);

  if (loading) return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-2"><Skeleton variant="table-row" count={5} /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-gray-900">Programmes</h1>
            <p className="text-xs text-gray-500">{programmes.length} programmes</p>
          </div>
        </div>
        <button
          onClick={() => { resetForm(); setShowNew(true); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-academy-emerald text-white text-sm font-semibold hover:bg-academy-emerald-dark transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Programme
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search programmes..."
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
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Level</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Featured</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-semibold text-gray-900">{p.title}</td>
                  <td className="p-4"><Badge variant="emerald">{p.category}</Badge></td>
                  <td className="p-4">{p.level}</td>
                  <td className="p-4">{p.duration}</td>
                  <td className="p-4">{p.featured ? <Badge variant="gold">Featured</Badge> : <span className="text-gray-400">—</span>}</td>
                  <td className="p-4 text-right space-x-1">
                    <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-academy-sage text-gray-500 hover:text-academy-emerald transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-gray-400 text-sm">No programmes found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New/Edit Modal */}
      <Modal isOpen={showNew || !!editing} onClose={() => { setShowNew(false); setEditing(null); }} title={editing ? 'Edit Programme' : 'New Programme'} size="lg">
        <div className="space-y-4 text-sm">
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Title</label>
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Category</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as Programme['category'] }))} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Level</label>
              <select value={form.level} onChange={e => setForm(f => ({ ...f, level: e.target.value as Programme['level'] }))} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white">
                {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Duration</label>
              <input value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20" placeholder="e.g. 12 weeks" />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Image URL</label>
              <input value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Description</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20 resize-none" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="rounded border-gray-300" />
            <label htmlFor="featured" className="text-sm font-medium text-gray-700">Featured programme</label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => { setShowNew(false); setEditing(null); }} className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
            <button onClick={handleSave} disabled={!form.title} className="px-4 py-2 rounded-xl bg-academy-emerald text-white text-sm font-semibold hover:bg-academy-emerald-dark transition-colors disabled:opacity-50">
              {editing ? 'Save Changes' : 'Create Programme'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
