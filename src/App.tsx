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

import { Contact } from './pages/public/Contact';
import { About } from './pages/public/About';
import { ProgrammeDetails } from './pages/public/ProgrammeDetails';
import { ApplyInstructor } from './pages/recruitment/ApplyInstructor';


// Auth pages
import { LoginPage } from './pages/auth/LoginPage';
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
import { AdminProvider } from './context/AdminContext';

// Admin pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ProgrammeManagement } from './pages/admin/ProgrammeManagement';
import { LearnerManagement } from './pages/admin/LearnerManagement';
import { InstructorManagement } from './pages/admin/InstructorManagement';
import { BookingsManagement } from './pages/admin/BookingsManagement';
import { ExamManagement } from './pages/admin/ExamManagement';
import { InstrumentManagement } from './pages/admin/InstrumentManagement';
import { LMSManagement } from './pages/admin/LMSManagement';
import { WebsiteCMS } from './pages/admin/WebsiteCMS';
import { Reports } from './pages/admin/Reports';
import { Settings } from './pages/admin/Settings';

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
                <Route path="/apply-instructor" element={<PageTransition><ApplyInstructor /></PageTransition>} />
                <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
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
                <Route element={<AdminProvider><AdminLayout /></AdminProvider>}>
                  <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
                  <Route path="/admin/programmes" element={<PageTransition><ProgrammeManagement /></PageTransition>} />
                  <Route path="/admin/learners" element={<PageTransition><LearnerManagement /></PageTransition>} />
                  <Route path="/admin/instructors" element={<PageTransition><InstructorManagement /></PageTransition>} />
                  <Route path="/admin/bookings" element={<PageTransition><BookingsManagement /></PageTransition>} />
                  <Route path="/admin/exams" element={<PageTransition><ExamManagement /></PageTransition>} />
                  <Route path="/admin/instruments" element={<PageTransition><InstrumentManagement /></PageTransition>} />
                  <Route path="/admin/lms" element={<PageTransition><LMSManagement /></PageTransition>} />
                  <Route path="/admin/content" element={<PageTransition><WebsiteCMS /></PageTransition>} />
                  <Route path="/admin/reports" element={<PageTransition><Reports /></PageTransition>} />
                  <Route path="/admin/settings" element={<PageTransition><Settings /></PageTransition>} />
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
