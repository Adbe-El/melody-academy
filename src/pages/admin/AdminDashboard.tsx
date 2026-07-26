import React from 'react';
import { Shield, Calendar, Users, Briefcase, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useAdmin } from '../../context/AdminContext';
import { Skeleton } from '../../components/ui/Skeleton';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { consultations, instructorApps, programmes, learners, loading } = useAdmin();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Skeleton variant="stat-card" count={4} />
        <Skeleton variant="card" count={2} />
      </div>
    );
  }

  const newConsultations = consultations.filter(c => c.status === 'new').length;
  const pendingApps = instructorApps.filter(a => a.status === 'pending' || a.status === 'under_review').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-academy-emerald rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/10 text-academy-gold px-3.5 py-1 rounded-full text-xs font-semibold border border-white/10">
            <Shield className="w-4 h-4" /> Administrative Portal
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">Academy Management</h1>
          <p className="text-gray-300 text-xs sm:text-sm">
            Welcome back, {user?.fullName || 'Admin'}. Here's your academy overview.
          </p>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <p className="text-xs text-gray-500 font-semibold uppercase">Consultations</p>
          <p className="font-serif text-3xl font-bold text-gray-900">{consultations.length}</p>
          <span className="text-[11px] text-amber-700 font-medium">{newConsultations} new — needs follow-up</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <p className="text-xs text-gray-500 font-semibold uppercase">Enrolled Learners</p>
          <p className="font-serif text-3xl font-bold text-gray-900">{learners.length}</p>
          <span className="text-[11px] text-emerald-700 font-medium">LMS access active</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
          <p className="text-xs text-gray-500 font-semibold uppercase">Tutor Applications</p>
          <p className="font-serif text-3xl font-bold text-gray-900">{instructorApps.length}</p>
          <span className="text-[11px] text-amber-700 font-medium">{pendingApps} under review</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200/80 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <p className="text-xs text-gray-500 font-semibold uppercase">Programmes</p>
          <p className="font-serif text-3xl font-bold text-gray-900">{programmes.length}</p>
          <span className="text-[11px] text-emerald-700 font-medium">Catalogue active</span>
        </div>
      </div>

      {/* Recent Consultations */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/80 space-y-4 shadow-sm">
        <h3 className="font-serif text-xl font-bold text-gray-900">Recent Consultation Requests</h3>
        {consultations.length === 0 ? (
          <p className="text-sm text-gray-500 py-4 text-center">No consultations yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-academy-sage text-academy-charcoal font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3">Applicant</th>
                  <th className="p-3">Focus</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {consultations.slice(0, 5).map(c => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="p-3 font-semibold text-gray-900">{c.fullName}</td>
                    <td className="p-3">{c.preferredInstrument}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        c.status === 'new' ? 'bg-amber-100 text-amber-800' :
                        c.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                        c.status === 'completed' || c.status === 'enrolled' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3 text-gray-500">{c.createdAt?.split('T')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
