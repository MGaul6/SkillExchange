import * as React from "react";
import { cn } from "@/lib/utils";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  children: React.ReactNode;
}

interface StepProps {
  stepNumber: number;
  title: string;
}

// Context for stepper state
const StepperContext = React.createContext<{ currentStep: number, totalSteps: number }>({
  currentStep: 0,
  totalSteps: 0,
});

const StepperBase = ({ currentStep, totalSteps, children }: StepperProps) => {
  return (
    <div className="flex items-center">
      {React.Children.map(children, (child, index) => {
        // Add connector line between steps
        return (
          <>
            {child}
            {index < totalSteps - 1 && (
              <div 
                className={cn(
                  "flex-auto border-t-2 transition duration-500 ease-in-out",
                  index < currentStep ? "border-primary-500" : "border-gray-300"
                )}
              ></div>
            )}
          </>
        );
      })}
    </div>
  );
};

export const Step = ({ stepNumber, title }: StepProps) => {
  // Get current step from parent context
  const parentSteps = React.useContext(StepperContext);
  const isCurrent = parentSteps.currentStep === stepNumber - 1;
  const isCompleted = parentSteps.currentStep > stepNumber - 1;

  return (
    <div className="flex items-center relative">
      <div
        className={cn(
          "step-indicator rounded-full flex items-center justify-center w-10 h-10 py-3 border-2 font-bold",
          (isCurrent || isCompleted) 
            ? "border-primary-500 bg-primary-500 text-white" 
            : "border-gray-300 bg-white text-gray-500"
        )}
      >
        {stepNumber}
      </div>
      <div
        className={cn(
          "step-label absolute top-0 -ml-6 text-xs font-medium mt-12 w-24 text-center",
          (isCurrent || isCompleted) ? "text-primary-600" : "text-gray-500"
        )}
      >
        {title}
      </div>
    </div>
  );
};

// Export the enhanced stepper that provides context
export const Stepper = ({ currentStep, totalSteps, children }: StepperProps) => {
  return (
    <StepperContext.Provider value={{ currentStep, totalSteps }}>
      <StepperBase currentStep={currentStep} totalSteps={totalSteps}>
        {children}
      </StepperBase>
    </StepperContext.Provider>
  );
};
