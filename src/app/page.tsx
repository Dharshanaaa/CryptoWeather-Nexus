"use client";

import { useEffect } from "react";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store/store";
import WeatherSection from "@/components/weather/weather-section";
import CryptoSection from "@/components/crypto/crypto-section";
import NewsSection from "@/components/news/news-section";
import { WeatherSkeleton } from "@/components/weather/weather-skeleton";
import { CryptoSkeleton } from "@/components/crypto/crypto-skeleton";
import { NewsSkeleton } from "@/components/news/news-skeleton";
import { NotificationButton } from "@/components/notifications/notification-button";
import { formatCryptoData } from "@/components/crypto/format-crypto-data";

export default function Dashboard() {
  useEffect(() => {
    const pricesWs = new WebSocket(
      "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin"
    );

    let lastPrices: { [key: string]: string } = {};

    pricesWs.onmessage = (msg) => {
      console.log("New Crypto Update:", msg.data);

      // Format the crypto data
      const formattedData = formatCryptoData(msg.data);

      // Create notification message
      const updates = Object.entries(formattedData)
        .map(([coin, price]) => {
          const previousPrice = lastPrices[coin];
          let trend = "";

          if (previousPrice) {
            const prev = Number.parseFloat(
              previousPrice.replace("$", "").replace(",", "")
            );
            const current = Number.parseFloat(
              price.replace("$", "").replace(",", "")
            );
            trend = current > prev ? "↑" : current < prev ? "↓" : "";
          }

          return `${
            coin.charAt(0).toUpperCase() + coin.slice(1)
          }: ${price} ${trend}`;
        })
        .join("\n");

      // Update last prices
      lastPrices = { ...lastPrices, ...formattedData };

      // Add notification using the global function we exposed
      if (window.addCryptoNotification && updates) {
        window.addCryptoNotification({
          title: "Crypto Price Update",
          message: updates,
          type: "info",
        });
      }
    };

    return () => {
      pricesWs.close();
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <main className="container mx-auto p-4 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">
              CryptoWeather Nexus Dashboard
            </h1>
            <NotificationButton />
          </div>

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
      </PersistGate>
    </Provider>
  );
}
