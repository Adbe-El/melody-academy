import React, { useState } from 'react';
import { Music, ArrowRight, Shield, GraduationCap, User, Lock, Mail } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AuthPageProps {
  onSuccess: (targetTab: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onSuccess }) => {
  const { setUserRole } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleDemoSwitch = (role: 'visitor' | 'learner' | 'admin') => {
    setUserRole(role);
    if (role === 'learner') {
      onSuccess('lms');
    } else if (role === 'admin') {
      onSuccess('admin');
    } else {
      onSuccess('home');
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('admin')) {
      handleDemoSwitch('admin');
    } else {
      handleDemoSwitch('learner');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white max-w-md w-full rounded-3xl p-8 border border-gray-200/80 shadow-xl space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-academy-emerald text-academy-gold mx-auto flex items-center justify-center shadow-md">
            <Music className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-academy-emerald">
            Melody<span className="text-gray-900">Academy</span>
          </h2>
          <p className="text-xs text-gray-600">
            {isSignUp ? 'Create your academy account' : 'Sign in to access your LMS Portal or Admin Panel'}
          </p>
        </div>

        {/* Quick Demo Login Preset Buttons */}
        <div className="bg-academy-cream-light p-4 rounded-2xl border border-gray-200/80 space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-academy-emerald text-center">
            ⚡ Quick Demo Portal Login
          </p>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <button
              onClick={() => handleDemoSwitch('visitor')}
              className="py-2.5 px-2 rounded-xl bg-white border border-gray-200 text-gray-800 font-medium hover:border-academy-emerald hover:bg-emerald-50 transition-all flex flex-col items-center gap-1 shadow-sm"
            >
              <User className="w-4 h-4 text-academy-emerald" /> Website
            </button>
            <button
              onClick={() => handleDemoSwitch('learner')}
              className="py-2.5 px-2 rounded-xl bg-academy-emerald text-white font-medium hover:bg-academy-emerald-hover transition-all flex flex-col items-center gap-1 shadow-sm"
            >
              <GraduationCap className="w-4 h-4 text-academy-gold" /> Learner LMS
            </button>
            <button
              onClick={() => handleDemoSwitch('admin')}
              className="py-2.5 px-2 rounded-xl bg-academy-emerald text-white font-medium hover:bg-academy-emerald-hover transition-all flex flex-col items-center gap-1 shadow-sm"
            >
              <Shield className="w-4 h-4 text-academy-gold" /> Admin Back
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
              <input
                type="email"
                required
                placeholder="learner@melodyacademy.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-academy-emerald text-white font-bold text-sm shadow hover:bg-academy-emerald-hover transition-all flex items-center justify-center gap-2"
          >
            {isSignUp ? 'Create Account' : 'Sign In'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs font-semibold text-academy-emerald hover:underline"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>

      </div>
    </div>
  );
};
