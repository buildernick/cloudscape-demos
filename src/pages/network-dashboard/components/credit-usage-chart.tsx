// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';

const creditUsageData = [
  { x: 'x1', y: 75 },
  { x: 'x2', y: 120 },
  { x: 'x3', y: 95 },
  { x: 'x4', y: 60 },
  { x: 'x5', y: 110 },
];

const series = [
  {
    type: 'bar' as const,
    title: 'Site 1',
    data: creditUsageData,
    color: '#688AE8',
  },
];

export function CreditUsageChart() {
  return (
    <Container
      header={
        <Header variant="h2">
          Credit Usage
        </Header>
      }
    >
      <BarChart
        series={series}
        xDomain={creditUsageData.map(item => item.x)}
        yDomain={[0, 140]}
        xScaleType="categorical"
        height={300}
        hideFilter={true}
        hideLegend={false}
        xTitle="Day"
        yTitle=""
        ariaLabel="Credit usage chart"
        i18nStrings={{
          filterLabel: 'Filter displayed data',
          filterPlaceholder: 'Filter data',
          filterSelectedAriaLabel: 'selected',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'bar chart',
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
