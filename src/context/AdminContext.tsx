import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { programmesService } from '../services/programmes';
import { getAllLearners } from '../services/learners';
import { instructorAppsService } from '../services/instructorApps';
import { consultationsService } from '../services/consultations';
import { consultancyRequestsService } from '../services/consultancyRequests';
import { examRegistrationsService } from '../services/examRegistrations';
import { instrumentsService } from '../services/instruments';
import { lessonNotesService } from '../services/lessonNotes';
import { assignmentsService } from '../services/assignments';
import { resourcesService } from '../services/resources';
import { announcementsService } from '../services/announcements';
import { websiteContentService } from '../services/websiteContent';
import { getCached, setCache, clearCache } from '../lib/dataCache';
import type { Programme, Learner, InstructorApplication, Consultation, ConsultancyRequest, LessonNote, Assignment, LMSResource, Announcement, Instrument, WebsiteContent } from '../types';

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

const PROGRAMMES_COLUMNS = 'id, title, category, level, duration, age_group, image_url, featured, description, syllabus_highlights, status';
const INSTRUCTOR_APPS_COLUMNS = 'id, full_name, email, primary_instrument, years_experience, status, created_at';
const CONSULTATIONS_COLUMNS = 'id, full_name, email, consultation_type, preferred_date, preferred_instrument, age_group, experience_level, goals, status, created_at';
const CONSULTANCY_COLUMNS = 'id, organization_name, organization_type, contact_person, email, service_needed, status, created_at';
const INSTRUMENTS_COLUMNS = 'id, category_id, name, price, description, specifications, availability, image_url, condition, status';
const WEBSITE_CONTENT_COLUMNS = 'id, section, title, content, image_url, active, order';

interface AdminContextType {
  programmes: Programme[];
  learners: Learner[];
  instructorApps: InstructorApplication[];
  consultations: Consultation[];
  consultancyRequests: ConsultancyRequest[];
  examRegistrations: ExamRegistration[];
  instruments: Instrument[];
  lessonNotes: LessonNote[];
  assignments: Assignment[];
  lmsResources: LMSResource[];
  announcements: Announcement[];
  websiteContent: WebsiteContent[];
  loading: boolean;
  refreshProgrammes: () => Promise<void>;
  refreshLearners: () => Promise<void>;
  refreshInstructorApps: () => Promise<void>;
  refreshConsultations: () => Promise<void>;
  refreshConsultancyRequests: () => Promise<void>;
  refreshExamRegistrations: () => Promise<void>;
  refreshInstruments: () => Promise<void>;
  refreshLessonNotes: () => Promise<void>;
  refreshAssignments: () => Promise<void>;
  refreshLmsResources: () => Promise<void>;
  refreshAnnouncements: () => Promise<void>;
  refreshWebsiteContent: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType>({
  programmes: [],
  learners: [],
  instructorApps: [],
  consultations: [],
  consultancyRequests: [],
  examRegistrations: [],
  instruments: [],
  lessonNotes: [],
  assignments: [],
  lmsResources: [],
  announcements: [],
  websiteContent: [],
  loading: true,
  refreshProgrammes: async () => {},
  refreshLearners: async () => {},
  refreshInstructorApps: async () => {},
  refreshConsultations: async () => {},
  refreshConsultancyRequests: async () => {},
  refreshExamRegistrations: async () => {},
  refreshInstruments: async () => {},
  refreshLessonNotes: async () => {},
  refreshAssignments: async () => {},
  refreshLmsResources: async () => {},
  refreshAnnouncements: async () => {},
  refreshWebsiteContent: async () => {},
});

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [learners, setLearners] = useState<Learner[]>([]);
  const [instructorApps, setInstructorApps] = useState<InstructorApplication[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [consultancyRequests, setConsultancyRequests] = useState<ConsultancyRequest[]>([]);
  const [examRegistrations, setExamRegistrations] = useState<ExamRegistration[]>([]);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [lessonNotes, setLessonNotes] = useState<LessonNote[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [lmsResources, setLmsResources] = useState<LMSResource[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [websiteContent, setWebsiteContent] = useState<WebsiteContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const fetchWithCache = async <T,>(
        key: string,
        columns: string,
        fetcher: (cols: string) => Promise<T[]>,
        setter: (data: T[]) => void
      ) => {
        const cached = getCached<T[]>(key);
        if (cached) { setter(cached); return; }
        try {
          const data = await fetcher(columns);
          setter(data);
          setCache(key, data);
        } catch {
          setter([]);
        }
      };

      await Promise.allSettled([
        fetchWithCache('admin_programmes', PROGRAMMES_COLUMNS, (c) => programmesService.getAll(c), setProgrammes),
        fetchWithCache('admin_learners', '*', () => getAllLearners(), setLearners),
        fetchWithCache('admin_instructor_apps', INSTRUCTOR_APPS_COLUMNS, (c) => instructorAppsService.getAll(c), setInstructorApps),
        fetchWithCache('admin_bookings_individual', CONSULTATIONS_COLUMNS, (c) => consultationsService.getAll(c), setConsultations),
        fetchWithCache('admin_bookings_corporate', CONSULTANCY_COLUMNS, (c) => consultancyRequestsService.getAll(c), setConsultancyRequests),
        fetchWithCache('admin_exam_registrations', '*', () => examRegistrationsService.getAll(), setExamRegistrations),
        fetchWithCache('admin_instruments', INSTRUMENTS_COLUMNS, (c) => instrumentsService.getAll(c), setInstruments),
        fetchWithCache('admin_lesson_notes', '*', () => lessonNotesService.getAll(), setLessonNotes),
        fetchWithCache('admin_assignments', '*', () => assignmentsService.getAll(), setAssignments),
        fetchWithCache('admin_lms_resources', '*', () => resourcesService.getAll(), setLmsResources),
        fetchWithCache('admin_announcements', '*', () => announcementsService.getAll(), setAnnouncements),
        fetchWithCache('admin_website_content', WEBSITE_CONTENT_COLUMNS, (c) => websiteContentService.getAll(c), setWebsiteContent),
      ]);

      setLoading(false);
    };
    load();
  }, []);

  const refreshProgrammes = useCallback(async () => {
    clearCache('admin_programmes');
    const data = await programmesService.getAll(PROGRAMMES_COLUMNS);
    setProgrammes(data);
    setCache('admin_programmes', data);
  }, []);

  const refreshLearners = useCallback(async () => {
    clearCache('admin_learners');
    const data = await getAllLearners();
    setLearners(data);
    setCache('admin_learners', data);
  }, []);

  const refreshInstructorApps = useCallback(async () => {
    clearCache('admin_instructor_apps');
    const data = await instructorAppsService.getAll(INSTRUCTOR_APPS_COLUMNS);
    setInstructorApps(data);
    setCache('admin_instructor_apps', data);
  }, []);

  const refreshConsultations = useCallback(async () => {
    clearCache('admin_bookings_individual');
    const data = await consultationsService.getAll(CONSULTATIONS_COLUMNS);
    setConsultations(data);
    setCache('admin_bookings_individual', data);
  }, []);

  const refreshConsultancyRequests = useCallback(async () => {
    clearCache('admin_bookings_corporate');
    const data = await consultancyRequestsService.getAll(CONSULTANCY_COLUMNS);
    setConsultancyRequests(data);
    setCache('admin_bookings_corporate', data);
  }, []);

  const refreshExamRegistrations = useCallback(async () => {
    clearCache('admin_exam_registrations');
    const data = await examRegistrationsService.getAll();
    setExamRegistrations(data);
    setCache('admin_exam_registrations', data);
  }, []);

  const refreshInstruments = useCallback(async () => {
    clearCache('admin_instruments');
    const data = await instrumentsService.getAll(INSTRUMENTS_COLUMNS);
    setInstruments(data);
    setCache('admin_instruments', data);
  }, []);

  const refreshLessonNotes = useCallback(async () => {
    clearCache('admin_lesson_notes');
    const data = await lessonNotesService.getAll();
    setLessonNotes(data);
    setCache('admin_lesson_notes', data);
  }, []);

  const refreshAssignments = useCallback(async () => {
    clearCache('admin_assignments');
    const data = await assignmentsService.getAll();
    setAssignments(data);
    setCache('admin_assignments', data);
  }, []);

  const refreshLmsResources = useCallback(async () => {
    clearCache('admin_lms_resources');
    const data = await resourcesService.getAll();
    setLmsResources(data);
    setCache('admin_lms_resources', data);
  }, []);

  const refreshAnnouncements = useCallback(async () => {
    clearCache('admin_announcements');
    const data = await announcementsService.getAll();
    setAnnouncements(data);
    setCache('admin_announcements', data);
  }, []);

  const refreshWebsiteContent = useCallback(async () => {
    clearCache('admin_website_content');
    const data = await websiteContentService.getAll(WEBSITE_CONTENT_COLUMNS);
    setWebsiteContent(data);
    setCache('admin_website_content', data);
  }, []);

  return (
    <AdminContext.Provider value={{
      programmes, learners, instructorApps, consultations, consultancyRequests,
      examRegistrations, instruments, lessonNotes, assignments, lmsResources, announcements, websiteContent,
      loading,
      refreshProgrammes, refreshLearners, refreshInstructorApps, refreshConsultations, refreshConsultancyRequests,
      refreshExamRegistrations, refreshInstruments, refreshLessonNotes, refreshAssignments, refreshLmsResources, refreshAnnouncements, refreshWebsiteContent,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export function useAdmin() {
  return useContext(AdminContext);
}
