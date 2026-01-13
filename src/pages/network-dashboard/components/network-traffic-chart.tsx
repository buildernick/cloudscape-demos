// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import AreaChart from '@cloudscape-design/components/area-chart';

// Mock data for the area chart
const networkTrafficData = [
  { x: new Date('2024-01-01'), y1: 20, y2: 15 },
  { x: new Date('2024-01-02'), y1: 25, y2: 18 },
  { x: new Date('2024-01-03'), y1: 22, y2: 20 },
  { x: new Date('2024-01-04'), y1: 28, y2: 22 },
  { x: new Date('2024-01-05'), y1: 30, y2: 25 },
  { x: new Date('2024-01-06'), y1: 35, y2: 28 },
  { x: new Date('2024-01-07'), y1: 40, y2: 32 },
  { x: new Date('2024-01-08'), y1: 38, y2: 30 },
  { x: new Date('2024-01-09'), y1: 42, y2: 35 },
  { x: new Date('2024-01-10'), y1: 45, y2: 38 },
  { x: new Date('2024-01-11'), y1: 48, y2: 40 },
  { x: new Date('2024-01-12'), y1: 50, y2: 42 },
];

const series = [
  {
    title: 'Site 1',
    type: 'area' as const,
    data: networkTrafficData.map(d => ({ x: d.x, y: d.y1 })),
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area' as const,
    data: networkTrafficData.map(d => ({ x: d.x, y: d.y2 })),
    color: '#C33D69',
  },
];

export function NetworkTrafficChart() {
  return (
    <Container className="chart-container" style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
      <Header variant="h3">Network traffic</Header>
      <AreaChart
        series={series}
        height={300}
        xTitle="Day"
        statusType="finished"
        hideFilter
        ariaLabel="Network traffic over time"
        xScaleType="time"
      />
    </Container>
  );
}
