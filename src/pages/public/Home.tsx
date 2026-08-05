import React, { useRef } from 'react';
import {
  Music,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  UserCheck,
  ShoppingBag,
  Award,
  Building2,
  Users,
  CheckCircle2,
  GraduationCap,
  Globe,
  Compass,
  MessageCircle,
  Trophy,
  Sparkles,
  ChevronDown,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { Reveal } from '../../components/common/Reveal';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Counter } from '../../components/common/Counter';
import { MagneticButton } from '../../components/common/MagneticButton';
import { Waveform } from '../../components/common/Waveform';
import { AffiliationTicker } from '../../components/common/AffiliationTicker';
import { TestimonialCarousel, type Testimonial } from '../../components/common/TestimonialCarousel';

const DEFAULT_PROGRAMME_IMG =
  'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=900&auto=format&fit=crop';

const HERO_IMG =
  'https://images.unsplash.com/photo-1513883049090-d0b7439799bf?q=80&w=900&auto=format&fit=crop';

const MAESTRO_IMG =
  'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=900&auto=format&fit=crop';

const AFFILIATIONS = [
  'ABRSM',
  'Trinity College London',
  'MUSON',
  'ISoM London',
  'Fox Music School',
  'Global Conservatory',
  'Art Sphere Inc.',
  'Art to Heart Foundation'
];

const LINE_EASE = [0.22, 1, 0.36, 1] as const;

const heroLine = {
  hidden: { y: '112%' },
  visible: (i: number) => ({
    y: '0%',
    transition: { duration: 0.85, ease: LINE_EASE, delay: 0.2 + i * 0.12 }
  })
};

const fadeSlide = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: LINE_EASE, delay: 0.45 + i * 0.12 }
  })
};

const HeroLine: React.FC<{ children: React.ReactNode; i: number; gold?: boolean }> = ({ children, i, gold }) => (
  <span className="block overflow-hidden pb-1 -mb-1">
    <motion.span
      custom={i}
      variants={heroLine}
      initial="hidden"
      animate="visible"
      className={`block ${gold ? 'text-gradient-gold italic' : ''}`}
    >
      {children}
    </motion.span>
  </span>
);

interface Service {
  title: string;
  desc: string;
  icon: React.ElementType;
  to: string;
  accent: string;
  iconWrap: string;
}

const services: Service[] = [
  {
    title: 'Learn Music',
    desc: 'Structured programmes, live classes and one-on-one coaching across piano, guitar, vocals and more.',
    icon: BookOpen,
    to: '/programmes',
    accent: 'bg-academy-emerald text-white',
    iconWrap: 'bg-white/15 text-academy-gold'
  },
  {
    title: 'Find a Tutor',
    desc: 'Private lessons with verified, vetted tutors.',
    icon: UserCheck,
    to: '/contact?purpose=tutor',
    accent: 'bg-academy-sage',
    iconWrap: 'bg-white text-academy-emerald'
  },
  {
    title: 'Buy Instruments',
    desc: 'Quality instruments & gear at great prices.',
    icon: ShoppingBag,
    to: '/instruments',
    accent: 'bg-academy-leaf-soft',
    iconWrap: 'bg-white text-academy-leaf'
  },
  {
    title: 'Exam Preparation',
    desc: 'ABRSM, Trinity & MUSON — with distinction-level results.',
    icon: Award,
    to: '/exam-prep',
    accent: 'bg-academy-sage',
    iconWrap: 'bg-white text-academy-emerald'
  },
  {
    title: 'Consultancy',
    desc: 'Expert guidance for schools, churches & music teams.',
    icon: Building2,
    to: '/consultancy',
    accent: 'bg-academy-sage',
    iconWrap: 'bg-white text-academy-emerald'
  }
];

const hireMusicians: Service = {
  title: 'Hire Musicians',
  desc: 'Book top instrumentalists and ensembles for your events, services and recordings.',
  icon: Users,
  to: '/consultancy',
  accent: 'bg-academy-gold',
  iconWrap: 'bg-white text-academy-gold-strong'
};

const steps = [
  {
    num: '01',
    title: 'Discover',
    desc: 'Explore programmes and find the instrument, path or service that speaks to you.',
    icon: Compass
  },
  {
    num: '02',
    title: 'Connect',
    desc: 'Book a free consultation to map your goals with Matthew in person or online.',
    icon: MessageCircle
  },
  {
    num: '03',
    title: 'Learn',
    desc: 'Follow a personalised curriculum with structured practice and real feedback.',
    icon: BookOpen
  },
  {
    num: '04',
    title: 'Excel',
    desc: 'Pass graded exams, earn certificates and take the stage with confidence.',
    icon: Trophy
  }
];

const testimonials: Testimonial[] = [
  {
    quote:
      'The personalised instruction is amazing! My tutor explains everything so well and I can see real improvement every week.',
    name: 'Jessica Bennett',
    role: 'Piano Student'
  },
  {
    quote:
      'Matt-Agba Music Consult helped our church build a strong, cohesive worship team. The consultancy service was top-notch.',
    name: 'Pastor Daniel',
    role: 'Church Leader'
  },
  {
    quote:
      'Thanks to the exam prep programme, I passed my ABRSM Grade 6 Practical exam with merit! Highly recommend.',
    name: 'David Okonjo',
    role: 'Exam Candidate'
  }
];

const maverickStats = [
  { value: 25, suffix: '+', label: 'Years on the keys' },
  { value: 100, suffix: '+', label: 'Students mentored' },
  { value: 4, suffix: '', label: 'Continents taught' },
  { value: 3, suffix: '', label: 'Exam boards certified' }
];

const TiltCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg) translateY(-4px)`;
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="transition-transform duration-300 ease-out will-change-transform h-full"
    >
      {children}
    </div>
  );
};

export const Home = () => {
  const navigate = useNavigate();
  const { instruments, programmes, whatsappNumber, getWhatsAppUrl } = useApp();

  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);
  const heroGlow = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.3]);

  const featuredProgrammes = (programmes.length > 0 ? programmes : [])
    .filter(p => p.status === 'active')
    .sort((a, b) => (b.featured === true ? 1 : 0) - (a.featured === true ? 1 : 0))
    .slice(0, 4);

  const featuredInstruments = instruments.filter(i => i.status === 'active').slice(0, 6);

  const whatsapp = () => {
    const url = getWhatsAppUrl('Hello Matt-Agba Music Consult! I found your website and would love to learn more.');
    window.open(url, '_blank');
  };

  const go = (to: string) => navigate(to);

  return (
    <div className="pb-16 overflow-x-clip">
      {/* ================= HERO ================= */}
      <section ref={heroRef} className="relative overflow-hidden bg-academy-emerald-dark text-white">
        {/* Decorative layers */}
        <div className="absolute inset-0 staff-lines opacity-70" aria-hidden="true" />
        <motion.div
          style={{ opacity: heroGlow }}
          className="absolute -top-48 -right-40 w-[560px] h-[560px] rounded-full bg-academy-emerald/70 blur-[130px]"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-56 -left-32 w-[460px] h-[460px] rounded-full bg-academy-gold/20 blur-[150px]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 grain-overlay" aria-hidden="true" />

        {/* Floating notes */}
        <Music className="absolute top-24 left-[8%] w-6 h-6 text-academy-gold/40 animate-note-float" aria-hidden="true" />
        <Music className="absolute top-1/2 left-[3%] w-4 h-4 text-academy-gold/30 animate-note-float" style={{ animationDelay: '2s' }} aria-hidden="true" />
        <Music className="absolute bottom-32 right-[6%] w-5 h-5 text-academy-gold/30 animate-note-float" style={{ animationDelay: '3.5s' }} aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-28 sm:pt-20 lg:pt-28 lg:pb-36 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center">
          {/* Left */}
          <div className="lg:col-span-7">
            <motion.div
              variants={fadeSlide}
              custom={0}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2.5 bg-white/5 border border-white/15 backdrop-blur-md px-4 py-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase text-academy-gold"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-academy-gold animate-pulse-ring" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-academy-gold" />
              </span>
              Now enrolling — lessons &amp; graded exams
            </motion.div>

            <h1 className="mt-7 font-serif text-[2.9rem] leading-[1.06] sm:text-6xl xl:text-7xl font-bold tracking-tight">
              <HeroLine i={0}>Music is a language.</HeroLine>
              <HeroLine i={1}>We teach you to speak it <span className="text-gradient-gold italic">beautifully.</span></HeroLine>
            </h1>

            <motion.p
              variants={fadeSlide}
              custom={3}
              initial="hidden"
              animate="visible"
              className="mt-7 text-gray-300 text-lg sm:text-xl leading-relaxed max-w-xl font-normal"
            >
              From first chords to graded exams and concert stages — Matt-Agba Music Consult pairs classical
              discipline with artistic freedom, guided by a pianist with 25+ years on the keys.
            </motion.p>

            <motion.div
              variants={fadeSlide}
              custom={4}
              initial="hidden"
              animate="visible"
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                onClick={() => go('/contact')}
                className="px-8 py-4 rounded-full bg-academy-gold hover:bg-academy-gold-hover text-academy-emerald-dark font-bold text-base shadow-glow flex items-center gap-2 group"
              >
                Book a Free Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              <button
                onClick={() => go('/programmes')}
                className="px-8 py-4 rounded-full border border-white/25 hover:border-academy-gold/60 text-white font-medium text-base hover:bg-white/5 transition-all"
              >
                Explore Programmes
              </button>
              <button
                onClick={whatsapp}
                aria-label="Chat on WhatsApp"
                className="w-14 h-14 rounded-full border border-white/25 text-academy-gold flex items-center justify-center hover:bg-academy-whatsapp hover:text-white hover:border-academy-whatsapp transition-all"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </motion.div>

            <motion.div
              variants={fadeSlide}
              custom={5}
              initial="hidden"
              animate="visible"
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-300"
            >
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 text-academy-gold fill-current" />
                ABRSM &amp; Trinity certified
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-academy-gold/60" aria-hidden="true" />
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-academy-gold" />
                Teaching across 4 continents
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-academy-gold/60" aria-hidden="true" />
              <span className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-academy-gold" />
                100+ pianists mentored
              </span>
            </motion.div>
          </div>

          {/* Right — portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: LINE_EASE, delay: 0.35 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Rotating vinyl ring */}
              <div
                className="absolute -top-10 -right-8 w-40 h-40 rounded-full border-4 border-academy-gold/25 border-dashed animate-spin-slow hidden sm:block"
                aria-hidden="true"
              />
              <div
                className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-academy-gold/10 blur-2xl hidden sm:block"
                aria-hidden="true"
              />

              <motion.div style={{ y: imgY }} className="relative w-full aspect-[4/5] arch-image-mask overflow-hidden border-[6px] border-white/15 shadow-2xl">
                <img
                  src={HERO_IMG}
                  alt="Pianist performing at a grand piano"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-academy-emerald-dark/70 via-transparent to-transparent" aria-hidden="true" />
              </motion.div>

              {/* Floating badges */}
              <div className="absolute top-8 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3 max-w-[200px] animate-float">
                <div className="w-10 h-10 rounded-xl bg-academy-emerald text-academy-gold flex items-center justify-center flex-shrink-0 relative">
                  <Award className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-academy-gold rounded-full animate-pulse-ring" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Exam Excellence</p>
                  <p className="text-[11px] text-gray-500 leading-tight">Distinction-level ABRSM results</p>
                </div>
              </div>

              <div className="absolute -bottom-5 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3 max-w-[210px] animate-float-slow">
                <div className="flex items-center gap-1.5">
                  <Waveform bars={12} className="h-8" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Live &amp; Online</p>
                  <p className="text-[11px] text-gray-500 leading-tight">Sessions streaming now</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          aria-label="Scroll to explore"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-academy-gold/70 hover:text-academy-gold transition-colors"
        >
          <ChevronDown className="w-6 h-6 animate-scroll-hint" />
        </motion.button>
      </section>

      {/* ================= AFFILIATION TICKER ================= */}
      <section className="py-10 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-academy-muted mb-6">
            Accredited, examined &amp; affiliated with
          </p>
          <AffiliationTicker items={AFFILIATIONS} />
        </div>
      </section>

      {/* ================= SERVICES (BENTO) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              Ways to <span className="text-academy-emerald">make music</span>
            </>
          }
          subtitle="One home for learning, performing, preparing for exams and building the music around you."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-6 gap-4">
          {services.slice(0, 5).map((srv, idx) => {
            const Icon = srv.icon;
            const featured = idx === 0;
            const span = featured ? 'md:col-span-4' : 'md:col-span-2';
            return (
              <Reveal key={srv.title} delay={idx * 0.06} className={span}>
                <div
                  onClick={() => go(srv.to)}
                  className={`group relative ${srv.accent} ${
                    featured
                      ? 'h-full min-h-[300px] md:min-h-[340px]'
                      : 'h-full min-h-[220px] md:min-h-[340px]'
                  } rounded-3xl overflow-hidden cursor-pointer hover-lift flex flex-col justify-between p-7`}
                >
                  {featured && (
                    <>
                      <img
                        src={DEFAULT_PROGRAMME_IMG}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-35 transition-opacity duration-500"
                        aria-hidden="true"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-academy-emerald-dark via-academy-emerald-dark/40 to-transparent" aria-hidden="true" />
                    </>
                  )}
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform ${srv.iconWrap}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className={`font-serif text-2xl font-bold ${featured ? 'text-white' : 'text-academy-charcoal'}`}>
                      {srv.title}
                    </h3>
                    <p className={`mt-2 text-sm leading-relaxed max-w-sm ${featured ? 'text-gray-200' : 'text-academy-muted'}`}>
                      {srv.desc}
                    </p>
                  </div>
                  <div className={`relative flex items-center justify-between pt-4 border-t ${featured ? 'border-white/20' : 'border-academy-charcoal/10'}`}>
                    <span className={`w-8 h-[2px] ${featured ? 'bg-academy-gold' : 'bg-academy-emerald'} group-hover:w-14 transition-all duration-300`} />
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${featured ? 'bg-academy-gold text-academy-emerald-dark group-hover:bg-white' : 'bg-academy-emerald text-white group-hover:bg-academy-gold'} transition-all group-hover:rotate-45`}>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}

          {/* Hire musicians — wide gold banner */}
          <Reveal className="md:col-span-6" delay={0.3}>
            <div
              onClick={() => go(hireMusicians.to)}
              className="group relative bg-academy-gold rounded-3xl overflow-hidden cursor-pointer hover-lift p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div className="absolute inset-0 grain-overlay" aria-hidden="true" />
              <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-white/20 blur-3xl" aria-hidden="true" />
              <div className="relative flex items-start sm:items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white text-academy-gold-strong flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-academy-emerald-dark">{hireMusicians.title}</h3>
                  <p className="mt-1 text-sm text-academy-emerald-dark/80 leading-relaxed max-w-2xl">{hireMusicians.desc}</p>
                </div>
              </div>
              <div className="relative flex items-center gap-3 flex-shrink-0">
                <span className="text-sm font-bold text-academy-emerald-dark">Enquire now</span>
                <div className="w-10 h-10 rounded-full bg-academy-emerald-dark text-academy-gold flex items-center justify-center group-hover:rotate-45 transition-transform">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= FEATURED PROGRAMMES ================= */}
      <section className="mt-24 relative overflow-hidden bg-academy-emerald-dark text-white py-24">
        <div className="absolute inset-0 staff-lines opacity-40" aria-hidden="true" />
        <div className="absolute -top-40 -left-40 w-[440px] h-[440px] rounded-full bg-academy-emerald/60 blur-[120px]" aria-hidden="true" />
        <div className="absolute inset-0 grain-overlay" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeading
              dark
              align="left"
              eyebrow="Featured programmes"
              title={
                <>
                  Choose <span className="text-gradient-gold">your sound</span>
                </>
              }
              subtitle="Live classes and structured curricula for every level — from your first note to your first recital."
            />
            <Reveal delay={0.15}>
              <button
                onClick={() => go('/programmes')}
                className="px-6 py-3 rounded-full border border-white/25 hover:border-academy-gold text-white font-semibold text-sm hover:bg-white/5 transition-all flex items-center gap-2"
              >
                View all programmes <ArrowRight className="w-4 h-4" />
              </button>
            </Reveal>
          </div>

          {featuredProgrammes.length > 0 ? (
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredProgrammes.map((prog, idx) => (
                <Reveal key={prog.id} delay={idx * 0.08} className="h-full">
                  <TiltCard>
                    <div
                      onClick={() => go(`/programmes/${prog.id}`)}
                      className="group h-full bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden cursor-pointer hover:border-academy-gold/50 transition-colors flex flex-col"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={prog.image_url || DEFAULT_PROGRAMME_IMG}
                          alt={prog.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-academy-emerald-dark/80 to-transparent" aria-hidden="true" />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-academy-gold text-academy-emerald-dark text-[10px] font-bold uppercase tracking-wider">
                          {prog.category}
                        </span>
                      </div>
                      <div className="p-5 flex flex-col justify-between flex-1">
                        <div>
                          <h3 className="font-serif text-xl font-bold text-white group-hover:text-academy-gold transition-colors">
                            {prog.title}
                          </h3>
                          <p className="mt-2 text-sm text-gray-300 leading-relaxed line-clamp-2">{prog.description}</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                          <span className="text-xs text-gray-300 font-medium">
                            {prog.level} · {prog.duration}
                          </span>
                          <span className="text-academy-gold flex items-center gap-1 text-xs font-bold">
                            Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal delay={0.1} className="mt-14">
              <div className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-3xl p-10 text-center">
                <Music className="w-8 h-8 text-academy-gold mx-auto mb-4" />
                <p className="text-gray-200 font-serif text-xl">Programmes are being finalised.</p>
                <p className="text-gray-400 text-sm mt-2">Book a consultation to start your journey today.</p>
                <button
                  onClick={() => go('/contact')}
                  className="mt-6 px-6 py-3 rounded-full bg-academy-gold text-academy-emerald-dark font-bold text-sm hover:bg-academy-gold-hover transition-colors"
                >
                  Book a Free Consultation
                </button>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ================= MEET THE MAESTRO ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
          <Reveal x={-24} y={0} className="lg:col-span-5">
            <div className="relative max-w-md mx-auto">
              <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full border-4 border-academy-gold/30 border-dashed animate-spin-slow hidden sm:block" aria-hidden="true" />
              <div className="relative w-full aspect-[4/5] arch-image-mask overflow-hidden border-4 border-white shadow-2xl">
                <img
                  src={MAESTRO_IMG}
                  alt="Hands of a pianist on the keys"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-academy-emerald-dark/50 via-transparent to-transparent" aria-hidden="true" />
              </div>
              <div className="absolute -bottom-5 left-6 bg-academy-emerald text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-float">
                <div className="w-9 h-9 rounded-xl bg-white/15 text-academy-gold flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold">Matthew Agba</p>
                  <p className="text-[11px] text-gray-300">Founder &amp; Lead Educator</p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <SectionHeading
              align="left"
              eyebrow="Meet the maestro"
              title={
                <>
                  Twenty-five years of <span className="text-academy-emerald">music</span>, distilled into every lesson
                </>
              }
              subtitle="Matthew Agba is a pianist, organist and educator trusted across Nigeria, the UK, the USA and Canada — remote faculty at London's Fox Music School and West African representative for ISoM London."
            />

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {maverickStats.map((stat, idx) => (
                <Reveal key={stat.label} delay={idx * 0.08}>
                  <div className="bg-white rounded-3xl border border-gray-200/80 p-5 text-center hover-lift">
                    <p className="font-serif text-3xl sm:text-4xl font-bold text-academy-emerald">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-academy-muted">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2} className="mt-10">
              <blockquote className="border-l-4 border-academy-gold pl-6 py-2">
                <p className="font-serif italic text-xl sm:text-2xl text-academy-charcoal leading-relaxed">
                  &ldquo;Music is not just an art — it is a discipline that builds character, focus and emotional depth.&rdquo;
                </p>
                <footer className="mt-3 text-sm font-semibold text-academy-emerald">— Matthew Agba</footer>
              </blockquote>
            </Reveal>

            <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => go('/about')}
                className="px-8 py-3.5 rounded-full bg-academy-emerald hover:bg-academy-emerald-hover text-white font-medium text-base shadow-md transition-all flex items-center gap-2 btn-shimmer"
              >
                The full story <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => go('/contact')}
                className="px-8 py-3.5 rounded-full border border-gray-300 hover:border-academy-emerald text-gray-800 font-medium text-base hover:bg-white transition-all"
              >
                Work with Matthew
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= YOUR JOURNEY ================= */}
      <section className="mt-24 py-20 bg-white border-y border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Your journey"
            title={
              <>
                Four notes to <span className="text-academy-emerald">your first stage</span>
              </>
            }
            subtitle="A simple, guided path from curiosity to confidence."
          />

          <div className="relative mt-16">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
              className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px origin-left bg-gradient-to-r from-transparent via-academy-gold/70 to-transparent"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <Reveal key={step.num} delay={idx * 0.12} className="relative">
                    <div className="flex flex-col items-center text-center px-2">
                      <div className="relative z-10 w-14 h-14 rounded-full bg-academy-emerald text-white flex items-center justify-center shadow-glow border-4 border-white">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="mt-4 font-serif text-sm font-bold text-academy-gold-strong tracking-widest">{step.num}</span>
                      <h3 className="mt-1 font-serif text-xl font-bold text-academy-charcoal">{step.title}</h3>
                      <p className="mt-2 text-sm text-academy-muted leading-relaxed max-w-[240px]">{step.desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <Reveal>
          <div className="relative overflow-hidden bg-academy-emerald rounded-[2.5rem] p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
            <div className="absolute inset-0 staff-lines opacity-40" aria-hidden="true" />
            <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-academy-gold/15 blur-[120px]" aria-hidden="true" />
            <div className="absolute inset-0 grain-overlay" aria-hidden="true" />

            <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
              <div className="lg:col-span-2">
                <SectionHeading
                  dark
                  align="left"
                  eyebrow="Testimonials"
                  title={
                    <>
                      Real voices, <span className="text-gradient-gold">real progress</span>
                    </>
                  }
                  subtitle="Students, church leaders and exam candidates share their journeys with us."
                />
                <div className="mt-6 flex items-center gap-1 text-academy-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                  <span className="ml-2 text-xs text-gray-300 font-medium">Loved by learners worldwide</span>
                </div>
              </div>
              <div className="lg:col-span-3">
                <TestimonialCarousel testimonials={testimonials} dark />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= FEATURED INSTRUMENTS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow="Instrument shop"
            title={
              <>
                From the <span className="text-academy-emerald">right gear</span>
              </>
            }
            subtitle="Quality instruments and accessories, hand-picked for every stage of your journey."
          />
          <Reveal delay={0.15}>
            <button
              onClick={() => go('/instruments')}
              className="px-6 py-3 rounded-full border border-gray-300 hover:border-academy-emerald text-gray-800 font-semibold text-sm transition-all flex items-center gap-2"
            >
              Browse catalogue <ArrowRight className="w-4 h-4" />
            </button>
          </Reveal>
        </div>

        {featuredInstruments.length > 0 ? (
          <Reveal delay={0.1} className="mt-12">
            <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide">
              {featuredInstruments.map(inst => (
                <div
                  key={inst.id}
                  onClick={() => go('/instruments')}
                  className="group snap-start shrink-0 w-[250px] sm:w-[270px] bg-white rounded-3xl overflow-hidden border border-gray-200/80 p-4 hover-lift cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative h-40 rounded-2xl overflow-hidden bg-gray-100 mb-3">
                    {inst.image_url ? (
                      <img
                        src={inst.image_url}
                        alt={inst.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-academy-sage text-academy-emerald">
                        <Music className="w-8 h-8" />
                      </div>
                    )}
                    <span className="absolute top-2 left-2 bg-academy-emerald text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                      {inst.condition}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-academy-emerald">{inst.category_name}</p>
                    <h4 className="font-serif text-base font-bold text-gray-900 line-clamp-1">{inst.name}</h4>
                    <p className="text-sm font-bold text-academy-emerald mt-1">{inst.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.1} className="mt-12">
            <div className="bg-academy-sage rounded-3xl p-10 text-center border border-academy-emerald/10">
              <ShoppingBag className="w-8 h-8 text-academy-emerald mx-auto mb-4" />
              <p className="font-serif text-xl text-academy-emerald">New instruments arriving soon.</p>
              <p className="text-gray-600 text-sm mt-2">Enquire now and we&rsquo;ll help you find the perfect fit.</p>
              <button
                onClick={whatsapp}
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-academy-emerald text-white text-sm font-semibold hover:bg-academy-emerald-hover transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> Ask on WhatsApp
              </button>
            </div>
          </Reveal>
        )}
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="mt-24 relative overflow-hidden bg-academy-emerald-dark text-white">
        <div className="absolute inset-0 staff-lines opacity-50" aria-hidden="true" />
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[720px] h-[360px] rounded-full bg-academy-gold/20 blur-[150px]" aria-hidden="true" />
        <div className="absolute inset-0 grain-overlay" aria-hidden="true" />
        <Music className="absolute top-16 right-[12%] w-6 h-6 text-academy-gold/40 animate-note-float" aria-hidden="true" />
        <Music className="absolute bottom-16 left-[10%] w-5 h-5 text-academy-gold/30 animate-note-float" style={{ animationDelay: '2.5s' }} aria-hidden="true" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-28 text-center">
          <Reveal>
            <div className="flex justify-center mb-8">
              <Waveform dark bars={24} />
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]">
              Your first note <span className="text-gradient-gold italic">awaits.</span>
            </h2>
            <p className="mt-6 text-gray-300 text-lg leading-relaxed max-w-xl mx-auto">
              Book a free consultation with Matthew Agba and discover how far your music can go —
              whether you&rsquo;re starting from zero or preparing for a graded exam.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton
                onClick={() => go('/contact')}
                className="px-9 py-4 rounded-full bg-academy-gold hover:bg-academy-gold-hover text-academy-emerald-dark font-bold text-base shadow-glow flex items-center gap-2 group"
              >
                Book Free Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              <button
                onClick={whatsapp}
                className="px-9 py-4 rounded-full border border-white/25 hover:border-academy-gold/60 text-white font-medium text-base hover:bg-white/5 transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-academy-gold" /> Chat on WhatsApp · {whatsappNumber}
              </button>
            </div>
            <p className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-academy-gold" />
              No commitment required — your first consultation is completely free.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
