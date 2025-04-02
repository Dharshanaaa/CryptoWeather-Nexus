import Link from "next/link";
import { fetchWeatherData } from "@/lib/api/weather-api";
import WeatherCard from "./weather-card";

export default async function WeatherSection() {
  // Cities to display
  const cities = ["New York", "London", "Tokyo"];

  // Fetch weather data for all cities in parallel
  const weatherDataPromises = cities.map((city) => fetchWeatherData(city));
  const weatherData = await Promise.all(weatherDataPromises);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {weatherData.map((data, index) => (
        <Link
          key={cities[index]}
          href={`/city/${encodeURIComponent(cities[index].toLowerCase())}`}
          className="block transition-transform hover:scale-[1.02]"
        >
          <WeatherCard city={cities[index]} weatherData={data} />
        </Link>
      ))}
    </div>
  );
}
