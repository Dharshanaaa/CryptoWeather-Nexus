"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchCryptoHistory, fetchCryptoDetails } from "@/lib/api/crypto-api";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import CryptoHistoryChart from "./crypto-history-chart";
import CryptoMetricsTable from "./crypto-metrics-table";

interface CryptoDetailProps {
  cryptoId: string;
}

export default function CryptoDetail({ cryptoId }: CryptoDetailProps) {
  const [cryptoHistory, setCryptoHistory] = useState<any[]>([]);
  const [cryptoDetails, setCryptoDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [history, details] = await Promise.all([
          fetchCryptoHistory(cryptoId),
          fetchCryptoDetails(cryptoId),
        ]);
        setCryptoHistory(history);
        setCryptoDetails(details);
      } catch (error) {
        console.error("Failed to fetch crypto data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cryptoId]);

  // Format price with commas and 2 decimal places
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // Format market cap with abbreviations (B for billions, M for millions)
  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    } else {
      return `$${marketCap.toFixed(2)}`;
    }
  };

  if (loading || !cryptoDetails) {
    return (
      <div className="h-80 flex items-center justify-center">
        <p>Loading crypto details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <img
              src={cryptoDetails.image || "/placeholder.svg"}
              alt={cryptoDetails.name}
              className="h-8 w-8"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=32&width=32";
              }}
            />
            {cryptoDetails.name} ({cryptoDetails.symbol.toUpperCase()})
          </CardTitle>
          <CardDescription>Current market data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Price</span>
              <span className="text-2xl font-bold">
                {formatPrice(cryptoDetails.price)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">24h Change</span>
              <span
                className={`flex items-center text-xl font-bold ${
                  cryptoDetails.change24h >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {cryptoDetails.change24h >= 0 ? (
                  <ArrowUp className="h-5 w-5 mr-1" />
                ) : (
                  <ArrowDown className="h-5 w-5 mr-1" />
                )}
                {Math.abs(cryptoDetails.change24h).toFixed(2)}%
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Market Cap</span>
              <span className="text-xl font-bold">
                {formatMarketCap(cryptoDetails.marketCap)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="chart">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chart">Price History</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
        </TabsList>
        <TabsContent value="chart" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Price History</CardTitle>
              <CardDescription>Historical price data over time</CardDescription>
            </CardHeader>
            <CardContent>
              {cryptoHistory.length === 0 ? (
                <div className="h-80 flex items-center justify-center">
                  <p>Loading chart data...</p>
                </div>
              ) : (
                <CryptoHistoryChart data={cryptoHistory} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="metrics" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Extended Metrics</CardTitle>
              <CardDescription>Detailed market metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <CryptoMetricsTable data={cryptoDetails} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
