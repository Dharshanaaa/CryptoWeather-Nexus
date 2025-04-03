"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface NewsItem {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  imageUrl: string;
}

interface NewsApiResponse {
  status: string;
  totalResults: number;
  results: Array<{
    title: string;
    link: string;
    description: string;
    pubDate: string;
    image_url: string;
    source_name: string;
  }>;
}

export default function NewsCard() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apikey = process.env.NEXT_PUBLIC_NEWS_URL;
  console.log(apikey);
  useEffect(() => {
    const fetchCryptoNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://newsdata.io/api/1/latest?apikey=${apikey}&q=crypto`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.status}`);
        }

        const data: NewsApiResponse = await response.json();

        if (data.status !== "success") {
          throw new Error("API returned unsuccessful status");
        }

        const news = data.results
          .filter((item) => item.title)
          .slice(0, 5)
          .map((item) => ({
            title: item.title,
            description: item.description || "No description available",
            url: item.link,
            source: item.source_name,
            publishedAt: new Date(item.pubDate).toLocaleDateString(),
            imageUrl: item.image_url || "",
          }));

        setNewsItems(news);
        setError(null);
      } catch (err) {
        console.error("Error fetching crypto news:", err);
        setError("Failed to load crypto news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoNews();
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      {loading && (
        <Card>
          <CardContent className="text-center py-10">
            <p className="text-gray-500">Loading news...</p>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card>
          <CardContent className="text-center py-10">
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      )}

      {!loading && !error && newsItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Crypto News</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {newsItems.map((news, index) => (
                <li key={index} className="flex items-start gap-4">
                  {news.imageUrl ? (
                    <img
                      src={news.imageUrl}
                      alt={news.title}
                      className="h-16 w-24 object-cover rounded-md"
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="h-16 w-24 bg-gray-100 rounded-md flex items-center justify-center">
                      <span className="text-xs text-gray-500">No image</span>
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-lg">{news.title}</CardTitle>
                    <CardDescription>
                      {news.source} • {news.publishedAt}
                    </CardDescription>
                    <a
                      href={news.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary flex items-center hover:underline"
                    >
                      Read more <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
