import { supabase } from '../lib/supabase';
import { createAppError } from '../lib/errors';

import type { Assignment } from '../types';

const ASSIGNMENT_SELECT = `
  id, programme_id, learner_id, title, instructions, due_date, status, created_at,
  programmes:programme_id ( id, title )
`;

interface AssignmentRow {
  id: string;
  programme_id: string;
  learner_id: string;
  title: string;
  instructions: string | null;
  due_date: string;
  status: string;
  created_at: string;
  programmes: { id: string; title: string } | null;
}

function mapAssignmentRow(row: AssignmentRow): Assignment {
  return {
    id: row.id,
    programme_id: row.programme_id,
    learner_id: row.learner_id,
    title: row.title,
    instructions: row.instructions || undefined,
    due_date: row.due_date,
    status: row.status as Assignment['status'],
    created_at: row.created_at,
    programme_title: row.programmes?.title || '',
  };
}

export async function getAssignmentsByLearner(learnerId: string): Promise<Assignment[]> {
  const { data, error } = await supabase
    .from('assignments')
    .select(ASSIGNMENT_SELECT)
    .eq('learner_id', learnerId)
    .order('created_at', { ascending: false });
  if (error) throw createAppError('FETCH_ASSIGNMENTS_BY_LEARNER', error.message, error);
  return (data as unknown as AssignmentRow[]).map(mapAssignmentRow);
}

export const assignmentsService = {
  getAll: async (): Promise<Assignment[]> => {
    const { data, error } = await supabase
      .from('assignments')
      .select(ASSIGNMENT_SELECT)
      .order('created_at', { ascending: false });
    if (error) throw createAppError('FETCH_ASSIGNMENTS', error.message, error);
    return (data as unknown as AssignmentRow[]).map(mapAssignmentRow);
  },
  getById: async (id: string): Promise<Assignment> => {
    const { data, error } = await supabase
      .from('assignments')
      .select(ASSIGNMENT_SELECT)
      .eq('id', id)
      .single();
    if (error) throw createAppError('FETCH_ASSIGNMENT_BY_ID', error.message, error);
    return mapAssignmentRow(data as unknown as AssignmentRow);
  },
  create: async (record: Record<string, unknown>): Promise<Assignment> => {
    const { data, error } = await supabase
      .from('assignments')
      .insert(record)
      .select(ASSIGNMENT_SELECT)
      .single();
    if (error) throw createAppError('CREATE_ASSIGNMENT', error.message, error);
    return mapAssignmentRow(data as unknown as AssignmentRow);
  },
  update: async (id: string, updates: Partial<Assignment>): Promise<Assignment> => {
    const { data, error } = await supabase
      .from('assignments')
      .update(updates)
      .eq('id', id)
      .select(ASSIGNMENT_SELECT)
      .single();
    if (error) throw createAppError('UPDATE_ASSIGNMENT', error.message, error);
    return mapAssignmentRow(data as unknown as AssignmentRow);
  },
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase.from('assignments').delete().eq('id', id);
    if (error) throw createAppError('DELETE_ASSIGNMENT', error.message, error);
  },
};
