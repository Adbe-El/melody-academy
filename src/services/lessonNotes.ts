import { supabase } from '../lib/supabase';
import { createAppError } from '../lib/errors';

import type { LessonNote } from '../types';

const NOTE_SELECT = `
  id, programme_id, learner_id, title, topic, content, practice_goals, file_url, video_url, upload_date, created_at,
  programmes:programme_id ( id, title )
`;

interface NoteRow {
  id: string;
  programme_id: string;
  learner_id: string | null;
  title: string;
  topic: string | null;
  content: string;
  practice_goals: string | null;
  file_url: string | null;
  video_url: string | null;
  upload_date: string;
  created_at: string;
  programmes: { id: string; title: string } | null;
}

function mapNoteRow(row: NoteRow): LessonNote {
  return {
    id: row.id,
    programme_id: row.programme_id,
    learner_id: row.learner_id || undefined,
    title: row.title,
    topic: row.topic || undefined,
    content: row.content,
    practice_goals: row.practice_goals || undefined,
    file_url: row.file_url || undefined,
    video_url: row.video_url || undefined,
    upload_date: row.upload_date,
    created_at: row.created_at,
    programme_title: row.programmes?.title || '',
  };
}

export async function getLessonNotesByLearner(learnerId: string): Promise<LessonNote[]> {
  const { data, error } = await supabase
    .from('lesson_notes')
    .select(NOTE_SELECT)
    .eq('learner_id', learnerId)
    .order('created_at', { ascending: false });
  if (error) throw createAppError('FETCH_LESSON_NOTES_BY_LEARNER', error.message, error);
  return (data as unknown as NoteRow[]).map(mapNoteRow);
}

export const lessonNotesService = {
  getAll: async (): Promise<LessonNote[]> => {
    const { data, error } = await supabase
      .from('lesson_notes')
      .select(NOTE_SELECT)
      .order('created_at', { ascending: false });
    if (error) throw createAppError('FETCH_LESSON_NOTES', error.message, error);
    return (data as unknown as NoteRow[]).map(mapNoteRow);
  },
  getById: async (id: string): Promise<LessonNote> => {
    const { data, error } = await supabase
      .from('lesson_notes')
      .select(NOTE_SELECT)
      .eq('id', id)
      .single();
    if (error) throw createAppError('FETCH_LESSON_NOTE_BY_ID', error.message, error);
    return mapNoteRow(data as unknown as NoteRow);
  },
  create: async (record: Record<string, unknown>): Promise<LessonNote> => {
    const { data, error } = await supabase
      .from('lesson_notes')
      .insert(record)
      .select(NOTE_SELECT)
      .single();
    if (error) throw createAppError('CREATE_LESSON_NOTE', error.message, error);
    return mapNoteRow(data as unknown as NoteRow);
  },
  update: async (id: string, updates: Partial<LessonNote>): Promise<LessonNote> => {
    const { data, error } = await supabase
      .from('lesson_notes')
      .update(updates)
      .eq('id', id)
      .select(NOTE_SELECT)
      .single();
    if (error) throw createAppError('UPDATE_LESSON_NOTE', error.message, error);
    return mapNoteRow(data as unknown as NoteRow);
  },
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase.from('lesson_notes').delete().eq('id', id);
    if (error) throw createAppError('DELETE_LESSON_NOTE', error.message, error);
  },
};
