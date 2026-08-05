import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Music, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { signIn, getUserProfile } from '../../services/auth';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error: authError } = await signIn(email, password);

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Get user profile to determine role
    const userId = data?.user?.id;
    if (!userId) {
      setError('Login succeeded but user data is missing. Please try again.');
      setLoading(false);
      return;
    }
    const { data: profile } = await getUserProfile(userId);

    if (profile?.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/learner');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-5 rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white">

        {/* Left — brand panel */}
        <div className="relative md:col-span-2 bg-academy-emerald-dark p-8 sm:p-10 text-white flex flex-col justify-between gap-8 overflow-hidden">
          <div className="absolute inset-0 staff-lines opacity-40" aria-hidden="true" />
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-academy-gold/20 blur-3xl" aria-hidden="true" />
          <div className="absolute inset-0 grain-overlay" aria-hidden="true" />
          <div className="relative">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-10 h-10 rounded-xl bg-academy-gold text-academy-emerald-dark flex items-center justify-center shadow-md">
                <Music className="w-5 h-5" />
              </span>
              <div className="text-left">
                <p className="font-serif font-bold text-white leading-tight">Matt-Agba</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-academy-gold font-semibold">Music Consult</p>
              </div>
            </div>
          </div>
          <div className="relative space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-snug">
              Welcome back to your <span className="text-gradient-gold italic">learning space</span>
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Track lessons, assignments, resources and certificates — all in one place.
            </p>
          </div>
          <p className="relative text-[11px] text-gray-400 font-medium">
            ABRSM · Trinity College London · ISoM London
          </p>
        </div>

        {/* Right — form card */}
        <div className="md:col-span-3 bg-white p-8 sm:p-10 space-y-6">
          {/* Brand (mobile only) */}
          <div className="text-center space-y-2 md:hidden">
            <div className="w-12 h-12 rounded-full bg-academy-emerald mx-auto flex items-center justify-center shadow-md">
              <Music className="w-6 h-6 text-academy-gold" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-academy-emerald">
              Welcome Back
            </h2>
            <p className="text-xs text-gray-500">Sign in to access your portal</p>
          </div>

          {/* Brand (desktop) */}
          <div className="hidden md:block text-center space-y-1">
            <h2 className="font-serif text-3xl font-bold text-academy-emerald">
              Welcome Back
            </h2>
            <p className="text-xs text-gray-500">Sign in to access your portal</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-200">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-700 uppercase">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-700 uppercase">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <Link to="/auth/forgot-password" className="text-xs text-academy-emerald hover:underline font-medium">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-academy-emerald text-white font-medium text-sm hover:bg-academy-emerald-hover shadow-sm hover:shadow transition-all disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400">
            Contact your administrator for account access.
          </p>
        </div>
      </div>
    </div>
  );
};
