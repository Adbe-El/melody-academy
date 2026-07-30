import React, { useEffect, useState } from 'react';
import { FileText, Send } from 'lucide-react';
import { useLearner } from '../../context/LearnerContext';
import { assignmentsService, getAssignmentsByLearner } from '../../services/assignments';
import { EmptyState } from '../../components/ui/EmptyState';
import { Skeleton } from '../../components/ui/Skeleton';
import { useToast } from '../../components/ui/Toast';
import type { Assignment } from '../../types';

export const Assignments: React.FC = () => {
  const { learnerId, loading: learnerLoading } = useLearner();
  const { showToast } = useToast();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (learnerLoading) return;
    if (!learnerId) { setLoading(false); return; }
    getAssignmentsByLearner(learnerId)
      .then(setAssignments)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [learnerId, learnerLoading]);

  const handleSubmit = async (id: string) => {
    try {
      await assignmentsService.update(id, { status: 'submitted' });
      setAssignments(prev => prev.map(a => a.id === id ? { ...a, status: 'submitted' } : a));
      showToast('success', 'Assignment submitted!');
    } catch {
      showToast('error', 'Failed to submit. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <Skeleton variant="title" />
        <Skeleton variant="card" count={3} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">Assignments</h1>

      {assignments.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No assignments"
          description="You're all caught up!"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assignments.map(assign => (
            <div key={assign.id} className="bg-white p-6 rounded-3xl border border-gray-200/80 space-y-3 shadow-sm flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    assign.status === 'reviewed' ? 'bg-emerald-100 text-emerald-800' :
                    assign.status === 'submitted' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {assign.status.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">Due: {assign.due_date}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-gray-900">{assign.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{assign.instructions}</p>
                <div className="p-3 bg-academy-sage rounded-2xl text-xs text-academy-emerald">
                  <p className="font-bold">Tutor Feedback:</p>
                  <p>"—"</p>
                </div>
              </div>
              {assign.status === 'pending' && (
                <button
                  onClick={() => handleSubmit(assign.id)}
                  className="w-full py-2.5 rounded-full bg-academy-emerald text-white font-bold text-xs hover:bg-academy-emerald-hover transition-all shadow mt-4 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Assignment
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
