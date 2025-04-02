"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import CityDetail from "@/components/weather/city-detail";
import { CityDetailSkeleton } from "@/components/weather/city-detail-skeleton";

export default function CityPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);

  // Get lat and lon from query parameters
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  useEffect(() => {
    if (!lat || !lon) {
      router.push("/");
      return;
    }

    // Fetch weather data from OpenWeatherMap
    async function fetchWeather() {
      try {
        const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather:", error);
        router.push("/");
      }
    }

    fetchWeather();
  }, [lat, lon, router]);

  if (loading || !weatherData) {
    return <CityDetailSkeleton />;
  }

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

      <h1 className="text-3xl font-bold">Weather Details</h1>

      {/* Pass the weather data to CityDetail component */}
      <CityDetail weatherData={weatherData} />
    </main>
  );
}
