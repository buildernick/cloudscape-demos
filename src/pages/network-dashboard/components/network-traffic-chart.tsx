// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import AreaChart from '@cloudscape-design/components/area-chart';
import Box from '@cloudscape-design/components/box';

const networkTrafficData = [
  { x: 'x1', y1: 120, y2: 80 },
  { x: 'x2', y1: 140, y2: 90 },
  { x: 'x3', y1: 130, y2: 100 },
  { x: 'x4', y1: 160, y2: 85 },
  { x: 'x5', y1: 170, y2: 95 },
  { x: 'x6', y1: 150, y2: 110 },
  { x: 'x7', y1: 180, y2: 105 },
  { x: 'x8', y1: 165, y2: 115 },
  { x: 'x9', y1: 145, y2: 90 },
  { x: 'x10', y1: 175, y2: 120 },
  { x: 'x11', y1: 155, y2: 100 },
  { x: 'x12', y1: 190, y2: 130 },
];

const series = [
  {
    type: 'area' as const,
    title: 'Site 1',
    data: networkTrafficData.map(item => ({ x: item.x, y: item.y1 })),
    color: '#688AE8',
  },
  {
    type: 'area' as const,
    title: 'Site 2',
    data: networkTrafficData.map(item => ({ x: item.x, y: item.y2 })),
    color: '#C33D69',
  },
];

export function NetworkTrafficChart() {
  return (
    <Container header={<Header variant="h2">Network traffic</Header>}>
      <AreaChart
        series={series}
        xDomain={networkTrafficData.map(item => item.x)}
        yDomain={[0, 200]}
        xScaleType="categorical"
        height={300}
        hideFilter={true}
        hideLegend={false}
        stackedAreas={false}
        xTitle="Day"
        yTitle=""
        ariaLabel="Network traffic chart"
        i18nStrings={{
          filterLabel: 'Filter displayed data',
          filterPlaceholder: 'Filter data',
          filterSelectedAriaLabel: 'selected',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'area chart',
          xAxisAriaRoleDescription: 'x axis',
          yAxisAriaRoleDescription: 'y axis',
        }}
        empty={
          <Box textAlign="center" color="inherit">
            <b>No data available</b>
            <Box variant="p" color="inherit">
              There is no data available
            </Box>
          </Box>
        }
        additionalFilters={
          <Box color="text-body-secondary" fontSize="body-s">
            Performance goal
          </Box>
        }
      />
    </Container>
  );
}
