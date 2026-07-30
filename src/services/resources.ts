import { supabase } from '../lib/supabase';
import { createAppError } from '../lib/errors';

import type { LMSResource } from '../types';

const RESOURCE_SELECT = `
  id, programme_id, title, type, file_url, video_url, category, created_at,
  programmes:programme_id ( id, title )
`;

interface ResourceRow {
  id: string;
  programme_id: string;
  title: string;
  type: string;
  file_url: string;
  video_url: string | null;
  category: string | null;
  created_at: string;
  programmes: { id: string; title: string } | null;
}

function mapResourceRow(row: ResourceRow): LMSResource {
  return {
    id: row.id,
    programme_id: row.programme_id,
    title: row.title,
    type: row.type as LMSResource['type'],
    file_url: row.file_url,
    video_url: row.video_url || undefined,
    category: row.category || undefined,
    created_at: row.created_at,
    programme_title: row.programmes?.title || '',
  };
}

export async function getResourcesByProgramme(programmeId: string): Promise<LMSResource[]> {
  const { data, error } = await supabase
    .from('learning_resources')
    .select(RESOURCE_SELECT)
    .eq('programme_id', programmeId)
    .order('created_at', { ascending: false });
  if (error) throw createAppError('FETCH_RESOURCES_BY_PROGRAMME', error.message, error);
  return (data as unknown as ResourceRow[]).map(mapResourceRow);
}

export const resourcesService = {
  getAll: async (): Promise<LMSResource[]> => {
    const { data, error } = await supabase
      .from('learning_resources')
      .select(RESOURCE_SELECT)
      .order('created_at', { ascending: false });
    if (error) throw createAppError('FETCH_RESOURCES', error.message, error);
    return (data as unknown as ResourceRow[]).map(mapResourceRow);
  },
  getById: async (id: string): Promise<LMSResource> => {
    const { data, error } = await supabase
      .from('learning_resources')
      .select(RESOURCE_SELECT)
      .eq('id', id)
      .single();
    if (error) throw createAppError('FETCH_RESOURCE_BY_ID', error.message, error);
    return mapResourceRow(data as unknown as ResourceRow);
  },
  create: async (record: Record<string, unknown>): Promise<LMSResource> => {
    const { data, error } = await supabase
      .from('learning_resources')
      .insert(record)
      .select(RESOURCE_SELECT)
      .single();
    if (error) throw createAppError('CREATE_RESOURCE', error.message, error);
    return mapResourceRow(data as unknown as ResourceRow);
  },
  update: async (id: string, updates: Partial<LMSResource>): Promise<LMSResource> => {
    const { data, error } = await supabase
      .from('learning_resources')
      .update(updates)
      .eq('id', id)
      .select(RESOURCE_SELECT)
      .single();
    if (error) throw createAppError('UPDATE_RESOURCE', error.message, error);
    return mapResourceRow(data as unknown as ResourceRow);
  },
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase.from('learning_resources').delete().eq('id', id);
    if (error) throw createAppError('DELETE_RESOURCE', error.message, error);
  },
};
