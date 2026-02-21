"use client";
import { useState, useEffect } from "react";

interface ClockProps {
  city: string;
  timezone: string;
  flag: string;
  is24Hour: boolean;
}

export default function ClockCard({
  city,
  timezone,
  flag,
  is24Hour,
}: ClockProps) {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [offset, setOffset] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();

      try {
        // Format Time based on user preference
        setTime(
          new Intl.DateTimeFormat("en-US", {
            timeZone: timezone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: !is24Hour,
          }).format(now),
        );

        // Format Date string
        setDate(
          new Intl.DateTimeFormat("en-US", {
            timeZone: timezone,
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(now),
        );

        // Calculate UTC Offset
        const tzDate = new Date(
          now.toLocaleString("en-US", { timeZone: timezone }),
        );
        const diffMinutes = Math.round(
          (tzDate.getTime() - now.getTime()) / 60000,
        );
        const hours = Math.floor(diffMinutes / 60);
        const mins = Math.abs(diffMinutes % 60);

        setOffset(
          `UTC ${hours >= 0 ? "+" : ""}${hours}${mins ? ":" + mins : ""}`,
        );
      } catch (e) {
        console.error("Invalid timezone provided:", timezone);
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [timezone, is24Hour]);

  return (
    <div className="bg-slate-900/85 backdrop-blur-md p-6 rounded-3xl shadow-2xl transition-transform hover:-translate-y-2 border border-white/10 flex flex-col items-center">
      <div className="text-sky-400 text-xl mb-2 font-medium">
        {city} {flag}
      </div>
      <div className="text-4xl font-bold font-mono tracking-tight">
        {time || "--:--:--"}
      </div>
      <div className="text-slate-300 text-sm mt-3">{date}</div>
      <div className="text-slate-500 text-xs mt-1 font-semibold uppercase tracking-wider">
        {offset}
      </div>
    </div>
  );
}
