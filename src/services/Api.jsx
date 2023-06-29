import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function fetchWeatherByCity(city) {
  const API_URL = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  try {
    const response = await axios.get(API_URL);
    return response.data;
    // console.log(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export async function fetchWeatherByCoordinates(latitude, longitude) {
  const API_URL = `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}
