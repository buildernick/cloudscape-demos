// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { WeatherData } from '../types';

const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export async function fetchWeatherData(latitude: number, longitude: number): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'weather_code',
      'wind_speed_10m',
      'wind_direction_10m',
    ].join(','),
    hourly: ['temperature_2m', 'weather_code', 'wind_speed_10m', 'relative_humidity_2m'].join(','),
    daily: ['temperature_2m_max', 'temperature_2m_min', 'weather_code', 'precipitation_sum', 'wind_speed_10m_max'].join(
      ',',
    ),
    temperature_unit: 'celsius',
    wind_speed_unit: 'kmh',
    precipitation_unit: 'mm',
    timezone: 'auto',
    forecast_days: '7',
  });

  const url = `${OPEN_METEO_BASE_URL}?${params}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Weather API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.current || !data.hourly || !data.daily) {
      throw new Error('Invalid weather data received from API');
    }

    return data as WeatherData;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch weather data');
  }
}

// Geocoding service to convert city names to coordinates
export async function fetchLocationCoordinates(
  cityName: string,
): Promise<{ latitude: number; longitude: number; name: string }> {
  const params = new URLSearchParams({
    name: cityName,
    count: '1',
    language: 'en',
    format: 'json',
  });

  const url = `https://geocoding-api.open-meteo.com/v1/search?${params}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Geocoding API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error(`No location found for "${cityName}"`);
    }

    const result = data.results[0];
    return {
      latitude: result.latitude,
      longitude: result.longitude,
      name: `${result.name}${result.admin1 ? `, ${result.admin1}` : ''}${result.country ? `, ${result.country}` : ''}`,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to geocode location');
  }
}
