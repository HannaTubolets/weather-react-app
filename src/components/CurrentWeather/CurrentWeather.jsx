import React, { useEffect, useState } from 'react';
import { fetchWeatherByCoordinates } from '../../services/Api';

const CurrentWeather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async position => {
            const { latitude, longitude } = position.coords;

            try {
              const data = await fetchWeatherByCoordinates(latitude, longitude);
              setWeatherData(data);
            } catch (error) {
              console.error('Error fetching weather data:', error);
            }
          });
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }

  return (
    <div>
      <h2>Current Weather</h2>
      <ul>
        <li>Location: {weatherData.name}</li>
        <li>Temperature: {Math.round(weatherData.main.temp)}°C</li>
        <li>Description: {weatherData.weather[0].description}</li>
        <li>Humidity: {Math.round(weatherData.main.humidity)}%</li>
        <li>Wind: {Math.round(weatherData.wind.speed)} km/h</li>
        <li>
          <img
            src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt={weatherData.weather[0].description}
          />
        </li>
      </ul>
    </div>
  );
};

export default CurrentWeather;
