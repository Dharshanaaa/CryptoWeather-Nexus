"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
} from "@/components/ui/chart";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface WeatherHistoryChartProps {
  data: any[];
}

export default function WeatherHistoryChart({
  data,
}: WeatherHistoryChartProps) {
  // Format data for the chart
  const chartData = data
    .map((item) => ({
      date: new Date(item.date).toLocaleDateString(),
      temperature: item.temperature,
      humidity: item.humidity,
    }))
    .reverse();

  return (
    <ChartContainer className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" orientation="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip content={<ChartTooltip />} />
          <Legend content={<ChartLegend />} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="temperature"
            stroke="#f97316"
            name="Temperature (°C)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="humidity"
            stroke="#0ea5e9"
            name="Humidity (%)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
