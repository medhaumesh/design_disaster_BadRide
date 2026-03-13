import { MapPin, Clock, ChevronRight } from "lucide-react";

export interface PastBooking {
  id: string;
  date: string;
  pickup: string;
  dropoff: string;
  price: string;
  ride: string;
  status: "completed" | "cancelled";
}

interface Props {
  bookings: PastBooking[];
  onRebook: (booking: PastBooking) => void;
}

const BookingHistory = ({ bookings, onRebook }: Props) => {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-3">🚕</div>
        <p className="text-muted-foreground font-body">No past bookings yet</p>
        <p className="text-sm text-muted-foreground font-body mt-1">
          Your ride history will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookings.map((booking) => (
        <button
          key={booking.id}
          onClick={() => onRebook(booking)}
          className="w-full text-left bg-card border border-border rounded-lg p-4 hover:shadow-sm hover:border-accent/30 transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-body font-medium px-2 py-0.5 rounded-full ${
                  booking.status === "completed"
                    ? "bg-success/10 text-success"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {booking.status === "completed" ? "Completed" : "Cancelled"}
              </span>
              <span className="text-xs text-muted-foreground font-body">{booking.ride}</span>
            </div>
            <span className="font-display text-foreground">{booking.price}</span>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <MapPin size={12} className="text-success shrink-0" />
              <span className="text-sm font-body text-foreground truncate">{booking.pickup}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={12} className="text-accent shrink-0" />
              <span className="text-sm font-body text-foreground truncate">{booking.dropoff}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <span className="flex items-center gap-1 text-xs text-muted-foreground font-body">
              <Clock size={12} />
              {booking.date}
            </span>
            <span className="flex items-center gap-1 text-xs text-accent font-body font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Rebook <ChevronRight size={12} />
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default BookingHistory;
