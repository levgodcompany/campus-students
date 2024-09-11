// ProgressStepper.tsx
// import React, { useState } from 'react';
import styles from './ProgressStepper.module.css'; // Asegúrate de crear este archivo CSS

interface Step {
  id: number;
  label: string;
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({ steps, currentStep, onStepChange }) => {
  return (
    <div className={styles.stepper}>
      <div className={styles.steps}>
        {steps.map((step) => (
          <div
            key={step.id}
            className={`${styles.step} ${currentStep === step.id ? styles.active : ''}`}
            onClick={() => onStepChange(step.id)}
          >
            <div className={styles.stepNumber}>{step.id}</div>
            <div className={styles.stepLabel}>{step.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressStepper;
