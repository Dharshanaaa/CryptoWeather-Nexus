// Real crypto API using CoinGecko
import axios from 'axios';

const BASE_URL = "https://api.coingecko.com/api/v3"

// Function to fetch current crypto data
export function fetchCryptoData(cryptoId: string) {
  return axios.get(
    `${BASE_URL}/coins/${cryptoId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`,
  )
  .then(response => {
    const data = response.data;

    // Transform the API response to match our app's data structure
    return {
      name: data.name,
      symbol: data.symbol,
      price: data.market_data.current_price.usd,
      change24h: data.market_data.price_change_percentage_24h,
      marketCap: data.market_data.market_cap.usd,
      image: data.image.small,
    };
  })
  .catch(error => {
    console.error("Error fetching crypto data:", error);
    // Return fallback data in case of error
    return {
      name: "Unknown",
      symbol: "???",
      price: 0,
      change24h: 0,
      marketCap: 0,
      image: "/placeholder.svg?height=24&width=24",
    };
  });
}

// Function to fetch crypto price history
export function fetchCryptoHistory(cryptoId: string) {
  return axios.get(`${BASE_URL}/coins/${cryptoId}/market_chart?vs_currency=usd&days=30&interval=daily`)
  .then(response => {
    const data = response.data;

    // Transform the API response to match our app's data structure
    return data.prices.map((item: [number, number], index: number) => {
      const date = new Date(item[0]);
      const price = item[1];
      // Volume data is in a separate array in the response
      const volume = data.total_volumes[index] ? data.total_volumes[index][1] : 0;

      return {
        date: date.toISOString(),
        price,
        volume,
      };
    });
  })
  .catch(error => {
    console.error("Error fetching crypto history:", error);
    // Return fallback data in case of error
    const today = new Date();
    return Array(30)
      .fill(null)
      .map((_, i) => {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        return {
          date: date.toISOString(),
          price: 0,
          volume: 0,
        };
      });
  });
}

// Function to fetch detailed crypto information
export function fetchCryptoDetails(cryptoId: string) {
  return axios.get(
    `${BASE_URL}/coins/${cryptoId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`,
  )
  .then(response => {
    const data = response.data;

    // Transform the API response to match our app's data structure
    return {
      name: data.name,
      symbol: data.symbol,
      price: data.market_data.current_price.usd,
      change24h: data.market_data.price_change_percentage_24h,
      marketCap: data.market_data.market_cap.usd,
      image: data.image.small,
      volume24h: data.market_data.total_volume.usd,
      low24h: data.market_data.low_24h.usd,
      high24h: data.market_data.high_24h.usd,
      ath: data.market_data.ath.usd,
      athDate: data.market_data.ath_date.usd,
      athChangePercentage: data.market_data.ath_change_percentage.usd,
      circulatingSupply: data.market_data.circulating_supply,
      totalSupply: data.market_data.total_supply,
      maxSupply: data.market_data.max_supply,
    };
  })
  .catch(error => {
    console.error("Error fetching crypto details:", error);
    // Return fallback data in case of error
    return {
      name: "Unknown",
      symbol: "???",
      price: 0,
      change24h: 0,
      marketCap: 0,
      image: "/placeholder.svg?height=24&width=24",
      volume24h: 0,
      low24h: 0,
      high24h: 0,
      ath: 0,
      athDate: new Date().toISOString(),
      athChangePercentage: 0,
      circulatingSupply: 0,
      totalSupply: 0,
      maxSupply: 0,
    };
  });
}