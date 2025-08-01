// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';

// Mock data for the bar chart
const chartData = [
  { x: 'x1', value: 60 },
  { x: 'x2', value: 85 },
  { x: 'x3', value: 70 },
  { x: 'x4', value: 40 },
  { x: 'x5', value: 75 },
];

const yAxisLabels = ['y1', 'y2', 'y3', 'y4', 'y5', 'y6'];

export function CreditUsageChart() {
  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <SpaceBetween size="m">
      <Box variant="h3" fontWeight="bold">
        Credit Usage
      </Box>
      
      <div style={{ position: 'relative', height: '300px', width: '100%' }}>
        {/* Chart container with grid lines */}
        <div style={{ 
          position: 'relative', 
          height: '100%', 
          border: '1px solid #e9ebed',
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '20px'
        }}>
          {/* Y-axis labels */}
          <div style={{ 
            position: 'absolute', 
            left: '0', 
            top: '20px', 
            bottom: '60px',
            width: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            {yAxisLabels.reverse().map((label) => (
              <span key={label} style={{ 
                fontSize: '12px', 
                color: '#5f6b7a',
                fontFamily: 'Open Sans, -apple-system, Roboto, Helvetica, sans-serif'
              }}>
                {label}
              </span>
            ))}
          </div>

          {/* Chart area */}
          <div style={{ 
            marginLeft: '50px', 
            marginRight: '20px',
            height: 'calc(100% - 80px)',
            position: 'relative',
            backgroundImage: `repeating-linear-gradient(to top, transparent, transparent 16.66%, #e9ebed 16.66%, #e9ebed calc(16.66% + 1px))`,
            backgroundSize: '100% 100%',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-around',
            paddingBottom: '10px'
          }}>
            {chartData.map((item, index) => {
              const barHeight = (item.value / maxValue) * 180; // 180px is roughly the chart height
              return (
                <div
                  key={item.x}
                  style={{
                    width: '60px',
                    height: `${barHeight}px`,
                    backgroundColor: '#688AE8',
                    borderRadius: '4px 4px 0 0',
                    border: '2px solid #fff',
                    borderBottom: 'none',
                    minHeight: '20px',
                    transition: 'all 0.3s ease'
                  }}
                  title={`${item.x}: ${item.value}`}
                />
              );
            })}
          </div>

          {/* X-axis labels */}
          <div style={{ 
            position: 'absolute', 
            bottom: '0', 
            left: '50px',
            right: '20px',
            height: '40px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}>
            {chartData.map((item) => (
              <span key={item.x} style={{ 
                fontSize: '12px', 
                color: '#5f6b7a',
                fontFamily: 'Open Sans, -apple-system, Roboto, Helvetica, sans-serif'
              }}>
                {item.x}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* X-axis label */}
      <Box textAlign="center" variant="small" fontWeight="bold">
        Day
      </Box>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-start', paddingTop: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ 
            width: '14px', 
            height: '14px', 
            backgroundColor: '#688AE8',
            borderRadius: '2px'
          }} />
          <span style={{ 
            fontSize: '14px', 
            color: '#000716',
            fontFamily: 'Open Sans, -apple-system, Roboto, Helvetica, sans-serif'
          }}>
            Site 1
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ 
            width: '12px', 
            height: '3px',
            background: 'repeating-linear-gradient(to right, #5f6b7a 0, #5f6b7a 3px, transparent 3px, transparent 6px)'
          }} />
          <span style={{ 
            fontSize: '14px', 
            color: '#000716',
            fontFamily: 'Open Sans, -apple-system, Roboto, Helvetica, sans-serif'
          }}>
            Performance goal
          </span>
        </div>
      </div>
    </SpaceBetween>
  );
}
