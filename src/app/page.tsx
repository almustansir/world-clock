"use client";

import { useState } from "react";
import ClockCard from "@/components/ClockCard";
import { CITIES } from "@/constants/cities";

/**
 * WorldClockPage - The primary entry point for the World Clock application.
 * * This component manages the global state for time formatting and iterates
 * through the city data to render a responsive grid of clock components.
 * * @returns A layout containing the header, format toggle, and clock grid.
 */
export default function WorldClockPage() {
  /**
   * is24Hour (State): Controls the time display format for all child ClockCards.
   * Defaulted to false (12-hour format) to match traditional consumer clocks.
   */
  const [is24Hour, setIs24Hour] = useState<boolean>(false);

  return (
    <main className="flex flex-col items-center py-12 px-6">
      {/* Main Heading: Optimized with drop-shadow for legibility 
          against the animated gradient background.
      */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-md">
        🌍 World Digital Clocks
      </h1>

      {/* Format Toggle Button: 
          Uses Tailwind's active:scale-95 to provide haptic-like visual feedback.
      */}
      <button
        onClick={() => setIs24Hour(!is24Hour)}
        className="mb-12 px-8 py-3 bg-sky-400 text-slate-950 font-bold rounded-full hover:bg-white transition-all shadow-lg active:scale-95 cursor-pointer"
        aria-label="Toggle time format"
      >
        {is24Hour ? "Switch to 12-Hour Format" : "Switch to 24-Hour Format"}
      </button>

      {/* Clock Grid System:
          - Responsive design: 1 column (mobile), 2 columns (tablet), 3 columns (desktop).
          - max-w-6xl: Ensures the grid doesn't become too wide on ultra-wide monitors.
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {CITIES.map((loc) => (
          /* Spread operator {...loc} passes city, timezone, flag, lat, and lon 
             directly as props to the ClockCard component.
          */
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
