# Data Model

## Matt-Agba Music Consult

---

## Entity Relationship Overview

```
Users
│
├── Learners
├── Admins
└── Instructor Applicants

Programmes
│
├── Lesson Notes
├── Assignments
│   └── Assignment Submissions
├── Learning Resources
├── Certificates
└── Learners (enrolment)

Consultations

Instructor Applications

Professional Exam Registrations

Instrument Categories
│
└── Instruments

Consultancy Requests

Announcements
```

---

## Tables

### 1. users

Stores every authenticated user.

| Column | Type | Nullable | Default | Reference |
|--------|------|----------|---------|-----------|
| `id` | `uuid` | NOT NULL | `auth.uid()` | → `auth.users.id` |
| `first_name` | `text` | NOT NULL | | |
| `last_name` | `text` | NOT NULL | | |
| `email` | `text` | NOT NULL | | |
| `phone` | `text` | YES | | |
| `role` | `text` | NOT NULL | `'learner'` | CHECK: `'admin'` or `'learner'` |
| `status` | `text` | NOT NULL | `'active'` | CHECK: `'active'`, `'inactive'`, `'suspended'` |
| `avatar_url` | `text` | YES | | |
| `created_at` | `timestamptz` | NOT NULL | `now()` | |
| `updated_at` | `timestamptz` | NOT NULL | `now()` | |

---

### 2. learners

Stores learner-specific information linked to a user and programme.

| Column | Type | Nullable | Default | Reference |
|--------|------|----------|---------|-----------|
| `id` | `uuid` | NOT NULL | `gen_random_uuid()` | |
| `user_id` | `uuid` | NOT NULL | | → `users.id` |
| `programme_id` | `uuid` | NOT NULL | | → `programmes.id` |
| `enrolment_date` | `date` | NOT NULL | `CURRENT_DATE` | |
| `progress` | `integer` | NOT NULL | `0` | CHECK: 0-100 |
| `certificate_status` | `text` | NOT NULL | `'not_eligible'` | CHECK: `'not_eligible'`, `'eligible'`, `'issued'` |
| `created_at` | `timestamptz` | NOT NULL | `now()` | |

---

### 3. programmes

Stores all music programmes.

| Column | Type | Nullable | Default | Reference |
|--------|------|----------|---------|-----------|
| `id` | `uuid` | NOT NULL | `gen_random_uuid()` | |
| `title` | `text` | NOT NULL | | |
| `category` | `text` | NOT NULL | | CHECK: `'Keyboard'`, `'Guitar'`, `'Vocals'`, `'Drums'`, `'Production'`, `'Strings'`, `'Theory'`, `'Exam Prep'` |
| `description` | `text` | NOT NULL | | |
| `duration` | `text` | NOT NULL | | |
| `level` | `text` | NOT NULL | `'All Levels'` | CHECK: `'Beginner'`, `'Intermediate'`, `'Advanced'`, `'All Levels'` |
| `age_group` | `text` | NOT NULL | `'All Ages'` | CHECK: `'Kids (5-12)'`, `'Teens (13-17)'`, `'Adults (18+)'`, `'All Ages'` |
| `image_url` | `text` | YES | | |
| `syllabus_highlights` | `jsonb` | YES | `'[]'` | Array of strings |
| `featured` | `boolean` | NOT NULL | `false` | |
| `status` | `text` | NOT NULL | `'active'` | CHECK: `'active'`, `'archived'`, `'draft'` |
| `created_at` | `timestamptz` | NOT NULL | `now()` | |
| `updated_at` | `timestamptz` | NOT NULL | `now()` | |

---

### 4. lesson_notes

Learning materials posted by admins/tutors for learners.

| Column | Type | Nullable | Default | Reference |
|--------|------|----------|---------|-----------|
| `id` | `uuid` | NOT NULL | `gen_random_uuid()` | |
| `programme_id` | `uuid` | NOT NULL | | → `programmes.id` |
| `learner_id` | `uuid` | YES | | → `learners.id` (NULL = for all in programme) |
| `title` | `text` | NOT NULL | | |
| `topic` | `text` | YES | | |
| `content` | `text` | NOT NULL | | |
| `practice_goals` | `text` | YES | | |
| `file_url` | `text` | YES | | |
| `upload_date` | `date` | NOT NULL | `CURRENT_DATE` | |
| `created_at` | `timestamptz` | NOT NULL | `now()` | |

---

### 5. assignments

Practice exercises assigned to learners.

| Column | Type | Nullable | Default | Reference |
|--------|------|----------|---------|-----------|
| `id` | `uuid` | NOT NULL | `gen_random_uuid()` | |
| `programme_id` | `uuid` | NOT NULL | | → `programmes.id` |
| `learner_id` | `uuid` | NOT NULL | | → `learners.id` |
| `title` | `text` | NOT NULL | | |
| `instructions` | `text` | YES | | |
| `due_date` | `date` | NOT NULL | | |
| `status` | `text` | NOT NULL | `'pending'` | CHECK: `'pending'`, `'submitted'`, `'reviewed'` |
| `created_at` | `timestamptz` | NOT NULL | `now()` | |

---

### 6. assignment_submissions

Stores learner submissions for assignments.

| Column | Type | Nullable | Default | Reference |
|--------|------|----------|---------|-----------|
| `id` | `uuid` | NOT NULL | `gen_random_uuid()` | |
| `assignment_id` | `uuid` | NOT NULL | | → `assignments.id` |
| `learner_id` | `uuid` | NOT NULL | | → `learners.id` |
| `submission_url` | `text` | NOT NULL | | |
| `submission_text` | `text` | YES | | |
| `feedback` | `text` | YES | | |
| `grade` | `text` | YES | | |
| `submitted_at` | `timestamptz` | NOT NULL | `now()` | |
| `reviewed_at` | `timestamptz` | YES | | |

---

### 7. learning_resources

Extra PDFs, audio files and supporting resources.

| Column | Type | Nullable | Default | Reference |
|--------|------|----------|---------|-----------|
| `id` | `uuid` | NOT NULL | `gen_random_uuid()` | |
| `programme_id` | `uuid` | NOT NULL | | → `programmes.id` |
| `title` | `text` | NOT NULL | | |
| `type` | `text` | NOT NULL | | CHECK: `'pdf'`, `'audio'`, `'sheet_music'` |
| `file_url` | `text` | NOT NULL | | |
| `category` | `text` | YES | | |
| `created_at` | `timestamptz` | NOT NULL | `now()` | |

---

### 8. certificates

Programme completion records.

| Column | Type | Nullable | Default | Reference |
|--------|------|----------|---------|-----------|
| `id` | `uuid` | NOT NULL | `gen_random_uuid()` | |
| `learner_id` | `uuid` | NOT NULL | | → `learners.id` |
| `programme_id` | `uuid` | NOT NULL | | → `programmes.id` |
| `learner_name` | `text` | NOT NULL | | |
| `programme_title` | `text` | NOT NULL | | |
| `issue_date` | `date` | NOT NULL | `CURRENT_DATE` | |
| `certificate_code` | `text` | NOT NULL | | UNIQUE |
| `certificate_url` | `text` | YES | | |
| `created_at` | `timestamptz` | NOT NULL | `now()` | |

---

### 9. consultations

Stores consultation bookings from visitors (hybrid model: DATA_MODEL.md base + lesson-specific fields).

| Column | Type | Nullable | Default | Reference |
|--------|------|----------|---------|-----------|
| `id` | `uuid` | NOT NULL | `gen_random_uuid()` | |
| `full_name` | `text` | NOT NULL | | |
| `email` | `text` | NOT NULL | | |
| `phone` | `text` | NOT NULL | | |
| `consultation_type` | `text` | NOT NULL | | CHECK: `'music_lessons'`, `'exams'`, `'consultancy'`, `'general'` |
| `preferred_date` | `date` | YES | | |
| `programme_id` | `uuid` | YES | | → `programmes.id` |
| `preferred_instrument` | `text` | YES | | e.g., `'Keyboard & Grand Piano'` |
| `age_group` | `text` | YES | | CHECK: `'Kids (5-12)'`, `'Teens (13-17)'`, `'Adults (18+)'` |
| `experience_level` | `text` | YES | | CHECK: `'Complete Beginner'`, `'Some Experience'`, `'Intermediate'`, `'Advanced'` |
| `goals` | `text` | YES | | Learner's goals/motivation |
| `notes` | `text` | YES | | |
| `status` | `text` | NOT NULL | `'new'` | CHECK: `'new'`, `'contacted'`, `'scheduled'`, `'completed'`, `'enrolled'`, `'cancelled'` |
| `admin_notes` | `text` | YES | | |
| `created_at` | `timestamptz` | NOT NULL | `now()` | |
| `updated_at` | `timestamptz` | NOT NULL | `now()` | |

---

### 10. instructor_applications

Stores instructor applications.

| Column | Type | Nullable | Default | Reference |
|--------|------|----------|---------|-----------|
| `id` | `uuid` | NOT NULL | `gen_random_uuid()` | |
| `full_name` | `text` | NOT NULL | | |
| `email` | `text` | NOT NULL | | |
| `phone` | `text` | NOT NULL | | |
| `primary_instrument` | `text` | NOT NULL | | |
| `secondary_instruments` | `text` | YES | | |
| `years_experience` | `integer` | NOT NULL | | |
| `qualifications` | `text` | NOT NULL | | |
| `bio` | `text` | NOT NULL | | |
| `cv_url` | `text` | YES | | |
| `certificates_urls` | `jsonb` | YES | `'[]'` | Array of URLs |
| `status` | `text` | NOT NULL | `'pending'` | CHECK: `'pending'`, `'under_review'`, `'shortlisted'`, `'accepted'`, `'rejected'` |
| `admin_notes` | `text` | YES | | |
| `created_at` | `timestamptz` | NOT NULL | `now()` | |
| `updated_at` | `timestamptz` | NOT NULL | `now()` | |

---

### 11. exam_registrations

Exam enquiries and registrations.

| Column | Type | Nullable | Default | Reference |
|--------|------|----------|---------|-----------|
| `id` | `uuid` | NOT NULL | `gen_random_uuid()` | |
| `learner_name` | `text` | NOT NULL | | |
| `email` | `text` | NOT NULL | | |
| `phone` | `text` | YES | | |
| `exam_type` | `text` | NOT NULL | | CHECK: `'practical'`, `'theory'` |
| `exam_board` | `text` | NOT NULL | | CHECK: `'ABRSM'`, `'Trinity'`, `'MUSON'` |
| `level` | `text` | NOT NULL | | |
| `preferred_start_date` | `date` | YES | | |
| `notes` | `text` | YES | | |
| `status` | `text` | NOT NULL | `'new'` | CHECK: `'new'`, `'in_progress'`, `'registered'`, `'completed'`, `'cancelled'` |
| `created_at` | `timestamptz` | NOT NULL | `now()` | |
| `updated_at` | `timestamptz` | NOT NULL | `now()` | |

---

### 12. instrument_categories

Groups instruments.

| Column | Type | Nullable | Default | Reference |
|--------|------|----------|---------|-----------|
| `id` | `uuid` | NOT NULL | `gen_random_uuid()` | |
| `name` | `text` | NOT NULL | | UNIQUE |
| `slug` | `text` | NOT NULL | | UNIQUE |
| `created_at` | `timestamptz` | NOT NULL | `now()` | |

---

### 13. instruments

Instrument catalogue.

| Column | Type | Nullable | Default | Reference |
|--------|------|----------|---------|-----------|
| `id` | `uuid` | NOT NULL | `gen_random_uuid()` | |
| `category_id` | `uuid` | NOT NULL | | → `instrument_categories.id` |
| `name` | `text` | NOT NULL | | |
| `description` | `text` | NOT NULL | | |
| `specifications` | `jsonb` | YES | `'[]'` | Array of strings |
| `price` | `text` | NOT NULL | | e.g., "$799 / ₦650,000" |
| `image_url` | `text` | YES | | |
| `condition` | `text` | NOT NULL | `'Brand New'` | CHECK: `'Brand New'`, `'Certified Pre-owned'` |
| `availability` | `boolean` | NOT NULL | `true` | |
| `whatsapp_message` | `text` | YES | | Pre-filled message |
| `status` | `text` | NOT NULL | `'active'` | CHECK: `'active'`, `'archived'`, `'out_of_stock'` |
| `created_at` | `timestamptz` | NOT NULL | `now()` | |
| `updated_at` | `timestamptz` | NOT NULL | `now()` | |

---

### 14. consultancy_requests

Stores consultancy enquiries from organizations.

| Column | Type | Nullable | Default | Reference |
|--------|------|----------|---------|-----------|
| `id` | `uuid` | NOT NULL | `gen_random_uuid()` | |
| `organization_name` | `text` | NOT NULL | | |
| `organization_type` | `text` | NOT NULL | | CHECK: `'School'`, `'Church'`, `'Choir'`, `'Corporate'`, `'Private Group'` |
| `contact_person` | `text` | NOT NULL | | |
| `email` | `text` | NOT NULL | | |
| `phone` | `text` | NOT NULL | | |
| `service_needed` | `text` | NOT NULL | | |
| `details` | `text` | NOT NULL | | |
| `status` | `text` | NOT NULL | `'new'` | CHECK: `'new'`, `'in_discussion'`, `'completed'`, `'cancelled'` |
| `admin_notes` | `text` | YES | | |
| `created_at` | `timestamptz` | NOT NULL | `now()` | |
| `updated_at` | `timestamptz` | NOT NULL | `now()` | |

---

### 15. announcements

Messages shown to enrolled learners.

| Column | Type | Nullable | Default | Reference |
|--------|------|----------|---------|-----------|
| `id` | `uuid` | NOT NULL | `gen_random_uuid()` | |
| `title` | `text` | NOT NULL | | |
| `message` | `text` | NOT NULL | | |
| `programme_id` | `uuid` | YES | | → `programmes.id` (NULL = all learners) |
| `important` | `boolean` | NOT NULL | `false` | |
| `publish_date` | `date` | NOT NULL | `CURRENT_DATE` | |
| `created_at` | `timestamptz` | NOT NULL | `now()` | |

---

### 16. website_content

CMS content for hero banners, testimonials, FAQs, and other homepage sections.

| Column | Type | Nullable | Default | Reference |
|--------|------|----------|---------|-----------|
| `id` | `uuid` | NOT NULL | `gen_random_uuid()` | |
| `section` | `text` | NOT NULL | | CHECK: `'hero'`, `'testimonial'`, `'faq'`, `'partner'`, `'stat'`, `'cta'` |
| `title` | `text` | NOT NULL | | |
| `content` | `text` | NOT NULL | | |
| `image_url` | `text` | YES | | |
| `active` | `boolean` | NOT NULL | `true` | |
| `order` | `integer` | NOT NULL | `0` | |
| `created_at` | `timestamptz` | NOT NULL | `now()` | |
| `updated_at` | `timestamptz` | NOT NULL | `now()` | |

---

### 17. settings

Single-row academy configuration (WhatsApp number, name, contact info).

| Column | Type | Nullable | Default | Reference |
|--------|------|----------|---------|-----------|
| `id` | `text` | NOT NULL | `'academy'` | PK (always `'academy'`) |
| `whatsapp_number` | `text` | NOT NULL | `''` | |
| `academy_name` | `text` | NOT NULL | `'Matt-Agba Music Consult'` | |
| `academy_email` | `text` | NOT NULL | `''` | |
| `academy_phone` | `text` | NOT NULL | `''` | |
| `address` | `text` | NOT NULL | `''` | |
| `updated_at` | `timestamptz` | NOT NULL | `now()` | |

---

## Row Level Security (RLS) Policies

### users
- **SELECT:** Users can read their own profile. Admins can read all.
- **UPDATE:** Users can update their own profile. Admins can update any.

### learners
- **SELECT:** Learners can read their own record. Admins can read all.
- **INSERT:** Admins only.
- **UPDATE:** Admins only.

### programmes
- **SELECT:** Public (everyone).
- **INSERT/UPDATE/DELETE:** Admins only.

### lesson_notes
- **SELECT:** Learners can read notes for their programme. Admins can read all.
- **INSERT/UPDATE/DELETE:** Admins only.

### assignments
- **SELECT:** Learners can read their own. Admins can read all.
- **INSERT:** Admins only.
- **UPDATE:** Learners can update status (submit). Admins can update everything.

### assignment_submissions
- **SELECT:** Learner can read their own. Admins can read all.
- **INSERT:** Learners only (for their own assignments).
- **UPDATE:** Admins only (feedback/grade).

### learning_resources
- **SELECT:** Learners can read resources for their programme. Public for featured.
- **INSERT/UPDATE/DELETE:** Admins only.

### certificates
- **SELECT:** Learner can read their own. Admins can read all.
- **INSERT:** Admins only.

### consultations
- **SELECT:** Admins only (plus the submitter via RLS bypass for confirmation).
- **INSERT:** Public (anyone can book).
- **UPDATE:** Admins only.

### instructor_applications
- **SELECT:** Admins only.
- **INSERT:** Public (anyone can apply).
- **UPDATE:** Admins only.

### exam_registrations
- **SELECT:** Admins only.
- **INSERT:** Public.
- **UPDATE:** Admins only.

### instrument_categories
- **SELECT:** Public.
- **INSERT/UPDATE/DELETE:** Admins only.

### instruments
- **SELECT:** Public.
- **INSERT/UPDATE/DELETE:** Admins only.

### consultancy_requests
- **SELECT:** Admins only.
- **INSERT:** Public.
- **UPDATE:** Admins only.

### announcements
- **SELECT:** Learners can read published announcements. Admins can read all.
- **INSERT/UPDATE/DELETE:** Admins only.

### website_content
- **SELECT:** Public can view active items. Admins can view all.
- **INSERT/UPDATE/DELETE:** Admins only.

### settings
- **SELECT:** Public (needed for WhatsApp links, contact info).
- **UPDATE/INSERT:** Admins only.

---

## Storage Buckets

| Bucket | Access | Purpose |
|--------|--------|---------|
| `lesson-notes` | Admin write, Learner read | PDFs, docs for lesson materials |
| `assignments` | Admin write, Learner read | Assignment descriptions, templates |
| `assignment-submissions` | Learner write, Admin read | Learner homework submissions |
| `resources` | Admin write, Learner read | Extra learning materials |
| `certificates` | Admin write, Learner read | Generated certificate PDFs |
| `programme-images` | Admin write, Public read | Programme cover images |
| `instrument-images` | Admin write, Public read | Instrument product images |
| `instructor-cvs` | Admin read, Public write | Instructor CV uploads |
| `website-assets` | Admin write, Public read | Hero images, logos, CMS content |

---

## Seed Data Strategy

1. **Instrument Categories:** Created via SQL INSERT (keyboard, guitar, strings, drums, wind, accessories)
2. **Settings:** Single-row `academy` record with WhatsApp number, name, contact info
3. **Website Content:** Hero banners, testimonials, FAQs, partners, stats, CTAs via SQL INSERT
4. **Admin Users:** Created via Supabase Auth Dashboard (email/password), then INSERT into `users` with `role = 'admin'`
   - `adbeelomiunu@gmail.com`
   - `mattagbamusicconsult@gmail.com`
5. **Programmes:** Migrate existing `INITIAL_PROGRAMMES` into SQL INSERT (pending)
6. **Instruments:** Migrate existing `INITIAL_INSTRUMENTS` into SQL INSERT (pending)
