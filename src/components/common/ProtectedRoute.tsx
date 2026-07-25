import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth, DEV_BYPASS } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  allowedRoles: ('admin' | 'learner')[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (DEV_BYPASS) return <Outlet />;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-academy-cream">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-academy-emerald border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to appropriate home based on role
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/learner" replace />;
  }

  return <Outlet />;
};
