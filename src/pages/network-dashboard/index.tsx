// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Alert from '@cloudscape-design/components/alert';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';

import '../../styles/base.scss';
import './styles.scss';

// Mock data for the devices table
const generateDevices = (count: number) => {
  const devices = [];
  for (let i = 1; i <= count; i++) {
    devices.push({
      id: `device-${i}`,
      name: `Device ${i}`,
      ipAddress: `192.168.1.${i}`,
      macAddress: `00:1B:44:11:3A:${i.toString(16).toUpperCase().padStart(2, '0')}`,
      status: i % 3 === 0 ? 'Offline' : 'Online',
      type: ['Router', 'Switch', 'Access Point', 'Computer'][i % 4],
      lastSeen: `2024-01-${(i % 28) + 1}`,
      bandwidth: `${Math.floor(Math.random() * 1000)} Mbps`,
    });
  }
  return devices;
};

const devices = generateDevices(12);

// Mock data for charts
const networkTrafficData = {
  labels: ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12'],
  site1: [3.5, 3.2, 2.8, 2.5, 2.1, 2.4, 2.7, 3.1, 3.4, 3.8, 4.2, 4.5],
  site2: [2.8, 3.1, 3.5, 4.2, 4.8, 4.5, 4.1, 3.7, 3.3, 2.9, 2.5, 2.2],
};

const creditUsageData = {
  labels: ['x1', 'x2', 'x3', 'x4', 'x5'],
  values: [183, 257, 213, 122, 210],
};

export default function NetworkDashboard() {
  const [selectedItems, setSelectedItems] = useState<typeof devices>([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <AppLayout
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#' },
            { text: 'Administrative Dashboard', href: '#' },
          ]}
        />
      }
      navigationHide
      toolsHide
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <Header
                variant="h1"
                description="Network Traffic, Credit Usage, and Your Devices"
                actions={
                  <Button variant="primary" iconAlign="right" iconName="external">
                    Refresh Data
                  </Button>
                }
              >
                Network Administration Dashboard
              </Header>
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {alertVisible && (
              <Alert type="warning" dismissible onDismiss={() => setAlertVisible(false)}>
                This is a warning message
              </Alert>
            )}

            <div className="charts-header-container">
              <Grid gridDefinition={[{ colspan: { default: 12, s: 6 } }, { colspan: { default: 12, s: 6 } }]}>
                <Input
                  type="search"
                  placeholder="Placeholder"
                  value={searchValue}
                  onChange={({ detail }) => setSearchValue(detail.value)}
                />
                <div className="pagination-controls">
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                    pagesCount={5}
                  />
                  <Button iconName="settings" variant="icon" />
                </div>
              </Grid>
            </div>

            <Grid gridDefinition={[{ colspan: { default: 12, m: 6 } }, { colspan: { default: 12, m: 6 } }]}>
              <Container>
                <div className="chart-container">
                  <Box variant="h3" padding={{ bottom: 's' }}>
                    Network traffic
                  </Box>
                  <div className="area-chart">
                    <svg viewBox="0 0 618 300" className="chart-svg">
                      <g className="y-axis">
                        {['y6', 'y5', 'y4', 'y3', 'y2', 'y1'].map((label, i) => (
                          <g key={label} transform={`translate(0, ${i * 47})`}>
                            <text x="0" y="4" className="axis-label">
                              {label}
                            </text>
                            <line x1="52" y1="0" x2="618" y2="0" className="grid-line" />
                          </g>
                        ))}
                      </g>

                      <g className="x-axis" transform="translate(52, 282)">
                        {networkTrafficData.labels.map((label, i) => (
                          <g key={label} transform={`translate(${i * 48.5}, 0)`}>
                            <line x1="0" y1="0" x2="0" y2="8" className="tick" />
                            <text x="0" y="20" className="axis-label" textAnchor="middle">
                              {label}
                            </text>
                          </g>
                        ))}
                      </g>

                      <g transform="translate(52, 8)">
                        <path
                          d="M0,176 L41,150 L74,132 L99,132 L132,109 L182,59 L246,69 L313,73 L352,82 L413,38 L494,46 L566,128 L566,268 L487,64 L440,64 L403,94 L333,107 L271,114 L225,100 L156,129 L129,134 L105,158 L66,166 L36,181 L0,190 Z"
                          className="area-fill area-site2"
                        />
                        <path
                          d="M0,176 L41,150 L74,132 L99,132 L132,109 L182,59 L246,69 L313,73 L352,82 L413,38 L494,46 L566,128"
                          className="area-stroke area-site2-stroke"
                        />

                        <path
                          d="M36,181 L0,190 L0,268 L566,268 L566,149 L487,64 L440,64 L403,94 L333,107 L271,114 L225,101 L156,130 L129,134 L105,158 L66,166 L36,181 Z"
                          className="area-fill area-site1"
                        />
                        <path
                          d="M0,190 L36,181 L66,166 L105,158 L129,134 L156,130 L225,101 L271,114 L333,107 L403,94 L440,64 L487,64 L566,149"
                          className="area-stroke area-site1-stroke"
                        />

                        <line x1="0" y1="142" x2="566" y2="142" className="threshold-line" strokeDasharray="4 4" />
                      </g>
                    </svg>
                  </div>
                  <Box textAlign="center" padding={{ top: 's' }}>
                    <Box variant="strong" fontSize="body-s">
                      Day
                    </Box>
                  </Box>
                  <div className="chart-legend">
                    <div className="legend-item">
                      <span className="legend-box legend-site1"></span>
                      <span className="legend-text">Site 1</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-box legend-site2"></span>
                      <span className="legend-text">Site 2</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dashed"></span>
                      <span className="legend-text">Performance goal</span>
                    </div>
                  </div>
                </div>
              </Container>

              <Container>
                <div className="chart-container">
                  <Box variant="h3" padding={{ bottom: 's' }}>
                    Credit Usage
                  </Box>
                  <div className="bar-chart">
                    <svg viewBox="0 0 618 300" className="chart-svg">
                      <g className="y-axis">
                        {['y6', 'y5', 'y4', 'y3', 'y2', 'y1'].map((label, i) => (
                          <g key={label} transform={`translate(0, ${i * 47.3})`}>
                            <text x="0" y="4" className="axis-label">
                              {label}
                            </text>
                            <line x1="52" y1="0" x2="618" y2="0" className="grid-line" />
                          </g>
                        ))}
                      </g>

                      <g className="x-axis" transform="translate(43, 284)">
                        {creditUsageData.labels.map((label, i) => (
                          <g key={label} transform={`translate(${i * 115}, 0)`}>
                            <line x1="57.5" y1="0" x2="57.5" y2="8" className="tick" />
                            <text x="57.5" y="20" className="axis-label" textAnchor="middle">
                              {label}
                            </text>
                          </g>
                        ))}
                      </g>

                      <g transform="translate(53, 10)">
                        {creditUsageData.values.map((value, i) => {
                          const barHeight = (value / 300) * 260;
                          const y = 260 - barHeight;
                          return (
                            <rect
                              key={i}
                              x={i * 115 + 10}
                              y={y}
                              width={95}
                              height={barHeight}
                              className="bar-fill"
                              rx="4"
                            />
                          );
                        })}
                      </g>
                    </svg>
                  </div>
                  <Box textAlign="center" padding={{ top: 's' }}>
                    <Box variant="strong" fontSize="body-s">
                      Day
                    </Box>
                  </Box>
                  <div className="chart-legend">
                    <div className="legend-item">
                      <span className="legend-box legend-bar"></span>
                      <span className="legend-text">Site 1</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dashed"></span>
                      <span className="legend-text">Performance goal</span>
                    </div>
                  </div>
                </div>
              </Container>
            </Grid>

            <Table
              columnDefinitions={[
                {
                  id: 'name',
                  header: 'Column header',
                  cell: item => item.name,
                  sortingField: 'name',
                },
                {
                  id: 'ipAddress',
                  header: 'Column header',
                  cell: item => item.ipAddress,
                  sortingField: 'ipAddress',
                },
                {
                  id: 'macAddress',
                  header: 'Column header',
                  cell: item => item.macAddress,
                  sortingField: 'macAddress',
                },
                {
                  id: 'status',
                  header: 'Column header',
                  cell: item => item.status,
                  sortingField: 'status',
                },
                {
                  id: 'type',
                  header: 'Column header',
                  cell: item => item.type,
                  sortingField: 'type',
                },
                {
                  id: 'lastSeen',
                  header: 'Column header',
                  cell: item => item.lastSeen,
                  sortingField: 'lastSeen',
                },
                {
                  id: 'bandwidth',
                  header: 'Column header',
                  cell: item => item.bandwidth,
                  sortingField: 'bandwidth',
                },
              ]}
              items={devices}
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
              header={
                <Header
                  variant="h2"
                  description="Devices on your local network"
                  actions={
                    <Button variant="primary" iconAlign="right" iconName="external">
                      Add Device
                    </Button>
                  }
                >
                  My Devices
                </Header>
              }
              empty={
                <Box textAlign="center" color="inherit">
                  <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                    <b>No devices</b>
                  </Box>
                  <Button>Add Device</Button>
                </Box>
              }
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
