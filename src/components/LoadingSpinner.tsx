import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium',
  message = 'Loading...'
}) => {
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-blue-200 dark:border-blue-700 border-t-blue-600 dark:border-t-blue-400`}></div>
      {message && <p className="mt-2 text-gray-600 dark:text-gray-300">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;