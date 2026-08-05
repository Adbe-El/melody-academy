import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  Programme,
  Instrument,
  Consultation,
  InstructorApplication,
  ConsultancyRequest,
  Learner,
  LessonNote,
  Assignment,
  LMSResource,
  Certificate,
  Announcement
} from '../types';
import { programmesService } from '../services/programmes';
import { instrumentsService } from '../services/instruments';
import { consultationsService } from '../services/consultations';
import { instructorAppsService } from '../services/instructorApps';
import { consultancyRequestsService } from '../services/consultancyRequests';
import { lessonNotesService } from '../services/lessonNotes';
import { assignmentsService } from '../services/assignments';
import { resourcesService } from '../services/resources';
import { certificatesService } from '../services/certificates';
import { announcementsService } from '../services/announcements';
import { getSettings, updateSettings as saveSettings } from '../services/settings';

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  programmes: Programme[];
  instruments: Instrument[];
  consultations: Consultation[];
  instructorApps: InstructorApplication[];
  consultancyRequests: ConsultancyRequest[];
  learners: Learner[];
  lessonNotes: LessonNote[];
  assignments: Assignment[];
  resources: LMSResource[];
  certificates: Certificate[];
  announcements: Announcement[];
  loading: boolean;

  // Handlers
  addConsultation: (cons: Omit<Consultation, 'id' | 'status' | 'created_at'>) => void;
  updateConsultationStatus: (id: string, status: Consultation['status'], notes?: string) => void;

  addInstructorApp: (app: Omit<InstructorApplication, 'id' | 'status' | 'created_at'>) => void;
  updateInstructorAppStatus: (id: string, status: InstructorApplication['status']) => void;

  addConsultancyRequest: (req: Omit<ConsultancyRequest, 'id' | 'status' | 'created_at'>) => void;
  updateConsultancyStatus: (id: string, status: ConsultancyRequest['status']) => void;

  addProgramme: (prog: Omit<Programme, 'id'>) => void;
  updateProgramme: (id: string, prog: Partial<Programme>) => void;
  deleteProgramme: (id: string) => void;

  addInstrument: (inst: Omit<Instrument, 'id'>) => void;
  updateInstrument: (id: string, inst: Partial<Instrument>) => void;
  deleteInstrument: (id: string) => void;

  // LMS Handlers
  addLessonNote: (note: Omit<LessonNote, 'id' | 'upload_date'>) => void;
  addAssignment: (assign: Omit<Assignment, 'id' | 'status'>) => void;
  submitAssignment: (id: string) => void;
  addResource: (res: Omit<LMSResource, 'id'>) => void;
  issueCertificate: (cert: Omit<Certificate, 'id' | 'issue_date' | 'certificate_code'>) => void;

  // Utility
  whatsappNumber: string;
  secondaryWhatsappNumber: string;
  setWhatsappNumber: (num: string) => void;
  setSecondaryWhatsappNumber: (num: string) => void;
  getWhatsAppUrl: (messageText: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('visitor');
  const [whatsappNumber, setWhatsappNumberState] = useState<string>('+2348068416031');
  const [secondaryWhatsappNumber, setSecondaryWhatsappNumberState] = useState<string>('+2347062215323');
  const [loading, setLoading] = useState(true);

  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [instructorApps, setInstructorApps] = useState<InstructorApplication[]>([]);
  const [consultancyRequests, setConsultancyRequests] = useState<ConsultancyRequest[]>([]);
  const [learners] = useState<Learner[]>([]);
  const [lessonNotes, setLessonNotes] = useState<LessonNote[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [resources, setResources] = useState<LMSResource[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  // Load all data from Supabase on mount
  useEffect(() => {
    async function loadAll() {
      try {
        const [
          progs,
          insts,
          cons,
          apps,
          consultReqs,
          notes,
          assigns,
          res,
          certs,
          anns,
          settings
        ] = await Promise.allSettled([
          programmesService.getAll(),
          instrumentsService.getAll(),
          consultationsService.getAll(),
          instructorAppsService.getAll(),
          consultancyRequestsService.getAll(),
          lessonNotesService.getAll(),
          assignmentsService.getAll(),
          resourcesService.getAll(),
          certificatesService.getAll(),
          announcementsService.getAll(),
          getSettings()
        ]);

        if (progs.status === 'fulfilled') setProgrammes(progs.value);
        if (insts.status === 'fulfilled') setInstruments(insts.value);
        if (cons.status === 'fulfilled') setConsultations(cons.value);
        if (apps.status === 'fulfilled') setInstructorApps(apps.value);
        if (consultReqs.status === 'fulfilled') setConsultancyRequests(consultReqs.value);
        if (notes.status === 'fulfilled') setLessonNotes(notes.value);
        if (assigns.status === 'fulfilled') setAssignments(assigns.value);
        if (res.status === 'fulfilled') setResources(res.value);
        if (certs.status === 'fulfilled') setCertificates(certs.value);
        if (anns.status === 'fulfilled') setAnnouncements(anns.value);
        if (settings.status === 'fulfilled' && settings.value.whatsapp_number) {
          setWhatsappNumberState(settings.value.whatsapp_number);
        }
      } catch (err) {
        console.error('Failed to load data from Supabase:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  // Handlers
  const addConsultation = async (data: Omit<Consultation, 'id' | 'status' | 'created_at'>) => {
    try {
      const created = await consultationsService.create({ ...data, status: 'new' });
      setConsultations(prev => [created, ...prev]);
    } catch (err) {
      console.error('Failed to add consultation:', err);
    }
  };

  const updateConsultationStatus = async (id: string, status: Consultation['status'], notes?: string) => {
    try {
      const updates: Record<string, unknown> = { status };
      if (notes !== undefined) updates.notes = notes;
      const updated = await consultationsService.update(id, updates);
      setConsultations(prev => prev.map(c => (c.id === id ? updated : c)));
    } catch (err) {
      console.error('Failed to update consultation:', err);
    }
  };

  const addInstructorApp = async (data: Omit<InstructorApplication, 'id' | 'status' | 'created_at'>) => {
    try {
      const created = await instructorAppsService.create({ ...data, status: 'pending' });
      setInstructorApps(prev => [created, ...prev]);
    } catch (err) {
      console.error('Failed to add instructor application:', err);
    }
  };

  const updateInstructorAppStatus = async (id: string, status: InstructorApplication['status']) => {
    try {
      const updated = await instructorAppsService.update(id, { status });
      setInstructorApps(prev => prev.map(a => (a.id === id ? updated : a)));
    } catch (err) {
      console.error('Failed to update instructor application:', err);
    }
  };

  const addConsultancyRequest = async (data: Omit<ConsultancyRequest, 'id' | 'status' | 'created_at'>) => {
    try {
      const created = await consultancyRequestsService.create({ ...data, status: 'new' });
      setConsultancyRequests(prev => [created, ...prev]);
    } catch (err) {
      console.error('Failed to add consultancy request:', err);
    }
  };

  const updateConsultancyStatus = async (id: string, status: ConsultancyRequest['status']) => {
    try {
      const updated = await consultancyRequestsService.update(id, { status });
      setConsultancyRequests(prev => prev.map(cr => (cr.id === id ? updated : cr)));
    } catch (err) {
      console.error('Failed to update consultancy request:', err);
    }
  };

  const addProgramme = async (prog: Omit<Programme, 'id'>) => {
    try {
      const created = await programmesService.create(prog);
      setProgrammes(prev => [created, ...prev]);
    } catch (err) {
      console.error('Failed to add programme:', err);
    }
  };

  const updateProgramme = async (id: string, prog: Partial<Programme>) => {
    try {
      const updated = await programmesService.update(id, prog);
      setProgrammes(prev => prev.map(p => (p.id === id ? updated : p)));
    } catch (err) {
      console.error('Failed to update programme:', err);
    }
  };

  const deleteProgramme = async (id: string) => {
    try {
      await programmesService.delete(id);
      setProgrammes(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Failed to delete programme:', err);
    }
  };

  const addInstrument = async (inst: Omit<Instrument, 'id'>) => {
    try {
      const created = await instrumentsService.create(inst);
      setInstruments(prev => [created, ...prev]);
    } catch (err) {
      console.error('Failed to add instrument:', err);
    }
  };

  const updateInstrument = async (id: string, inst: Partial<Instrument>) => {
    try {
      const updated = await instrumentsService.update(id, inst);
      setInstruments(prev => prev.map(i => (i.id === id ? updated : i)));
    } catch (err) {
      console.error('Failed to update instrument:', err);
    }
  };

  const deleteInstrument = async (id: string) => {
    try {
      await instrumentsService.delete(id);
      setInstruments(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      console.error('Failed to delete instrument:', err);
    }
  };

  const addLessonNote = async (note: Omit<LessonNote, 'id' | 'upload_date'>) => {
    try {
      const created = await lessonNotesService.create(note);
      setLessonNotes(prev => [created, ...prev]);
    } catch (err) {
      console.error('Failed to add lesson note:', err);
    }
  };

  const addAssignment = async (assign: Omit<Assignment, 'id' | 'status'>) => {
    try {
      const created = await assignmentsService.create({ ...assign, status: 'pending' });
      setAssignments(prev => [created, ...prev]);
    } catch (err) {
      console.error('Failed to add assignment:', err);
    }
  };

  const submitAssignment = async (id: string) => {
    try {
      const updated = await assignmentsService.update(id, { status: 'submitted' });
      setAssignments(prev => prev.map(a => (a.id === id ? updated : a)));
    } catch (err) {
      console.error('Failed to submit assignment:', err);
    }
  };

  const addResource = async (res: Omit<LMSResource, 'id'>) => {
    try {
      const created = await resourcesService.create(res);
      setResources(prev => [created, ...prev]);
    } catch (err) {
      console.error('Failed to add resource:', err);
    }
  };

  const issueCertificate = async (cert: Omit<Certificate, 'id' | 'issue_date' | 'certificate_code'>) => {
    try {
      const code = `MA-CERT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const created = await certificatesService.create({
        ...cert,
        certificate_code: code
      });
      setCertificates(prev => [created, ...prev]);
    } catch (err) {
      console.error('Failed to issue certificate:', err);
    }
  };

  const setWhatsappNumber = async (num: string) => {
    setWhatsappNumberState(num);
    try {
      await saveSettings({ whatsapp_number: num });
    } catch (err) {
      console.error('Failed to save WhatsApp number:', err);
    }
  };

  const setSecondaryWhatsappNumber = (num: string) => {
    setSecondaryWhatsappNumberState(num);
  };

  const getWhatsAppUrl = (messageText: string) => {
    const cleanNum = whatsappNumber.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(messageText);
    return `https://wa.me/${cleanNum}?text=${encoded}`;
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        programmes,
        instruments,
        consultations,
        instructorApps,
        consultancyRequests,
        learners,
        lessonNotes,
        assignments,
        resources,
        certificates,
        announcements,
        loading,
        addConsultation,
        updateConsultationStatus,
        addInstructorApp,
        updateInstructorAppStatus,
        addConsultancyRequest,
        updateConsultancyStatus,
        addProgramme,
        updateProgramme,
        deleteProgramme,
        addInstrument,
        updateInstrument,
        deleteInstrument,
        addLessonNote,
        addAssignment,
        submitAssignment,
        addResource,
        issueCertificate,
        whatsappNumber,
        secondaryWhatsappNumber,
        setWhatsappNumber,
        setSecondaryWhatsappNumber,
        getWhatsAppUrl
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
