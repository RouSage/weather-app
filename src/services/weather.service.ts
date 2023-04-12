import axios from "axios";

// API Key from https://openweathermap.org/api
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric";

export interface WeatherResponse {
  weather: [
    {
      description: string;
    }
  ];
  main: {
    temp: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  name: string;
}

export interface GetWeatherParams {
  city: string;
  country: string;
}

export const fetchWeather = async (
  _: string,
  { arg }: { arg: GetWeatherParams }
): Promise<WeatherResponse> => {
  try {
    const response = await axios.get<WeatherResponse>(API_URL, {
      method: "GET",
      params: {
        q: `${arg.city},${arg.country}`,
        appid: API_KEY,
      },
    });

    return response.data;
  } catch {
    throw "The was some error. Please, try again later!";
  }
};

export interface GetWeatherByCoordsParams {
  latitude: number;
  longitude: number;
}

export const fetchWeatherByCoords = async (
  _: string,
  { arg }: { arg: GetWeatherByCoordsParams }
): Promise<WeatherResponse> => {
  try {
    const response = await axios.get<WeatherResponse>(API_URL, {
      method: "GET",
      params: {
        lat: arg.latitude,
        lon: arg.longitude,
        appid: API_KEY,
      },
    });

    return response.data;
  } catch {
    throw "The was an error getting your location";
  }
};
