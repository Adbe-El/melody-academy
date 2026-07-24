import { supabase } from '../lib/supabase';
import { createAppError } from '../lib/errors';
import { createService } from './factory';
import type { Learner } from '../types';

export const learnersService = createService<Learner>('learners');

export async function getLearnersByProgramme(programmeId: string): Promise<Learner[]> {
  const { data, error } = await supabase
    .from('learners')
    .select('*')
    .eq('programme_id', programmeId)
    .order('created_at', { ascending: false });
  if (error) throw createAppError('FETCH_LEARNERS_BY_PROGRAMME', error.message, error);
  return data as Learner[];
}

export async function getLearnerByUserId(userId: string): Promise<Learner | null> {
  const { data, error } = await supabase
    .from('learners')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error) return null;
  return data as Learner;
}
