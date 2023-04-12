import React from "react";

import { WeatherModel } from "../types";

interface Props {
  weather: WeatherModel;
  error?: string;
}

const Weather = ({ weather, error }: Props) => (
  <article className="flex flex-col gap-2 text-sm font-light md:gap-4 md:text-xl">
    {!!weather.city && !!weather.country && (
      <p className="m-0 border-b border-b-main text-main">
        {"Location: "}
        <span className="font-light text-white">
          {weather.city}, {weather.country}
        </span>
      </p>
    )}
    {weather.temperature !== undefined && (
      <p className="m-0 border-b border-b-main py-1 text-main md:py-3">
        {"Temperature: "}
        <span className="font-light text-white">
          {weather.temperature}&deg; C
        </span>
      </p>
    )}
    {weather.humidity !== undefined && (
      <p className="m-0 border-b border-b-main py-1 text-main md:py-3">
        {"Humidity: "}
        <span className="font-light text-white">{weather.humidity}%</span>
      </p>
    )}
    {!!weather.description && (
      <p className="m-0 py-1 text-main md:py-3">
        {"Conditions: "}
        <span className="font-light text-white">
          {weather.description.replace(/^\w/, (c) => c.toUpperCase())}
        </span>
      </p>
    )}
    {!!error && (
      <p className="text-sm font-light text-error md:text-xl">{error}</p>
    )}
  </article>
);

export default Weather;
