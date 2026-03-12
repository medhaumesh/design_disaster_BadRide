import { useState, useMemo } from "react";

interface Props {
  onSolved: () => void;
  label: string;
}

const MathCaptcha = ({ onSolved, label }: Props) => {
  const [answer, setAnswer] = useState("");
  const [wrong, setWrong] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const puzzle = useMemo(() => {
    // Increasingly absurd math
    const puzzles = [
      { q: "What is XVII + XXIII in Arabic numerals?", a: "40" },
      { q: "Convert 101010 from binary to decimal", a: "42" },
      { q: "What is √(1764)?", a: "42" },
      { q: "How many seconds in 0.7 minutes?", a: "42" },
      { q: "What is the answer to life, the universe, and everything?", a: "42" },
    ];
    return puzzles[Math.floor(Math.random() * puzzles.length)];
  }, []);

  const check = () => {
    setAttempts(a => a + 1);
    if (answer.trim() === puzzle.a) {
      // 30% chance it says wrong anyway
      if (Math.random() < 0.3 && attempts < 3) {
        setWrong(true);
        setAnswer("");
      } else {
        onSolved();
      }
    } else {
      setWrong(true);
      setAnswer("");
    }
  };

  return (
    <div className="bg-card border-2 border-cursed-yellow rounded-xl p-6 space-y-4">
      <h3 className="font-display text-lg text-foreground">🧮 {label}</h3>
      <p className="font-body text-foreground text-sm">{puzzle.q}</p>
      <div className="flex gap-2">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="border-2 border-input bg-background text-foreground rounded-lg px-3 py-2 font-body flex-1"
          placeholder="Your answer..."
          onKeyDown={(e) => e.key === 'Enter' && check()}
        />
        <button
          onClick={check}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-display hover:opacity-90"
        >
          Submit
        </button>
      </div>
      {wrong && (
        <p className="text-destructive font-body text-sm animate-shake">
          ❌ Wrong! {attempts > 2 ? "(or maybe right, who knows?)" : "Try again!"}
        </p>
      )}
      {attempts > 0 && (
        <p className="text-muted-foreground text-xs font-body">
          Attempts: {attempts} | Average solve time: {Math.floor(Math.random() * 300) + 60} seconds
        </p>
      )}
    </div>
  );
};

export default MathCaptcha;
