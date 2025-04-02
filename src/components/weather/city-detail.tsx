"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchCityWeatherHistory } from "@/lib/api/weather-api";
import { useEffect, useState } from "react";
import { Cloud, CloudRain, Sun } from "lucide-react";
import WeatherHistoryChart from "./weather-history-chart";
import WeatherHistoryTable from "./weather-history-table";

interface CityDetailProps {
  cityName: string;
}

export default function CityDetail({ cityName }: CityDetailProps) {
  const [weatherHistory, setWeatherHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCityWeatherHistory(cityName);
        setWeatherHistory(data);
      } catch (error) {
        console.error("Failed to fetch weather history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cityName]);

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

  // Get current weather (first item in history)
  const currentWeather = weatherHistory[0] || {
    temperature: 0,
    humidity: 0,
    condition: "Unknown",
    date: new Date().toISOString(),
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Current Weather
            {getWeatherIcon(currentWeather.condition)}
          </CardTitle>
          <CardDescription>
            Last updated: {new Date(currentWeather.date).toLocaleString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Temperature</span>
              <span className="text-2xl font-bold">
                {currentWeather.temperature}°C
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Humidity</span>
              <span className="text-2xl font-bold">
                {currentWeather.humidity}%
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Condition</span>
              <span className="text-2xl font-bold">
                {currentWeather.condition}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="chart">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chart">Chart</TabsTrigger>
          <TabsTrigger value="table">Table</TabsTrigger>
        </TabsList>
        <TabsContent value="chart" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Weather History</CardTitle>
              <CardDescription>
                Temperature and humidity over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-80 flex items-center justify-center">
                  <p>Loading chart data...</p>
                </div>
              ) : (
                <WeatherHistoryChart data={weatherHistory} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="table" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Weather History</CardTitle>
              <CardDescription>Detailed weather records</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-80 flex items-center justify-center">
                  <p>Loading table data...</p>
                </div>
              ) : (
                <WeatherHistoryTable data={weatherHistory} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
