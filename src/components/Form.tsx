import React, { useState } from "react";

import TextInput from "./TextInput";
import useGetGeolocation from "../hooks/useGetGeolocation";
import { GetWeatherParams } from "../services/weather.service";
import { WeatherModel } from "../types";

interface Props {
  isLoading: boolean;
  onGetLocation: () => void;
  onSubmit: (params: GetWeatherParams) => void;
}

const WeatherForm = ({ isLoading, onSubmit, onGetLocation }: Props) => {
  const [city, setCity] = useState<WeatherModel["city"]>("");
  const [country, setCountry] = useState<WeatherModel["country"]>("");

  const { isLocationAvailable } = useGetGeolocation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ city, country });
  };

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
          className="cursor-pointer rounded-sm border-0 bg-main px-3 py-2 text-sm font-light text-white active:outline-none disabled:cursor-default disabled:opacity-40 md:text-xl"
          type="submit"
          disabled={isLoading}
        >
          Get Weather
        </button>
        <button
          className="cursor-pointer rounded-sm border-0 bg-main px-3 py-2 text-sm font-light text-white active:outline-none disabled:cursor-default disabled:opacity-40 md:text-xl"
          type="button"
          onClick={onGetLocation}
          disabled={!isLocationAvailable || isLoading}
        >
          Get Current Location
        </button>
      </div>
    </form>
  );
};

export default WeatherForm;
