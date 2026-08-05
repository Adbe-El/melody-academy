import React, { useState } from 'react';
import {
  BookOpen,
  Headphones,
  PenTool,
  Music,
  Award,
  Clock,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Reveal } from '../../components/common/Reveal';
import { SectionHeading } from '../../components/common/SectionHeading';
import { MagneticButton } from '../../components/common/MagneticButton';
import { Waveform } from '../../components/common/Waveform';

export const ExamPrep = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const examTypes = [
    {
      title: 'Practical Examinations',
      icon: Headphones,
      description:
        'Demonstrate your musicianship through live performance. Examiners assess your technical control, musical expression, and stage presence.',
      points: [
        'Three prepared exam pieces of contrasting styles',
        'Scales and arpeggios from memory',
        'Sight-reading of an unfamiliar score',
        'Aural tests — ear recognition, singing, and rhythm',
      ],
    },
    {
      title: 'Theory Examinations',
      icon: PenTool,
      description:
        'Build a deep understanding of how music works. Theory exams cover notation, harmony, and analytical listening at every grade level.',
      points: [
        'Music notation — clefs, keys, time signatures',
        'Harmony — intervals, chords, cadences',
        'Musical analysis — form, texture, and context',
        'Rhythm, meter, and expressive markings',
      ],
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Consultation',
      description: 'We assess your current level, instrument, and goals to build a tailored exam roadmap.',
      icon: BookOpen,
    },
    {
      num: '02',
      title: 'Registration',
      description: 'We handle entry forms, syllabus selection, and submission with the relevant exam board.',
      icon: Award,
    },
    {
      num: '03',
      title: 'Preparation',
      description: 'Intensive coaching on repertoire, technique, sight-reading, aural, and theory.',
      icon: Music,
    },
    {
      num: '04',
      title: 'Examination Day',
      description: 'Arrive confident. We run mock exams and final rehearsals so you perform at your peak.',
      icon: Clock,
    },
  ];

  const examBoards = [
    {
      name: 'ABRSM',
      fullName: 'Associated Board of the Royal Schools of Music',
      country: 'United Kingdom',
      description:
        'The world standard in graded music examinations. Offers practical and theory grades 1–8, plus advanced performance diplomas.',
      badges: ['Practical Grades 1-8', 'Theory Grades 1-8', 'Performance Diplomas'],
    },
    {
      name: 'Trinity College London',
      fullName: 'Trinity College London',
      country: 'United Kingdom',
      description:
        'Globally recognised qualifications with flexible repertoire options across classical, rock & pop, and jazz genres.',
      badges: ['Rock & Pop Grades', 'Classical & Jazz', 'ATCL / LTCL Diplomas'],
    },
    {
      name: 'MUSON',
      fullName: 'Musical Society of Nigeria',
      country: 'Nigeria',
      description:
        'Prestigious national music examinations recognised by major institutions and schools across West Africa.',
      badges: ['Practical Examinations', 'Theory of Music', 'Diploma Program'],
    },
    {
      name: 'ISoM',
      fullName: 'International School of Musicians',
      country: 'United Kingdom',
      description:
        'UK-accredited graded examinations designed to build confident, well-rounded musicians with internationally recognised qualifications.',
      badges: ['Graded Practical Exams', 'Music Theory', 'Performance Diplomas'],
    },
  ];

  const faqs = [
    {
      question: 'How long does exam preparation take?',
      answer:
        'Most students prepare for 3–6 months per grade, depending on their practice schedule and prior experience. We recommend at least two sessions per week for consistent progress.',
    },
    {
      question: 'How do I know which grade I should enter?',
      answer:
        'During your free consultation, we evaluate your current skill level through a short assessment and recommend the right grade so you are challenged but not overwhelmed.',
    },
    {
      question: 'Are exams conducted online or in person?',
      answer:
        'ABRSM and Trinity both offer Recorded Video Assessment (RVA) as well as traditional in-person exams. MUSON exams are conducted in person, and ISoM offers flexible practical and theory assessment options. We will guide you through the format that suits you best.',
    },
    {
      question: 'What happens if I don\'t pass the exam?',
      answer:
        'Failing is a rare outcome with our coaching, but if it happens we provide a thorough debrief with examiner-style feedback, adjust your preparation plan, and schedule the next sitting at no extra coaching cost.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

      {/* ── Hero Banner ── */}
      <section className="relative bg-academy-emerald-dark rounded-3xl p-8 sm:p-14 text-white text-center space-y-4 shadow-xl overflow-hidden">
        <div className="absolute inset-0 staff-lines opacity-40" aria-hidden="true" />
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-academy-gold/20 blur-3xl" aria-hidden="true" />
        <div className="absolute inset-0 grain-overlay" aria-hidden="true" />
        <div className="relative">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/10 text-academy-gold px-4 py-1.5 rounded-full border border-white/15">
              <Award className="w-3.5 h-3.5" /> International Qualifications
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-4">
              Professional Music <span className="text-gradient-gold italic">Examinations</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Prepare for ABRSM, Trinity College London, MUSON, and ISoM examinations
              with expert coaching, mock evaluations, and dedicated sight-reading
              and aural training.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="pt-2 flex justify-center">
            <MagneticButton
              onClick={() => navigate('/contact?purpose=exam')}
              className="px-8 py-3.5 rounded-full bg-academy-gold hover:bg-academy-gold-hover text-academy-emerald font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              Register Exam Interest <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </Reveal>
        </div>
      </section>

      {/* ── Practical vs Theory ── */}
      <section className="space-y-6">
        <SectionHeading
          eyebrow="Exam foundations"
          title={
            <>
              Two Pillars of <span className="text-academy-emerald">Every Exam</span>
            </>
          }
          subtitle="Every graded music examination is built on practical performance and written theory. We prepare you for both."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {examTypes.map((type, idx) => {
            const Icon = type.icon;
            return (
              <Reveal key={type.title} delay={idx * 0.1}>
                <div
                  className="bg-white p-6 rounded-3xl border border-gray-200/80 hover:border-academy-emerald/30 hover-lift flex flex-col h-full"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-gray-900">
                      {type.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-5">
                    {type.description}
                  </p>
                  <ul className="space-y-2.5 mt-auto">
                    {type.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-academy-emerald flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── Examination Process ── */}
      <section className="space-y-6">
        <SectionHeading
          eyebrow="The journey"
          title={
            <>
              The Examination <span className="text-academy-emerald">Process</span>
            </>
          }
          subtitle="From first consultation to exam day, here is the journey we guide you through."
        />
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-academy-sage-dark z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.num} delay={idx * 0.12}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-white border-2 border-academy-emerald flex items-center justify-center shadow-sm mb-4">
                      <div className="text-center space-y-0.5">
                        <Icon className="w-5 h-5 text-academy-emerald mx-auto" />
                        <span className="text-[10px] font-bold text-academy-emerald uppercase tracking-wider">
                          Step {step.num}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-gray-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed max-w-full sm:max-w-[220px]">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Exam Boards ── */}
      <section className="space-y-6">
        <SectionHeading
          eyebrow="Global standards"
          title={
            <>
              Accredited Exam Boards <span className="text-academy-emerald">Supported</span>
            </>
          }
          subtitle="We coach candidates across major international examination bodies recognised in Nigeria, the UK, and beyond."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {examBoards.map((board, idx) => (
            <Reveal key={board.name} delay={idx * 0.1}>
              <div
                className="bg-white p-6 rounded-3xl border border-gray-200/80 hover:border-academy-emerald/30 hover-lift flex flex-col justify-between h-full"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center font-bold">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-gray-900">
                      {board.name}
                    </h3>
                    <p className="text-[11px] text-academy-emerald font-semibold uppercase tracking-wide mt-0.5">
                      {board.country}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {board.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 mt-4 space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {board.badges.map((b, i) => (
                      <span
                        key={i}
                        className="bg-academy-sage text-academy-emerald text-[10px] font-bold px-2.5 py-1 rounded-full"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate('/contact?purpose=exam')}
                    className="w-full mt-2 py-2.5 rounded-full bg-academy-emerald text-white text-xs font-semibold hover:bg-academy-emerald-hover transition-all"
                  >
                    Consult for {board.name.split(' ')[0]}
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="space-y-6">
        <SectionHeading
          eyebrow="Questions"
          title={
            <>
              Frequently Asked <span className="text-academy-emerald">Questions</span>
            </>
          }
          subtitle="Quick answers to the most common exam preparation queries."
        />
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-colors ${
                  isOpen
                    ? 'border-academy-emerald/30 shadow-sm'
                    : 'border-gray-200/80'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-serif text-base font-bold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-academy-emerald flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5">                    <p className="text-sm text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-academy-sage rounded-3xl p-8 sm:p-14 border border-academy-emerald/10 text-center space-y-4 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-academy-emerald/15 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -right-20 w-72 h-72 rounded-full bg-academy-gold/20 blur-3xl" aria-hidden="true" />
        <div className="relative">
          <Waveform bars={24} className="justify-center mb-4" />
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-academy-emerald">
            Ready to Start Your Exam Journey?
          </h2>
          <p className="text-gray-700 text-sm max-w-xl mx-auto">
            Register your interest or book a free consultation to discuss your
            goals, pick the right grade, and build a preparation plan.
          </p>
          <div className="pt-2 flex justify-center flex-wrap gap-4">
            <MagneticButton
              onClick={() => navigate('/contact?purpose=exam')}
              className="px-8 py-3.5 rounded-full bg-academy-emerald hover:bg-academy-emerald-hover text-white font-medium text-sm shadow-md transition-all flex items-center gap-2"
            >
              Register Interest <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <button
              onClick={() => navigate('/contact?purpose=exam')}
              className="px-8 py-3.5 rounded-full border border-academy-emerald text-academy-emerald font-medium text-sm hover:bg-academy-emerald hover:text-white transition-all"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
