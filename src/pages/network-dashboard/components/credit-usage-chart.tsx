// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import BarChart from '@cloudscape-design/components/bar-chart';

export function CreditUsageChart() {
  // Sample data for the bar chart
  const chartData = [
    { x: 'x1', y: 75 },
    { x: 'x2', y: 95 },
    { x: 'x3', y: 85 },
    { x: 'x4', y: 45 },
    { x: 'x5', y: 80 },
  ];

  const series = [
    {
      title: 'Site 1',
      type: 'bar' as const,
      data: chartData,
      color: '#688AE8',
    },
  ];

  return (
    <Container
      header={
        <Header variant="h3">
          Credit Usage
        </Header>
      }
    >
      <BarChart
        series={series}
        height={300}
        xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
        yDomain={[0, 100]}
        xScaleType="categorical"
        yTitle=""
        xTitle="Day"
        ariaLabel="Credit usage bar chart"
        ariaDescription="Bar chart showing credit usage over time"
        statusType="finished"
        fitHeight={false}
        hideFilter={true}
        hideLegend={false}
        i18nStrings={{
          filterLabel: 'Filter displayed series',
          filterPlaceholder: 'Filter series',
          filterSelectedAriaLabel: 'selected',
          legendAriaLabel: 'Legend',
          chartAriaRoleDescription: 'bar chart',
          xTickFormatter: (e) => e,
          yTickFormatter: (e) => `y${Math.round(e)}`,
        }}
        additionalFilters={
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div
                style={{
                  width: '14px',
                  height: '14px',
                  backgroundColor: '#688AE8',
                  borderRadius: '2px',
                }}
              />
              <span style={{ fontSize: '14px', color: '#000716' }}>Site 1</span>
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
