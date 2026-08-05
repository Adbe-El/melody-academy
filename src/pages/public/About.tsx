import React from 'react';
import { Award, BookOpen, Globe, Heart, Music, CheckCircle2, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Reveal } from '../../components/common/Reveal';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Counter } from '../../components/common/Counter';
import { MagneticButton } from '../../components/common/MagneticButton';
import { Waveform } from '../../components/common/Waveform';
import { AffiliationTicker } from '../../components/common/AffiliationTicker';

const AFFILIATIONS_LIST = [
  'ABRSM',
  'Trinity College London',
  'MUSON',
  'ISoM London',
  'Fox Music School',
  'Global Conservatory',
  'Art Sphere Inc.',
  'Art to Heart Foundation'
];

const MAESTRO_IMG = '/images/matthew-agba-portrait.jpg';

const stats = [
  { value: 25, suffix: '+', label: 'Years of experience' },
  { value: 4, suffix: '', label: 'Continents taught' },
  { value: 1000, suffix: '+', label: 'Students mentored' },
  { value: 8, suffix: '', label: 'Global affiliations' }
];

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
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-academy-sage text-academy-emerald px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide">
                <Music className="w-3.5 h-3.5" /> About Matthew Agba
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-academy-charcoal leading-[1.1]">
                A Life Dedicated<br />
                to the <span className="text-gradient-gold italic">Piano</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-xl font-normal">
                With over 25 years as a pianist and organist, Matthew Agba has shaped the musical journeys
                of countless students across Nigeria, the UK, the USA, and Canada — both in person and remotely.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="pt-2 flex flex-wrap items-center gap-4">
              <MagneticButton
                onClick={() => navigate('/contact')}
                className="px-8 py-3.5 rounded-full bg-academy-emerald hover:bg-academy-emerald-hover text-white font-medium text-base shadow-md flex items-center gap-2 btn-shimmer"
              >
                Book a Consultation <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              <button
                onClick={() => navigate('/programmes')}
                className="px-8 py-3.5 rounded-full border border-gray-300 hover:border-academy-emerald text-gray-800 font-medium text-base hover:bg-white transition-all"
              >
                Explore Courses
              </button>
            </Reveal>
          </div>

          <Reveal x={24} y={0} className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden arch-image-mask shadow-2xl border-4 border-white ml-auto">
              <img
                src={MAESTRO_IMG}
                alt="Matthew Agba — Pianist"
                loading="lazy"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 15%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
            <div className="absolute top-8 -right-2 sm:-right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3 max-w-[180px] sm:max-w-[220px] animate-float">
              <div className="w-10 h-10 rounded-xl bg-academy-sage text-academy-emerald flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">25+ Years</p>
                <p className="text-[11px] text-gray-500 leading-tight">Professional pianist & educator</p>
              </div>
            </div>
            <div className="absolute -bottom-4 left-2 sm:left-0 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3 max-w-[190px] sm:max-w-[230px] animate-float-slow">
              <div className="w-10 h-10 rounded-xl bg-academy-sage text-academy-emerald flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Global Reach</p>
                <p className="text-[11px] text-gray-500 leading-tight">Teaching across 4 continents</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- STATS BAND --- */}
      <section className="bg-white border-y border-black/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <Reveal key={stat.label} delay={idx * 0.08} className="text-center">
              <div className="bg-academy-cream-light rounded-3xl border border-gray-200/80 p-6 hover-lift">
                <p className="font-serif text-3xl sm:text-4xl font-bold text-academy-emerald">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-academy-muted">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --- BIOGRAPHY --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal x={-24} y={0}>
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
          </Reveal>
          <Reveal delay={0.15}>
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
          </Reveal>
        </div>
      </section>

      {/* --- AFFILIATION TICKER --- */}
      <section className="py-10 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-academy-muted mb-6">
            Accredited, examined &amp; affiliated with
          </p>
          <AffiliationTicker items={AFFILIATIONS_LIST} />
        </div>
      </section>

      {/* --- AFFILIATIONS --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Global reach"
          title={
            <>
              Affiliations across <span className="text-academy-emerald">the world</span>
            </>
          }
          subtitle="Matthew's reach extends far beyond Lagos, with teaching and representative roles across the globe."
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {affiliations.map((aff, i) => (
            <Reveal key={aff.name} delay={i * 0.1}>
              <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm hover-lift h-full">
                <div className="w-12 h-12 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-gray-900">{aff.name}</h3>
                <p className="text-sm font-semibold text-academy-emerald mt-1">{aff.role}</p>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{aff.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --- CHARITY WORK --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-academy-emerald-dark rounded-3xl p-8 sm:p-12 text-white shadow-2xl overflow-hidden">
          <div className="absolute inset-0 staff-lines opacity-40" aria-hidden="true" />
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-academy-gold/20 blur-3xl" aria-hidden="true" />
          <div className="absolute inset-0 grain-overlay" aria-hidden="true" />
          <div className="relative">
            <SectionHeading
              dark
              eyebrow="Music for good"
              title={
                <>
                  Music as a force <span className="text-gradient-gold">for change</span>
                </>
              }
              subtitle="Matthew partners with international non-profits to bring the transformative power of music to communities in need."
            />
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {charity.map((c, i) => (
                <Reveal key={c.org} delay={i * 0.1}>
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 h-full">
                    <div className="flex items-center gap-3 mb-2">
                      <Heart className="w-5 h-5 text-academy-gold" />
                      <h3 className="font-bold text-white">{c.org}</h3>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed">{c.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- TEACHING PHILOSOPHY --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative text-center max-w-3xl mx-auto">
          <Waveform bars={24} className="justify-center mb-6" />
          <Reveal>
            <blockquote className="text-center space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-academy-emerald">
                Teaching Philosophy
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed italic">
                "Music is not just an art — it is a discipline that builds character, focus, and emotional depth.
                My mission is to guide every student toward excellence, whether they are preparing for graded exams,
                leading worship, or simply discovering the joy of the piano."
              </p>
              <p className="text-gray-800 font-semibold">— Matthew Agba</p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <div className="relative bg-academy-sage rounded-3xl p-8 sm:p-14 border border-academy-emerald/10 space-y-4 overflow-hidden">
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-academy-emerald/15 blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-24 -right-20 w-72 h-72 rounded-full bg-academy-gold/20 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-academy-emerald">
                Work with Matthew
              </h2>
              <p className="text-gray-700 text-sm max-w-xl mx-auto">
                Book a private consultation or piano lesson with Matthew Agba and begin your journey
                toward musical excellence.
              </p>
              <div className="pt-5 flex justify-center gap-4">
                <MagneticButton
                  onClick={() => navigate('/contact')}
                  className="px-8 py-3.5 rounded-full bg-academy-emerald text-white font-medium hover:bg-academy-emerald-hover transition-all shadow-md btn-shimmer inline-flex items-center gap-2"
                >
                  Book Free Consultation <ArrowUpRight className="w-4 h-4" />
                </MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

    </div>
  );
};
