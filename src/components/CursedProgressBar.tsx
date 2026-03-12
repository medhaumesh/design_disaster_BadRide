import { useEffect, useState } from "react";

interface Props {
  step: number;
  totalSteps: number;
}

const CursedProgressBar = ({ step, totalSteps }: Props) => {
  const [displayProgress, setDisplayProgress] = useState(100);

  useEffect(() => {
    // Progress goes backwards and randomly jumps
    const fakeProgress = Math.max(5, 100 - (step / totalSteps) * 100 + Math.random() * 20);
    setDisplayProgress(fakeProgress);
  }, [step, totalSteps]);

  const labels = [
    "Almost done! (not really)",
    "Getting worse...",
    "Why are you still here?",
    "Just a few more steps (lies)",
    "∞ steps remaining",
    "You're going backwards!",
  ];

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-body text-muted-foreground">
          Step {totalSteps - step + 1} of {totalSteps + Math.floor(Math.random() * 3)}
        </span>
        <span className="text-sm font-body text-muted-foreground">
          {labels[step % labels.length]}
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cursed-pink via-accent to-cursed-yellow rounded-full transition-all duration-1000"
          style={{ width: `${displayProgress}%` }}
        />
      </div>
    </div>
  );
};

export default CursedProgressBar;
