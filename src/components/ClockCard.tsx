"use client";

import { useState, useEffect } from "react";
import { CityConfig } from "@/constants/cities";

/**
 * Props for the ClockCard component.
 * Extends CityConfig to inherit geographic and identification data.
 */
interface ClockProps extends CityConfig {
  /** Global state determining if time is shown in 24h or 12h format */
  is24Hour: boolean;
  isCelsius: boolean;
}

/**
 * ClockCard Component
 * -------------------
 * Displays a real-time digital clock and localized weather for a specific city.
 * * DESIGN NOTE: Uses 'backdrop-blur' and 'bg-slate-900/85' for a Glassmorphism effect,
 * ensuring readability against the animated background in the parent layout.
 */
export default function ClockCard({
  city,
  timezone,
  flag,
  lat,
  lon,
  is24Hour,
  isCelsius,
}: ClockProps) {
  // --- State Hooks ---
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<{
    temp: number;
    condition: string;
    icon: string; // New property for the emoji
  } | null>(null);

  /**
   * 'mounted' state is critical for Next.js/SSR.
   * It prevents the "Hydration Mismatch" error by ensuring the component
   * only renders time-sensitive data once it reaches the client's browser.
   */
  const [mounted, setMounted] = useState(false);

  // Triggered on initial component mount
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Effect: Time Sync Logic
   * Updates the clock every 1000ms (1 second).
   */
  useEffect(() => {
    if (!mounted) return;

    const update = () => {
      const now = new Date();
      try {
        // Intl.DateTimeFormat handles timezone offsets automatically
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
      } catch (e) {
        console.error("Timezone Error:", timezone, e);
      }
    };

    update();
    const interval = setInterval(update, 1000);

    // Cleanup interval on component unmount to prevent memory leaks
    return () => clearInterval(interval);
  }, [timezone, is24Hour, mounted]);

  /**
   * Effect: Weather Integration
   * Fetches data from Open-Meteo based on latitude/longitude.
   */
  useEffect(() => {
    if (!mounted) return;

    async function fetchWeather() {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
        );
        const data = await response.json();
        const weatherInfo = getWeatherInfo(data.current_weather.weathercode);
        setWeather({
          temp: Math.round(data.current_weather.temperature),
          condition: weatherInfo.condition,
          icon: weatherInfo.icon, // Store the emoji here
        });
      } catch (error) {
        console.error("Weather Error:", error);
      }
    }
    fetchWeather();
  }, [lat, lon, mounted]);

  /**
   * SSR Safety Check
   * While the component is mounting, we show a 'pulse' skeleton to
   * maintain the layout structure without showing incorrect data.
   */
  if (!mounted) {
    return (
      <div className="h-48 w-full bg-slate-900/50 rounded-3xl animate-pulse" />
    );
  }
  // Dynamic temperature calculation
  const displayTemp = weather
    ? isCelsius
      ? weather.temp
      : Math.round((weather.temp * 9) / 5 + 32)
    : null;
  return (
    <div className="bg-slate-900/85 backdrop-blur-md p-6 rounded-3xl shadow-2xl transition-all hover:scale-105 border border-white/10 flex flex-col items-center">
      {/* City Identification Section */}
      <div className="flex items-center gap-3 text-sky-400 text-xl mb-2 font-semibold">
        {/* The City Name */}
        <span>{city}</span>

        {/* The Flag Image */}
        <img
          src={flag}
          alt=""
          className="w-7 h-5 object-cover rounded shadow-sm border border-white/10"
        />
      </div>

      {/* Primary Clock Display - uses monospace font for stability */}
      <div className="text-4xl font-bold font-mono mb-2">
        {time || "--:--:--"}
      </div>

      {/* Localized Date */}
      <div className="text-slate-300 text-sm mb-4">{date}</div>

      {/* Bottom Weather Dashboard Section */}
      <div className="pt-4 border-t border-white/5 w-full flex justify-around items-center">
        {weather ? (
          <>
            {/* Left side: Icon and Temp */}
            <div className="flex items-center gap-3">
              <span className="text-3xl">{weather.icon}</span>
              <span className="text-2xl font-bold text-white">
                {displayTemp}
                {isCelsius ? "°C" : "°F"}
              </span>
            </div>

            {/* Right side: Condition text */}
            <div className="text-right">
              <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">
                {weather.condition}
              </span>
            </div>
          </>
        ) : (
          <div className="text-slate-500 text-xs font-mono animate-pulse uppercase tracking-widest">
            📡 Loading Weather Data...
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Maps WMO Weather interpretation codes to descriptions and emojis.
 * @param code - The numeric weather code from Open-Meteo
 * @returns An object containing the condition text and an emoji icon
 */
function getWeatherInfo(code: number): { condition: string; icon: string } {
  const weatherMap: Record<number, { condition: string; icon: string }> = {
    0: { condition: "Clear Sky", icon: "☀️" },
    1: { condition: "Mainly Clear", icon: "🌤️" },
    2: { condition: "Partly Cloudy", icon: "⛅" },
    3: { condition: "Overcast", icon: "☁️" },
    45: { condition: "Foggy", icon: "🌫️" },
    48: { condition: "Rime Fog", icon: "🌫️" },
    51: { condition: "Light Drizzle", icon: "🌦️" },
    61: { condition: "Slight Rain", icon: "🌧️" },
    63: { condition: "Moderate Rain", icon: "🌧️" },
    71: { condition: "Slight Snow", icon: "❄️" },
    95: { condition: "Thunderstorm", icon: "⛈️" },
  };

  return weatherMap[code] || { condition: "Variable", icon: "🌡️" };
}
