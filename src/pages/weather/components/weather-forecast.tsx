// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Tabs from '@cloudscape-design/components/tabs';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import Badge from '@cloudscape-design/components/badge';
import { HourlyWeatherData, DailyWeatherData } from '../types';
import { getWeatherCodeInfo, formatDate, formatTime } from '../utils/weather-utils';

interface WeatherForecastProps {
  hourlyData: HourlyWeatherData;
  dailyData: DailyWeatherData;
  timezone: string;
  loading: boolean;
}

export function WeatherForecast({ hourlyData, dailyData, timezone, loading }: WeatherForecastProps) {
  const [activeTab, setActiveTab] = useState('hourly');

  // Prepare hourly data for next 24 hours
  const next24Hours = hourlyData.time.slice(0, 24).map((time, index) => ({
    time: formatTime(time),
    temperature: Math.round(hourlyData.temperature_2m[index]),
    weather: getWeatherCodeInfo(hourlyData.weather_code[index]).description,
    windSpeed: Math.round(hourlyData.wind_speed_10m[index]),
    humidity: hourlyData.relative_humidity_2m[index],
  }));

  // Prepare daily data for next 7 days
  const next7Days = dailyData.time.map((time, index) => ({
    date: formatDate(time),
    maxTemp: Math.round(dailyData.temperature_2m_max[index]),
    minTemp: Math.round(dailyData.temperature_2m_min[index]),
    weather: getWeatherCodeInfo(dailyData.weather_code[index]).description,
    precipitation: dailyData.precipitation_sum[index],
    windSpeed: Math.round(dailyData.wind_speed_10m_max[index]),
  }));

  const hourlyColumnDefinitions = [
    {
      id: 'time',
      header: 'Time',
      cell: (item: (typeof next24Hours)[0]) => item.time,
      width: 120,
    },
    {
      id: 'temperature',
      header: 'Temperature',
      cell: (item: (typeof next24Hours)[0]) => (
        <Badge color={item.temperature > 25 ? 'red' : item.temperature > 15 ? 'blue' : 'grey'}>
          {item.temperature}°C
        </Badge>
      ),
      width: 120,
    },
    {
      id: 'weather',
      header: 'Conditions',
      cell: (item: (typeof next24Hours)[0]) => item.weather,
      width: 200,
    },
    {
      id: 'wind',
      header: 'Wind Speed',
      cell: (item: (typeof next24Hours)[0]) => `${item.windSpeed} km/h`,
      width: 120,
    },
    {
      id: 'humidity',
      header: 'Humidity',
      cell: (item: (typeof next24Hours)[0]) => `${item.humidity}%`,
      width: 100,
    },
  ];

  const dailyColumnDefinitions = [
    {
      id: 'date',
      header: 'Date',
      cell: (item: (typeof next7Days)[0]) => item.date,
      width: 150,
    },
    {
      id: 'temperature',
      header: 'Temperature Range',
      cell: (item: (typeof next7Days)[0]) => (
        <Box>
          <Badge color="red">{item.maxTemp}°C</Badge> <Badge color="blue">{item.minTemp}°C</Badge>
        </Box>
      ),
      width: 180,
    },
    {
      id: 'weather',
      header: 'Conditions',
      cell: (item: (typeof next7Days)[0]) => item.weather,
      width: 200,
    },
    {
      id: 'precipitation',
      header: 'Precipitation',
      cell: (item: (typeof next7Days)[0]) => (
        <Badge color={item.precipitation > 5 ? 'red' : item.precipitation > 0 ? 'blue' : 'grey'}>
          {item.precipitation.toFixed(1)} mm
        </Badge>
      ),
      width: 120,
    },
    {
      id: 'wind',
      header: 'Max Wind Speed',
      cell: (item: (typeof next7Days)[0]) => `${item.windSpeed} km/h`,
      width: 140,
    },
  ];

  return (
    <Container
      header={
        <Header variant="h2" description={`Weather forecast data in ${timezone} timezone`}>
          Weather Forecast
        </Header>
      }
    >
      <Tabs
        tabs={[
          {
            id: 'hourly',
            label: 'Hourly (24h)',
            content: (
              <Table
                columnDefinitions={hourlyColumnDefinitions}
                items={next24Hours}
                loadingText="Loading hourly forecast..."
                loading={loading}
                empty={
                  <Box textAlign="center" color="inherit">
                    <Box variant="strong" textAlign="center" color="inherit">
                      No hourly data available
                    </Box>
                  </Box>
                }
                variant="embedded"
              />
            ),
          },
          {
            id: 'daily',
            label: 'Daily (7 days)',
            content: (
              <Table
                columnDefinitions={dailyColumnDefinitions}
                items={next7Days}
                loadingText="Loading daily forecast..."
                loading={loading}
                empty={
                  <Box textAlign="center" color="inherit">
                    <Box variant="strong" textAlign="center" color="inherit">
                      No daily data available
                    </Box>
                  </Box>
                }
                variant="embedded"
              />
            ),
          },
        ]}
        activeTabId={activeTab}
        onChange={({ detail }) => setActiveTab(detail.activeTabId)}
      />
    </Container>
  );
}
