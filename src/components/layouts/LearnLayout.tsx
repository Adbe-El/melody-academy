import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Music, BookOpen, FileText, Award, FolderOpen, LogOut, Menu, X, Home, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { signOut } from '../../services/auth';

const sidebarLinks = [
  { to: '/learner', icon: Home, label: 'Dashboard', end: true },
  { to: '/learner/lessons', icon: BookOpen, label: 'Lesson Notes' },
  { to: '/learner/assignments', icon: FileText, label: 'Assignments' },
  { to: '/learner/resources', icon: FolderOpen, label: 'Resources' },
  { to: '/learner/certificates', icon: Award, label: 'Certificates' },
  { to: '/learner/profile', icon: User, label: 'Profile' },
];

export const LearnLayout: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex bg-academy-cream">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col fixed h-full">
        <div className="p-6 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-academy-emerald flex items-center justify-center">
              <Music className="w-4 h-4 text-academy-gold" />
            </div>
            <span className="font-serif text-lg font-bold text-academy-emerald">
              Melody<span className="text-gray-800">Academy</span>
            </span>
          </Link>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-2 font-semibold">Learner Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map(link => {
            const isActive = link.end ? location.pathname === link.to : location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-academy-sage text-academy-emerald'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-academy-emerald'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-academy-sage flex items-center justify-center text-xs font-bold text-academy-emerald">
              {user?.fullName?.charAt(0) || 'L'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-800 truncate">{user?.fullName || 'Learner'}</p>
              <p className="text-[10px] text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-lg hover:bg-gray-100">
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-academy-emerald flex items-center justify-center">
            <Music className="w-3.5 h-3.5 text-academy-gold" />
          </div>
          <span className="font-serif text-sm font-bold text-academy-emerald">Learner Portal</span>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/30" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed top-0 left-0 z-30 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-gray-100">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Learner Portal</p>
        </div>
        <nav className="p-4 space-y-1">
          {sidebarLinks.map(link => {
            const isActive = link.end ? location.pathname === link.to : location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-academy-sage text-academy-emerald'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-academy-emerald'
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
        <Outlet />
      </div>
    </div>
  );
};
