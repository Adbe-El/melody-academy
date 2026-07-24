import { createService } from './factory';

interface ExamRegistration {
  id: string;
  learner_name: string;
  email: string;
  phone?: string;
  exam_type: 'practical' | 'theory';
  exam_board: 'ABRSM' | 'Trinity' | 'MUSON';
  level: string;
  preferred_start_date?: string;
  notes?: string;
  status: 'new' | 'in_progress' | 'registered' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export const examRegistrationsService = createService<ExamRegistration>('exam_registrations');
