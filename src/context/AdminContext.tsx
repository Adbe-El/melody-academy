import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { programmesService } from '../services/programmes';
import { learnersService } from '../services/learners';
import { instructorAppsService } from '../services/instructorApps';
import { consultationsService } from '../services/consultations';
import { consultancyRequestsService } from '../services/consultancyRequests';
import { getCached, setCache, clearCache } from '../lib/dataCache';
import type { Programme, Learner, InstructorApplication, Consultation, ConsultancyRequest } from '../types';

const PROGRAMMES_COLUMNS = 'id, title, category, level, duration, ageGroup, imageUrl, featured, description, syllabusHighlights';
const LEARNERS_COLUMNS = 'id, fullName, email, programmeTitle, instructorName, progressPercentage, status, enrolledDate';
const INSTRUCTOR_APPS_COLUMNS = 'id, fullName, email, primaryInstrument, yearsExperience, status, createdAt';
const CONSULTATIONS_COLUMNS = 'id, fullName, email, preferredInstrument, experienceLevel, status, createdAt';
const CONSULTANCY_COLUMNS = 'id, organizationName, organizationType, contactPerson, email, serviceNeeded, status, createdAt';

interface AdminContextType {
  programmes: Programme[];
  learners: Learner[];
  instructorApps: InstructorApplication[];
  consultations: Consultation[];
  consultancyRequests: ConsultancyRequest[];
  loading: boolean;
  refreshProgrammes: () => Promise<void>;
  refreshLearners: () => Promise<void>;
  refreshInstructorApps: () => Promise<void>;
  refreshConsultations: () => Promise<void>;
  refreshConsultancyRequests: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType>({
  programmes: [],
  learners: [],
  instructorApps: [],
  consultations: [],
  consultancyRequests: [],
  loading: true,
  refreshProgrammes: async () => {},
  refreshLearners: async () => {},
  refreshInstructorApps: async () => {},
  refreshConsultations: async () => {},
  refreshConsultancyRequests: async () => {},
});

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [learners, setLearners] = useState<Learner[]>([]);
  const [instructorApps, setInstructorApps] = useState<InstructorApplication[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [consultancyRequests, setConsultancyRequests] = useState<ConsultancyRequest[]>([]);
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
        fetchWithCache('admin_learners', LEARNERS_COLUMNS, (c) => learnersService.getAll(c), setLearners),
        fetchWithCache('admin_instructor_apps', INSTRUCTOR_APPS_COLUMNS, (c) => instructorAppsService.getAll(c), setInstructorApps),
        fetchWithCache('admin_bookings_individual', CONSULTATIONS_COLUMNS, (c) => consultationsService.getAll(c), setConsultations),
        fetchWithCache('admin_bookings_corporate', CONSULTANCY_COLUMNS, (c) => consultancyRequestsService.getAll(c), setConsultancyRequests),
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
    const data = await learnersService.getAll(LEARNERS_COLUMNS);
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

  return (
    <AdminContext.Provider value={{
      programmes, learners, instructorApps, consultations, consultancyRequests,
      loading,
      refreshProgrammes, refreshLearners, refreshInstructorApps, refreshConsultations, refreshConsultancyRequests,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export function useAdmin() {
  return useContext(AdminContext);
}
