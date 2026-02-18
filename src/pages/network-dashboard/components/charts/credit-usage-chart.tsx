// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';

// Mock data for credit usage
const creditUsageData = [
  { x: 'Day 1', y: 145 },
  { x: 'Day 2', y: 167 },
  { x: 'Day 3', y: 132 },
  { x: 'Day 4', y: 189 },
  { x: 'Day 5', y: 201 },
  { x: 'Day 6', y: 156 },
  { x: 'Day 7', y: 178 },
];

const performanceGoalData = [
  { x: 'Day 1', y: 200 },
  { x: 'Day 2', y: 200 },
  { x: 'Day 3', y: 200 },
  { x: 'Day 4', y: 200 },
  { x: 'Day 5', y: 200 },
  { x: 'Day 6', y: 200 },
  { x: 'Day 7', y: 200 },
];

export function CreditUsageChart() {
  return (
    <BarChart
      series={[
        {
          title: 'Credit Usage',
          type: 'bar',
          data: creditUsageData,
          color: '#0073bb',
        },
        {
          title: 'Performance Goal',
          type: 'line',
          data: performanceGoalData,
          color: '#d13212',
        },
      ]}
      xDomain={creditUsageData.map(d => d.x)}
      yDomain={[0, 250]}
      i18nStrings={{
        filterLabel: 'Filter displayed series',
        filterPlaceholder: 'Filter series',
        filterSelectedAriaLabel: 'selected',
        legendAriaLabel: 'Legend',
        chartAriaRoleDescription: 'bar chart',
        xTickFormatter: e => e,
        yTickFormatter: e => `${e} credits`,
      }}
      ariaLabel="Credit usage bar chart"
      errorText="Error loading data."
      height={300}
      loadingText="Loading chart data..."
      recoveryText="Retry"
      xScaleType="categorical"
      xTitle="Days"
      yTitle="Credits"
      empty={
        <Box textAlign="center" color="inherit">
          <b>No data available</b>
          <Box variant="p" color="inherit">
            There is no credit usage data available for the selected time range.
          </Box>
        </Box>
      }
      noMatch={
        <Box textAlign="center" color="inherit">
          <b>No matching data</b>
          <Box variant="p" color="inherit">
            There is no credit usage data matching the filter criteria.
          </Box>
        </Box>
      }
    />
  );
}
