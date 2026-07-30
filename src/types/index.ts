export type UserRole = 'visitor' | 'learner' | 'admin';

export interface Programme {
  id: string;
  title: string;
  category: 'Keyboard' | 'Guitar' | 'Vocals' | 'Drums' | 'Production' | 'Strings' | 'Theory' | 'Exam Prep';
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  age_group: 'Kids (5-12)' | 'Teens (13-17)' | 'Adults (18+)' | 'All Ages';
  duration: string;
  featured?: boolean;
  image_url: string;
  syllabus_highlights: string[];
  status: 'active' | 'archived' | 'draft';
  created_at?: string;
  updated_at?: string;
}

export interface Consultation {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  consultation_type: 'music_lessons' | 'exams' | 'consultancy' | 'general';
  preferred_date?: string;
  programme_id?: string;
  notes?: string;
  preferred_instrument?: string;
  age_group?: string;
  experience_level?: string;
  goals?: string;
  status: 'new' | 'contacted' | 'scheduled' | 'completed' | 'enrolled' | 'cancelled';
  admin_notes?: string;
  created_at: string;
  updated_at?: string;
}

export interface InstructorApplication {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  primary_instrument: string;
  secondary_instruments?: string;
  years_experience: number;
  qualifications: string;
  bio: string;
  cv_url?: string;
  certificates_urls?: string[];
  status: 'pending' | 'under_review' | 'shortlisted' | 'accepted' | 'rejected';
  admin_notes?: string;
  created_at: string;
  updated_at?: string;
}

export interface Instrument {
  id: string;
  name: string;
  category_id: string;
  category_name?: string;
  price: string;
  description: string;
  specifications: string[];
  availability: boolean;
  image_url: string;
  condition: 'Brand New' | 'Certified Pre-owned';
  whatsapp_message?: string;
  status: 'active' | 'archived' | 'out_of_stock';
  created_at?: string;
  updated_at?: string;
}

export interface ConsultancyRequest {
  id: string;
  organization_name: string;
  organization_type: 'School' | 'Church' | 'Choir' | 'Corporate' | 'Private Group';
  contact_person: string;
  email: string;
  phone: string;
  service_needed: string;
  details: string;
  status: 'new' | 'in_discussion' | 'completed' | 'cancelled';
  admin_notes?: string;
  created_at: string;
  updated_at?: string;
}

export interface Learner {
  id: string;
  user_id: string;
  programme_id: string;
  enrolment_date: string;
  progress: number;
  certificate_status: 'not_eligible' | 'eligible' | 'issued';
  created_at?: string;
  // Joined from users table
  full_name: string;
  email: string;
  // Joined from programmes table
  programme_title: string;
}

export interface LessonNote {
  id: string;
  programme_id: string;
  learner_id?: string;
  title: string;
  topic?: string;
  content: string;
  practice_goals?: string;
  file_url?: string;
  video_url?: string;
  upload_date: string;
  created_at?: string;
  // Joined
  programme_title?: string;
}

export interface Assignment {
  id: string;
  programme_id: string;
  learner_id: string;
  title: string;
  instructions?: string;
  due_date: string;
  status: 'pending' | 'submitted' | 'reviewed';
  created_at?: string;
  // Joined
  programme_title?: string;
}

export interface LMSResource {
  id: string;
  programme_id: string;
  title: string;
  type: 'pdf' | 'audio' | 'sheet_music' | 'video';
  file_url: string;
  video_url?: string;
  category?: string;
  created_at?: string;
  // Joined
  programme_title?: string;
}

export interface Certificate {
  id: string;
  learner_id: string;
  programme_id: string;
  learner_name: string;
  programme_title: string;
  issue_date: string;
  certificate_code: string;
  certificate_url?: string;
  created_at?: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  programme_id?: string;
  important: boolean;
  publish_date: string;
  created_at?: string;
}

export interface WebsiteContent {
  id: string;
  section: 'hero' | 'testimonial' | 'faq' | 'partner' | 'stat' | 'cta';
  title: string;
  content: string;
  image_url?: string;
  active: boolean;
  order: number;
  created_at?: string;
  updated_at?: string;
}

export interface AcademySettings {
  id: string;
  whatsapp_number: string;
  academy_name: string;
  academy_email: string;
  academy_phone: string;
  address: string;
  updated_at?: string;
}

export interface InstrumentCategory {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
}

export interface AssignmentSubmission {
  id: string;
  assignment_id: string;
  learner_id: string;
  submission_url: string;
  submission_text?: string;
  feedback?: string;
  grade?: string;
  submitted_at: string;
  reviewed_at?: string;
}
