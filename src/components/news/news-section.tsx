import { fetchCryptoNews } from "@/lib/api/news-api";
import NewsCard from "./news-card";

export default async function NewsSection() {
  // Fetch crypto news
  const newsData = await fetchCryptoNews();

  // Take only the top 5 news
  const topNews = newsData.slice(0, 5);

  return (
    <div className="space-y-4">
      <NewsCard />
    </div>
  );
}
