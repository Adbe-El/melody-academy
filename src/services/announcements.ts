import { supabase } from '../lib/supabase';
import { createAppError } from '../lib/errors';
import { createService } from './factory';
import type { Announcement } from '../types';

export const announcementsService = createService<Announcement>('announcements');

export async function getImportantAnnouncements(): Promise<Announcement[]> {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .eq('important', true)
    .order('date', { ascending: false });
  if (error) throw createAppError('FETCH_IMPORTANT_ANNOUNCEMENTS', error.message, error);
  return data as Announcement[];
}
