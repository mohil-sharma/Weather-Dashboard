import { format } from 'date-fns';

// Convert temperature between Celsius and Fahrenheit
export const convertTemperature = (temp: number, unit: 'celsius' | 'fahrenheit'): number => {
  if (unit === 'celsius') {
    return temp;
  } else {
    return (temp * 9) / 5 + 32;
  }
};

// Format temperature with the appropriate unit symbol
export const formatTemperature = (temp: number, unit: 'celsius' | 'fahrenheit'): string => {
  const convertedTemp = convertTemperature(temp, unit);
  const roundedTemp = Math.round(convertedTemp);
  return `${roundedTemp}°${unit === 'celsius' ? 'C' : 'F'}`;
};

// Format date from Unix timestamp
export const formatDate = (timestamp: number, formatString: string = 'PPP'): string => {
  return format(new Date(timestamp * 1000), formatString);
};

// Format time from Unix timestamp
export const formatTime = (timestamp: number, timezone: number = 0): string => {
  const date = new Date((timestamp + timezone) * 1000);
  return format(date, 'h:mm a');
};

// Debounce function for search input
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
): ((...args: Parameters<F>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

// Get weather icon URL from WeatherAPI.com
export const getWeatherIconUrl = (iconCode: string): string => {
  // If the icon URL is already a full URL, return it
  if (iconCode.startsWith('http')) {
    // Make sure we're using https
    return iconCode.replace('http://', 'https://');
  }
  
  // For OpenWeatherMap icon codes
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

// Get weather icon based on condition code or description
export const getWeatherIcon = (condition: string): string => {
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
    return 'https://cdn.weatherapi.com/weather/64x64/day/113.png';
  } else if (conditionLower.includes('partly cloudy')) {
    return 'https://cdn.weatherapi.com/weather/64x64/day/116.png';
  } else if (conditionLower.includes('cloudy') || conditionLower.includes('overcast')) {
    return 'https://cdn.weatherapi.com/weather/64x64/day/119.png';
  } else if (conditionLower.includes('mist') || conditionLower.includes('fog')) {
    return 'https://cdn.weatherapi.com/weather/64x64/day/143.png';
  } else if (conditionLower.includes('drizzle')) {
    return 'https://cdn.weatherapi.com/weather/64x64/day/266.png';
  } else if (conditionLower.includes('rain')) {
    return 'https://cdn.weatherapi.com/weather/64x64/day/308.png';
  } else if (conditionLower.includes('snow')) {
    return 'https://cdn.weatherapi.com/weather/64x64/day/338.png';
  } else if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
    return 'https://cdn.weatherapi.com/weather/64x64/day/389.png';
  } else {
    // Default icon
    return 'https://cdn.weatherapi.com/weather/64x64/day/116.png';
  }
};

// Get air quality index description
export const getAQIDescription = (aqi: number): { label: string; color: string } => {
  if (aqi <= 50) {
    return { label: 'Good', color: 'bg-green-500' };
  } else if (aqi <= 100) {
    return { label: 'Moderate', color: 'bg-yellow-500' };
  } else if (aqi <= 150) {
    return { label: 'Unhealthy for Sensitive Groups', color: 'bg-orange-500' };
  } else if (aqi <= 200) {
    return { label: 'Unhealthy', color: 'bg-red-500' };
  } else if (aqi <= 300) {
    return { label: 'Very Unhealthy', color: 'bg-purple-500' };
  } else {
    return { label: 'Hazardous', color: 'bg-gray-800' };
  }
};

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};