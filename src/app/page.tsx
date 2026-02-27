"use client";

import { useState, useEffect } from "react";
import ClockCard from "@/components/ClockCard";
import CitySearch from "@/components/CitySearch"; // Ensure you created this file!
import { CITIES as defaultCities } from "@/constants/cities";
import { CityConfig } from "@/types";

/**
 * WorldClockPage
 * Now handles a dynamic list of cities using React State.
 */
export default function WorldClockPage() {
  const [is24Hour, setIs24Hour] = useState<boolean>(false);
  // We start with an empty array or defaultCities to prevent SSR flickering
  const [cities, setCities] = useState<CityConfig[]>(defaultCities);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isCelsius, setIsCelsius] = useState<boolean>(true); // New State

  // --- 1. Load from localStorage on Mount ---
  useEffect(() => {
    const savedCities = localStorage.getItem("world_clock_cities");
    if (savedCities) {
      try {
        setCities(JSON.parse(savedCities));
      } catch (e) {
        console.error("Failed to parse saved cities", e);
      }
    }
    setHasLoaded(true);
  }, []);

  // --- 2. Save to localStorage whenever 'cities' changes ---
  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem("world_clock_cities", JSON.stringify(cities));
    }
  }, [cities, hasLoaded]);

  // Add to your useEffect (Save/Load logic)
  useEffect(() => {
    const savedUnit = localStorage.getItem("world_clock_unit");
    if (savedUnit) setIsCelsius(JSON.parse(savedUnit));
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem("world_clock_unit", JSON.stringify(isCelsius));
    }
  }, [isCelsius, hasLoaded]);

  /**
   * This is the function that was missing!
   * It takes a new city object and adds it to our state array.
   */
  const addCity = (newCity: CityConfig) => {
    // Prevent adding the exact same city twice
    const exists = cities.find(
      (c) => c.city === newCity.city && c.timezone === newCity.timezone,
    );

    if (!exists) {
      // We use the spread operator to create a new array with the new city at the top
      setCities([newCity, ...cities]);
    }
  };

  // Function to remove cities
  const removeCity = (cityToDelete: string) => {
    setCities(cities.filter((c) => c.city !== cityToDelete));
  };

  /**
   * Resets the dashboard to its initial state.
   * Clears localStorage and reverts the cities array to the original list.
   */
  const resetToDefaults = () => {
    if (
      confirm(
        "Are you sure you want to reset? This will remove all your added cities.",
      )
    ) {
      localStorage.removeItem("world_clock_cities"); // Clear the saved data
      setCities(defaultCities); // Revert state to the imported constant
    }
  };

  return (
    <main className="flex flex-col items-center py-12 px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-16 text-white drop-shadow-md">
        🌍 World Digital Clocks
      </h1>

      <div className="flex flex-col items-center w-full max-w-md gap-1 mb-4">
        <CitySearch onCityAdd={addCity} />

        <div className="grid grid-cols-2 gap-5 w-full">
          {/* Toggle Button */}
          <button
            onClick={() => setIs24Hour(!is24Hour)}
            className="px-4 py-3 bg-sky-400 text-slate-950 font-bold rounded-xl hover:bg-white transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            {is24Hour ? "12H Format" : "24H Format"}
          </button>
          {/* Unit Toggle Button */}
          <button
            onClick={() => setIsCelsius(!isCelsius)}
            className="px-4 py-3 bg-amber-400 text-slate-950 font-bold rounded-xl hover:bg-white transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            {isCelsius ? "°C" : "°F"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {cities.map((loc) => (
          <div key={`${loc.timezone}-${loc.city}`} className="relative group">
            <ClockCard {...loc} is24Hour={is24Hour} isCelsius={isCelsius} />

            {/* Simple Remove Button - hidden until hover */}
            <button
              onClick={() => removeCity(loc.city)}
              className="absolute -top-2 -right-2 bg-red-500 text-white w-8 h-8 rounded-full md:opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600 cursor-pointer z-10"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-start mt-16 w-full max-w-6xl gap-1 mb-4">
        {/* New Reset Button */}
        <button
          onClick={resetToDefaults}
          className="px-4 mt-10 py-3 bg-white/10 text-white border border-white/20 font-bold rounded-xl hover:bg-red-500 hover:border-red-500 transition-all active:scale-95 cursor-pointer"
        >
          Reset Defaults
        </button>
      </div>
    </main>
  );
}
