// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';

export function CreditUsageChart() {
  const data = [
    { x: 'x1', y: 183 },
    { x: 'x2', y: 257 },
    { x: 'x3', y: 213 },
    { x: 'x4', y: 122 },
    { x: 'x5', y: 210 },
  ];

  return (
    <div style={{ backgroundColor: '#fff', padding: '16px' }}>
      <Box variant="h3" margin={{ bottom: 'xs' }}>
        Credit Usage
      </Box>
      <BarChart
        series={[
          {
            title: 'Site 1',
            type: 'bar',
            data: data,
            color: '#688AE8',
          },
          {
            title: 'Performance goal',
            type: 'threshold',
            data: data.map(d => ({ x: d.x, y: 200 })),
            color: '#5F6B7A',
          },
        ]}
        xDomain={data.map(d => d.x)}
        yDomain={[0, 300]}
        xTitle="Day"
        yTitle=""
        height={300}
        hideFilter
        hideLegend={false}
        statusType="finished"
        i18nStrings={{
          filterLabel: 'Filter displayed data',
          filterPlaceholder: 'Filter data',
          filterSelectedAriaLabel: 'selected',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'bar chart',
          xTickFormatter: (x: string) => x,
          yTickFormatter: (y: number) => `y${Math.round(y / 50)}`,
        }}
      />
    </div>
  );
}
