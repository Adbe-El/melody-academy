import { createService } from './factory';
import type { Consultation } from '../types';

export const consultationsService = createService<Consultation>('consultations');

export async function updateConsultationStatus(
  id: string,
  status: Consultation['status'],
  adminNotes?: string
): Promise<Consultation> {
  const updates: Record<string, unknown> = { status, updated_at: new Date().toISOString() };
  if (adminNotes !== undefined) updates.admin_notes = adminNotes;
  return consultationsService.update(id, updates);
}
