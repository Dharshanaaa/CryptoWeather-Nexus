import { Suspense } from "react";
import WeatherSection from "@/components/weather/weather-section";
import CryptoSection from "@/components/crypto/crypto-section";
import NewsSection from "@/components/news/news-section";
import { WeatherSkeleton } from "@/components/weather/weather-skeleton";
import { CryptoSkeleton } from "@/components/crypto/crypto-skeleton";
import { NewsSkeleton } from "@/components/news/news-skeleton";

export default function Dashboard() {
  return (
    <main className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">CryptoWeather Nexus Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-2xl font-semibold mb-4">Weather</h2>
          <Suspense fallback={<WeatherSkeleton />}>
            <WeatherSection />
          </Suspense>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-2xl font-semibold mb-4">Cryptocurrency</h2>
          <Suspense fallback={<CryptoSkeleton />}>
            <CryptoSection />
          </Suspense>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-2xl font-semibold mb-4">Crypto News</h2>
          <Suspense fallback={<NewsSkeleton />}>
            <NewsSection />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
