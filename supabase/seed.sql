-- ============================================================
-- Seed Data: Programmes, Instruments, Announcements, Demo Records
-- Run this in Supabase SQL Editor AFTER the migration
-- ============================================================

-- 1. PROGRAMMES
INSERT INTO programmes (id, title, category, description, duration, level, age_group, image_url, syllabus_highlights, featured, status) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Keyboard & Grand Piano Masterclass', 'Keyboard',
   'Master classical technique, contemporary chords, sight-reading, and ear training with tailored instruction.',
   '12 Weeks', 'All Levels', 'All Ages',
   'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=800&auto=format&fit=crop',
   '["Postural & hand technique","Scales & Arpeggios (ABRSM standard)","Chording & Song Accompaniment","Performance repertoire"]'::jsonb,
   true, 'active'),

  ('a1000000-0000-0000-0000-000000000002', 'Acoustic & Electric Guitar Essentials', 'Guitar',
   'Learn fingerpicking, rhythm strumming, soloing, and music theory designed specifically for guitarists.',
   '10 Weeks', 'Beginner', 'Teens (13-17)',
   'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=800&auto=format&fit=crop',
   '["Open & Barre Chords","Rhythm & Strumming Patterns","Tablature & Notation Reading","Lead Guitar Techniques"]'::jsonb,
   true, 'active'),

  ('a1000000-0000-0000-0000-000000000003', 'Vocal Performance & Breath Control', 'Vocals',
   'Develop tone quality, vocal range, pitching precision, breath management, and stage presence.',
   '8 Weeks', 'Intermediate', 'All Ages',
   'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800&auto=format&fit=crop',
   '["Diaphragmatic Breathing","Vocal Warmups & Exercises","Vocal Health & Hygiene","Solo Repertoire Coaching"]'::jsonb,
   true, 'active'),

  ('a1000000-0000-0000-0000-000000000004', 'Drums & Rhythm Section Dynamics', 'Drums',
   'Build solid timing, groove development, limb independence, and chart reading for modern drumming.',
   '12 Weeks', 'All Levels', 'Kids (5-12)',
   'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=800&auto=format&fit=crop',
   '["Basic Rudiments & Stick Control","Pop, Rock & Gospel Grooves","Timing & Metronome Practice","Dynamic Play-alongs"]'::jsonb,
   true, 'active'),

  ('a1000000-0000-0000-0000-000000000005', 'Music Production & Audio Engineering', 'Production',
   'Learn DAW fundamentals (Logic Pro / Ableton), beatmaking, mixing techniques, and vocal recording.',
   '14 Weeks', 'Intermediate', 'Adults (18+)',
   'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop',
   '["DAW Navigation & MIDI Sequencing","EQ, Compression & FX","Vocal Tracking","Basic Mastering"]'::jsonb,
   false, 'active'),

  ('a1000000-0000-0000-0000-000000000006', 'ABRSM & Trinity Exam Prep Program', 'Exam Prep',
   'Targeted preparation for ABRSM & Trinity College London practical and theory music examinations (Grades 1 to 8).',
   'Customary Prep Cycle', 'Advanced', 'All Ages',
   'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=800&auto=format&fit=crop',
   '["Exam Repertoire Pieces","Scales & Arpeggios Testing","Aural & Sight Reading Practice","Mock Performance Assessments"]'::jsonb,
   true, 'active')
ON CONFLICT (id) DO NOTHING;

-- 2. INSTRUMENTS (using subqueries to look up category UUIDs)
INSERT INTO instruments (id, category_id, name, description, specifications, price, image_url, condition, availability, status) VALUES
  ('b1000000-0000-0000-0000-000000000001',
   (SELECT id FROM instrument_categories WHERE name = 'Keyboard' LIMIT 1),
   'Yamaha P-125 88-Key Weighted Digital Piano',
   'Authentic piano feel with Graded Hammer Standard action. Perfect for serious learners and performers.',
   '["88 Weighted Keys","Pure CF Sound Engine","Built-in Speakers","Sustain Pedal Included"]'::jsonb,
   '$799 / ₦650,000',
   'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=600&auto=format&fit=crop',
   'Brand New', true, 'active'),

  ('b1000000-0000-0000-0000-000000000002',
   (SELECT id FROM instrument_categories WHERE name = 'Guitar' LIMIT 1),
   'Fender Player Stratocaster Electric Guitar',
   'Iconic chime and classic tone with smooth playability. Inspiring instrument for all genres.',
   '["Alder Body with Gloss Finish","Player Series Single-Coil Pickups","Modern C-Shaped Neck","22 Medium Jumbo Frets"]'::jsonb,
   '$849 / ₦720,000',
   'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?q=80&w=600&auto=format&fit=crop',
   'Brand New', true, 'active'),

  ('b1000000-0000-0000-0000-000000000003',
   (SELECT id FROM instrument_categories WHERE name = 'Strings' LIMIT 1),
   'Stentor Student II Handcrafted Violin Set (4/4)',
   'Recommended by music teachers worldwide. Solid carved spruce top with padded case and bow.',
   '["Solid Carved Spruce Top","Ebony Fingerboard & Pegs","Includes Wood Bow & Case","Rosin & Bridge Included"]'::jsonb,
   '$380 / ₦320,000',
   'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?q=80&w=600&auto=format&fit=crop',
   'Certified Pre-owned', true, 'active'),

  ('b1000000-0000-0000-0000-000000000004',
   (SELECT id FROM instrument_categories WHERE name = 'Drums & Percussion' LIMIT 1),
   'Roland V-Drums TD-07KV Electronic Drum Set',
   'Quiet mesh heads, rich sound engine, and Bluetooth connectivity for home practice and recording.',
   '["All-Mesh Drum Heads","TD-07 Sound Module with 25 Kits","Bluetooth Audio Streaming","Ultra-Quiet Playback"]'::jsonb,
   '$999 / ₦880,000',
   'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=600&auto=format&fit=crop',
   'Brand New', true, 'active')
ON CONFLICT (id) DO NOTHING;

-- 3. ANNOUNCEMENTS
INSERT INTO announcements (id, title, message, important, publish_date) VALUES
  ('c1000000-0000-0000-0000-000000000001',
   'Upcoming ABRSM Practical Exam Registration Window',
   'The registration deadline for the Q4 ABRSM practical examinations is August 15. Enrolled students preparing for exams should consult their tutor.',
   true, '2026-07-20'),

  ('c1000000-0000-0000-0000-000000000002',
   'Annual Academy Summer Recital Showcase',
   'We are excited to invite all enrolled learners and families to our annual showcase concert on September 5th at the Main Auditorium.',
   false, '2026-07-15')
ON CONFLICT (id) DO NOTHING;

-- 4. CONSULTATIONS (demo records)
INSERT INTO consultations (id, full_name, email, phone, consultation_type, preferred_instrument, age_group, experience_level, goals, status, notes) VALUES
  ('d1000000-0000-0000-0000-000000000001',
   'Sarah Jenkins', 'sarah.j@example.com', '+234 803 123 4567',
   'music_lessons', 'Piano & Music Theory', 'Kids (5-12)', 'Complete Beginner',
   'Looking for structured weekly lessons for my 8-year-old son.',
   'scheduled', 'Scheduled call for Friday 2 PM.'),

  ('d1000000-0000-0000-0000-000000000002',
   'Michael Adebayo', 'm.adebayo@example.com', '+234 812 987 6543',
   'music_lessons', 'Vocal Coaching', 'Adults (18+)', 'Intermediate',
   'Wants to prepare for church solo choir auditions and increase vocal range.',
   'new', NULL)
ON CONFLICT (id) DO NOTHING;

-- 5. INSTRUCTOR APPLICATIONS (demo record)
INSERT INTO instructor_applications (id, full_name, email, phone, primary_instrument, secondary_instruments, years_experience, qualifications, bio, status) VALUES
  ('e1000000-0000-0000-0000-000000000001',
   'David Okonjo', 'david.o@example.com', '+234 802 444 5555',
   'Violin & Viola', 'Piano', 7,
   'B.Mus Music Performance (Unilag), ABRSM Grade 8 Violin',
   'Passionate classical and contemporary violinist with 7 years experience training students for ABRSM exams.',
   'under_review')
ON CONFLICT (id) DO NOTHING;

-- 6. CONSULTANCY REQUESTS (demo record)
INSERT INTO consultancy_requests (id, organization_name, organization_type, contact_person, email, phone, service_needed, details, status) VALUES
  ('f1000000-0000-0000-0000-000000000001',
   'Grace Baptist Church', 'Church', 'Pastor Daniel', 'pastor.d@example.com',
   '+234 803 999 1111', 'Worship Team Audits & Band Training',
   'Looking to train our 12-member choir and rhythm section over 4 weekends.',
   'in_discussion')
ON CONFLICT (id) DO NOTHING;

-- 7. WEBSITE CONTENT (additional entries beyond migration defaults)
INSERT INTO website_content (section, title, content, active, "order") VALUES
  ('hero', 'Welcome to Matt-Agba Music Consult', 'Transform your musical journey with expert guidance from certified professionals.', true, 1),
  ('testimonial', 'Great Experience', 'The instructors are amazing and the curriculum is well structured. My child has grown tremendously.', true, 1),
  ('faq', 'Do I need prior experience?', 'No prior experience is needed for beginner programmes. We welcome learners of all levels.', true, 1),
  ('stat', 'Students Trained', '500+', true, 1),
  ('stat', 'Certified Instructors', '15+', true, 2),
  ('stat', 'Programmes Offered', '12+', true, 3),
  ('cta', 'Ready to Start Your Musical Journey?', 'Book a free consultation and discover the perfect programme for your goals.', true, 1)
ON CONFLICT DO NOTHING;
