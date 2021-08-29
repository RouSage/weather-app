import React, { useEffect, useState } from 'react';

import { WeatherModel } from './Weather';
import './Form.css';
import { fetchWeather, fetchWeatherByCoords } from '../api/api';

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
      try {
        const data = await fetchWeather(city, country);
        getWeather(data);
      } catch (error) {
        getWeather(null, error as string);
      }
    } else {
      getWeather(null, 'Please enter the value.');
    }
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const data = await fetchWeatherByCoords(latitude, longitude);

          setCity('');
          setCountry('');
          getWeather(data);
        } catch (error) {
          getWeather(null, error as string);
        }
      },
      (e) => {
        getWeather(null, e.message);
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
