// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import BarChart from '@cloudscape-design/components/bar-chart';

const creditUsageData = [
  { x: 'x1', y: 75 },
  { x: 'x2', y: 100 },
  { x: 'x3', y: 85 },
  { x: 'x4', y: 45 },
  { x: 'x5', y: 90 },
];

export function CreditUsageChart() {
  return (
    <Container
      header={<Header variant="h2">Credit Usage</Header>}
    >
      <BarChart
        series={[
          {
            title: 'Site 1',
            type: 'bar',
            data: creditUsageData,
            color: '#688AE8',
          },
        ]}
        xDomain={creditUsageData.map(d => d.x)}
        yDomain={[0, 120]}
        xTitle="Day"
        yTitle=""
        height={300}
        hideFilter
        hideLegend={false}
        horizontalBars={false}
        statusType="finished"
        loadingText="Loading chart"
        errorText="Error loading data"
        recoveryText="Retry"
        ariaLabel="Credit usage over time showing data for Site 1"
        ariaDescription="A bar chart displaying credit usage patterns across 5 time periods. Shows varying usage levels with peak usage at x2."
        i18nStrings={{
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'bar chart',
          xTickFormatter: (e) => e,
          yTickFormatter: (e) => e.toString(),
        }}
      />
    </Container>
  );
}
