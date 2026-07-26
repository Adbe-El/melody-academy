import {
  Programme,
  Instrument,
  Consultation,
  InstructorApplication,
  Learner,
  LessonNote,
  Assignment,
  LMSResource,
  Certificate,
  Announcement
} from '../types';

export { supabase } from '../lib/supabase';

// --- INITIAL MOCK DATA ---
export const INITIAL_PROGRAMMES: Programme[] = [
  {
    id: 'prog-1',
    title: 'Keyboard & Grand Piano Masterclass',
    category: 'Keyboard',
    description: 'Master classical technique, contemporary chords, sight-reading, and ear training with tailored instruction.',
    level: 'All Levels',
    ageGroup: 'All Ages',
    duration: '12 Weeks',
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=800&auto=format&fit=crop',
    syllabusHighlights: ['Postural & hand technique', 'Scales & Arpeggios (ABRSM standard)', 'Chording & Song Accompaniment', 'Performance repertoire']
  },
  {
    id: 'prog-2',
    title: 'Acoustic & Electric Guitar Essentials',
    category: 'Guitar',
    description: 'Learn fingerpicking, rhythm strumming, soloing, and music theory designed specifically for guitarists.',
    level: 'Beginner',
    ageGroup: 'Teens (13-17)',
    duration: '10 Weeks',
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=800&auto=format&fit=crop',
    syllabusHighlights: ['Open & Barre Chords', 'Rhythm & Strumming Patterns', 'Tablature & Notation Reading', 'Lead Guitar Techniques']
  },
  {
    id: 'prog-3',
    title: 'Vocal Performance & Breath Control',
    category: 'Vocals',
    description: 'Develop tone quality, vocal range, pitching precision, breath management, and stage presence.',
    level: 'Intermediate',
    ageGroup: 'All Ages',
    duration: '8 Weeks',
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800&auto=format&fit=crop',
    syllabusHighlights: ['Diaphragmatic Breathing', 'Vocal Warmups & Exercises', 'Vocal Health & Hygiene', 'Solo Repertoire Coaching']
  },
  {
    id: 'prog-4',
    title: 'Drums & Rhythm Section Dynamics',
    category: 'Drums',
    description: 'Build solid timing, groove development, limb independence, and chart reading for modern drumming.',
    level: 'All Levels',
    ageGroup: 'Kids (5-12)',
    duration: '12 Weeks',
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=800&auto=format&fit=crop',
    syllabusHighlights: ['Basic Rudiments & Stick Control', 'Pop, Rock & Gospel Grooves', 'Timing & Metronome Practice', 'Dynamic Play-alongs']
  },
  {
    id: 'prog-5',
    title: 'Music Production & Audio Engineering',
    category: 'Production',
    description: 'Learn DAW fundamentals (Logic Pro / Ableton), beatmaking, mixing techniques, and vocal recording.',
    level: 'Intermediate',
    ageGroup: 'Adults (18+)',
    duration: '14 Weeks',
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop',
    syllabusHighlights: ['DAW Navigation & MIDI Sequencing', 'EQ, Compression & FX', 'Vocal Tracking', 'Basic Mastering']
  },
  {
    id: 'prog-6',
    title: 'ABRSM & Trinity Exam Prep Program',
    category: 'Exam Prep',
    description: 'Targeted preparation for ABRSM & Trinity College London practical and theory music examinations (Grades 1 to 8).',
    level: 'Advanced',
    ageGroup: 'All Ages',
    duration: 'Customary Prep Cycle',
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=800&auto=format&fit=crop',
    syllabusHighlights: ['Exam Repertoire Pieces', 'Scales & Arpeggios Testing', 'Aural & Sight Reading Practice', 'Mock Performance Assessments']
  }
];

export const INITIAL_INSTRUMENTS: Instrument[] = [
  {
    id: 'inst-1',
    name: 'Yamaha P-125 88-Key Weighted Digital Piano',
    category: 'Keyboard',
    price: '$799 / ₦650,000',
    description: 'Authentic piano feel with Graded Hammer Standard action. Perfect for serious learners and performers.',
    specifications: ['88 Weighted Keys', 'Pure CF Sound Engine', 'Built-in Speakers', 'Sustain Pedal Included'],
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=600&auto=format&fit=crop',
    condition: 'Brand New'
  },
  {
    id: 'inst-2',
    name: 'Fender Player Stratocaster Electric Guitar',
    category: 'Guitar',
    price: '$849 / ₦720,000',
    description: 'Iconic chime and classic tone with smooth playability. Inspiring instrument for all genres.',
    specifications: ['Alder Body with Gloss Finish', 'Player Series Single-Coil Pickups', 'Modern C-Shaped Neck', '22 Medium Jumbo Frets'],
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?q=80&w=600&auto=format&fit=crop',
    condition: 'Brand New'
  },
  {
    id: 'inst-3',
    name: 'Stentor Student II Handcrafted Violin Set (4/4)',
    category: 'Strings',
    price: '$380 / ₦320,000',
    description: 'Recommended by music teachers worldwide. Solid carved spruce top with padded case and bow.',
    specifications: ['Solid Carved Spruce Top', 'Ebony Fingerboard & Pegs', 'Includes Wood Bow & Case', 'Rosin & Bridge Included'],
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?q=80&w=600&auto=format&fit=crop',
    condition: 'Certified Pre-owned'
  },
  {
    id: 'inst-4',
    name: 'Roland V-Drums TD-07KV Electronic Drum Set',
    category: 'Drums & Percussion',
    price: '$999 / ₦880,000',
    description: 'Quiet mesh heads, rich sound engine, and Bluetooth connectivity for home practice and recording.',
    specifications: ['All-Mesh Drum Heads', 'TD-07 Sound Module with 25 Kits', 'Bluetooth Audio Streaming', 'Ultra-Quiet Playback'],
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=600&auto=format&fit=crop',
    condition: 'Brand New'
  }
];

export const INITIAL_CONSULTATIONS: Consultation[] = [
  {
    id: 'cons-1',
    fullName: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    phone: '+234 803 123 4567',
    preferredInstrument: 'Piano & Music Theory',
    ageGroup: 'Kids (5-12)',
    experienceLevel: 'Complete Beginner',
    goals: 'Looking for structured weekly lessons for my 8-year-old son.',
    status: 'scheduled',
    createdAt: '2026-07-20T10:30:00Z',
    notes: 'Scheduled call for Friday 2 PM.'
  },
  {
    id: 'cons-2',
    fullName: 'Michael Adebayo',
    email: 'm.adebayo@example.com',
    phone: '+234 812 987 6543',
    preferredInstrument: 'Vocal Coaching',
    ageGroup: 'Adults (18+)',
    experienceLevel: 'Intermediate',
    goals: 'Wants to prepare for church solo choir auditions and increase vocal range.',
    status: 'new',
    createdAt: '2026-07-22T14:15:00Z'
  }
];

export const INITIAL_INSTRUCTORS: InstructorApplication[] = [
  {
    id: 'inst-app-1',
    fullName: 'David Okonjo',
    email: 'david.o@example.com',
    phone: '+234 802 444 5555',
    primaryInstrument: 'Violin & Viola',
    secondaryInstruments: 'Piano',
    yearsExperience: 7,
    qualifications: 'B.Mus Music Performance (Unilag), ABRSM Grade 8 Violin',
    bio: 'Passionate classical and contemporary violinist with 7 years experience training students for ABRSM exams.',
    resumeFileName: 'David_Okonjo_CV.pdf',
    status: 'under_review',
    createdAt: '2026-07-21T09:00:00Z'
  }
];

export const INITIAL_LEARNERS: Learner[] = [
  {
    id: 'learn-1',
    userId: 'user-demo-1',
    fullName: 'Jessica Bennett',
    email: 'jessica.b@example.com',
    programmeId: 'prog-1',
    programmeTitle: 'Keyboard & Grand Piano Masterclass',
    instructorName: 'Prof. Emmanuel Vance',
    enrolledDate: '2026-06-01',
    progressPercentage: 65,
    status: 'active'
  }
];

export const INITIAL_LESSON_NOTES: LessonNote[] = [
  {
    id: 'note-1',
    learnerId: 'learn-1',
    title: 'Lesson 6: Major Scales & Finger Passages',
    topic: 'C Major & G Major Arpeggios (Hands Together)',
    content: 'Focus on smooth thumb crossover in right hand. Keep wrist relaxed during scalar passages.',
    practiceGoals: 'Practice C & G Major scales 15 mins daily at 80 BPM with metronome.',
    dateAssigned: '2026-07-18'
  },
  {
    id: 'note-2',
    learnerId: 'learn-1',
    title: 'Lesson 7: Canon in D Chord Progressions',
    topic: 'Triad Inversions & Left Hand Bass Lines',
    content: 'Analyzed the Roman numeral analysis (I - V - vi - iii - IV - I - IV - V). Practice voice leading.',
    practiceGoals: 'Memorize first 16 bars of accompaniment pattern.',
    dateAssigned: '2026-07-22'
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'assign-1',
    learnerId: 'learn-1',
    title: 'Sight Reading Exercise #4',
    description: 'Record a short video or audio playing Exercise #4 from Grade 2 Sight Reading workbook.',
    dueDate: '2026-07-28',
    status: 'pending'
  },
  {
    id: 'assign-2',
    learnerId: 'learn-1',
    title: 'ABRSM Grade 2 Theory Worksheet',
    description: 'Complete Pages 12-15 on Key Signatures & Time Signatures.',
    dueDate: '2026-07-20',
    status: 'reviewed',
    feedback: 'Excellent work! 95% accuracy. Watch out for compound time signature dots.'
  }
];

export const INITIAL_RESOURCES: LMSResource[] = [
  {
    id: 'res-1',
    programmeId: 'prog-1',
    programmeTitle: 'Keyboard & Grand Piano Masterclass',
    title: 'Hanon - The Virtuoso Pianist (Book 1 PDF)',
    fileType: 'pdf',
    fileUrl: '#',
    category: 'Technique & Exercises'
  },
  {
    id: 'res-2',
    programmeId: 'prog-1',
    programmeTitle: 'Keyboard & Grand Piano Masterclass',
    title: 'C Major Scale Reference Sheet Music',
    fileType: 'sheet_music',
    fileUrl: '#',
    category: 'Sheet Music'
  },
  {
    id: 'res-3',
    programmeId: 'prog-1',
    programmeTitle: 'Keyboard & Grand Piano Masterclass',
    title: 'Grade 2 Metronome Backing Audio Track (90 BPM)',
    fileType: 'audio',
    fileUrl: '#',
    category: 'Audio Accompaniments'
  }
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    learnerId: 'learn-1',
    learnerName: 'Jessica Bennett',
    programmeTitle: 'Foundations of Keyboard & Music Theory',
    issueDate: '2026-05-15',
    certificateCode: 'MA-CERT-2026-8891'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Upcoming ABRSM Practical Exam Registration Window',
    message: 'The registration deadline for the Q4 ABRSM practical examinations is August 15. Enrolled students preparing for exams should consult their tutor.',
    date: '2026-07-20',
    important: true
  },
  {
    id: 'ann-2',
    title: 'Annual Academy Summer Recital Showcase',
    message: 'We are excited to invite all enrolled learners and families to our annual showcase concert on September 5th at the Main Auditorium.',
    date: '2026-07-15'
  }
];
