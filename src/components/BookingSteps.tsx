import { Check } from "lucide-react";

interface Props {
  currentStep: number;
  steps: string[];
}

const BookingSteps = ({ currentStep, steps }: Props) => {
  return (
    <div className="flex items-center justify-between w-full">
      {steps.map((label, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-body font-medium transition-all ${
                  isCompleted
                    ? "bg-accent text-accent-foreground"
                    : isCurrent
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {isCompleted ? <Check size={16} /> : index + 1}
              </div>
              <span
                className={`text-xs font-body mt-1.5 whitespace-nowrap ${
                  isCurrent
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 mt-[-1rem] ${
                  isCompleted ? "bg-accent" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BookingSteps;
