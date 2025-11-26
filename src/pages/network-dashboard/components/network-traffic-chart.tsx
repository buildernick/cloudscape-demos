// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import AreaChart from '@cloudscape-design/components/area-chart';
import Box from '@cloudscape-design/components/box';

export function NetworkTrafficChart() {
  // Sample data for the area chart
  const series = [
    {
      title: 'Site 1',
      type: 'area' as const,
      data: [
        { x: new Date('2024-01-01'), y: 45 },
        { x: new Date('2024-01-02'), y: 52 },
        { x: new Date('2024-01-03'), y: 48 },
        { x: new Date('2024-01-04'), y: 61 },
        { x: new Date('2024-01-05'), y: 55 },
        { x: new Date('2024-01-06'), y: 67 },
        { x: new Date('2024-01-07'), y: 59 },
        { x: new Date('2024-01-08'), y: 72 },
        { x: new Date('2024-01-09'), y: 68 },
        { x: new Date('2024-01-10'), y: 75 },
        { x: new Date('2024-01-11'), y: 71 },
        { x: new Date('2024-01-12'), y: 82 },
      ],
      color: '#688AE8',
    },
    {
      title: 'Site 2',
      type: 'area' as const,
      data: [
        { x: new Date('2024-01-01'), y: 30 },
        { x: new Date('2024-01-02'), y: 35 },
        { x: new Date('2024-01-03'), y: 42 },
        { x: new Date('2024-01-04'), y: 38 },
        { x: new Date('2024-01-05'), y: 45 },
        { x: new Date('2024-01-06'), y: 41 },
        { x: new Date('2024-01-07'), y: 50 },
        { x: new Date('2024-01-08'), y: 47 },
        { x: new Date('2024-01-09'), y: 52 },
        { x: new Date('2024-01-10'), y: 48 },
        { x: new Date('2024-01-11'), y: 55 },
        { x: new Date('2024-01-12'), y: 51 },
      ],
      color: '#C33D69',
    },
  ];

  const thresholdSeries = [
    {
      title: 'Performance goal',
      type: 'threshold' as const,
      y: 60,
      color: '#5F6B7A',
    },
  ];

  return (
    <Container
      header={
        <Header variant="h2">
          Network traffic
        </Header>
      }
    >
      <AreaChart
        height={300}
        series={[...series, ...thresholdSeries]}
        xScaleType="time"
        yScaleType="linear"
        xTitle="Day"
        yTitle=""
        stackedAreas
        hideFilter
        hideLegend={false}
        additionalFilters={
          <Box color="text-status-inactive" fontSize="body-s">
            Performance goal
          </Box>
        }
        ariaLabel="Network traffic area chart"
        ariaDescription="Area chart showing network traffic for Site 1 and Site 2 over time with a performance goal threshold"
        loadingText="Loading chart"
        errorText="Error loading data"
        empty={
          <Box textAlign="center" color="inherit">
            <b>No data available</b>
            <Box variant="p" color="inherit">
              There is no data available
            </Box>
          </Box>
        }
        i18nStrings={{
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'area chart',
          xAxisAriaRoleDescription: 'x axis',
          yAxisAriaRoleDescription: 'y axis',
        }}
      />
    </Container>
  );
}
