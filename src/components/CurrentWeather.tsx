import React from 'react';
import { Droplets, Wind, Sunrise, Sunset, Eye, Gauge } from 'lucide-react';
import { WeatherData } from '../types';
import { formatTemperature, formatDate, formatTime, getWeatherIcon } from '../utils/helpers';

interface CurrentWeatherProps {
  data: WeatherData;
  unit: 'celsius' | 'fahrenheit';
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, unit }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors">
      <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-900 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl font-bold truncate max-w-xs">{data.city}, {data.country}</h2>
            <p className="text-lg">{formatDate(data.date)}</p>
            <p className="text-xl mt-2 capitalize">{data.description}</p>
          </div>
          <div className="text-center">
            <img 
              src={getWeatherIcon(data.description)} 
              alt={data.description} 
              className="w-24 h-24 mx-auto"
            />
            <p className="text-4xl font-bold">{formatTemperature(data.temperature, unit)}</p>
            <p className="text-lg">Feels like: {formatTemperature(data.feelsLike, unit)}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 dark:text-white">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <Droplets className="text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0" size={20} />
            <div className="min-w-0">
              <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
              <p className="font-semibold truncate">{data.humidity}%</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Wind className="text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0" size={20} />
            <div className="min-w-0">
              <p className="text-sm text-gray-500 dark:text-gray-400">Wind Speed</p>
              <p className="font-semibold truncate">{data.windSpeed} m/s</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Gauge className="text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0" size={20} />
            <div className="min-w-0">
              <p className="text-sm text-gray-500 dark:text-gray-400">Pressure</p>
              <p className="font-semibold truncate">{data.pressure} hPa</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Eye className="text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0" size={20} />
            <div className="min-w-0">
              <p className="text-sm text-gray-500 dark:text-gray-400">Visibility</p>
              <p className="font-semibold truncate">{(data.visibility / 1000).toFixed(1)} km</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Sunrise className="text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0" size={20} />
            <div className="min-w-0">
              <p className="text-sm text-gray-500 dark:text-gray-400">Sunrise</p>
              <p className="font-semibold truncate">{formatTime(data.sunrise, data.timezone)}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Sunset className="text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0" size={20} />
            <div className="min-w-0">
              <p className="text-sm text-gray-500 dark:text-gray-400">Sunset</p>
              <p className="font-semibold truncate">{formatTime(data.sunset, data.timezone)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;