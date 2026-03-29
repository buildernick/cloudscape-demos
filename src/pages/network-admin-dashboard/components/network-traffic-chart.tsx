// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import AreaChart from '@cloudscape-design/components/area-chart';
import Header from '@cloudscape-design/components/header';
import Box from '@cloudscape-design/components/box';

import { networkTrafficSeries, networkTrafficThreshold } from '../data/chart-data';

export function NetworkTrafficChart() {
  return (
    <AreaChart
      fitHeight={true}
      height={300}
      series={networkTrafficSeries}
      xScaleType="linear"
      xTitle="Day"
      yTitle="Network traffic"
      ariaLabel="Network traffic over time"
      ariaDescription="Area chart showing network traffic for two sites over time with performance goal threshold"
      hideFilter={true}
      hideLegend={false}
      legendTitle="Legend"
      xDomain={[1, 12]}
      yDomain={[0, 100]}
      horizontalMarkerValue={50}
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
        chartAriaRoleDescription: 'area chart',
        xAxisAriaRoleDescription: 'x axis',
        yAxisAriaRoleDescription: 'y axis',
      }}
    />
  );
}
