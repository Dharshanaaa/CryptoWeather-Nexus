"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cloud, CloudRain, Sun, Droplets } from "lucide-react";

interface WeatherData {
  temperature: number;
  humidity: number;
  condition: string;
}

interface WeatherCardProps {
  city: string;
  weatherData: WeatherData;
}

export default function WeatherCard({ city, weatherData }: WeatherCardProps) {
  // Function to determine which weather icon to display
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case "rain":
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      default:
        return <Cloud className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          {city}
          {getWeatherIcon(weatherData.condition)}
        </CardTitle>
        <CardDescription>{weatherData.condition}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold">
              {weatherData.temperature}°C
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            <div>{weatherData.humidity}% Humidity</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
