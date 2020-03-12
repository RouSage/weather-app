import React from 'react';
import PropTypes from 'prop-types';

const Weather = ({
  city,
  country,
  temperature,
  humidity,
  description,
  error,
}) => (
  <div>
    {city && country && <p>{`Location: ${city}, ${country}`}</p>}
    {temperature && <p>{`Temperature: ${temperature}`}</p>}
    {humidity && <p>{`Humidity: ${humidity}`}</p>}
    {description && <p>{`Conditions: ${description}`}</p>}
    {error && <p>{error}</p>}
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
