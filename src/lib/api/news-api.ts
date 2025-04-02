// Mock news API functions

// Function to fetch crypto news
export async function fetchCryptoNews() {
    // In a real app, this would be an API call to a news service
    // For this example, we'll return mock data
  
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1200))
  
    // Mock news data
    const mockNews = [
      {
        title: "Bitcoin Surges Past $50,000 as Institutional Interest Grows",
        description:
          "Bitcoin has surged past the $50,000 mark for the first time in several months, driven by increasing institutional adoption and positive market sentiment.",
        url: "#",
        source: "Crypto News Network",
        publishedAt: new Date().toISOString(),
        imageUrl:
          "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Yml0Y29pbnxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        title: "Ethereum 2.0 Upgrade: What You Need to Know",
        description:
          "The long-awaited Ethereum 2.0 upgrade is approaching. Here's what you need to know about the transition to proof-of-stake and what it means for the network.",
        url: "#",
        source: "DeFi Daily",
        publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        imageUrl:
          "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXRoZXJldW18ZW58MHx8MHx8fDA%3D",
      },
      {
        title: "Solana Ecosystem Continues to Grow Despite Recent Network Issues",
        description:
          "Despite facing some network challenges, the Solana ecosystem continues to expand with new projects and increasing developer activity.",
        url: "#",
        source: "Blockchain Insider",
        publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        imageUrl:
          "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c29sYW5hfGVufDB8fDB8fHww",
      },
      {
        title: "Regulatory Clarity: New Crypto Framework Proposed by Lawmakers",
        description:
          "A bipartisan group of lawmakers has proposed a new regulatory framework for cryptocurrencies, aiming to provide clarity for businesses and investors.",
        url: "#",
        source: "Crypto Policy Journal",
        publishedAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        imageUrl: "",
      },
      {
        title: "NFT Market Shows Signs of Recovery After Months of Decline",
        description:
          "After several months of declining sales and interest, the NFT market is showing signs of recovery with increased trading volumes and new collections gaining traction.",
        url: "#",
        source: "Digital Art Review",
        publishedAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
        imageUrl:
          "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmZ0fGVufDB8fDB8fHww",
      },
      {
        title: "DeFi Total Value Locked Reaches New All-Time High",
        description:
          "The total value locked in decentralized finance protocols has reached a new all-time high, indicating growing confidence in the DeFi ecosystem.",
        url: "#",
        source: "DeFi Pulse",
        publishedAt: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
        imageUrl:
          "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVmaXxlbnwwfHwwfHx8MA%3D%3D",
      },
    ]
  
    return mockNews
  }
  
  