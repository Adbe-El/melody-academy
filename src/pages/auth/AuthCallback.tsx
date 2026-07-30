import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const { hash } = window.location;

      if (hash) {
        // Magic link — Supabase handles the session from the URL hash
        const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
        if (!error) {
          navigate('/learner');
          return;
        }
      }

      // Fallback — check if user is now logged in
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profile?.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/learner');
        }
      } else {
        navigate('/auth/login');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-2 border-academy-emerald border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-gray-500">Verifying your account...</p>
      </div>
    </div>
  );
};
