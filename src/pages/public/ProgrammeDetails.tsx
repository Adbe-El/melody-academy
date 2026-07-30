import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Clock,
  Users,
  Award,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Music,
  CheckCircle2,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const faqs = [
  {
    q: "What's the class schedule?",
    a: "Classes run on weekdays and weekends. Weekday sessions are typically 4:00 PM – 6:00 PM, and weekend sessions are 10:00 AM – 1:00 PM. Exact times are confirmed after your initial consultation.",
  },
  {
    q: "Do I need my own instrument?",
    a: "No. The academy provides keyboards, drum kits, and other shared instruments for on-site lessons. If you're learning guitar, bass, or a personal instrument, you're encouraged to bring your own — we can recommend trusted vendors if you need one.",
  },
  {
    q: "Can I switch programmes?",
    a: "Yes. After completing at least four weeks in your current programme, you can request a transfer. Our academic team will assess your progress and recommend the best-fit programme for your new direction.",
  },
  {
    q: "What if I miss a class?",
    a: "We understand life happens. Missed classes can be made up within the same billing cycle, subject to instructor availability. Simply notify us at least 24 hours in advance via WhatsApp or email.",
  },
];

const ProgrammeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { programmes } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const programme = programmes.find((p) => p.id === id);

  if (!programme) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-gray-300 mx-auto" />
        <h1 className="font-serif text-3xl font-bold text-gray-900">Programme Not Found</h1>
        <p className="text-gray-500 text-sm">
          The programme you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/programmes"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-academy-emerald text-white text-xs font-bold hover:bg-academy-emerald-hover transition-all"
        >
          Browse Programmes <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-0">

      {/* ─── Banner ───────────────────────────────────────────── */}
      <section className="relative w-full h-[340px] sm:h-[420px] overflow-hidden">
        <img
          src={programme.image_url}
          alt={programme.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 max-w-7xl mx-auto">
          <span className="self-start bg-academy-emerald text-white text-[11px] font-bold px-3.5 py-1 rounded-full shadow-sm mb-3">
            {programme.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight max-w-2xl">
            {programme.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-white/85 font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {programme.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4" /> {programme.level}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4" /> {programme.age_group}
            </span>
          </div>
        </div>
      </section>

      {/* ─── Main Content ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* ── Overview ──────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="space-y-2 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-academy-emerald bg-academy-sage px-3.5 py-1 rounded-full">
              Programme Overview
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
              About This Programme
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Description */}
            <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed">{programme.description}</p>
            </div>

            {/* Quick Facts */}
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-academy-sage flex items-center justify-center">
                  <Clock className="w-5 h-5 text-academy-emerald" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Duration</p>
                  <p className="text-sm font-semibold text-gray-900">{programme.duration}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-academy-sage flex items-center justify-center">
                  <Award className="w-5 h-5 text-academy-emerald" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Level</p>
                  <p className="text-sm font-semibold text-gray-900">{programme.level}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-academy-sage flex items-center justify-center">
                  <Users className="w-5 h-5 text-academy-emerald" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Age Group</p>
                  <p className="text-sm font-semibold text-gray-900">{programme.age_group}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Learning Outcomes ──────────────────────────────── */}
        <section className="space-y-6">
          <div className="space-y-2 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-academy-emerald bg-academy-sage px-3.5 py-1 rounded-full">
              Curriculum
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
              What You'll Learn
            </h2>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200/80 shadow-sm">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {programme.syllabus_highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3 bg-academy-cream-light/50 p-4 rounded-2xl">
                  <CheckCircle2 className="w-5 h-5 text-academy-emerald flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Suitable For ───────────────────────────────────── */}
        <section className="space-y-6">
          <div className="space-y-2 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-academy-emerald bg-academy-sage px-3.5 py-1 rounded-full">
              Who It's For
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
              Suitable For
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-full bg-academy-sage flex items-center justify-center">
                <Users className="w-6 h-6 text-academy-emerald" />
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-900">Age Group</h3>
              <p className="text-sm text-gray-600">
                {programme.age_group === 'All Ages'
                  ? 'Open to learners of all ages — kids, teens, and adults are all welcome.'
                  : `Designed specifically for ${programme.age_group} learners with age-appropriate teaching methods.`}
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-full bg-academy-sage flex items-center justify-center">
                <Award className="w-6 h-6 text-academy-emerald" />
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-900">Skill Level</h3>
              <p className="text-sm text-gray-600">
                {programme.level === 'All Levels'
                  ? 'Structured to accommodate complete beginners through to advanced players in the same programme.'
                  : `Tailored for ${programme.level.toLowerCase()} musicians looking to refine their craft.`}
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="space-y-2 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-academy-emerald bg-academy-sage px-3.5 py-1 rounded-full">
              Questions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className={`bg-white rounded-2xl border transition-colors ${
                    isOpen
                      ? 'border-academy-emerald/30 shadow-sm'
                      : 'border-gray-200/80'
                  }`}
                >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-serif text-base font-bold text-gray-900 pr-4">
                    {faq.q}
                  </span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-academy-emerald flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            );
            })}
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────── */}
        <section className="bg-academy-emerald rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl">
          <Music className="w-10 h-10 text-academy-gold mx-auto" />
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white max-w-xl mx-auto leading-tight">
            Ready to Start Your Musical Journey?
          </h2>
          <p className="text-white/80 text-sm max-w-lg mx-auto">
            Book a free one-on-one consultation and let us help you find the perfect programme for your goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full bg-white text-academy-emerald font-bold text-xs hover:bg-gray-100 transition-all shadow flex items-center gap-2 btn-shimmer"
            >
              Book a Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/programmes"
              className="px-8 py-3.5 rounded-full border-2 border-white/40 text-white font-bold text-xs hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Browse More Programmes
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};

export { ProgrammeDetails };
