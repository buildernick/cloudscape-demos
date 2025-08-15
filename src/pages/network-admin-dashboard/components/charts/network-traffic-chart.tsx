// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import AreaChart from '@cloudscape-design/components/area-chart';

const networkTrafficData = [
  { x: new Date('2024-01-01'), Site1: 120, Site2: 80 },
  { x: new Date('2024-01-02'), Site1: 140, Site2: 90 },
  { x: new Date('2024-01-03'), Site1: 160, Site2: 110 },
  { x: new Date('2024-01-04'), Site1: 180, Site2: 130 },
  { x: new Date('2024-01-05'), Site1: 200, Site2: 150 },
  { x: new Date('2024-01-06'), Site1: 220, Site2: 170 },
  { x: new Date('2024-01-07'), Site1: 190, Site2: 140 },
  { x: new Date('2024-01-08'), Site1: 210, Site2: 160 },
  { x: new Date('2024-01-09'), Site1: 240, Site2: 180 },
  { x: new Date('2024-01-10'), Site1: 260, Site2: 200 },
  { x: new Date('2024-01-11'), Site1: 230, Site2: 170 },
  { x: new Date('2024-01-12'), Site1: 250, Site2: 190 },
];

export function NetworkTrafficChart() {
  return (
    <Container
      header={<Header variant="h2">Network traffic</Header>}
      fitHeight
    >
      <AreaChart
        series={[
          {
            title: 'Site 1',
            type: 'area',
            data: networkTrafficData.map(point => ({ x: point.x, y: point.Site1 })),
            color: '#688AE8',
          },
          {
            title: 'Site 2', 
            type: 'area',
            data: networkTrafficData.map(point => ({ x: point.x, y: point.Site2 })),
            color: '#C33D69',
          },
        ]}
        xDomain={[networkTrafficData[0].x, networkTrafficData[networkTrafficData.length - 1].x]}
        yDomain={[0, 300]}
        xTitle="Day"
        yTitle="Network traffic"
        height={300}
        hideFilter
        hideLegend={false}
        xScaleType="time"
        statusType="finished"
        loadingText="Loading chart"
        errorText="Error loading data"
        recoveryText="Retry"
        emphasizeBaselineAxis={false}
        stackedAreas={true}
        horizontalBars={false}
        fitHeight={false}
        ariaLabel="Network traffic over time showing data for Site 1 and Site 2"
        ariaDescription="An area chart displaying network traffic patterns across two sites over a 12-day period. Site 1 shows higher traffic volumes compared to Site 2."
        i18nStrings={{
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'area chart',
          xTickFormatter: e => e.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          yTickFormatter: e => e.toString(),
        }}
        additionalFilters={
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#000716' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '2px', border: '1px solid #688AE8', backgroundColor: 'rgba(116, 146, 231, 0.40)' }} />
              <span>Site 1</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '2px', border: '1px solid #C33D69', backgroundColor: 'rgba(195, 61, 105, 0.40)' }} />
              <span>Site 2</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '12px', height: '3px', display: 'flex', gap: '2px' }}>
                <div style={{ width: '6px', height: '3px', borderRadius: '1px', backgroundColor: '#5F6B7A' }} />
                <div style={{ width: '6px', height: '3px', borderRadius: '1px', backgroundColor: '#5F6B7A' }} />
              </div>
              <span>Performance goal</span>
            </div>
          </div>
        }
      />
    </Container>
  );
}
