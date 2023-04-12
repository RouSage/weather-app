import React, { useEffect, useState } from "react";

import {
  fetchWeather,
  fetchWeatherByCoords,
  WeatherResponse,
} from "../api/api";
import { WeatherModel } from "../types";
import TextInput from "./TextInput";

interface Props {
  getWeather: (data: WeatherResponse | null, responseError?: string) => void;
}

const WeatherForm = ({ getWeather }: Props) => {
  const [city, setCity] = useState<WeatherModel["city"]>("");
  const [country, setCountry] = useState<WeatherModel["country"]>("");
  const [locationAvailable, setLocationAvailable] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (city && country) {
      try {
        const data = await fetchWeather(city, country);
        getWeather(data);
      } catch (error) {
        getWeather(null, error as string);
      }
    } else {
      getWeather(null, "Please enter the value.");
    }
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const data = await fetchWeatherByCoords(latitude, longitude);

          setCity("");
          setCountry("");
          getWeather(data);
        } catch (error) {
          getWeather(null, error as string);
        }
      },
      (e) => {
        getWeather(null, e.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    // Check if the user's device supports geolocation
    if (!navigator.geolocation) {
      setLocationAvailable(false);
    } else {
      navigator.permissions.query({ name: "geolocation" }).then((status) => {
        if (status.state === "granted" || status.state === "prompt") {
          setLocationAvailable(true);
        } else if (status.state === "denied") {
          setLocationAvailable(false);
        }
      });
    }
  }, []);

  return (
    <form className="mb-4 md:mb-8" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 md:flex-row md:gap-3">
        <TextInput
          name="city"
          id="city"
          value={city}
          placeholder="City..."
          onChange={(e) => setCity(e.target.value)}
          className="w-full"
        />
        <TextInput
          name="country"
          id="country"
          value={country}
          placeholder="Country..."
          onChange={(e) => setCountry(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="mt-3 flex items-center justify-center gap-2">
        <button
          className="cursor-pointer rounded-sm border-0 bg-main px-3 py-2 text-sm font-light text-white active:outline-none md:text-xl"
          type="submit"
        >
          Get Weather
        </button>
        <button
          className="cursor-pointer rounded-sm border-0 bg-main px-3 py-2 text-sm font-light text-white active:outline-none disabled:cursor-default disabled:opacity-40 md:text-xl"
          type="button"
          onClick={getLocation}
          disabled={!locationAvailable}
        >
          Get Current Location
        </button>
      </div>
    </form>
  );
};

export default WeatherForm;
