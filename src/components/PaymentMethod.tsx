import { CreditCard, Wallet, Banknote } from "lucide-react";

export interface PaymentOption {
  id: string;
  name: string;
  icon: "card" | "wallet" | "cash";
  detail: string;
}

interface Props {
  options: PaymentOption[];
  selected: string | null;
  onSelect: (id: string) => void;
}

const iconMap = {
  card: CreditCard,
  wallet: Wallet,
  cash: Banknote,
};

const PaymentMethod = ({ options, selected, onSelect }: Props) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-muted-foreground font-body mb-2">
        Payment Method
      </label>
      {options.map((option) => {
        const Icon = iconMap[option.icon];
        const isSelected = selected === option.id;

        return (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`w-full flex items-center gap-3 p-3.5 rounded-lg border-2 transition-all ${
              isSelected
                ? "border-accent bg-accent/5"
                : "border-border bg-card hover:border-accent/30"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isSelected ? "bg-accent/15 text-accent" : "bg-secondary text-muted-foreground"
              }`}
            >
              <Icon size={20} />
            </div>
            <div className="text-left">
              <p className="text-sm font-body font-medium text-foreground">{option.name}</p>
              <p className="text-xs font-body text-muted-foreground">{option.detail}</p>
            </div>
            <div
              className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                isSelected ? "border-accent" : "border-border"
              }`}
            >
              {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default PaymentMethod;
