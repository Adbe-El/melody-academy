import React, { useState } from 'react';
import { Search, Filter, BookOpen, Clock, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Programme } from '../../types';

export const Programmes = () => {
  const navigate = useNavigate();
  const { programmes } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Keyboard', 'Guitar', 'Vocals', 'Drums', 'Production', 'Exam Prep'];

  const filteredProgrammes = programmes.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-academy-emerald bg-academy-sage px-3.5 py-1 rounded-full">
          Academic Catalog
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900">
          Our Music Programmes
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Explore structured curriculum designed for all ages and skill levels—from beginner foundations to advanced ABRSM diploma preparation.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-gray-200/80 shadow-sm">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-academy-emerald text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search programmes..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-academy-cream text-xs focus:outline-none focus:ring-2 focus:ring-academy-emerald"
          />
        </div>

      </div>

      {/* Programme Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProgrammes.map(prog => (
          <div
            key={prog.id}
            className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 hover:border-academy-emerald/30 hover-lift flex flex-col justify-between cursor-pointer"
            onClick={() => navigate(`/programmes/${prog.id}`)}
          >
            {/* Image Banner */}
            <div className="group relative h-52 w-full overflow-hidden bg-gray-100">
              <img
                src={prog.imageUrl}
                alt={prog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-academy-emerald text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                  {prog.category}
                </span>
                <span className="bg-white/90 backdrop-blur-md text-gray-800 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
                  {prog.level}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-academy-emerald" /> {prog.ageGroup}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-academy-emerald" /> {prog.duration}</span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-gray-900 leading-snug">
                  {prog.title}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {prog.description}
                </p>
              </div>

              {/* Syllabus Highlights */}
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <p className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">Key Syllabus Topics:</p>
                <ul className="space-y-1 text-xs text-gray-700">
                  {prog.syllabusHighlights.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-academy-emerald flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full py-3 rounded-full bg-academy-sage hover:bg-academy-emerald text-academy-emerald hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  Book Consultation <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
