import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import CryptoDetail from "@/components/crypto/crypto-detail";
import { CryptoDetailSkeleton } from "@/components/crypto/crypto-detail-skeleton";

export default function CryptoDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  // Decode the slug to get the crypto id
  const cryptoId = decodeURIComponent(params.slug);

  // List of valid cryptos
  const validCryptos = ["bitcoin", "ethereum", "solana"];

  // Check if the crypto is valid
  if (!validCryptos.includes(cryptoId.toLowerCase())) {
    notFound();
  }

  // Map of crypto ids to display names
  const cryptoNames: Record<string, string> = {
    bitcoin: "Bitcoin",
    ethereum: "Ethereum",
    solana: "Solana",
  };

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

      <Suspense fallback={<CryptoDetailSkeleton />}>
        <CryptoDetail cryptoId={cryptoId.toLowerCase()} />
      </Suspense>
    </main>
  );
}
