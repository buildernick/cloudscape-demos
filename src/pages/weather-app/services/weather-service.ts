// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { WeatherData, CityInfo } from '../app';

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

export class WeatherService {
  async searchCity(cityName: string): Promise<CityInfo> {
    const response = await fetch(
      `${GEOCODING_API}?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`,
    );

    if (!response.ok) {
      throw new Error('Failed to search for city');
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error('City not found');
    }

    const result = data.results[0];
    return {
      name: result.name,
      country: result.country || '',
      latitude: result.latitude,
      longitude: result.longitude,
    };
  }

  async getWeatherData(latitude: number, longitude: number): Promise<WeatherData> {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current: 'temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,apparent_temperature',
      hourly: 'temperature_2m,weather_code',
      daily: 'temperature_2m_max,temperature_2m_min,weather_code',
      timezone: 'auto',
      forecast_days: '7',
    });

    const response = await fetch(`${WEATHER_API}?${params}`);

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();

    // Process hourly data (next 24 hours)
    const hourlyData = data.hourly.time.slice(0, 24).map((time: string, index: number) => ({
      time,
      temperature: Math.round(data.hourly.temperature_2m[index]),
      weatherCode: data.hourly.weather_code[index],
    }));

    // Process daily data
    const dailyData = data.daily.time.map((date: string, index: number) => ({
      date,
      temperatureMax: Math.round(data.daily.temperature_2m_max[index]),
      temperatureMin: Math.round(data.daily.temperature_2m_min[index]),
      weatherCode: data.daily.weather_code[index],
    }));

    return {
      current: {
        temperature: Math.round(data.current.temperature_2m),
        weatherCode: data.current.weather_code,
        windSpeed: Math.round(data.current.wind_speed_10m),
        humidity: Math.round(data.current.relative_humidity_2m),
        apparentTemperature: Math.round(data.current.apparent_temperature),
      },
      hourly: hourlyData,
      daily: dailyData,
    };
  }
}

export const weatherService = new WeatherService();
