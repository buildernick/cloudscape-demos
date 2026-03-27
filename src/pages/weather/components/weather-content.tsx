// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState, useEffect } from 'react';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Button from '@cloudscape-design/components/button';
import Alert from '@cloudscape-design/components/alert';
import Spinner from '@cloudscape-design/components/spinner';
import Box from '@cloudscape-design/components/box';
import { LocationInput } from './location-input';
import { CurrentWeather } from './current-weather';
import { WeatherForecast } from './weather-forecast';
import { ForecastRibbon } from './forecast-ribbon';
import { WeatherData, LocationData } from '../types';
import { fetchWeatherData } from '../services/weather-service';

interface WeatherContentProps {
  loadHelpPanelContent: () => void;
}

export function WeatherContent({ loadHelpPanelContent }: WeatherContentProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLocationSubmit = async (locationData: LocationData) => {
    setLoading(true);
    setError(null);
    setLocation(locationData);

    try {
      const data = await fetchWeatherData(locationData.latitude, locationData.longitude);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (location) {
      handleLocationSubmit(location);
    }
  };

  // Load default location (San Francisco) on component mount
  useEffect(() => {
    const defaultLocation = {
      name: 'San Francisco, CA',
      latitude: 37.7749,
      longitude: -122.4194,
    };
    handleLocationSubmit(defaultLocation);
  }, []);

  return (
    <SpaceBetween size="l">
      <Header
        variant="h1"
        description="Get current weather conditions and forecasts using the Open-Meteo API"
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button iconName="refresh" loading={loading} onClick={handleRefresh} disabled={!location}>
              Refresh
            </Button>
            <Button iconName="status-info" variant="icon" onClick={loadHelpPanelContent} ariaLabel="View help" />
          </SpaceBetween>
        }
      >
        Weather App
      </Header>

      <Container>
        <LocationInput onLocationSubmit={handleLocationSubmit} loading={loading} />
      </Container>

      {error && (
        <Alert type="error" dismissible onDismiss={() => setError(null)}>
          {error}
        </Alert>
      )}

      {loading && !weatherData && (
        <Container>
          <Box textAlign="center" padding="xl">
            <Spinner size="large" />
            <Box variant="h3" padding={{ top: 's' }}>
              Loading weather data...
            </Box>
          </Box>
        </Container>
      )}

      {weatherData && location && !loading && (
        <Grid gridDefinition={[{ colspan: 12 }]}>
          <SpaceBetween size="l">
            <ForecastRibbon dailyData={weatherData.daily} loading={loading} />
            <CurrentWeather data={weatherData.current} location={location.name} loading={loading} />
            <WeatherForecast
              hourlyData={weatherData.hourly}
              dailyData={weatherData.daily}
              timezone={weatherData.timezone}
              loading={loading}
            />
          </SpaceBetween>
        </Grid>
      )}
    </SpaceBetween>
  );
}
