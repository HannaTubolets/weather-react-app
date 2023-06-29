import React, { useEffect, useState } from 'react';
import { fetchWeatherForecast } from '../../services/Api';
import css from '../WeatherForecast/WeatherForecast.module.css';

const WeatherForecast = ({ latitude, longitude }) => {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    fetchWeatherForecast(latitude, longitude)
      .then(data => {
        if (data && data.daily) {
          const dailyForecastData = data.daily.slice(0, 5);
          setForecastData(dailyForecastData);
        }
      })
      .catch(error => {
        console.error('Error fetching weather forecast data:', error);
      });
  }, [latitude, longitude]);

  return (
    <div className={css.forecastWrapper}>
      <div className="row">
        {forecastData.map(day => (
          <div className="col" key={day.dt}>
            <div className={css.forecastDay}>
              {new Date(day.dt * 1000).toLocaleDateString('en-US', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              })}
            </div>
            <div>
              <img
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt="Weather Icon"
              />
            </div>
            <div className={css.forecastTemp}>
              <span className={css.forecastTempMax}>
                {Math.round(day.temp.max)}&deg;C
              </span>
              <span className={css.forecastTempMin}>
                {' '}
                / {Math.round(day.temp.min)}&deg;C
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
