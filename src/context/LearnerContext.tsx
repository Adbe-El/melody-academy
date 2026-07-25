import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getLearnerByUserId } from '../services/learners';
import type { Learner } from '../types';

interface LearnerContextType {
  learner: Learner | null;
  learnerId: string | null;
  loading: boolean;
}

const LearnerContext = createContext<LearnerContextType>({ learner: null, learnerId: null, loading: true });

export const LearnerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [learner, setLearner] = useState<Learner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    getLearnerByUserId(user.id)
      .then(setLearner)
      .catch(() => setLearner(null))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <LearnerContext.Provider value={{ learner, learnerId: learner?.id ?? null, loading }}>
      {children}
    </LearnerContext.Provider>
  );
};

export function useLearner() {
  return useContext(LearnerContext);
}
