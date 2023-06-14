import React from 'react';
import axios from 'axios';
import { Blocks } from 'react-loader-spinner';

export default function Weather({ city }) {
  let API_KEY = '082d3d02ffdb12f2fd9b259e2ced1d0d';
  let API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  axios.get(API_URL).then(showWeather);

  function showWeather(response) {
    console.log(response.data);

    alert(
      `The temperature in ${response.data.name} is ${Math.round(
        response.data.main.temp
      )} °C `
    );
  }

  return (
    <div>
      <h2>Hello from Weather component</h2>
      <Blocks />
    </div>
  );
}
