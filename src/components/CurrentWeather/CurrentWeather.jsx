import React, { useEffect, useState } from 'react';

const CurrentWeather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Get user's geolocation coordinates
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async position => {
            const { latitude, longitude } = position.coords;

            // Fetch weather data based on user's coordinates
            const API_KEY = '082d3d02ffdb12f2fd9b259e2ced1d0d';
            const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
            const response = await fetch(API_URL);
            const data = await response.json();
            setWeatherData(data);
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
