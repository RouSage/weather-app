import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  fetchWeather,
  fetchWeatherByCoords,
  WeatherResponse,
} from '../api/api';
import { WeatherModel } from './Weather';

type FormProps = {
  getWeather: (data: WeatherResponse | null, responseError?: string) => void;
};

const WeatherForm = ({ getWeather }: FormProps) => {
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
    <Form onSubmit={handleSubmit}>
      <TextInput
        type='text'
        name='city'
        id='city'
        value={city}
        placeholder='City...'
        onChange={(e) => setCity(e.target.value)}
      />
      <TextInput
        type='text'
        name='country'
        id='country'
        value={country}
        placeholder='Country...'
        onChange={(e) => setCountry(e.target.value)}
      />
      <Button className='button' type='submit'>
        Get Weather
      </Button>
      <Button
        className='button'
        type='button'
        onClick={getLocation}
        disabled={!locationAvailable}
      >
        Get Current Location
      </Button>
    </Form>
  );
};

export default React.memo(WeatherForm);

const Form = styled.form`
  margin-bottom: 30px;

  @media only screen and (max-width: 600px) {
    margin-bottom: 10px;
  }
`;

const TextInput = styled.input`
  background-color: transparent;
  border: 0;
  border-bottom: 1px solid #076969;
  width: 45%;
  color: #fff;
  font-weight: 100;
  font-size: 1.2rem;
  letter-spacing: 2px;
  padding-bottom: 5px;
  margin-right: 20px;
  outline: none;

  /* &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #202020 inset;
    -webkit-text-fill-color: #fff;
  } */

  @media only screen and (max-width: 600px) {
    width: 45%;
    font-size: 0.9rem;
    margin-right: 10px;

    &#country {
      margin-right: 0;
    }
  }

  @media only screen and (min-width: 600px) {
    font-size: 1rem;
    margin-right: 10px;
  }

  @media only screen and (min-width: 601px) and (max-width: 665px) {
    width: 45%;
    font-size: 0.9rem;
  }

  @media only screen and (min-width: 992px) {
    font-size: 1.2rem;
    margin-right: 15px;
  }

  @media only screen and (min-width: 1200px) {
    font-size: 1.5rem;
    margin-right: 20px;
  }
`;

const Button = styled.button`
  border: 0;
  border-radius: 2px;
  padding: 8px 20px;
  margin: 10px auto 0 auto;

  /* width: 45%; */
  font-weight: 100;
  letter-spacing: 1px;
  font-size: 0.85rem;
  cursor: pointer;
  color: #fff;
  background-color: #076969;

  &:active {
    outline: none;
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }

  @media only screen and (max-width: 600px) {
    width: 46%;
    font-size: 0.6rem;
    margin-right: 10px;
  }

  @media only screen and (max-width: 725px) {
    padding: 8px 15px;
  }

  @media only screen and (min-width: 600px) {
    width: 46%;
    margin-right: 10px;
  }

  @media only screen and (min-width: 601px) and (max-width: 665px) {
    font-size: 0.7rem;
  }

  @media only screen and (min-width: 1200px) {
    font-size: 1.25rem;
  }
`;
