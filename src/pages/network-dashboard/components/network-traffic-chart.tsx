// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';

// Mock data for the area chart
const chartData = [
  { x: 'x1', site1: 30, site2: 45 },
  { x: 'x2', site1: 35, site2: 50 },
  { x: 'x3', site1: 40, site2: 55 },
  { x: 'x4', site1: 45, site2: 60 },
  { x: 'x5', site1: 38, site2: 52 },
  { x: 'x6', site1: 42, site2: 58 },
  { x: 'x7', site1: 48, site2: 65 },
  { x: 'x8', site1: 44, site2: 62 },
  { x: 'x9', site1: 40, site2: 58 },
  { x: 'x10', site1: 36, site2: 54 },
  { x: 'x11', site1: 38, site2: 56 },
  { x: 'x12', site1: 42, site2: 60 },
];

const yAxisLabels = ['y1', 'y2', 'y3', 'y4', 'y5', 'y6'];

export function NetworkTrafficChart() {
  return (
    <SpaceBetween size="m">
      <Box variant="h3" fontWeight="bold">
        Network traffic
      </Box>

      <div style={{ position: 'relative', height: '300px', width: '100%' }}>
        {/* Chart container with grid lines */}
        <div
          style={{
            position: 'relative',
            height: '100%',
            border: '1px solid #e9ebed',
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '20px',
          }}
        >
          {/* Y-axis labels */}
          <div
            style={{
              position: 'absolute',
              left: '0',
              top: '20px',
              bottom: '60px',
              width: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {yAxisLabels.reverse().map(label => (
              <span
                key={label}
                style={{
                  fontSize: '12px',
                  color: '#5f6b7a',
                  fontFamily: 'Open Sans, -apple-system, Roboto, Helvetica, sans-serif',
                }}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Chart area */}
          <div
            style={{
              marginLeft: '50px',
              marginRight: '20px',
              height: 'calc(100% - 80px)',
              position: 'relative',
              backgroundImage: `repeating-linear-gradient(to top, transparent, transparent 16.66%, #e9ebed 16.66%, #e9ebed calc(16.66% + 1px))`,
              backgroundSize: '100% 100%',
            }}
          >
            {/* Dashed line for performance goal */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '0',
                right: '0',
                height: '2px',
                background:
                  'repeating-linear-gradient(to right, #5f6b7a 0, #5f6b7a 4px, transparent 4px, transparent 8px)',
                zIndex: 2,
              }}
            />

            {/* Area chart simulation with gradients */}
            <svg
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: 0, left: 0 }}
              viewBox="0 0 500 200"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="site1Gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#688AE8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#688AE8" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="site2Gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C33D69" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#C33D69" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Site 1 area */}
              <path
                d="M0,120 L41,100 L83,90 L125,85 L167,95 L208,88 L250,75 L292,82 L333,90 L375,105 L417,98 L458,85 L500,80 L500,200 L0,200 Z"
                fill="url(#site1Gradient)"
              />
              <path
                d="M0,120 L41,100 L83,90 L125,85 L167,95 L208,88 L250,75 L292,82 L333,90 L375,105 L417,98 L458,85 L500,80"
                fill="none"
                stroke="#688AE8"
                strokeWidth="2"
              />

              {/* Site 2 area */}
              <path
                d="M0,150 L41,130 L83,120 L125,110 L167,125 L208,118 L250,105 L292,112 L333,120 L375,135 L417,128 L458,115 L500,110 L500,200 L0,200 Z"
                fill="url(#site2Gradient)"
              />
              <path
                d="M0,150 L41,130 L83,120 L125,110 L167,125 L208,118 L250,105 L292,112 L333,120 L375,135 L417,128 L458,115 L500,110"
                fill="none"
                stroke="#C33D69"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* X-axis labels */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '50px',
              right: '20px',
              height: '40px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {chartData.map(item => (
              <span
                key={item.x}
                style={{
                  fontSize: '12px',
                  color: '#5f6b7a',
                  fontFamily: 'Amazon Ember, -apple-system, Roboto, Helvetica, sans-serif',
                }}
              >
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
          <div
            style={{
              width: '14px',
              height: '14px',
              backgroundColor: 'rgba(104, 138, 232, 0.40)',
              border: '1px solid #688AE8',
              borderRadius: '2px',
            }}
          />
          <span
            style={{
              fontSize: '14px',
              color: '#000716',
              fontFamily: 'Open Sans, -apple-system, Roboto, Helvetica, sans-serif',
            }}
          >
            Site 1
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div
            style={{
              width: '14px',
              height: '14px',
              backgroundColor: 'rgba(195, 61, 105, 0.40)',
              border: '1px solid #C33D69',
              borderRadius: '2px',
            }}
          />
          <span
            style={{
              fontSize: '14px',
              color: '#000716',
              fontFamily: 'Open Sans, -apple-system, Roboto, Helvetica, sans-serif',
            }}
          >
            Site 2
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div
            style={{
              width: '12px',
              height: '3px',
              background:
                'repeating-linear-gradient(to right, #5f6b7a 0, #5f6b7a 3px, transparent 3px, transparent 6px)',
            }}
          />
          <span
            style={{
              fontSize: '14px',
              color: '#000716',
              fontFamily: 'Open Sans, -apple-system, Roboto, Helvetica, sans-serif',
            }}
          >
            Performance goal
          </span>
        </div>
      </div>
    </SpaceBetween>
  );
}
