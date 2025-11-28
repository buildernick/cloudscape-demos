// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { DailyWeatherData } from '../types';
import { getWeatherCodeInfo, formatDateShort } from '../utils/weather-utils';

interface ForecastRibbonProps {
  dailyData: DailyWeatherData;
  loading: boolean;
}

export function ForecastRibbon({ dailyData, loading }: ForecastRibbonProps) {
  if (loading || !dailyData.time.length) {
    return null;
  }

  const forecastItems = dailyData.time.slice(0, 7).map((time, index) => {
    const weatherInfo = getWeatherCodeInfo(dailyData.weather_code[index]);
    return {
      date: formatDateShort(time),
      icon: weatherInfo.icon,
      description: weatherInfo.description,
      maxTemp: Math.round(dailyData.temperature_2m_max[index]),
      minTemp: Math.round(dailyData.temperature_2m_min[index]),
      precipitation: dailyData.precipitation_sum[index],
    };
  });

  return (
    <Container>
      <Box variant="h3" padding={{ bottom: 'm' }}>
        7-Day Forecast
      </Box>
      <Grid
        gridDefinition={[
          { colspan: { default: 12, xs: 6, s: 4, m: 3, l: 2, xl: 1 } },
          { colspan: { default: 12, xs: 6, s: 4, m: 3, l: 2, xl: 1 } },
          { colspan: { default: 12, xs: 6, s: 4, m: 3, l: 2, xl: 1 } },
          { colspan: { default: 12, xs: 6, s: 4, m: 3, l: 2, xl: 1 } },
          { colspan: { default: 12, xs: 6, s: 4, m: 3, l: 2, xl: 1 } },
          { colspan: { default: 12, xs: 6, s: 4, m: 3, l: 2, xl: 1 } },
          { colspan: { default: 12, xs: 6, s: 4, m: 3, l: 2, xl: 1 } },
        ]}
      >
        {forecastItems.map((item, index) => (
          <Box
            key={index}
            textAlign="center"
            padding="m"
            css={{
              borderRadius: '12px',
              border: index === 0 ? '2px solid #0073bb' : '1px solid #e9ebed',
              backgroundColor: index === 0 ? '#f2f9ff' : '#ffffff',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#f8f9fa';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = index === 0 ? '#f2f9ff' : '#ffffff';
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <SpaceBetween size="xs">
              <Box variant="small" color="text-body-secondary" fontWeight="bold">
                {index === 0 ? 'Today' : item.date}
              </Box>

              <Box
                css={{
                  fontSize: '32px',
                  lineHeight: '1',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                }}
              >
                {item.icon}
              </Box>

              <Box variant="small" color="text-body-secondary" textAlign="center">
                {item.description.split(' ').slice(0, 2).join(' ')}
              </Box>

              <SpaceBetween size="xxs">
                <Box variant="strong" color="text-status-info" css={{ fontSize: '16px' }}>
                  {item.maxTemp}°
                </Box>
                <Box variant="small" color="text-body-secondary" css={{ fontSize: '14px' }}>
                  {item.minTemp}°
                </Box>
              </SpaceBetween>

              {item.precipitation > 0 && (
                <Box variant="small" color="text-status-info">
                  💧 {item.precipitation.toFixed(1)}mm
                </Box>
              )}
            </SpaceBetween>
          </Box>
        ))}
      </Grid>
    </Container>
  );
}
