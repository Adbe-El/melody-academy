import { supabase } from '../lib/supabase';
import { createAppError } from '../lib/errors';
import { createService } from './factory';
import type { Instrument } from '../types';

const INSTRUMENT_SELECT = `
  id, category_id, name, description, specifications, price, image_url, condition, availability, whatsapp_message, status, created_at, updated_at,
  instrument_categories:category_id ( id, name, slug )
`;

interface InstrumentRow {
  id: string;
  category_id: string;
  name: string;
  description: string;
  specifications: string[];
  price: string;
  image_url: string | null;
  condition: string;
  availability: boolean;
  whatsapp_message: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  instrument_categories: { id: string; name: string; slug: string } | null;
}

function mapInstrumentRow(row: InstrumentRow): Instrument {
  return {
    id: row.id,
    name: row.name,
    category_id: row.category_id,
    category_name: row.instrument_categories?.name || '',
    price: row.price,
    description: row.description,
    specifications: row.specifications || [],
    availability: row.availability,
    image_url: row.image_url || '',
    condition: row.condition as Instrument['condition'],
    whatsapp_message: row.whatsapp_message || undefined,
    status: row.status as Instrument['status'],
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export const instrumentsService = {
  getAll: async (columns?: string): Promise<Instrument[]> => {
    const { data, error } = await supabase
      .from('instruments')
      .select(columns || INSTRUMENT_SELECT)
      .order('created_at', { ascending: false });
    if (error) throw createAppError('FETCH_INSTRUMENTS', error.message, error);
    if (columns) return data as unknown as Instrument[];
    return (data as unknown as InstrumentRow[]).map(mapInstrumentRow);
  },
  getById: async (id: string): Promise<Instrument> => {
    const { data, error } = await supabase
      .from('instruments')
      .select(INSTRUMENT_SELECT)
      .eq('id', id)
      .single();
    if (error) throw createAppError('FETCH_INSTRUMENT_BY_ID', error.message, error);
    return mapInstrumentRow(data as unknown as InstrumentRow);
  },
  create: async (record: Record<string, unknown>): Promise<Instrument> => {
    const { data, error } = await supabase
      .from('instruments')
      .insert(record)
      .select(INSTRUMENT_SELECT)
      .single();
    if (error) throw createAppError('CREATE_INSTRUMENT', error.message, error);
    return mapInstrumentRow(data as unknown as InstrumentRow);
  },
  update: async (id: string, updates: Partial<Instrument>): Promise<Instrument> => {
    const { data, error } = await supabase
      .from('instruments')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select(INSTRUMENT_SELECT)
      .single();
    if (error) throw createAppError('UPDATE_INSTRUMENT', error.message, error);
    return mapInstrumentRow(data as unknown as InstrumentRow);
  },
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase.from('instruments').delete().eq('id', id);
    if (error) throw createAppError('DELETE_INSTRUMENT', error.message, error);
  },
  getByCategoryId: async (categoryId: string): Promise<Instrument[]> => {
    const { data, error } = await supabase
      .from('instruments')
      .select(INSTRUMENT_SELECT)
      .eq('category_id', categoryId)
      .order('name');
    if (error) throw createAppError('FETCH_INSTRUMENTS_BY_CATEGORY', error.message, error);
    return (data as unknown as InstrumentRow[]).map(mapInstrumentRow);
  },
};
