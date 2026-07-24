import { supabase } from '../lib/supabase';
import { createAppError } from '../lib/errors';
import { createService } from './factory';
import type { Instrument } from '../types';

export const instrumentsService = createService<Instrument>('instruments');

export async function getInstrumentsByCategory(categoryId: string): Promise<Instrument[]> {
  const { data, error } = await supabase
    .from('instruments')
    .select('*')
    .eq('category_id', categoryId)
    .eq('status', 'active')
    .order('created_at', { ascending: false });
  if (error) throw createAppError('FETCH_BY_CATEGORY', error.message, error);
  return data as Instrument[];
}
