import { useState, useRef } from "react";

interface Props {
  children: React.ReactNode;
  onActualClick: () => void;
  dodgeCount?: number;
}

const DodgyButton = ({ children, onActualClick, dodgeCount = 5 }: Props) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    if (attempts >= dodgeCount) return;
    
    const newX = (Math.random() - 0.5) * 300;
    const newY = (Math.random() - 0.5) * 100;
    setPosition({ x: newX, y: newY });
    setAttempts(a => a + 1);
  };

  const handleClick = () => {
    if (attempts >= dodgeCount) {
      onActualClick();
    } else {
      setAttempts(a => a + 1);
    }
  };

  return (
    <div className="relative py-8 flex flex-col items-center">
      <button
        ref={btnRef}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        className="bg-primary text-primary-foreground font-display text-lg px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        {children}
      </button>
      {attempts > 0 && attempts < dodgeCount && (
        <p className="text-sm text-muted-foreground font-body mt-4 absolute bottom-0">
          🏃 The button ran away! ({dodgeCount - attempts} dodges left)
        </p>
      )}
      {attempts >= dodgeCount && (
        <p className="text-sm text-primary font-body mt-4 absolute bottom-0">
          😮‍💨 Fine, you can click it now...
        </p>
      )}
    </div>
  );
};

export default DodgyButton;
