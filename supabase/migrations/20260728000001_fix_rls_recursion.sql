-- ============================================================
-- Migration: Fix RLS infinite recursion across all tables
-- Run this in Supabase SQL Editor AFTER the main migration
-- ============================================================

-- Create a security definer function that bypasses RLS
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

-- 1. USERS
DROP POLICY IF EXISTS "Admins can read all users" ON users;
DROP POLICY IF EXISTS "Admins can insert users" ON users;
DROP POLICY IF EXISTS "Admins can update users" ON users;

CREATE POLICY "Admins can read all users" ON users FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert users" ON users FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update users" ON users FOR UPDATE USING (public.is_admin());

-- 2. PROGRAMMES
DROP POLICY IF EXISTS "Admins can view all programmes" ON programmes;
DROP POLICY IF EXISTS "Admins can insert programmes" ON programmes;
DROP POLICY IF EXISTS "Admins can update programmes" ON programmes;
DROP POLICY IF EXISTS "Admins can delete programmes" ON programmes;

CREATE POLICY "Admins can view all programmes" ON programmes FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert programmes" ON programmes FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update programmes" ON programmes FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete programmes" ON programmes FOR DELETE USING (public.is_admin());

-- 3. LEARNERS
DROP POLICY IF EXISTS "Admins can read all learners" ON learners;
DROP POLICY IF EXISTS "Admins can insert learners" ON learners;
DROP POLICY IF EXISTS "Admins can update learners" ON learners;
DROP POLICY IF EXISTS "Admins can delete learners" ON learners;

CREATE POLICY "Admins can read all learners" ON learners FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert learners" ON learners FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update learners" ON learners FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete learners" ON learners FOR DELETE USING (public.is_admin());

-- 4. LESSON_NOTES
DROP POLICY IF EXISTS "Admins can read all lesson notes" ON lesson_notes;
DROP POLICY IF EXISTS "Admins can insert lesson notes" ON lesson_notes;
DROP POLICY IF EXISTS "Admins can update lesson notes" ON lesson_notes;
DROP POLICY IF EXISTS "Admins can delete lesson notes" ON lesson_notes;

CREATE POLICY "Admins can read all lesson notes" ON lesson_notes FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert lesson notes" ON lesson_notes FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update lesson notes" ON lesson_notes FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete lesson notes" ON lesson_notes FOR DELETE USING (public.is_admin());

-- 5. ASSIGNMENTS
DROP POLICY IF EXISTS "Admins can read all assignments" ON assignments;
DROP POLICY IF EXISTS "Admins can insert assignments" ON assignments;
DROP POLICY IF EXISTS "Admins can update assignments" ON assignments;
DROP POLICY IF EXISTS "Admins can delete assignments" ON assignments;

CREATE POLICY "Admins can read all assignments" ON assignments FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert assignments" ON assignments FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update assignments" ON assignments FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete assignments" ON assignments FOR DELETE USING (public.is_admin());

-- 6. ASSIGNMENT_SUBMISSIONS
DROP POLICY IF EXISTS "Admins can read all submissions" ON assignment_submissions;
DROP POLICY IF EXISTS "Admins can update submissions" ON assignment_submissions;

CREATE POLICY "Admins can read all submissions" ON assignment_submissions FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can update submissions" ON assignment_submissions FOR UPDATE USING (public.is_admin());

-- 7. LEARNING_RESOURCES
DROP POLICY IF EXISTS "Admins can manage learning resources" ON learning_resources;
CREATE POLICY "Admins can manage learning resources" ON learning_resources FOR ALL USING (public.is_admin());

-- 8. CERTIFICATES
DROP POLICY IF EXISTS "Admins can read all certificates" ON certificates;
DROP POLICY IF EXISTS "Admins can insert certificates" ON certificates;

CREATE POLICY "Admins can read all certificates" ON certificates FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert certificates" ON certificates FOR INSERT WITH CHECK (public.is_admin());

-- 9. CONSULTATIONS
DROP POLICY IF EXISTS "Admins can read all consultations" ON consultations;
DROP POLICY IF EXISTS "Admins can update consultations" ON consultations;

CREATE POLICY "Admins can read all consultations" ON consultations FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can update consultations" ON consultations FOR UPDATE USING (public.is_admin());

-- 10. INSTRUCTOR_APPLICATIONS
DROP POLICY IF EXISTS "Admins can read all applications" ON instructor_applications;
DROP POLICY IF EXISTS "Admins can update applications" ON instructor_applications;

CREATE POLICY "Admins can read all applications" ON instructor_applications FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can update applications" ON instructor_applications FOR UPDATE USING (public.is_admin());

-- 11. EXAM_REGISTRATIONS
DROP POLICY IF EXISTS "Admins can read all exam registrations" ON exam_registrations;
DROP POLICY IF EXISTS "Admins can update exam registrations" ON exam_registrations;

CREATE POLICY "Admins can read all exam registrations" ON exam_registrations FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can update exam registrations" ON exam_registrations FOR UPDATE USING (public.is_admin());

-- 12. INSTRUMENT_CATEGORIES
DROP POLICY IF EXISTS "Admins can manage instrument categories" ON instrument_categories;
CREATE POLICY "Admins can manage instrument categories" ON instrument_categories FOR ALL USING (public.is_admin());

-- 13. INSTRUMENTS
DROP POLICY IF EXISTS "Admins can view all instruments" ON instruments;
DROP POLICY IF EXISTS "Admins can manage instruments" ON instruments;

CREATE POLICY "Admins can view all instruments" ON instruments FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can manage instruments" ON instruments FOR ALL USING (public.is_admin());

-- 14. CONSULTANCY_REQUESTS
DROP POLICY IF EXISTS "Admins can read all consultancy requests" ON consultancy_requests;
DROP POLICY IF EXISTS "Admins can update consultancy requests" ON consultancy_requests;

CREATE POLICY "Admins can read all consultancy requests" ON consultancy_requests FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can update consultancy requests" ON consultancy_requests FOR UPDATE USING (public.is_admin());

-- 15. ANNOUNCEMENTS
DROP POLICY IF EXISTS "Admins can read all announcements" ON announcements;
DROP POLICY IF EXISTS "Admins can insert announcements" ON announcements;
DROP POLICY IF EXISTS "Admins can update announcements" ON announcements;
DROP POLICY IF EXISTS "Admins can delete announcements" ON announcements;

CREATE POLICY "Admins can read all announcements" ON announcements FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert announcements" ON announcements FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update announcements" ON announcements FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete announcements" ON announcements FOR DELETE USING (public.is_admin());

-- 16. WEBSITE_CONTENT
DROP POLICY IF EXISTS "Admins can view all website content" ON website_content;
DROP POLICY IF EXISTS "Admins can insert website content" ON website_content;
DROP POLICY IF EXISTS "Admins can update website content" ON website_content;
DROP POLICY IF EXISTS "Admins can delete website content" ON website_content;

CREATE POLICY "Admins can view all website content" ON website_content FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert website content" ON website_content FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update website content" ON website_content FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete website content" ON website_content FOR DELETE USING (public.is_admin());

-- 17. SETTINGS
DROP POLICY IF EXISTS "Admins can update settings" ON settings;
DROP POLICY IF EXISTS "Admins can insert settings" ON settings;

CREATE POLICY "Admins can update settings" ON settings FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can insert settings" ON settings FOR INSERT WITH CHECK (public.is_admin());
