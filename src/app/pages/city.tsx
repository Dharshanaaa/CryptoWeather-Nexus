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

  // Get the city name from query parameters
  const cityName = searchParams.get("name");

  // List of valid cities
  const validCities = ["new york", "london", "tokyo"];

  useEffect(() => {
    // If no city name is provided or it's invalid, redirect to dashboard
    if (!cityName || !validCities.includes(cityName.toLowerCase())) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [cityName, router]);

  if (loading || !cityName) {
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

      <h1 className="text-3xl font-bold capitalize">{cityName} Weather</h1>

      <CityDetail cityName={cityName} />
    </main>
  );
}
