import { supabase } from '../lib/supabase';
import { createAppError } from '../lib/errors';
import { createService } from './factory';
import type { Learner } from '../types';

const LEARNER_SELECT = `
  id, user_id, programme_id, enrolment_date, progress, certificate_status, created_at,
  users:user_id ( id, first_name, last_name, email, avatar_url, status ),
  programmes:programme_id ( id, title )
`;

interface LearnerRow {
  id: string;
  user_id: string;
  programme_id: string;
  enrolment_date: string;
  progress: number;
  certificate_status: string;
  created_at: string;
  users: { id: string; first_name: string; last_name: string; email: string; avatar_url: string; status: string } | null;
  programmes: { id: string; title: string } | null;
}

function mapLearnerRow(row: LearnerRow): Learner {
  return {
    id: row.id,
    user_id: row.user_id,
    programme_id: row.programme_id,
    enrolment_date: row.enrolment_date,
    progress: row.progress,
    certificate_status: row.certificate_status as Learner['certificate_status'],
    created_at: row.created_at,
    full_name: row.users ? `${row.users.first_name} ${row.users.last_name}` : '',
    email: row.users?.email || '',
    programme_title: row.programmes?.title || '',
  };
}

export async function getAllLearners(): Promise<Learner[]> {
  const { data, error } = await supabase
    .from('learners')
    .select(LEARNER_SELECT)
    .order('created_at', { ascending: false });
  if (error) throw createAppError('FETCH_LEARNERS', error.message, error);
  return (data as unknown as LearnerRow[]).map(mapLearnerRow);
}

export async function getLearnersByProgramme(programmeId: string): Promise<Learner[]> {
  const { data, error } = await supabase
    .from('learners')
    .select(LEARNER_SELECT)
    .eq('programme_id', programmeId)
    .order('created_at', { ascending: false });
  if (error) throw createAppError('FETCH_LEARNERS_BY_PROGRAMME', error.message, error);
  return (data as unknown as LearnerRow[]).map(mapLearnerRow);
}

export async function getLearnerByUserId(userId: string): Promise<Learner | null> {
  const { data, error } = await supabase
    .from('learners')
    .select(LEARNER_SELECT)
    .eq('user_id', userId)
    .single();
  if (error) return null;
  return mapLearnerRow(data as unknown as LearnerRow);
}

// Keep a compatibility export for factory-based usage (not used for reads anymore)
export const learnersService = {
  getAll: getAllLearners,
  getById: async (id: string): Promise<Learner> => {
    const { data, error } = await supabase
      .from('learners')
      .select(LEARNER_SELECT)
      .eq('id', id)
      .single();
    if (error) throw createAppError('FETCH_LEARNER_BY_ID', error.message, error);
    return mapLearnerRow(data as unknown as LearnerRow);
  },
  create: async (record: Record<string, unknown>): Promise<Learner> => {
    const { data, error } = await supabase
      .from('learners')
      .insert(record)
      .select(LEARNER_SELECT)
      .single();
    if (error) throw createAppError('CREATE_LEARNER', error.message, error);
    return mapLearnerRow(data as unknown as LearnerRow);
  },
  update: async (id: string, updates: Partial<Learner>): Promise<Learner> => {
    const { data, error } = await supabase
      .from('learners')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select(LEARNER_SELECT)
      .single();
    if (error) throw createAppError('UPDATE_LEARNER', error.message, error);
    return mapLearnerRow(data as unknown as LearnerRow);
  },
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase.from('learners').delete().eq('id', id);
    if (error) throw createAppError('DELETE_LEARNER', error.message, error);
  },
};
