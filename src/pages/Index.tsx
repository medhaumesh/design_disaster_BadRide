import { useState } from "react";
import CursedProgressBar from "@/components/CursedProgressBar";
import ScrambledKeyboard from "@/components/ScrambledKeyboard";
import RunAwayRideCard from "@/components/RunAwayRideCard";
import MathCaptcha from "@/components/MathCaptcha";
import DodgyButton from "@/components/DodgyButton";
import EvilCheckbox from "@/components/EvilCheckbox";
import SpinToSelectPayment from "@/components/SpinToSelectPayment";
import ConfirmationHell from "@/components/ConfirmationHell";

const TOTAL_STEPS = 7;

const rides = [
  { name: "Economy (Donkey)", price: "¤∞.99/parsec", emoji: "🫏", difficulty: 3 },
  { name: "Premium (Slightly Faster Donkey)", price: "√(-1) coins", emoji: "🐴", difficulty: 5 },
  { name: "Luxury (Horse with Hat)", price: "Your firstborn", emoji: "🎩", difficulty: 7 },
  { name: "VIP (Invisible Car)", price: "404 price not found", emoji: "👻", difficulty: 10 },
];

const Index = () => {
  const [step, setStep] = useState(0);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [selectedRide, setSelectedRide] = useState<string | null>(null);
  const [mathSolved, setMathSolved] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  const nextStep = () => setStep(s => Math.min(s + 1, TOTAL_STEPS));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b-2 border-border p-4 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl animate-spin-slow">🚗</span>
            <h1 className="font-display text-2xl text-foreground">
              BadRide™
            </h1>
          </div>
          <span className="text-sm text-muted-foreground font-body">
            "We'll get you there... eventually"
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-6 space-y-6">
        {!booked && <CursedProgressBar step={step} totalSteps={TOTAL_STEPS} />}

        {/* Step 0: Welcome with annoying popup */}
        {step === 0 && (
          <div className="text-center space-y-6">
            <h2 className="font-display text-4xl text-foreground">
              Welcome to BadRide™! 🎉
            </h2>
            <p className="text-lg text-muted-foreground font-body">
              The world's most frustrating ride-booking experience.
              <br />Please accept our 47-page terms of service to continue.
            </p>
            <div className="max-h-32 overflow-y-auto bg-muted rounded-lg p-4 text-left">
              <p className="text-xs text-muted-foreground font-body leading-relaxed">
                {Array(50).fill("By using BadRide™ you agree to sacrifice your sanity, patience, and possibly your will to live. Section 42.7b states that all rides may or may not arrive. The driver may be a sentient GPS error. Prices are calculated using ancient Sumerian mathematics and are subject to change based on the phase of the moon, your zodiac sign, and whether Mercury is in retrograde. No refunds except in seashells. ").join("")}
              </p>
            </div>
            <EvilCheckbox
              label="I have read and agree to the Terms of Suffering (you haven't, but check anyway)"
              onChecked={() => setTermsAccepted(true)}
            />
            {termsAccepted && (
              <DodgyButton onActualClick={nextStep} dodgeCount={3}>
                Begin Your Journey 🚀
              </DodgyButton>
            )}
          </div>
        )}

        {/* Step 1: Pickup location with scrambled keyboard */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl text-foreground text-center">
              📍 Where are you? (Type it backwards)
            </h2>
            <p className="text-sm text-muted-foreground font-body text-center">
              Use our patent-pending Scramble-Board™ to enter your location.
              Keys rearrange after every press! Have fun! 😈
            </p>
            <ScrambledKeyboard
              value={pickup}
              onChange={setPickup}
              label="Pickup Location (must be at least 5 characters)"
            />
            {pickup.length >= 5 && (
              <DodgyButton onActualClick={nextStep} dodgeCount={2}>
                Next: Drop-off Location →
              </DodgyButton>
            )}
          </div>
        )}

        {/* Step 2: Drop-off location */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl text-foreground text-center">
              🏁 Where are you going?
            </h2>
            <p className="text-sm text-muted-foreground font-body text-center">
              Same keyboard, fresh randomization! You're welcome!
            </p>
            <ScrambledKeyboard
              value={dropoff}
              onChange={setDropoff}
              label="Drop-off Location (also 5+ characters)"
            />
            {dropoff.length >= 5 && (
              <DodgyButton onActualClick={nextStep} dodgeCount={3}>
                Show Me Terrible Rides →
              </DodgyButton>
            )}
          </div>
        )}

        {/* Step 3: Ride selection - cards run away */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl text-foreground text-center">
              🚘 Select Your Ride (if you can catch it)
            </h2>
            <p className="text-sm text-muted-foreground font-body text-center">
              Hover over a ride to see it flee in terror. Click enough times to catch it!
            </p>
            <div className="grid grid-cols-2 gap-4 min-h-[300px]">
              {rides.map((ride) => (
                <RunAwayRideCard
                  key={ride.name}
                  {...ride}
                  onSelect={() => {
                    setSelectedRide(ride.name);
                    nextStep();
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Math puzzle to see price */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl text-foreground text-center">
              💰 Solve This to See Your Price
            </h2>
            <p className="text-sm text-muted-foreground font-body text-center">
              We hide prices behind math puzzles for "security reasons."
              <br />
              (30% chance it says wrong even when you're right!)
            </p>
            {!mathSolved ? (
              <MathCaptcha
                onSolved={() => setMathSolved(true)}
                label="Solve to unlock your fare"
              />
            ) : (
              <div className="text-center space-y-4">
                <div className="bg-card border-2 border-primary rounded-xl p-6">
                  <p className="font-display text-3xl text-foreground">
                    Your fare: $
                    {(Math.random() * 9999 + 1).toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground font-body mt-2">
                    *Plus surge pricing (always surging), convenience fee, inconvenience fee,
                    breathing-in-the-car fee, and existential-dread tax.
                  </p>
                  <div className="mt-3 text-left text-sm font-body text-muted-foreground space-y-1">
                    <p>Base fare: ${(Math.random() * 100).toFixed(2)}</p>
                    <p>Surge (☀️ it's sunny): +${(Math.random() * 200).toFixed(2)}</p>
                    <p>Having-a-name fee: +${(Math.random() * 50).toFixed(2)}</p>
                    <p>Existing surcharge: +${(Math.random() * 75).toFixed(2)}</p>
                    <p>Round number penalty: +${(Math.random() * 30).toFixed(2)}</p>
                  </div>
                </div>
                <DodgyButton onActualClick={nextStep} dodgeCount={4}>
                  Sure, Whatever, Continue →
                </DodgyButton>
              </div>
            )}
          </div>
        )}

        {/* Step 5: Payment wheel */}
        {step === 5 && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl text-foreground text-center">
              💳 Payment Method
            </h2>
            <SpinToSelectPayment
              onSelected={(method) => {
                setPaymentMethod(method);
                nextStep();
              }}
            />
          </div>
        )}

        {/* Step 6: Confirmation hell */}
        {step === 6 && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl text-foreground text-center">
              ✅ Final Confirmation
            </h2>
            <p className="text-sm text-muted-foreground font-body text-center">
              Just a few quick confirmations... (Yes and No might be swapped)
            </p>
            <ConfirmationHell onConfirmed={() => { nextStep(); setBooked(true); }} />
          </div>
        )}

        {/* Step 7: "Booked" - driver info is terrible */}
        {booked && (
          <div className="space-y-6 text-center">
            <div className="text-6xl">🎊</div>
            <h2 className="font-display text-3xl text-foreground">
              Ride Booked!*
            </h2>
            <p className="text-xs text-muted-foreground font-body">
              *"Booked" is a strong word. "Vaguely acknowledged" is more accurate.
            </p>

            <div className="bg-card border-2 border-border rounded-xl p-6 space-y-4 text-left">
              <h3 className="font-display text-lg text-foreground">Your Driver:</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-2xl"
                  style={{ filter: "blur(8px)" }}>
                  👤
                </div>
                <div>
                  <p className="font-body text-foreground" style={{ transform: "scaleX(-1)", display: "inline-block" }}>
                    ████ ███████
                  </p>
                  <p className="text-sm text-muted-foreground font-body">
                    Rating: ⭐ (out of ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐)
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm font-body text-muted-foreground">
                <p>🚗 Vehicle: Probably a car (color: yes)</p>
                <p>📍 Pickup: {pickup || "Somewhere nearby-ish"}</p>
                <p>🏁 Drop-off: {dropoff || "We'll figure it out"}</p>
                <p>🎫 Ride: {selectedRide || "Mystery ride"}</p>
                <p>💳 Paying with: {paymentMethod || "Unknown"}</p>
                <p>⏰ ETA: Between now and heat death of the universe</p>
                <p>📞 Contact driver: Phone number is upside down → ∂ƖƐ9-ϛ8Ɫ-00Ɛ</p>
              </div>
            </div>

            <div className="bg-muted rounded-xl p-4">
              <p className="font-display text-foreground text-sm">
                Thank you for using BadRide™! 
              </p>
              <p className="font-body text-muted-foreground text-xs mt-1">
                Your feedback is important to us and will be promptly ignored.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border p-4 text-center mt-12">
        <p className="text-xs text-muted-foreground font-body">
          © 2026 BadRide™ Inc. All rights reversed. | 
          <span className="cursor-none-important"> Privacy Policy</span> (there is none) | 
          Help Center (closed permanently)
        </p>
      </footer>
    </div>
  );
};

export default Index;
