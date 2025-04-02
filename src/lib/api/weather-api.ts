// Mock weather API functions

// Function to fetch current weather data for a city
export async function fetchWeatherData(city: string) {
    // In a real app, this would be an API call to a weather service
    // For this example, we'll return mock data
  
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    // Mock data based on city
    const mockData: Record<string, any> = {
      "New York": {
        temperature: 18,
        humidity: 65,
        condition: "Cloudy",
      },
      London: {
        temperature: 14,
        humidity: 80,
        condition: "Rain",
      },
      Tokyo: {
        temperature: 25,
        humidity: 70,
        condition: "Clear",
      },
    }
  
    // Return data for the requested city, or default data if city not found
    return (
      mockData[city] || {
        temperature: 20,
        humidity: 60,
        condition: "Clear",
      }
    )
  }
  
  // Function to fetch weather history for a city
  export async function fetchCityWeatherHistory(city: string) {
    // In a real app, this would be an API call to a weather service
    // For this example, we'll return mock data
  
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
  
    // Generate mock historical data
    const today = new Date()
    const history = []
  
    // Generate data for the last 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
  
      // Generate random data with some variation based on the city
      let baseTemp = 0
      let baseHumidity = 0
      let conditions = ["Clear", "Cloudy", "Rain"]
  
      if (city.toLowerCase() === "new york") {
        baseTemp = 18
        baseHumidity = 65
      } else if (city.toLowerCase() === "london") {
        baseTemp = 14
        baseHumidity = 80
        conditions = ["Cloudy", "Rain", "Clear"]
      } else if (city.toLowerCase() === "tokyo") {
        baseTemp = 25
        baseHumidity = 70
      }
  
      // Add some random variation
      const temp = baseTemp + Math.floor(Math.random() * 6) - 3
      const humidity = baseHumidity + Math.floor(Math.random() * 10) - 5
      const condition = conditions[Math.floor(Math.random() * conditions.length)]
  
      history.push({
        date: date.toISOString(),
        temperature: temp,
        humidity: humidity,
        condition: condition,
      })
    }
  
    return history
  }
  
  