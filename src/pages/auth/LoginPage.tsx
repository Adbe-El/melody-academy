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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white max-w-md w-full rounded-3xl p-8 border border-gray-200/80 shadow-xl space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-academy-emerald mx-auto flex items-center justify-center shadow-md">
            <Music className="w-6 h-6 text-academy-gold" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-academy-emerald">
            Welcome Back
          </h2>
          <p className="text-xs text-gray-500">Sign in to access your portal</p>
        </div>

        {/* Demo Login Hint */}
        <div className="bg-academy-sage/50 p-4 rounded-2xl border border-academy-sage">
          <p className="text-[11px] font-bold uppercase tracking-wider text-academy-emerald text-center mb-2">
            Demo Credentials
          </p>
          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <button
              type="button"
              onClick={() => { setEmail('learner@demo.com'); setPassword('demo1234'); }}
              className="py-2 px-2 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium hover:border-academy-emerald transition-all shadow-sm"
            >
              Learner Portal
            </button>
            <button
              type="button"
              onClick={() => { setEmail('admin@demo.com'); setPassword('demo1234'); }}
              className="py-2 px-2 rounded-xl bg-academy-emerald text-white font-medium hover:bg-academy-emerald-hover transition-all shadow-sm"
            >
              Admin Panel
            </button>
          </div>
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

        <p className="text-center text-xs text-gray-500">
          Don't have an account?{' '}
          <Link to="/auth/signup" className="text-academy-emerald font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};
