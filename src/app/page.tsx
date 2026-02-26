"use client";

import { useState } from "react";
import ClockCard from "@/components/ClockCard";
import CitySearch from "@/components/CitySearch"; // Ensure you created this file!
import { CITIES as initialCities } from "@/constants/cities";
import { CityConfig } from "@/types";

/**
 * WorldClockPage
 * Now handles a dynamic list of cities using React State.
 */
export default function WorldClockPage() {
  const [is24Hour, setIs24Hour] = useState<boolean>(false);

  // Initialize state with your default cities from cities.ts
  const [cities, setCities] = useState<CityConfig[]>(initialCities);

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

  return (
    <main className="flex flex-col items-center py-12 px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-md">
        🌍 World Digital Clocks
      </h1>

      {/* Container for Search and Toggle */}
      <div className="flex flex-col items-center w-full max-w-md gap-4 mb-12">
        {/* Pass the addCity function as a prop to the Search component */}
        <CitySearch onCityAdd={addCity} />

        <button
          onClick={() => setIs24Hour(!is24Hour)}
          className="w-full px-8 py-3 bg-sky-400 text-slate-950 font-bold rounded-xl hover:bg-white transition-all shadow-lg active:scale-95 cursor-pointer"
        >
          {is24Hour ? "Switch to 12-Hour Format" : "Switch to 24-Hour Format"}
        </button>
      </div>

      {/* The Grid mapping the current state of 'cities' */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {cities.map((loc) => (
          <ClockCard
            key={`${loc.timezone}-${loc.city}`}
            {...loc}
            is24Hour={is24Hour}
          />
        ))}
      </div>
    </main>
  );
}
