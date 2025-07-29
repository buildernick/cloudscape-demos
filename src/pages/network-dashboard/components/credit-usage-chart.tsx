// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';

const creditUsageData = [
  { x: 'x1', y: 180 },
  { x: 'x2', y: 250 },
  { x: 'x3', y: 210 },
  { x: 'x4', y: 120 },
  { x: 'x5', y: 200 },
];

export function CreditUsageChart() {
  return (
    <Container>
      <Header variant="h3">Credit Usage</Header>
      <BarChart
        series={[
          {
            title: 'Site 1',
            type: 'bar',
            data: creditUsageData,
            color: '#688AE8',
          },
        ]}
        i18nStrings={{
          filterLabel: 'Filter displayed data',
          filterPlaceholder: 'Filter data',
          filterSelectedAriaLabel: 'selected',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'bar chart',
          xTickFormatter: (value) => value.toString(),
          yTickFormatter: (value) => `y${Math.round(value / 50)}`,
        }}
        ariaLabel="Credit usage bar chart"
        height={300}
        hideFilter
        hideLegend={false}
        additionalFilters={
          <Box color="text-body-secondary">
            <span style={{ fontSize: '14px', color: '#5F6B7A' }}>
              Performance goal: 
              <span style={{ 
                display: 'inline-block',
                width: '12px',
                height: '3px',
                backgroundColor: '#5F6B7A',
                marginLeft: '4px',
                marginRight: '2px',
                borderRadius: '1px'
              }}></span>
              <span style={{ 
                display: 'inline-block',
                width: '6px',
                height: '3px',
                backgroundColor: '#5F6B7A',
                marginLeft: '2px',
                borderRadius: '1px'
              }}></span>
            </span>
          </Box>
        }
        xTitle="Day"
        yTitle=""
        empty={
          <Box textAlign="center" color="inherit">
            <Box variant="strong" textAlign="center" color="inherit">
              No data available
            </Box>
            <Box variant="p" padding={{ bottom: 's' }} color="inherit">
              There is no data available
            </Box>
          </Box>
        }
        noMatch={
          <Box textAlign="center" color="inherit">
            <Box variant="strong" textAlign="center" color="inherit">
              No matching data
            </Box>
            <Box variant="p" padding={{ bottom: 's' }} color="inherit">
              There is no data that matches the filter criteria. Remove one or more filters to view data.
            </Box>
          </Box>
        }
      />
    </Container>
  );
}
