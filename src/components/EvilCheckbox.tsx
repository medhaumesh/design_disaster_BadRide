import { useState, useEffect, useRef } from "react";

interface Props {
  label: string;
  onChecked: () => void;
}

const EvilCheckbox = ({ label, onChecked }: Props) => {
  const [checked, setChecked] = useState(false);
  const [uncheckCount, setUncheckCount] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (checked && uncheckCount < 3) {
      // Uncheck itself after a random delay
      timeoutRef.current = setTimeout(() => {
        setChecked(false);
        setUncheckCount(c => c + 1);
      }, 500 + Math.random() * 1500);
    } else if (checked && uncheckCount >= 3) {
      onChecked();
    }
    return () => clearTimeout(timeoutRef.current);
  }, [checked, uncheckCount, onChecked]);

  return (
    <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        className="mt-1 w-5 h-5 accent-primary cursor-pointer"
      />
      <div>
        <p className="font-body text-sm text-foreground">{label}</p>
        {uncheckCount > 0 && uncheckCount < 3 && (
          <p className="text-xs text-destructive font-body mt-1">
            Oops! The checkbox unchecked itself! ({3 - uncheckCount} more times to go)
          </p>
        )}
        {uncheckCount >= 3 && checked && (
          <p className="text-xs text-primary font-body mt-1">
            ✓ Finally accepted (we got tired too)
          </p>
        )}
      </div>
    </div>
  );
};

export default EvilCheckbox;
