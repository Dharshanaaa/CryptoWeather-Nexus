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

  useEffect(() => {
    const fetchCryptoNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://newsdata.io/api/1/latest?apikey=pub_7769018ec61421602b059b42b68036b6dde15&q=crypto"
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.status}`);
        }

        const data: NewsApiResponse = await response.json();

        if (data.status !== "success") {
          throw new Error("API returned unsuccessful status");
        }

        const news = data.results
          .filter((item) => item.title) // Filter out items without title
          .slice(0, 5) // Get top 5 news
          .map((item) => ({
            title: item.title,
            description: item.description || "No description available",
            url: item.link,
            source: item.source_name,
            publishedAt: new Date(item.pubDate).toLocaleDateString(),
            imageUrl: item.image_url || "/placeholder.svg?height=64&width=96",
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
                  <img
                    src={news.imageUrl}
                    alt={news.title}
                    className="h-16 w-24 object-cover rounded-md"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "/placeholder.svg?height=64&width=96")
                    }
                  />
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
