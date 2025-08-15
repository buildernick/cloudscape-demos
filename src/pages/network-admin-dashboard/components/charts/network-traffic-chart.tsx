// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import LineChart from '@cloudscape-design/components/line-chart';

const networkTrafficData = [
  { x: new Date('2024-01-01'), y1: 120, y2: 80 },
  { x: new Date('2024-01-02'), y1: 140, y2: 90 },
  { x: new Date('2024-01-03'), y1: 160, y2: 110 },
  { x: new Date('2024-01-04'), y1: 180, y2: 130 },
  { x: new Date('2024-01-05'), y1: 200, y2: 150 },
  { x: new Date('2024-01-06'), y1: 220, y2: 170 },
  { x: new Date('2024-01-07'), y1: 190, y2: 140 },
  { x: new Date('2024-01-08'), y1: 210, y2: 160 },
  { x: new Date('2024-01-09'), y1: 240, y2: 180 },
  { x: new Date('2024-01-10'), y1: 260, y2: 200 },
  { x: new Date('2024-01-11'), y1: 230, y2: 170 },
  { x: new Date('2024-01-12'), y1: 250, y2: 190 },
];

export function NetworkTrafficChart() {
  return (
    <Container
      header={<Header variant="h2">Network traffic</Header>}
    >
      <LineChart
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
        xDomain={[networkTrafficData[0].x, networkTrafficData[networkTrafficData.length - 1].x]}
        yDomain={[0, 300]}
        xTitle="Day"
        yTitle=""
        height={300}
        hideFilter
        hideLegend={false}
        xScaleType="time"
        statusType="finished"
        loadingText="Loading chart"
        errorText="Error loading data"
        recoveryText="Retry"
        ariaLabel="Network traffic over time showing data for Site 1 and Site 2"
        ariaDescription="A chart displaying network traffic patterns across two sites over a 12-day period. Site 1 shows higher traffic volumes compared to Site 2. Use arrow keys to navigate through data points. Press Tab to access the data table below for detailed values."
        i18nStrings={{
          legendAriaLabel: 'Chart legend showing data series',
          chartAriaRoleDescription: 'Interactive area chart',
          xAxisAriaRoleDescription: 'Time axis showing days',
          yAxisAriaRoleDescription: 'Traffic volume axis',
          xTickFormatter: (e) => e.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }),
          yTickFormatter: (e) => e.toString(),
        }}
        detailPopoverSize="large"
        emphasizeBaselineAxis={true}
      />
    </Container>
  );
}
