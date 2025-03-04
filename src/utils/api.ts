import axios from 'axios';
import { WeatherData, ForecastData, AirQualityData } from '../types';

// WeatherAPI.com API key
const WEATHER_API_KEY = 'd8618a0309d94c55ba2170706250303';
const WEATHER_API_BASE_URL = 'https://api.weatherapi.com/v1';

// Function to get current weather data from WeatherAPI.com
export const getCurrentWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${WEATHER_API_BASE_URL}/current.json`, {
      params: {
        key: WEATHER_API_KEY,
        q: city,
      },
    });

    const data = response.data;
    return {
      city: data.location.name,
      country: data.location.country,
      temperature: data.current.temp_c,
      feelsLike: data.current.feelslike_c,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph / 3.6, // Convert to m/s
      description: data.current.condition.text,
      icon: data.current.condition.icon,
      pressure: data.current.pressure_mb,
      visibility: data.current.vis_km * 1000, // Convert to meters
      sunrise: new Date(data.location.localtime_epoch * 1000).setHours(6, 0, 0) / 1000, // Approximate sunrise
      sunset: new Date(data.location.localtime_epoch * 1000).setHours(18, 0, 0) / 1000, // Approximate sunset
      timezone: data.location.localtime_epoch - new Date(data.location.localtime_epoch * 1000).getTimezoneOffset() * 60,
      date: data.location.localtime_epoch,
    };
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw new Error('Failed to fetch current weather data');
  }
};

// Function to get 5-day forecast from WeatherAPI.com
export const getForecast = async (city: string): Promise<ForecastData[]> => {
  try {
    const response = await axios.get(`${WEATHER_API_BASE_URL}/forecast.json`, {
      params: {
        key: WEATHER_API_KEY,
        q: city,
        days: 5,
      },
    });

    const forecastList = response.data.forecast.forecastday;
    const dailyForecasts: ForecastData[] = forecastList.map((day: any) => ({
      date: day.date_epoch,
      temperature: day.day.avgtemp_c,
      feelsLike: day.day.avgtemp_c, // WeatherAPI doesn't provide feels like for forecast
      humidity: day.day.avghumidity,
      windSpeed: day.day.maxwind_kph / 3.6, // Convert to m/s
      description: day.day.condition.text,
      icon: day.day.condition.icon,
      precipitation: day.day.daily_chance_of_rain,
    }));

    return dailyForecasts;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw new Error('Failed to fetch forecast data');
  }
};

// Function to get air quality data from WeatherAPI.com
export const getAirQuality = async (city: string): Promise<AirQualityData> => {
  try {
    const response = await axios.get(`${WEATHER_API_BASE_URL}/current.json`, {
      params: {
        key: WEATHER_API_KEY,
        q: city,
        aqi: 'yes',
      },
    });

    const data = response.data.current.air_quality;
    return {
      aqi: data['us-epa-index'],
      co: data.co,
      no2: data.no2,
      o3: data.o3,
      pm10: data.pm10,
      pm2_5: data.pm2_5,
      so2: data.so2,
    };
  } catch (error) {
    console.error('Error fetching air quality:', error);
    throw new Error('Failed to fetch air quality data');
  }
};

// Function to get weather by geolocation
export const getWeatherByCoordinates = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${WEATHER_API_BASE_URL}/current.json`, {
      params: {
        key: WEATHER_API_KEY,
        q: `${lat},${lon}`,
      },
    });

    const data = response.data;
    return {
      city: data.location.name,
      country: data.location.country,
      temperature: data.current.temp_c,
      feelsLike: data.current.feelslike_c,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph / 3.6, // Convert to m/s
      description: data.current.condition.text,
      icon: data.current.condition.icon,
      pressure: data.current.pressure_mb,
      visibility: data.current.vis_km * 1000, // Convert to meters
      sunrise: new Date(data.location.localtime_epoch * 1000).setHours(6, 0, 0) / 1000, // Approximate sunrise
      sunset: new Date(data.location.localtime_epoch * 1000).setHours(18, 0, 0) / 1000, // Approximate sunset
      timezone: data.location.localtime_epoch - new Date(data.location.localtime_epoch * 1000).getTimezoneOffset() * 60,
      date: data.location.localtime_epoch,
    };
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error);
    throw new Error('Failed to fetch weather data by coordinates');
  }
};