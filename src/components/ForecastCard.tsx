import React from 'react';
import { Droplets, Wind } from 'lucide-react';
import { ForecastData } from '../types';
import { formatTemperature, formatDate, getWeatherIcon } from '../utils/helpers';

interface ForecastCardProps {
  data: ForecastData;
  unit: 'celsius' | 'fahrenheit';
}

const ForecastCard: React.FC<ForecastCardProps> = ({ data, unit }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-transform hover:scale-105 transition-colors">
      <div className="text-center mb-2">
        <p className="font-semibold dark:text-white truncate">{formatDate(data.date, 'EEE, MMM d')}</p>
      </div>
      
      <div className="flex flex-col items-center">
        <img 
          src={getWeatherIcon(data.description)} 
          alt={data.description} 
          className="w-16 h-16"
        />
        <p className="text-xl font-bold my-1 dark:text-white">{formatTemperature(data.temperature, unit)}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 capitalize truncate w-full text-center">{data.description}</p>
      </div>
      
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center dark:text-gray-300">
          <Droplets className="text-blue-500 dark:text-blue-400 mr-1 flex-shrink-0" size={14} />
          <span className="truncate">{data.humidity}%</span>
        </div>
        
        <div className="flex items-center dark:text-gray-300">
          <Wind className="text-blue-500 dark:text-blue-400 mr-1 flex-shrink-0" size={14} />
          <span className="truncate">{data.windSpeed} m/s</span>
        </div>
        
        <div className="col-span-2 mt-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">Precipitation:</span>
            <span className="text-xs font-medium dark:text-gray-300">{data.precipitation}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
            <div 
              className="bg-blue-500 dark:bg-blue-400 h-1.5 rounded-full" 
              style={{ width: `${data.precipitation}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;