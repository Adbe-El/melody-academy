import React, { useState } from 'react';
import { Check } from 'lucide-react';

export interface Step {
  title: string;
  content: React.ReactNode;
}

interface MultiStepFormProps {
  steps: Step[];
  onComplete: (data: Record<string, unknown>) => void;
  className?: string;
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({ steps, onComplete, className = '' }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  const handleNext = () => {
    if (!isLast) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (!isFirst) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    onComplete({});
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < currentStep
                    ? 'bg-academy-emerald text-white'
                    : i === currentStep
                    ? 'bg-academy-emerald text-white ring-4 ring-academy-sage'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span
                className={`hidden sm:block text-xs font-medium ${
                  i <= currentStep ? 'text-academy-charcoal' : 'text-gray-400'
                }`}
              >
                {step.title}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-8 sm:w-12 h-0.5 ${
                  i < currentStep ? 'bg-academy-emerald' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step content */}
      <div className="min-h-[200px]">{steps[currentStep].content}</div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        {!isFirst ? (
          <button
            onClick={handleBack}
            className="px-6 py-2.5 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:border-academy-emerald transition-all"
          >
            Back
          </button>
        ) : (
          <div />
        )}

        {isLast ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-full bg-academy-emerald hover:bg-academy-emerald-hover text-white text-sm font-medium transition-all shadow-sm hover:shadow"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-full bg-academy-emerald hover:bg-academy-emerald-hover text-white text-sm font-medium transition-all shadow-sm hover:shadow"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};
