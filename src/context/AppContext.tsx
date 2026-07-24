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
import {
  INITIAL_PROGRAMMES,
  INITIAL_INSTRUMENTS,
  INITIAL_CONSULTATIONS,
  INITIAL_INSTRUCTORS,
  INITIAL_LEARNERS,
  INITIAL_LESSON_NOTES,
  INITIAL_ASSIGNMENTS,
  INITIAL_RESOURCES,
  INITIAL_CERTIFICATES,
  INITIAL_ANNOUNCEMENTS
} from '../services/supabase';

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
  
  // Handlers
  addConsultation: (cons: Omit<Consultation, 'id' | 'status' | 'createdAt'>) => void;
  updateConsultationStatus: (id: string, status: Consultation['status'], notes?: string) => void;
  
  addInstructorApp: (app: Omit<InstructorApplication, 'id' | 'status' | 'createdAt'>) => void;
  updateInstructorAppStatus: (id: string, status: InstructorApplication['status']) => void;
  
  addConsultancyRequest: (req: Omit<ConsultancyRequest, 'id' | 'status' | 'createdAt'>) => void;
  updateConsultancyStatus: (id: string, status: ConsultancyRequest['status']) => void;
  
  addProgramme: (prog: Omit<Programme, 'id'>) => void;
  updateProgramme: (id: string, prog: Partial<Programme>) => void;
  deleteProgramme: (id: string) => void;
  
  addInstrument: (inst: Omit<Instrument, 'id'>) => void;
  updateInstrument: (id: string, inst: Partial<Instrument>) => void;
  deleteInstrument: (id: string) => void;
  
  // LMS Handlers
  addLessonNote: (note: Omit<LessonNote, 'id' | 'dateAssigned'>) => void;
  addAssignment: (assign: Omit<Assignment, 'id' | 'status'>) => void;
  submitAssignment: (id: string) => void;
  addResource: (res: Omit<LMSResource, 'id'>) => void;
  issueCertificate: (cert: Omit<Certificate, 'id' | 'issueDate' | 'certificateCode'>) => void;
  
  // Utility
  whatsappNumber: string;
  setWhatsappNumber: (num: string) => void;
  getWhatsAppUrl: (messageText: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_PREFIX = 'melody_academy_v1_';

function getInitialStorage<T>(key: string, defaultValue: T): T {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage`, err);
    return defaultValue;
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('visitor');
  const [whatsappNumber, setWhatsappNumber] = useState<string>(() =>
    getInitialStorage('whatsapp_num', '+2348006356391')
  );

  const [programmes, setProgrammes] = useState<Programme[]>(() =>
    getInitialStorage('programmes', INITIAL_PROGRAMMES)
  );

  const [instruments, setInstruments] = useState<Instrument[]>(() =>
    getInitialStorage('instruments', INITIAL_INSTRUMENTS)
  );

  const [consultations, setConsultations] = useState<Consultation[]>(() =>
    getInitialStorage('consultations', INITIAL_CONSULTATIONS)
  );

  const [instructorApps, setInstructorApps] = useState<InstructorApplication[]>(() =>
    getInitialStorage('instructors', INITIAL_INSTRUCTORS)
  );

  const [consultancyRequests, setConsultancyRequests] = useState<ConsultancyRequest[]>(() =>
    getInitialStorage('consultancy', [
      {
        id: 'c-req-1',
        organizationName: 'Grace Baptist Church',
        organizationType: 'Church',
        contactPerson: 'Pastor Daniel',
        email: 'pastor.d@example.com',
        phone: '+234 803 999 1111',
        serviceNeeded: 'Worship Team Audits & Band Training',
        details: 'Looking to train our 12-member choir and rhythm section over 4 weekends.',
        status: 'in_discussion',
        createdAt: '2026-07-15T11:00:00Z'
      }
    ])
  );

  const [learners] = useState<Learner[]>(() =>
    getInitialStorage('learners', INITIAL_LEARNERS)
  );

  const [lessonNotes, setLessonNotes] = useState<LessonNote[]>(() =>
    getInitialStorage('lesson_notes', INITIAL_LESSON_NOTES)
  );

  const [assignments, setAssignments] = useState<Assignment[]>(() =>
    getInitialStorage('assignments', INITIAL_ASSIGNMENTS)
  );

  const [resources, setResources] = useState<LMSResource[]>(() =>
    getInitialStorage('resources', INITIAL_RESOURCES)
  );

  const [certificates, setCertificates] = useState<Certificate[]>(() =>
    getInitialStorage('certificates', INITIAL_CERTIFICATES)
  );

  const [announcements] = useState<Announcement[]>(() =>
    getInitialStorage('announcements', INITIAL_ANNOUNCEMENTS)
  );

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'programmes', JSON.stringify(programmes));
  }, [programmes]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'instruments', JSON.stringify(instruments));
  }, [instruments]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'consultations', JSON.stringify(consultations));
  }, [consultations]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'instructors', JSON.stringify(instructorApps));
  }, [instructorApps]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'consultancy', JSON.stringify(consultancyRequests));
  }, [consultancyRequests]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'lesson_notes', JSON.stringify(lessonNotes));
  }, [lessonNotes]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'resources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + 'certificates', JSON.stringify(certificates));
  }, [certificates]);

  // Handlers
  const addConsultation = (data: Omit<Consultation, 'id' | 'status' | 'createdAt'>) => {
    const newCons: Consultation = {
      ...data,
      id: 'cons-' + Date.now(),
      status: 'new',
      createdAt: new Date().toISOString()
    };
    setConsultations(prev => [newCons, ...prev]);
  };

  const updateConsultationStatus = (id: string, status: Consultation['status'], notes?: string) => {
    setConsultations(prev =>
      prev.map(c => (c.id === id ? { ...c, status, notes: notes !== undefined ? notes : c.notes } : c))
    );
  };

  const addInstructorApp = (data: Omit<InstructorApplication, 'id' | 'status' | 'createdAt'>) => {
    const newApp: InstructorApplication = {
      ...data,
      id: 'app-' + Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setInstructorApps(prev => [newApp, ...prev]);
  };

  const updateInstructorAppStatus = (id: string, status: InstructorApplication['status']) => {
    setInstructorApps(prev => prev.map(a => (a.id === id ? { ...a, status } : a)));
  };

  const addConsultancyRequest = (data: Omit<ConsultancyRequest, 'id' | 'status' | 'createdAt'>) => {
    const newReq: ConsultancyRequest = {
      ...data,
      id: 'creq-' + Date.now(),
      status: 'new',
      createdAt: new Date().toISOString()
    };
    setConsultancyRequests(prev => [newReq, ...prev]);
  };

  const updateConsultancyStatus = (id: string, status: ConsultancyRequest['status']) => {
    setConsultancyRequests(prev => prev.map(cr => (cr.id === id ? { ...cr, status } : cr)));
  };

  const addProgramme = (prog: Omit<Programme, 'id'>) => {
    const newProg: Programme = { ...prog, id: 'prog-' + Date.now() };
    setProgrammes(prev => [newProg, ...prev]);
  };

  const updateProgramme = (id: string, prog: Partial<Programme>) => {
    setProgrammes(prev => prev.map(p => (p.id === id ? { ...p, ...prog } : p)));
  };

  const deleteProgramme = (id: string) => {
    setProgrammes(prev => prev.filter(p => p.id !== id));
  };

  const addInstrument = (inst: Omit<Instrument, 'id'>) => {
    const newInst: Instrument = { ...inst, id: 'inst-' + Date.now() };
    setInstruments(prev => [newInst, ...prev]);
  };

  const updateInstrument = (id: string, inst: Partial<Instrument>) => {
    setInstruments(prev => prev.map(i => (i.id === id ? { ...i, ...inst } : i)));
  };

  const deleteInstrument = (id: string) => {
    setInstruments(prev => prev.filter(i => i.id !== id));
  };

  const addLessonNote = (note: Omit<LessonNote, 'id' | 'dateAssigned'>) => {
    const newNote: LessonNote = {
      ...note,
      id: 'note-' + Date.now(),
      dateAssigned: new Date().toISOString().split('T')[0]
    };
    setLessonNotes(prev => [newNote, ...prev]);
  };

  const addAssignment = (assign: Omit<Assignment, 'id' | 'status'>) => {
    const newAssign: Assignment = {
      ...assign,
      id: 'assign-' + Date.now(),
      status: 'pending'
    };
    setAssignments(prev => [newAssign, ...prev]);
  };

  const submitAssignment = (id: string) => {
    setAssignments(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'submitted' as const } : a))
    );
  };

  const addResource = (res: Omit<LMSResource, 'id'>) => {
    const newRes: LMSResource = { ...res, id: 'res-' + Date.now() };
    setResources(prev => [newRes, ...prev]);
  };

  const issueCertificate = (cert: Omit<Certificate, 'id' | 'issueDate' | 'certificateCode'>) => {
    const newCert: Certificate = {
      ...cert,
      id: 'cert-' + Date.now(),
      issueDate: new Date().toISOString().split('T')[0],
      certificateCode: `MA-CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`
    };
    setCertificates(prev => [newCert, ...prev]);
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
        setWhatsappNumber,
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
