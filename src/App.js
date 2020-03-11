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
    // error: ''
  };

  getWeather = (data) => {
    this.setState({
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].description,
    });
  };

  render() {
    const { city, country, temperature, humidity, description } = this.state;

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
        />
      </>
    );
  }
}

export default App;
