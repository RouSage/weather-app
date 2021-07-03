import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './Form.css';

// API Key from https://openweathermap.org/api
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const Form = ({ getWeather }) => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (city && country) {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`,
        { method: 'GET' },
      );
      const data = await response.json();
      getWeather(data);
    } else {
      getWeather(null, 'Please enter the value.');
    }
  };

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
    </form>
  );
};

Form.propTypes = {
  getWeather: PropTypes.func,
};

export default React.memo(Form);
