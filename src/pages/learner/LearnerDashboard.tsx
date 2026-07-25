import React, { useEffect, useState } from 'react';
import { GraduationCap, BookOpen, Award, Bell } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLearner } from '../../context/LearnerContext';
import { getLessonNotesByLearner } from '../../services/lessonNotes';
import { getAssignmentsByLearner } from '../../services/assignments';
import { announcementsService } from '../../services/announcements';
import { getCertificatesByLearner } from '../../services/certificates';
import { Skeleton } from '../../components/ui/Skeleton';
import type { LessonNote, Assignment, Announcement, Certificate } from '../../types';

export const LearnerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { learner, loading: learnerLoading } = useLearner();
  const [notes, setNotes] = useState<LessonNote[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (learnerLoading || !learner) { if (!learnerLoading) setLoading(false); return; }
    Promise.all([
      getLessonNotesByLearner(learner.id),
      getAssignmentsByLearner(learner.id),
      announcementsService.getAll(),
      getCertificatesByLearner(learner.id),
    ])
      .then(([n, a, an, c]) => { setNotes(n); setAssignments(a); setAnnouncements(an); setCerts(c); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [learner, learnerLoading]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Skeleton variant="card" count={2} />
      </div>
    );
  }

  const latestNote = notes[0];
  const pendingAssignments = assignments.filter(a => a.status === 'pending');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-academy-emerald rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/10 text-academy-gold px-3.5 py-1 rounded-full text-xs font-semibold border border-white/10">
            <GraduationCap className="w-4 h-4" /> Enrolled Learner Portal
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">
            Welcome back, {user?.fullName || 'Learner'}!
          </h1>
          {learner && (
            <p className="text-gray-300 text-xs sm:text-sm">
              Enrolled Programme: <span className="font-semibold text-white">{learner.programmeTitle}</span>
            </p>
          )}
        </div>
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center min-w-[200px]">
          <p className="text-xs text-gray-300 uppercase tracking-wider font-semibold">Course Progress</p>
          <p className="font-serif text-3xl font-bold text-academy-gold">{learner?.progressPercentage ?? 0}%</p>
          <div className="w-full bg-white/20 h-2 rounded-full mt-2 overflow-hidden">
            <div className="bg-academy-gold h-full rounded-full" style={{ width: `${learner?.progressPercentage ?? 0}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Latest Lesson Note */}
          {latestNote && (
            <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-academy-emerald bg-academy-sage px-3 py-1 rounded-full">
                  Latest Lesson Note
                </span>
                <span className="text-xs text-gray-500 font-medium">{latestNote.dateAssigned}</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-gray-900">{latestNote.title}</h3>
              <p className="text-xs text-gray-700 font-semibold">Topic: {latestNote.topic}</p>
              <p className="text-xs text-gray-600 leading-relaxed bg-academy-cream-light p-4 rounded-2xl border border-gray-200/60">
                {latestNote.content}
              </p>
              <div className="p-4 bg-academy-sage rounded-2xl space-y-1 text-academy-emerald">
                <p className="text-xs font-bold uppercase">Practice Goal for Next Session:</p>
                <p className="text-xs">{latestNote.practiceGoals}</p>
              </div>
            </div>
          )}

          {/* Pending Assignments */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-4">
            <h3 className="font-serif text-xl font-bold text-gray-900">Current Homework & Assignments</h3>
            {pendingAssignments.length === 0 ? (
              <p className="text-sm text-gray-500 py-4 text-center">No pending assignments. You're all caught up!</p>
            ) : (
              <div className="space-y-3">
                {pendingAssignments.map(assign => (
                  <div key={assign.id} className="p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-academy-cream-light">
                    <div>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        PENDING
                      </span>
                      <h4 className="font-bold text-sm text-gray-900 mt-1">{assign.title}</h4>
                      <p className="text-xs text-gray-600">{assign.description}</p>
                      <p className="text-[11px] text-gray-500 mt-1">Due: {assign.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-gray-200/80 text-center shadow-sm">
              <BookOpen className="w-5 h-5 text-academy-emerald mx-auto mb-1" />
              <p className="font-serif text-xl font-bold text-gray-900">{notes.length}</p>
              <p className="text-[10px] text-gray-500 uppercase font-semibold">Lesson Notes</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-200/80 text-center shadow-sm">
              <Award className="w-5 h-5 text-academy-gold mx-auto mb-1" />
              <p className="font-serif text-xl font-bold text-gray-900">{certs.length}</p>
              <p className="text-[10px] text-gray-500 uppercase font-semibold">Certificates</p>
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-academy-cream-light p-6 rounded-3xl border border-black/5 space-y-4">
            <h3 className="font-serif text-xl font-bold text-gray-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-academy-emerald" /> Announcements
            </h3>
            {announcements.length === 0 ? (
              <p className="text-xs text-gray-500">No announcements yet.</p>
            ) : (
              <div className="space-y-4">
                {announcements.slice(0, 3).map(ann => (
                  <div key={ann.id} className="bg-white p-4 rounded-2xl border border-gray-200/80 space-y-1 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-academy-emerald uppercase">{ann.date}</span>
                      {ann.important && (
                        <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Important</span>
                      )}
                    </div>
                    <h4 className="font-serif text-sm font-bold text-gray-900">{ann.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{ann.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
