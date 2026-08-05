import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Music, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { resetPassword } from '../../services/auth';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: authError } = await resetPassword(email);

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  };

  const brandPanel = (
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
          Never miss a <span className="text-gradient-gold italic">lesson</span>
        </h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Reset your password and get straight back to your lessons, assignments and progress.
        </p>
      </div>
      <p className="relative text-[11px] text-gray-400 font-medium">
        ABRSM · Trinity College London · ISoM London
      </p>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-5 rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white">

        {brandPanel}

        <div className="md:col-span-3 bg-white p-8 sm:p-10 space-y-6">
          <div className="text-center space-y-2 md:hidden">
            <div className="w-12 h-12 rounded-full bg-academy-emerald mx-auto flex items-center justify-center shadow-md">
              <Music className="w-6 h-6 text-academy-gold" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-academy-emerald">Forgot Password?</h2>
            <p className="text-xs text-gray-500">Enter your email and we'll send you a reset link</p>
          </div>

          <div className="hidden md:block text-center space-y-1">
            <h2 className="font-serif text-3xl font-bold text-academy-emerald">Forgot Password?</h2>
            <p className="text-xs text-gray-500">Enter your email and we'll send you a reset link</p>
          </div>

          {sent ? (
            <div className="text-center space-y-4 pt-2">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-academy-emerald">Check Your Email</h3>
              <p className="text-sm text-gray-500">
                We've sent a password reset link to <strong>{email}</strong>.
              </p>
              <Link
                to="/auth/login"
                className="inline-flex items-center gap-2 text-sm text-academy-emerald font-semibold hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-200">
                  {error}
                </div>
              )}

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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-full bg-academy-emerald text-white font-medium text-sm hover:bg-academy-emerald-hover shadow-sm hover:shadow transition-all disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>

              <Link
                to="/auth/login"
                className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-academy-emerald transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
