import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Mail, Phone, MapPin, Globe, Share2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { whatsappNumber } = useApp();

  return (
    <footer className="bg-academy-emerald-dark text-white pt-16 pb-12 border-t border-academy-emerald-hover">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-academy-gold">
                <Music className="w-5 h-5" />
              </div>
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-white">
                Matt-Agba Music Consult
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              Empowering the next generation of musicians through expert piano education, professional exam preparation, consultancy, and global opportunities — founded by Matthew Agba, a distinguished pianist and educator with 25+ years of experience.
            </p>
            <div className="pt-2 flex items-center space-x-3 text-gray-400">
              <span className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-academy-gold">
                <Globe className="w-4 h-4" />
              </span>
              <span className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-academy-gold">
                <Share2 className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Column 1: Explore */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-academy-gold">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/programmes" className="hover:text-white transition-colors">Music Programmes</Link></li>
              <li><Link to="/instruments" className="hover:text-white transition-colors">Buy Instruments</Link></li>
              <li><Link to="/exam-prep" className="hover:text-white transition-colors">Exam Preparation</Link></li>
              <li><Link to="/consultancy" className="hover:text-white transition-colors">School & Church Consultancy</Link></li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-academy-gold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-white transition-colors">About Matthew Agba</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Book Consultation</Link></li>
              <li><Link to="/learner" className="hover:text-white transition-colors">Learner LMS Portal</Link></li>
              <li><Link to="/apply-instructor" className="hover:text-white transition-colors">Apply as Instructor</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-academy-gold">Contact & Help</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-academy-gold mt-0.5 flex-shrink-0" />
                <span>Lagos, Nigeria (contact for exact location)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-academy-gold flex-shrink-0" />
                <span>{whatsappNumber}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-academy-gold flex-shrink-0" />
                <span>mattagbamusicconsult@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} Matt-Agba Music Consult. All rights reserved. Professional Music Training & Consultancy.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Safety & Trust</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
