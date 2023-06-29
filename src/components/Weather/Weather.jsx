import React, { useEffect, useState } from 'react';
import { fetchWeatherByCity } from '../../services/Api';

import css from '../Weather/Weather.module.css';

const Weather = ({ city }) => {
  const [showWeather, setShowWeather] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await fetchWeatherByCity(city);
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
    <div className={css.cityWrapper}>
      <button className={css.favoriteCities} href="#" onClick={handleClick}>
        {city}
      </button>
      {showWeather && weatherData && (
        <>
          <ul className={css.iconWrapper}>
            <li>
              <span className={css.icon}>
                <img
                  src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                  alt={weatherData.weather[0].description}
                />
              </span>
            </li>
            <li>
              <span className={css.numbersTemp}>
                {Math.round(weatherData.main.temp)}°C
              </span>
            </li>
          </ul>
          <ul>
            <li className={css.text}>
              <span className={css.numbers}>
                {weatherData.weather[0].description}{' '}
              </span>
            </li>
            <li className={css.textTransparent}>
              Humidity:{' '}
              <span className={css.numbers}>
                {Math.round(weatherData.main.humidity)}%{' '}
              </span>
            </li>
            <li className={css.textTransparent}>
              Wind:{' '}
              <span className={css.numbers}>
                {Math.round(weatherData.wind.speed)} km/h{' '}
              </span>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Weather;
