import { createService } from './factory';
import type { Announcement } from '../types';

export const announcementsService = {
  getAll: async (): Promise<Announcement[]> => {
    const { data, error } = await (await import('../lib/supabase')).supabase
      .from('announcements')
      .select('*')
      .order('publish_date', { ascending: false });
    if (error) throw error;
    return data as Announcement[];
  },
  create: createService<Announcement>('announcements').create,
  update: createService<Announcement>('announcements').update,
  delete: createService<Announcement>('announcements').delete,
  getById: createService<Announcement>('announcements').getById,
};
