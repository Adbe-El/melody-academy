import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastProvider } from './components/ui/Toast';
import { AuthProvider } from './hooks/useAuth';
import { PublicLayout } from './components/layouts/PublicLayout';
import { LearnLayout } from './components/layouts/LearnLayout';
import { AdminLayout } from './components/layouts/AdminLayout';
import { ProtectedRoute } from './components/common/ProtectedRoute';

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
import { LearnerPortal } from './pages/lms/LearnerPortal';

// Admin pages
import { AdminDashboard } from './pages/admin/AdminDashboard';

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
                <Route element={<LearnLayout />}>
                  <Route path="/learn" element={<PageTransition><LearnerPortal /></PageTransition>} />
                  <Route path="/learn/lessons" element={<PageTransition><LearnerPortal /></PageTransition>} />
                  <Route path="/learn/assignments" element={<PageTransition><LearnerPortal /></PageTransition>} />
                  <Route path="/learn/resources" element={<PageTransition><LearnerPortal /></PageTransition>} />
                  <Route path="/learn/certificates" element={<PageTransition><LearnerPortal /></PageTransition>} />
                </Route>
              </Route>

              {/* Admin routes — protected */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
                  <Route path="/admin/programmes" element={<PageTransition><AdminDashboard /></PageTransition>} />
                  <Route path="/admin/learners" element={<PageTransition><AdminDashboard /></PageTransition>} />
                  <Route path="/admin/instructors" element={<PageTransition><AdminDashboard /></PageTransition>} />
                  <Route path="/admin/consultations" element={<PageTransition><AdminDashboard /></PageTransition>} />
                  <Route path="/admin/exams" element={<PageTransition><AdminDashboard /></PageTransition>} />
                  <Route path="/admin/instruments" element={<PageTransition><AdminDashboard /></PageTransition>} />
                  <Route path="/admin/announcements" element={<PageTransition><AdminDashboard /></PageTransition>} />
                  <Route path="/admin/reports" element={<PageTransition><AdminDashboard /></PageTransition>} />
                  <Route path="/admin/settings" element={<PageTransition><AdminDashboard /></PageTransition>} />
                </Route>
              </Route>

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
