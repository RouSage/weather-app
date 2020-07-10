import React, { useState } from 'react';

import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

import './App.css';

const App = () => {
  const initialWeather = {
    city: '',
    country: '',
    temperature: undefined,
    humidity: undefined,
    description: '',
  };

  const [weather, setWeather] = useState(initialWeather);
  const [error, setError] = useState('');

  const getWeather = (data, responseError = null) => {
    if (!responseError) {
      setWeather({
        city: data.name,
        country: data.sys.country,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        temperature: data.main.temp,
      });
      setError('');
    } else {
      setWeather(initialWeather);
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
