// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useMemo } from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import AreaChart from '@cloudscape-design/components/area-chart';
import Box from '@cloudscape-design/components/box';

// Sample data for network traffic
const networkTrafficData = [
  { x: new Date('2024-01-01'), y1: 120, y2: 80 },
  { x: new Date('2024-01-02'), y1: 140, y2: 90 },
  { x: new Date('2024-01-03'), y1: 160, y2: 110 },
  { x: new Date('2024-01-04'), y1: 145, y2: 105 },
  { x: new Date('2024-01-05'), y1: 155, y2: 115 },
  { x: new Date('2024-01-06'), y1: 180, y2: 130 },
  { x: new Date('2024-01-07'), y1: 170, y2: 125 },
  { x: new Date('2024-01-08'), y1: 160, y2: 120 },
  { x: new Date('2024-01-09'), y1: 175, y2: 135 },
  { x: new Date('2024-01-10'), y1: 190, y2: 140 },
  { x: new Date('2024-01-11'), y1: 185, y2: 145 },
  { x: new Date('2024-01-12'), y1: 195, y2: 150 },
];

export function NetworkTrafficChart() {
  return (
    <Container
      header={
        <Header variant="h2" description="Monitor network traffic across your infrastructure">
          Network traffic
        </Header>
      }
    >
      <AreaChart
        series={[
          {
            title: 'Site 1',
            type: 'area',
            data: networkTrafficData.map(item => ({ x: item.x, y: item.y1 })),
            color: '#ec7211',
          },
          {
            title: 'Site 2',
            type: 'area',
            data: networkTrafficData.map(item => ({ x: item.x, y: item.y2 })),
            color: '#5294cf',
          },
        ]}
        xDomain={[networkTrafficData[0].x, networkTrafficData[networkTrafficData.length - 1].x]}
        yDomain={[0, 200]}
        i18nStrings={{
          filterLabel: 'Filter displayed data',
          filterPlaceholder: 'Filter data',
          filterSelectedAriaLabel: 'selected',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'area chart',
          xTickFormatter: (value: Date) =>
            value.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            }),
          yTickFormatter: (value: number) => `${value}`,
        }}
        ariaLabel="Network traffic area chart"
        errorText="Error loading data."
        height={300}
        loadingText="Loading chart"
        recoveryText="Retry"
        xScaleType="time"
        xTitle="Day"
        yTitle="y6"
        empty={
          <Box textAlign="center" color="inherit">
            <b>No data available</b>
            <Box variant="p" color="inherit">
              There is no data available
            </Box>
          </Box>
        }
        noMatch={
          <Box textAlign="center" color="inherit">
            <b>No matching data</b>
            <Box variant="p" color="inherit">
              There is no matching data to display
            </Box>
          </Box>
        }
      />

      <Box margin={{ top: 's' }} fontSize="body-s" color="text-body-secondary">
        <Box display="inline" marginRight="m">
          <Box display="inline" color="#ec7211">
            ●
          </Box>{' '}
          Site 1
        </Box>
        <Box display="inline" marginRight="m">
          <Box display="inline" color="#5294cf">
            ●
          </Box>{' '}
          Site 2
        </Box>
        <Box display="inline">
          <Box display="inline" color="text-body-secondary">
            ---
          </Box>{' '}
          Performance goal
        </Box>
      </Box>
    </Container>
  );
}
