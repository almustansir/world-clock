export interface CityConfig {
  city: string;
  timezone: string;
  flag: string;
  lat: number;
  lon: number;
}

export const CITIES: CityConfig[] = [
  { city: "Dhaka", timezone: "Asia/Dhaka", flag: "🇧🇩", lat: 23.81, lon: 90.41 },
  {
    city: "Melbourne",
    timezone: "Australia/Melbourne",
    flag: "🇦🇺",
    lat: -37.81,
    lon: 144.96,
  },
  {
    city: "Texas (Austin)",
    timezone: "America/Chicago",
    flag: "🇺🇸",
    lat: 30.26,
    lon: -97.74,
  },
  {
    city: "New Jersey",
    timezone: "America/New_York",
    flag: "🇺🇸",
    lat: 40.05,
    lon: -74.4,
  },
  {
    city: "Tennessee",
    timezone: "America/Chicago",
    flag: "🇺🇸",
    lat: 35.51,
    lon: -86.58,
  },
];
