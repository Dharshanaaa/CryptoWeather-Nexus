import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import CityDetail from "@/components/weather/city-detail";
import { CityDetailSkeleton } from "@/components/weather/city-detail-skeleton";

export default function CityDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  // Decode the slug to get the city name
  const cityName = decodeURIComponent(params.slug);

  // List of valid cities
  const validCities = ["new york", "london", "tokyo"];

  // Check if the city is valid
  if (!validCities.includes(cityName.toLowerCase())) {
    notFound();
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

      <Suspense fallback={<CityDetailSkeleton />}>
        <CityDetail cityName={cityName} />
      </Suspense>
    </main>
  );
}
