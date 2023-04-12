import React, { useState } from "react";
import { WeatherResponse } from "../api/api";
import WeatherForm from "../components/Form";
import Titles from "../components/Titles";
import Weather from "../components/Weather";
import Head from "next/head";
import { WeatherModel } from "../types";

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

  const getWeather = (data: WeatherResponse | null, responseError = "") => {
    if (!responseError && data) {
      setWeather({
        city: data.name,
        country: data.sys.country,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        temperature: data.main.temp,
      });
      setError("");
    } else {
      setWeather(initialWeather);
      setError(responseError);
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
              <WeatherForm getWeather={getWeather} />
              <Weather weather={weather} error={error} />
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
