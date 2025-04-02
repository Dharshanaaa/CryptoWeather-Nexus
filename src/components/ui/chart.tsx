import type * as React from "react";
import { cn } from "@/lib/utils";
import { Legend, LegendItem } from "@/components/ui/legend";

export const ChartContainer = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("relative", className)} {...props} />;
};

export const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="text-sm font-medium">{label}</div>
        {payload.map((entry: any, index: number) => (
          <div
            key={`item-${index}`}
            className="flex items-center gap-2 text-sm"
          >
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.name}: </span>
            <span className="font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export const ChartTooltipContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("text-sm", className)} {...props} />;
};

export const ChartLegend = ({ payload }: any) => {
  if (payload && payload.length) {
    return (
      <Legend className="justify-center">
        {payload.map((entry: any, index: number) => (
          <LegendItem key={`item-${index}`} color={entry.color}>
            {entry.value}
          </LegendItem>
        ))}
      </Legend>
    );
  }

  return null;
};

export const ChartLegendItem = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <LegendItem className={className} {...props} />;
};

export const Chart = () => {
  return null;
};
