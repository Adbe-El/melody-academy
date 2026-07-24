import React from 'react';
import { UserCheck, Award, Star, ArrowRight, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Instructors = () => {
  const navigate = useNavigate();
  const tutors = [
    {
      name: 'Prof. Emmanuel Vance',
      role: 'Head of Piano & Keyboard Studies',
      credentials: 'M.Mus Piano Performance (Royal Academy of Music), ABRSM Examiner',
      experience: '15+ Years Experience',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
      instruments: ['Grand Piano', 'Keyboard Harmonies', 'Advanced Theory'],
      bio: 'Former orchestra soloist specializing in classical concert technique, ABRSM exam preparation, and sight-reading speed.'
    },
    {
      name: 'Elena Rostova',
      role: 'Senior Violin & String Quartet Tutor',
      credentials: 'B.Mus Violin Performance (Moscow Conservatory)',
      experience: '12+ Years Experience',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
      instruments: ['Violin', 'Viola', 'Chamber Music'],
      bio: 'Enthusiastic educator who has coached over 100 students to Grade 8 distinction honors across European and African academies.'
    },
    {
      name: 'Marcus Sterling',
      role: 'Guitar & Modern Improvisation Specialist',
      credentials: 'Berklee College of Music Alum (Jazz Composition)',
      experience: '10+ Years Experience',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
      instruments: ['Acoustic Guitar', 'Electric Guitar', 'Bass Guitar'],
      bio: 'Session guitarist and producer teaching fingerstyle, jazz improvisation, rhythm chording, and solo construction.'
    },
    {
      name: 'Chloe Adeyemi',
      role: 'Vocal Performance & Choir Director',
      credentials: 'DipABRSM Vocal Performance, Choir Director Grace Ensemble',
      experience: '8+ Years Experience',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
      instruments: ['Contemporary Vocals', 'Classical Singing', 'Choral Conducting'],
      bio: 'Expert in diaphragmatic breath control, vocal hygiene, tone projection, and stage performance confidence.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-academy-emerald bg-academy-sage px-3.5 py-1 rounded-full">
          Faculty Directory
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900">
          Meet Our Certified Tutors
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Our faculty consists of certified performers, conservatory graduates, and experienced music educators dedicated to your musical growth.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tutors.map((t, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 border border-gray-200/80 hover:border-academy-emerald/30 hover-lift flex flex-col sm:flex-row gap-6 items-start"
          >
            <div className="w-full sm:w-44 h-48 sm:h-full rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
              <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-3 flex-1">
              <div>
                <span className="text-[11px] font-bold text-academy-emerald uppercase">{t.role}</span>
                <h3 className="font-serif text-2xl font-bold text-gray-900">{t.name}</h3>
                <p className="text-xs text-gray-500 font-medium">{t.credentials}</p>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                {t.bio}
              </p>

              <div className="pt-2 border-t border-gray-100 flex flex-wrap gap-1.5">
                {t.instruments.map((inst, i) => (
                  <span key={i} className="bg-academy-sage text-academy-emerald text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {inst}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Join as Instructor Recruitment Banner */}
      <div className="bg-academy-emerald rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-academy-gold bg-white/10 px-3.5 py-1 rounded-full border border-white/10">
            <Briefcase className="w-3.5 h-3.5" /> Instructor Recruitment
          </div>
          <h3 className="font-serif text-3xl font-bold">Are You a Qualified Music Educator?</h3>
          <p className="text-gray-300 text-sm max-w-xl">
            We are constantly expanding our faculty of professional music tutors. Apply to join our academy network and teach committed learners.
          </p>
        </div>
        <button
          onClick={() => navigate('/apply-instructor')}
          className="px-8 py-3.5 rounded-full bg-academy-gold text-academy-emerald font-bold text-sm hover:bg-academy-gold-hover transition-all shadow-md flex items-center gap-2 whitespace-nowrap"
        >
          Apply as Instructor <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
