// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Grid from '@cloudscape-design/components/grid';
import Box from '@cloudscape-design/components/box';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import { CurrentWeatherData } from '../types';
import { getWeatherCodeInfo, formatTime, getWindDirection } from '../utils/weather-utils';

interface CurrentWeatherProps {
  data: CurrentWeatherData;
  location: string;
  loading: boolean;
}

export function CurrentWeather({ data, location, loading }: CurrentWeatherProps) {
  const weatherInfo = getWeatherCodeInfo(data.weather_code);
  const isDay = data.is_day === 1;

  return (
    <Container
      header={
        <Header variant="h2" description={`Current conditions as of ${formatTime(data.time)}`}>
          Current Weather - {location}
        </Header>
      }
    >
      <Grid
        gridDefinition={[
          { colspan: { default: 12, xs: 12, s: 6, m: 4, l: 3 } },
          { colspan: { default: 12, xs: 12, s: 6, m: 8, l: 9 } },
        ]}
      >
        <Box textAlign="center" padding="m">
          <Box variant="h1" color="text-status-info" padding={{ bottom: 'xs' }}>
            {Math.round(data.temperature_2m)}°C
          </Box>
          <Box variant="h3" color="text-body-secondary" padding={{ bottom: 'xs' }}>
            {weatherInfo.description}
          </Box>
          <Box variant="small" color="text-body-secondary">
            Feels like {Math.round(data.apparent_temperature)}°C
          </Box>
          <Box padding={{ top: 's' }}>
            <StatusIndicator type={isDay ? 'success' : 'info'}>{isDay ? 'Day' : 'Night'}</StatusIndicator>
          </Box>
        </Box>

        <KeyValuePairs
          columns={2}
          items={[
            {
              label: 'Humidity',
              value: `${data.relative_humidity_2m}%`,
            },
            {
              label: 'Wind Speed',
              value: `${Math.round(data.wind_speed_10m)} km/h`,
            },
            {
              label: 'Wind Direction',
              value: getWindDirection(data.wind_direction_10m),
            },
            {
              label: 'Weather Code',
              value: data.weather_code.toString(),
            },
          ]}
        />
      </Grid>
    </Container>
  );
}
