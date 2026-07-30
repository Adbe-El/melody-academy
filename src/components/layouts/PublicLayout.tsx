import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../layout/Navbar';
import { Footer } from '../layout/Footer';
import { ErrorBoundary } from '../common/ErrorBoundary';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-academy-cream">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-academy-emerald focus:text-white focus:rounded-xl focus:text-sm focus:font-semibold">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};
