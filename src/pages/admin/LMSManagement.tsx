import React, { useState, useMemo, useCallback } from 'react';
import { BookOpen, FileText, BookMarked, Search, Plus, Pencil, Trash2, StickyNote } from 'lucide-react';
import { lessonNotesService } from '../../services/lessonNotes';
import { assignmentsService } from '../../services/assignments';
import { resourcesService } from '../../services/resources';
import { useAdmin } from '../../context/AdminContext';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Skeleton } from '../../components/ui/Skeleton';
import type { LessonNote, Assignment, LMSResource } from '../../types';

type Tab = 'notes' | 'assignments' | 'resources';

export const LMSManagement: React.FC = () => {
  const { programmes, lessonNotes: notes, assignments, lmsResources: resources, loading, refreshLessonNotes, refreshAssignments, refreshLmsResources } = useAdmin();
  const [tab, setTab] = useState<Tab>('notes');
  const [search, setSearch] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [editing, setEditing] = useState<LessonNote | Assignment | LMSResource | null>(null);

  const tabs = [
    { key: 'notes' as Tab, label: 'Lesson Notes', icon: StickyNote, count: notes.length },
    { key: 'assignments' as Tab, label: 'Assignments', icon: FileText, count: assignments.length },
    { key: 'resources' as Tab, label: 'Resources', icon: BookMarked, count: resources.length },
  ];

  const filteredNotes = useMemo(() => notes.filter(n => n.title?.toLowerCase().includes(search.toLowerCase()) || n.topic?.toLowerCase().includes(search.toLowerCase())), [notes, search]);
  const filteredAssignments = useMemo(() => assignments.filter(a => a.title?.toLowerCase().includes(search.toLowerCase())), [assignments, search]);
  const filteredResources = useMemo(() => resources.filter(r => r.title?.toLowerCase().includes(search.toLowerCase())), [resources, search]);

  const getProgrammeName = useCallback((id: string) => programmes.find(p => p.id === id)?.title || '—', [programmes]);

  if (loading) return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-2"><Skeleton variant="table-row" count={5} /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-serif text-2xl font-bold text-gray-900">LMS Content</h1>
          <p className="text-xs text-gray-500">Manage lesson notes, assignments, and resources</p>
        </div>
      </div>

      <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setSearch(''); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              tab === t.key ? 'bg-white text-academy-emerald shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <t.icon className="w-3.5 h-3.5" />
            {t.label}
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-gray-200 text-[10px]">{t.count}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${tab}...`}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20 focus:border-academy-emerald"
          />
        </div>
        <button
          onClick={() => { setEditing(null); setShowNew(true); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-academy-emerald text-white text-sm font-semibold hover:bg-academy-emerald-dark transition-colors"
        >
          <Plus className="w-4 h-4" /> Add {tab === 'notes' ? 'Note' : tab === 'assignments' ? 'Assignment' : 'Resource'}
        </button>
      </div>

      {tab === 'notes' && (
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-academy-sage text-academy-charcoal font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Topic</th>
                <th className="p-4">Programme</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredNotes.map(n => (
                <tr key={n.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-semibold text-gray-900">{n.title}</td>
                  <td className="p-4"><Badge variant="emerald">{n.topic}</Badge></td>
                  <td className="p-4">—</td>
                  <td className="p-4 text-gray-500">{n.upload_date?.split('T')[0]}</td>
                  <td className="p-4 text-right space-x-1">
                    <button onClick={() => { setEditing(n); setShowNew(true); }} className="p-2 rounded-lg hover:bg-academy-sage text-gray-500 hover:text-academy-emerald transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={async () => { if (confirm('Delete?')) { await lessonNotesService.delete(n.id); await refreshLessonNotes(); } }} className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
              {filteredNotes.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-gray-400 text-sm">No lesson notes found.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'assignments' && (
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-academy-sage text-academy-charcoal font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Feedback</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAssignments.map(a => (
                <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-semibold text-gray-900">{a.title}</td>
                  <td className="p-4 text-gray-500">{a.due_date?.split('T')[0]}</td>
                  <td className="p-4"><Badge variant={a.status === 'reviewed' ? 'green' : a.status === 'submitted' ? 'emerald' : 'gold'}>{a.status}</Badge></td>
                  <td className="p-4 text-gray-500 truncate max-w-[200px]">—</td>
                  <td className="p-4 text-right space-x-1">
                    <button onClick={() => { setEditing(a); setShowNew(true); }} className="p-2 rounded-lg hover:bg-academy-sage text-gray-500 hover:text-academy-emerald transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={async () => { if (confirm('Delete?')) { await assignmentsService.delete(a.id); await refreshAssignments(); } }} className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
              {filteredAssignments.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-gray-400 text-sm">No assignments found.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'resources' && (
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-academy-sage text-academy-charcoal font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Type</th>
                <th className="p-4">Programme</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredResources.map(r => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-semibold text-gray-900">{r.title}</td>
                  <td className="p-4"><Badge variant="emerald">{r.type}</Badge></td>
                  <td className="p-4">{getProgrammeName(r.programme_id)}</td>
                  <td className="p-4"><Badge variant="gold">{r.category}</Badge></td>
                  <td className="p-4 text-right space-x-1">
                    <button onClick={() => { setEditing(r); setShowNew(true); }} className="p-2 rounded-lg hover:bg-academy-sage text-gray-500 hover:text-academy-emerald transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={async () => { if (confirm('Delete?')) { await resourcesService.delete(r.id); await refreshLmsResources(); } }} className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
              {filteredResources.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-gray-400 text-sm">No resources found.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      <LMSModal
        isOpen={showNew}
        onClose={() => { setShowNew(false); setEditing(null); }}
        tab={tab}
        editing={editing}
        programmes={programmes}
        onSuccess={async () => {
          setShowNew(false);
          setEditing(null);
          await Promise.allSettled([refreshLessonNotes(), refreshAssignments(), refreshLmsResources()]);
        }}
      />
    </div>
  );
};

const LMSModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  tab: Tab;
  editing: LessonNote | Assignment | LMSResource | null;
  programmes: { id: string; title: string }[];
  onSuccess: () => void;
}> = ({ isOpen, onClose, tab, editing, programmes, onSuccess }) => {
  const [form, setForm] = useState<Record<string, string>>({});

  React.useEffect(() => {
    if (editing) {
      setForm(Object.fromEntries(Object.entries(editing).filter(([k]) => !['id', 'created_at', 'updated_at'].includes(k)).map(([k, v]) => [k, String(v ?? '')])));
    } else {
      setForm(tab === 'notes' ? { title: '', topic: '', content: '', practice_goals: '', video_url: '', programme_id: '', learner_id: '' }
        : tab === 'assignments' ? { title: '', instructions: '', due_date: '', learner_id: '', status: 'pending' }
        : { title: '', type: 'pdf', file_url: '', video_url: '', programme_id: '', category: '' });
    }
  }, [editing, tab, isOpen]);

  const handleSave = async () => {
    try {
      if (tab === 'notes') {
        if (editing) { await lessonNotesService.update(editing.id, form); } else { await lessonNotesService.create(form); }
      } else if (tab === 'assignments') {
        if (editing) { await assignmentsService.update(editing.id, form); } else { await assignmentsService.create(form); }
      } else {
        if (editing) { await resourcesService.update(editing.id, form); } else { await resourcesService.create(form); }
      }
      onSuccess();
    } catch { /* empty */ }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editing ? `Edit ${tab === 'notes' ? 'Note' : tab === 'assignments' ? 'Assignment' : 'Resource'}` : `New ${tab === 'notes' ? 'Note' : tab === 'assignments' ? 'Assignment' : 'Resource'}`} size="lg">
      <div className="space-y-4 text-sm">
        <div>
          <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Title</label>
          <input value={form.title || ''} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20" />
        </div>

          {tab === 'notes' && (
          <>
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Topic</label>
              <input value={form.topic || ''} onChange={e => setForm(f => ({ ...f, topic: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20" />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Content</label>
              <textarea value={form.content || ''} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={4} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20 resize-none" />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Practice Goals</label>
              <textarea value={form.practice_goals || ''} onChange={e => setForm(f => ({ ...f, practice_goals: e.target.value }))} rows={2} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20 resize-none" />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">YouTube Video URL (optional)</label>
              <input value={form.video_url || ''} onChange={e => setForm(f => ({ ...f, video_url: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20" placeholder="https://youtube.com/watch?v=..." />
            </div>
          </>
        )}

        {tab === 'assignments' && (
          <>
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Description</label>
              <textarea value={form.instructions || ''} onChange={e => setForm(f => ({ ...f, instructions: e.target.value }))} rows={3} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20 resize-none" />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Due Date</label>
              <input type="date" value={form.due_date?.split('T')[0] || ''} onChange={e => setForm(f => ({ ...f, due_date: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20" />
            </div>
          </>
        )}

        {tab === 'resources' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">File Type</label>
                <select value={form.type || 'pdf'} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white">
                  <option value="pdf">PDF</option>
                  <option value="audio">Audio</option>
                  <option value="sheet_music">Sheet Music</option>
                  <option value="video">Video</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Category</label>
                <input value={form.category || ''} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">File URL</label>
              <input value={form.file_url || ''} onChange={e => setForm(f => ({ ...f, file_url: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20" />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">YouTube Video URL (optional)</label>
              <input value={form.video_url || ''} onChange={e => setForm(f => ({ ...f, video_url: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald/20" placeholder="https://youtube.com/watch?v=..." />
            </div>
          </>
        )}

        <div>
          <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Programme</label>
          <select value={form.programme_id || ''} onChange={e => setForm(f => ({ ...f, programme_id: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white">
            <option value="">Select programme</option>
            {programmes.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
          <button onClick={handleSave} disabled={!form.title} className="px-4 py-2 rounded-xl bg-academy-emerald text-white text-sm font-semibold hover:bg-academy-emerald-dark transition-colors disabled:opacity-50">
            {editing ? 'Save Changes' : 'Create'}
          </button>
        </div>
      </div>
    </Modal>
  );
};
