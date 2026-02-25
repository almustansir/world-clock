"use client";
import { useState } from "react";
import ClockCard from "@/components/ClockCard";
import { CITIES } from "@/constants/cities"; // Import it here

export default function WorldClockPage() {
  const [is24Hour, setIs24Hour] = useState<boolean>(false);

  return (
    <main className="flex flex-col items-center py-12 px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-md">
        🌍 World Digital Clocks
      </h1>

      <button
        onClick={() => setIs24Hour(!is24Hour)}
        className="mb-12 px-8 py-3 bg-sky-400 text-slate-950 font-bold rounded-full hover:bg-white transition-all shadow-lg active:scale-95 cursor-pointer"
      >
        {is24Hour ? "Switch to 12-Hour Format" : "Switch to 24-Hour Format"}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {CITIES.map((loc) => (
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
