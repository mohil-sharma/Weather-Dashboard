import React, { useState, useEffect, useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Cloud, CloudRain, Sun, AlertTriangle } from 'lucide-react';

// Components
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import ForecastCard from './components/ForecastCard';
import WeatherChart from './components/WeatherChart';
import WeatherJournal from './components/WeatherJournal';
import FavoritesList from './components/FavoritesList';
import UnitToggle from './components/UnitToggle';
import ErrorDisplay from './components/ErrorDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import GeolocationButton from './components/GeolocationButton';
import ExportButton from './components/ExportButton';
import ThemeToggle from './components/ThemeToggle';

// Hooks and Utils
import useGeolocation from './hooks/useGeolocation';
import useLocalStorage from './hooks/useLocalStorage';
import useTheme from './hooks/useTheme';
import { getCurrentWeather, getForecast, getWeatherByCoordinates } from './utils/api';
import { generateId } from './utils/helpers';

// Types
import { WeatherData, ForecastData, JournalEntry, FavoriteCity } from './types';

function App() {
  // State for weather data
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // User preferences
  const [unit, setUnit] = useLocalStorage<'celsius' | 'fahrenheit'>('weatherUnit', 'celsius');
  const [journalEntries, setJournalEntries] = useLocalStorage<JournalEntry[]>('weatherJournal', []);
  const [favorites, setFavorites] = useLocalStorage<FavoriteCity[]>('weatherFavorites', []);
  
  // Theme
  const [theme, toggleTheme] = useTheme();
  
  // Geolocation
  const { position, loading: geoLoading, error: geoError } = useGeolocation();
  
  // Function to fetch weather data
  const fetchWeatherData = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const weather = await getCurrentWeather(city);
      setWeatherData(weather);
      
      const forecast = await getForecast(city);
      setForecastData(forecast);
      
      return weather;
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      toast.error('Failed to fetch weather data');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Function to fetch weather by coordinates
  const fetchWeatherByCoordinates = useCallback(async () => {
    if (!position) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const weather = await getWeatherByCoordinates(
        position.latitude,
        position.longitude
      );
      setWeatherData(weather);
      
      const forecast = await getForecast(weather.city);
      setForecastData(forecast);
      
      toast.success(`Weather loaded for ${weather.city}`);
    } catch (err) {
      setError('Failed to fetch weather data for your location.');
      toast.error('Failed to fetch weather data for your location');
    } finally {
      setLoading(false);
    }
  }, [position]);
  
  // Handle search
  const handleSearch = async (city: string) => {
    const weather = await fetchWeatherData(city);
    if (weather) {
      toast.success(`Weather loaded for ${weather.city}`);
    }
  };
  
  // Handle unit toggle
  const handleUnitToggle = () => {
    setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius');
    toast.success(`Temperature unit changed to ${unit === 'celsius' ? 'Fahrenheit' : 'Celsius'}`);
  };
  
  // Journal functions
  const handleAddJournalEntry = (entry: JournalEntry) => {
    setJournalEntries([entry, ...journalEntries]);
    toast.success('Journal entry added');
  };
  
  const handleUpdateJournalEntry = (updatedEntry: JournalEntry) => {
    setJournalEntries(
      journalEntries.map((entry) =>
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    );
    toast.success('Journal entry updated');
  };
  
  const handleDeleteJournalEntry = (id: string) => {
    setJournalEntries(journalEntries.filter((entry) => entry.id !== id));
    toast.success('Journal entry deleted');
  };
  
  // Favorites functions
  const handleAddToFavorites = () => {
    if (!weatherData) return;
    
    const isFavorite = favorites.some((fav) => fav.name === weatherData.city);
    
    if (isFavorite) {
      toast.error(`${weatherData.city} is already in your favorites`);
      return;
    }
    
    const newFavorite: FavoriteCity = {
      id: generateId(),
      name: weatherData.city,
    };
    
    setFavorites([...favorites, newFavorite]);
    toast.success(`${weatherData.city} added to favorites`);
  };
  
  const handleRemoveFavorite = (id: string) => {
    const favoriteToRemove = favorites.find((fav) => fav.id === id);
    setFavorites(favorites.filter((fav) => fav.id !== id));
    
    if (favoriteToRemove) {
      toast.success(`${favoriteToRemove.name} removed from favorites`);
    }
  };
  
  const handleReorderFavorites = (newOrder: FavoriteCity[]) => {
    setFavorites(newOrder);
  };
  
  const handleSelectFavorite = (city: string) => {
    fetchWeatherData(city);
  };
  
  // Use geolocation on initial load if available
  useEffect(() => {
    if (position && !weatherData && !loading) {
      fetchWeatherByCoordinates();
    }
  }, [position, weatherData, loading, fetchWeatherByCoordinates]);
  
  // Default to a city if no geolocation
  useEffect(() => {
    if (!weatherData && !loading && !position) {
      fetchWeatherData('London');
    }
  }, [fetchWeatherData, weatherData, loading, position]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: theme === 'dark' ? '#374151' : '#fff',
            color: theme === 'dark' ? '#fff' : '#000',
          },
        }}
      />
      
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-950 text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Cloud className="mr-2 flex-shrink-0" size={32} />
              <h1 className="text-2xl font-bold truncate">Weather Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4 flex-wrap">
              <div className="flex-1 md:flex-none min-w-0 max-w-md">
                <SearchBar onSearch={handleSearch} />
              </div>
              
              <div className="flex items-center space-x-2 mt-2 md:mt-0">
                <GeolocationButton 
                  onGetLocation={fetchWeatherByCoordinates}
                  isLoading={geoLoading}
                />
                
                <UnitToggle unit={unit} onToggle={handleUnitToggle} />
                
                <ThemeToggle theme={theme} onToggle={toggleTheme} />
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-6">
            <ErrorDisplay 
              message={error} 
              onRetry={() => weatherData ? fetchWeatherData(weatherData.city) : null} 
            />
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="large" message="Loading weather data..." />
          </div>
        ) : (
          <>
            {weatherData && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Current Weather */}
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold mb-4 dark:text-white">Current Weather</h2>
                    <button
                      onClick={handleAddToFavorites}
                      className="px-3 py-1 bg-yellow-500 dark:bg-yellow-600 text-white rounded-lg hover:bg-yellow-600 dark:hover:bg-yellow-700 transition-colors text-sm"
                    >
                      Add to Favorites
                    </button>
                  </div>
                  <CurrentWeather data={weatherData} unit={unit} />
                  
                  {/* Weather Chart */}
                  <h2 className="text-xl font-semibold mb-4 dark:text-white">Weather Trend</h2>
                  {forecastData.length > 0 && (
                    <WeatherChart forecastData={forecastData} unit={unit} theme={theme} />
                  )}
                  
                  {/* 5-Day Forecast */}
                  <h2 className="text-xl font-semibold mb-4 dark:text-white">5-Day Forecast</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {forecastData.map((day, index) => (
                      <ForecastCard key={index} data={day} unit={unit} />
                    ))}
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="space-y-6">
                  {/* Favorites */}
                  <FavoritesList
                    favorites={favorites}
                    onReorder={handleReorderFavorites}
                    onSelect={handleSelectFavorite}
                    onRemove={handleRemoveFavorite}
                  />
                  
                  {/* Weather Journal */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold dark:text-white">Weather Journal</h2>
                    <ExportButton entries={journalEntries} unit={unit} theme={theme} />
                  </div>
                  
                  {weatherData && (
                    <WeatherJournal
                      entries={journalEntries}
                      onAddEntry={handleAddJournalEntry}
                      onUpdateEntry={handleUpdateJournalEntry}
                      onDeleteEntry={handleDeleteJournalEntry}
                      currentCity={weatherData.city}
                      currentTemp={weatherData.temperature}
                      currentDescription={weatherData.description}
                      currentIcon={weatherData.icon}
                      unit={unit}
                    />
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-950 text-white py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">
                Weather Dashboard &copy; {new Date().getFullYear()}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Data provided by WeatherAPI.com
              </p>
            </div>
            
            <div className="flex space-x-4">
              <div className="flex items-center text-sm">
                <Sun className="text-yellow-400 mr-1" size={16} />
                <span>Weather</span>
              </div>
              <div className="flex items-center text-sm">
                <CloudRain className="text-blue-400 mr-1" size={16} />
                <span>Forecast</span>
              </div>
              <div className="flex items-center text-sm">
                <AlertTriangle className="text-red-400 mr-1" size={16} />
                <span>Alerts</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;