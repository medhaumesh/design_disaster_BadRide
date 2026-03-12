import { useState, useRef } from "react";

interface Props {
  onSelected: (method: string) => void;
}

const methods = ["💳 Credit Card", "🪙 Crypto", "🐚 Seashells", "🧻 Toilet Paper", "👻 Exposure Bucks", "🎪 Circus Tickets", "🧦 Used Socks"];

const SpinToSelectPayment = ({ onSelected }: Props) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const spinCount = useRef(0);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    spinCount.current += 1;
    
    const newRotation = rotation + 720 + Math.random() * 720;
    setRotation(newRotation);
    
    setTimeout(() => {
      const index = Math.floor(Math.random() * methods.length);
      // First 2 spins always land on something absurd
      const actualIndex = spinCount.current <= 2 
        ? Math.floor(Math.random() * (methods.length - 1)) + 2 
        : index;
      setSelected(methods[actualIndex]);
      setSpinning(false);
    }, 2000);
  };

  return (
    <div className="space-y-4 text-center">
      <h3 className="font-display text-lg text-foreground">🎰 Spin to Select Payment Method!</h3>
      <p className="text-sm text-muted-foreground font-body">You don't get to choose. The wheel decides.</p>
      
      <div className="relative w-48 h-48 mx-auto">
        <div
          className="w-full h-full rounded-full border-4 border-accent bg-gradient-to-br from-cursed-pink via-cursed-yellow to-cursed-blue flex items-center justify-center"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? "transform 2s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
          }}
        >
          <span className="text-4xl">💰</span>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-2xl">▼</div>
      </div>

      {selected && (
        <div className="bg-card border-2 border-primary rounded-lg p-3">
          <p className="font-display text-foreground">Selected: {selected}</p>
          {!selected.includes("Credit") && (
            <p className="text-xs text-muted-foreground font-body mt-1">
              Don't like it? Spin again! (It probably won't be better)
            </p>
          )}
        </div>
      )}

      <div className="flex gap-2 justify-center">
        <button
          onClick={spin}
          disabled={spinning}
          className="bg-accent text-accent-foreground px-6 py-3 rounded-xl font-display text-lg disabled:opacity-50"
        >
          {spinning ? "🌀 Spinning..." : "🎰 SPIN!"}
        </button>
        {selected && (
          <button
            onClick={() => onSelected(selected)}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-display"
          >
            Accept Fate
          </button>
        )}
      </div>
    </div>
  );
};

export default SpinToSelectPayment;
