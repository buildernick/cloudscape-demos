// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Header from '@cloudscape-design/components/header';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';

import { WidgetConfig } from '../interfaces';

// Sample data for the bar chart matching the Figma design
const creditUsageData = [
  { x: 'x1', y: 75 },
  { x: 'x2', y: 100 },
  { x: 'x3', y: 85 },
  { x: 'x4', y: 45 },
  { x: 'x5', y: 80 },
];

const series = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    data: creditUsageData,
    color: '#688AE8',
  },
];

function CreditUsageHeader() {
  return <Header variant="h2">Credit Usage</Header>;
}

function CreditUsageContent() {
  return (
    <BarChart
      series={series}
      i18nStrings={{
        filterLabel: 'Filter displayed data',
        filterPlaceholder: 'Filter data',
        filterSelectedAriaLabel: 'selected',
        detailPopoverDismissAriaLabel: 'Dismiss',
        legendAriaLabel: 'Legend',
        chartAriaRoleDescription: 'bar chart',
        xTickFormatter: e => e.toString(),
        yTickFormatter: e => e.toString(),
      }}
      ariaLabel="Credit usage bar chart"
      errorText="Error loading data."
      height={300}
      loadingText="Loading chart data..."
      recoveryText="Retry"
      xScaleType="categorical"
      xTitle="Day"
      yTitle=""
      empty={
        <Box textAlign="center" color="inherit">
          <b>No data</b>
          <Box variant="p" color="inherit">
            There is no data to display.
          </Box>
        </Box>
      }
      noMatch={
        <Box textAlign="center" color="inherit">
          <b>No matching data</b>
          <Box variant="p" color="inherit">
            There is no data matching the filter criteria.
          </Box>
        </Box>
      }
    />
  );
}

function CreditUsageFooter() {
  return (
    <Box>
      <Box display="flex" alignItems="center" fontSize="body-s" color="text-status-inactive">
        <Box marginRight="xs">
          <Box
            display="inline-block"
            width="14px"
            height="14px"
            borderRadius="2px"
            backgroundColor="#688AE8"
            marginRight="xxs"
          />
          Site 1
        </Box>
        <Box marginLeft="s">
          <Box
            display="inline-block"
            width="12px"
            height="3px"
            marginRight="xxs"
            style={{
              background:
                'repeating-linear-gradient(to right, #5F6B7A 0, #5F6B7A 3px, transparent 3px, transparent 6px)',
            }}
          />
          Performance goal
        </Box>
      </Box>
    </Box>
  );
}

export const creditUsageChart: WidgetConfig = {
  definition: { defaultRowSpan: 4, defaultColumnSpan: 2, minRowSpan: 3 },
  data: {
    icon: 'barChart',
    title: 'Credit Usage',
    description: 'Credit usage monitoring with bar chart visualization',
    header: CreditUsageHeader,
    content: CreditUsageContent,
    footer: CreditUsageFooter,
    staticMinHeight: 400,
  },
};
