// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Spinner from '@cloudscape-design/components/spinner';

import { WeatherData, CityInfo } from '../app';
import { getWeatherInfo } from '../utils/weather-utils';

interface CurrentWeatherProps {
  data: WeatherData['current'];
  city: CityInfo;
  loading: boolean;
}

export function CurrentWeather({ data, city, loading }: CurrentWeatherProps) {
  if (loading) {
    return (
      <Container>
        <Box textAlign="center" padding="l">
          <Spinner size="large" />
        </Box>
      </Container>
    );
  }

  const weatherInfo = getWeatherInfo(data.weatherCode);

  return (
    <Container
      header={
        <Header variant="h2">
          Current Weather - {city.name}
          {city.country && `, ${city.country}`}
        </Header>
      }
    >
      <ColumnLayout columns={2} variant="text-grid">
        <SpaceBetween size="l">
          <Box textAlign="center">
            <Box fontSize="display-l" fontWeight="bold">
              {data.temperature}°C
            </Box>
            <Box variant="h3" color="text-body-secondary">
              {weatherInfo.description}
            </Box>
            <Box fontSize="heading-xl">{weatherInfo.icon}</Box>
          </Box>
        </SpaceBetween>

        <SpaceBetween size="s">
          <Box>
            <Box variant="strong">Feels like:</Box> {data.apparentTemperature}°C
          </Box>
          <Box>
            <Box variant="strong">Humidity:</Box> {data.humidity}%
          </Box>
          <Box>
            <Box variant="strong">Wind Speed:</Box> {data.windSpeed} km/h
          </Box>
        </SpaceBetween>
      </ColumnLayout>
    </Container>
  );
}
