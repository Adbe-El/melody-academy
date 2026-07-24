export type UserRole = 'visitor' | 'learner' | 'admin';

export interface Programme {
  id: string;
  title: string;
  category: 'Keyboard' | 'Guitar' | 'Vocals' | 'Drums' | 'Production' | 'Strings' | 'Theory' | 'Exam Prep';
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  ageGroup: 'Kids (5-12)' | 'Teens (13-17)' | 'Adults (18+)' | 'All Ages';
  duration: string;
  featured?: boolean;
  imageUrl: string;
  syllabusHighlights: string[];
}

export interface Consultation {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  preferredInstrument: string;
  ageGroup: string;
  experienceLevel: string;
  goals: string;
  status: 'new' | 'contacted' | 'scheduled' | 'completed' | 'enrolled' | 'cancelled';
  createdAt: string;
  notes?: string;
}

export interface InstructorApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  primaryInstrument: string;
  secondaryInstruments?: string;
  yearsExperience: number;
  qualifications: string;
  bio: string;
  resumeFileName?: string;
  status: 'pending' | 'under_review' | 'shortlisted' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface Instrument {
  id: string;
  name: string;
  category: 'Keyboard' | 'Guitar' | 'Strings' | 'Drums & Percussion' | 'Wind' | 'Accessories';
  price: string;
  description: string;
  specifications: string[];
  inStock: boolean;
  imageUrl: string;
  condition: 'Brand New' | 'Certified Pre-owned';
}

export interface ConsultancyRequest {
  id: string;
  organizationName: string;
  organizationType: 'School' | 'Church' | 'Choir' | 'Corporate' | 'Private Group';
  contactPerson: string;
  email: string;
  phone: string;
  serviceNeeded: string;
  details: string;
  status: 'new' | 'in_discussion' | 'completed';
  createdAt: string;
}

export interface Learner {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  programmeId: string;
  programmeTitle: string;
  instructorName: string;
  enrolledDate: string;
  progressPercentage: number;
  status: 'active' | 'completed' | 'paused';
}

export interface LessonNote {
  id: string;
  learnerId: string;
  title: string;
  topic: string;
  content: string;
  practiceGoals: string;
  dateAssigned: string;
}

export interface Assignment {
  id: string;
  learnerId: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'reviewed';
  feedback?: string;
}

export interface LMSResource {
  id: string;
  programmeId: string;
  programmeTitle: string;
  title: string;
  fileType: 'pdf' | 'audio' | 'sheet_music';
  fileUrl: string;
  category: string;
}

export interface Certificate {
  id: string;
  learnerId: string;
  learnerName: string;
  programmeTitle: string;
  issueDate: string;
  certificateCode: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
  important?: boolean;
}
