import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, ArrowRight, Sparkles, Calendar } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';
import { consultationsService } from '../../services/consultations';

type ConsultationType = 'music_lessons' | 'exams' | 'consultancy' | 'general';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consultationType: ConsultationType | '';
  programmeId: string;
  preferredDate: string;
  notes: string;
}

const initialData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  consultationType: '',
  programmeId: '',
  preferredDate: '',
  notes: '',
};

const consultationTypes: { value: ConsultationType; label: string; description: string }[] = [
  { value: 'music_lessons', label: 'Music Lessons', description: 'Individual or group instrumental/vocal lessons' },
  { value: 'exams', label: 'Professional Exams', description: 'ABRSM, Trinity, MUSON exam preparation' },
  { value: 'consultancy', label: 'Music Consultancy', description: 'School, church, or choir music programme setup' },
  { value: 'general', label: 'General Enquiry', description: 'Any other question or interest' },
];

export const ConsultationWizard: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { title: 'Personal Info' },
    { title: 'Purpose' },
    { title: 'Details' },
    { title: 'Confirmation' },
  ];

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.firstName.trim() || formData.firstName.trim().length < 2)
        newErrors.firstName = 'Name must be at least 2 characters';
      if (!formData.lastName.trim() || formData.lastName.trim().length < 2)
        newErrors.lastName = 'Name must be at least 2 characters';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = 'Please enter a valid email address';
      if (!formData.phone.trim() || formData.phone.replace(/[^0-9]/g, '').length < 10)
        newErrors.phone = 'Please enter a valid phone number';
    }

    if (step === 1) {
      if (!formData.consultationType)
        newErrors.consultationType = 'Please select a consultation type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(prev => prev + 1);
  };

  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    try {
      await consultationsService.create({
        full_name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        consultation_type: formData.consultationType,
        programme_id: formData.programmeId || null,
        preferred_date: formData.preferredDate || null,
        notes: formData.notes || null,
        status: 'new',
      } as Record<string, unknown>);
      setSubmitted(true);
    } catch {
      showToast('error', 'Failed to submit. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-academy-sage text-academy-emerald mx-auto flex items-center justify-center">
          <CheckCircle className="w-12 h-12" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-academy-emerald">
          Consultation Request Received!
        </h1>
        <p className="text-academy-muted text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          Thank you, <span className="font-semibold text-academy-charcoal">{formData.firstName}</span>. An
          academy advisor will contact you via WhatsApp/Email within 24 hours to schedule your
          personalized consultation.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 rounded-full bg-academy-emerald text-white font-medium text-sm hover:bg-academy-emerald-hover transition-all shadow"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-academy-emerald bg-academy-sage px-3.5 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" /> Expert-Led Guidance
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
          Book a Music Consultation
        </h1>
        <p className="text-gray-600 text-sm max-w-lg mx-auto">
Start with a 1-on-1 consultation so Matthew Agba can recommend the ideal programme
              tailored to your goals.
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2">
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < step
                    ? 'bg-academy-emerald text-white'
                    : i === step
                    ? 'bg-academy-emerald text-white ring-4 ring-academy-sage'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {i < step ? '✓' : i + 1}
              </div>
              <span
                className={`hidden sm:block text-xs font-medium ${
                  i <= step ? 'text-academy-charcoal' : 'text-gray-400'
                }`}
              >
                {s.title}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-8 sm:w-12 h-0.5 ${i < step ? 'bg-academy-emerald' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step content */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-soft">
        {/* Step 0: Personal Info */}
        {step === 0 && (
          <div className="space-y-5">
            <h3 className="font-serif text-xl font-bold text-gray-900">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-700 uppercase">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Jessica"
                  value={formData.firstName}
                  onChange={e => updateField('firstName', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-academy-emerald ${
                    errors.firstName ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-700 uppercase">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bennett"
                  value={formData.lastName}
                  onChange={e => updateField('lastName', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-academy-emerald ${
                    errors.lastName ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-700 uppercase">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="e.g. jessica@example.com"
                value={formData.email}
                onChange={e => updateField('email', e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-academy-emerald ${
                  errors.email ? 'border-red-400' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-700 uppercase">
                Phone / WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="+234 800 000 0000"
                value={formData.phone}
                onChange={e => updateField('phone', e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-academy-emerald ${
                  errors.phone ? 'border-red-400' : 'border-gray-300'
                }`}
              />
              {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
            </div>
          </div>
        )}

        {/* Step 1: Purpose */}
        {step === 1 && (
          <div className="space-y-5">
            <h3 className="font-serif text-xl font-bold text-gray-900">Select Purpose</h3>
            <p className="text-sm text-gray-600">What would you like to consult about?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {consultationTypes.map(type => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => updateField('consultationType', type.value)}
                  className={`text-left p-4 rounded-2xl border-2 transition-all ${
                    formData.consultationType === type.value
                      ? 'border-academy-emerald bg-academy-sage/50 shadow-sm'
                      : 'border-gray-200 hover:border-academy-emerald/30'
                  }`}
                >
                  <span className="text-sm font-bold text-gray-900">{type.label}</span>
                  <p className="text-xs text-gray-500 mt-1">{type.description}</p>
                </button>
              ))}
            </div>
            {errors.consultationType && (
              <p className="text-xs text-red-500">{errors.consultationType}</p>
            )}
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div className="space-y-5">
            <h3 className="font-serif text-xl font-bold text-gray-900">Additional Details</h3>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-700 uppercase">
                Preferred Date
              </label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={e => updateField('preferredDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-academy-emerald"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-700 uppercase">
                Notes / Questions
              </label>
              <textarea
                rows={4}
                placeholder="Tell us what you or your child hope to achieve, any schedule preferences, or questions you have..."
                value={formData.notes}
                onChange={e => updateField('notes', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-academy-emerald resize-none"
              />
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="space-y-5">
            <h3 className="font-serif text-xl font-bold text-gray-900">Confirm Your Details</h3>
            <p className="text-sm text-gray-600">Please review your information before submitting.</p>
            <div className="bg-academy-cream rounded-2xl p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Name</span>
                <span className="font-medium text-gray-900">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Email</span>
                <span className="font-medium text-gray-900">{formData.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Phone</span>
                <span className="font-medium text-gray-900">{formData.phone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Purpose</span>
                <span className="font-medium text-gray-900">
                  {consultationTypes.find(t => t.value === formData.consultationType)?.label}
                </span>
              </div>
              {formData.preferredDate && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Preferred Date</span>
                  <span className="font-medium text-gray-900">{formData.preferredDate}</span>
                </div>
              )}
              {formData.notes && (
                <div className="text-sm">
                  <span className="text-gray-500">Notes</span>
                  <p className="font-medium text-gray-900 mt-1">{formData.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {step > 0 ? (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:border-academy-emerald transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        ) : (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:border-academy-emerald transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        )}

        {step < steps.length - 1 ? (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-academy-emerald text-white text-sm font-medium hover:bg-academy-emerald-hover transition-all shadow-sm hover:shadow"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-academy-emerald text-white text-sm font-medium hover:bg-academy-emerald-hover transition-all shadow-sm hover:shadow"
          >
            <Calendar className="w-4 h-4" /> Submit Request
          </button>
        )}
      </div>

      <p className="text-center text-xs text-gray-500">
        No payment required. We will contact you to discuss options first.
      </p>
    </div>
  );
};
