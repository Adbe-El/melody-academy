# Quality Assurance

## Matt-Agba Music Consult

---

## Scope

| Area | Pages / Modules | Coverage |
|------|----------------|----------|
| Public | Home, Programmes, ProgrammeDetails, Instruments, InstrumentDetails, Consultancy, Instructors, ConsultationWizard, ApplyInstructor | Navigation, form submission, responsive layout, empty states |
| Auth | Login, ForgotPassword, AuthCallback | Login flow, redirects, session persistence, error messages |
| Learner LMS | LearnerDashboard, LessonNotes, Assignments, Resources, Certificates, Profile | Data display, file upload/download, status updates, print |
| Admin | Dashboard, ProgrammeManagement, LearnerManagement, InstructorManagement, BookingsManagement, ExamManagement, InstrumentManagement, LMSManagement, WebsiteCMS, Reports, Settings | CRUD operations, status workflows, search/filter, data cache |
| Shared | Modals, Toasts, Skeletons, ErrorBoundary, AdminContext, dataCache | Visual correctness, timing, fallback behavior |

---

## AdminContext Data Loading (CRITICAL)

All admin pages read from `AdminContext` — never from individual `useEffect` + `useState`.

### Pre-fetch Verification

| Test | Expected |
|------|----------|
| Navigate to any admin page | Skeleton renders immediately while loading === true |
| Wait for data load | Content renders, loading === false |
| Switch to another admin tab | Instant render (no skeleton, no network request) |
| Open browser DevTools > Network | Only one fetch per dataset per page session |
| Wait 5+ minutes, then switch tabs | Cache expired — new fetch fires, skeleton shows briefly |

### Cache Invalidation

| Mutation | Expected |
|----------|----------|
| Create/update/delete a record | `refresh*()` called, cache cleared, data re-fetched |
| Navigate away and back | Data still fresh (within 5-min TTL) |

---

## Manual Test Matrix

### Public Pages

| Page | Test Case | Expected |
|------|-----------|----------|
| Home | Scroll all sections | Hero, About, Services, Stats, Testimonials, CTA all render |
| Home | Click WhatsApp CTA | Opens `wa.me` with pre-filled message |
| Home | Click "Book Consultation" | Navigates to `/consultation` |
| Programmes | Filter by category/level | Cards filter correctly, empty state shows if no match |
| Programmes | Click programme card | Navigates to `/programmes/:id` |
| ProgrammeDetails | Scroll syllabus, FAQ | Accordion expands/collapses |
| ProgrammeDetails | Click CTA | Navigates to consultation wizard |
| Instruments | Search by name | Results filter in real time |
| InstrumentDetails | Click "Enquire on WhatsApp" | Opens `wa.me` with instrument name + price in message |
| Consultancy | Submit form | Creates consultancy request, shows success toast |
| Instructors | Click "Apply as Instructor" | Navigates to `/apply` |
| ConsultationWizard | Complete 4-step flow | All validations fire, submission creates consultation record, confirmation shown |
| ConsultationWizard | Navigate back/forward | Step state preserved, fields remembered |
| ApplyInstructor | Submit with file upload | File uploaded to Supabase Storage, application created |

### Auth

| Page | Test Case | Expected |
|------|-----------|----------|
| Login | Submit valid credentials | Redirects to admin or learner dashboard based on role |
| Login | Submit wrong password | Error toast: "Invalid login credentials" |
| Login | Navigate to `/admin` without session | Redirected to `/auth/login` |
| ForgotPassword | Submit email | Success message shown (Supabase sends email) |
| AuthCallback | Open magic link | Session established, redirected to dashboard |
| AuthCallback | Expired/invalid link | Error message shown |

### Learner LMS

| Page | Test Case | Expected |
|------|-----------|----------|
| Dashboard | View KPIs | Programme card, progress bar, latest note, pending assignments, announcements |
| LessonNotes | Select programme | Notes filter by programme |
| LessonNotes | Click download | File download or opens in new tab |
| Assignments | Filter by status | Pending/submitted/reviewed tabs filter correctly |
| Assignments | Upload submission | File uploads to Supabase Storage, status changes to "submitted" |
| Resources | Filter by type | PDF/audio/sheet music tabs filter correctly |
| Certificates | Click print/hide | Print dialog opens for eligible certificates |
| Profile | Edit fields | Updates saved to Supabase, toast shows success |
| Profile | Change password | Supabase password update, re-login required |

### Admin Pages

| Page | Test Case | Expected |
|------|-----------|----------|
| Dashboard | View stat cards | Counts match actual data (consultations, learners, instructors, exams) |
| Dashboard | Recent activity | Shows latest bookings/applications |
| ProgrammeManagement | Create programme | Form validates, record created, table refreshes |
| ProgrammeManagement | Edit programme | Modal pre-filled, changes saved |
| ProgrammeManagement | Archive programme | Status changes to "archived", hidden from public |
| LearnerManagement | View learner details | Modal shows user + programme info via JOIN |
| LearnerManagement | Issue certificate | Certificate created, status field updated |
| InstructorManagement | Change application status | Status updates (pending → under_review → shortlisted/accepted/rejected) |
| BookingsManagement | Toggle Individual/Corporate | Tab switches between consultations and consultancy requests |
| BookingsManagement | Update consultation status | Status workflow: new → contacted → scheduled → completed/enrolled/cancelled |
| ExamManagement | Filter by status | Rows filter correctly |
| ExamManagement | Update exam status | Status persists after page reload |
| InstrumentManagement | Create instrument | Categories load from DB, form saves, image URL stored |
| InstrumentManagement | Toggle availability | Yes/No badge updates immediately |
| LMSManagement | Switch tabs (Notes/Assignments/Resources) | Data per tab renders, counts update |
| WebsiteCMS | Toggle active/hidden | Badge flips between "Live" and "Hidden", public site reflects change |
| Reports | View charts | Stat cards and progress bars show correct numbers |
| Settings | Save academy info | WhatsApp number, name, email persist on reload |
| Settings | Post announcement | Announcement appears in list and on learner dashboards |
| Settings | Delete announcement | Removed from list and learner dashboards |

### Shared Components

| Component | Test Case | Expected |
|-----------|-----------|----------|
| Modal | Open + close | Fade-in animation, Escape closes, backdrop click closes |
| Modal | Tab focus trap | Focus cycles within modal, does not escape to underlying page |
| Toast | Trigger success/error | Slides in from right, auto-dismisses after 4s |
| Skeleton | Loading state | Correct variant per context (table-row, card, text, title) |
| ErrorBoundary | Force render error | Fallback UI shown (AlertTriangle + "Try Again" button) |
| ErrorBoundary | Click "Try Again" | Component re-renders, error state cleared |
| Badge | All variants | Color matches status (emerald/gold/green/red/gray) |

---

## Responsive Testing

| Breakpoint | Width | Key Checks |
|-----------|-------|------------|
| Mobile | 375px | Hamburger menu, stacked cards, full-width tables scroll horizontally, sticky bottom CTA |
| Mobile | 414px (iPhone) | Same as 375px, check touch targets >= 44px |
| Tablet | 768px (iPad) | 2-column grids, sidebar visible, tables readable |
| Desktop | 1280px | 3-4 column grids, full sidebar, max-w-7xl container centered |
| Desktop | 1920px | Wide screens — content still centered, no horizontal stretching |

### Test on Real Devices (Recommended)

- iPhone SE / 14 Pro — Safari + Chrome
- Samsung Galaxy S22 — Chrome
- iPad Air — Safari
- MacBook 13" — Chrome + Firefox + Safari
- Windows desktop 1080p + 1440p — Chrome + Edge + Firefox

---

## Cross-Browser Testing

| Browser | Status |
|---------|--------|
| Chrome (latest) | Primary development target |
| Firefox (latest) | Full support |
| Safari (latest) | Full support |
| Edge (latest) | Chromium — should match Chrome |

### Known Safari Quirks

- Backdrop blur (`backdrop-blur-*`): may not render on older Safari — degrades gracefully (solid background fallback)
- `position: sticky` on tables: use `overflow-x-auto` wrapper instead
- Date inputs: may show as text field on desktop Safari — acceptable (ISO format placeholder)

---

## Accessibility (a11y)

| Check | Method | Criteria |
|-------|--------|----------|
| Keyboard navigation | Tab through all interactive elements | All buttons, links, inputs reachable; focus ring visible |
| Skip-to-content link | First tab press | Visible "Skip to content" link appears |
| Screen reader | VoiceOver / NVDA | Headings hierarchy (h1 → h2 → h3), alt text on images |
| ARIA labels | Inspect button/modals | Hamburger has `aria-label`, modal has `role="dialog"` + `aria-modal` |
| Color contrast | DevTools contrast checker | Text on bg >= 4.5:1 ratio |
| Focus trap | Tab in open modal | Focus does not escape to background content |
| Form labels | Inspect inputs | Every input has associated label (visible or sr-only) |

---

## Error Handling

| Scenario | Expected Behavior |
|----------|------------------|
| Supabase query fails (network error) | Toast: "Failed to load data. Please try again." |
| Supabase query fails (RLS policy blocks) | Toast: "You do not have permission to perform this action." |
| Form submission fails | Toast error, form state preserved (no data loss) |
| Rendering crash in page | ErrorBoundary catches, shows fallback UI |
| Empty dataset | EmptyState component with appropriate message + action button (if any) |
| Invalid URL parameter (e.g. bad programme ID) | Show "Not found" state, no crash |
| File upload exceeds size limit | Toast error: "File too large. Maximum size is 10MB." |

---

## Performance Checklist

| Item | Target | How to Verify |
|------|--------|---------------|
| Route-level code splitting | Each page loads its own chunk | DevTools Network tab — JS files per route |
| AdminContext pre-fetch | All datasets fetched once in parallel | Network tab — requests fire simultaneously on first admin page visit |
| dataCache TTL | 5 minutes | Wait 5 min, switch tabs — single new fetch |
| Image optimization | Serve compressed images | Lighthouse audit |
| Bundle size | < 500 KB gzipped | `vite build` output report |
| No unnecessary re-renders | Admin pages use `useMemo` + `useCallback` | React DevTools profiler |

---

## Pre-Deployment Checklist

- [ ] All pages render without console errors
- [ ] All CRUD operations succeed against production Supabase
- [ ] RLS policies tested with both admin and learner roles
- [ ] File uploads work in all storage buckets
- [ ] Auth flow complete (login, logout, password reset, magic link)
- [ ] Responsive QA passed at mobile, tablet, desktop
- [ ] Cross-browser QA passed (Chrome, Firefox, Safari, Edge)
- [ ] Lighthouse score >= 80 for Performance, Accessibility, Best Practices
- [ ] `VITE_DEV_BYPASS_AUTH` set to `false`
- [ ] No `console.log` or debug code in production build
- [ ] `vercel.json` routes configured for SPA fallback
