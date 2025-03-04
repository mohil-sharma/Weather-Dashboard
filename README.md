# Weather Dashboard

A comprehensive weather dashboard application that integrates with multiple weather APIs to provide detailed weather information, forecasts, and personalized features.

## Features

- **City Weather Search**: Search for weather information by city name
- **Dynamic Visualization**: Interactive charts showing weather trends
- **Forecast Cards**: 5-day weather forecast with detailed information
- **Error Handling**: Robust error handling with user-friendly messages
- **Weather Journal**: Keep track of personal weather observations
- **Temperature Unit Toggle**: Switch between Celsius and Fahrenheit
- **API Key Obfuscation**: Environment variables for API key security
- **Geolocation Support**: Get weather for your current location
- **Favorites List**: Save and reorder your favorite cities with drag-and-drop
- **Export to PDF**: Export your weather journal entries to PDF

## APIs Used

- **OpenWeatherMap API**: For current weather and forecast data
- **WeatherBit API**: For air quality data

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your API keys:
   ```
   VITE_OPENWEATHER_API_KEY=your_openweathermap_api_key_here
   VITE_WEATHERBIT_API_KEY=your_weatherbit_api_key_here
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Chart.js
- React Beautiful DND
- Axios
- HTML2Canvas & jsPDF
- Lucide React Icons

## Performance Optimizations

- Debounced search input to reduce API calls
- Memoized component rendering
- Local storage for user preferences and data
- Optimized chart rendering

## License

MIT