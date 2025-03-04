import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ForecastData } from '../types';
import { formatDate, convertTemperature } from '../utils/helpers';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WeatherChartProps {
  forecastData: ForecastData[];
  unit: 'celsius' | 'fahrenheit';
  theme: 'light' | 'dark';
}

const WeatherChart: React.FC<WeatherChartProps> = ({ forecastData, unit, theme }) => {
  const labels = forecastData.map((data) => formatDate(data.date, 'EEE, MMM d'));
  
  const temperatures = forecastData.map((data) => 
    convertTemperature(data.temperature, unit)
  );
  
  const feelsLike = forecastData.map((data) => 
    convertTemperature(data.feelsLike, unit)
  );
  
  const humidity = forecastData.map((data) => data.humidity);
  
  const data = {
    labels,
    datasets: [
      {
        label: `Temperature (°${unit === 'celsius' ? 'C' : 'F'})`,
        data: temperatures,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.3,
      },
      {
        label: `Feels Like (°${unit === 'celsius' ? 'C' : 'F'})`,
        data: feelsLike,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Humidity (%)',
        data: humidity,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
        yAxisID: 'y1',
      },
    ],
  };
  
  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: '5-Day Weather Forecast',
        color: theme === 'dark' ? 'white' : undefined,
      },
      legend: {
        labels: {
          color: theme === 'dark' ? 'white' : undefined,
        },
      },
      tooltip: {
        titleColor: theme === 'dark' ? 'white' : undefined,
        bodyColor: theme === 'dark' ? 'white' : undefined,
        backgroundColor: theme === 'dark' ? 'rgba(30, 41, 59, 0.8)' : undefined,
      },
    },
    scales: {
      x: {
        ticks: {
          color: theme === 'dark' ? '#9ca3af' : undefined,
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : undefined,
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: `Temperature (°${unit === 'celsius' ? 'C' : 'F'})`,
          color: theme === 'dark' ? '#9ca3af' : undefined,
        },
        ticks: {
          color: theme === 'dark' ? '#9ca3af' : undefined,
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : undefined,
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : undefined,
        },
        title: {
          display: true,
          text: 'Humidity (%)',
          color: theme === 'dark' ? '#9ca3af' : undefined,
        },
        ticks: {
          color: theme === 'dark' ? '#9ca3af' : undefined,
        },
        min: 0,
        max: 100,
      },
    },
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors">
      <Line options={options} data={data} />
    </div>
  );
};

export default WeatherChart;