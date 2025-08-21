import React from 'react';
import { Check } from 'lucide-react';
import '../styles/ProgressStepper.css';

// Props:
// - steps: [{ id: number, label: string }]
// - current: number (1-based index of active step)
// - className?: string
export function ProgressStepper({ steps = [], current = 1, className = '', onStepClick }) {
  const normalized = steps.map((s) => ({
    ...s,
    completed: s.id < current,
    active: s.id === current,
  }));

  return (
    <div className={`progress-stepper d-flex align-items-center justify-content-center mb-4 ${className}`}>
      {normalized.map((step, index) => (
        <div key={step.id} className="d-flex align-items-center">
          <button
            type="button"
            className="d-flex flex-column align-items-center bg-transparent border-0 p-0"
            style={{ cursor: onStepClick ? 'pointer' : 'default' }}
            onClick={onStepClick ? () => onStepClick(step.id) : undefined}
            aria-current={step.active ? 'step' : undefined}
          >
            <div className={`progress-step ${step.completed ? 'completed' : step.active ? 'active' : 'inactive'}`}>
              {step.completed ? <Check size={18} /> : <span>{String(step.id).padStart(2, '0')}</span>}
            </div>
            <span className={`mt-2 small fw-medium ${step.completed || step.active ? 'text-dark' : 'text-muted'}`}>
              {step.label}
            </span>
          </button>
          {index < normalized.length - 1 && (
            <div className={`progress-line ${step.completed ? 'completed' : 'inactive'}`} />
          )}
        </div>
      ))}
    </div>
  );
}