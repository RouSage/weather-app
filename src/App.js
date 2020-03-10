import React, { Component } from 'react';

import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

import './App.css';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
  };

  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          temperature: data.main.temp,
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: data.error,
        });
      });
  };

  render() {
    return (
      <>
        <Titles />
        <Form getWeather={this.getWeather} />
        <Weather />
      </>
    );
  }
}

export default App;
