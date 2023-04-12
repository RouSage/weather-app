import React, { useState } from "react";
import useSWRMutation from "swr/mutation";
import WeatherForm from "../components/Form";
import Titles from "../components/Titles";
import Weather from "../components/Weather";
import Head from "next/head";
import { WeatherModel } from "../types";
import {
  GetWeatherParams,
  WeatherResponse,
  fetchWeather,
  fetchWeatherByCoords,
} from "../services/weather.service";

const initialWeather: WeatherModel = {
  city: "",
  country: "",
  description: "",
  humidity: undefined,
  temperature: undefined,
};

const App = (): JSX.Element => {
  const [weather, setWeather] = useState<WeatherModel>(initialWeather);
  const [error, setError] = useState<string>("");

  const handleSuccess = (data: WeatherResponse) => {
    const { name, sys, weather, main } = data;

    setWeather({
      city: name,
      country: sys.country,
      description: weather[0].description,
      humidity: main.humidity,
      temperature: main.temp,
    });
    setError("");
  };

  const { trigger: getWeather, isMutating: isWeatherLoading } = useSWRMutation(
    "getWeather",
    fetchWeather,
    {
      onSuccess: handleSuccess,
      onError: (err: string) => {
        setWeather(initialWeather);
        setError(err);
      },
    }
  );
  const { trigger: getWeatherByCoords, isMutating: isWeatherByCoordsLoading } =
    useSWRMutation("getWeatherByCoords", fetchWeatherByCoords, {
      onSuccess: handleSuccess,
      onError: (err: string) => {
        setWeather(initialWeather);
        setError(err);
      },
    });

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        getWeatherByCoords(coords);
      },
      ({ message }) => {
        setError(message);
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  const handleSubmit = (params: GetWeatherParams) => {
    if (params.city && params.country) {
      getWeather(params);
    } else {
      setWeather(initialWeather);
      setError("Please enter the value.");
    }
  };

  return (
    <>
      <Head>
        <title>Weather Finder</title>
      </Head>
      <main className="flex h-screen items-center justify-center bg-gradient-to-r from-dark-green to-light-green">
        <div className="mx-auto h-[90vh] w-4/5 bg-white shadow-lg shadow-black/75">
          <div className="grid h-full w-full grid-rows-[45%_1fr] md:grid-cols-[45%_1fr] md:grid-rows-1">
            <section className="flex items-center justify-center bg-[url('/img/bg-992w.png')] bg-cover bg-center md:bg-[url('/img/bg-1199w.png')] lg:bg-[url('/img/bg.png')]">
              <Titles />
            </section>
            <section className="bg-[#202020] p-4 md:px-5 md:pt-14">
              <WeatherForm
                isLoading={isWeatherLoading || isWeatherByCoordsLoading}
                onSubmit={handleSubmit}
                onGetLocation={handleGetLocation}
              />
              <Weather weather={weather} error={error} />
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
