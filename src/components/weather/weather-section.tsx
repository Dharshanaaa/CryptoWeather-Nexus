import Link from "next/link";
import { fetchWeatherData } from "@/lib/api/weather-api";
import WeatherCard from "./weather-card";
import { useEffect, useState } from "react";

export default function WeatherSection() {
  // Locations with city names
  const locations = [
    { lat: 40.7128, lon: -74.006, city: "New York" },
    { lat: 51.5074, lon: -0.1278, city: "London" },
    { lat: 35.6895, lon: 139.6917, city: "Tokyo" },
  ];

  const [weatherData, setWeatherData] = useState<any[]>([]);

  useEffect(() => {
    const weatherDataPromises = locations.map(({ lat, lon }) =>
      fetchWeatherData(lat, lon)
    );

    Promise.all(weatherDataPromises)
      .then((data) => setWeatherData(data))
      .catch((error) => console.error("Error fetching weather data:", error));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {weatherData.map((data, index) => (
        <Link
          key={`${locations[index].lat},${locations[index].lon}`}
          href={`/pages/city?lat=${locations[index].lat}&lon=${locations[index].lon}`}
          className="block transition-transform hover:scale-[1.02]"
        >
          <WeatherCard city={locations[index].city} weatherData={data} />
        </Link>
      ))}
    </div>
  );
}
