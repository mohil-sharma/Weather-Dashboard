import React from 'react';
import { Thermometer } from 'lucide-react';

interface UnitToggleProps {
  unit: 'celsius' | 'fahrenheit';
  onToggle: () => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ unit, onToggle }) => {
  return (
    <div className="flex items-center">
      <Thermometer size={18} className="text-gray-600 dark:text-gray-300 mr-2" />
      <label className="inline-flex items-center cursor-pointer">
        <span className={`mr-2 text-sm font-medium ${unit === 'celsius' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
          °C
        </span>
        <div className="relative">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={unit === 'fahrenheit'}
            onChange={onToggle}
          />
          <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500"></div>
        </div>
        <span className={`ml-2 text-sm font-medium ${unit === 'fahrenheit' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
          °F
        </span>
      </label>
    </div>
  );
};

export default UnitToggle;