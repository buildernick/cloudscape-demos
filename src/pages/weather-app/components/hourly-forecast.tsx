// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Spinner from '@cloudscape-design/components/spinner';

import { WeatherData } from '../app';
import { getWeatherInfo, formatTime } from '../utils/weather-utils';

interface HourlyForecastProps {
  data: WeatherData['hourly'];
  loading: boolean;
}

export function HourlyForecast({ data, loading }: HourlyForecastProps) {
  if (loading) {
    return (
      <Container header={<Header variant="h2">24-Hour Forecast</Header>}>
        <Box textAlign="center" padding="l">
          <Spinner size="large" />
        </Box>
      </Container>
    );
  }

  return (
    <Container header={<Header variant="h2">24-Hour Forecast</Header>}>
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          gap: '16px',
          padding: '16px 0',
        }}
      >
        {data.map((hour, index) => {
          const weatherInfo = getWeatherInfo(hour.weatherCode);
          return (
            <div
              key={`${hour.time}-${index}`}
              style={{
                minWidth: '80px',
                textAlign: 'center',
                padding: '12px',
                border: '1px solid #e9ebed',
                borderRadius: '8px',
                backgroundColor: '#fafbfc',
              }}
            >
              <SpaceBetween size="s">
                <Box variant="small" color="text-body-secondary">
                  {formatTime(hour.time)}
                </Box>
                <Box fontSize="heading-m">{weatherInfo.icon}</Box>
                <Box variant="strong">{hour.temperature}°</Box>
              </SpaceBetween>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
