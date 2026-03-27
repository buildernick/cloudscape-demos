// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import AreaChart from '@cloudscape-design/components/area-chart';

export function NetworkTrafficChart() {
  // Sample data for the area chart - two stacked series
  const chartData = [
    { x: new Date('2024-01-01'), y1: 45, y2: 30 },
    { x: new Date('2024-01-02'), y1: 52, y2: 35 },
    { x: new Date('2024-01-03'), y1: 48, y2: 32 },
    { x: new Date('2024-01-04'), y1: 61, y2: 42 },
    { x: new Date('2024-01-05'), y1: 55, y2: 38 },
    { x: new Date('2024-01-06'), y1: 67, y2: 45 },
    { x: new Date('2024-01-07'), y1: 62, y2: 41 },
    { x: new Date('2024-01-08'), y1: 58, y2: 39 },
    { x: new Date('2024-01-09'), y1: 64, y2: 43 },
    { x: new Date('2024-01-10'), y1: 59, y2: 40 },
    { x: new Date('2024-01-11'), y1: 72, y2: 48 },
    { x: new Date('2024-01-12'), y1: 68, y2: 46 },
  ];

  const series = [
    {
      title: 'Site 1',
      type: 'area' as const,
      data: chartData.map(d => ({ x: d.x, y: d.y1 })),
      color: '#688AE8',
    },
    {
      title: 'Site 2',
      type: 'area' as const,
      data: chartData.map(d => ({ x: d.x, y: d.y2 })),
      color: '#C33D69',
    },
  ];

  return (
    <Container header={<Header variant="h3">Network traffic</Header>}>
      <AreaChart
        series={series}
        height={300}
        xDomain={[new Date('2024-01-01'), new Date('2024-01-12')]}
        yDomain={[0, 100]}
        xScaleType="time"
        yTitle=""
        xTitle="Day"
        ariaLabel="Network traffic area chart"
        ariaDescription="Area chart showing network traffic for two sites over time"
        statusType="finished"
        stackedBars={true}
        fitHeight={false}
        hideFilter={true}
        hideLegend={false}
        i18nStrings={{
          filterLabel: 'Filter displayed series',
          filterPlaceholder: 'Filter series',
          filterSelectedAriaLabel: 'selected',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'area chart',
          xTickFormatter: e => {
            const date = new Date(e);
            return `x${date.getDate()}`;
          },
          yTickFormatter: e => `y${Math.round(e)}`,
        }}
        additionalFilters={
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div
                style={{
                  width: '14px',
                  height: '14px',
                  backgroundColor: 'rgba(116, 146, 231, 0.4)',
                  border: '1px solid #688AE8',
                  borderRadius: '2px',
                }}
              />
              <span style={{ fontSize: '14px', color: '#000716' }}>Site 1</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div
                style={{
                  width: '14px',
                  height: '14px',
                  backgroundColor: 'rgba(195, 61, 105, 0.4)',
                  border: '1px solid #C33D69',
                  borderRadius: '2px',
                }}
              />
              <span style={{ fontSize: '14px', color: '#000716' }}>Site 2</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div
                style={{
                  width: '12px',
                  height: '3px',
                  display: 'flex',
                  gap: '2px',
                }}
              >
                <div
                  style={{
                    width: '6px',
                    height: '3px',
                    backgroundColor: '#5F6B7A',
                    borderRadius: '1px',
                  }}
                />
                <div
                  style={{
                    width: '6px',
                    height: '3px',
                    backgroundColor: '#5F6B7A',
                    borderRadius: '1px',
                  }}
                />
              </div>
              <span style={{ fontSize: '14px', color: '#000716' }}>Performance goal</span>
            </div>
          </div>
        }
      />
    </Container>
  );
}
