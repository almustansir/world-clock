/**
 * CityConfig Interface
 * -------------------
 * Defines the required structure for any city added to the dashboard.
 * Using a strict interface ensures type safety across the application
 * when mapping through the city list.
 */
export interface CityConfig {
  /** The display name of the city (e.g., "Dhaka") */
  city: string;
  /** * A valid IANA timezone string.
   * Must be compatible with Intl.DateTimeFormat (e.g., "Asia/Dhaka").
   */
  timezone: string;
  /** The country's emoji flag used for visual decoration */
  flag: string;
  /** Decimal latitude coordinate required for the weather API */
  lat: number;
  /** Decimal longitude coordinate required for the weather API */
  lon: number;
}

/**
 * CITIES Constant
 * ---------------
 * The primary data source for the application.
 * This array is mapped in the main page to generate ClockCard components.
 * * Note on Coordinates: Used for fetching current weather data via Open-Meteo.
 */
export const CITIES: CityConfig[] = [
  {
    city: "Dhaka",
    timezone: "Asia/Dhaka",
    flag: "https://open-meteo.com/images/country-flags/bd.svg", // Bangladesh
    lat: 23.81,
    lon: 90.41,
  },
  {
    city: "Melbourne",
    timezone: "Australia/Melbourne",
    flag: "https://open-meteo.com/images/country-flags/au.svg", // Australia
    lat: -37.81,
    lon: 144.96,
  },
  {
    city: "Texas (Austin)",
    timezone: "America/Chicago",
    flag: "https://open-meteo.com/images/country-flags/us.svg", // USA
    lat: 30.26,
    lon: -97.74,
  },
  {
    city: "New Jersey",
    timezone: "America/New_York",
    flag: "https://open-meteo.com/images/country-flags/us.svg", // USA
    lat: 40.05,
    lon: -74.4,
  },
  {
    city: "Tennessee",
    timezone: "America/Chicago",
    flag: "https://open-meteo.com/images/country-flags/us.svg", // USA
    lat: 35.51,
    lon: -86.58,
  },
];

// https://open-meteo.com/images/country-flags/${result.country_code.toLowerCase()}.svg
// https://open-meteo.com/images/country-flags/BD.svg

// https://open-meteo.com/images/country-flags/bd.svg
// https://open-meteo.com/images/country-flags/bd.svg
