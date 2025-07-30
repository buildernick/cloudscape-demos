// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import AreaChart from '@cloudscape-design/components/area-chart';
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
    chartAriaRoleDescription: 'area chart',
    xAxisAriaRoleDescription: 'x axis',
    yAxisAriaRoleDescription: 'y axis',
  },
};

// Sample data for the area chart
const networkTrafficData = [
  { x: 'x1', y1: 3, y2: 2 },
  { x: 'x2', y1: 3.5, y2: 2.5 },
  { x: 'x3', y1: 4, y2: 3 },
  { x: 'x4', y1: 4.2, y2: 3.8 },
  { x: 'x5', y1: 4.8, y2: 4.2 },
  { x: 'x6', y1: 5.2, y2: 4.8 },
  { x: 'x7', y1: 5.8, y2: 5.2 },
  { x: 'x8', y1: 6, y2: 5.5 },
  { x: 'x9', y1: 6.2, y2: 5.8 },
  { x: 'x10', y1: 5.8, y2: 5.2 },
  { x: 'x11', y1: 5.5, y2: 4.8 },
  { x: 'x12', y1: 5, y2: 4.2 },
];

const series = [
  {
    title: 'Site 1',
    type: 'area' as const,
    data: networkTrafficData.map(d => ({ x: d.x, y: d.y1 })),
    color: '#688AE8',
  },
  {
    title: 'Site 2', 
    type: 'area' as const,
    data: networkTrafficData.map(d => ({ x: d.x, y: d.y2 })),
    color: '#C33D69',
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    y: 4.5,
    color: '#5F6B7A',
  },
];

export function NetworkTrafficChart() {
  return (
    <Container>
      <Header variant="h2">Network traffic</Header>
      <AreaChart
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
        ariaLabel="Network traffic area chart"
        ariaDescription="Area chart showing network traffic data for Site 1 and Site 2 with performance goal threshold"
      />
    </Container>
  );
}
