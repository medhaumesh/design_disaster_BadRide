import { useState } from "react";
import { ArrowRight, History, Car } from "lucide-react";
import LocationInput from "@/components/LocationInput";
import RideOption, { type RideType } from "@/components/RideOption";
import BookingSteps from "@/components/BookingSteps";
import PaymentMethod, { type PaymentOption } from "@/components/PaymentMethod";
import DriverCard from "@/components/DriverCard";
import BookingHistory, { type PastBooking } from "@/components/BookingHistory";

const STEPS = ["Location", "Ride", "Payment", "Confirm"];

const rideTypes: RideType[] = [
  { id: "economy", name: "Economy", description: "Affordable everyday rides", price: "₹85", eta: "3 min", capacity: 4, icon: "🚗" },
  { id: "comfort", name: "Comfort", description: "Newer cars with extra legroom", price: "₹120", eta: "5 min", capacity: 4, icon: "🚙" },
  { id: "premium", name: "Premium", description: "Luxury vehicles, top-rated drivers", price: "₹220", eta: "7 min", capacity: 4, icon: "✨" },
  { id: "xl", name: "XL", description: "Spacious rides for groups", price: "₹185", eta: "8 min", capacity: 6, icon: "🚐" },
];

const paymentOptions: PaymentOption[] = [
  { id: "card", name: "Credit Card", icon: "card", detail: "•••• 4242" },
  { id: "wallet", name: "Digital Wallet", icon: "wallet", detail: "Apple Pay / Google Pay" },
  { id: "cash", name: "Cash", icon: "cash", detail: "Pay driver directly" },
];

const sampleHistory: PastBooking[] = [
  { id: "1", date: "Mar 12, 2026", pickup: "Koramangala, 4th Block", dropoff: "Kempegowda International Airport", price: "₹850", ride: "Comfort", status: "completed" },
  { id: "2", date: "Mar 10, 2026", pickup: "Majestic Bus Station", dropoff: "Whitefield, ITPL Main Road", price: "₹420", ride: "Economy", status: "completed" },
  { id: "3", date: "Mar 8, 2026", pickup: "MG Road", dropoff: "Electronic City, Phase 1", price: "₹350", ride: "Economy", status: "cancelled" },
];

const Index = () => {
  const [step, setStep] = useState(0);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [selectedRide, setSelectedRide] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const canProceed = () => {
    switch (step) {
      case 0: return pickup.length > 0 && dropoff.length > 0;
      case 1: return selectedRide !== null;
      case 2: return selectedPayment !== null;
      default: return true;
    }
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else { setBooked(true); }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleRebook = (booking: PastBooking) => {
    setPickup(booking.pickup);
    setDropoff(booking.dropoff);
    setShowHistory(false);
    setStep(1);
  };

  const resetBooking = () => {
    setStep(0);
    setPickup("");
    setDropoff("");
    setSelectedRide(null);
    setSelectedPayment(null);
    setBooked(false);
  };

  const selectedRideData = rideTypes.find((r) => r.id === selectedRide);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <Car size={20} className="text-primary-foreground" />
            </div>
            <h1 className="font-display text-xl text-foreground">GoodRide</h1>
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
          >
            <History size={18} />
            History
          </button>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* History View */}
        {showHistory && !booked && (
          <div className="animate-fade-in">
            <h2 className="font-display text-2xl text-foreground mb-4">Past Rides</h2>
            <BookingHistory bookings={sampleHistory} onRebook={handleRebook} />
          </div>
        )}

        {/* Booking Flow */}
        {!showHistory && !booked && (
          <>
            <BookingSteps currentStep={step} steps={STEPS} />

            {/* Step 0: Location */}
            {step === 0 && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="font-display text-2xl text-foreground">
                  Where to?
                </h2>
                <LocationInput
                  label="Pickup"
                  placeholder="Enter pickup location"
                  value={pickup}
                  onChange={setPickup}
                  icon="pickup"
                />
                <LocationInput
                  label="Drop-off"
                  placeholder="Enter destination"
                  value={dropoff}
                  onChange={setDropoff}
                  icon="dropoff"
                />
              </div>
            )}

            {/* Step 1: Ride Selection */}
            {step === 1 && (
              <div className="space-y-3 animate-fade-in">
                <h2 className="font-display text-2xl text-foreground">
                  Choose your ride
                </h2>
                <p className="text-sm text-muted-foreground font-body">
                  {pickup} → {dropoff}
                </p>
                {rideTypes.map((ride) => (
                  <RideOption
                    key={ride.id}
                    ride={ride}
                    selected={selectedRide === ride.id}
                    onSelect={() => setSelectedRide(ride.id)}
                  />
                ))}
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="font-display text-2xl text-foreground">
                  Payment
                </h2>
                {selectedRideData && (
                  <div className="bg-secondary/60 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm font-body">
                      <span className="text-muted-foreground">Ride fare</span>
                      <span className="text-foreground font-medium">{selectedRideData.price}</span>
                    </div>
                    <div className="flex justify-between text-sm font-body">
                      <span className="text-muted-foreground">Service fee</span>
                      <span className="text-foreground font-medium">₹15</span>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between font-body">
                      <span className="font-medium text-foreground">Total</span>
                      <span className="font-display text-lg text-foreground">
                        ₹{parseFloat(selectedRideData.price.slice(1)) + 15}
                      </span>
                    </div>
                  </div>
                )}
                <PaymentMethod
                  options={paymentOptions}
                  selected={selectedPayment}
                  onSelect={setSelectedPayment}
                />
              </div>
            )}

            {/* Step 3: Confirm */}
            {step === 3 && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="font-display text-2xl text-foreground">
                  Confirm your ride
                </h2>
                <div className="bg-card border border-border rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-3 text-sm font-body">
                    <span className="text-success">●</span>
                    <span className="text-foreground">{pickup}</span>
                  </div>
                  <div className="ml-1.5 border-l-2 border-dashed border-border h-4" />
                  <div className="flex items-center gap-3 text-sm font-body">
                    <span className="text-accent">●</span>
                    <span className="text-foreground">{dropoff}</span>
                  </div>
                </div>

                {selectedRideData && (
                  <div className="bg-card border border-border rounded-xl p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{selectedRideData.icon}</span>
                        <div>
                          <p className="font-body font-medium text-foreground">{selectedRideData.name}</p>
                          <p className="text-xs text-muted-foreground font-body">ETA: {selectedRideData.eta}</p>
                        </div>
                      </div>
                      <span className="font-display text-xl text-foreground">
                        ₹{parseFloat(selectedRideData.price.slice(1)) + 15}
                      </span>
                    </div>
                  </div>
                )}

                <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
                  <span className="text-muted-foreground font-body text-sm">Paying with</span>
                  <span className="font-body font-medium text-foreground text-sm">
                    {paymentOptions.find((p) => p.id === selectedPayment)?.name}
                  </span>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-2">
              {step > 0 && (
                <button
                  onClick={handleBack}
                  className="flex-1 py-3 rounded-lg border border-border text-foreground font-body font-medium text-sm hover:bg-secondary transition-colors"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground font-body font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {step === 3 ? "Confirm Booking" : "Continue"}
                <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}

        {/* Booking Confirmed */}
        {booked && (
          <div className="space-y-5 animate-fade-in">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl">✓</span>
              </div>
              <h2 className="font-display text-2xl text-foreground">Ride Confirmed</h2>
              <p className="text-sm text-muted-foreground font-body">
                Your driver is on the way
              </p>
            </div>

            <DriverCard
              name="Marcus Johnson"
              photo="👨‍✈️"
              rating={4.9}
              trips={2847}
              vehicle="Toyota Camry 2024 · Black"
              plate="ABC 1234"
              eta={selectedRideData?.eta || "5 min"}
            />

            <div className="bg-card border border-border rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-3 text-sm font-body">
                <span className="text-success">●</span>
                <span className="text-foreground">{pickup}</span>
              </div>
              <div className="ml-1.5 border-l-2 border-dashed border-border h-3" />
              <div className="flex items-center gap-3 text-sm font-body">
                <span className="text-accent">●</span>
                <span className="text-foreground">{dropoff}</span>
              </div>
            </div>

            <button
              onClick={resetBooking}
              className="w-full py-3 rounded-lg border border-border text-foreground font-body font-medium text-sm hover:bg-secondary transition-colors"
            >
              Book Another Ride
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
