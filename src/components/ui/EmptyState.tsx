import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="font-serif text-xl font-bold text-academy-charcoal">{title}</h3>
      <p className="text-sm text-academy-muted max-w-sm">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-2 px-6 py-2.5 rounded-full bg-academy-emerald hover:bg-academy-emerald-hover text-white text-sm font-medium transition-all"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
