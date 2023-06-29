import React, { useEffect, useState, useCallback } from 'react';
import { Blocks } from 'react-loader-spinner';
import WeatherInfo from '../WeatherInfo/WeatherInfo';
import WeatherForecast from '../WeatherForecast/WeatherForecast';
import css from '../Form/Form.module.css';
import {
  fetchWeatherByCity,
  fetchWeatherByCoordinates,
} from '../../services/Api';

const Form = () => {
  const [city, setCity] = useState('');
  const [isLoaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});
  const [isSearchClicked, setSearchClicked] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const fetchWeatherData = useCallback(async fetchFunction => {
    try {
      setLoading(true);
      const data = await fetchFunction();
      showWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isSearchClicked && city !== '') {
      fetchWeatherData(() => fetchWeatherByCity(city));
    }
    setSearchClicked(false);
  }, [isSearchClicked, city, fetchWeatherData]);

  useEffect(() => {
    const defaultCity = 'Kyiv';
    setCity(defaultCity);
    setSearchClicked(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setCity('');
    }
  }, [isLoaded]);

  function showWeather(data) {
    setLoaded(true);
    setWeather({
      name: data.name,
      coordinates: { lat: data.coord.lat, long: data.coord.lon },
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
    if (city.trim() !== '') {
      fetchWeatherData(() => fetchWeatherByCity(city.trim()));
    }
    setSearchClicked(true);
    setCity('');
  }

  function handleCurrentButtonClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(() => fetchWeatherByCoordinates(latitude, longitude));
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

  return (
    <div className={css.formWrapper}>
      <form className={css.weatherForm} onSubmit={handleSubmit}>
        <input
          type="text"
          className={css.searchInput}
          placeholder="Enter a city"
          autoFocus={true}
          autoComplete="off"
          value={city}
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
      {isLoaded ? (
        <>
          <WeatherInfo info={weather} />
          <WeatherForecast
            latitude={weather.coordinates.lat}
            longitude={weather.coordinates.long}
          />
        </>
      ) : null}
    </div>
  );
};

export default Form;
