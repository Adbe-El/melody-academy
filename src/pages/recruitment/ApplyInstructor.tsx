import React, { useState } from 'react';
import { UploadCloud, CheckCircle, FileText, Send, ChevronDown, ChevronUp, Music, Award, Users, Clock } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';
import { instructorAppsService } from '../../services/instructorApps';

const requirements = [
  'Minimum 3 years of professional music teaching or performance experience',
  'Formal music education or recognised certification (ABRSM, Trinity, degree, etc.)',
  'Ability to teach at least one primary instrument at an advanced level',
  'Strong communication skills and a passion for student development',
  'Willingness to follow the academy curriculum and assessment framework',
];

const benefits = [
  { icon: Music, title: 'Flexible Schedule', description: 'Set your own teaching hours around your performance and personal commitments.' },
  { icon: Users, title: 'Growing Student Base', description: 'Access a steady pipeline of dedicated learners and institutional clients.' },
  { icon: Award, title: 'Professional Growth', description: 'Join a network of educators with opportunities for masterclasses and workshops.' },
  { icon: Clock, title: 'Competitive Pay', description: 'Earn competitive hourly rates with timely payment and performance bonuses.' },
];

const faqs = [
  { q: 'What qualifications do I need?', a: 'We require a minimum of a diploma or degree in music, or equivalent professional certification (ABRSM Grade 8, Trinity, etc.). Performance experience is highly valued.' },
  { q: 'Can I teach from home or must I come to the academy?', a: 'Both options are available. We have physical academy spaces for in-person lessons, and many of our tutors also conduct online sessions via Zoom or WhatsApp.' },
  { q: 'How are students assigned to tutors?', a: 'Students are matched based on your instrument expertise, availability, and location. You can also accept or decline student assignments.' },
  { q: 'Is there a minimum teaching commitment?', a: 'We ask for a minimum 3-month commitment to ensure student continuity. After that, the arrangement is flexible.' },
  { q: 'How do I get paid?', a: 'Payments are made monthly via bank transfer. Rate depends on the programme and your experience level.' },
];

export const ApplyInstructor: React.FC = () => {
  const { showToast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [resumeName, setResumeName] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    primaryInstrument: 'Keyboard & Grand Piano',
    secondaryInstruments: '',
    yearsExperience: 5,
    qualifications: '',
    bio: '',
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await instructorAppsService.create({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        primary_instrument: formData.primaryInstrument,
        secondary_instruments: formData.secondaryInstruments || null,
        years_experience: formData.yearsExperience,
        qualifications: formData.qualifications,
        bio: formData.bio,
        cv_url: resumeName || null,
        certificates_urls: [],
        status: 'pending',
        admin_notes: null,
      } as Record<string, unknown>);
      setSubmitted(true);
      showToast('success', 'Application submitted successfully!');
    } catch {
      showToast('error', 'Failed to submit application. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-academy-emerald bg-academy-sage px-3.5 py-1 rounded-full">
          Faculty Recruitment
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900">
          Apply as a Music Instructor
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Join our network of qualified music educators. We connect exceptional tutors with dedicated
          individual and institutional learners.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white p-10 rounded-3xl text-center space-y-4 border border-emerald-200 shadow-lg">
          <div className="w-16 h-16 rounded-full bg-academy-sage text-academy-emerald mx-auto flex items-center justify-center">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h3 className="font-serif text-3xl font-bold text-academy-emerald">Application Submitted!</h3>
          <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
            Thank you, <span className="font-bold text-black">{formData.fullName}</span>. Your application
            has been submitted to the MelodyAcademy Academic Review Board. Our recruitment officer will
            review your credentials and contact you shortly.
          </p>
          <div className="pt-4">
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  fullName: '', email: '', phone: '',
                  primaryInstrument: 'Keyboard & Grand Piano',
                  secondaryInstruments: '', yearsExperience: 5,
                  qualifications: '', bio: '',
                });
                setResumeName('');
              }}
              className="px-8 py-3 rounded-full bg-academy-emerald text-white font-medium text-xs shadow"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Requirements */}
          <section className="space-y-5">
            <h2 className="font-serif text-2xl font-bold text-gray-900">What We Look For</h2>
            <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-soft">
              <ul className="space-y-3">
                {requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-academy-sage text-academy-emerald flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3" />
                    </span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Benefits */}
          <section className="space-y-5">
            <h2 className="font-serif text-2xl font-bold text-gray-900">Why Teach With Us</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <div key={i} className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-soft hover-lift">
                  <div className="w-10 h-10 rounded-xl bg-academy-sage text-academy-emerald flex items-center justify-center mb-3">
                    <b.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-gray-900">{b.title}</h3>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{b.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-5">
            <h2 className="font-serif text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-5 flex items-center justify-between text-left"
                  >
                    <span className="text-sm font-semibold text-gray-900">{faq.q}</span>
                    {openFaq === i ? (
                      <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Application Form */}
          <section className="space-y-5">
            <h2 className="font-serif text-2xl font-bold text-gray-900">Submit Your Application</h2>
            <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200/80 shadow-soft space-y-6">
              {/* Section 1 */}
              <div className="border-b border-gray-100 pb-4">
                <h3 className="font-serif text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-academy-emerald text-white text-xs flex items-center justify-center">1</span>
                  Personal & Contact Information
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700 uppercase">Full Name *</label>
                  <input type="text" required placeholder="e.g. David Okonjo" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald" />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700 uppercase">Email Address *</label>
                  <input type="email" required placeholder="david@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald" />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700 uppercase">Phone / WhatsApp *</label>
                  <input type="tel" required placeholder="+234 800 000 0000" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald" />
                </div>
              </div>

              {/* Section 2 */}
              <div className="border-b border-gray-100 pb-4 pt-4">
                <h3 className="font-serif text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-academy-emerald text-white text-xs flex items-center justify-center">2</span>
                  Teaching Competencies & Experience
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700 uppercase">Primary Instrument *</label>
                  <select value={formData.primaryInstrument} onChange={e => setFormData({ ...formData, primaryInstrument: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald">
                    <option>Keyboard & Grand Piano</option>
                    <option>Acoustic & Electric Guitar</option>
                    <option>Violin & String Ensemble</option>
                    <option>Vocal Performance</option>
                    <option>Drums & Rhythm Dynamics</option>
                    <option>Music Theory & Composition</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700 uppercase">Secondary Instruments</label>
                  <input type="text" placeholder="e.g. Viola, Bass Guitar" value={formData.secondaryInstruments} onChange={e => setFormData({ ...formData, secondaryInstruments: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald" />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-700 uppercase">Years of Teaching *</label>
                  <input type="number" min="1" max="40" required value={formData.yearsExperience} onChange={e => setFormData({ ...formData, yearsExperience: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-700 uppercase">Qualifications & Certifications *</label>
                <input type="text" required placeholder="e.g. B.Mus Music Education (Unilag), ABRSM Grade 8 Piano" value={formData.qualifications} onChange={e => setFormData({ ...formData, qualifications: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald" />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-700 uppercase">Short Bio & Teaching Philosophy *</label>
                <textarea rows={3} required placeholder="Share your musical background and approach to teaching students..." value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald" />
              </div>

              {/* Upload */}
              <div className="border border-dashed border-gray-300 p-6 rounded-2xl bg-academy-cream-light text-center space-y-2">
                <UploadCloud className="w-8 h-8 text-academy-emerald mx-auto" />
                <p className="text-xs font-bold text-gray-900">Upload CV / Degree Certificates</p>
                <p className="text-[11px] text-gray-500">PDF or DOCX files up to 10MB</p>
                <label className="inline-block mt-2 px-5 py-2 rounded-full bg-academy-emerald text-white text-xs font-semibold cursor-pointer hover:bg-academy-emerald-hover">
                  Choose File
                  <input type="file" onChange={handleFileUpload} accept=".pdf,.doc,.docx" className="hidden" />
                </label>
                {resumeName && (
                  <p className="text-xs text-academy-emerald font-semibold flex items-center justify-center gap-1.5 pt-2">
                    <FileText className="w-4 h-4" /> Attached: {resumeName}
                  </p>
                )}
              </div>

              <button type="submit" className="w-full py-4 rounded-full bg-academy-emerald text-white font-bold text-sm shadow-md hover:bg-academy-emerald-hover transition-all flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Submit Instructor Application
              </button>
            </form>
          </section>
        </>
      )}
    </div>
  );
};
