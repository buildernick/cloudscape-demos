// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect } from 'react';

import AreaChart from '@cloudscape-design/components/area-chart';
import Box from '@cloudscape-design/components/box';

// Mock data for network traffic
const networkTrafficData = [
  { x: new Date('2024-01-01T00:00:00Z'), y1: 45, y2: 32 },
  { x: new Date('2024-01-01T04:00:00Z'), y1: 52, y2: 38 },
  { x: new Date('2024-01-01T08:00:00Z'), y1: 67, y2: 45 },
  { x: new Date('2024-01-01T12:00:00Z'), y1: 89, y2: 72 },
  { x: new Date('2024-01-01T16:00:00Z'), y1: 94, y2: 86 },
  { x: new Date('2024-01-01T20:00:00Z'), y1: 76, y2: 58 },
  { x: new Date('2024-01-02T00:00:00Z'), y1: 58, y2: 41 },
];

export function NetworkTrafficChart() {
  return (
    <AreaChart
      series={[
        {
          title: 'Site 1',
          type: 'area',
          data: networkTrafficData.map(point => ({ x: point.x, y: point.y1 })),
          color: '#0073bb',
        },
        {
          title: 'Site 2',
          type: 'area',
          data: networkTrafficData.map(point => ({ x: point.x, y: point.y2 })),
          color: '#037f0c',
        },
        {
          title: 'Performance Goal',
          type: 'line',
          data: networkTrafficData.map(point => ({ x: point.x, y: 80 })),
          color: '#d13212',
        },
      ]}
      xDomain={[new Date('2024-01-01T00:00:00Z'), new Date('2024-01-02T00:00:00Z')]}
      yDomain={[0, 100]}
      i18nStrings={{
        filterLabel: 'Filter displayed series',
        filterPlaceholder: 'Filter series',
        filterSelectedAriaLabel: 'selected',
        legendAriaLabel: 'Legend',
        chartAriaRoleDescription: 'area chart',
        xTickFormatter: e =>
          e
            .toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              hour12: false,
            })
            .split(',')
            .join('\n'),
        yTickFormatter: e => `${e}%`,
      }}
      ariaLabel="Network traffic area chart"
      errorText="Error loading data."
      height={300}
      loadingText="Loading chart data..."
      recoveryText="Retry"
      xScaleType="time"
      xTitle="Time"
      yTitle="Traffic (%)"
      empty={
        <Box textAlign="center" color="inherit">
          <b>No data available</b>
          <Box variant="p" color="inherit">
            There is no network traffic data available for the selected time range.
          </Box>
        </Box>
      }
      noMatch={
        <Box textAlign="center" color="inherit">
          <b>No matching data</b>
          <Box variant="p" color="inherit">
            There is no network traffic data matching the filter criteria.
          </Box>
        </Box>
      }
    />
  );
}
