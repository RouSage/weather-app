import React from 'react';
import './Weather.css';

export interface WeatherModel {
  city: string;
  country: string;
  description: string;
  temperature?: number;
  humidity?: number;
}

interface WeatherProps extends WeatherModel {
  error?: string;
}

const Weather = ({
  city,
  country,
  temperature,
  humidity,
  description,
  error,
}: WeatherProps): JSX.Element => (
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

export default React.memo(Weather);
