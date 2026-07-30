import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  Music, LayoutDashboard, BookOpen, Users, Briefcase, Calendar,
  GraduationCap, Package, BookOpenCheck, Globe, BarChart3, Settings,
  LogOut, Menu, X
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { signOut } from '../../services/auth';
import { ErrorBoundary } from '../common/ErrorBoundary';

const sidebarLinks = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/programmes', icon: BookOpen, label: 'Programmes' },
  { to: '/admin/learners', icon: Users, label: 'Learners' },
  { to: '/admin/instructors', icon: Briefcase, label: 'Instructors' },
  { to: '/admin/bookings', icon: Calendar, label: 'Bookings' },
  { to: '/admin/exams', icon: GraduationCap, label: 'Exams' },
  { to: '/admin/instruments', icon: Package, label: 'Instruments' },
  { to: '/admin/lms', icon: BookOpenCheck, label: 'LMS Content' },
  { to: '/admin/content', icon: Globe, label: 'Website CMS' },
  { to: '/admin/reports', icon: BarChart3, label: 'Reports' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

export const AdminLayout: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-academy-emerald-dark flex-col fixed h-full">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
              <Music className="w-4 h-4 text-academy-gold" />
            </div>
            <span className="font-serif text-lg font-bold text-white">
              Matt-Agba Music Consult
            </span>
          </Link>
          <p className="text-[10px] text-white/40 uppercase tracking-wider mt-2 font-semibold">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">
          {sidebarLinks.map(link => {
            const isActive = link.end ? location.pathname === link.to : location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-academy-gold">
              {user?.fullName?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user?.fullName || 'Admin'}</p>
              <p className="text-[10px] text-white/40 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-medium text-white/50 hover:text-red-400 hover:bg-white/5 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 bg-academy-emerald-dark px-4 py-3 flex items-center gap-3">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-white/10 text-white" aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}>
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
            <Music className="w-3.5 h-3.5 text-academy-gold" />
          </div>
          <span className="font-serif text-sm font-bold text-white">Admin Panel</span>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/40" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed top-0 left-0 z-30 h-full w-64 bg-academy-emerald-dark transform transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <nav className="p-4 pt-20 space-y-0.5">
          {sidebarLinks.map(link => {
            const isActive = link.end ? location.pathname === link.to : location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 pt-14 lg:pt-0">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </div>
    </div>
  );
};
