# Pages

## Music Academy & Services Platform

---

## Page Specifications

Each page lists: route, layout, auth requirement, sections with component mapping, data dependencies, and primary CTAs.

---

### 1. Landing Page (`/`)

**Layout:** PublicLayout
**Auth:** None
**Title:** Home

| Section | Components | Data |
|---------|-----------|------|
| Hero | Headline, subtext, 2 CTAs, hero image (arch mask), floating badges | Static |
| About the Academy | Two-column: text + image, mission statement | Static |
| Featured Programmes | `ProgrammeCard` grid (3-4 featured) | `programmesService.getFeatured()` |
| Why Learn With Us | 4-column grid: expert tutors, flexible schedule, LMS access, certificates | Static |
| Explore Our Services | 6 service cards with icons | Static |
| Featured Instructors | Instructor card carousel/grid | Static (hardcoded) |
| How It Works | 4-step numbered cards (Choose, Book, Learn, Achieve) | Static |
| Testimonials | 3 testimonial cards on dark background | Static |
| Stats Bar | 4 stat counters (10K+ learners, 600+ tutors, etc.) | Static |
| Final CTA | Full-width banner with consultation button | Static |

**Primary CTAs:** Book Consultation, Explore Services

---

### 2. Programme Listing (`/programmes`)

**Layout:** PublicLayout
**Auth:** None
**Title:** Programmes

| Section | Components | Data |
|---------|-----------|------|
| Page Header | Pill badge + title + subtitle | Static |
| Filters | Category pills, Level dropdown, Search input | Static options |
| Programme Grid | `ProgrammeCard` components | `programmesService.getAll()` |

**ProgrammeCard props:** image, category badge, title, description, level, ageGroup, duration, syllabusHighlights, "Book Consultation" CTA

**Primary CTAs:** Book Consultation (per card)

---

### 3. Programme Details (`/programmes/:id`)

**Layout:** PublicLayout
**Auth:** None
**Title:** Programme Details

| Section | Components | Data |
|---------|-----------|------|
| Banner | Full-width programme image + overlay title | `programmesService.getById(id)` |
| Overview | Description, duration, level, age group | Same |
| Learning Outcomes | Bulleted list from syllabusHighlights | Same |
| Suitable For | Age group + level badges | Same |
| What You'll Learn | Accordion or card list | Same |
| FAQ | Accordion component | Static per programme category |
| CTA | Book Consultation button | Static |

**Primary CTAs:** Book Consultation

---

### 4. Exam Prep (`/exams`)

**Layout:** PublicLayout
**Auth:** None
**Title:** Professional Music Exams

| Section | Components | Data |
|---------|-----------|------|
| Hero Banner | Headline, subtext, CTA | Static |
| Practical Exams | Description card | Static |
| Theory Exams | Description card | Static |
| Examination Process | Timeline/step component | Static |
| Exam Boards | ABRSM, Trinity, MUSON cards with badges | Static |
| FAQ | Accordion | Static |
| CTA | Consultation button | Static |

**Primary CTAs:** Register Interest, Book Consultation

---

### 5. Instrument Shop (`/instruments`)

**Layout:** PublicLayout
**Auth:** None
**Title:** Instrument Shop

| Section | Components | Data |
|---------|-----------|------|
| Hero Banner | Title + subtitle on dark bg | Static |
| Search Bar | Search input | User input |
| Category Filter | Category pills | `instrumentCategories` |
| Instrument Grid | `InstrumentCard` components | `instrumentsService.getAll()` |

**InstrumentCard props:** image, name, category, price, condition badge, "View Details" + "WhatsApp Enquiry" CTAs

**Primary CTAs:** WhatsApp Enquiry, View Details

---

### 6. Instrument Details (`/instruments/:id`)

**Layout:** PublicLayout
**Auth:** None
**Title:** Instrument Details

| Section | Components | Data |
|---------|-----------|------|
| Image Gallery | Main image + thumbnails | `instrumentsService.getById(id)` |
| Details Panel | Name, description, price, specifications list, availability | Same |
| WhatsApp CTA | WhatsApp button with pre-filled message | Same |
| Related Instruments | `InstrumentCard` grid (same category) | `instrumentsService.getByCategory()` |

**Primary CTAs:** WhatsApp Enquiry

---

### 7. Consultancy (`/consultancy`)

**Layout:** PublicLayout
**Auth:** None
**Title:** Music Consultancy

| Section | Components | Data |
|---------|-----------|------|
| Hero | Title + subtitle | Static |
| Services | 4 service cards (Schools, Churches, Choirs, Corporate) | Static |
| Request Form | Multi-field form | `consultancyRequestsService.create()` |
| Success Stories | Testimonial cards | Static |
| FAQ | Accordion | Static |

**Primary CTAs:** Submit Consultancy Request

---

### 8. Instructors (`/instructors`)

**Layout:** PublicLayout
**Auth:** None
**Title:** Meet Our Instructors

| Section | Components | Data |
|---------|-----------|------|
| Page Header | Pill badge + title | Static |
| Instructor Grid | `InstructorCard` components | Context/DB |
| Recruitment Banner | CTA to become an instructor | Static |

**Primary CTAs:** Apply as Instructor

---

### 9. Apply as Instructor (`/apply`)

**Layout:** PublicLayout
**Auth:** None
**Title:** Become an Instructor

| Section | Components | Data |
|---------|-----------|------|
| Hero | Title + subtitle | Static |
| Requirements | Checklist/bullet points | Static |
| Benefits | Card grid | Static |
| FAQ | Accordion | Static |
| Application Form | Multi-field form with file upload | `instructorAppsService.create()` |

**Form fields:** firstName, lastName, email, phone, primaryInstrument, secondaryInstruments, yearsExperience, qualifications, bio, CV upload, certificates upload

**Primary CTAs:** Submit Application

---

### 10. Contact (`/contact`)

**Layout:** PublicLayout
**Auth:** None
**Title:** Contact Us

| Section | Components | Data |
|---------|-----------|------|
| Contact Info Card | Address, phone, email, hours, WhatsApp button, Consultation CTA | Static |
| Google Map | Embedded Google Maps iframe | Static embed URL |
| Contact Form | Name, email, subject, message | Save to Supabase or email |
| Social Links | Social media icons | Static |

**Primary CTAs:** WhatsApp, Book Consultation

---

### 11. Book Consultation (`/consultation`)

**Layout:** PublicLayout
**Auth:** None
**Title:** Book Consultation

4-step wizard using `MultiStepForm`:

| Step | Fields | Validation |
|------|--------|-----------|
| 1. Personal Info | firstName, lastName, email, phone | Required, email format |
| 2. Purpose | consultationType (radio: music lessons, exams, consultancy, general) | Required |
| 3. Details | programmeId (optional dropdown), preferredDate, notes | consultationType required |
| 4. Confirmation | Summary of entered data, submit button | — |

**Data:** `consultationsService.create()`

**Primary CTAs:** Submit Consultation

---

### 12. Login (`/auth/login`)

**Layout:** None (full page)
**Auth:** Redirects if already logged in
**Title:** Login

| Section | Components |
|---------|-----------|
| Logo + Brand | MelodyAcademy logo |
| Login Form | Email, password, Login button, Forgot Password link |
| Sign Up Link | "Don't have an account? Sign up" |
| Demo Buttons | Quick login as Visitor / Learner / Admin (for demo) |

**Data:** `authService.signIn()`

---

### 13. Sign Up (`/auth/signup`)

**Layout:** None (full page)
**Auth:** Redirects if already logged in
**Title:** Sign Up

| Section | Components |
|---------|-----------|
| Logo + Brand | MelodyAcademy logo |
| Sign Up Form | firstName, lastName, email, password, confirmPassword, Sign Up button |
| Login Link | "Already have an account? Log in" |

**Data:** `authService.signUp()`

---

### 14. Forgot Password (`/auth/forgot-password`)

**Layout:** None (full page)
**Auth:** None
**Title:** Forgot Password

| Section | Components |
|---------|-----------|
| Logo + Brand | MelodyAcademy logo |
| Form | Email input, Send Reset Link button |
| Success State | "Check your email" confirmation |
| Back to Login | Link |

**Data:** `authService.resetPassword()`

---

### 15-20. Learner Pages

All under `/learn/*`, use `LearnLayout` (sidebar + content), require auth + `learner` role.

| Route | Page | Key Sections | Data |
|-------|------|-------------|------|
| `/learn` | Dashboard | Programme card, progress bar, latest lesson note, pending assignments, announcements sidebar | Learner data, notes, assignments, announcements |
| `/learn/notes` | Lesson Notes | Programme selector, accordion list of notes | `lessonNotesService.getAll()` filtered by learner |
| `/learn/assignments` | Assignments | Card grid of assignments (pending/submitted/reviewed) | `assignmentsService.getAll()` filtered by learner |
| `/learn/resources` | Resources | Grid of resource cards with download buttons | `resourcesService.getAll()` for learner's programme |
| `/learn/certificates` | Certificates | Certificate cards with print/download | `certificatesService.getAll()` for learner |
| `/learn/profile` | Profile | View/edit personal info, change password | `usersService.update()`, `auth.updateUser()` |

---

### 21-32. Admin Pages

All under `/admin/*`, use `AdminLayout` (sidebar + content), require auth + `admin` role.

| Route | Page | Key Sections | Data |
|-------|------|-------------|------|
| `/admin` | Dashboard | KPI stat cards (5), recent consultations table, recent activity feed | All services aggregate |
| `/admin/programmes` | Programme Mgmt | Table + create/edit form, image upload | `programmesService` |
| `/admin/learners` | Learner Mgmt | Learner table, post notes, assign homework, issue certs | `learnersService`, `lessonNotesService`, etc. |
| `/admin/instructors` | Instructor Mgmt | Application cards with review/shortlist/approve/reject | `instructorAppsService` |
| `/admin/bookings` | Bookings Mgmt | Individual/Corporate toggle — consultation table + consultancy request table with status workflows | `consultationsService`, `consultancyRequestsService` |
| `/admin/exams` | Exam Mgmt | Table with candidate, type, level, status | `examRegistrationsService` |
| `/admin/instruments` | Instrument Mgmt | Grid/table with CRUD, image upload | `instrumentsService` |
| `/admin/lms` | LMS Management | Lesson notes, assignments, resources per programme | Multiple services |
| `/admin/content` | Website CMS | Edit hero, testimonials, FAQs, sections | Static or Supabase |
| `/admin/reports` | Reports | Charts: consultations, programme interest, exams, applications | Aggregate queries |
| `/admin/settings` | Settings | WhatsApp number, academy info | Config state |
