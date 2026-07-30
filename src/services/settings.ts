import { supabase } from '../lib/supabase';

export interface AcademySettings {
  id: string;
  whatsapp_number: string;
  academy_name: string;
  academy_email: string;
  academy_phone: string;
  address: string;
  updated_at?: string;
}

const DEFAULT_SETTINGS: Omit<AcademySettings, 'id'> = {
  whatsapp_number: '',
  academy_name: 'Matt-Agba Music Consult',
  academy_email: '',
  academy_phone: '',
  address: '',
};

export async function getSettings(): Promise<AcademySettings> {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('id', 'academy')
    .single();
  if (error || !data) return { id: 'academy', ...DEFAULT_SETTINGS };
  return data as AcademySettings;
}

export async function updateSettings(updates: Partial<Omit<AcademySettings, 'id' | 'updated_at'>>): Promise<AcademySettings> {
  const { data: existing } = await supabase
    .from('settings')
    .select('id')
    .eq('id', 'academy')
    .single();

  if (existing) {
    const { data, error } = await supabase
      .from('settings')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', 'academy')
      .select()
      .single();
    if (error) throw error;
    return data as AcademySettings;
  } else {
    const { data, error } = await supabase
      .from('settings')
      .insert({ id: 'academy', ...DEFAULT_SETTINGS, ...updates })
      .select()
      .single();
    if (error) throw error;
    return data as AcademySettings;
  }
}
