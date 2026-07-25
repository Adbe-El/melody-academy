import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getCurrentUser,
  onAuthStateChange,
  signIn as authSignIn,
  signUp as authSignUp,
  signOut as authSignOut,
  resetPassword as authResetPassword,
  type AuthUser
} from '../services/auth';

export const DEV_BYPASS = import.meta.env.VITE_DEV_BYPASS_AUTH === 'true';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: typeof authSignIn;
  signUp: typeof authSignUp;
  signOut: () => Promise<void>;
  resetPassword: typeof authResetPassword;
  refreshUser: () => Promise<void>;
  setDevRole: (role: 'admin' | 'learner') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEV_USERS: Record<'admin' | 'learner', AuthUser> = {
  admin: { id: 'dev-admin', email: 'admin@demo.com', fullName: 'Dev Admin', role: 'admin', avatarUrl: null, phone: null },
  learner: { id: 'dev-learner', email: 'learner@demo.com', fullName: 'Dev Learner', role: 'learner', avatarUrl: null, phone: null },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(DEV_BYPASS ? DEV_USERS.admin : null);
  const [loading, setLoading] = useState(!DEV_BYPASS);

  const setDevRole = useCallback((role: 'admin' | 'learner') => {
    setUser(DEV_USERS[role]);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    if (DEV_BYPASS) return;

    getCurrentUser().then(u => {
      setUser(u);
      setLoading(false);
    });

    const { data: { subscription } } = onAuthStateChange(async (supabaseUser) => {
      if (supabaseUser) {
        await refreshUser();
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [refreshUser]);

  const signOut = useCallback(async () => {
    if (DEV_BYPASS) { setUser(null); return; }
    await authSignOut();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn: authSignIn,
      signUp: authSignUp,
      signOut,
      resetPassword: authResetPassword,
      refreshUser,
      setDevRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
