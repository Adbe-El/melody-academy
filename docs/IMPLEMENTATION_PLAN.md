# Implementation Plan

## Music Academy & Services Platform

### Delivery Strategy

7 phases, each containing 4-5 features. Each feature is independently deployable. Phases are ordered by dependency — earlier phases unlock later ones.

---

## Phase 0 — Documentation & Design Harmonization

**Goal:** Complete documentation, fix all design inconsistencies

| Feature | Description | Effort |
|---------|-------------|--------|
| 0.1 | Create all 14 docs/ files | M |
| 0.2 | Add missing Tailwind tokens (whatsapp, gold-hover) | S |
| 0.3 | Replace ~170 inline hex values with semantic tokens | L |
| 0.4 | Fix missing `group` classes on image containers | S |
| 0.5 | Fix modal animation (CSS keyframes) | S |
| 0.6 | Add mobile menu slide transition | S |
| 0.7 | Install framer-motion + page transitions | M |
| 0.8 | Create Skeleton loading component | M |
| 0.9 | WCAG contrast fixes | M |

**Acceptance Criteria:** All docs complete. Zero inline hex values. Modal animates. Page transitions work. Cards zoom on hover. Contrast passes WCAG AA.

---

## Phase 1 — Foundation & Auth (5 features)

**Goal:** Core infrastructure that everything else builds on

| Feature | Description | Depends On | Effort |
|---------|-------------|-----------|--------|
| 1.1 | Folder structure refactor — reorganize into `pages/public/`, `pages/learner/`, `pages/admin/`, `pages/auth/`, `components/ui/`, `components/layout/`, `services/`, `hooks/`, `lib/` | — | M |
| 1.2 | React Router v6 setup — all routes, layout wrappers (`PublicLayout`, `LearnLayout`, `AdminLayout`), route config file | 1.1 | L |
| 1.3 | Supabase client + auth service — `lib/supabase.ts`, `services/auth.ts`, session listener, role resolution | 1.1 | M |
| 1.4 | Shared component library — Button, Card, Modal, FormInput, Select, Textarea, Badge, Table, Sidebar, Toast, Skeleton | 1.1 | L |
| 1.5 | Auth pages — Login, Sign Up, Forgot Password with Supabase Auth, route guards for `/learn/*` and `/admin/*` | 1.2, 1.3 | M |

**Acceptance Criteria:** App boots with React Router. Supabase connects. Users sign up / log in / reset password. Role-based routing works (admin → admin pages, learner → learner pages).

---

## Phase 2 — Public Website (5 features)

**Goal:** Complete marketing website matching wireframe spec

| Feature | Description | Depends On | Effort |
|---------|-------------|-----------|--------|
| 2.1 | Landing page refactor — add About the Academy, Why Choose Us, Featured Instructors sections; restructure nav per IA | 1.2, 1.4 | L |
| 2.2 | Programme listing + Programme Details page — filters (category, level), search, detail page with banner, outcomes, syllabus, FAQ, CTA | 1.2, 1.4 | L |
| 2.3 | Exam Prep rewrite — hero banner, practical vs theory sections, examination process timeline, FAQ accordion | 1.2, 1.4 | M |
| 2.4 | Instrument shop + Instrument Details page — search bar, category filter, detail page with image gallery, specs, WhatsApp enquiry, related instruments | 1.2, 1.4 | L |
| 2.5 | Consultancy + Contact refactor — add success stories + FAQ to Consultancy; add Google Map embed, social links, form persistence to Contact | 1.2, 1.4 | M |

**Acceptance Criteria:** All public pages render at correct routes. Programme/instrument detail pages load via `:id` params. Landing page matches IA section order. All forms persist to Supabase.

---

## Phase 3 — Consultation & Recruitment (4 features)

**Goal:** Lead capture and instructor recruitment flows

| Feature | Description | Depends On | Effort |
|---------|-------------|-----------|--------|
| 3.1 | 4-step consultation wizard — Step 1 (personal info), Step 2 (purpose select), Step 3 (programme + date + notes), Step 4 (confirmation). Replaces current modal. | 1.2, 1.4 | L |
| 3.2 | Become an Instructor page — add Requirements, Benefits, FAQ sections above application form. File upload to Supabase Storage. | 1.2, 1.3 | M |
| 3.3 | Instructors directory refactor — pull instructor data from context/DB instead of hardcoded; keep recruitment banner | 1.2 | S |
| 3.4 | Admin consultation pipeline — Consultations tab with status workflow (new → contacted → scheduled → completed/enrolled/cancelled), notes field | 1.2, 1.3 | M |

**Acceptance Criteria:** 4-step wizard works with step validation and progress indicator. Instructor applications save to Supabase with CV upload. Admin can manage consultation statuses.

---

## Phase 4 — Learner LMS (5 features)

**Goal:** Enrolled learners can access their learning materials

| Feature | Description | Depends On | Effort |
|---------|-------------|-----------|--------|
| 4.1 | Learner dashboard — programme card, progress bar, upcoming lesson reminder, announcements sidebar | 1.2, 1.3 | M |
| 4.2 | Lesson notes — programme selector dropdown, accordion/list of notes with topic, content, practice goals, download | 1.2, 1.3 | M |
| 4.3 | Assignments — pending/submitted/reviewed cards, file upload submission via Supabase Storage, tutor feedback display | 1.2, 1.3 | M |
| 4.4 | Resources + Certificates — resource grid with type badges (PDF/audio/sheet music) and download; certificate card with print | 1.2, 1.3 | M |
| 4.5 | Learner profile — view/edit personal info, change password | 1.2, 1.3 | S |

**Acceptance Criteria:** Authenticated learner sees their dashboard. Can view lesson notes filtered to their programme. Can submit assignments with file upload. Can download resources and certificates.

---

## Phase 5 — Admin Core (5 features)

**Goal:** Full administrative control over academy operations

| Feature | Description | Depends On | Effort |
|---------|-------------|-----------|--------|
| 5.1 | Admin dashboard KPIs — stat cards (consultations, learners, tutors, instruments, exams), recent activity feed | 1.2, 1.3 | M |
| 5.2 | Programme management — table with create/edit/archive, image upload to Supabase Storage, category management | 1.2, 1.3 | M |
| 5.3 | Learner & LMS management — learner table, post lesson notes per learner, assign homework, issue certificates | 1.2, 1.3 | L |
| 5.4 | Instructor application pipeline — table with review/shortlist/approve/reject, view CV, status history | 1.2, 1.3 | M |
| 5.5 | Consultancy request management — table with organization details, status workflow, contact actions | 1.2, 1.3 | M |

**Acceptance Criteria:** Admin dashboard shows live KPI counts from Supabase. Can CRUD programmes. Can manage learner LMS content. Can review instructor applications. Can manage consultancy requests.

---

## Phase 6 — Admin Advanced (5 features)

**Goal:** Advanced admin features for content and analytics

| Feature | Description | Depends On | Effort |
|---------|-------------|-----------|--------|
| 6.1 | Exam registration management — table with candidate, exam type (Practical/Theory), level, preferred date, status | 1.2, 1.3 | M |
| 6.2 | Instrument management — CRUD with image upload, category management, availability toggle | 1.2, 1.3 | M |
| 6.3 | Website CMS — manage hero banner content, testimonials, FAQs, homepage sections from admin | 1.2, 1.3 | L |
| 6.4 | Reports dashboard — charts for consultations over time, programme interest breakdown, exam registrations, instructor applications | 1.2, 1.3 | L |
| 6.5 | Settings + Announcements — WhatsApp number config, academy info, create/manage announcements with target programmes | 1.2, 1.3 | M |

**Acceptance Criteria:** Admin can manage exam registrations. CRUD instruments. Edit website content. View analytics charts. Manage announcements. Configure settings.

---

## Phase 7 — Polish & QA (4 features)

**Goal:** Production-ready quality

| Feature | Description | Depends On | Effort |
|---------|-------------|-----------|--------|
| 7.1 | Responsive QA — test all pages at sm/md/lg/xl breakpoints, fix layout issues, add sticky mobile CTAs, hamburger nav polish | All phases | L |
| 7.2 | Accessibility audit — keyboard navigation, ARIA labels, focus management, color contrast, screen reader testing | All phases | M |
| 7.3 | Error/loading/empty states — ErrorBoundary per layout, Skeleton loaders per page type, EmptyState components per section | All phases | M |
| 7.4 | Dead code cleanup + performance — delete `App.css`, unused SVGs, lazy load routes, audit bundle size | All phases | M |

**Acceptance Criteria:** Responsive on mobile/tablet/desktop. Keyboard navigable. Error boundaries catch crashes. Loading/empty states everywhere. No dead code. Lighthouse > 80.

---

## Effort Scale

| Size | Description |
|------|-------------|
| S | < 2 hours |
| M | 2-4 hours |
| L | 4-8 hours |
| XL | 8+ hours |

---

## Dependency Graph

```
Phase 0 (Docs & Design)
    │
    ▼
Phase 1 (Foundation & Auth)
    │
    ├──────────────┬──────────────┬──────────────┐
    ▼              ▼              ▼              ▼
Phase 2         Phase 3      Phase 4        Phase 5
(Public)     (Consultation)  (Learner)      (Admin)
    │              │              │              │
    └──────────────┴──────────────┴──────────────┘
                         │
                         ▼
                    Phase 6
                  (Admin Advanced)
                         │
                         ▼
                    Phase 7
                    (Polish)
```

Phases 2-5 can be worked on in parallel by different developers since they don't depend on each other (only on Phase 1).
