import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

interface GeolocationButtonProps {
  onGetLocation: () => void;
  isLoading: boolean;
}

const GeolocationButton: React.FC<GeolocationButtonProps> = ({ 
  onGetLocation,
  isLoading
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    onGetLocation();
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="flex items-center justify-center p-2 bg-blue-500 dark:bg-blue-600 text-white rounded-full hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
      title="Use your current location"
    >
      <MapPin 
        size={20} 
        className={`${isAnimating ? 'animate-ping' : ''} ${isLoading ? 'animate-pulse' : ''}`} 
      />
    </button>
  );
};

export default GeolocationButton;