import React, { Component } from 'react';

import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

import './App.css';

class App extends Component {
  state = {
    city: '',
    country: '',
    temperature: undefined,
    humidity: undefined,
    description: '',
    error: '',
  };

  getWeather = (data, error = null) => {
    if (!error) {
      this.setState({
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: '',
      });
    } else {
      this.setState({
        city: '',
        country: '',
        temperature: undefined,
        humidity: undefined,
        description: '',
        error,
      });
    }
  };

  render() {
    const {
      city,
      country,
      temperature,
      humidity,
      description,
      error,
    } = this.state;

    return (
      <>
        <Titles />
        <Form getWeather={this.getWeather} />
        <Weather
          city={city}
          country={country}
          temperature={temperature}
          humidity={humidity}
          description={description}
          error={error}
        />
      </>
    );
  }
}

export default App;
