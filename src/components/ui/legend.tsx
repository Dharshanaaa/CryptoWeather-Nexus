import type * as React from "react";
import { cn } from "@/lib/utils";

export interface LegendProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Legend({ className, ...props }: LegendProps) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-4 text-sm", className)}
      {...props}
    />
  );
}

export interface LegendItemProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
}

export function LegendItem({
  className,
  color,
  children,
  ...props
}: LegendItemProps) {
  return (
    <div className={cn("flex items-center gap-1", className)} {...props}>
      {color && (
        <div
          className="h-3 w-3 rounded-sm"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </div>
  );
}
