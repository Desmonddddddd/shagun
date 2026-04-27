import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({ title, subtitle, align = "center", className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", align === "center" && "text-center", className)}>
      <h2 className="font-heading text-3xl sm:text-4xl text-charcoal mb-3">{title}</h2>
      {subtitle && (
        <p className="text-slate text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
      <div
        className={cn(
          "mt-4 h-1 w-16 bg-gradient-gold rounded-full",
          align === "center" && "mx-auto"
        )}
      />
    </div>
  );
}
