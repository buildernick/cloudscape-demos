// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useMemo } from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';

// Sample data for credit usage
const creditUsageData = [
  { x: 'x1', y: 45 },
  { x: 'x2', y: 65 },
  { x: 'x3', y: 55 },
  { x: 'x4', y: 35 },
  { x: 'x5', y: 60 },
];

export function CreditUsageChart() {
  return (
    <Container
      header={
        <Header variant="h2" description="Track your credit consumption and performance goals">
          Credit Usage
        </Header>
      }
    >
      <BarChart
        series={[
          {
            title: 'Site 1',
            type: 'bar',
            data: creditUsageData,
            color: '#5294cf',
          },
        ]}
        xDomain={creditUsageData.map(item => item.x)}
        yDomain={[0, 70]}
        i18nStrings={{
          filterLabel: 'Filter displayed data',
          filterPlaceholder: 'Filter data',
          filterSelectedAriaLabel: 'selected',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'bar chart',
          xTickFormatter: (value: string) => value,
          yTickFormatter: (value: number) => `y${value}`,
        }}
        ariaLabel="Credit usage bar chart"
        errorText="Error loading data."
        height={300}
        loadingText="Loading chart"
        recoveryText="Retry"
        xScaleType="categorical"
        xTitle="Day"
        yTitle="y6"
        empty={
          <Box textAlign="center" color="inherit">
            <b>No data available</b>
            <Box variant="p" color="inherit">
              There is no data available
            </Box>
          </Box>
        }
        noMatch={
          <Box textAlign="center" color="inherit">
            <b>No matching data</b>
            <Box variant="p" color="inherit">
              There is no matching data to display
            </Box>
          </Box>
        }
      />

      <Box margin={{ top: 's' }} fontSize="body-s" color="text-body-secondary">
        <Box display="inline" marginRight="m">
          <Box display="inline" color="#5294cf">
            ●
          </Box>{' '}
          Site 1
        </Box>
        <Box display="inline">
          <Box display="inline" color="text-body-secondary">
            ---
          </Box>{' '}
          Performance goal
        </Box>
      </Box>
    </Container>
  );
}
