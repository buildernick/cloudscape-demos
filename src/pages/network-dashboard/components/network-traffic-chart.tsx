// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import AreaChart from '@cloudscape-design/components/area-chart';
import Box from '@cloudscape-design/components/box';

const networkTrafficData = [
  { x: 1, y1: 180, y2: 120 },
  { x: 2, y1: 190, y2: 140 },
  { x: 3, y1: 200, y2: 160 },
  { x: 4, y1: 210, y2: 180 },
  { x: 5, y1: 220, y2: 200 },
  { x: 6, y1: 240, y2: 220 },
  { x: 7, y1: 250, y2: 230 },
  { x: 8, y1: 260, y2: 240 },
  { x: 9, y1: 240, y2: 220 },
  { x: 10, y1: 230, y2: 200 },
  { x: 11, y1: 220, y2: 180 },
  { x: 12, y1: 200, y2: 160 },
];

export function NetworkTrafficChart() {
  return (
    <Container>
      <Header variant="h3">Network traffic</Header>
      <AreaChart
        series={[
          {
            title: 'Site 1',
            type: 'area',
            data: networkTrafficData.map(point => ({ x: point.x, y: point.y1 })),
            color: '#688AE8',
          },
          {
            title: 'Site 2',
            type: 'area',
            data: networkTrafficData.map(point => ({ x: point.x, y: point.y2 })),
            color: '#C33D69',
          },
        ]}
        xDomain={[1, 12]}
        yDomain={[0, 300]}
        i18nStrings={{
          filterLabel: 'Filter displayed data',
          filterPlaceholder: 'Filter data',
          filterSelectedAriaLabel: 'selected',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'line chart',
          xTickFormatter: (value) => `x${value}`,
          yTickFormatter: (value) => `y${Math.round(value / 50)}`,
        }}
        ariaLabel="Network traffic area chart"
        height={300}
        hideFilter
        hideLegend={false}
        additionalFilters={
          <Box color="text-body-secondary">
            <span style={{ fontSize: '14px', color: '#5F6B7A' }}>
              Performance goal: 
              <span style={{ 
                display: 'inline-block',
                width: '12px',
                height: '3px',
                backgroundColor: '#5F6B7A',
                marginLeft: '4px',
                marginRight: '2px',
                borderRadius: '1px'
              }}></span>
              <span style={{ 
                display: 'inline-block',
                width: '6px',
                height: '3px',
                backgroundColor: '#5F6B7A',
                marginLeft: '2px',
                borderRadius: '1px'
              }}></span>
            </span>
          </Box>
        }
        xTitle="Day"
        yTitle=""
        empty={
          <Box textAlign="center" color="inherit">
            <Box variant="strong" textAlign="center" color="inherit">
              No data available
            </Box>
            <Box variant="p" padding={{ bottom: 's' }} color="inherit">
              There is no data available
            </Box>
          </Box>
        }
        noMatch={
          <Box textAlign="center" color="inherit">
            <Box variant="strong" textAlign="center" color="inherit">
              No matching data
            </Box>
            <Box variant="p" padding={{ bottom: 's' }} color="inherit">
              There is no data that matches the filter criteria. Remove one or more filters to view data.
            </Box>
          </Box>
        }
      />
    </Container>
  );
}
