# Pages

## Matt-Agba Music Consult

---

## Page Specifications

Each page lists: route, layout, auth requirement, sections with component mapping, data dependencies, and primary CTAs.

---

### 1. Landing Page (`/`)

**Layout:** PublicLayout
**Auth:** None
**Title:** Home — Matt-Agba Music Consult

| Section | Components | Data |
|---------|-----------|------|
| Hero | Pill badge ("Learn from a pianist with 25+ years"), headline ("Master the Piano…"), subtext (mentions Matthew Agba), 2 CTAs, hero image (arch mask), floating badges (One-on-One Coaching, ABRSM & Trinity) | Static |
| Explore Our Services | 6 service cards with icons (Learn Music, Find a Tutor, Buy Instruments, Exam Preparation, Consultancy, Hire Musicians) | Static |
| Marquee Logo Strip | Animated scrolling instrument names (Piano, Guitar, Violin, etc.) | Static |
| Popular Categories | 5 image cards (Keyboard, Guitar, Vocals, Drums, Production) | Static |
| How It Works | 4-step numbered cards (Choose, Connect with Matthew, Learn & Grow, Excel) | Static |
| Featured Instruments Preview | 4 instrument cards with image, name, price, condition | `instruments.slice(0, 4)` |
| Testimonials & Stats | 3 testimonial cards on dark background + 4 stat counters (25+ Years, 100+ Mentored, ABRSM/Trinity/MUSON Certified, Global reach) | Static |
| Final CTA | Full-width banner ("Ready to Begin Your Piano Journey?") with consultation button | Static |

**Primary CTAs:** Start Learning, Explore Services, Book Free Consultation

---

### 2. About (`/about`)

**Layout:** PublicLayout
**Auth:** None
**Title:** About Matthew Agba

| Section | Components | Data |
|---------|-----------|------|
| Hero | Pill badge ("About Matthew Agba"), headline ("A Life Dedicated to the Piano"), biography subtext, 2 CTAs, hero image (arch mask), floating badges (25+ Years, Global Reach) | Static |
| Biography | Two-column: story text + certifications checklist (ABRSM, MUSON, ISoM, Trinity) | Static |
| Global Affiliations | 3 card grid (Fox Music School London, Global Conservatory, ISoM London West African Representative) | Static |
| Charity Work | 2 card grid on green bg (Art Sphere Inc. USA, Art to Heart Foundation Canada) | Static |
| Teaching Philosophy | Quote block with Matthew Agba signature | Static |
| Final CTA | Full-width sage banner ("Work with Matthew") with consultation button | Static |

**Primary CTAs:** Book a Consultation, Explore Courses

---

### 3. Programme Listing (`/programmes`)

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

### 4. Programme Details (`/programmes/:id`)

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

### 5. Exam Prep (`/exams`)

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

### 6. Instrument Shop (`/instruments`)

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

### 7. Instrument Details (`/instruments/:id`)

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

### 8. Consultancy (`/consultancy`)

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

### 9. Instructors (`/instructors`)

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

### 10. Apply as Instructor (`/apply`)

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

### 11. Contact (`/contact`)

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

### 12. Book Consultation (`/consultation`)

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

### 13. Login (`/auth/login`)

**Layout:** None (full page)
**Auth:** Redirects if already logged in
**Title:** Login

| Section | Components |
|---------|-----------|
| Logo + Brand | Matt-Agba Music Consult logo |
| Login Form | Email, password, Login button, Forgot Password link |
| Sign Up Link | "Don't have an account? Sign up" |
| Demo Buttons | Quick login as Visitor / Learner / Admin (for demo) |

**Data:** `authService.signIn()`

---

### 14. Sign Up (`/auth/signup`)

**Layout:** None (full page)
**Auth:** Redirects if already logged in
**Title:** Sign Up

| Section | Components |
|---------|-----------|
| Logo + Brand | Matt-Agba Music Consult logo |
| Sign Up Form | firstName, lastName, email, password, confirmPassword, Sign Up button |
| Login Link | "Already have an account? Log in" |

**Data:** `authService.signUp()`

---

### 15. Forgot Password (`/auth/forgot-password`)

**Layout:** None (full page)
**Auth:** None
**Title:** Forgot Password

| Section | Components |
|---------|-----------|
| Logo + Brand | Matt-Agba Music Consult logo |
| Form | Email input, Send Reset Link button |
| Success State | "Check your email" confirmation |
| Back to Login | Link |

**Data:** `authService.resetPassword()`

---

### 16-21. Learner Pages

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

### 22-33. Admin Pages

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
