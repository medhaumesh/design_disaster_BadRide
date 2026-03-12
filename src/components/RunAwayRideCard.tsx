import { useState, useRef } from "react";

interface Props {
  name: string;
  price: string;
  emoji: string;
  onSelect: () => void;
  difficulty: number;
}

const RunAwayRideCard = ({ name, price, emoji, onSelect, difficulty }: Props) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [clickCount, setClickCount] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (clickCount >= difficulty) return; // Finally catchable after enough clicks
    
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist < 150) {
      setOffset({
        x: offset.x + (dx > 0 ? -1 : 1) * (80 + Math.random() * 60),
        y: offset.y + (dy > 0 ? -1 : 1) * (40 + Math.random() * 40),
      });
    }
  };

  const handleClick = () => {
    setClickCount(c => c + 1);
    if (clickCount >= difficulty) {
      onSelect();
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className="bg-card border-2 border-border rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all select-none"
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px) rotate(${offset.x * 0.05}deg)`,
        transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <div className="text-4xl mb-2">{emoji}</div>
      <h3 className="font-display text-lg text-foreground">{name}</h3>
      <p className="text-sm text-muted-foreground font-body">{price}</p>
      {clickCount > 0 && clickCount < difficulty && (
        <p className="text-xs text-cursed-pink mt-1 font-body">
          {difficulty - clickCount} more clicks needed! Keep trying! 😈
        </p>
      )}
    </div>
  );
};

export default RunAwayRideCard;
