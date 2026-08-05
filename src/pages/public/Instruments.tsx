import React, { useState } from 'react';
import { MessageSquare, Check, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Instrument } from '../../types';
import { Reveal } from '../../components/common/Reveal';

export const Instruments: React.FC = () => {
  const { instruments, getWhatsAppUrl } = useApp();
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);

  const categories = ['All', 'Keyboard', 'Guitar', 'Strings', 'Drums & Percussion', 'Wind', 'Accessories'];

  const filteredInstruments = instruments.filter(i => {
    if (selectedCat === 'All') return true;
    return (i.category_name || '').toLowerCase().includes(selectedCat.toLowerCase());
  });

  const handleWhatsAppEnquiry = (inst: Instrument) => {
    const text = `Hi Matt-Agba Music Consult! 👋 I am interested in inquiring about purchasing the *${inst.name}* (${inst.price}). Please share availability, warranty details, and payment options.`;
    window.open(getWhatsAppUrl(text), '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

      {/* Header Banner */}
      <section className="relative bg-academy-emerald-dark rounded-3xl p-8 sm:p-12 text-white text-center space-y-4 overflow-hidden shadow-xl">
        <div className="absolute inset-0 staff-lines opacity-40" aria-hidden="true" />
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-academy-gold/20 blur-3xl" aria-hidden="true" />
        <div className="absolute inset-0 grain-overlay" aria-hidden="true" />
        <div className="relative">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/10 text-academy-gold px-3.5 py-1 rounded-full border border-white/15">
              <ShoppingBag className="w-3.5 h-3.5" /> Official Instrument Shop
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-4">
              Musical Instrument <span className="text-gradient-gold italic">Catalogue</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-gray-300 text-sm max-w-xl mx-auto">
              Browse certified pianos, guitars, violins, drum kits, and accessories — personally vetted by Matthew Agba. Enquire directly on WhatsApp for guidance, availability, and pricing.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Categories */}
      <Reveal delay={0.1}>
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCat === cat
                  ? 'bg-academy-emerald text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredInstruments.map((inst, idx) => (
          <Reveal key={inst.id} delay={(idx % 4) * 0.07}>
            <div
              className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 hover:border-academy-emerald/30 hover-lift flex flex-col justify-between p-4 h-full"
            >
              <div>
                {/* Image */}
                <div className="group relative h-48 rounded-2xl overflow-hidden bg-gray-100 mb-4">
                  <img
                    src={inst.image_url}
                    alt={inst.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute top-3 left-3 bg-academy-emerald text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                    {inst.condition}
                  </span>
                  <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${inst.availability ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                    {inst.availability ? 'In Stock' : 'Pre-order'}
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-academy-emerald">
                    {inst.category_name}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-gray-900 leading-snug line-clamp-2">
                    {inst.name}
                  </h3>
                  <p className="text-gray-600 text-xs line-clamp-2">
                    {inst.description}
                  </p>
                  <p className="text-base font-bold text-gray-900 pt-1">
                    {inst.price}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 mt-4 border-t border-gray-100 space-y-2">
                <button
                  onClick={() => handleWhatsAppEnquiry(inst)}
                  className="w-full py-2.5 rounded-full bg-academy-whatsapp hover:bg-academy-whatsapp-hover text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" /> Enquire via WhatsApp
                </button>
                <button
                  onClick={() => setSelectedInstrument(inst)}
                  className="w-full py-2 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-medium"
                >
                  View Specifications
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Specifications Modal */}
      {selectedInstrument && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-academy-cream-light max-w-lg w-full rounded-3xl p-6 sm:p-8 space-y-4 border border-white relative shadow-2xl">
            <button
              onClick={() => setSelectedInstrument(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black text-sm font-bold bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
            >
              ✕
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center font-serif text-xl font-bold">
                🎵
              </div>
              <div>
                <span className="text-xs font-bold text-academy-emerald uppercase">{selectedInstrument.category_name}</span>
                <h3 className="font-serif text-xl font-bold text-gray-900">{selectedInstrument.name}</h3>
              </div>
            </div>
            <p className="text-xs text-gray-600">{selectedInstrument.description}</p>
            <div className="p-4 bg-white rounded-2xl space-y-2 border border-gray-200/60">
              <p className="text-xs font-bold text-gray-900 uppercase">Product Specifications:</p>
              <ul className="space-y-1.5 text-xs text-gray-700">
                {selectedInstrument.specifications.map((spec, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-academy-emerald" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="font-serif text-xl font-bold text-gray-900">{selectedInstrument.price}</span>
              <button
                onClick={() => {
                  const inst = selectedInstrument;
                  setSelectedInstrument(null);
                  handleWhatsAppEnquiry(inst);
                }}
                className="px-6 py-2.5 rounded-full bg-academy-whatsapp text-white font-bold text-xs shadow hover:bg-academy-whatsapp-hover flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp Enquiry
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
