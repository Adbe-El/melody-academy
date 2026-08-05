import { supabase } from '../lib/supabase';
import { createAppError } from '../lib/errors';

interface ExamRegistration {
  id: string;
  learner_name: string;
  email: string;
  phone?: string;
  exam_type: 'practical' | 'theory';
  exam_board: 'ABRSM' | 'Trinity' | 'MUSON' | 'ISoM';
  level: string;
  preferred_start_date?: string;
  notes?: string;
  status: 'new' | 'in_progress' | 'registered' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export const examRegistrationsService = {
  getAll: async (): Promise<ExamRegistration[]> => {
    const { data, error } = await supabase
      .from('exam_registrations')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw createAppError('FETCH_EXAM_REGISTRATIONS', error.message, error);
    return data as unknown as ExamRegistration[];
  },
  create: async (input: Record<string, unknown>): Promise<ExamRegistration> => {
    const { data, error } = await supabase
      .from('exam_registrations')
      .insert({ ...input, created_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .select()
      .single();
    if (error) throw createAppError('CREATE_EXAM_REGISTRATION', error.message, error);
    return data as unknown as ExamRegistration;
  },
  update: async (id: string, updates: Partial<ExamRegistration>): Promise<ExamRegistration> => {
    const { data, error } = await supabase
      .from('exam_registrations')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw createAppError('UPDATE_EXAM_REGISTRATION', error.message, error);
    return data as unknown as ExamRegistration;
  },
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase.from('exam_registrations').delete().eq('id', id);
    if (error) throw createAppError('DELETE_EXAM_REGISTRATION', error.message, error);
  },
};
