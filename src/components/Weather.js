import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Weather extends PureComponent {
  render() {
    const { city, country, temperature, humidity, description } = this.props;
    return (
      <div>
        <p>{city && country && `Location: ${city}, ${country}`}</p>
        <p>{temperature && `Temperature: ${temperature}`}</p>
        <p>{humidity && `Humidity: ${humidity}`}</p>
        <p>{description && `Conditions: ${description}`}</p>
      </div>
    );
  }
}

Weather.propTypes = {
  city: PropTypes.string,
  country: PropTypes.string,
  temperature: PropTypes.number,
  humidity: PropTypes.number,
  description: PropTypes.string
};

export default Weather;
