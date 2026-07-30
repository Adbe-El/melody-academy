import { supabase } from '../lib/supabase';
import { createAppError } from '../lib/errors';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const MAX_SIZE = 10 * 1024 * 1024;

export function validateFile(file: File, allowedTypes?: string[]): void {
  const types = allowedTypes ?? ALLOWED_TYPES;
  if (!types.includes(file.type)) {
    throw createAppError('INVALID_FILE_TYPE', `Invalid file type "${file.type}". Allowed: ${types.map(t => t.split('/').pop()).join(', ')}.`);
  }
  if (file.size > MAX_SIZE) {
    throw createAppError('FILE_TOO_LARGE', `File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum size is 10 MB.`);
  }
}

export async function uploadFile(bucket: string, path: string, file: File): Promise<string> {
  validateFile(file);

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true });

  if (error) throw createAppError('UPLOAD_FAILED', error.message, error);

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteFile(bucket: string, path: string): Promise<void> {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw createAppError('DELETE_FILE_FAILED', error.message, error);
}

export function getPublicUrl(bucket: string, path: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
