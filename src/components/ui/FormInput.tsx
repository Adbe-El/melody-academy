import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const FormInput: React.FC<FormInputProps> = ({ label, error, hint, className = '', ...props }) => {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-semibold text-gray-700 uppercase">{label}</label>
      <input
        className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-academy-emerald ${
          error ? 'border-red-400 focus:ring-red-300' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
};

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const FormSelect: React.FC<FormSelectProps> = ({ label, error, options, className = '', ...props }) => {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-semibold text-gray-700 uppercase">{label}</label>
      <select
        className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-academy-emerald ${
          error ? 'border-red-400 focus:ring-red-300' : 'border-gray-300'
        } ${className}`}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-semibold text-gray-700 uppercase">{label}</label>
      <textarea
        className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-academy-emerald resize-none ${
          error ? 'border-red-400 focus:ring-red-300' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
