import React from 'react';
import PropTypes from 'prop-types';
import './Weather.css';

const Weather = ({
  city,
  country,
  temperature,
  humidity,
  description,
  error,
}) => (
  <div className='weather__info'>
    {city && country && (
      <p className='weather__key'>
        Location:{' '}
        <span className='weather__value'>{`${city}, ${country}`}</span>
      </p>
    )}
    {temperature && (
      <p className='weather__key'>
        Temperature: <span className='weather__value'>{temperature}</span>
      </p>
    )}
    {humidity && (
      <p className='weather__key'>
        Humidity: <span className='weather__value'>{humidity}</span>
      </p>
    )}
    {description && (
      <p className='weather__key'>
        Conditions: <span className='weather__value'>{description}</span>
      </p>
    )}
    {error && <p className='weather__error'>{error}</p>}
  </div>
);

Weather.propTypes = {
  city: PropTypes.string,
  country: PropTypes.string,
  temperature: PropTypes.number,
  humidity: PropTypes.number,
  description: PropTypes.string,
  error: PropTypes.string,
};

export default Weather;
