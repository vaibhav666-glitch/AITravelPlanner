// services/weather.service.ts

import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const API_KEY = process.env.WEATHER_API_KEY

export const getWeatherForecast = async (
  destination: string,
  days: number
) => {
  try {
    
    const maxDays = Math.min(days, 10);

    const response = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json`,
      {
        params: {
          key: API_KEY,
          q: destination,
          days: maxDays,
          aqi: "no",
          alerts: "no",
        },
      }
    );

   const forecastDays = response.data.forecast.forecastday;

const dailyWeather = [];

for (let i = 0; i < days; i++) {
  if (i < forecastDays.length) {
    const d = forecastDays[i];

    dailyWeather.push({
      day: i + 1,
      date: d.date,
      weather: d.day.condition.text,
      description: d.day.condition.text,
      temp: Math.round(d.day.avgtemp_c),
    });
  } else {
    
    const last = forecastDays[forecastDays.length - 1];

    dailyWeather.push({
      day: i + 1,
      date: last.date,
      weather: last.day.condition.text,
      description: last.day.condition.text,
      temp: Math.round(last.day.avgtemp_c),
    });
  }
}

    return dailyWeather;
  } catch (err: any) {
    console.error(
      "WeatherAPI Error:",
      err?.response?.data || err.message
    );
    return [];
  }
};