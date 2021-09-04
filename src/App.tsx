import React, { useState } from 'react';

import { WeatherResponse } from './api/api';
import Form from './components/Form';
import Titles from './components/Titles';
import Weather, { WeatherModel } from './components/Weather';

import './App.css';

const initialValues: WeatherModel = {
  city: '',
  country: '',
  description: '',
  humidity: undefined,
  temperature: undefined,
};

const App = (): JSX.Element => {
  const [weather, setWeather] = useState<WeatherModel>(initialValues);
  const [error, setError] = useState<string>('');

  const getWeather = (data: WeatherResponse | null, responseError = '') => {
    if (!responseError && data) {
      setWeather({
        city: data.name,
        country: data.sys.country,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        temperature: data.main.temp,
      });
      setError('');
    } else {
      setWeather(initialValues);
      setError(responseError);
    }
  };

  return (
    <div className='wrapper'>
      <main className='main'>
        <div className='container'>
          <div className='title-container'>
            <Titles />
          </div>
          <div className='form-container'>
            <Form getWeather={getWeather} />
            <Weather
              city={weather.city}
              country={weather.country}
              temperature={weather.temperature}
              humidity={weather.humidity}
              description={weather.description}
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
