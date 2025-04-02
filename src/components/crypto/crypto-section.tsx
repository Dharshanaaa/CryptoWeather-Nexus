import Link from "next/link";
import { fetchCryptoData } from "@/lib/api/crypto-api";
import CryptoCard from "./crypto-card";

export default async function CryptoSection() {
  // Cryptos to display
  const cryptos = ["bitcoin", "ethereum", "solana"];

  // Fetch crypto data for all cryptos in parallel
  const cryptoDataPromises = cryptos.map((crypto) => fetchCryptoData(crypto));
  const cryptoData = await Promise.all(cryptoDataPromises);

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
