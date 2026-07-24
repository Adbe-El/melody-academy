import { supabase } from '../lib/supabase';
import { createAppError } from '../lib/errors';
import { createService } from './factory';
import type { Assignment } from '../types';

export const assignmentsService = createService<Assignment>('assignments');

export async function getAssignmentsByLearner(learnerId: string): Promise<Assignment[]> {
  const { data, error } = await supabase
    .from('assignments')
    .select('*')
    .eq('learner_id', learnerId)
    .order('due_date', { ascending: true });
  if (error) throw createAppError('FETCH_ASSIGNMENTS_BY_LEARNER', error.message, error);
  return data as Assignment[];
}
