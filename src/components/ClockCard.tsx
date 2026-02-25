"use client";
import { useState, useEffect } from "react";
import { CityConfig } from "@/constants/cities";

interface ClockProps extends CityConfig {
  is24Hour: boolean;
}

export default function ClockCard({
  city,
  timezone,
  flag,
  lat,
  lon,
  is24Hour,
}: ClockProps) {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<{
    temp: number;
    condition: string;
  } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const update = () => {
      const now = new Date();
      try {
        setTime(
          new Intl.DateTimeFormat("en-US", {
            timeZone: timezone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: !is24Hour,
          }).format(now),
        );

        setDate(
          new Intl.DateTimeFormat("en-US", {
            timeZone: timezone,
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(now),
        );

        // Offset calculation logic removed from here
      } catch (e) {
        console.error("Timezone Error:", timezone, e);
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [timezone, is24Hour, mounted]);

  useEffect(() => {
    if (!mounted) return;
    async function fetchWeather() {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
        );
        const data = await response.json();
        setWeather({
          temp: Math.round(data.current_weather.temperature),
          condition: getWeatherDesc(data.current_weather.weathercode),
        });
      } catch (error) {
        console.error("Weather Error:", error);
      }
    }
    fetchWeather();
  }, [lat, lon, mounted]);

  if (!mounted) {
    return (
      <div className="h-48 w-full bg-slate-900/50 rounded-3xl animate-pulse" />
    );
  }

  return (
    <div className="bg-slate-900/85 backdrop-blur-md p-6 rounded-3xl shadow-2xl transition-all hover:scale-105 border border-white/10 flex flex-col items-center">
      <div className="text-sky-400 text-xl mb-1 font-medium">
        {city} {flag}
      </div>
      <div className="text-4xl font-bold font-mono mb-2">
        {time || "--:--:--"}
      </div>
      <div className="text-slate-300 text-sm mb-4">{date}</div>

      {/* UTC Offset section has been removed from here */}

      <div className="pt-4 border-t border-white/5 w-full flex justify-around items-center">
        {weather ? (
          <>
            <div className="text-2xl font-semibold text-white">
              {weather.temp}°C
            </div>
            <div className="text-slate-400 italic">{weather.condition}</div>
          </>
        ) : (
          <div className="text-slate-500 text-xs">Fetching Weather...</div>
        )}
      </div>
    </div>
  );
}

function getWeatherDesc(code: number): string {
  const descriptions: Record<number, string> = {
    0: "Clear Sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Rime Fog",
    51: "Light Drizzle",
    61: "Slight Rain",
    71: "Slight Snow",
    95: "Thunderstorm",
  };
  return descriptions[code] || "Variable";
}
