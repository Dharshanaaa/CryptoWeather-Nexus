// Mock crypto API functions

// Function to fetch current crypto data
export async function fetchCryptoData(cryptoId: string) {
    // In a real app, this would be an API call to a crypto service like CoinGecko
    // For this example, we'll return mock data
  
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))
  
    // Mock data based on crypto ID
    const mockData: Record<string, any> = {
      bitcoin: {
        name: "Bitcoin",
        symbol: "btc",
        price: 50000 + Math.random() * 2000,
        change24h: 2.5,
        marketCap: 950000000000,
        image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
      },
      ethereum: {
        name: "Ethereum",
        symbol: "eth",
        price: 3000 + Math.random() * 200,
        change24h: -1.2,
        marketCap: 350000000000,
        image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
      },
      solana: {
        name: "Solana",
        symbol: "sol",
        price: 100 + Math.random() * 10,
        change24h: 5.7,
        marketCap: 40000000000,
        image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
      },
    }
  
    // Return data for the requested crypto, or default data if crypto not found
    return (
      mockData[cryptoId] || {
        name: "Unknown",
        symbol: "???",
        price: 100,
        change24h: 0,
        marketCap: 1000000000,
        image: "/placeholder.svg?height=24&width=24",
      }
    )
  }
  
  // Function to fetch crypto price history
  export async function fetchCryptoHistory(cryptoId: string) {
    // In a real app, this would be an API call to a crypto service
    // For this example, we'll return mock data
  
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1200))
  
    // Generate mock historical data
    const today = new Date()
    const history = []
  
    // Base price depends on the crypto
    let basePrice = 100
    if (cryptoId === "bitcoin") {
      basePrice = 50000
    } else if (cryptoId === "ethereum") {
      basePrice = 3000
    } else if (cryptoId === "solana") {
      basePrice = 100
    }
  
    // Generate data for the last 30 days
    for (let i = 0; i < 30; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
  
      // Add some random variation to create a somewhat realistic price chart
      // More recent days have more influence from the previous day
      const randomFactor = i === 0 ? 0 : Math.random() * 0.1 - 0.05
  
      if (i === 0) {
        history.push({
          date: date.toISOString(),
          price: basePrice,
          volume: Math.floor(Math.random() * basePrice * 10000),
        })
      } else {
        const prevPrice = history[i - 1].price
        const newPrice = prevPrice * (1 + randomFactor)
  
        history.push({
          date: date.toISOString(),
          price: newPrice,
          volume: Math.floor(Math.random() * basePrice * 10000),
        })
      }
    }
  
    return history
  }
  
  // Function to fetch detailed crypto information
  export async function fetchCryptoDetails(cryptoId: string) {
    // In a real app, this would be an API call to a crypto service
    // For this example, we'll return mock data
  
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    // Base data from the regular crypto data function
    const baseData = await fetchCryptoData(cryptoId)
  
    // Add additional metrics
    const additionalData = {
      volume24h: baseData.price * 1000000 * (0.5 + Math.random()),
      low24h: baseData.price * 0.95,
      high24h: baseData.price * 1.05,
      ath: baseData.price * 1.5,
      athDate: "2021-11-10T14:24:11.849Z",
      athChangePercentage: -30 + Math.random() * 10,
      circulatingSupply: 0,
      totalSupply: 0,
      maxSupply: 0,
    }
  
    // Customize supply data based on crypto
    if (cryptoId === "bitcoin") {
      additionalData.circulatingSupply = 19000000
      additionalData.totalSupply = 21000000
      additionalData.maxSupply = 21000000
    } else if (cryptoId === "ethereum") {
      additionalData.circulatingSupply = 120000000
      additionalData.totalSupply = 120000000
      additionalData.maxSupply = 0 // No max supply for ETH
    } else if (cryptoId === "solana") {
      additionalData.circulatingSupply = 350000000
      additionalData.totalSupply = 500000000
      additionalData.maxSupply = 0 // No fixed max supply
    }
  
    return {
      ...baseData,
      ...additionalData,
    }
  }
  
  