import React from 'react';
import { Award, BookOpen, Globe, Heart, Music, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const About: React.FC = () => {
  const navigate = useNavigate();

  const certifications = [
    'ABRSM Certification',
    'MUSON Diploma',
    'ISoM London — International School of Music',
    'Trinity College London Certified',
  ];

  const affiliations = [
    {
      name: 'Fox Music School (London)',
      role: 'Remote Piano Instructor',
      desc: 'Teaching piano students remotely for one of London\'s leading music schools.',
    },
    {
      name: 'Global Conservatory',
      role: 'Remote Faculty',
      desc: 'Providing world-class piano education to international students.',
    },
    {
      name: 'ISoM London',
      role: 'West African Representative',
      desc: 'Representing the International School of Music across the West African region.',
    },
  ];

  const charity = [
    {
      org: 'Art Sphere Inc. (USA)',
      desc: 'Partnering to bring music education and therapeutic arts programs to underserved communities.',
    },
    {
      org: 'Art to Heart Foundation (Canada)',
      desc: 'Collaborating on initiatives that use music as a tool for emotional healing and community building.',
    },
  ];

  return (
    <div className="space-y-20 pb-16">

      {/* --- HERO SECTION --- */}
      <section className="relative pt-8 sm:pt-12 lg:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-academy-sage text-academy-emerald px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide">
              <Music className="w-3.5 h-3.5" /> About Matthew Agba
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-academy-charcoal leading-[1.1]">
              A Life Dedicated<br />
              to the <span className="text-academy-emerald">Piano</span>
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-xl font-normal">
              With over 25 years as a pianist and organist, Matthew Agba has shaped the musical journeys
              of countless students across Nigeria, the UK, the USA, and Canada — both in person and remotely.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-3.5 rounded-full bg-academy-emerald hover:bg-academy-emerald-hover text-white font-medium text-base shadow-md hover:shadow-lg transition-all flex items-center gap-2 btn-shimmer"
              >
                Book a Consultation <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/programmes')}
                className="px-8 py-3.5 rounded-full border border-gray-300 hover:border-academy-emerald text-gray-800 font-medium text-base hover:bg-white transition-all"
              >
                Explore Courses
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden arch-image-mask shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1513883049090-d0b7439799bf?q=80&w=800&auto=format&fit=crop"
                alt="Matthew Agba — Pianist"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
            <div className="absolute top-8 -left-4 sm:-left-8 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3 max-w-[180px] sm:max-w-[220px] animate-float">
              <div className="w-10 h-10 rounded-xl bg-academy-sage text-academy-emerald flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">25+ Years</p>
                <p className="text-[11px] text-gray-500 leading-tight">Professional pianist & educator</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3 max-w-[190px] sm:max-w-[230px] animate-float-slow">
              <div className="w-10 h-10 rounded-xl bg-academy-sage text-academy-emerald flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Global Reach</p>
                <p className="text-[11px] text-gray-500 leading-tight">Teaching across 4 continents</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BIOGRAPHY --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-academy-emerald">
              The Story Behind the Music
            </h2>
            <div className="space-y-4 text-gray-600 text-base leading-relaxed">
              <p>
                Matthew Agba is a distinguished pianist, organist, and music educator with over 25 years
                of experience spanning performance, teaching, and consultancy. As the founder and director
                of <strong>Matt-Agba Music Consult</strong>, he is committed to raising the standard of
                music education across Africa and beyond.
              </p>
              <p>
                His journey began at a young age, mastering the piano and organ through rigorous classical
                training. Over the years, he has earned prestigious certifications including ABRSM, MUSON,
                and ISoM — credentials that reflect his dedication to excellence and his deep understanding
                of music pedagogy.
              </p>
              <p>
                Today, Matthew serves as a remote piano instructor for <strong>Fox Music School (London)</strong>{' '}
                and <strong>Global Conservatory</strong>, and holds the role of <strong>West African
                Representative</strong> for the International School of Music (ISoM) London — bridging
                the gap between African talent and global music standards.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-3xl border border-gray-200/80 p-8 space-y-6 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-gray-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-academy-emerald" /> Certifications
            </h3>
            <ul className="space-y-3">
              {certifications.map((cert, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-academy-emerald flex-shrink-0" />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- AFFILIATIONS --- */}
      <section className="bg-white/60 py-16 border-y border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-academy-emerald">
              Global Affiliations
            </h2>
            <p className="text-gray-600 text-sm max-w-lg mx-auto">
              Matthew's reach extends far beyond Lagos, with teaching and representative roles across the globe.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {affiliations.map((aff, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-gray-900">{aff.name}</h3>
                <p className="text-sm font-semibold text-academy-emerald mt-1">{aff.role}</p>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{aff.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CHARITY WORK --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-academy-emerald rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="text-center space-y-2 mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold flex items-center justify-center gap-3">
              <Heart className="w-8 h-8 text-academy-gold" /> Music for Good
            </h2>
            <p className="text-gray-300 text-sm max-w-lg mx-auto">
              Matthew partners with international non-profits to bring the transformative power of music
              to communities in need.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {charity.map((c, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="w-5 h-5 text-academy-gold" />
                  <h3 className="font-bold text-white">{c.org}</h3>
                </div>
                <p className="text-sm text-gray-200 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TEACHING PHILOSOPHY --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-academy-emerald">
            Teaching Philosophy
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed italic">
            "Music is not just an art — it is a discipline that builds character, focus, and emotional depth.
            My mission is to guide every student toward excellence, whether they are preparing for graded exams,
            leading worship, or simply discovering the joy of the piano."
          </p>
          <p className="text-gray-800 font-semibold">— Matthew Agba</p>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="bg-academy-sage rounded-3xl p-8 sm:p-14 border border-academy-emerald/10 space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-academy-emerald">
            Work with Matthew
          </h2>
          <p className="text-gray-700 text-sm max-w-xl mx-auto">
            Book a private consultation or piano lesson with Matthew Agba and begin your journey
            toward musical excellence.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-3.5 rounded-full bg-academy-emerald text-white font-medium hover:bg-academy-emerald-hover transition-all shadow-md btn-shimmer"
            >
              Book Free Consultation
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
