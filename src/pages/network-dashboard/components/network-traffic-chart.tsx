// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import AreaChart from '@cloudscape-design/components/area-chart';
import Box from '@cloudscape-design/components/box';

export function NetworkTrafficChart() {
  const data = [
    { x: 'x1', site1: 50, site2: 35 },
    { x: 'x2', site1: 45, site2: 40 },
    { x: 'x3', site1: 42, site2: 35 },
    { x: 'x4', site1: 48, site2: 42 },
    { x: 'x5', site1: 55, site2: 38 },
    { x: 'x6', site1: 62, site2: 45 },
    { x: 'x7', site1: 68, site2: 52 },
    { x: 'x8', site1: 65, site2: 48 },
    { x: 'x9', site1: 58, site2: 55 },
    { x: 'x10', site1: 72, site2: 60 },
    { x: 'x11', site1: 78, site2: 65 },
    { x: 'x12', site1: 82, site2: 70 },
  ];

  return (
    <div style={{ backgroundColor: '#fff', boxShadow: '0 4px 4px rgba(0,0,0,0.25)', padding: '16px' }}>
      <Box variant="h3" margin={{ bottom: 'xs' }}>
        Network traffic
      </Box>
      <AreaChart
        series={[
          {
            title: 'Site 1',
            type: 'area',
            data: data.map(d => ({ x: d.x, y: d.site1 })),
            color: '#688AE8',
          },
          {
            title: 'Site 2',
            type: 'area',
            data: data.map(d => ({ x: d.x, y: d.site2 })),
            color: '#C33D69',
          },
          {
            title: 'Performance goal',
            type: 'threshold',
            data: data.map(d => ({ x: d.x, y: 50 })),
            color: '#5F6B7A',
          },
        ]}
        xDomain={data.map(d => d.x)}
        yDomain={[0, 100]}
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
          chartAriaRoleDescription: 'area chart',
          xTickFormatter: (x: string) => x,
          yTickFormatter: (y: number) => `y${Math.round(y / 16.67)}`,
        }}
      />
    </div>
  );
}
