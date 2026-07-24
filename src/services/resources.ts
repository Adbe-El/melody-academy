import { supabase } from '../lib/supabase';
import { createAppError } from '../lib/errors';
import { createService } from './factory';
import type { LMSResource } from '../types';

export const resourcesService = createService<LMSResource>('learning_resources');

export async function getResourcesByProgramme(programmeId: string): Promise<LMSResource[]> {
  const { data, error } = await supabase
    .from('learning_resources')
    .select('*')
    .eq('programme_id', programmeId)
    .order('created_at', { ascending: false });
  if (error) throw createAppError('FETCH_RESOURCES_BY_PROGRAMME', error.message, error);
  return data as LMSResource[];
}
