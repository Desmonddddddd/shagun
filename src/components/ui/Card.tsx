import { type ReactNode, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverable?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Card({
  children,
  hoverable = false,
  className,
  onClick,
  ...props
}: CardProps) {
  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={cn(
        "bg-white rounded-2xl card-shadow overflow-hidden",
        "transition-all duration-300 ease-out",
        hoverable && "hover:card-shadow-hover hover:-translate-y-0.5",
        onClick && "cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* Sub-components for composability */
function CardHeader({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-5 pt-5 pb-3", className)} {...props}>
      {children}
    </div>
  );
}

function CardBody({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-5 py-3", className)} {...props}>
      {children}
    </div>
  );
}

function CardFooter({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "px-5 pb-5 pt-3 border-t border-ivory-dark",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Card, CardHeader, CardBody, CardFooter };
export type { CardProps };
