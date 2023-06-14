import React, { useState } from "react";
import axios from "axios";
// import { Audio } from "react-loader-spinner";

import css from "../Form/Form.module.css";

export default function Form() {
  let [city, setCity] = useState("");
  let [isLoaded, setLoaded] = useState(false);
  let [weather, setWeather] = useState({});

  function showWeather(response) {
    // console.log(response.data);
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let API_KEY = "082d3d02ffdb12f2fd9b259e2ced1d0d";
    let API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    axios.get(API_URL).then(showWeather);
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
            autoFocus="on"
            autoComplete="off"
            onChange={updateCity}
          />
          <button type="submit" className={css.btnSearch}>
            Search
          </button>
        </form>
        <ul className={css.currentPlaceDate}>
          <li className={css.city}>
            Temperature:{" "}
            <span className={css.numbers}>
              {Math.round(weather.temperature)}°C
            </span>
          </li>
          <li className={css.city}>
            Humidity:
            <span className={css.numbers}>
              {" "}
              {Math.round(weather.humidity)}%{" "}
            </span>
          </li>
          <li className={css.city}>
            Wind:{" "}
            <span className={css.numbers}>{Math.round(weather.wind)} km/h</span>{" "}
          </li>
          <li className={css.city}>
            Description:{" "}
            <span className={css.numbers}>{weather.description}</span>
          </li>
          <li className={css.city}>
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
            autoFocus="on"
            autoComplete="off"
            onChange={updateCity}
          />
          <button type="submit" className={css.btnSearch}>
            Search
          </button>
        </form>
      </div>
    );
  }
}
