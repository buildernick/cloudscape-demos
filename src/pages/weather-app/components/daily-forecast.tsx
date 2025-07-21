// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Spinner from '@cloudscape-design/components/spinner';

import { WeatherData } from '../app';
import { getWeatherInfo, formatDate } from '../utils/weather-utils';

interface DailyForecastProps {
  data: WeatherData['daily'];
  loading: boolean;
}

export function DailyForecast({ data, loading }: DailyForecastProps) {
  if (loading) {
    return (
      <Container header={<Header variant="h2">7-Day Forecast</Header>}>
        <Box textAlign="center" padding="l">
          <Spinner size="large" />
        </Box>
      </Container>
    );
  }

  return (
    <Container header={<Header variant="h2">7-Day Forecast</Header>}>
      <SpaceBetween size="s">
        {data.map((day, index) => {
          const weatherInfo = getWeatherInfo(day.weatherCode);
          return (
            <div
              key={`${day.date}-${index}`}
              style={{
                padding: '16px',
                border: '1px solid #e9ebed',
                borderRadius: '8px',
                backgroundColor: '#fafbfc',
              }}
            >
              <ColumnLayout columns={4} variant="text-grid">
                <Box variant="h4">{formatDate(day.date)}</Box>
                <Box textAlign="center">
                  <Box fontSize="heading-l">{weatherInfo.icon}</Box>
                  <Box variant="small" color="text-body-secondary">
                    {weatherInfo.description}
                  </Box>
                </Box>
                <Box textAlign="center">
                  <Box variant="strong" fontSize="heading-s">
                    {day.temperatureMax}°
                  </Box>
                  <Box variant="small" color="text-body-secondary">
                    High
                  </Box>
                </Box>
                <Box textAlign="center">
                  <Box variant="strong" fontSize="heading-s">
                    {day.temperatureMin}°
                  </Box>
                  <Box variant="small" color="text-body-secondary">
                    Low
                  </Box>
                </Box>
              </ColumnLayout>
            </div>
          );
        })}
      </SpaceBetween>
    </Container>
  );
}
