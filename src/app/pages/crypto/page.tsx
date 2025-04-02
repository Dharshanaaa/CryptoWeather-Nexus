"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import CryptoDetail from "@/components/crypto/crypto-detail";
import { CryptoDetailSkeleton } from "@/components/crypto/crypto-detail-skeleton";

export default function CryptoPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Get the crypto id from query parameters
  const cryptoId = searchParams.get("id");

  // List of valid cryptos
  const validCryptos = ["bitcoin", "ethereum", "solana"];

  // Map of crypto ids to display names
  const cryptoNames: Record<string, string> = {
    bitcoin: "Bitcoin",
    ethereum: "Ethereum",
    solana: "Solana",
  };

  useEffect(() => {
    // If no crypto id is provided or it's invalid, redirect to dashboard
    if (!cryptoId || !validCryptos.includes(cryptoId.toLowerCase())) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [cryptoId, router]);

  if (loading || !cryptoId) {
    return <CryptoDetailSkeleton />;
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

      <h1 className="text-3xl font-bold">
        {cryptoNames[cryptoId.toLowerCase()]} Details
      </h1>

      <CryptoDetail cryptoId={cryptoId.toLowerCase()} />
    </main>
  );
}
