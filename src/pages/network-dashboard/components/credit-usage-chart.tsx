// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';

const commonChartProps = {
  loadingText: 'Loading chart',
  errorText: 'Error loading data.',
  recoveryText: 'Retry',
  empty: (
    <Box textAlign="center" color="inherit">
      <b>No data available</b>
      <Box variant="p" color="inherit">
        There is no data available
      </Box>
    </Box>
  ),
  noMatch: (
    <Box textAlign="center" color="inherit">
      <b>No matching data</b>
      <Box variant="p" color="inherit">
        There is no matching data to display
      </Box>
    </Box>
  ),
  i18nStrings: {
    filterLabel: 'Filter displayed data',
    filterPlaceholder: 'Filter data',
    filterSelectedAriaLabel: 'selected',
    legendAriaLabel: 'Legend',
    chartAriaRoleDescription: 'bar chart',
    xAxisAriaRoleDescription: 'x axis',
    yAxisAriaRoleDescription: 'y axis',
  },
};

// Sample data for the bar chart
const creditUsageData = [
  { x: 'x1', y: 4 },
  { x: 'x2', y: 6 },
  { x: 'x3', y: 5.5 },
  { x: 'x4', y: 3 },
  { x: 'x5', y: 5.2 },
];

const series = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    data: creditUsageData,
    color: '#688AE8',
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    y: 4.5,
    color: '#5F6B7A',
  },
];

export function CreditUsageChart() {
  return (
    <Container>
      <Header variant="h2">Credit Usage</Header>
      <BarChart
        {...commonChartProps}
        height={300}
        series={series}
        xTitle="Day"
        yTitle=""
        hideFilter
        hideLegend={false}
        stackedBars={false}
        horizontalBars={false}
        fitHeight={false}
        ariaLabel="Credit usage bar chart"
        ariaDescription="Bar chart showing credit usage data with performance goal threshold"
      />
    </Container>
  );
}
