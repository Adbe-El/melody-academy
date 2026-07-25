import React, { useState } from 'react';
import { Shield, GraduationCap, ChevronUp } from 'lucide-react';
import { useAuth, DEV_BYPASS } from '../../hooks/useAuth';

export const DevRoleToggle: React.FC = () => {
  const { user, setDevRole } = useAuth();
  const [expanded, setExpanded] = useState(false);

  if (!DEV_BYPASS) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {expanded && (
        <div className="mb-2 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden animate-modal-in">
          <div className="px-3 py-2 bg-amber-50 border-b border-amber-100">
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Dev Mode — Switch Role</p>
          </div>
          <div className="p-1.5 space-y-0.5">
            <button
              onClick={() => { setDevRole('admin'); setExpanded(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                user?.role === 'admin'
                  ? 'bg-academy-emerald text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Shield className="w-3.5 h-3.5" /> Admin Panel
            </button>
            <button
              onClick={() => { setDevRole('learner'); setExpanded(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                user?.role === 'learner'
                  ? 'bg-academy-emerald text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" /> Learner Portal
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-12 h-12 rounded-full bg-amber-500 text-white shadow-lg hover:bg-amber-600 transition-all flex items-center justify-center"
        title="Dev role toggle"
      >
        {expanded ? (
          <ChevronUp className="w-5 h-5" />
        ) : user?.role === 'admin' ? (
          <Shield className="w-5 h-5" />
        ) : (
          <GraduationCap className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};
