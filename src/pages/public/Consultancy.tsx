import React, { useState } from 'react';
import { Building2, Church, GraduationCap, Users, CheckCircle, Send, Sparkles, ChevronDown, Quote } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Consultancy: React.FC = () => {
  const { addConsultancyRequest } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    organizationName: '',
    organizationType: 'Church' as const,
    contactPerson: '',
    email: '',
    phone: '',
    serviceNeeded: 'Worship Team Audits & Band Training',
    details: ''
  });

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.organizationName.trim()) errs.organizationName = 'Organization name is required';
    if (!formData.contactPerson.trim()) errs.contactPerson = 'Contact person is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Enter a valid email address';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addConsultancyRequest({
      organization_name: formData.organizationName,
      organization_type: formData.organizationType,
      contact_person: formData.contactPerson,
      email: formData.email,
      phone: formData.phone,
      service_needed: formData.serviceNeeded,
      details: formData.details,
    });
    setSubmitted(true);
  };

  const update = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  const services = [
    {
      title: 'School Music Department Setup',
      icon: GraduationCap,
      description: 'Designing accredited K-12 music curriculums, instrument procurement guidance, and hiring qualified music faculty.'
    },
    {
      title: 'Church Choir & Worship Band Training',
      icon: Church,
      description: 'Auditing rhythm sections, vocal blend coaching, arrangement techniques, sound check protocols, and band discipline.'
    },
    {
      title: 'Corporate & Private Event Musician Hiring',
      icon: Users,
      description: 'Hire vetted, professional soloists, string quartets, jazz trios, or full live bands for galas and special occasions.'
    },
    {
      title: 'Institutional Equipment Advisory',
      icon: Building2,
      description: 'Expert consultation on selecting sound gear, acoustic treatment, digital pianos, and band instruments for venues.'
    }
  ];

  const testimonials = [
    {
      quote: "Matt-Agba Music Consult transformed our church worship team from a struggling group into a polished, spirit-filled band. The vocal coaching and sound check protocols alone were worth every naira.",
      name: "Pastor Emeka Obi",
      role: "Worship Director, Redeem Life Church"
    },
    {
      quote: "Our school had zero music infrastructure. Within three months of consultation, we had a full curriculum, hired two qualified instructors, and our students performed at their first inter-school competition.",
      name: "Dr. Amina Yusuf",
      role: "Principal, Bright Future International School"
    },
    {
      quote: "They sourced a professional jazz quartet for our annual gala and the guests were blown away. The entire booking process was seamless and the musicians were world-class.",
      name: "Chinelo Adekunle",
      role: "Events Manager, Lagos Continental Hotel"
    }
  ];

  const faqs = [
    {
      q: "What organizations do you serve?",
      a: "We work with churches and worship ministries, K-12 schools and colleges, corporate brands hosting events, choirs and vocal ensembles, and private organizations looking to build or improve their music programs."
    },
    {
      q: "How long does a consultation take?",
      a: "An initial discovery session typically takes 60–90 minutes. Full engagement timelines vary: a worship team audit may take 2–4 weeks, while a school curriculum setup can span 2–3 months depending on scope."
    },
    {
      q: "Do you offer ongoing support?",
      a: "Yes. We provide follow-up coaching, quarterly reviews, and retainer-based advisory for organizations that want sustained improvement. Many of our clients stay on a monthly support plan."
    },
    {
      q: "What are your fees?",
      a: "Fees depend on the type and scope of the engagement. We offer a free initial consultation to understand your needs, then provide a tailored proposal with transparent pricing. Contact us to get started."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Hero Header */}
      <div className="bg-academy-emerald rounded-3xl p-8 sm:p-14 text-white text-center space-y-4 shadow-xl">
        <span className="text-xs font-bold uppercase tracking-wider bg-white/10 text-academy-gold px-4 py-1.5 rounded-full border border-white/10">
          Expert Music Consultancy
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold">
          Consultancy by Matthew Agba
        </h1>
        <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          With 25+ years as a pianist, organist, and music educator — and certifications from ABRSM, MUSON, and ISoM London — Matthew Agba partners with schools, churches, and corporate brands to build world-class music programs.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-200/80 hover:border-academy-emerald/30 hover-lift flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-gray-900">{s.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{s.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Consultancy Request Form */}
      <div className="bg-academy-cream-light p-8 sm:p-12 rounded-3xl border border-black/5 max-w-3xl mx-auto shadow-sm">
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 bg-academy-sage text-academy-emerald px-3.5 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Request Institutional Proposal
          </div>
          <h2 className="font-serif text-3xl font-bold text-gray-900">
            Submit Consultancy Inquiry
          </h2>
          <p className="text-xs text-gray-600">
            Fill out the details below and Matthew Agba (or a team member) will contact your office with a tailored proposal.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white p-8 rounded-2xl text-center space-y-4 border border-emerald-200">
            <CheckCircle className="w-14 h-14 text-academy-emerald mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-gray-900">Request Submitted Successfully</h3>
            <p className="text-xs text-gray-600 max-w-md mx-auto">
               Thank you, <span className="font-semibold text-black">{formData.contactPerson}</span> ({formData.organizationName}). Matthew Agba's consultancy team will reach out to you within 24 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  organizationName: '',
                  organizationType: 'Church',
                  contactPerson: '',
                  email: '',
                  phone: '',
                  serviceNeeded: 'Worship Team Audits & Band Training',
                  details: ''
                });
              }}
              className="px-6 py-2.5 rounded-full bg-academy-emerald text-white text-xs font-semibold"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Organization Name *</label>
                <input
                  type="text"
                  placeholder="e.g. St. Mark International Academy"
                  value={formData.organizationName}
                  onChange={e => update('organizationName', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald ${errors.organizationName ? 'border-red-400' : 'border-gray-300'}`}
                />
                {errors.organizationName && <p className="text-red-500 text-[10px] mt-1">{errors.organizationName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Organization Type *</label>
                <select
                  value={formData.organizationType}
                  onChange={e => update('organizationType', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald"
                >
                  <option value="School">School / College</option>
                  <option value="Church">Church / Ministry</option>
                  <option value="Choir">Choir / Vocal Ensemble</option>
                  <option value="Corporate">Corporate Brand</option>
                  <option value="Private Group">Private Group</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Contact Person *</label>
                <input
                  type="text"
                  placeholder="e.g. Pastor Daniel / Dr. Smith"
                  value={formData.contactPerson}
                  onChange={e => update('contactPerson', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald ${errors.contactPerson ? 'border-red-400' : 'border-gray-300'}`}
                />
                {errors.contactPerson && <p className="text-red-500 text-[10px] mt-1">{errors.contactPerson}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Email *</label>
                <input
                  type="email"
                  placeholder="admin@school.com"
                  value={formData.email}
                  onChange={e => update('email', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  placeholder="+234 800 123 4567"
                  value={formData.phone}
                  onChange={e => update('phone', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald ${errors.phone ? 'border-red-400' : 'border-gray-300'}`}
                />
                {errors.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Primary Service Needed *</label>
              <select
                value={formData.serviceNeeded}
                onChange={e => update('serviceNeeded', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald"
              >
                <option value="Worship Team Audits & Band Training">Church Worship Team Audits & Band Training</option>
                <option value="School Music Curriculum Setup">School Music Department & Curriculum Setup</option>
                <option value="Event Musician Booking">Hire Professional Musicians for Event</option>
                <option value="Equipment & Acoustic Advisory">Institutional Equipment & Acoustic Advisory</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Project Details & Requirements</label>
              <textarea
                rows={3}
                placeholder="Describe your current setup, team size, objectives, or target dates..."
                value={formData.details}
                onChange={e => update('details', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-academy-emerald text-white font-medium hover:bg-academy-emerald-hover transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Request Consultancy Proposal
            </button>
          </form>
        )}
      </div>

      {/* Success Stories */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-3xl font-bold text-gray-900">Success Stories</h2>
          <p className="text-xs text-gray-600 max-w-lg mx-auto">
            See what past consultancy clients say about working with Matthew Agba.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-200/80 space-y-4 hover-lift">
              <Quote className="w-8 h-8 text-academy-gold" />
              <p className="text-sm text-gray-700 leading-relaxed italic">"{t.quote}"</p>
              <div className="pt-4 border-t border-gray-100">
                <p className="font-serif text-sm font-bold text-gray-900">{t.name}</p>
                <p className="text-[10px] text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className={`bg-white rounded-2xl border transition-colors ${
              openFaq === idx
                ? 'border-academy-emerald/30 shadow-sm'
                : 'border-gray-200/80'
            } overflow-hidden`}>
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-serif text-sm font-bold text-gray-900">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5">
                  <p className="text-xs text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
