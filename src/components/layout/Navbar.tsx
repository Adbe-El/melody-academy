import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Music, Menu, X, LogIn } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/about', label: 'About' },
    { to: '/programmes', label: 'Courses' },
    { to: '/instruments', label: 'Instruments' },
    { to: '/exam-prep', label: 'Exam Prep' },
    { to: '/consultancy', label: 'Consultancy' },
    { to: '/contact?purpose=general', label: 'Contact Us' },
    { to: '/apply-instructor', label: 'Join as Tutor' },
  ];

  const isActive = (path: string) => {
    const clean = path.split('?')[0];
    if (clean === '/') return location.pathname === '/';
    return location.pathname.startsWith(clean);
  };

  const handlePortalClick = () => {
    if (!user) {
      navigate('/auth/login');
    } else if (user.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/learner');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-academy-cream/90 backdrop-blur-md border-b border-black/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-academy-emerald flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Music className="w-5 h-5 text-academy-gold" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-academy-emerald">
              Matt-Agba Music Consult
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'bg-academy-sage text-academy-emerald font-semibold'
                    : 'text-gray-700 hover:text-academy-emerald hover:bg-black/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePortalClick}
                  className="px-4 py-2 rounded-full bg-academy-sage text-academy-emerald text-sm font-medium hover:bg-academy-sage-dark transition-all"
                >
                  {user.role === 'admin' ? 'Admin Panel' : 'My Portal'}
                </button>
                <button
                  onClick={() => { signOut(); navigate('/'); }}
                  className="text-xs text-gray-500 hover:text-red-600 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-academy-emerald transition-colors flex items-center gap-1.5"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-black/5"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`lg:hidden bg-academy-cream border-b border-gray-200 px-4 pt-2 pb-6 space-y-3 overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 border-b-0'}`}>
        <div className="flex flex-col space-y-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-xl text-base font-medium ${
                isActive(link.to) ? 'bg-academy-sage text-academy-emerald font-semibold' : 'text-gray-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="pt-3 border-t border-gray-200 flex flex-col gap-2">
          {user ? (
            <>
              <button
                onClick={() => { handlePortalClick(); setMobileMenuOpen(false); }}
                className="w-full py-3 rounded-full bg-academy-emerald text-white font-medium text-center shadow"
              >
                {user.role === 'admin' ? 'Admin Panel' : 'My Portal'}
              </button>
              <button
                onClick={() => { signOut(); navigate('/'); setMobileMenuOpen(false); }}
                className="w-full py-2 text-sm text-gray-500 hover:text-red-600 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-academy-emerald text-white font-medium text-center shadow"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
