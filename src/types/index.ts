export interface CityConfig {
  city: string;
  timezone: string;
  flag: string;
  lat: number;
  lon: number;
}

export interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
}
