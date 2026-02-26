"use client";
import { useState, useEffect, useRef } from "react";
import { CityConfig } from "@/constants/cities";

interface CitySearchProps {
  onCityAdd: (city: CityConfig) => void;
}

export default function CitySearch({ onCityAdd }: CitySearchProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // --- 1. Debounced Search Logic ---
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length < 3) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=en&format=json`,
        );
        const data = await res.json();
        setSuggestions(data.results || []);
      } catch (err) {
        console.error("Suggestions failed", err);
      } finally {
        setLoading(false);
      }
    }, 400); // Wait 400ms after last keystroke

    return () => clearTimeout(timer);
  }, [query]);

  // --- 2. Selection Handler ---
  const handleSelect = (result: any) => {
    const newCity: CityConfig = {
      city: result.name,
      timezone: result.timezone,
      flag: result.country_code
        ? `https://open-meteo.com/images/country-flags/${result.country_code.toLowerCase()}.svg`
        : "📍",
      lat: result.latitude,
      lon: result.longitude,
    };
    onCityAdd(newCity);
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div className="relative w-full max-w-md mb-10" ref={dropdownRef}>
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="flex-1 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
      </div>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(s)}
              className="w-full px-4 py-3 text-left hover:bg-white/5 border-b border-white/5 last:border-0 flex justify-between items-center transition-colors"
            >
              <div>
                <span className="text-white font-medium">{s.name}</span>
                <span className="text-slate-500 text-xs ml-2">
                  {s.admin1 ? `${s.admin1}, ` : ""}
                  {s.country}
                </span>
              </div>
              <span className="text-xs text-slate-400 opacity-60 italic">
                {s.timezone}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
