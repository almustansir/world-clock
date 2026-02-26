"use client";
import { CityConfig } from "@/constants/cities";
import { useState } from "react";

interface CitySearchProps {
  onCityAdd: (city: CityConfig) => void;
}

export default function CitySearch({ onCityAdd }: CitySearchProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      // Fetch geocoding data from Open-Meteo
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1&language=en&format=json`,
      );
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        const result = data.results[0];

        // Map API response to our CityConfig format
        const newCity = {
          city: result.name,
          timezone: result.timezone,
          flag: result.country_code === "BD" ? "🇧🇩" : "📍", // Simple flag logic or use a map
          lat: result.latitude,
          lon: result.longitude,
        };

        onCityAdd(newCity);
        setQuery("");
      } else {
        alert("City not found. Please try again!");
      }
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-10 w-full max-w-md flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Add a city (e.g. London, Tokyo)..."
        className="flex-1 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-sky-400 text-slate-950 font-bold rounded-xl hover:bg-white transition-all disabled:opacity-50"
      >
        {loading ? "..." : "Add"}
      </button>
    </form>
  );
}
