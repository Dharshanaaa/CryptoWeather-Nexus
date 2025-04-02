"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

interface CryptoData {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  image: string;
}

interface CryptoCardProps {
  cryptoId: string;
  cryptoData: CryptoData;
}

export default function CryptoCard({ cryptoId, cryptoData }: CryptoCardProps) {
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

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <img
            src={cryptoData.image || "/placeholder.svg"}
            alt={cryptoData.name}
            className="h-6 w-6"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg?height=24&width=24";
            }}
          />
          {cryptoData.name} ({cryptoData.symbol.toUpperCase()})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Price</span>
            <span className="text-lg font-bold">
              {formatPrice(cryptoData.price)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">24h Change</span>
            <span
              className={`flex items-center ${
                cryptoData.change24h >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {cryptoData.change24h >= 0 ? (
                <ArrowUp className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-1" />
              )}
              {Math.abs(cryptoData.change24h).toFixed(2)}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Market Cap</span>
            <span>{formatMarketCap(cryptoData.marketCap)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
