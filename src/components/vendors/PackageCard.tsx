import { Check, Crown } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";

interface PackageData {
  id: string;
  name: string;
  description: string | null;
  price: number;
  features: string[];
  popular: boolean;
}

interface PackageCardProps {
  pkg: PackageData;
  onGetQuote?: () => void;
  className?: string;
}

export default function PackageCard({
  pkg,
  onGetQuote,
  className,
}: PackageCardProps) {
  return (
    <div
      className={cn(
        "relative bg-white rounded-2xl overflow-hidden flex flex-col h-full",
        "border transition-all duration-300",
        pkg.popular
          ? "border-gold card-shadow-hover ring-1 ring-gold/20"
          : "border-ivory-dark card-shadow hover:card-shadow-hover",
        className
      )}
    >
      {/* Popular Badge */}
      {pkg.popular && (
        <div className="bg-gradient-gold px-4 py-2 text-center">
          <span className="inline-flex items-center gap-1.5 text-white text-xs font-semibold font-[family-name:var(--font-body)] uppercase tracking-wider">
            <Crown size={13} />
            Most Popular
          </span>
        </div>
      )}

      {/* Content */}
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        {/* Name */}
        <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-charcoal mb-1">
          {pkg.name}
        </h3>

        {/* Description */}
        {pkg.description && (
          <p className="font-[family-name:var(--font-body)] text-xs text-slate mb-4 leading-relaxed">
            {pkg.description}
          </p>
        )}

        {/* Price */}
        <div className="mb-6">
          <span className="font-[family-name:var(--font-heading)] text-3xl font-bold text-charcoal">
            {formatPrice(pkg.price)}
          </span>
          <span className="font-[family-name:var(--font-body)] text-xs text-slate ml-1">
            onwards
          </span>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8 flex-1">
          {pkg.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <div
                className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                  pkg.popular ? "bg-gold/15" : "bg-sage/15"
                )}
              >
                <Check
                  size={12}
                  className={cn(
                    pkg.popular ? "text-gold-dark" : "text-sage"
                  )}
                />
              </div>
              <span className="font-[family-name:var(--font-body)] text-sm text-charcoal/80">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button
          onClick={onGetQuote}
          className={cn(
            "w-full py-3 rounded-xl font-medium font-[family-name:var(--font-body)] text-sm transition-all duration-200",
            pkg.popular
              ? "bg-gold hover:bg-gold-dark text-white shadow-sm hover:shadow-md"
              : "border-2 border-gold text-gold-dark hover:bg-gold hover:text-white"
          )}
        >
          Get Quote
        </button>
      </div>
    </div>
  );
}
