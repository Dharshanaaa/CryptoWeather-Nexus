"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
} from "@/components/ui/chart";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

interface CryptoHistoryChartProps {
  data: any[];
}

export default function CryptoHistoryChart({ data }: CryptoHistoryChartProps) {
  // Format data for the chart
  const chartData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString(),
    price: item.price,
    volume: item.volume,
  }));

  return (
    <ChartContainer className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<ChartTooltip />} />
          <Legend content={<ChartLegend />} />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorPrice)"
            name="Price (USD)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
