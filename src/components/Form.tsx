import React, { useEffect, useState } from 'react';

import { WeatherModel } from './Weather';
import './Form.css';

// API Key from https://openweathermap.org/api
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?units=metric';

type FormProps = {
  getWeather: (data: any, resposeError?: string) => void;
};

const Form = ({ getWeather }: FormProps) => {
  const [city, setCity] = useState<WeatherModel['city']>('');
  const [country, setCountry] = useState<WeatherModel['country']>('');
  const [locationAvailable, setLocationAvailable] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (city && country) {
      const response = await fetch(
        `${API_URL}&q=${city},${country}&appid=${API_KEY}`,
        { method: 'GET' }
      );
      const data = await response.json();
      getWeather(data);
    } else {
      getWeather(null, 'Please enter the value.');
    }
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const response = await fetch(
          `${API_URL}&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`,
          { method: 'GET' }
        );
        const data = await response.json();
        getWeather(data);
      },
      () => {
        getWeather(null, 'The was an error getting your location.');
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    // Check if the user's device supports geolocation
    if (!navigator.geolocation) {
      setLocationAvailable(false);
    } else {
      navigator.permissions.query({ name: 'geolocation' }).then((status) => {
        if (status.state === 'granted' || status.state === 'prompt') {
          setLocationAvailable(true);
        } else if (status.state === 'denied') {
          setLocationAvailable(false);
        }
      });
    }
  }, []);

  return (
    <form className='form' onSubmit={handleSubmit}>
      <input
        type='text'
        name='city'
        id='city'
        value={city}
        placeholder='City...'
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type='text'
        name='country'
        id='country'
        value={country}
        placeholder='Country...'
        onChange={(e) => setCountry(e.target.value)}
      />
      <button className='button' type='submit'>
        Get Weather
      </button>
      <button
        className='button'
        type='button'
        onClick={getLocation}
        disabled={!locationAvailable}
      >
        Get Current Location
      </button>
    </form>
  );
};

export default React.memo(Form);
