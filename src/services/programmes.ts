import { supabase } from '../lib/supabase';
import { createAppError } from '../lib/errors';
import { createService } from './factory';
import type { Programme } from '../types';

export const programmesService = createService<Programme>('programmes');

export async function getFeaturedProgrammes(): Promise<Programme[]> {
  const { data, error } = await supabase
    .from('programmes')
    .select('*')
    .eq('featured', true)
    .eq('status', 'active')
    .order('created_at', { ascending: false });
  if (error) throw createAppError('FETCH_FEATURED', error.message, error);
  return data as Programme[];
}

export async function getProgrammesByCategory(category: string): Promise<Programme[]> {
  const { data, error } = await supabase
    .from('programmes')
    .select('*')
    .eq('category', category)
    .eq('status', 'active')
    .order('created_at', { ascending: false });
  if (error) throw createAppError('FETCH_BY_CATEGORY', error.message, error);
  return data as Programme[];
}
