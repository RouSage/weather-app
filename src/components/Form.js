import React, { Component } from 'react';
import PropTypes from 'prop-types';

// API Key from https://openweathermap.org/api
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class Form extends Component {
  state = {
    city: '',
    country: '',
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { city, country } = this.state;

    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`,
    )
      .then((response) => response.json())
      .then((data) => {
        const { getWeather } = this.props;
        getWeather(data);
      });
  };

  handleInputChange(e) {
    const {
      target: { name, value },
    } = e;

    this.setState({ [name]: value });
  }

  render() {
    const { city, country } = this.state;

    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <input
          type='text'
          name='city'
          id='city'
          value={city}
          placeholder='City...'
          onChange={(e) => this.handleInputChange(e)}
        />
        <input
          type='text'
          name='country'
          id='country'
          value={country}
          placeholder='Country...'
          onChange={(e) => this.handleInputChange(e)}
        />
        <button type='submit'>Get Weather</button>
      </form>
    );
  }
}

Form.propTypes = {
  getWeather: PropTypes.func,
};

export default Form;
