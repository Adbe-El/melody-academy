import React from 'react';
import {
  Music,
  ArrowRight,
  BookOpen,
  UserCheck,
  ShoppingBag,
  Award,
  Building2,
  Users,
  Star,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const Home = () => {
  const navigate = useNavigate();
  const { instruments } = useApp();

  const services = [
    {
      id: 'programmes',
      title: 'Learn Music',
      description: 'Live classes & structured programs for all levels.',
      icon: BookOpen
    },
    {
      id: 'contact?purpose=tutor',
      title: 'Find a Tutor',
      description: 'Book private lessons with verified tutors.',
      icon: UserCheck
    },
    {
      id: 'instruments',
      title: 'Buy Instruments',
      description: 'Find the best instruments & gear at great prices.',
      icon: ShoppingBag
    },
    {
      id: 'exam-prep',
      title: 'Exam Preparation',
      description: 'Prepare for ABRSM, Trinity & more.',
      icon: Award
    },
    {
      id: 'consultancy',
      title: 'Consultancy',
      description: 'Expert advice for schools, churches & music teams.',
      icon: Building2
    },
    {
      id: 'consultancy',
      title: 'Hire Musicians',
      description: 'Hire top instrumentalists for your events & projects.',
      icon: Users
    }
  ];

  const categories = [
    {
      title: 'Keyboard',
      tutors: '15 Tutors',
      image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=600&auto=format&fit=crop',
      id: 'programmes'
    },
    {
      title: 'Guitar',
      tutors: '20 Tutors',
      image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=600&auto=format&fit=crop',
      id: 'programmes'
    },
    {
      title: 'Vocals',
      tutors: '18 Tutors',
      image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=600&auto=format&fit=crop',
      id: 'programmes'
    },
    {
      title: 'Drums',
      tutors: '12 Tutors',
      image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=600&auto=format&fit=crop',
      id: 'programmes'
    },
    {
      title: 'Production',
      tutors: '14 Tutors',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&auto=format&fit=crop',
      id: 'programmes'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Choose',
              desc: 'Choose your path — private lessons, exam prep, or consultancy.'
            },
            {
              num: '02',
              title: 'Connect',
              desc: 'Book a free consultation to discuss your goals with Matthew.'
            },
            {
              num: '03',
              title: 'Learn & Grow',
              desc: 'Follow a structured curriculum with personalized guidance.'
            },
            {
              num: '04',
              title: 'Excel',
              desc: 'Pass graded exams, earn certificates, and perform with confidence.'
    }
  ];

  const testimonials = [
    {
      quote: "The personalized instruction is amazing! My tutor explains everything so well and I can see real improvement every week.",
      name: "Jessica Bennett",
      role: "Piano Student"
    },
    {
      quote: "Matt-Agba Music Consult helped our church build a strong, cohesive worship team. The consultancy service was top-notch.",
      name: "Pastor Daniel",
      role: "Church Leader"
    },
    {
      quote: "Thanks to the exam prep program, I passed my ABRSM Grade 6 Practical exam with merit! Highly recommend.",
      name: "David Okonjo",
      role: "Exam Candidate"
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-8 sm:pt-12 lg:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-academy-sage text-academy-emerald px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide">
              <Music className="w-3.5 h-3.5" /> Learn from a pianist with 25+ years of experience
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-academy-charcoal leading-[1.1]">
              Master the Piano.<br />
              Shape the Music.<br />
              <span className="text-academy-emerald">Transform Your World.</span>
            </h1>

            {/* Subtext */}
            <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-xl font-normal">
              Matt-Agba Music Consult offers world-class piano education, ABRSM & Trinity exam preparation,
              and professional consultancy — founded by Matthew Agba, a globally connected pianist and educator.
            </p>

            {/* Hero CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-3.5 rounded-full bg-academy-emerald hover:bg-academy-emerald-hover text-white font-medium text-base shadow-md hover:shadow-lg transition-all flex items-center gap-2 btn-shimmer"
              >
                Start Learning <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/programmes')}
                className="px-8 py-3.5 rounded-full border border-gray-300 hover:border-academy-emerald text-gray-800 font-medium text-base hover:bg-white transition-all"
              >
                Explore Services
              </button>
            </div>

            {/* Social Proof Counter */}
            <div className="pt-4 flex items-center gap-3 text-sm text-gray-600">
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-academy-cream" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Learner" />
                <img className="w-8 h-8 rounded-full border-2 border-academy-cream" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Learner" />
                <img className="w-8 h-8 rounded-full border-2 border-academy-cream" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Learner" />
              </div>
              <span className="font-semibold text-gray-900">100+ pianists mentored</span> with distinction-level results
            </div>

          </div>

          {/* Right Hero Image Container (Arched shape with floating badges) */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Arched Mask Image */}
            <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden arch-image-mask shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1513883049090-d0b7439799bf?q=80&w=800&auto=format&fit=crop"
                alt="Pianist at the keyboard"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>

            {/* Top Floating Badge */}
            <div className="absolute top-8 -left-4 sm:-left-8 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3 max-w-[180px] sm:max-w-[220px] animate-float">
              <div className="w-10 h-10 rounded-xl bg-academy-sage text-academy-emerald flex items-center justify-center flex-shrink-0 relative">
                <BookOpen className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-academy-emerald rounded-full animate-pulse-ring" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">One-on-One Coaching</p>
                <p className="text-[11px] text-gray-500 leading-tight">Personalized sessions with Matthew</p>
              </div>
            </div>

            {/* Bottom Floating Badge */}
            <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3 max-w-[190px] sm:max-w-[230px] animate-float-slow">
              <div className="w-10 h-10 rounded-xl bg-academy-sage text-academy-emerald flex items-center justify-center flex-shrink-0 relative">
                <CheckCircle2 className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-academy-emerald rounded-full animate-pulse-ring" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">ABRSM & Trinity</p>
                <p className="text-[11px] text-gray-500 leading-tight">Exam prep with distinction results</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- SERVICES SECTION (6 CARDS) --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-academy-emerald">
            Explore Our Services
          </h2>
          <p className="text-gray-600 text-sm max-w-lg mx-auto">
            Piano lessons, ABRSM/Trinity exam prep, instrument sales, and institutional consultancy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(srv => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.title}
                onClick={() => navigate('/' + srv.id)}
                className="group relative bg-white p-6 rounded-3xl border border-gray-200/80 hover:border-academy-emerald/30 hover-lift cursor-pointer flex flex-col justify-between h-56"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-gray-900 group-hover:text-academy-emerald transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1.5 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200/60">
                  <span className="w-8 h-[2px] bg-gray-300 group-hover:bg-academy-emerald transition-colors"></span>
                  <div className="w-9 h-9 rounded-full bg-academy-sage text-academy-emerald flex items-center justify-center group-hover:bg-academy-emerald group-hover:text-white transition-all shadow-sm">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- MARQUEE LOGO STRIP --- */}
      <section className="overflow-hidden py-8 border-y border-black/5">
        <div className="flex animate-marquee whitespace-nowrap">
          {['Piano', 'Guitar', 'Violin', 'Drums', 'Vocals', 'Production', 'Trumpet', 'Saxophone', 'Flute', 'Bass'].concat(['Piano', 'Guitar', 'Violin', 'Drums', 'Vocals', 'Production', 'Trumpet', 'Saxophone', 'Flute', 'Bass']).map((item, i) => (
            <span key={i} className="mx-10 text-gray-300 font-serif text-2xl font-bold tracking-wide select-none">{item}</span>
          ))}
        </div>
      </section>

      {/* --- POPULAR CATEGORIES --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-3xl font-bold text-gray-900">Popular Categories</h2>
            <p className="text-sm text-gray-600">Choose from top instrument disciplines</p>
          </div>
          <button
            onClick={() => navigate('/programmes')}
            className="px-5 py-2 rounded-full border border-gray-300 text-xs font-semibold hover:border-gray-900 text-gray-800 transition-all"
          >
            View all
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map(cat => (
            <div
              key={cat.title}
              onClick={() => navigate('/' + cat.id)}
              className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4 text-white">
                <h4 className="font-serif text-xl font-bold">{cat.title}</h4>
                <p className="text-xs text-gray-300 font-medium">{cat.tutors}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- HOW IT WORKS (NUMBERED BADGE CARDS) --- */}
      <section className="bg-white/60 py-16 border-y border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-academy-emerald">
              How It Works
            </h2>
            <div className="w-12 h-1 bg-academy-emerald mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(step => (
              <div
                key={step.num}
                className="relative bg-white p-6 pt-10 rounded-3xl border border-gray-200/80 text-center flex flex-col items-center shadow-sm"
              >
                {/* Number Badge at Top Border */}
                <div className="absolute -top-4 w-9 h-9 rounded-full bg-academy-emerald text-white font-bold text-sm flex items-center justify-center shadow-md">
                  {step.num}
                </div>

                <div className="w-12 h-12 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6" />
                </div>

                <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed max-w-xs">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURED INSTRUMENTS PREVIEW --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-academy-emerald">Instrument Shop</span>
            <h2 className="font-serif text-3xl font-bold text-gray-900">Featured Musical Instruments</h2>
          </div>
          <button
            onClick={() => navigate('/instruments')}
            className="px-5 py-2 rounded-full border border-gray-300 text-xs font-semibold hover:border-gray-900 text-gray-800 transition-all"
          >
            Browse Catalogue
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instruments.slice(0, 4).map(inst => (
            <div
              key={inst.id}
              onClick={() => navigate('/instruments')}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 p-4 hover-lift cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-44 rounded-2xl overflow-hidden bg-gray-100 mb-3">
                <img src={inst.image_url} alt={inst.name} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-academy-emerald text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  {inst.condition}
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-academy-emerald">{inst.category_name}</p>
                <h4 className="font-serif text-base font-bold text-gray-900 line-clamp-1">{inst.name}</h4>
                <p className="text-sm font-bold text-gray-900 mt-1">{inst.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- TESTIMONIALS & STATS --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-academy-emerald rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          
          <div className="text-center space-y-2 mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">What People Say</h2>
            <p className="text-gray-300 text-sm">Real stories from students, church leaders, and exam candidates.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-academy-gold mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-200 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 mt-4">
                  <p className="font-bold text-sm text-white">{t.name}</p>
                  <p className="text-xs text-academy-gold">{t.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/20 text-center">
            <div>
              <p className="font-serif text-3xl sm:text-4xl font-bold text-academy-gold">25+</p>
              <p className="text-xs text-gray-300 font-medium">Years of Experience</p>
            </div>
            <div>
              <p className="font-serif text-3xl sm:text-4xl font-bold text-academy-gold">100+</p>
              <p className="text-xs text-gray-300 font-medium">Pianists Mentored</p>
            </div>
            <div>
              <p className="font-serif text-3xl sm:text-4xl font-bold text-academy-gold">ABRSM</p>
              <p className="text-xs text-gray-300 font-medium">Trinity & MUSON Certified</p>
            </div>
            <div>
              <p className="font-serif text-3xl sm:text-4xl font-bold text-academy-gold">Global</p>
              <p className="text-xs text-gray-300 font-medium">UK • USA • Canada • Nigeria</p>
            </div>
          </div>

        </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="bg-academy-sage rounded-3xl p-8 sm:p-14 border border-academy-emerald/10 space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-academy-emerald">
            Ready to Begin Your Piano Journey?
          </h2>
          <p className="text-gray-700 text-sm max-w-xl mx-auto">
            Book a free consultation with Matthew Agba and start your journey toward musical excellence.
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
