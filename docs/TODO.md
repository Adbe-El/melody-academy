# TODO — Feature-Level Checklist

## Matt-Agba Music Consult

---

## Phase 0 — Documentation & Design Harmonization

- [x] 0.1 Create all 14 docs/ files
  - Files: `PRD.md`, `MEMORY.md`, `IMPLEMENTATION_PLAN.md`, `ARCHITECTURE.md`, `DESIGN_SYSTEM.md`, `IA_AND_NAVIGATION.md`, `ROUTES.md`, `DATA_MODEL.md`, `SERVICES.md`, `COMPONENTS.md`, `PAGES.md`, `INTERACTIONS.md`, `RESPONSIVE.md`, `TODO.md`
  - Depends on: —
  - Effort: M

- [x] 0.2 Add missing Tailwind tokens
  - Add `gold-hover`, `whatsapp`, `whatsapp-hover` to `tailwind.config.js`
  - Files: `tailwind.config.js`
  - Depends on: —
  - Effort: S

- [x] 0.3 Replace ~170 inline hex values with semantic tokens
  - Global find-replace across all `.tsx` files. Use DESIGN_SYSTEM.md mapping table.
  - Files: All 13 `.tsx` files in `src/`
  - Depends on: 0.2
  - Effort: L

- [x] 0.4 Fix missing `group` classes on image containers
  - Add `group` to parent divs of `Programmes.tsx:79` and `Instruments.tsx:61`
  - Files: `Programmes.tsx`, `Instruments.tsx`
  - Depends on: —
  - Effort: S

- [x] 0.5 Fix modal animation (CSS keyframes)
  - Add `@keyframes modalFadeIn` and `.animate-modal-in` to `index.css`
  - Update `ConsultationModal.tsx` to use new class
  - Files: `index.css`, `ConsultationModal.tsx`
  - Depends on: —
  - Effort: S

- [x] 0.6 Add mobile menu slide transition
  - Replace conditional render with CSS transition on `max-height` + `opacity`
  - Files: `Navbar.tsx`
  - Depends on: —
  - Effort: S

- [x] 0.7 Install framer-motion + page transitions
  - `npm install framer-motion`
  - Wrap route content in `motion.div` in layouts
  - Files: `package.json`, layout components
  - Depends on: —
  - Effort: M

- [x] 0.8 Create Skeleton loading component
  - Create `src/components/ui/Skeleton.tsx` with variants
  - Files: NEW `Skeleton.tsx`
  - Depends on: —
  - Effort: M

- [x] 0.9 WCAG contrast fixes
  - Replace `text-gray-500` → `text-academy-muted`, `text-gray-400` → `text-academy-muted` on light backgrounds
  - Files: Multiple `.tsx` files
  - Depends on: 0.3
  - Effort: M

---

## Phase 1 — Foundation & Auth

- [x] 1.1 Folder structure refactor
  - Reorganize into: `pages/public/`, `pages/learner/`, `pages/admin/`, `pages/auth/`, `components/ui/`, `components/layout/`, `components/common/`, `services/`, `hooks/`, `lib/`, `routes/`, `types/`
  - Files: All source files (move only, no logic changes)
  - Depends on: 0.1-0.9
  - Effort: M

- [x] 1.2 React Router v6 setup
  - Install `react-router-dom`, create `routes/index.tsx`, create `PublicLayout`, `LearnLayout`, `AdminLayout`
  - Files: `package.json`, NEW `routes/index.tsx`, NEW layout components
  - Depends on: 1.1
  - Effort: L

- [x] 1.3 Supabase client + auth service
  - Create `lib/supabase.ts`, `services/auth.ts`, `context/AuthContext.tsx`
  - Files: NEW `lib/supabase.ts`, NEW `services/auth.ts`, NEW `context/AuthContext.tsx`
  - Depends on: 1.1
  - Effort: M

- [x] 1.4 Shared component library
  - Create: Button, Card, Modal, FormInput, Select, Textarea, Badge, Table, Skeleton, Toast, EmptyState, MultiStepForm
  - Files: NEW `components/ui/*.tsx` (12 files)
  - Depends on: 1.1
  - Effort: L

- [x] 1.5 Auth pages (Login, Forgot Password)
  - Create auth pages, implement Supabase auth flow, create route guards
  - Files: NEW `pages/auth/LoginPage.tsx`, `ForgotPasswordPage.tsx`, `AuthCallback.tsx`, NEW `components/common/ProtectedRoute.tsx`
  - Depends on: 1.2, 1.3
  - Effort: M

---

## Phase 2 — Public Website

- [x] 2.1 Landing page refactor
  - Add: About the Academy, Why Choose Us, Featured Instructors sections. Restructure nav per IA.
  - Files: `pages/public/Home.tsx`, `components/layout/Navbar.tsx`
  - Depends on: 1.2, 1.4
  - Effort: L

- [x] 2.2 Programme listing + Programme Details page
  - Refactor listing (add Level filter), create new details page with banner, outcomes, syllabus, FAQ, CTA
  - Files: `pages/public/Programmes.tsx` refactor, NEW `pages/public/ProgrammeDetails.tsx`
  - Depends on: 1.2, 1.4
  - Effort: L

- [x] 2.3 Exam Prep rewrite
  - Add hero banner, practical vs theory sections, examination process timeline, FAQ accordion
  - Files: `pages/public/ExamPrep.tsx` rewrite
  - Depends on: 1.2, 1.4
  - Effort: M

- [x] 2.4 Instrument shop + Instrument Details page
  - Add search bar to shop, create details page with gallery, specs, WhatsApp, related instruments
  - Files: `pages/public/Instruments.tsx` refactor, NEW `pages/public/InstrumentDetails.tsx`
  - Depends on: 1.2, 1.4
  - Effort: L

- [x] 2.5 Consultancy + Contact refactor
  - Add success stories + FAQ to Consultancy; add Google Map, social links, form persistence to Contact
  - Files: `pages/public/Consultancy.tsx`, `pages/public/Contact.tsx`
  - Depends on: 1.2, 1.4
  - Effort: M

---

## Phase 3 — Consultation & Recruitment

- [x] 3.1 4-step consultation wizard
  - Replace current modal with full-page wizard: personal info → purpose → details → confirmation
  - Files: NEW `pages/public/ConsultationWizard.tsx`
  - Depends on: 1.2, 1.4
  - Effort: L

- [x] 3.2 Become an Instructor page
  - Add Requirements, Benefits, FAQ sections above existing form. File upload to Supabase Storage.
  - Files: `pages/recruitment/ApplyInstructor.tsx`
  - Depends on: 1.2, 1.3
  - Effort: M

- [x] 3.3 Instructors directory refactor
  - Pull instructor data from context/DB instead of hardcoded. Keep recruitment banner.
  - Files: `pages/public/Instructors.tsx`
  - Depends on: 1.2
  - Effort: S

- [x] 3.4 Admin consultation pipeline
  - Consultations tab with status workflow (new → contacted → scheduled → completed/enrolled/cancelled)
  - Files: `pages/admin/BookingsManagement.tsx`
  - Depends on: 1.2, 1.3
  - Effort: M

---

## Phase 4 — Learner LMS

- [x] 4.1 Learner dashboard
  - Programme card, progress bar, latest lesson note, pending assignments, announcements sidebar
  - Files: NEW `pages/learner/LearnerDashboard.tsx`
  - Depends on: 1.2, 1.3
  - Effort: M

- [x] 4.2 Lesson notes
  - Programme selector dropdown, accordion/list of notes with topic, content, practice goals, download
  - Files: NEW `pages/learner/LessonNotes.tsx`
  - Depends on: 1.2, 1.3
  - Effort: M

- [x] 4.3 Assignments
  - Pending/submitted/reviewed cards, file upload submission via Supabase Storage, tutor feedback
  - Files: NEW `pages/learner/Assignments.tsx`
  - Depends on: 1.2, 1.3
  - Effort: M

- [x] 4.4 Resources + Certificates
  - Resource grid with type badges and download; certificate card with print
  - Files: NEW `pages/learner/Resources.tsx`, NEW `pages/learner/Certificates.tsx`
  - Depends on: 1.2, 1.3
  - Effort: M

- [x] 4.5 Learner profile
  - View/edit personal info, change password
  - Files: NEW `pages/learner/Profile.tsx`
  - Depends on: 1.2, 1.3
  - Effort: S

---

## Phase 5 — Admin Core

- [x] 5.1 Admin dashboard KPIs
  - Stat cards (consultations, learners, tutors, instruments, exams), recent activity feed
  - Files: `pages/admin/AdminDashboard.tsx` refactor
  - Depends on: 1.2, 1.3
  - Effort: M

- [x] 5.2 Programme management
  - Table with create/edit/archive, image upload, category management
  - Files: NEW `pages/admin/ProgrammeManagement.tsx`
  - Depends on: 1.2, 1.3
  - Effort: M

- [x] 5.3 Learner & LMS management
  - Learner table, post lesson notes, assign homework, issue certificates
  - Files: NEW `pages/admin/LearnerManagement.tsx`, NEW `pages/admin/LMSManagement.tsx`
  - Depends on: 1.2, 1.3
  - Effort: L

- [x] 5.4 Instructor application pipeline
  - Table with review/shortlist/approve/reject, view CV, status history
  - Files: NEW `pages/admin/InstructorManagement.tsx`
  - Depends on: 1.2, 1.3
  - Effort: M

- [x] 5.5 Consultancy request management
  - Table with organization details, status workflow, contact actions
  - Files: NEW `pages/admin/BookingsManagement.tsx`
  - Depends on: 1.2, 1.3
  - Effort: M

---

## Phase 6 — Admin Advanced

- [x] 6.1 Exam registration management
  - Table with candidate, exam type, level, preferred date, status
  - Files: NEW `pages/admin/ExamManagement.tsx`
  - Depends on: 1.2, 1.3
  - Effort: M

- [x] 6.2 Instrument management
  - CRUD with image upload, category management, availability toggle
  - Files: NEW `pages/admin/InstrumentManagement.tsx`
  - Depends on: 1.2, 1.3
  - Effort: M

- [x] 6.3 Website CMS
  - Manage hero banner, testimonials, FAQs, homepage sections from admin
  - Files: `pages/admin/WebsiteCMS.tsx`
  - Depends on: 1.2, 1.3
  - Effort: L

- [x] 6.4 Reports dashboard
  - Charts for consultations, programme interest, exam registrations, instructor applications
  - Files: NEW `pages/admin/Reports.tsx`
  - Depends on: 1.2, 1.3
  - Effort: L

- [x] 6.5 Settings + Announcements
  - WhatsApp number config, academy info, create/manage announcements
  - Files: `pages/admin/Settings.tsx`
  - Depends on: 1.2, 1.3
  - Effort: M

---

## Phase 7 — Polish & QA

- [x] 7.1 Responsive QA
  - Test all pages at sm/md/lg/xl breakpoints, fix layout issues, add sticky mobile CTAs
  - Files: All page + layout components
  - Depends on: All phases
  - Effort: L

- [x] 7.2 Accessibility audit
  - Keyboard navigation, ARIA labels, focus management, color contrast, screen reader testing
  - Files: All components
  - Depends on: All phases
  - Effort: M

- [x] 7.3 Error/loading/empty states
  - ErrorBoundary per layout, Skeleton loaders per page type, EmptyState per section
  - Files: All pages, layout components
  - Depends on: All phases
  - Effort: M

- [x] 7.4 Dead code cleanup + performance
  - Delete `App.css`, unused SVGs, lazy load routes, audit bundle size
  - Files: `App.css`, `src/assets/`, `routes/index.tsx`
  - Depends on: All phases
  - Effort: M

---

## Effort Summary

| Phase | S | M | L | XL | Total |
|-------|---|---|---|-----|-------|
| 0 | 4 | 4 | 1 | 0 | ~10h |
| 1 | 0 | 3 | 2 | 0 | ~14h |
| 2 | 0 | 2 | 3 | 0 | ~16h |
| 3 | 1 | 2 | 1 | 0 | ~10h |
| 4 | 1 | 4 | 0 | 0 | ~11h |
| 5 | 0 | 4 | 1 | 0 | ~13h |
| 6 | 0 | 3 | 2 | 0 | ~12h |
| 7 | 0 | 3 | 1 | 0 | ~9h |
| **Total** | **6** | **25** | **11** | **0** | **~95h** |
