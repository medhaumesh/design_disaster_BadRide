import { useState } from "react";

interface Props {
  onConfirmed: () => void;
}

const questions = [
  "Are you sure you want to book this ride?",
  "Are you REALLY sure?",
  "Like, absolutely positively sure?",
  "Have you considered walking instead?",
  "Last chance to reconsider your life choices...",
  "OK but are you sure you're sure?",
  "Your therapist would want you to think about this.",
  "Final question (we promise) (we're lying): Confirm?",
];

const ConfirmationHell = ({ onConfirmed }: Props) => {
  const [currentQ, setCurrentQ] = useState(0);

  const handleYes = () => {
    if (currentQ >= questions.length - 1) {
      onConfirmed();
    } else {
      // Sometimes pressing Yes goes back
      if (Math.random() < 0.2 && currentQ > 1) {
        setCurrentQ(currentQ - 1);
      } else {
        setCurrentQ(currentQ + 1);
      }
    }
  };

  const handleNo = () => {
    // No always advances (the trick!)
    if (currentQ >= questions.length - 1) {
      onConfirmed();
    } else {
      setCurrentQ(currentQ + 1);
    }
  };

  return (
    <div className="bg-card border-2 border-border rounded-xl p-6 text-center space-y-4 max-w-md mx-auto">
      <div className="text-4xl mb-2">🤔</div>
      <h3 className="font-display text-xl text-foreground">
        {questions[currentQ]}
      </h3>
      <p className="text-xs text-muted-foreground font-body">
        Dialog {currentQ + 1} of {questions.length} (or is it?)
      </p>
      <div className="flex gap-4 justify-center">
        <button
          onClick={handleYes}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-display"
        >
          {Math.random() > 0.5 ? "Yes" : "No"} {/* Labels randomly swap */}
        </button>
        <button
          onClick={handleNo}
          className="bg-secondary text-secondary-foreground px-6 py-2 rounded-lg font-display"
        >
          {Math.random() > 0.5 ? "No" : "Yes"}
        </button>
      </div>
    </div>
  );
};

export default ConfirmationHell;
