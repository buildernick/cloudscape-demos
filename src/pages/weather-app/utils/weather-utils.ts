// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

export interface WeatherInfo {
  description: string;
  icon: string;
}

// Weather code mappings based on WMO codes used by Open-Meteo
export const getWeatherInfo = (code: number): WeatherInfo => {
  const weatherCodes: Record<number, WeatherInfo> = {
    0: { description: 'Clear sky', icon: '☀️' },
    1: { description: 'Mainly clear', icon: '🌤️' },
    2: { description: 'Partly cloudy', icon: '⛅' },
    3: { description: 'Overcast', icon: '☁️' },
    45: { description: 'Fog', icon: '🌫️' },
    48: { description: 'Depositing rime fog', icon: '🌫️' },
    51: { description: 'Light drizzle', icon: '🌦️' },
    53: { description: 'Moderate drizzle', icon: '🌦️' },
    55: { description: 'Dense drizzle', icon: '🌧️' },
    56: { description: 'Light freezing drizzle', icon: '🌨️' },
    57: { description: 'Dense freezing drizzle', icon: '🌨️' },
    61: { description: 'Slight rain', icon: '🌦️' },
    63: { description: 'Moderate rain', icon: '🌧️' },
    65: { description: 'Heavy rain', icon: '🌧️' },
    66: { description: 'Light freezing rain', icon: '🌨️' },
    67: { description: 'Heavy freezing rain', icon: '🌨️' },
    71: { description: 'Slight snow fall', icon: '🌨️' },
    73: { description: 'Moderate snow fall', icon: '❄️' },
    75: { description: 'Heavy snow fall', icon: '❄️' },
    77: { description: 'Snow grains', icon: '❄️' },
    80: { description: 'Slight rain showers', icon: '🌦️' },
    81: { description: 'Moderate rain showers', icon: '🌧️' },
    82: { description: 'Violent rain showers', icon: '⛈️' },
    85: { description: 'Slight snow showers', icon: '🌨️' },
    86: { description: 'Heavy snow showers', icon: '❄️' },
    95: { description: 'Thunderstorm', icon: '⛈️' },
    96: { description: 'Thunderstorm with slight hail', icon: '⛈️' },
    99: { description: 'Thunderstorm with heavy hail', icon: '⛈️' },
  };

  return weatherCodes[code] || { description: 'Unknown', icon: '❓' };
};

export const formatTime = (timeString: string): string => {
  const date = new Date(timeString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true,
  });
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }
};
