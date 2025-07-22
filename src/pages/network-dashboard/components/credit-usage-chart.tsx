// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import BarChart from '@cloudscape-design/components/bar-chart';

// Mock data for the bar chart
const creditUsageData = [
  { x: 'x1', y: 75 },
  { x: 'x2', y: 90 },
  { x: 'x3', y: 85 },
  { x: 'x4', y: 60 },
  { x: 'x5', y: 95 },
];

const series = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    data: creditUsageData,
    color: '#688AE8',
  },
];

export function CreditUsageChart() {
  return (
    <Container style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
      <Header variant="h3">Credit Usage</Header>
      <BarChart
        series={series}
        height={300}
        xDomain={creditUsageData.map(d => d.x)}
        yDomain={[0, 100]}
        xTitle="Day"
        yTitle=""
        legendTitle="Legend"
        statusType="finished"
        hideFilter
        hideLegend={false}
        ariaLabel="Credit usage over time"
        ariaDescription="Bar chart showing credit usage for Site 1 over time"
        i18nStrings={{
          filterLabel: 'Filter displayed data',
          filterPlaceholder: 'Filter data',
          filterSelectedAriaLabel: 'selected',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'bar chart',
          xAxisAriaRoleDescription: 'x axis',
          yAxisAriaRoleDescription: 'y axis',
        }}
        xScaleType="categorical"
        yTickFormatter={value => `${value}%`}
      />
    </Container>
  );
}
