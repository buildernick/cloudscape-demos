// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Header from '@cloudscape-design/components/header';
import AreaChart from '@cloudscape-design/components/area-chart';
import Box from '@cloudscape-design/components/box';

import { WidgetConfig } from '../interfaces';

// Sample data for the area chart matching the Figma design
const networkTrafficData = [
  { x: new Date('2023-01-01'), y1: 45, y2: 35 },
  { x: new Date('2023-01-02'), y1: 38, y2: 42 },
  { x: new Date('2023-01-03'), y1: 52, y2: 48 },
  { x: new Date('2023-01-04'), y1: 61, y2: 55 },
  { x: new Date('2023-01-05'), y1: 58, y2: 62 },
  { x: new Date('2023-01-06'), y1: 65, y2: 58 },
  { x: new Date('2023-01-07'), y1: 72, y2: 68 },
  { x: new Date('2023-01-08'), y1: 68, y2: 72 },
  { x: new Date('2023-01-09'), y1: 75, y2: 78 },
  { x: new Date('2023-01-10'), y1: 82, y2: 75 },
  { x: new Date('2023-01-11'), y1: 78, y2: 82 },
  { x: new Date('2023-01-12'), y1: 85, y2: 88 },
];

const series = [
  {
    title: 'Site 1',
    type: 'area' as const,
    data: networkTrafficData.map(point => ({ x: point.x, y: point.y1 })),
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area' as const,
    data: networkTrafficData.map(point => ({ x: point.x, y: point.y2 })),
    color: '#C33D69',
  },
];

function NetworkTrafficHeader() {
  return <Header variant="h2">Network traffic</Header>;
}

function NetworkTrafficContent() {
  return (
    <AreaChart
      series={series}
      i18nStrings={{
        filterLabel: 'Filter displayed data',
        filterPlaceholder: 'Filter data',
        filterSelectedAriaLabel: 'selected',
        detailPopoverDismissAriaLabel: 'Dismiss',
        legendAriaLabel: 'Legend',
        chartAriaRoleDescription: 'area chart',
        xTickFormatter: e => new Date(e).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        yTickFormatter: e => e.toString(),
      }}
      ariaLabel="Network traffic area chart"
      errorText="Error loading data."
      height={300}
      loadingText="Loading chart data..."
      recoveryText="Retry"
      xScaleType="time"
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

function NetworkTrafficFooter() {
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
        <Box marginRight="xs" marginLeft="s">
          <Box
            display="inline-block"
            width="14px"
            height="14px"
            borderRadius="2px"
            backgroundColor="#C33D69"
            marginRight="xxs"
          />
          Site 2
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

export const networkTrafficChart: WidgetConfig = {
  definition: { defaultRowSpan: 4, defaultColumnSpan: 2, minRowSpan: 3 },
  data: {
    icon: 'lineChart',
    title: 'Network traffic',
    description: 'Network traffic monitoring with area chart visualization',
    header: NetworkTrafficHeader,
    content: NetworkTrafficContent,
    footer: NetworkTrafficFooter,
    staticMinHeight: 400,
  },
};
