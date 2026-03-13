import { useState, useRef, useEffect } from "react";
import { MapPin, Search } from "lucide-react";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: "pickup" | "dropoff";
}

const suggestions = [
  "Kempegowda International Airport, Devanahalli",
  "Majestic Bus Station, Bengaluru",
  "Koramangala, 4th Block",
  "Indiranagar, 100 Feet Road",
  "Whitefield, ITPL Main Road",
  "Electronic City, Phase 1",
  "MG Road, Brigade Road Junction",
  "Jayanagar, 4th Block",
  "HSR Layout, Sector 1",
  "Hebbal Flyover, Outer Ring Road",
];

const LocationInput = ({ label, placeholder, value, onChange, icon = "pickup" }: Props) => {
  const [focused, setFocused] = useState(false);
  const [filtered, setFiltered] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value.length > 0) {
      setFiltered(
        suggestions.filter((s) =>
          s.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFiltered(suggestions.slice(0, 5));
    }
  }, [value]);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-muted-foreground mb-1.5 font-body">
        {label}
      </label>
      <div
        className={`flex items-center gap-3 bg-card border rounded-lg px-4 py-3 transition-all ${
          focused
            ? "border-accent ring-2 ring-accent/20"
            : "border-border hover:border-accent/40"
        }`}
      >
        <MapPin
          size={18}
          className={icon === "pickup" ? "text-success" : "text-accent"}
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground font-body text-sm"
        />
        <Search size={16} className="text-muted-foreground" />
      </div>

      {focused && filtered.length > 0 && (
        <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden animate-fade-in">
          {filtered.map((suggestion) => (
            <button
              key={suggestion}
              onMouseDown={() => {
                onChange(suggestion);
                setFocused(false);
              }}
              className="w-full text-left px-4 py-3 text-sm font-body text-foreground hover:bg-secondary transition-colors flex items-center gap-3"
            >
              <MapPin size={14} className="text-muted-foreground shrink-0" />
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
