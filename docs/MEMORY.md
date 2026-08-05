# Memory — Build Progress Tracker

> **Instructions:** Read this file at the start of every session. Pick up from the first unchecked item in the current phase.

---

## Current Status

- **Last completed phase:** Phase 11 — Design Primitive Propagation (COMPLETE)
- **Current phase:** DESIGN PRIMITIVE PROPAGATION COMPLETE
- **Current feature:** Shared primitives from the Home redesign propagated to all remaining public pages. About rebuilt (line-mask gold hero, count-up stats band, affiliation ticker, dark emerald charity section, waveform quote, magnetic CTAs). Programmes, Instruments, ExamPrep, Consultancy, Contact, ProgrammeDetails, InstrumentDetails and ConsultationWizard all upgraded with SectionHeading headers, staggered Reveal cards, and dark staff-lines/grain hero banners. Consultancy success stories now use the auto-advancing TestimonialCarousel. Build + lint clean (only pre-existing warnings remain).
- **Next steps:** Review pages visually at `/about`, `/programmes`, `/instruments`, `/exam-prep`, `/consultancy`, `/contact`; consider propagating to learner/admin portals in future phases
- **Blockers:** None
- **Supabase credentials:** Project `zadrvszroluveuozckog`, URL `https://zadrvszroluveuozckog.supabase.co`
- **Admin emails:** `adbeelomiunu@gmail.com`, `mattagbamusicconsult@gmail.com`
- **SQL migration file:** `supabase/migrations/20260728000000_create_all_tables.sql` (17 tables, RLS, indexes, seeds)

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

### Phase 3 — Consultation & Recruitment (COMPLETE)

- [x] 3.1 4-step consultation wizard
- [x] 3.2 Become an Instructor page
- [x] 3.3 Instructors directory (hardcoded — pending Supabase migration)
- [x] 3.4 Admin consultation pipeline (BookingsManagement with Individual/Corporate toggle)

### Phase 4 — Learner LMS (COMPLETE)

- [x] 4.1 Learner dashboard
- [x] 4.2 Lesson notes
- [x] 4.3 Assignments
- [x] 4.4 Resources + Certificates
- [x] 4.5 Learner profile

### Phase 5 — Admin Core (COMPLETE)

- [x] 5.1 Admin dashboard KPIs
- [x] 5.2 Programme management
- [x] 5.3 Learner & LMS management
- [x] 5.4 Instructor application pipeline
- [x] 5.5 Consultancy request management

### Phase 6 — Admin Advanced (COMPLETE)

- [x] 6.1 Exam registration management
- [x] 6.2 Instrument management
- [x] 6.3 Website CMS (localStorage — pending Supabase migration)
- [x] 6.4 Reports dashboard
- [x] 6.5 Settings + Announcements (localStorage — pending Supabase migration)

### Phase 7 — Polish & QA (COMPLETE)

- [x] 7.1 Responsive QA — fixed wizard navigation wrapping, verified table overflow-x-auto on all admin pages
- [x] 7.2 Accessibility audit — ARIA labels on hamburger buttons, modal dialog role + focus, skip-to-content link, password toggle labels
- [x] 7.3 Error/loading/empty states — ErrorBoundary added to PublicLayout, LearnLayout, AdminLayout
- [x] 7.4 Dead code cleanup + performance — removed App.css, fixed unused imports/vars (19→5 warnings), fixed LMSManagement ternary expressions

### Phase 8 — Supabase Migration (COMPLETE)

- [x] 8.1 SQL migration pushed to Supabase (17 tables, RLS, indexes)
- [x] 8.2 Seed data SQL created and run (programmes, instruments, announcements, demo records)
- [x] 8.3 AppContext migrated from localStorage/mock data to live Supabase queries
- [x] 8.4 Missing service functions added (getLessonNotesByLearner, getAssignmentsByLearner, getResourcesByProgramme)
- [x] 8.5 Old mock data cleaned up from services/supabase.ts
- [x] 8.6 Two admin auth users created + linked in users table

### Phase 9 — About Page (COMPLETE)

- [x] 9.1 Created `pages/public/About.tsx` — biography, certifications, global affiliations, charity work, teaching philosophy, CTA
- [x] 9.2 Registered `/about` route in `App.tsx` with `PageTransition` wrapper
- [x] 9.3 Added "About" link to Navbar
- [x] 9.4 Updated PAGES.md and MEMORY.md to document the new page

### Phase 10 — Home Page Concert Hall Redesign (COMPLETE)

- [x] 10.1 Added CSS foundation — gold gradient text, grain overlay, staff-lines motif, note-float, scroll-hint, spin-slow, marquee pause, scrollbar-hide, prefers-reduced-motion guards
- [x] 10.2 Built shared primitives — Reveal, SectionHeading, Counter, MagneticButton, Waveform, AffiliationTicker, TestimonialCarousel (all reduced-motion aware)
- [x] 10.3 Rebuilt Home.tsx — 9 sections: parallax hero w/ line-mask headline, affiliation ticker, bento services (route dedupe fix), live featured programmes w/ tilt cards, maestro stats + quote, self-drawing journey timeline, auto-advance testimonial carousel, horizontal instrument gallery w/ empty states, animated final CTA w/ WhatsApp
- [x] 10.4 Navbar trim — 4 links (Programmes, Instruments, About, Contact) + gold/emerald "Book Consultation" CTA; mobile drawer updated
- [x] 10.5 Footer — removed public "Admin Dashboard" link, added About Matthew + Apply as Instructor
- [x] 10.6 Verified — `npm run build` and `npm run lint` clean (only pre-existing warnings remain)

### Phase 11 — Design Primitive Propagation (COMPLETE)

- [x] 11.1 About page rebuilt — gold gradient hero, count-up stats band, affiliation ticker, dark emerald charity section, waveform quote, magnetic CTAs
- [x] 11.2 Programmes + Instruments — SectionHeading headers, staggered Reveal cards, staff-lines/grain hero banners
- [x] 11.3 ExamPrep + Consultancy — SectionHeading everywhere, Reveal cards, Consultancy success stories → TestimonialCarousel
- [x] 11.4 Contact + ConsultationWizard — SectionHeading/Reveal header + Reveal columns
- [x] 11.5 ProgrammeDetails + InstrumentDetails — Reveal-wrapped content sections
- [x] 11.6 Verified — `npm run build` and `npm run lint` clean; no new warnings introduced

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
| 2026-07-24 | Adopt reference site color/animation style | Match https://melody-academy.lovable.app — OKLCH colors, green-tinted shadows, float/marquee/shimmer animations. Fonts kept as Playfair Display + Plus Jakarta Sans. Brand name is Matt-Agba Music Consult. |
| 2026-07-27 | Never deploy unless explicitly asked | Do not run `vercel --prod` or any deploy command unless the user specifically requests it. |
| 2026-07-28 | Hybrid consultations model | DATA_MODEL.md base + preferred_instrument, age_group, experience_level, goals columns |
| 2026-07-28 | All DB columns snake_case | Converted all TS interfaces, services, contexts, and pages to match |
| 2026-07-28 | PostgREST JOINs for learners | Denormalized data returned to UI (user name + programme title via JOIN, not separate queries) |
| 2026-07-28 | Users table: first_name + last_name | Separate columns instead of full_name, concatenated in service layer |
| 2026-07-29 | Dedicated `/about` route instead of Home section | Founder biography warranted its own page; Home now focuses on services and CTA |
| 2026-08-05 | Concert Hall home redesign | Home rebuilt as cinematic dark-emerald "art & music hub" — real institutions in ticker, live programme data, parallax/count-up/timeline/carousel motion. Shared primitives set tone for future public pages. All motion respects prefers-reduced-motion. |
| 2026-08-05 | Propagate primitives to all public pages | About, Programmes, Instruments, ExamPrep, Consultancy, Contact, ProgrammeDetails, InstrumentDetails, ConsultationWizard upgraded with SectionHeading/Reveal/Counter/MagneticButton/Waveform/AffiliationTicker/TestimonialCarousel. Consultancy testimonials converted to auto-advancing carousel. Consistent dark hero treatment (staff-lines + grain + gold glow) across page banners. |

---

## Data Loading Pattern (MANDATORY)

> **All admin pages MUST follow this pattern. No exceptions.**

### Rule
Admin pages must **never** fetch data independently with their own `useEffect` + `useState`. Instead, they must read from `AdminContext` via the `useAdmin()` hook. All data is pre-fetched once when the admin layout mounts.

### How it works
1. `AdminContext` pre-fetches ALL admin datasets in parallel on mount (`Promise.allSettled`)
2. `dataCache` (in-memory, 5-min TTL) prevents redundant fetches across tab switches
3. Individual pages call `useAdmin()` and read context values directly
4. Pages show a Skeleton only while `loading` from context is true — then render instantly
5. After mutations, pages call `context.refresh*()` which clears cache and re-fetches

### Pattern template for new admin pages
```tsx
import { useAdmin } from '../../context/AdminContext';

export const MyPage: React.FC = () => {
  const { myDataset, loading, refreshMyDataset } = useAdmin();
  // Read from context, NEVER fetch independently
  if (loading) return <Skeleton variant="table-row" count={5} />;
  return <div>{/* render myDataset */}</div>;
};
```

### Adding new data to AdminContext
1. Add `EXA_COLUMNS` constant for slim queries
2. Add `useState` + setter in `AdminProvider`
3. Add to `Promise.allSettled` in `useEffect`
4. Add `refresh*` function with `clearCache` + re-fetch
5. Export via context value + `useAdmin()` hook

### Learner pages (different pattern)
Learner pages use `LearnerContext` for identity only (learnerId), then fetch per-page data scoped to that learner. This is correct — each page needs different learner-specific data.

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
- `DATA_MODEL.md` — Supabase schema, 17 tables, RLS, storage buckets
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
- `lib/dataCache.ts` — In-memory cache with 5-minute TTL
- `hooks/useAuth.tsx` — AuthProvider + useAuth hook
- `types/index.ts` — TypeScript interfaces
- `types/database.ts` — Supabase database types
- `pages/public/` — 11 public pages (Home, About, Programmes, ProgrammeDetails, Instruments, InstrumentDetails, ExamPrep, Consultancy, Instructors, Contact, ConsultationWizard)
- `pages/admin/AdminDashboard.tsx` — Admin dashboard (cached, slim column queries)
- `pages/admin/BookingsManagement.tsx` — Unified Bookings page with Individual/Corporate toggle
- `pages/admin/ProgrammeManagement.tsx` — Programme CRUD (useMemo, column-specific fetch)
- `pages/admin/LearnerManagement.tsx` — Learner table (useMemo, column-specific fetch)
- `pages/admin/InstructorManagement.tsx` — Instructor application pipeline (useMemo, column-specific fetch)
- `pages/learner/LearnerPortal.tsx` — Learner LMS
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
