// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Box from '@cloudscape-design/components/box';

// Sample data for network traffic area chart
const networkTrafficData = [
  { x: 'x1', y1: 60, y2: 40 },
  { x: 'x2', y1: 65, y2: 50 },
  { x: 'x3', y1: 70, y2: 55 },
  { x: 'x4', y1: 75, y2: 60 },
  { x: 'x5', y1: 80, y2: 65 },
  { x: 'x6', y1: 85, y2: 72 },
  { x: 'x7', y1: 90, y2: 78 },
  { x: 'x8', y1: 85, y2: 75 },
  { x: 'x9', y1: 80, y2: 70 },
  { x: 'x10', y1: 92, y2: 82 },
  { x: 'x11', y1: 95, y2: 85 },
  { x: 'x12', y1: 88, y2: 78 },
];

// Sample data for credit usage bar chart
const creditUsageData = [
  { x: 'x1', y: 65 },
  { x: 'x2', y: 90 },
  { x: 'x3', y: 75 },
  { x: 'x4', y: 42 },
  { x: 'x5', y: 78 },
];

const numberFormatter = (value: number) => {
  if (Math.abs(value) >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  return value.toString();
};

export function NetworkCharts() {
  return (
    <Grid
      gridDefinition={[
        { colspan: { default: 12, xs: 12, s: 12, m: 6 } },
        { colspan: { default: 12, xs: 12, s: 12, m: 6 } },
      ]}
    >
      <Container
        header={
          <Header variant="h2" description="">
            Network traffic
          </Header>
        }
      >
        <AreaChart
          series={[
            {
              title: 'Site 1',
              type: 'area',
              data: networkTrafficData.map(d => ({ x: d.x, y: d.y1 })),
              color: '#688AE8',
            },
            {
              title: 'Site 2',
              type: 'area',
              data: networkTrafficData.map(d => ({ x: d.x, y: d.y2 })),
              color: '#C33D69',
            },
          ]}
          xDomain={networkTrafficData.map(d => d.x)}
          yDomain={[0, 200]}
          xScaleType="categorical"
          i18nStrings={{
            filterLabel: 'Filter displayed data',
            filterPlaceholder: 'Filter data',
            filterSelectedAriaLabel: 'selected',
            detailPopoverDismissAriaLabel: 'Dismiss',
            legendAriaLabel: 'Legend',
            chartAriaRoleDescription: 'area chart',
            xAxisAriaRoleDescription: 'x axis',
            yAxisAriaRoleDescription: 'y axis',
            xTickFormatter: x => x?.toString() || '',
            yTickFormatter: numberFormatter,
          }}
          ariaLabel="Network traffic area chart"
          ariaDescription="Area chart showing network traffic for Site 1 and Site 2 over time"
          height={300}
          xTitle="Day"
          yTitle=""
          hideFilter
          hideLegend={false}
          statusType="finished"
          loadingText="Loading chart..."
          errorText="Error loading data."
          recoveryText="Retry"
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
                There is no data matching the filter criteria
              </Box>
            </Box>
          }
        />
      </Container>

      <Container
        header={
          <Header variant="h2" description="">
            Credit Usage
          </Header>
        }
      >
        <BarChart
          series={[
            {
              title: 'Site 1',
              type: 'bar',
              data: creditUsageData,
              color: '#688AE8',
            },
          ]}
          xDomain={creditUsageData.map(d => d.x)}
          yDomain={[0, 200]}
          xScaleType="categorical"
          i18nStrings={{
            filterLabel: 'Filter displayed data',
            filterPlaceholder: 'Filter data',
            filterSelectedAriaLabel: 'selected',
            detailPopoverDismissAriaLabel: 'Dismiss',
            legendAriaLabel: 'Legend',
            chartAriaRoleDescription: 'bar chart',
            xAxisAriaRoleDescription: 'x axis',
            yAxisAriaRoleDescription: 'y axis',
            xTickFormatter: x => x?.toString() || '',
            yTickFormatter: numberFormatter,
          }}
          ariaLabel="Credit usage bar chart"
          ariaDescription="Bar chart showing credit usage over time"
          height={300}
          xTitle="Day"
          yTitle=""
          hideFilter
          hideLegend={false}
          statusType="finished"
          loadingText="Loading chart..."
          errorText="Error loading data."
          recoveryText="Retry"
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
                There is no data matching the filter criteria
              </Box>
            </Box>
          }
        />
      </Container>
    </Grid>
  );
}
