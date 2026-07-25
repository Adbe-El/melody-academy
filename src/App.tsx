import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastProvider } from './components/ui/Toast';
import { AuthProvider } from './hooks/useAuth';
import { PublicLayout } from './components/layouts/PublicLayout';
import { LearnLayout } from './components/layouts/LearnLayout';
import { AdminLayout } from './components/layouts/AdminLayout';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { DevRoleToggle } from './components/common/DevRoleToggle';

// Public pages
import { Home } from './pages/public/Home';
import { Programmes } from './pages/public/Programmes';
import { Instruments } from './pages/public/Instruments';
import { InstrumentDetails } from './pages/public/InstrumentDetails';
import { ExamPrep } from './pages/public/ExamPrep';
import { Consultancy } from './pages/public/Consultancy';
import { Instructors } from './pages/public/Instructors';
import { Contact } from './pages/public/Contact';
import { ProgrammeDetails } from './pages/public/ProgrammeDetails';
import { ApplyInstructor } from './pages/recruitment/ApplyInstructor';
import { ConsultationWizard } from './pages/public/ConsultationWizard';

// Auth pages
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { AuthCallback } from './pages/auth/AuthCallback';

// Learner pages
import { LearnerDashboard } from './pages/learner/LearnerDashboard';
import { LessonNotes } from './pages/learner/LessonNotes';
import { Assignments } from './pages/learner/Assignments';
import { Resources } from './pages/learner/Resources';
import { Certificates } from './pages/learner/Certificates';
import { Profile } from './pages/learner/Profile';
import { LearnerProvider } from './context/LearnerContext';

// Admin pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ProgrammeManagement } from './pages/admin/ProgrammeManagement';
import { LearnerManagement } from './pages/admin/LearnerManagement';
import { InstructorManagement } from './pages/admin/InstructorManagement';
import { ConsultationManagement } from './pages/admin/ConsultationManagement';
import { ConsultancyManagement } from './pages/admin/ConsultancyManagement';

// Legacy — keep for backward compat during migration
import { AppProvider } from './context/AppContext';

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.2, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <AppProvider>
            <Routes>
              {/* Auth routes — no layout */}
              <Route path="/auth/login" element={<PageTransition><LoginPage /></PageTransition>} />
              <Route path="/auth/signup" element={<PageTransition><SignupPage /></PageTransition>} />
              <Route path="/auth/forgot-password" element={<PageTransition><ForgotPasswordPage /></PageTransition>} />
              <Route path="/auth/callback" element={<AuthCallback />} />

              {/* Public routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/programmes" element={<PageTransition><Programmes /></PageTransition>} />
                <Route path="/programmes/:id" element={<PageTransition><ProgrammeDetails /></PageTransition>} />
                <Route path="/instruments" element={<PageTransition><Instruments /></PageTransition>} />
                <Route path="/instruments/:id" element={<PageTransition><InstrumentDetails /></PageTransition>} />
                <Route path="/exam-prep" element={<PageTransition><ExamPrep /></PageTransition>} />
                <Route path="/consultancy" element={<PageTransition><Consultancy /></PageTransition>} />
                <Route path="/instructors" element={<PageTransition><Instructors /></PageTransition>} />
                <Route path="/apply-instructor" element={<PageTransition><ApplyInstructor /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                <Route path="/consultation" element={<PageTransition><ConsultationWizard /></PageTransition>} />
              </Route>

              {/* Learner routes — protected */}
              <Route element={<ProtectedRoute allowedRoles={['learner', 'admin']} />}>
                <Route element={<LearnerProvider><LearnLayout /></LearnerProvider>}>
                  <Route path="/learner" element={<PageTransition><LearnerDashboard /></PageTransition>} />
                  <Route path="/learner/lessons" element={<PageTransition><LessonNotes /></PageTransition>} />
                  <Route path="/learner/assignments" element={<PageTransition><Assignments /></PageTransition>} />
                  <Route path="/learner/resources" element={<PageTransition><Resources /></PageTransition>} />
                  <Route path="/learner/certificates" element={<PageTransition><Certificates /></PageTransition>} />
                  <Route path="/learner/profile" element={<PageTransition><Profile /></PageTransition>} />
                </Route>
              </Route>

              {/* Admin routes — protected */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
                  <Route path="/admin/programmes" element={<PageTransition><ProgrammeManagement /></PageTransition>} />
                  <Route path="/admin/learners" element={<PageTransition><LearnerManagement /></PageTransition>} />
                  <Route path="/admin/instructors" element={<PageTransition><InstructorManagement /></PageTransition>} />
                  <Route path="/admin/consultations" element={<PageTransition><ConsultationManagement /></PageTransition>} />
                  <Route path="/admin/consultancy" element={<PageTransition><ConsultancyManagement /></PageTransition>} />
                </Route>
              </Route>

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <DevRoleToggle />
          </AppProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
