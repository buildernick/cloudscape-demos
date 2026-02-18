// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useEffect } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Container from '@cloudscape-design/components/container';
import Alert from '@cloudscape-design/components/alert';

import { CitySearch } from './components/city-search';
import { RecentCities } from './components/recent-cities';
import { CurrentWeather } from './components/current-weather';
import { HourlyForecast } from './components/hourly-forecast';
import { DailyForecast } from './components/daily-forecast';
import { weatherService } from './services/weather-service';

export interface WeatherData {
  current: {
    temperature: number;
    weatherCode: number;
    windSpeed: number;
    humidity: number;
    apparentTemperature: number;
  };
  hourly: Array<{
    time: string;
    temperature: number;
    weatherCode: number;
  }>;
  daily: Array<{
    date: string;
    temperatureMax: number;
    temperatureMin: number;
    weatherCode: number;
  }>;
}

export interface CityInfo {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [currentCity, setCurrentCity] = useState<CityInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentCities, setRecentCities] = useState<CityInfo[]>([]);

  // Load recent cities from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('recentCities');
    if (stored) {
      try {
        setRecentCities(JSON.parse(stored));
      } catch (e) {
        console.error('Error loading recent cities:', e);
      }
    }
  }, []);

  // Save recent cities to localStorage
  const saveRecentCities = (cities: CityInfo[]) => {
    localStorage.setItem('recentCities', JSON.stringify(cities));
    setRecentCities(cities);
  };

  // Add city to recent cities list
  const addToRecentCities = (city: CityInfo) => {
    const filtered = recentCities.filter(c => c.name !== city.name || c.country !== city.country);
    const updated = [city, ...filtered].slice(0, 5);
    saveRecentCities(updated);
  };

  // Load weather data for a city
  const loadWeatherData = async (city: CityInfo) => {
    setLoading(true);
    setError(null);

    try {
      const data = await weatherService.getWeatherData(city.latitude, city.longitude);
      setWeatherData(data);
      setCurrentCity(city);
      addToRecentCities(city);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  // Handle city search
  const handleCitySearch = async (cityName: string) => {
    setLoading(true);
    setError(null);

    try {
      const city = await weatherService.searchCity(cityName);
      await loadWeatherData(city);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to find city');
      setLoading(false);
    }
  };

  return (
    <AppLayout
      navigationHide
      toolsHide
      content={
        <ContentLayout header={<Header variant="h1">Simple Weather App</Header>}>
          <SpaceBetween size="l">
            <Container>
              <SpaceBetween size="m">
                <CitySearch onSearch={handleCitySearch} loading={loading} />
                <RecentCities cities={recentCities} onCitySelect={loadWeatherData} />
              </SpaceBetween>
            </Container>

            {error && (
              <Alert type="error" dismissible onDismiss={() => setError(null)}>
                {error}
              </Alert>
            )}

            {weatherData && currentCity && (
              <SpaceBetween size="l">
                <CurrentWeather data={weatherData.current} city={currentCity} loading={loading} />

                <HourlyForecast data={weatherData.hourly} loading={loading} />

                <DailyForecast data={weatherData.daily} loading={loading} />
              </SpaceBetween>
            )}

            {!weatherData && !loading && !error && (
              <Container>
                <SpaceBetween size="m">
                  <Header variant="h2">Welcome to Simple Weather App</Header>
                  <p>
                    Search for a city above to get started with current weather conditions, hourly forecasts, and 7-day
                    predictions.
                  </p>
                </SpaceBetween>
              </Container>
            )}
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
