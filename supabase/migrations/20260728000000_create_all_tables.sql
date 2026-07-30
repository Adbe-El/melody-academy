-- ============================================================
-- Master Migration: Create all tables, RLS, indexes, seeds
-- Music Academy & Services Platform
-- ============================================================

-- Helper: auto-update updated_at
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$;

-- Helper: auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- 1. users
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name  text NOT NULL,
  last_name   text NOT NULL,
  email       text NOT NULL,
  phone       text,
  role        text NOT NULL DEFAULT 'learner' CHECK (role IN ('admin', 'learner')),
  status      text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  avatar_url  text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users (role);

CREATE TRIGGER set_users_updated_at
  BEFORE UPDATE ON users FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON users FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can read all users"
  ON users FOR SELECT USING (
    public.is_admin()
  );

CREATE POLICY "Admins can insert users"
  ON users FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update users"
  ON users FOR UPDATE USING (public.is_admin());

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE USING (auth.uid() = id);

-- ============================================================
-- 2. programmes
-- ============================================================
CREATE TABLE IF NOT EXISTS programmes (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title                 text NOT NULL,
  category              text NOT NULL CHECK (category IN ('Keyboard','Guitar','Vocals','Drums','Production','Strings','Theory','Exam Prep')),
  description           text NOT NULL,
  duration              text NOT NULL,
  level                 text NOT NULL DEFAULT 'All Levels' CHECK (level IN ('Beginner','Intermediate','Advanced','All Levels')),
  age_group             text NOT NULL DEFAULT 'All Ages' CHECK (age_group IN ('Kids (5-12)','Teens (13-17)','Adults (18+)','All Ages')),
  image_url             text,
  syllabus_highlights   jsonb DEFAULT '[]'::jsonb,
  featured              boolean NOT NULL DEFAULT false,
  status                text NOT NULL DEFAULT 'active' CHECK (status IN ('active','archived','draft')),
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_programmes_category ON programmes (category);
CREATE INDEX IF NOT EXISTS idx_programmes_status ON programmes (status);
CREATE INDEX IF NOT EXISTS idx_programmes_featured ON programmes (featured) WHERE featured = true;

CREATE TRIGGER set_programmes_updated_at
  BEFORE UPDATE ON programmes FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

ALTER TABLE programmes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active programmes"
  ON programmes FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can view all programmes"
  ON programmes FOR SELECT USING (
    public.is_admin()
  );

CREATE POLICY "Admins can insert programmes"
  ON programmes FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update programmes"
  ON programmes FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can delete programmes"
  ON programmes FOR DELETE USING (public.is_admin());

-- ============================================================
-- 3. learners
-- ============================================================
CREATE TABLE IF NOT EXISTS learners (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  programme_id         uuid NOT NULL REFERENCES programmes(id),
  enrolment_date       date NOT NULL DEFAULT CURRENT_DATE,
  progress             integer NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  certificate_status   text NOT NULL DEFAULT 'not_eligible' CHECK (certificate_status IN ('not_eligible','eligible','issued')),
  created_at           timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_learners_user_id ON learners (user_id);
CREATE INDEX IF NOT EXISTS idx_learners_programme_id ON learners (programme_id);

ALTER TABLE learners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Learners can read own record"
  ON learners FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE users.id = learners.user_id AND users.id = auth.uid())
  );

CREATE POLICY "Admins can read all learners"
  ON learners FOR SELECT USING (
    public.is_admin()
  );

CREATE POLICY "Admins can insert learners"
  ON learners FOR INSERT WITH CHECK (
    public.is_admin()
  );

CREATE POLICY "Admins can update learners"
  ON learners FOR UPDATE USING (
    public.is_admin()
  );

CREATE POLICY "Admins can delete learners"
  ON learners FOR DELETE USING (
    public.is_admin()
  );

-- ============================================================
-- 4. lesson_notes
-- ============================================================
CREATE TABLE IF NOT EXISTS lesson_notes (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  programme_id    uuid NOT NULL REFERENCES programmes(id),
  learner_id      uuid REFERENCES learners(id),
  title           text NOT NULL,
  topic           text,
  content         text NOT NULL,
  practice_goals  text,
  file_url        text,
  upload_date     date NOT NULL DEFAULT CURRENT_DATE,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lesson_notes_programme_id ON lesson_notes (programme_id);
CREATE INDEX IF NOT EXISTS idx_lesson_notes_learner_id ON lesson_notes (learner_id);

ALTER TABLE lesson_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Learners can read notes for their programme"
  ON lesson_notes FOR SELECT USING (
    learner_id IS NULL OR
    EXISTS (
      SELECT 1 FROM learners
      WHERE learners.id = lesson_notes.learner_id
      AND learners.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can read all lesson notes"
  ON lesson_notes FOR SELECT USING (
    public.is_admin()
  );

CREATE POLICY "Admins can insert lesson notes"
  ON lesson_notes FOR INSERT WITH CHECK (
    public.is_admin()
  );

CREATE POLICY "Admins can update lesson notes"
  ON lesson_notes FOR UPDATE USING (
    public.is_admin()
  );

CREATE POLICY "Admins can delete lesson notes"
  ON lesson_notes FOR DELETE USING (
    public.is_admin()
  );

-- ============================================================
-- 5. assignments
-- ============================================================
CREATE TABLE IF NOT EXISTS assignments (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  programme_id    uuid NOT NULL REFERENCES programmes(id),
  learner_id      uuid NOT NULL REFERENCES learners(id),
  title           text NOT NULL,
  instructions    text,
  due_date        date NOT NULL,
  status          text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','submitted','reviewed')),
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_assignments_programme_id ON assignments (programme_id);
CREATE INDEX IF NOT EXISTS idx_assignments_learner_id ON assignments (learner_id);

ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Learners can read own assignments"
  ON assignments FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM learners
      WHERE learners.id = assignments.learner_id
      AND learners.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can read all assignments"
  ON assignments FOR SELECT USING (
    public.is_admin()
  );

CREATE POLICY "Admins can insert assignments"
  ON assignments FOR INSERT WITH CHECK (
    public.is_admin()
  );

CREATE POLICY "Learners can update status to submitted"
  ON assignments FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM learners
      WHERE learners.id = assignments.learner_id
      AND learners.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can update assignments"
  ON assignments FOR UPDATE USING (
    public.is_admin()
  );

CREATE POLICY "Admins can delete assignments"
  ON assignments FOR DELETE USING (
    public.is_admin()
  );

-- ============================================================
-- 6. assignment_submissions
-- ============================================================
CREATE TABLE IF NOT EXISTS assignment_submissions (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id    uuid NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  learner_id       uuid NOT NULL REFERENCES learners(id),
  submission_url   text NOT NULL,
  submission_text  text,
  feedback         text,
  grade            text,
  submitted_at     timestamptz NOT NULL DEFAULT now(),
  reviewed_at      timestamptz
);

CREATE INDEX IF NOT EXISTS idx_assignment_submissions_assignment_id ON assignment_submissions (assignment_id);
CREATE INDEX IF NOT EXISTS idx_assignment_submissions_learner_id ON assignment_submissions (learner_id);

ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Learners can read own submissions"
  ON assignment_submissions FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM learners
      WHERE learners.id = assignment_submissions.learner_id
      AND learners.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can read all submissions"
  ON assignment_submissions FOR SELECT USING (
    public.is_admin()
  );

CREATE POLICY "Learners can insert own submissions"
  ON assignment_submissions FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM learners
      WHERE learners.id = assignment_submissions.learner_id
      AND learners.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can update submissions"
  ON assignment_submissions FOR UPDATE USING (
    public.is_admin()
  );

-- ============================================================
-- 7. learning_resources
-- ============================================================
CREATE TABLE IF NOT EXISTS learning_resources (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  programme_id    uuid NOT NULL REFERENCES programmes(id),
  title           text NOT NULL,
  type            text NOT NULL CHECK (type IN ('pdf','audio','sheet_music')),
  file_url        text NOT NULL,
  category        text,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_learning_resources_programme_id ON learning_resources (programme_id);

ALTER TABLE learning_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Learners can read resources for their programme"
  ON learning_resources FOR SELECT USING (true);

CREATE POLICY "Admins can manage learning resources"
  ON learning_resources FOR ALL USING (
    public.is_admin()
  );

-- ============================================================
-- 8. certificates
-- ============================================================
CREATE TABLE IF NOT EXISTS certificates (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_id          uuid NOT NULL REFERENCES learners(id),
  programme_id        uuid NOT NULL REFERENCES programmes(id),
  learner_name        text NOT NULL,
  programme_title     text NOT NULL,
  issue_date          date NOT NULL DEFAULT CURRENT_DATE,
  certificate_code    text NOT NULL UNIQUE,
  certificate_url     text,
  created_at          timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_certificates_learner_id ON certificates (learner_id);
CREATE INDEX IF NOT EXISTS idx_certificates_programme_id ON certificates (programme_id);

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Learners can read own certificates"
  ON certificates FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM learners
      WHERE learners.id = certificates.learner_id
      AND learners.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can read all certificates"
  ON certificates FOR SELECT USING (
    public.is_admin()
  );

CREATE POLICY "Admins can insert certificates"
  ON certificates FOR INSERT WITH CHECK (
    public.is_admin()
  );

-- ============================================================
-- 9. consultations (hybrid model)
-- ============================================================
CREATE TABLE IF NOT EXISTS consultations (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name             text NOT NULL,
  email                 text NOT NULL,
  phone                 text NOT NULL,
  consultation_type     text NOT NULL CHECK (consultation_type IN ('music_lessons','exams','consultancy','general')),
  preferred_date        date,
  programme_id          uuid REFERENCES programmes(id),
  notes                 text,
  preferred_instrument  text,
  age_group             text,
  experience_level      text,
  goals                 text,
  status                text NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','scheduled','completed','enrolled','cancelled')),
  admin_notes           text,
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations (status);

CREATE TRIGGER set_consultations_updated_at
  BEFORE UPDATE ON consultations FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read all consultations"
  ON consultations FOR SELECT USING (
    public.is_admin()
  );

CREATE POLICY "Anyone can insert consultations"
  ON consultations FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can update consultations"
  ON consultations FOR UPDATE USING (
    public.is_admin()
  );

-- ============================================================
-- 10. instructor_applications
-- ============================================================
CREATE TABLE IF NOT EXISTS instructor_applications (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name               text NOT NULL,
  email                   text NOT NULL,
  phone                   text NOT NULL,
  primary_instrument      text NOT NULL,
  secondary_instruments   text,
  years_experience        integer NOT NULL,
  qualifications          text NOT NULL,
  bio                     text NOT NULL,
  cv_url                  text,
  certificates_urls       jsonb DEFAULT '[]'::jsonb,
  status                  text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','under_review','shortlisted','accepted','rejected')),
  admin_notes             text,
  created_at              timestamptz NOT NULL DEFAULT now(),
  updated_at              timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_instructor_applications_status ON instructor_applications (status);

CREATE TRIGGER set_instructor_applications_updated_at
  BEFORE UPDATE ON instructor_applications FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

ALTER TABLE instructor_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read all applications"
  ON instructor_applications FOR SELECT USING (
    public.is_admin()
  );

CREATE POLICY "Anyone can insert applications"
  ON instructor_applications FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can update applications"
  ON instructor_applications FOR UPDATE USING (
    public.is_admin()
  );

-- ============================================================
-- 11. exam_registrations
-- ============================================================
CREATE TABLE IF NOT EXISTS exam_registrations (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_name          text NOT NULL,
  email                 text NOT NULL,
  phone                 text,
  exam_type             text NOT NULL CHECK (exam_type IN ('practical','theory')),
  exam_board            text NOT NULL CHECK (exam_board IN ('ABRSM','Trinity','MUSON')),
  level                 text NOT NULL,
  preferred_start_date  date,
  notes                 text,
  status                text NOT NULL DEFAULT 'new' CHECK (status IN ('new','in_progress','registered','completed','cancelled')),
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_exam_registrations_status ON exam_registrations (status);

CREATE TRIGGER set_exam_registrations_updated_at
  BEFORE UPDATE ON exam_registrations FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

ALTER TABLE exam_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read all exam registrations"
  ON exam_registrations FOR SELECT USING (
    public.is_admin()
  );

CREATE POLICY "Anyone can insert exam registrations"
  ON exam_registrations FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can update exam registrations"
  ON exam_registrations FOR UPDATE USING (
    public.is_admin()
  );

-- ============================================================
-- 12. instrument_categories
-- ============================================================
CREATE TABLE IF NOT EXISTS instrument_categories (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL UNIQUE,
  slug        text NOT NULL UNIQUE,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE instrument_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view instrument categories"
  ON instrument_categories FOR SELECT USING (true);

CREATE POLICY "Admins can manage instrument categories"
  ON instrument_categories FOR ALL USING (
    public.is_admin()
  );

-- ============================================================
-- 13. instruments
-- ============================================================
CREATE TABLE IF NOT EXISTS instruments (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id       uuid NOT NULL REFERENCES instrument_categories(id),
  name              text NOT NULL,
  description       text NOT NULL,
  specifications    jsonb DEFAULT '[]'::jsonb,
  price             text NOT NULL,
  image_url         text,
  condition         text NOT NULL DEFAULT 'Brand New' CHECK (condition IN ('Brand New','Certified Pre-owned')),
  availability      boolean NOT NULL DEFAULT true,
  whatsapp_message  text,
  status            text NOT NULL DEFAULT 'active' CHECK (status IN ('active','archived','out_of_stock')),
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_instruments_category_id ON instruments (category_id);
CREATE INDEX IF NOT EXISTS idx_instruments_status ON instruments (status);

CREATE TRIGGER set_instruments_updated_at
  BEFORE UPDATE ON instruments FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

ALTER TABLE instruments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active instruments"
  ON instruments FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can view all instruments"
  ON instruments FOR SELECT USING (
    public.is_admin()
  );

CREATE POLICY "Admins can manage instruments"
  ON instruments FOR ALL USING (
    public.is_admin()
  );

-- ============================================================
-- 14. consultancy_requests
-- ============================================================
CREATE TABLE IF NOT EXISTS consultancy_requests (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_name   text NOT NULL,
  organization_type   text NOT NULL CHECK (organization_type IN ('School','Church','Choir','Corporate','Private Group')),
  contact_person      text NOT NULL,
  email               text NOT NULL,
  phone               text NOT NULL,
  service_needed      text NOT NULL,
  details             text NOT NULL,
  status              text NOT NULL DEFAULT 'new' CHECK (status IN ('new','in_discussion','completed','cancelled')),
  admin_notes         text,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_consultancy_requests_status ON consultancy_requests (status);

CREATE TRIGGER set_consultancy_requests_updated_at
  BEFORE UPDATE ON consultancy_requests FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

ALTER TABLE consultancy_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read all consultancy requests"
  ON consultancy_requests FOR SELECT USING (
    public.is_admin()
  );

CREATE POLICY "Anyone can insert consultancy requests"
  ON consultancy_requests FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can update consultancy requests"
  ON consultancy_requests FOR UPDATE USING (
    public.is_admin()
  );

-- ============================================================
-- 15. announcements
-- ============================================================
CREATE TABLE IF NOT EXISTS announcements (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title           text NOT NULL,
  message         text NOT NULL,
  programme_id    uuid REFERENCES programmes(id),
  important       boolean NOT NULL DEFAULT false,
  publish_date    date NOT NULL DEFAULT CURRENT_DATE,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_announcements_publish_date ON announcements (publish_date DESC);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Learners can read published announcements"
  ON announcements FOR SELECT USING (
    programme_id IS NULL OR
    EXISTS (
      SELECT 1 FROM learners
      WHERE learners.programme_id = announcements.programme_id
      AND learners.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can read all announcements"
  ON announcements FOR SELECT USING (
    public.is_admin()
  );

CREATE POLICY "Admins can insert announcements"
  ON announcements FOR INSERT WITH CHECK (
    public.is_admin()
  );

CREATE POLICY "Admins can update announcements"
  ON announcements FOR UPDATE USING (
    public.is_admin()
  );

CREATE POLICY "Admins can delete announcements"
  ON announcements FOR DELETE USING (
    public.is_admin()
  );

-- ============================================================
-- 16. website_content
-- ============================================================
CREATE TABLE IF NOT EXISTS website_content (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section     text NOT NULL CHECK (section IN ('hero','testimonial','faq','partner','stat','cta')),
  title       text NOT NULL,
  content     text NOT NULL,
  image_url   text,
  active      boolean NOT NULL DEFAULT true,
  "order"     integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_website_content_section ON website_content (section);
CREATE INDEX IF NOT EXISTS idx_website_content_active ON website_content (active) WHERE active = true;

CREATE TRIGGER set_website_content_updated_at
  BEFORE UPDATE ON website_content FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active website content"
  ON website_content FOR SELECT USING (active = true);

CREATE POLICY "Admins can view all website content"
  ON website_content FOR SELECT USING (
    public.is_admin()
  );

CREATE POLICY "Admins can insert website content"
  ON website_content FOR INSERT WITH CHECK (
    public.is_admin()
  );

CREATE POLICY "Admins can update website content"
  ON website_content FOR UPDATE USING (
    public.is_admin()
  );

CREATE POLICY "Admins can delete website content"
  ON website_content FOR DELETE USING (
    public.is_admin()
  );

-- ============================================================
-- 17. settings
-- ============================================================
CREATE TABLE IF NOT EXISTS settings (
  id              text PRIMARY KEY DEFAULT 'academy',
  whatsapp_number text NOT NULL DEFAULT '',
  academy_name    text NOT NULL DEFAULT 'Matt-Agba Music Consult',
  academy_email   text NOT NULL DEFAULT '',
  academy_phone   text NOT NULL DEFAULT '',
  address         text NOT NULL DEFAULT '',
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER set_settings_updated_at
  BEFORE UPDATE ON settings FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view settings"
  ON settings FOR SELECT USING (true);

CREATE POLICY "Admins can update settings"
  ON settings FOR UPDATE USING (
    public.is_admin()
  );

CREATE POLICY "Admins can insert settings"
  ON settings FOR INSERT WITH CHECK (
    public.is_admin()
  );

-- ============================================================
-- SEED DATA
-- ============================================================

-- Instrument categories
INSERT INTO instrument_categories (name, slug) VALUES
  ('Keyboard', 'keyboard'),
  ('Guitar', 'guitar'),
  ('Strings', 'strings'),
  ('Drums & Percussion', 'drums-percussion'),
  ('Wind', 'wind'),
  ('Accessories', 'accessories')
ON CONFLICT (name) DO NOTHING;

-- Default settings
INSERT INTO settings (id, academy_name) VALUES
  ('academy', 'Matt-Agba Music Consult')
ON CONFLICT (id) DO NOTHING;

-- Default website content
INSERT INTO website_content (section, title, content, active, "order") VALUES
  ('hero', 'Welcome to Matt-Agba Music Consult', 'Transform your musical journey with expert guidance from certified professionals.', true, 1),
  ('testimonial', 'Great Experience', 'The instructors are amazing and the curriculum is well structured. My child has grown tremendously.', true, 1),
  ('faq', 'Do I need prior experience?', 'No prior experience is needed for beginner programmes. We welcome learners of all levels.', true, 1)
ON CONFLICT DO NOTHING;
