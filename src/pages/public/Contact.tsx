import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare, Globe, Share2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { consultationsService } from '../../services/consultations';
import { examRegistrationsService } from '../../services/examRegistrations';
import { Reveal } from '../../components/common/Reveal';
import { SectionHeading } from '../../components/common/SectionHeading';

const PURPOSES = ['tutor', 'exam', 'general'] as const;

export const Contact = () => {
  const { whatsappNumber, getWhatsAppUrl } = useApp();
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: PURPOSES.includes(searchParams.get('purpose') as typeof PURPOSES[number]) ? searchParams.get('purpose')! : '',
    message: '',
    preferredInstrument: '',
    ageGroup: '',
    experienceLevel: '',
    goals: '',
    examType: '',
    examBoard: '',
    level: '',
    preferredStartDate: '',
    notes: '',
  });

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    if (!form.purpose) errs.purpose = 'Please select an option';
    if (form.purpose === 'tutor') {
      if (!form.preferredInstrument) errs.preferredInstrument = 'Select an instrument';
      if (!form.ageGroup) errs.ageGroup = 'Select age group';
      if (!form.experienceLevel) errs.experienceLevel = 'Select experience level';
    }
    if (form.purpose === 'exam') {
      if (!form.examType) errs.examType = 'Select exam type';
      if (!form.examBoard) errs.examBoard = 'Select exam board';
      if (!form.level) errs.level = 'Select level';
    }
    if (form.purpose === 'general' && !form.message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      if (form.purpose === 'exam') {
        await examRegistrationsService.create({
          learner_name: form.name,
          email: form.email,
          phone: form.phone || null,
          exam_type: form.examType as 'practical' | 'theory',
          exam_board: form.examBoard as 'ABRSM' | 'Trinity' | 'MUSON',
          level: form.level,
          preferred_start_date: form.preferredStartDate || null,
          notes: form.notes || null,
          status: 'new',
        } as Record<string, unknown>);
      } else {
        await consultationsService.create({
          full_name: form.name,
          email: form.email,
          phone: form.phone,
          consultation_type: form.purpose === 'tutor' ? 'music_lessons' : 'general',
          preferred_instrument: form.preferredInstrument || null,
          age_group: form.ageGroup || null,
          experience_level: form.experienceLevel || null,
          goals: form.goals || null,
          notes: form.message || form.notes || null,
          status: 'new',
        } as Record<string, unknown>);
      }
      setSubmittedName(form.name);
      setSubmittedEmail(form.email);
      setSubmitted(true);
    } catch {
      setErrors({ _form: 'Failed to submit. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setSubmittedName('');
    setSubmittedEmail('');
    setForm({
      name: '', email: '', phone: '', purpose: '', message: '',
      preferredInstrument: '', ageGroup: '', experienceLevel: '', goals: '',
      examType: '', examBoard: '', level: '', preferredStartDate: '', notes: '',
    });
    setErrors({});
  };

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald ${errors[field] ? 'border-red-400' : 'border-gray-300'}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <SectionHeading
        eyebrow="Get in Touch"
        title={
          <>
            Contact <span className="text-academy-emerald">Matt-Agba Music Consult</span>
          </>
        }
        subtitle="Have questions about piano lessons, exam preparation, consultancy, or instrument sales? Matthew Agba is here to help."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Details Card */}
        <Reveal x={-24} y={0} className="lg:col-span-5">
        <div className="bg-academy-emerald text-white p-8 sm:p-10 rounded-3xl space-y-8 shadow-xl flex flex-col justify-between h-full">
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-white">Get in Touch with Matthew</h3>
            <p className="text-gray-300 text-xs leading-relaxed">
              Reach out directly via phone, email, or WhatsApp. Matthew Agba personally oversees all enquiries.
            </p>

            <div className="space-y-4 text-sm text-gray-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-academy-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-white">Address</p>
                  <p className="text-xs text-gray-300">Lagos, Nigeria (contact for exact location)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-academy-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-white">Helpline & WhatsApp</p>
                  <p className="text-xs text-gray-300">{whatsappNumber}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-academy-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-white">Email Enquiries</p>
                  <p className="text-xs text-gray-300">mattagbamusicconsult@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-academy-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-white">Working Hours</p>
                  <p className="text-xs text-gray-300">Mon - Fri: 8:00 AM - 6:00 PM</p>
                  <p className="text-xs text-gray-300">Saturday: 9:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/20">
            <a href="https://wa.me/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-academy-whatsapp flex items-center justify-center transition-colors">
              <MessageSquare className="w-5 h-5" />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-pink-600 flex items-center justify-center transition-colors">
              <Globe className="w-5 h-5" />
            </a>
            <a href="https://facebook.com/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-colors">
              <Globe className="w-5 h-5" />
            </a>
            <a href="https://x.com/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-black flex items-center justify-center transition-colors">
              <Share2 className="w-5 h-5" />
            </a>
          </div>

          <div className="space-y-3 pt-2 border-t border-white/20">
            <a
              href={getWhatsAppUrl("Hi Matt-Agba Music Consult, I have a general enquiry regarding your music programmes.")}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-full bg-academy-whatsapp text-white font-bold text-xs shadow hover:bg-academy-whatsapp-hover flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> Chat on WhatsApp Now
            </a>
            <button
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full py-3 rounded-full bg-academy-gold text-academy-emerald font-bold text-xs hover:bg-academy-gold-hover flex items-center justify-center gap-2"
            >
              Book 1-on-1 Consultation
            </button>
          </div>
        </div>
        </Reveal>

        {/* General Enquiry Form + Map */}
        <Reveal x={24} y={0} delay={0.1} className="lg:col-span-7">
        <div className="space-y-6">
          <div id="contact-form" className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
            <h3 className="font-serif text-2xl font-bold text-gray-900">Get in Touch</h3>

            {submitted ? (
              <div className="py-12 text-center space-y-3 bg-academy-cream-light p-6 rounded-2xl border border-emerald-200">
                <CheckCircle className="w-12 h-12 text-academy-emerald mx-auto" />
                <h4 className="font-serif text-xl font-bold text-gray-900">Message Delivered!</h4>
                <p className="text-xs text-gray-600">Thank you, {submittedName}. We will get back to you at {submittedEmail} shortly.</p>
                <button onClick={resetForm} className="mt-2 px-6 py-2 rounded-full bg-academy-emerald text-white text-xs font-semibold">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errors._form && <p className="text-sm text-red-500 bg-red-50 p-3 rounded-xl">{errors._form}</p>}

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">What are you reaching out about? *</label>
                  <select value={form.purpose} onChange={e => update('purpose', e.target.value)} className={inputClass('purpose')}>
                    <option value="">Select an option...</option>
                    <option value="tutor">I want a tutor</option>
                    <option value="exam">Exam preparation</option>
                    <option value="general">General enquiry</option>
                  </select>
                  {errors.purpose && <p className="text-red-500 text-[10px] mt-1">{errors.purpose}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Full Name *</label>
                    <input type="text" placeholder="e.g. Michael Adebayo" value={form.name} onChange={e => update('name', e.target.value)} className={inputClass('name')} />
                    {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Email Address *</label>
                    <input type="email" placeholder="michael@example.com" value={form.email} onChange={e => update('email', e.target.value)} className={inputClass('email')} />
                    {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Phone / WhatsApp *</label>
                  <input type="tel" placeholder="+234 800 000 0000" value={form.phone} onChange={e => update('phone', e.target.value)} className={inputClass('phone')} />
                  {errors.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone}</p>}
                </div>

                {form.purpose === 'tutor' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Preferred Instrument *</label>
                        <select value={form.preferredInstrument} onChange={e => update('preferredInstrument', e.target.value)} className={inputClass('preferredInstrument')}>
                          <option value="">Select...</option>
                          <option>Piano</option><option>Guitar</option><option>Vocals</option>
                          <option>Drums</option><option>Violin</option><option>Flute</option>
                          <option>Saxophone</option><option>Trumpet</option><option>Bass</option>
                          <option>Music Theory</option><option>Production</option>
                        </select>
                        {errors.preferredInstrument && <p className="text-red-500 text-[10px] mt-1">{errors.preferredInstrument}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Age Group *</label>
                        <select value={form.ageGroup} onChange={e => update('ageGroup', e.target.value)} className={inputClass('ageGroup')}>
                          <option value="">Select...</option>
                          <option>Kids (5-12)</option><option>Teens (13-17)</option>
                          <option>Adults (18+)</option><option>All Ages</option>
                        </select>
                        {errors.ageGroup && <p className="text-red-500 text-[10px] mt-1">{errors.ageGroup}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Experience Level *</label>
                        <select value={form.experienceLevel} onChange={e => update('experienceLevel', e.target.value)} className={inputClass('experienceLevel')}>
                          <option value="">Select...</option>
                          <option>Complete Beginner</option><option>Beginner</option>
                          <option>Intermediate</option><option>Advanced</option>
                        </select>
                        {errors.experienceLevel && <p className="text-red-500 text-[10px] mt-1">{errors.experienceLevel}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Goals</label>
                      <textarea rows={3} placeholder="What do you hope to achieve?" value={form.goals} onChange={e => update('goals', e.target.value)} className={inputClass('goals')} />
                    </div>
                  </>
                )}

                {form.purpose === 'exam' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Exam Type *</label>
                        <select value={form.examType} onChange={e => update('examType', e.target.value)} className={inputClass('examType')}>
                          <option value="">Select...</option>
                          <option value="practical">Practical</option>
                          <option value="theory">Theory</option>
                        </select>
                        {errors.examType && <p className="text-red-500 text-[10px] mt-1">{errors.examType}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Exam Board *</label>
                        <select value={form.examBoard} onChange={e => update('examBoard', e.target.value)} className={inputClass('examBoard')}>
                          <option value="">Select...</option>
                          <option value="ABRSM">ABRSM</option>
                          <option value="Trinity">Trinity</option>
                          <option value="MUSON">MUSON</option>
                        </select>
                        {errors.examBoard && <p className="text-red-500 text-[10px] mt-1">{errors.examBoard}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Level *</label>
                        <select value={form.level} onChange={e => update('level', e.target.value)} className={inputClass('level')}>
                          <option value="">Select...</option>
                          {['Initial','Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','DipABRSM','LRSM','FRSM'].map(l => <option key={l}>{l}</option>)}
                        </select>
                        {errors.level && <p className="text-red-500 text-[10px] mt-1">{errors.level}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Preferred Start Date</label>
                      <input type="date" value={form.preferredStartDate} onChange={e => update('preferredStartDate', e.target.value)} min={new Date().toISOString().split('T')[0]} className={inputClass('preferredStartDate')} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Notes</label>
                      <textarea rows={3} placeholder="Any additional information..." value={form.notes} onChange={e => update('notes', e.target.value)} className={inputClass('notes')} />
                    </div>
                  </>
                )}

                {form.purpose === 'general' && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Message *</label>
                    <textarea rows={4} placeholder="Type your questions or comments here..." value={form.message} onChange={e => update('message', e.target.value)} className={inputClass('message')} />
                    {errors.message && <p className="text-red-500 text-[10px] mt-1">{errors.message}</p>}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-full bg-academy-emerald text-white font-medium hover:bg-academy-emerald-hover transition-all shadow flex items-center justify-center gap-2 text-sm disabled:opacity-60"
                >
                  <Send className="w-4 h-4" /> {submitting ? 'Submitting...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Google Map */}
          <div className="rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm">
            <iframe
              title="Matt-Agba Music Consult Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127123.01627096585!2d3.3850!3d6.4531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf510a1c4020d%3A0x2d8b71c8f4b2d1e0!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        </Reveal>

      </div>

    </div>
  );
};
