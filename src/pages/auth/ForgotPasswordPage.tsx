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

  if (sent) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="bg-white max-w-md w-full rounded-3xl p-8 border border-gray-200/80 shadow-xl text-center space-y-4">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-academy-emerald">Check Your Email</h2>
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
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white max-w-md w-full rounded-3xl p-8 border border-gray-200/80 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-academy-emerald mx-auto flex items-center justify-center shadow-md">
            <Music className="w-6 h-6 text-academy-gold" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-academy-emerald">Forgot Password?</h2>
          <p className="text-xs text-gray-500">Enter your email and we'll send you a reset link</p>
        </div>

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
      </div>
    </div>
  );
};
