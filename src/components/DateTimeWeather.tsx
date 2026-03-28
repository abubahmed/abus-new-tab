"use client";

import { useState, useEffect } from "react";

interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  city: string;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function formatDate(date: Date): string {
  return date.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function DateTimeWeather() {
  const [now, setNow] = useState(new Date());
  const [weather, setWeather] = useState<WeatherData | null>(null);

  // Update clock every minute
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  // Fetch weather on mount
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`
          );
          const data = await res.json();
          const current = data.current;

          // Reverse geocode for city name
          let city = "";
          try {
            const geoRes = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const geoData = await geoRes.json();
            city = geoData.city || geoData.locality || "";
          } catch {
            // ignore
          }

          const code = current.weather_code;
          const { description, icon } = weatherCodeToInfo(code);

          setWeather({
            temp: Math.round(current.temperature_2m),
            description,
            icon,
            city,
          });
        } catch {
          // ignore weather errors
        }
      },
      () => {
        // Permission denied or error — no weather shown
      }
    );
  }, []);

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="text-6xl font-light text-[#e8eaed] tracking-tight">
        {formatTime(now)}
      </div>
      <div className="text-lg text-[#9aa0a6] mt-1">
        {formatDate(now)}
      </div>
      {weather && (
        <div className="flex items-center gap-2 mt-2 text-sm text-[#9aa0a6]">
          <span className="text-xl">{weather.icon}</span>
          <span>{weather.temp}°F</span>
          <span className="text-[#5f6368]">·</span>
          <span>{weather.description}</span>
          {weather.city && (
            <>
              <span className="text-[#5f6368]">·</span>
              <span>{weather.city}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function weatherCodeToInfo(code: number): { description: string; icon: string } {
  if (code === 0) return { description: "Clear", icon: "☀️" };
  if (code <= 3) return { description: "Partly cloudy", icon: "⛅" };
  if (code <= 48) return { description: "Foggy", icon: "🌫️" };
  if (code <= 57) return { description: "Drizzle", icon: "🌦️" };
  if (code <= 67) return { description: "Rain", icon: "🌧️" };
  if (code <= 77) return { description: "Snow", icon: "🌨️" };
  if (code <= 82) return { description: "Rain showers", icon: "🌧️" };
  if (code <= 86) return { description: "Snow showers", icon: "🌨️" };
  if (code <= 99) return { description: "Thunderstorm", icon: "⛈️" };
  return { description: "Unknown", icon: "🌡️" };
}
