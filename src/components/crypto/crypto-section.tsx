import Link from "next/link";
import { fetchCryptoData } from "@/lib/api/crypto-api";
import CryptoCard from "./crypto-card";
import { useEffect, useState } from "react";

export default function CryptoSection() {
  // Cryptos to display
  const cryptos = ["bitcoin", "ethereum", "solana"];
  const [cryptoData, setCryptoData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch crypto data for all cryptos in parallel
    const cryptoDataPromises = cryptos.map((crypto) => fetchCryptoData(crypto));
    Promise.all(cryptoDataPromises)
      .then((data) => setCryptoData(data))
      .catch((error) => console.error("Error fetching crypto data:", error));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cryptoData.map((data, index) => (
        <Link
          key={cryptos[index]}
          href={`/pages/crypto?id=${encodeURIComponent(cryptos[index])}`}
          className="block transition-transform hover:scale-[1.02]"
        >
          <CryptoCard cryptoId={cryptos[index]} cryptoData={data} />
        </Link>
      ))}
    </div>
  );
}
