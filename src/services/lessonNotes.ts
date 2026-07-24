import { supabase } from '../lib/supabase';
import { createAppError } from '../lib/errors';
import { createService } from './factory';
import type { LessonNote } from '../types';

export const lessonNotesService = createService<LessonNote>('lesson_notes');

export async function getLessonNotesByLearner(learnerId: string): Promise<LessonNote[]> {
  const { data, error } = await supabase
    .from('lesson_notes')
    .select('*')
    .eq('learner_id', learnerId)
    .order('created_at', { ascending: false });
  if (error) throw createAppError('FETCH_NOTES_BY_LEARNER', error.message, error);
  return data as LessonNote[];
}

export async function getLessonNotesByProgramme(programmeId: string): Promise<LessonNote[]> {
  const { data, error } = await supabase
    .from('lesson_notes')
    .select('*')
    .eq('programme_id', programmeId)
    .is('learner_id', null)
    .order('created_at', { ascending: false });
  if (error) throw createAppError('FETCH_NOTES_BY_PROGRAMME', error.message, error);
  return data as LessonNote[];
}
