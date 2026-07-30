import React, { useState } from 'react';
import { X, CheckCircle, Calendar, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultInstrument?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultInstrument = ''
}) => {
  const { addConsultation } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredInstrument: defaultInstrument || 'Keyboard & Grand Piano',
    ageGroup: 'Kids (5-12)',
    experienceLevel: 'Complete Beginner',
    goals: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addConsultation({
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      consultation_type: 'general',
      preferred_instrument: formData.preferredInstrument,
      age_group: formData.ageGroup,
      experience_level: formData.experienceLevel,
      goals: formData.goals,
    });
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      preferredInstrument: 'Keyboard & Grand Piano',
      ageGroup: 'Kids (5-12)',
      experienceLevel: 'Complete Beginner',
      goals: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-academy-cream rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-white/40 animate-modal-in">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 transition-colors shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-academy-sage text-academy-emerald mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-3xl font-bold text-academy-emerald">
              Consultation Request Received!
            </h3>
            <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-black">{formData.fullName}</span>. Matthew Agba or a team member will contact you via WhatsApp/Email within 24 hours to schedule your personalized consultation.
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-full bg-academy-emerald text-white font-medium hover:bg-academy-emerald-hover transition-all shadow"
              >
                Back to Home
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-academy-emerald bg-academy-sage px-3 py-1 rounded-full w-fit mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Academy-First Guidance
            </div>
            
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-academy-emerald">
              Book a Music Consultation
            </h3>
            <p className="text-gray-600 text-sm mt-1 mb-6">
              Start with a 1-on-1 consultation so our academy directors can recommend the ideal programme tailored to your goals.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jessica Bennett"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. jessica@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 800 000 0000"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Preferred Focus *
                  </label>
                  <select
                    value={formData.preferredInstrument}
                    onChange={e => setFormData({ ...formData, preferredInstrument: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald"
                  >
                    <option value="Keyboard & Grand Piano">Keyboard & Grand Piano</option>
                    <option value="Guitar (Acoustic / Electric)">Guitar (Acoustic / Electric)</option>
                    <option value="Vocal Performance & Technique">Vocal Performance & Technique</option>
                    <option value="Drums & Rhythm Dynamics">Drums & Rhythm Dynamics</option>
                    <option value="Violin & String Quartet">Violin & String Quartet</option>
                    <option value="ABRSM / Trinity Exam Preparation">ABRSM / Trinity Exam Preparation</option>
                    <option value="School / Church Music Consultancy">School / Church Music Consultancy</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Age Group *
                  </label>
                  <select
                    value={formData.ageGroup}
                    onChange={e => setFormData({ ...formData, ageGroup: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald"
                  >
                    <option value="Kids (5-12)">Kids (5-12)</option>
                    <option value="Teens (13-17)">Teens (13-17)</option>
                    <option value="Adults (18+)">Adults (18+)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Experience Level *
                  </label>
                  <select
                    value={formData.experienceLevel}
                    onChange={e => setFormData({ ...formData, experienceLevel: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald"
                  >
                    <option value="Complete Beginner">Complete Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Learning Goals & Schedule Preferences
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us what you or your child hope to achieve..."
                  value={formData.goals}
                  onChange={e => setFormData({ ...formData, goals: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-academy-emerald text-white font-medium hover:bg-academy-emerald-hover transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Request Free Consultation
                </button>
                <p className="text-center text-xs text-gray-500 mt-2">
                  No payment required. We will contact you to discuss options first.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
