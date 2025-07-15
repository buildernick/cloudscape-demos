// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import AreaChart from '@cloudscape-design/components/area-chart';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';

const networkTrafficData = [
  { x: 1, site1: 3500, site2: 3200, perfGoal: 3800 },
  { x: 2, site1: 3800, site2: 3400, perfGoal: 3800 },
  { x: 3, site1: 4200, site2: 3600, perfGoal: 3800 },
  { x: 4, site1: 4100, site2: 3800, perfGoal: 3800 },
  { x: 5, site1: 4300, site2: 4000, perfGoal: 3800 },
  { x: 6, site1: 4600, site2: 4200, perfGoal: 3800 },
  { x: 7, site1: 4500, site2: 4100, perfGoal: 3800 },
  { x: 8, site1: 4400, site2: 4000, perfGoal: 3800 },
  { x: 9, site1: 4200, site2: 3900, perfGoal: 3800 },
  { x: 10, site1: 4500, site2: 4200, perfGoal: 3800 },
  { x: 11, site1: 4700, site2: 4400, perfGoal: 3800 },
  { x: 12, site1: 4300, site2: 4100, perfGoal: 3800 },
];

const series = [
  {
    title: 'Site 1',
    type: 'area' as const,
    data: networkTrafficData.map(d => ({ x: d.x, y: d.site1 })),
    valueFormatter: (value: number) => `${value.toLocaleString()} MB/s`,
    color: '#ec7211',
  },
  {
    title: 'Site 2',
    type: 'area' as const,
    data: networkTrafficData.map(d => ({ x: d.x, y: d.site2 })),
    valueFormatter: (value: number) => `${value.toLocaleString()} MB/s`,
    color: '#2ea597',
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    data: networkTrafficData.map(d => ({ x: d.x, y: d.perfGoal })),
    valueFormatter: (value: number) => `${value.toLocaleString()} MB/s`,
    color: '#000000',
  },
];

export default function NetworkTrafficChart() {
  return (
    <Container header={<Header variant="h2">Network traffic</Header>}>
      <AreaChart
        series={series}
        xDomain={[1, 12]}
        yDomain={[0, 5000]}
        xTitle="Day"
        yTitle=""
        height={280}
        fitHeight={false}
        hideFilter
        hideLegend={false}
        statusType="finished"
        ariaLabel="Network traffic area chart"
        i18nStrings={{
          filterLabel: 'Filter displayed data',
          filterPlaceholder: 'Filter data',
          filterSelectedAriaLabel: 'selected',
          detailPopoverDismissAriaLabel: 'Dismiss',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'area chart',
          xAxisAriaRoleDescription: 'x axis',
          yAxisAriaRoleDescription: 'y axis',
        }}
      />
    </Container>
  );
}
