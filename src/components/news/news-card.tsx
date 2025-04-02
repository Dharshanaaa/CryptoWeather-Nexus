"use client";

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

interface NewsCardProps {
  news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-lg">{news.title}</CardTitle>
            <CardDescription>
              {news.source} • {new Date(news.publishedAt).toLocaleDateString()}
            </CardDescription>
          </div>
          {news.imageUrl && (
            <img
              src={news.imageUrl || "/placeholder.svg"}
              alt={news.title}
              className="h-16 w-24 object-cover rounded-md"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=64&width=96";
              }}
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
          {news.description}
        </p>
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
  );
}
