// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import BarChart from '@cloudscape-design/components/bar-chart';
import Header from '@cloudscape-design/components/header';
import Box from '@cloudscape-design/components/box';

import { creditUsageSeries, creditUsageThreshold } from '../data/chart-data';

export function CreditUsageChart() {
  return (
    <BarChart
      fitHeight={true}
      height={300}
      series={creditUsageSeries}
      xScaleType="categorical"
      xTitle="Day"
      yTitle="Credit Usage"
      ariaLabel="Credit usage over time"
      ariaDescription="Bar chart showing credit usage over time with performance goal threshold"
      hideFilter={true}
      hideLegend={false}
      legendTitle="Legend"
      horizontalMarkerValue={180}
      horizontalMarkerLabel="Performance goal"
      loadingText="Loading chart"
      errorText="Error loading data."
      recoveryText="Retry"
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
      i18nStrings={{
        filterLabel: 'Filter displayed data',
        filterPlaceholder: 'Filter data',
        filterSelectedAriaLabel: 'selected',
        legendAriaLabel: 'Legend',
        chartAriaRoleDescription: 'bar chart',
        xAxisAriaRoleDescription: 'x axis',
        yAxisAriaRoleDescription: 'y axis',
        yTickFormatter: value => value.toString(),
      }}
    />
  );
}
