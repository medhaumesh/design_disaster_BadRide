import { Star, Phone, MessageSquare, Shield } from "lucide-react";

interface Props {
  name: string;
  photo: string;
  rating: number;
  trips: number;
  vehicle: string;
  plate: string;
  eta: string;
}

const DriverCard = ({ name, photo, rating, trips, vehicle, plate, eta }: Props) => {
  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-2xl overflow-hidden">
            {photo}
          </div>
          <div>
            <h3 className="font-display text-lg text-foreground">{name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-accent fill-accent" />
                <span className="text-sm font-body font-medium text-foreground">{rating}</span>
              </div>
              <span className="text-xs text-muted-foreground font-body">
                · {trips.toLocaleString()} trips
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-success/10 text-success px-2.5 py-1 rounded-full">
          <Shield size={12} />
          <span className="text-xs font-body font-medium">Verified</span>
        </div>
      </div>

      <div className="bg-secondary/60 rounded-lg p-3 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-body">Vehicle</span>
          <span className="text-sm text-foreground font-body font-medium">{vehicle}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-body">Plate</span>
          <span className="text-sm text-foreground font-body font-medium tracking-wider">{plate}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-body">Arriving in</span>
          <span className="text-sm text-accent font-body font-semibold">{eta}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-lg font-body text-sm font-medium transition-colors hover:bg-primary/90">
          <Phone size={16} />
          Call
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 bg-secondary text-secondary-foreground py-2.5 rounded-lg font-body text-sm font-medium transition-colors hover:bg-secondary/80">
          <MessageSquare size={16} />
          Message
        </button>
      </div>
    </div>
  );
};

export default DriverCard;
