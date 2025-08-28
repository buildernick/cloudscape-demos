// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';

export function CreditUsageChart() {
  // Sample data for the bar chart
  const series = [
    {
      title: 'Site 1',
      type: 'bar' as const,
      data: [
        { x: 'x1', y: 80 },
        { x: 'x2', y: 120 },
        { x: 'x3', y: 95 },
        { x: 'x4', y: 60 },
        { x: 'x5', y: 105 },
      ],
      color: '#688AE8',
    },
  ];

  const thresholdSeries = [
    {
      title: 'Performance goal',
      type: 'threshold' as const,
      y: 90,
      color: '#5F6B7A',
    },
  ];

  return (
    <Container
      header={
        <Header variant="h2">
          Credit Usage
        </Header>
      }
    >
      <BarChart
        height={300}
        series={[...series, ...thresholdSeries]}
        xScaleType="categorical"
        yScaleType="linear"
        xTitle="Day"
        yTitle=""
        hideFilter
        hideLegend={false}
        additionalFilters={
          <Box color="text-status-inactive" fontSize="body-s">
            Performance goal
          </Box>
        }
        ariaLabel="Credit usage bar chart"
        ariaDescription="Bar chart showing credit usage for Site 1 over different time periods with a performance goal threshold"
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
          chartAriaRoleDescription: 'bar chart',
          xAxisAriaRoleDescription: 'x axis',
          yAxisAriaRoleDescription: 'y axis',
        }}
      />
    </Container>
  );
}
