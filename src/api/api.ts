import axios from 'axios';

// API Key from https://openweathermap.org/api
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?units=metric';

export const fetchWeather = async (
  city: string,
  country: string
): Promise<any> => {
  try {
    const response = await axios.get(API_URL, {
      method: 'GET',
      params: {
        q: `${city},${country}`,
        appid: API_KEY,
      },
    });

    return response.data;
  } catch {
    throw 'The was some error. Please, try again later!';
  }
};

export const fetchWeatherByCoords = async (
  latitude: number,
  longitude: number
): Promise<any> => {
  try {
    const response = await axios.get(API_URL, {
      method: 'GET',
      params: {
        lat: latitude,
        lon: longitude,
        appid: API_KEY,
      },
    });

    return response.data;
  } catch {
    throw 'The was an error getting your location';
  }
};
