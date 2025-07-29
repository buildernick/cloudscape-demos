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
      <Box margin={{ bottom: 'm' }}>
        <Box variant="h3" color="text-label">
          Credit Usage
        </Box>
      </Box>
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
          xTickFormatter: value => value.toString(),
          yTickFormatter: value => `y${Math.round(value / 50)}`,
        }}
        ariaLabel="Credit usage bar chart"
        height={300}
        hideFilter
        hideLegend={false}
        legendTitle="Legend"
        xTitle="Day"
        yTitle=""
        statusType="finished"
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
      <Box margin={{ top: 's' }}>
        <Box color="text-body-secondary" fontSize="body-s">
          <span style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '2px',
                  backgroundColor: '#688AE8',
                }}
              ></span>
              Site 1
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ display: 'flex', gap: '2px' }}>
                <span
                  style={{
                    width: '6px',
                    height: '3px',
                    backgroundColor: '#5F6B7A',
                    borderRadius: '1px',
                  }}
                ></span>
                <span
                  style={{
                    width: '6px',
                    height: '3px',
                    backgroundColor: '#5F6B7A',
                    borderRadius: '1px',
                  }}
                ></span>
              </span>
              Performance goal
            </span>
          </span>
        </Box>
      </Box>
    </Container>
  );
}
