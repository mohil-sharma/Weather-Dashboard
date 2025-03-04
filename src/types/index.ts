export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  pressure: number;
  visibility: number;
  sunrise: number;
  sunset: number;
  timezone: number;
  date: number;
}

export interface ForecastData {
  date: number;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  precipitation: number;
}

export interface AirQualityData {
  aqi: number;
  co: number;
  no2: number;
  o3: number;
  pm10: number;
  pm2_5: number;
  so2: number;
}

export interface JournalEntry {
  id: string;
  date: number;
  city: string;
  temperature: number;
  description: string;
  notes: string;
  icon: string;
}

export interface FavoriteCity {
  id: string;
  name: string;
}