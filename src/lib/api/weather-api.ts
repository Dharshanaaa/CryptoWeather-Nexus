import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || "9621e70149d1dc2a9909b93c1c22c4de";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Function to fetch current weather data using latitude and longitude
export function fetchWeatherData(lat: number, lon: number) {
  return axios.get(`${BASE_URL}/weather`, {
    params: {
      lat,
      lon,
      units: "metric",
      appid: API_KEY,
    },
  })
  .then(response => ({
    temperature: Math.round(response.data.main.temp),
    humidity: response.data.main.humidity,
    condition: response.data.weather[0].main,
  }))
  .catch(error => {
    console.error("Error fetching weather data:", error);
    return {
      temperature: 0,
      humidity: 0,
      condition: "Unknown",
    };
  });
}

// Function to fetch 5-day forecast data using latitude and longitude
export function fetchWeatherForecast(lat: number, lon: number) {
  return axios.get(`${BASE_URL}/forecast`, {
    params: {
      lat,
      lon,
      units: "metric",
      appid: API_KEY,
    },
  })
  .then(response => 
    response.data.list.map((item: any) => ({
      date: item.dt_txt,
      temperature: Math.round(item.main.temp),
      humidity: item.main.humidity,
      condition: item.weather[0].main,
    }))
  )
  .catch(error => {
    console.error("Error fetching weather forecast:", error);
    return [];
  });
}