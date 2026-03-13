import { Clock, Users } from "lucide-react";

export interface RideType {
  id: string;
  name: string;
  description: string;
  price: string;
  eta: string;
  capacity: number;
  icon: string;
}

interface Props {
  ride: RideType;
  selected: boolean;
  onSelect: () => void;
}

const RideOption = ({ ride, selected, onSelect }: Props) => {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
        selected
          ? "border-accent bg-accent/5 shadow-md"
          : "border-border bg-card hover:border-accent/30 hover:shadow-sm"
      }`}
    >
      <div className="flex items-center gap-4">
        <span className="text-3xl">{ride.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg text-foreground">{ride.name}</h3>
            <span className="font-display text-lg text-foreground">{ride.price}</span>
          </div>
          <p className="text-sm text-muted-foreground font-body mt-0.5">
            {ride.description}
          </p>
          <div className="flex items-center gap-4 mt-2">
            <span className="flex items-center gap-1 text-xs text-muted-foreground font-body">
              <Clock size={12} />
              {ride.eta}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground font-body">
              <Users size={12} />
              Up to {ride.capacity}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default RideOption;
