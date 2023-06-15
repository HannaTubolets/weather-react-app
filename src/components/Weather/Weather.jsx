import React, { useEffect, useState } from 'react';

import css from '../Weather/Weather.module.css';

const Weather = ({ city }) => {
  const [showWeather, setShowWeather] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const API_KEY = '082d3d02ffdb12f2fd9b259e2ced1d0d';
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(API_URL);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (showWeather) {
      fetchWeatherData();
    }
  }, [city, showWeather]);

  const handleClick = () => {
    setShowWeather(!showWeather);
  };

  return (
    <div>
      <button className={css.favoriteCities} href="#" onClick={handleClick}>
        {city}
      </button>
      {showWeather && weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <ul>
            <li>Temperature: {Math.round(weatherData.main.temp)}°C</li>
            <li>Humidity: {Math.round(weatherData.main.humidity)}%</li>
            <li>Wind: {Math.round(weatherData.wind.speed)} km/h</li>
            <li>Description: {weatherData.weather[0].description}</li>
            <li>
              <img
                src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                alt={weatherData.weather[0].description}
              />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Weather;
