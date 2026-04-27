import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: boolean;
}

export function Card({ children, className, hover = true, padding = true }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl card-shadow overflow-hidden",
        hover && "transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1",
        padding && "p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
