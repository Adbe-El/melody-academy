import { supabase } from '../lib/supabase';
import { createAppError } from '../lib/errors';
import { createService } from './factory';
import type { Certificate } from '../types';

export const certificatesService = createService<Certificate>('certificates');

export async function getCertificatesByLearner(learnerId: string): Promise<Certificate[]> {
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .eq('learner_id', learnerId)
    .order('issue_date', { ascending: false });
  if (error) throw createAppError('FETCH_CERTS_BY_LEARNER', error.message, error);
  return data as Certificate[];
}
