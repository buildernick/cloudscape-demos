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
      <Box margin={{ bottom: 'm' }}>
        <Box variant="h3" color="text-label">
          Network traffic
        </Box>
      </Box>
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
          chartAriaRoleDescription: 'area chart',
          xTickFormatter: value => `x${value}`,
          yTickFormatter: value => `y${Math.round(value / 50)}`,
        }}
        ariaLabel="Network traffic area chart"
        height={300}
        hideFilter
        hideLegend={false}
        legendTitle="Legend"
        xTitle="Day"
        yTitle=""
        statusType="finished"
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
      <Box margin={{ top: 's' }}>
        <Box color="text-body-secondary" fontSize="body-s">
          <span style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '2px',
                  border: '1px solid #688AE8',
                  backgroundColor: 'rgba(104, 138, 232, 0.4)',
                }}
              ></span>
              Site 1
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '2px',
                  border: '1px solid #C33D69',
                  backgroundColor: 'rgba(195, 61, 105, 0.4)',
                }}
              ></span>
              Site 2
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ display: 'flex', gap: '2px' }}>
                <span
                  style={{
                    width: '6px',
                    height: '3px',
                    backgroundColor: '#5F6B7A',
                    borderRadius: '1px',
                  }}
                ></span>
                <span
                  style={{
                    width: '6px',
                    height: '3px',
                    backgroundColor: '#5F6B7A',
                    borderRadius: '1px',
                  }}
                ></span>
              </span>
              Performance goal
            </span>
          </span>
        </Box>
      </Box>
    </Container>
  );
}
