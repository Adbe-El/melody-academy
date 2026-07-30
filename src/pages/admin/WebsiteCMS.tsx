import React, { useState, useCallback } from 'react';
import { Globe, Plus, Pencil, Trash2 } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { websiteContentService } from '../../services/websiteContent';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Skeleton } from '../../components/ui/Skeleton';
import type { WebsiteContent } from '../../types';

const SECTIONS = ['hero', 'testimonial', 'faq', 'partner', 'stat', 'cta'] as const;

export const WebsiteCMS: React.FC = () => {
  const { websiteContent: items, loading, refreshWebsiteContent } = useAdmin();
  const [sectionFilter, setSectionFilter] = useState<string>('all');
  const [showNew, setShowNew] = useState(false);
  const [editing, setEditing] = useState<WebsiteContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ section: 'hero' as WebsiteContent['section'], title: '', content: '', image_url: '', active: true });

  const filtered = sectionFilter === 'all' ? items : items.filter(i => i.section === sectionFilter);
  const sorted = [...filtered].sort((a, b) => (a.order || 0) - (b.order || 0));

  const resetForm = useCallback(() => setForm({ section: 'hero', title: '', content: '', image_url: '', active: true }), []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      if (editing) {
        await websiteContentService.update(editing.id, {
          section: form.section,
          title: form.title,
          content: form.content,
          image_url: form.image_url || undefined,
          active: form.active,
        });
      } else {
        const maxOrder = items.reduce((max, i) => Math.max(max, i.order || 0), 0);
        await websiteContentService.create({
          section: form.section,
          title: form.title,
          content: form.content,
          image_url: form.image_url || undefined,
          active: form.active,
          order: maxOrder + 1,
        });
      }
      await refreshWebsiteContent();
      setEditing(null);
      setShowNew(false);
      resetForm();
    } catch { /* empty */ }
    setSaving(false);
  }, [editing, form, items, resetForm, refreshWebsiteContent]);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('Delete this item?')) return;
    try {
      await websiteContentService.delete(id);
      await refreshWebsiteContent();
    } catch { /* empty */ }
  }, [refreshWebsiteContent]);

  const toggleActive = useCallback(async (item: WebsiteContent) => {
    try {
      await websiteContentService.update(item.id, { active: !item.active });
      await refreshWebsiteContent();
    } catch { /* empty */ }
  }, [refreshWebsiteContent]);

  const openEdit = useCallback((item: WebsiteContent) => {
    setForm({ section: item.section, title: item.title, content: item.content, image_url: item.image_url || '', active: item.active });
    setEditing(item);
  }, []);

  if (loading) return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-2"><Skeleton variant="table-row" count={5} /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-gray-900">Website Content</h1>
            <p className="text-xs text-gray-500">{items.length} items across {SECTIONS.length} sections</p>
          </div>
        </div>
        <button
          onClick={() => { resetForm(); setShowNew(true); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-academy-emerald text-white text-sm font-semibold hover:bg-academy-emerald-dark transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Content
        </button>
      </div>

      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 flex-wrap">
        <button
          onClick={() => setSectionFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${sectionFilter === 'all' ? 'bg-white text-academy-emerald shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          All ({items.length})
        </button>
        {SECTIONS.map(s => (
          <button
            key={s}
            onClick={() => setSectionFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${sectionFilter === s ? 'bg-white text-academy-emerald shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {s} ({items.filter(i => i.section === s).length})
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {sorted.map(item => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-4 flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={item.section === 'hero' ? 'emerald' : item.section === 'testimonial' ? 'gold' : item.section === 'faq' ? 'gray' : 'emerald'}>
                  {item.section}
                </Badge>
                {!item.active && <Badge variant="red">Hidden</Badge>}
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{item.content}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => toggleActive(item)} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-colors ${item.active ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                {item.active ? 'Live' : 'Hidden'}
              </button>
              <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-academy-sage text-gray-500 hover:text-academy-emerald transition-colors"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {sorted.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200/80 p-8 text-center text-gray-400 text-sm">No content items found.</div>
        )}
      </div>

      <Modal isOpen={showNew || !!editing} onClose={() => { setShowNew(false); setEditing(null); }} title={editing ? 'Edit Content' : 'New Content'} size="lg">
        <div className="space-y-4 text-sm">
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Section</label>
            <select value={form.section} onChange={e => setForm(f => ({ ...f, section: e.target.value as WebsiteContent['section'] }))} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white">
              {SECTIONS.map(s => <option key={s} value={s}>{s.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Title</label>
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20" />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Content</label>
            <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={4} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20 resize-none" />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Image URL (optional)</label>
            <input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="active" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} className="rounded border-gray-300" />
            <label htmlFor="active" className="text-sm font-medium text-gray-700">Visible on site</label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => { setShowNew(false); setEditing(null); }} className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
            <button onClick={handleSave} disabled={saving || !form.title} className="px-4 py-2 rounded-xl bg-academy-emerald text-white text-sm font-semibold hover:bg-academy-emerald-dark transition-colors disabled:opacity-50">
              {saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Content'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
