import { supabase } from '../lib/supabase';
import { createService } from './factory';
import type { InstructorApplication } from '../types';

export const instructorAppsService = createService<InstructorApplication>('instructor_applications');

export async function getAcceptedInstructors(): Promise<InstructorApplication[]> {
  const { data, error } = await supabase
    .from('instructor_applications')
    .select('id, full_name, email, primary_instrument, secondary_instruments, years_experience, qualifications, bio, status')
    .eq('status', 'accepted')
    .order('years_experience', { ascending: false });
  if (error) throw error;
  return (data || []) as unknown as InstructorApplication[];
}
