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
    article_id: string;
    title: string;
    link: string;
    description: string;
    pubDate: string;
    image_url: string;
    source_name: string;
    [key: string]: any;
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
          "https://newsdata.io/api/1/latest?apikey=pub_77690bf4779665392c86956e74c62b921d084&q=crypto"
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.status}`);
        }

        const data: NewsApiResponse = await response.json();

        if (data.status !== "success") {
          throw new Error("API returned unsuccessful status");
        }

        // Map API response to our NewsItem interface
        const news = data.results
          .filter((item) => item.title) // Filter out items without title
          .slice(0, 5) // Get only top 5 news
          .map((item) => ({
            title: item.title,
            description: item.description || "No description available",
            url: item.link,
            source: item.source_name,
            publishedAt: item.pubDate,
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

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Crypto News</h1>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="flex justify-between animate-pulse">
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="h-16 w-24 bg-gray-200 rounded-md"></div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Crypto News</h1>
        <Card>
          <CardContent className="text-center py-10">
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Crypto News</h1>
      </div>

      <div className="space-y-4">
        {newsItems.map((news, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div>
                  <CardTitle className="text-lg">{news.title}</CardTitle>
                  <CardDescription>
                    {news.source} •{" "}
                    {new Date(news.publishedAt).toLocaleDateString()}
                  </CardDescription>
                </div>
                {news.imageUrl && (
                  <img
                    src={news.imageUrl || "/placeholder.svg?height=64&width=96"}
                    alt={news.title}
                    className="h-16 w-24 object-cover rounded-md"
                    onError={(e) => {
                      e.currentTarget.src =
                        "/placeholder.svg?height=64&width=96";
                    }}
                  />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <a
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary flex items-center hover:underline"
              >
                Read more <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
