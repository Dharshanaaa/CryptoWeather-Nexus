"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Cloud, Droplets, Thermometer, Wind } from "lucide-react";
import { format, parseISO } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

// Type definitions for the weather data
interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

interface WeatherItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain?: {
    "3h": number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export default function CityPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get the lat and lon from query parameters
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  useEffect(() => {
    // If no lat or lon is provided, redirect to dashboard
    if (!lat || !lon) {
      router.push("/");
      return;
    }

    const fetchWeatherData = () => {
      const apiKey = "9621e70149d1dc2a9909b93c1c22c4de"; // Should be an environment variable

      axios
        .get(`https://api.openweathermap.org/data/2.5/forecast`, {
          params: {
            lat: lat,
            lon: lon,
            appid: apiKey,
          },
        })
        .then((response) => {
          setWeatherData(response.data as WeatherData);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching weather data:", err);
          setError("Failed to fetch weather data. Please try again.");
          setLoading(false);
        });
    };
    fetchWeatherData();
  }, [lat, lon, router]);

  // Convert Kelvin to Celsius
  const kelvinToCelsius = (kelvin: number) => {
    return (kelvin - 273.15).toFixed(1);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "MMM dd, yyyy - HH:mm");
  };

  // Format date for chart
  const formatChartDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "HH:mm\nMMM dd");
  };

  // Prepare data for charts
  const prepareChartData = () => {
    if (!weatherData) return [];

    return weatherData.list.map((item) => ({
      time: formatChartDate(item.dt_txt),
      temperature: Number.parseFloat(kelvinToCelsius(item.main.temp)),
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
      description: item.weather[0].description,
      precipitation: item.pop * 100, // Convert to percentage
    }));
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <ChevronLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        <div className="h-96 flex items-center justify-center">
          <div className="animate-pulse text-lg">Loading weather data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <ChevronLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        <Card className="w-full">
          <CardContent className="p-6">
            <div className="text-center text-red-500">{error}</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!weatherData) {
    return null;
  }

  const chartData = prepareChartData();
  const currentWeather = weatherData.list[0];

  return (
    <main className="container mx-auto p-4 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/">
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {/* City Information */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl flex justify-between items-center">
              <div>
                {weatherData.city.name}, {weatherData.city.country}
                <div className="text-sm text-muted-foreground">
                  Lat: {weatherData.city.coord.lat}, Lon:{" "}
                  {weatherData.city.coord.lon}
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">
                  {kelvinToCelsius(currentWeather.main.temp)}°C
                </div>
                <div className="text-sm capitalize">
                  {currentWeather.weather[0].description}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-orange-500" />
                <div>
                  <div className="text-sm text-muted-foreground">
                    Feels Like
                  </div>
                  <div>{kelvinToCelsius(currentWeather.main.feels_like)}°C</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="text-sm text-muted-foreground">Humidity</div>
                  <div>{currentWeather.main.humidity}%</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm text-muted-foreground">Wind</div>
                  <div>{currentWeather.wind.speed} m/s</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-muted-foreground">Clouds</div>
                  <div>{currentWeather.clouds.all}%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather Forecast */}
        <Tabs defaultValue="chart">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chart">Chart View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>

          <TabsContent value="chart" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Temperature Forecast (°C)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 25 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="time"
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="temperature"
                        stroke="#f97316"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Humidity & Wind Speed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 25 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="time"
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis
                        yAxisId="left"
                        orientation="left"
                        stroke="#3b82f6"
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="#84cc16"
                      />
                      <Tooltip />
                      <Legend />
                      <Bar
                        yAxisId="left"
                        dataKey="humidity"
                        name="Humidity (%)"
                        fill="#3b82f6"
                      />
                      <Bar
                        yAxisId="right"
                        dataKey="windSpeed"
                        name="Wind Speed (m/s)"
                        fill="#84cc16"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="table">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Date & Time</th>
                        <th className="text-left p-2">Temp (°C)</th>
                        <th className="text-left p-2">Weather</th>
                        <th className="text-left p-2">Humidity</th>
                        <th className="text-left p-2">Wind</th>
                        <th className="text-left p-2">Precipitation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {weatherData.list.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="p-2">{formatDate(item.dt_txt)}</td>
                          <td className="p-2">
                            {kelvinToCelsius(item.main.temp)}°C
                          </td>
                          <td className="p-2 capitalize">
                            {item.weather[0].description}
                          </td>
                          <td className="p-2">{item.main.humidity}%</td>
                          <td className="p-2">{item.wind.speed} m/s</td>
                          <td className="p-2">
                            {(item.pop * 100).toFixed(0)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
