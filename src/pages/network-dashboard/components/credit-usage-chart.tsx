// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import BarChart from '@cloudscape-design/components/bar-chart';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';

const creditUsageData = [
  { day: '#1', site1: 850, perfGoal: 900 },
  { day: '#2', site1: 1200, perfGoal: 900 },
  { day: '#3', site1: 950, perfGoal: 900 },
  { day: '#4', site1: 650, perfGoal: 900 },
  { day: '#5', site1: 1000, perfGoal: 900 },
];

const series = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    data: creditUsageData.map(d => ({ x: d.day, y: d.site1 })),
    valueFormatter: (value: number) => `${value.toLocaleString()} credits`,
    color: '#5294cf',
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    data: creditUsageData.map(d => ({ x: d.day, y: d.perfGoal })),
    valueFormatter: (value: number) => `${value.toLocaleString()} credits`,
    color: '#000000',
  },
];

export default function CreditUsageChart() {
  return (
    <Container header={<Header variant="h2">Credit Usage</Header>}>
      <BarChart
        series={series}
        xDomain={creditUsageData.map(d => d.day)}
        yDomain={[0, 1400]}
        xTitle="Day"
        yTitle=""
        height={280}
        fitHeight={false}
        hideFilter
        hideLegend={false}
        statusType="finished"
        ariaLabel="Credit usage bar chart"
        i18nStrings={{
          filterLabel: 'Filter displayed data',
          filterPlaceholder: 'Filter data',
          filterSelectedAriaLabel: 'selected',
          detailPopoverDismissAriaLabel: 'Dismiss',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'bar chart',
          xAxisAriaRoleDescription: 'x axis',
          yAxisAriaRoleDescription: 'y axis',
        }}
      />
    </Container>
  );
}
