# React Weather App

![GitHub](https://img.shields.io/github/license/RouSage/weather-app)

This app allows you to find out the weather in your city.

It's made using [this](https://youtu.be/204C9yNeOYI) tutorial by [Hamza Mirza](https://github.com/hamza-mirza) but with little tweaks (components code, CSS, images, etc.).

You can find the original source code [here](https://github.com/hamza-mirza/react-weather-app).

## Description

It's a simple React application built using Next.js that can show you the weather forecast (temperature, humidity, conditions) for the location you specify. It uses [OpenWeather API](https://openweathermap.org/api) to fetch forecast data for the specified location.

## Installation

In the project directory, use `yarn` package manager to install all required dependencies.

```bash
yarn install
```

You also need to create `.env` file in the root of the project and add an API key environment variable like this:

```env
NEXT_PUBLIC_WEATHER_API_KEY=<your_api_key_value>
```

You can get your API key [here](https://openweathermap.org/api).

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
