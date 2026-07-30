import React, { useMemo } from 'react';
import { BarChart3, Users, BookOpen, Calendar, GraduationCap } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { Skeleton } from '../../components/ui/Skeleton';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  change?: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, change, color }) => (
  <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5">
    <div className="flex items-center gap-3 mb-3">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <p className="text-xs font-medium text-gray-500">{label}</p>
    </div>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
    {change && <p className="text-[11px] text-green-600 font-medium mt-1">{change}</p>}
  </div>
);

export const Reports: React.FC = () => {
  const { programmes, learners, instructorApps, consultations, examRegistrations, loading } = useAdmin();

  const examStats = useMemo(() => ({
    total: examRegistrations.length,
    new: examRegistrations.filter(e => e.status === 'new').length,
    registered: examRegistrations.filter(e => e.status === 'registered').length,
    completed: examRegistrations.filter(e => e.status === 'completed').length,
  }), [examRegistrations]);

  const consultationStats = useMemo(() => ({
    total: consultations.length,
    new: consultations.filter(c => c.status === 'new').length,
    enrolled: consultations.filter(c => c.status === 'enrolled').length,
  }), [consultations]);

  const learnerStats = useMemo(() => ({
    total: learners.length,
    active: learners.filter(l => l.certificate_status !== 'issued').length,
    completed: learners.filter(l => l.certificate_status === 'issued').length,
    avgProgress: learners.length ? Math.round(learners.reduce((sum, l) => sum + (l.progress || 0), 0) / learners.length) : 0,
  }), [learners]);

  const instructorStats = useMemo(() => ({
    total: instructorApps.length,
    pending: instructorApps.filter(a => a.status === 'pending').length,
    accepted: instructorApps.filter(a => a.status === 'accepted').length,
  }), [instructorApps]);

  const categoryBreakdown = useMemo(() => programmes.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>), [programmes]);

  if (loading) return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-2"><Skeleton variant="table-row" count={5} /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center">
          <BarChart3 className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-serif text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-xs text-gray-500">Platform overview and key metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Users className="w-4 h-4 text-white" />} label="Total Learners" value={learnerStats.total} change={`${learnerStats.active} active`} color="bg-academy-emerald" />
        <StatCard icon={<BookOpen className="w-4 h-4 text-white" />} label="Programmes" value={programmes.length} change={`${categoryBreakdown['Keyboard'] || 0} keyboard`} color="bg-amber-500" />
        <StatCard icon={<Calendar className="w-4 h-4 text-white" />} label="Consultations" value={consultationStats.total} change={`${consultationStats.new} new`} color="bg-blue-500" />
        <StatCard icon={<GraduationCap className="w-4 h-4 text-white" />} label="Exam Registrations" value={examStats.total} change={`${examStats.completed} completed`} color="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
          <h3 className="font-serif text-lg font-bold text-gray-900 mb-4">Learner Progress</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Active Learners</span>
              <span className="text-sm font-bold text-gray-900">{learnerStats.active}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-academy-emerald h-2 rounded-full" style={{ width: `${learnerStats.total ? (learnerStats.active / learnerStats.total * 100) : 0}%` }} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Completed</span>
              <span className="text-sm font-bold text-gray-900">{learnerStats.completed}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Average Progress</span>
              <span className="text-sm font-bold text-gray-900">{learnerStats.avgProgress}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
          <h3 className="font-serif text-lg font-bold text-gray-900 mb-4">Consultation Pipeline</h3>
          <div className="space-y-3">
            {['new', 'contacted', 'scheduled', 'completed', 'enrolled'].map(status => {
              const count = consultations.filter(c => c.status === status).length;
              return (
                <div key={status} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 capitalize w-24">{status.replace('_', ' ')}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div className="bg-academy-emerald h-2 rounded-full" style={{ width: `${consultationStats.total ? (count / consultationStats.total * 100) : 0}%` }} />
                  </div>
                  <span className="text-xs font-bold text-gray-900 w-6 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
          <h3 className="font-serif text-lg font-bold text-gray-900 mb-4">Instructor Applications</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Total Applications</span>
              <span className="text-sm font-bold text-gray-900">{instructorStats.total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Pending Review</span>
              <span className="text-sm font-bold text-amber-600">{instructorStats.pending}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Accepted</span>
              <span className="text-sm font-bold text-green-600">{instructorStats.accepted}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
          <h3 className="font-serif text-lg font-bold text-gray-900 mb-4">Programme Categories</h3>
          <div className="space-y-3">
            {Object.entries(categoryBreakdown).sort((a, b) => b[1] - a[1]).map(([cat, count]) => (
              <div key={cat} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-24 truncate">{cat}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div className="bg-academy-emerald h-2 rounded-full" style={{ width: `${programmes.length ? (count / programmes.length * 100) : 0}%` }} />
                </div>
                <span className="text-xs font-bold text-gray-900 w-6 text-right">{count}</span>
              </div>
            ))}
            {Object.keys(categoryBreakdown).length === 0 && <p className="text-xs text-gray-400">No programmes yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
