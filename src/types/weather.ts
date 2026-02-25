/**
 * WeatherData Interface
 * ---------------------
 * Represents the processed weather information used by the ClockCard components.
 * This structure decouples the raw API response from the UI requirements.
 */
export interface WeatherData {
  /** * Current temperature value.
   * Usually rounded to the nearest integer for a cleaner UI display.
   */
  temp: number;

  /** * A human-readable description of the weather (e.g., "Clear Sky", "Rainy").
   * This is typically mapped from numeric weather codes provided by the API.
   */
  condition: string;
}
