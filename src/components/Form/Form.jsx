import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Blocks } from 'react-loader-spinner';
import WeatherInfo from '../WeatherInfo/WeatherInfo';

import css from '../Form/Form.module.css';

const Form = () => {
  const [city, setCity] = useState('');
  const [isLoaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});
  const [isSearchClicked, setSearchClicked] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const fetchWeatherData = useCallback(async url => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      showWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isSearchClicked && city !== '') {
      const API_KEY = '082d3d02ffdb12f2fd9b259e2ced1d0d';
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      fetchWeatherData(API_URL);
    }
    setSearchClicked(false);
  }, [isSearchClicked, city, fetchWeatherData]);

  function showWeather(data) {
    setLoaded(true);
    setWeather({
      name: data.name,
      date: new Date(data.dt * 1000),
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSearchClicked(true);

    if (city !== '') {
      const API_KEY = '082d3d02ffdb12f2fd9b259e2ced1d0d';
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      fetchWeatherData(API_URL);
    }
  }

  function handleCurrentButtonClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const API_KEY = '082d3d02ffdb12f2fd9b259e2ced1d0d';
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
        fetchWeatherData(API_URL);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  if (isLoading) {
    return (
      <div className={css.loaderContainer}>
        <Blocks />
      </div>
    );
  }

  if (isLoaded) {
    return (
      <div className={css.formWrapper}>
        <form className={css.weatherForm} onSubmit={handleSubmit}>
          <input
            type="text"
            className={css.searchInput}
            placeholder="Enter a city"
            autoFocus={true}
            autoComplete="off"
            onChange={updateCity}
          />
          <button type="submit" className={css.btnSearch}>
            Search
          </button>
          <button
            type="button"
            className={css.btnCurrent}
            onClick={handleCurrentButtonClick}
          >
            Current
          </button>
        </form>
        <WeatherInfo info={weather} />
      </div>
    );
  } else {
    return (
      <div>
        <form className={css.weatherForm} onSubmit={handleSubmit}>
          <input
            type="text"
            className={css.searchInput}
            placeholder="Enter a city"
            autoFocus={true}
            autoComplete="off"
            onChange={updateCity}
          />
          <button type="submit" className={css.btnSearch}>
            Search
          </button>
          <button
            type="button"
            className={css.btnCurrent}
            onClick={handleCurrentButtonClick}
          >
            Current
          </button>
        </form>
      </div>
    );
  }
};

export default Form;
