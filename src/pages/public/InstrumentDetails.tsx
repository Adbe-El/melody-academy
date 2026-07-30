import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Check, X, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const InstrumentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { instruments, getWhatsAppUrl } = useApp();

  const instrument = instruments.find(i => i.id === id);

  if (!instrument) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
        <p className="text-gray-500 text-lg">Instrument not found.</p>
        <button
          onClick={() => navigate('/instruments')}
          className="px-6 py-2.5 rounded-full bg-academy-emerald text-white text-sm font-semibold hover:bg-academy-emerald-hover transition-all"
        >
          Back to Instruments
        </button>
      </div>
    );
  }

  const related = instruments
    .filter(i => i.category_name === instrument.category_name && i.id !== instrument.id)
    .slice(0, 3);

  const handleWhatsAppEnquiry = () => {
    const text = `Hi Matt-Agba Music Consult! 👋 I am interested in inquiring about purchasing the *${instrument.name}* (${instrument.price}). Please share availability, warranty details, and payment options.`;
    window.open(getWhatsAppUrl(text), '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <button onClick={() => navigate('/')} className="hover:text-academy-emerald transition-colors">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => navigate('/instruments')} className="hover:text-academy-emerald transition-colors">
          Instruments
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 font-medium truncate max-w-[200px]">{instrument.name}</span>
      </nav>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-academy-emerald transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Main Content — Two Column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">

        {/* Left — Image */}
        <div className="relative rounded-3xl overflow-hidden bg-gray-100 aspect-square">
          <img
            src={instrument.image_url}
            alt={instrument.name}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-4 left-4 bg-academy-emerald text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
            {instrument.condition}
          </span>
        </div>

        {/* Right — Details */}
        <div className="flex flex-col justify-center space-y-6">

          {/* Category Badge */}
          <span className="text-xs font-bold uppercase tracking-wider text-academy-emerald bg-academy-sage self-start px-3 py-1 rounded-full">
            {instrument.category_name}
          </span>

          {/* Name */}
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            {instrument.name}
          </h1>

          {/* Condition Badge */}
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
              instrument.condition === 'Brand New'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              {instrument.condition === 'Brand New' ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Check className="w-3.5 h-3.5" />
              )}
              {instrument.condition}
            </span>
          </div>

          {/* Price */}
          <p className="font-serif text-3xl font-bold text-gray-900">
            {instrument.price}
          </p>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed">
            {instrument.description}
          </p>

          {/* Specifications */}
          {instrument.specifications.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200/80 p-5 space-y-3">
              <p className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                Product Specifications
              </p>
              <ul className="space-y-2">
                {instrument.specifications.map((spec, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-academy-emerald flex-shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Availability */}
          <div>
            {instrument.availability ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
                <Check className="w-3.5 h-3.5" /> In Stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-3 py-1.5 rounded-full">
                <X className="w-3.5 h-3.5" /> Out of Stock
              </span>
            )}
          </div>

          {/* WhatsApp Enquiry */}
          <button
            onClick={handleWhatsAppEnquiry}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-academy-whatsapp hover:bg-academy-whatsapp-hover text-white text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <MessageCircle className="w-5 h-5" /> Enquire via WhatsApp
          </button>

        </div>
      </div>

      {/* Related Instruments */}
      {related.length > 0 && (
        <section className="space-y-6 pt-8 border-t border-gray-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-academy-emerald">
              Related Instruments
            </span>
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              More in {instrument.category_name}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map(rel => (
              <div
                key={rel.id}
                onClick={() => navigate(`/instruments/${rel.id}`)}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 p-4 hover-lift cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-gray-100 mb-3">
                    <img src={rel.image_url} alt={rel.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-academy-emerald text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                      {rel.condition}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-academy-emerald">{rel.category_name}</p>
                  <h4 className="font-serif text-base font-bold text-gray-900 line-clamp-1">{rel.name}</h4>
                  <p className="text-sm font-bold text-gray-900 mt-1">{rel.price}</p>
                </div>
                <div className="pt-3 mt-3 border-t border-gray-100">
                  <button className="w-full py-2 rounded-full bg-academy-whatsapp hover:bg-academy-whatsapp-hover text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5" /> Enquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
