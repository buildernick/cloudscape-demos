// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import LineChart from '@cloudscape-design/components/line-chart';

interface ChartData {
  x: number | string;
  y: number;
}

interface ChartSeries {
  title: string;
  type: string;
  data: ChartData[];
  valueFormatter?: (value: number) => string;
  color?: string;
}

interface DynamicChartProps {
  title: string;
  chartType: string;
  timeRange: string;
  series: ChartSeries[];
  yDomain?: [number, number];
  xDomain?: any[];
  unit?: string;
}

const generateDataForTimeRange = (timeRange: string, baseData: any[], multiplier: number = 1) => {
  const now = new Date();
  const data: ChartData[] = [];

  switch (timeRange) {
    case 'last24h':
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        data.push({
          x: i,
          y: Math.floor((Math.random() * 1000 + 2000) * multiplier),
        });
      }
      break;
    case 'lastWeek':
      for (let i = 6; i >= 0; i--) {
        const day = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        data.push({
          x: i + 1,
          y: Math.floor((Math.random() * 1500 + 2500) * multiplier),
        });
      }
      break;
    case 'lastMonth':
      for (let i = 29; i >= 0; i--) {
        data.push({
          x: 30 - i,
          y: Math.floor((Math.random() * 2000 + 3000) * multiplier),
        });
      }
      break;
    case 'last3Months':
      for (let i = 11; i >= 0; i--) {
        data.push({
          x: 12 - i,
          y: Math.floor((Math.random() * 2500 + 3500) * multiplier),
        });
      }
      break;
    case 'last6Months':
      for (let i = 5; i >= 0; i--) {
        data.push({
          x: 6 - i,
          y: Math.floor((Math.random() * 3000 + 4000) * multiplier),
        });
      }
      break;
    case 'lastYear':
      for (let i = 11; i >= 0; i--) {
        data.push({
          x: 12 - i,
          y: Math.floor((Math.random() * 3500 + 4500) * multiplier),
        });
      }
      break;
    default:
      return baseData;
  }

  return data;
};

const getTimeRangeLabel = (timeRange: string): string => {
  switch (timeRange) {
    case 'last24h':
      return 'Hour';
    case 'lastWeek':
      return 'Day';
    case 'lastMonth':
      return 'Day';
    case 'last3Months':
      return 'Week';
    case 'last6Months':
      return 'Month';
    case 'lastYear':
      return 'Month';
    default:
      return 'Time';
  }
};

export default function DynamicChart({
  title,
  chartType,
  timeRange,
  series,
  yDomain,
  xDomain,
  unit = '',
}: DynamicChartProps) {
  const dynamicSeries = series.map((s, index) => ({
    ...s,
    data: generateDataForTimeRange(timeRange, s.data, index === 0 ? 1 : 0.8),
    valueFormatter: (value: number) => (value != null ? `${value.toLocaleString()} ${unit}` : ''),
  }));

  const xTitle = getTimeRangeLabel(timeRange);
  const maxY = Math.max(...dynamicSeries.flatMap(s => s.data.map(d => d.y))) * 1.1;
  const minX = Math.min(...dynamicSeries.flatMap(s => s.data.map(d => Number(d.x))));
  const maxX = Math.max(...dynamicSeries.flatMap(s => s.data.map(d => Number(d.x))));

  const chartProps = {
    series: dynamicSeries,
    xDomain: xDomain || [minX, maxX],
    yDomain: yDomain || [0, maxY],
    xTitle,
    yTitle: '',
    height: 280,
    fitHeight: false,
    hideFilter: true,
    hideLegend: false,
    statusType: 'finished' as const,
    ariaLabel: `${title} ${chartType} chart`,
    i18nStrings: {
      filterLabel: 'Filter displayed data',
      filterPlaceholder: 'Filter data',
      filterSelectedAriaLabel: 'selected',
      detailPopoverDismissAriaLabel: 'Dismiss',
      legendAriaLabel: 'Legend',
      chartAriaRoleDescription: `${chartType} chart`,
      xAxisAriaRoleDescription: 'x axis',
      yAxisAriaRoleDescription: 'y axis',
    },
  };

  const renderChart = () => {
    switch (chartType) {
      case 'area':
        return <AreaChart {...chartProps} />;
      case 'line':
        return <LineChart {...chartProps} />;
      case 'bar':
        return <BarChart {...chartProps} />;
      default:
        return <AreaChart {...chartProps} />;
    }
  };

  return <Container header={<Header variant="h2">{title}</Header>}>{renderChart()}</Container>;
}
