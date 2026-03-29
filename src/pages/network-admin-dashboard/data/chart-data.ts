// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { AreaChartProps } from '@cloudscape-design/components/area-chart';
import { BarChartProps } from '@cloudscape-design/components/bar-chart';

// Network Traffic Area Chart Data
const networkTrafficRawData = [
  { day: 1, site1: 45, site2: 30 },
  { day: 2, site1: 52, site2: 35 },
  { day: 3, site1: 48, site2: 42 },
  { day: 4, site1: 61, site2: 38 },
  { day: 5, site1: 55, site2: 45 },
  { day: 6, site1: 67, site2: 52 },
  { day: 7, site1: 71, site2: 48 },
  { day: 8, site1: 64, site2: 55 },
  { day: 9, site1: 58, site2: 42 },
  { day: 10, site1: 62, site2: 47 },
  { day: 11, site1: 69, site2: 51 },
  { day: 12, site1: 73, site2: 49 },
];

export const networkTrafficSeries: AreaChartProps<number>['series'] = [
  {
    title: 'Site 1',
    type: 'area',
    data: networkTrafficRawData.map(item => ({ x: item.day, y: item.site1 })),
    valueFormatter: value => `${value}%`,
  },
  {
    title: 'Site 2',
    type: 'area',
    data: networkTrafficRawData.map(item => ({ x: item.day, y: item.site2 })),
    valueFormatter: value => `${value}%`,
  },
];

export const networkTrafficThreshold = [
  {
    label: 'Performance goal',
    value: 50,
  },
];

// Credit Usage Bar Chart Data
const creditUsageRawData = [
  { day: 1, usage: 183 },
  { day: 2, usage: 257 },
  { day: 3, usage: 213 },
  { day: 4, usage: 122 },
  { day: 5, usage: 210 },
];

export const creditUsageSeries: BarChartProps<number>['series'] = [
  {
    title: 'Site 1',
    type: 'bar',
    data: creditUsageRawData.map(item => ({ x: item.day, y: item.usage })),
    valueFormatter: value => `${value} credits`,
  },
];

export const creditUsageThreshold = [
  {
    label: 'Performance goal',
    value: 180,
  },
];
