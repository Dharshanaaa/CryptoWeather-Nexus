const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || "51cc721d524505109917167fed671120";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Function to fetch current weather data using latitude and longitude
export async function fetchWeatherData(lat: number, lon: number) {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      condition: data.weather[0].main,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return {
      temperature: 0,
      humidity: 0,
      condition: "Unknown",
    };
  }
}

// Function to fetch 5-day forecast data using latitude and longitude
export async function fetchWeatherForecast(lat: number, lon: number) {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();

    return data.list.map((item: any) => ({
      date: item.dt_txt,
      temperature: Math.round(item.main.temp),
      humidity: item.main.humidity,
      condition: item.weather[0].main,
    }));
  } catch (error) {
    console.error("Error fetching weather forecast:", error);
    return [];
  }
}