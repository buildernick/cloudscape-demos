// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

export interface LocationData {
  name: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeatherData {
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  weather_code: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  time: string;
}

export interface HourlyWeatherData {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
  wind_speed_10m: number[];
  relative_humidity_2m: number[];
}

export interface DailyWeatherData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[];
  precipitation_sum: number[];
  wind_speed_10m_max: number[];
}

export interface WeatherData {
  current: CurrentWeatherData;
  hourly: HourlyWeatherData;
  daily: DailyWeatherData;
  timezone: string;
}

export interface WeatherCodeInfo {
  description: string;
  icon: string;
}
