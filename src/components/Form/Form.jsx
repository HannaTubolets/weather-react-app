import React, { useEffect, useState } from 'react';
import axios from 'axios';

import css from '../Form/Form.module.css';

const Form = () => {
  const [city, setCity] = useState('');
  const [isLoaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});
  const [isSearchClicked, setSearchClicked] = useState(false); // New state

  const fetchWeatherData = async url => {
    try {
      const response = await axios.get(url);
      showWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    if (isSearchClicked && city !== '') {
      // Only fetch data when search button is clicked and city is not empty
      const API_KEY = '082d3d02ffdb12f2fd9b259e2ced1d0d';
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      fetchWeatherData(API_URL);
    }
    setSearchClicked(false); // Reset the search clicked state
  }, [isSearchClicked, city]);

  function showWeather(data) {
    setLoaded(true);
    setWeather({
      name: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSearchClicked(true); // Set search clicked state to true

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

  if (isLoaded) {
    return (
      <div>
        <form className={css.weatherForm} onSubmit={handleSubmit}>
          <input
            type="search"
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
        <h2 className={css.city}>{weather.name}</h2>
        <ul className={css.currentPlaceDate}>
          <li className={css.characteristics}>
            Temperature:{' '}
            <span className={css.numbers}>
              {Math.round(weather.temperature)}°C
            </span>
          </li>
          <li className={css.characteristics}>
            Humidity:
            <span className={css.numbers}>
              {' '}
              {Math.round(weather.humidity)}%{' '}
            </span>
          </li>
          <li className={css.characteristics}>
            Wind:{' '}
            <span className={css.numbers}>{Math.round(weather.wind)} km/h</span>{' '}
          </li>
          <li className={css.characteristics}>
            Description:{' '}
            <span className={css.numbers}>{weather.description}</span>
          </li>
          <li className={css.characteristics}>
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
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
