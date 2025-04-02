// Real news API using NewsAPI
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY || "YOUR_API_KEY"
const BASE_URL = "https://newsapi.org/v2"

// Function to fetch crypto news
export async function fetchCryptoNews() {
  try {
    const response = await fetch(
      `${BASE_URL}/everything?q=cryptocurrency+OR+bitcoin+OR+ethereum&sortBy=publishedAt&pageSize=5&apiKey=${API_KEY}`,
    )

    if (!response.ok) {
      throw new Error(`News API error: ${response.status}`)
    }

    const data = await response.json()

    // Transform the API response to match our app's data structure
    return data.articles.map((article: any) => ({
      title: article.title,
      description: article.description || "No description available",
      url: article.url,
      source: article.source.name,
      publishedAt: article.publishedAt,
      imageUrl: article.urlToImage,
    }))
  } catch (error) {
    console.error("Error fetching news:", error)
    // Return fallback data in case of error
    return Array(5)
      .fill(null)
      .map((_, i) => ({
        title: "Failed to load news",
        description: "Please try again later",
        url: "#",
        source: "Error",
        publishedAt: new Date().toISOString(),
        imageUrl: "",
      }))
  }
}

