# Memory — Build Progress Tracker

> **Instructions:** Read this file at the start of every session. Pick up from the first unchecked item in the current phase.

---

## Current Status

- **Last completed phase:** Phase 2 (ALL COMPLETE)
- **Current phase:** Phase 3 — Consultation & Recruitment (not started)
- **Current feature:** All 5 public website features complete — landing page, programme/instrument details, exam prep, consultancy, contact
- **Last file modified:** src/pages/public/Home.tsx, ProgrammeDetails.tsx, InstrumentDetails.tsx, ExamPrep.tsx, Consultancy.tsx, Contact.tsx, App.tsx
- **Last session summary:** Completed Phase 2. Rewrote Home page with About, Why Learn With Us, Featured Instructors sections. Created ProgrammeDetails page with banner, outcomes, FAQ accordion. Created InstrumentDetails page with image, specs, WhatsApp enquiry, related instruments. Rewrote ExamPrep with practical vs theory, timeline, FAQ. Enhanced Consultancy with success stories + FAQ. Enhanced Contact with social links + Google Maps embed. Production build passes. Updated DESIGN_SYSTEM.md to adopt OKLCH color format, green-tinted shadows, and new animations (float, marquee, shimmer, pulse-ring) from reference site.
- **Blockers:** None

---

## Phase History

### Phase 0 — Documentation & Design Harmonization

- [x] 0.1 Created all 14 docs/ files
- [x] 0.2 Added missing Tailwind tokens (whatsapp, gold-hover, gold-strong)
- [x] 0.3 Replaced ~170 inline hex values with semantic tokens
- [x] 0.4 Fixed missing `group` classes on image containers
- [x] 0.5 Fixed modal animation (CSS keyframes)
- [x] 0.6 Added mobile menu slide transition
- [x] 0.7 Installed framer-motion + page transitions
- [x] 0.8 Created Skeleton loading component
- [x] 0.9 WCAG contrast fixes

### Phase 1 — Foundation & Auth (COMPLETE)

- [x] 1.1 Folder structure refactor — pages/learner, components/ui, components/layouts, lib, hooks
- [x] 1.2 React Router v6 setup — all routes, PublicLayout, LearnLayout, AdminLayout, ProtectedRoute
- [x] 1.3 Supabase client + auth service — lib/supabase.ts, services/auth.ts, AuthProvider, useAuth hook
- [x] 1.4 Shared component library — Button, Card, Modal, FormInput, Badge, Toast, Skeleton
- [x] 1.5 Auth pages — Login, Signup, ForgotPassword, AuthCallback with Supabase Auth

### Phase 2 — Public Website (COMPLETE)

- [x] 2.1 Landing page refactor — About, Why Learn With Us, Featured Instructors sections
- [x] 2.2 Programme listing + Programme Details (/programmes/:id) with FAQ accordion
- [x] 2.3 Exam Prep rewrite — practical vs theory, timeline, FAQ accordion
- [x] 2.4 Instrument shop + Instrument Details (/instruments/:id) with WhatsApp enquiry
- [x] 2.5 Consultancy + Contact — success stories, FAQ, Google Maps embed

### Phase 3 — Consultation & Recruitment (not started)

- [ ] 3.1 4-step consultation wizard
- [ ] 3.2 Become an Instructor page
- [ ] 3.3 Instructors directory
- [ ] 3.4 Admin consultation pipeline

### Phase 4 — Learner LMS (not started)

- [ ] 4.1 Learner dashboard
- [ ] 4.2 Lesson notes
- [ ] 4.3 Assignments
- [ ] 4.4 Resources + Certificates
- [ ] 4.5 Learner profile

### Phase 5 — Admin Core (not started)

- [ ] 5.1 Admin dashboard KPIs
- [ ] 5.2 Programme management
- [ ] 5.3 Learner & LMS management
- [ ] 5.4 Instructor application pipeline
- [ ] 5.5 Consultancy request management

### Phase 6 — Admin Advanced (not started)

- [ ] 6.1 Exam registration management
- [ ] 6.2 Instrument management
- [ ] 6.3 Website CMS
- [ ] 6.4 Reports dashboard
- [ ] 6.5 Settings + Announcements

### Phase 7 — Polish & QA (not started)

- [ ] 7.1 Responsive QA
- [ ] 7.2 Accessibility audit
- [ ] 7.3 Error/loading/empty states
- [ ] 7.4 Dead code cleanup + performance

---

## Resume Instructions

1. Open this file
2. Find the first unchecked `[ ]` item in the current phase
3. That is your starting point
4. Check off items as you complete them
5. Update "Current Status" section at the top

---

## Key Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-07-24 | React Router v6 over tab-based SPA | Real URLs, browser history, SEO |
| 2026-07-24 | Supabase Auth over demo role-switcher | Production-ready authentication |
| 2026-07-24 | Supabase from day one | Consistent data layer from MVP |
| 2026-07-24 | Tailwind semantic tokens over inline hex | Maintainability, consistency |
| 2026-07-24 | framer-motion for page transitions | Lightweight, declarative, widely used |
| 2026-07-24 | CSS keyframes for modal (not tailwindcss-animate) | Tailwind v4 compatibility |
| 2026-07-24 | @tailwindcss/postcss plugin for Tailwind v4 | Tailwind v4 PostCSS requirement |
| 2026-07-24 | Context+Provider pattern for useAuth | Exportable AuthProvider for BrowserRouter wrapping |
| 2026-07-24 | Adopt reference site color/animation style | Match https://melody-academy.lovable.app — OKLCH colors, green-tinted shadows, float/marquee/shimmer animations. Fonts kept as Playfair Display + Plus Jakarta Sans. |

---

## File Inventory

### Documentation (docs/)
- `PRD.md` — Product Requirements Document
- `MEMORY.md` — This file (milestone tracker)
- `IMPLEMENTATION_PLAN.md` — Phased delivery roadmap
- `ARCHITECTURE.md` — Tech decisions, folder structure, auth flow
- `DESIGN_SYSTEM.md` — Tokens, component patterns, Tailwind refactor
- `IA_AND_NAVIGATION.md` — Information Architecture & navigation trees
- `ROUTES.md` — Route definitions, layout wrappers, auth guards
- `DATA_MODEL.md` — Supabase schema, 15 tables, RLS, storage buckets
- `SERVICES.md` — Supabase API functions, auth helpers
- `COMPONENTS.md` — Shared UI component library specs
- `PAGES.md` — 25+ screen specifications
- `INTERACTIONS.md` — Forms, toasts, loading, error states
- `RESPONSIVE.md` — Breakpoints & per-screen layouts
- `TODO.md` — Feature-level checklist per phase

### Source (src/)
- `App.tsx` — React Router v6 with AnimatePresence transitions
- `context/AppContext.tsx` — Global state (legacy, to be phased out)
- `services/auth.ts` — Supabase auth (signIn, signUp, signOut, resetPassword, magicLink)
- `lib/supabase.ts` — Supabase client init
- `hooks/useAuth.tsx` — AuthProvider + useAuth hook
- `types/index.ts` — TypeScript interfaces
- `types/database.ts` — Supabase database types
- `pages/public/` — 7 public pages (no props — use React Router)
- `pages/admin/AdminDashboard.tsx` — Admin dashboard
- `pages/lms/LearnerPortal.tsx` — Learner LMS
- `pages/auth/LoginPage.tsx` — Login with Supabase Auth
- `pages/auth/SignupPage.tsx` — Sign up with email confirmation
- `pages/auth/ForgotPasswordPage.tsx` — Password reset
- `pages/auth/AuthCallback.tsx` — Magic link callback handler
- `pages/recruitment/ApplyInstructor.tsx` — Instructor application
- `components/layout/` — Navbar (React Router), Footer (React Router)
- `components/layouts/PublicLayout.tsx` — Public page layout wrapper
- `components/layouts/LearnLayout.tsx` — Learner sidebar + layout
- `components/layouts/AdminLayout.tsx` — Admin sidebar + layout
- `components/common/ProtectedRoute.tsx` — Role-based route guard
- `components/common/ConsultationModal.tsx` — Consultation modal
- `components/common/Skeleton.tsx` — Skeleton loading
- `components/ui/Button.tsx` — Button component
- `components/ui/Card.tsx` — Card + CardHeader
- `components/ui/Modal.tsx` — Modal component
- `components/ui/FormInput.tsx` — FormInput, FormSelect, FormTextarea
- `components/ui/Badge.tsx` — Badge component
- `components/ui/Toast.tsx` — Toast provider + useToast hook
