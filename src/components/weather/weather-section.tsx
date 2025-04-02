import Link from "next/link";
import { fetchWeatherData } from "@/lib/api/weather-api";
import WeatherCard from "./weather-card";

export default async function WeatherSection() {
  // Locations to display
  const locations = [
    { lat: 40.7128, lon: -74.006 }, // New York
    { lat: 51.5074, lon: -0.1278 }, // London
    { lat: 35.6895, lon: 139.6917 }, // Tokyo
  ];

  // Fetch weather data for all locations in parallel
  const weatherDataPromises = locations.map(({ lat, lon }) =>
    fetchWeatherData(lat, lon)
  );
  const weatherData = await Promise.all(weatherDataPromises);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {weatherData.map((data, index) => (
        <Link
          key={`${locations[index].lat},${locations[index].lon}`}
          href={`/pages/city?lat=${locations[index].lat}&lon=${locations[index].lon}`}
          className="block transition-transform hover:scale-[1.02]"
        >
          <WeatherCard
            lat={locations[index].lat}
            lon={locations[index].lon}
            weatherData={data}
          />
        </Link>
      ))}
    </div>
  );
}
