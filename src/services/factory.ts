import { supabase } from '../lib/supabase';
import { createAppError } from '../lib/errors';

export function createService<T extends { id: string }>(tableName: string) {
  return {
    async getAll(): Promise<T[]> {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw createAppError(`FETCH_${tableName.toUpperCase()}`, error.message, error);
      return data as T[];
    },

    async getById(id: string): Promise<T> {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw createAppError(`FETCH_${tableName.toUpperCase()}_BY_ID`, error.message, error);
      return data as T;
    },

    async create(record: Record<string, unknown>): Promise<T> {
      const { data, error } = await supabase
        .from(tableName)
        .insert(record)
        .select()
        .single();
      if (error) throw createAppError(`CREATE_${tableName.toUpperCase()}`, error.message, error);
      return data as T;
    },

    async update(id: string, updates: Partial<T>): Promise<T> {
      const { data, error } = await supabase
        .from(tableName)
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) throw createAppError(`UPDATE_${tableName.toUpperCase()}`, error.message, error);
      return data as T;
    },

    async delete(id: string): Promise<void> {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);
      if (error) throw createAppError(`DELETE_${tableName.toUpperCase()}`, error.message, error);
    },
  };
}
