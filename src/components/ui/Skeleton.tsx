import { cn } from "@/lib/utils";

type SkeletonVariant = "text" | "circular" | "rectangular";

interface SkeletonProps {
  className?: string;
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  lines?: number;
}

const variantStyles: Record<SkeletonVariant, string> = {
  text: "rounded-md h-4 w-full",
  circular: "rounded-full aspect-square",
  rectangular: "rounded-xl",
};

export default function Skeleton({
  className,
  variant = "text",
  width,
  height,
  lines = 1,
}: SkeletonProps) {
  const style: React.CSSProperties = {
    ...(width ? { width: typeof width === "number" ? `${width}px` : width } : {}),
    ...(height
      ? { height: typeof height === "number" ? `${height}px` : height }
      : {}),
  };

  if (variant === "text" && lines > 1) {
    return (
      <div className="space-y-2.5" role="status" aria-label="Loading">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "animate-shimmer",
              variantStyles.text,
              i === lines - 1 && "w-3/4",
              className
            )}
            style={style}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("animate-shimmer", variantStyles[variant], className)}
      style={style}
    />
  );
}

export type { SkeletonProps, SkeletonVariant };
