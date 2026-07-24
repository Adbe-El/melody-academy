import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare, Globe, Share2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Contact = () => {
  const { whatsappNumber, getWhatsAppUrl } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
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
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-academy-emerald bg-academy-sage px-3.5 py-1 rounded-full">
          Get in Touch
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900">
          Contact MelodyAcademy
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Have questions regarding admissions, lesson schedules, exam registration, or instrument sales? We'd love to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Details Card */}
        <div className="lg:col-span-5 bg-academy-emerald text-white p-8 sm:p-10 rounded-3xl space-y-8 shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-white">Academy Information</h3>
            <p className="text-gray-300 text-xs leading-relaxed">
              Visit our administrative building during office hours or reach out directly to our admissions Desk.
            </p>

            <div className="space-y-4 text-sm text-gray-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-academy-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-white">Academy Address</p>
                  <p className="text-xs text-gray-300">12 Academy Boulevard, Victoria Island, Lagos, Nigeria</p>
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
                  <p className="text-xs text-gray-300">admissions@melodyacademy.com</p>
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
              href={getWhatsAppUrl("Hi MelodyAcademy, I have a general enquiry regarding your music programmes.")}
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

        {/* General Enquiry Form + Map */}
        <div className="lg:col-span-7 space-y-6">
          <div id="contact-form" className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
            <h3 className="font-serif text-2xl font-bold text-gray-900">Send Us a Direct Message</h3>

            {submitted ? (
              <div className="py-12 text-center space-y-3 bg-academy-cream-light p-6 rounded-2xl border border-emerald-200">
                <CheckCircle className="w-12 h-12 text-academy-emerald mx-auto" />
                <h4 className="font-serif text-xl font-bold text-gray-900">Message Delivered!</h4>
                <p className="text-xs text-gray-600">Thank you for reaching out. We will get back to you at {form.email} shortly.</p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="mt-2 px-6 py-2 rounded-full bg-academy-emerald text-white text-xs font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Your Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Michael Adebayo"
                      value={form.name}
                      onChange={e => update('name', e.target.value)}
                      className={inputClass('name')}
                    />
                    {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Email Address *</label>
                    <input
                      type="email"
                      placeholder="michael@example.com"
                      value={form.email}
                      onChange={e => update('email', e.target.value)}
                      className={inputClass('email')}
                    />
                    {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Subject *</label>
                  <input
                    type="text"
                    placeholder="e.g. Enquiry regarding weekend piano classes for adults"
                    value={form.subject}
                    onChange={e => update('subject', e.target.value)}
                    className={inputClass('subject')}
                  />
                  {errors.subject && <p className="text-red-500 text-[10px] mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Message *</label>
                  <textarea
                    rows={4}
                    placeholder="Type your questions or comments here..."
                    value={form.message}
                    onChange={e => update('message', e.target.value)}
                    className={inputClass('message')}
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-[10px] mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-academy-emerald text-white font-medium hover:bg-academy-emerald-hover transition-all shadow flex items-center justify-center gap-2 text-sm"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* Google Map */}
          <div className="rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm">
            <iframe
              title="MelodyAcademy Location"
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

      </div>

    </div>
  );
};
