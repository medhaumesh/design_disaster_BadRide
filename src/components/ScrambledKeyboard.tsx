import { useState, useEffect, useCallback } from "react";

interface Props {
  value: string;
  onChange: (val: string) => void;
  label: string;
}

const ScrambledKeyboard = ({ value, onChange, label }: Props) => {
  const [keys, setKeys] = useState<string[]>([]);
  const [capsLock, setCapsLock] = useState(false);

  const scramble = useCallback(() => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ".split("");
    for (let i = alphabet.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [alphabet[i], alphabet[j]] = [alphabet[j], alphabet[i]];
    }
    return alphabet;
  }, []);

  useEffect(() => {
    setKeys(scramble());
  }, [scramble]);

  // Re-scramble after every keypress!
  const handleKey = (key: string) => {
    const actualKey = capsLock ? key.toLowerCase() : key;
    // 10% chance the wrong letter gets typed
    if (Math.random() < 0.1) {
      const wrongKey = keys[Math.floor(Math.random() * keys.length)];
      onChange(value + (capsLock ? wrongKey.toLowerCase() : wrongKey));
    } else {
      onChange(value + actualKey);
    }
    setKeys(scramble());
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-display text-foreground">{label}</label>
      <div className="bg-card border-2 border-border rounded-lg p-3 min-h-[40px] font-body text-foreground break-all">
        {value || <span className="text-muted-foreground">Type using the keyboard below (good luck)</span>}
        <span className="animate-pulse">|</span>
      </div>
      <div className="grid grid-cols-10 gap-1">
        {keys.map((key, i) => (
          <button
            key={`${key}-${i}`}
            onClick={() => handleKey(key)}
            className="bg-muted hover:bg-primary hover:text-primary-foreground text-foreground font-body text-xs p-2 rounded border border-border transition-all active:scale-90"
            style={{
              // Random size variation
              fontSize: `${Math.random() * 6 + 10}px`,
              transform: `rotate(${Math.random() * 10 - 5}deg)`,
            }}
          >
            {key === " " ? "␣" : key}
          </button>
        ))}
      </div>
      <div className="flex gap-1">
        <button
          onClick={() => setCapsLock(!capsLock)}
          className={`px-3 py-1 rounded text-xs font-body border border-border ${
            capsLock ? "bg-cursed-pink text-primary-foreground" : "bg-muted text-foreground"
          }`}
        >
          {capsLock ? "caps lock (makes lowercase)" : "CAPS LOCK (also lowercase)"}
        </button>
        <button
          onClick={() => onChange(value.slice(0, -1))}
          className="px-3 py-1 rounded text-xs font-body bg-destructive text-destructive-foreground border border-border"
        >
          ← Backspace (deletes 1-3 chars)
        </button>
        <button
          onClick={() => {
            // Backspace actually deletes 1-3 characters
            const deleteCount = Math.floor(Math.random() * 3) + 1;
            onChange(value.slice(0, -deleteCount));
          }}
          className="px-3 py-1 rounded text-xs font-body bg-accent text-accent-foreground border border-border"
        >
          Real Backspace
        </button>
      </div>
    </div>
  );
};

export default ScrambledKeyboard;
