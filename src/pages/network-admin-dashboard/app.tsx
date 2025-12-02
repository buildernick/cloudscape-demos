// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import Input from '@cloudscape-design/components/input';
import Pagination from '@cloudscape-design/components/pagination';
import Alert from '@cloudscape-design/components/alert';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

// Mock data for network traffic (area chart)
const networkTrafficData = [
  {
    title: 'Site 1',
    type: 'area',
    data: [
      { x: 1, y: 150 },
      { x: 2, y: 200 },
      { x: 3, y: 180 },
      { x: 4, y: 220 },
      { x: 5, y: 240 },
      { x: 6, y: 260 },
      { x: 7, y: 250 },
      { x: 8, y: 270 },
      { x: 9, y: 260 },
      { x: 10, y: 230 },
      { x: 11, y: 200 },
      { x: 12, y: 180 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area',
    data: [
      { x: 1, y: 100 },
      { x: 2, y: 120 },
      { x: 3, y: 110 },
      { x: 4, y: 130 },
      { x: 5, y: 140 },
      { x: 6, y: 150 },
      { x: 7, y: 160 },
      { x: 8, y: 170 },
      { x: 9, y: 180 },
      { x: 10, y: 160 },
      { x: 11, y: 140 },
      { x: 12, y: 120 },
    ],
    color: '#C33D69',
  },
];

// Mock data for credit usage (bar chart)
const creditUsageData = [
  { x: 1, y: 183 },
  { x: 2, y: 257 },
  { x: 3, y: 213 },
  { x: 4, y: 122 },
  { x: 5, y: 210 },
];

// Mock data for devices table
const devicesData = Array.from({ length: 12 }, (_, i) => ({
  id: `device-${i + 1}`,
  name: 'Cell Value',
  type: 'Cell Value',
  status: 'Cell Value',
  ipAddress: 'Cell Value',
  macAddress: 'Cell Value',
  lastSeen: 'Cell Value',
  traffic: 'Cell Value',
  location: 'Cell Value',
}));

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<typeof devicesData>([]);
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <AppLayout
      navigationHide
      toolsHide
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#' },
            { text: 'Administrative Dashboard', href: '#' },
          ]}
        />
      }
      content={
        <SpaceBetween size="l">
          <Header
            variant="h1"
            description="Network Traffic, Credit Usage, and Your Devices"
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="primary" iconName="external" iconAlign="right">
                  Refresh Data
                </Button>
              </SpaceBetween>
            }
          >
            Network Administration Dashboard
          </Header>

          {alertVisible && (
            <Alert type="warning" dismissible onDismiss={() => setAlertVisible(false)} buttonText="Dismiss">
              This is a warning message
            </Alert>
          )}

          <SpaceBetween size="m">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <Input
                  value={searchValue}
                  onChange={({ detail }) => setSearchValue(detail.value)}
                  placeholder="Placeholder"
                  type="search"
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Pagination
                  currentPageIndex={currentPage}
                  onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
                  pagesCount={5}
                />
                <div
                  style={{
                    width: '2px',
                    height: '32px',
                    backgroundColor: '#414D5C',
                  }}
                />
                <Button iconName="settings" variant="icon" />
              </div>
            </div>
          </SpaceBetween>

          <Grid gridDefinition={[{ colspan: { default: 12, s: 6 } }, { colspan: { default: 12, s: 6 } }]}>
            <Container>
              <SpaceBetween size="l">
                <Box variant="h3">Network traffic</Box>
                <AreaChart
                  series={networkTrafficData}
                  xDomain={[1, 12]}
                  yDomain={[0, 300]}
                  xTitle="Day"
                  yTitle=""
                  height={300}
                  hideFilter
                  hideLegend={false}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xTickFormatter: value => `x${value}`,
                    yTickFormatter: value => `y${Math.round(value / 50)}`,
                  }}
                  ariaLabel="Network traffic area chart"
                  empty={
                    <Box textAlign="center" color="inherit">
                      <b>No data available</b>
                      <Box variant="p" color="inherit">
                        There is no data available
                      </Box>
                    </Box>
                  }
                  noMatch={
                    <Box textAlign="center" color="inherit">
                      <b>No matching data</b>
                      <Box variant="p" color="inherit">
                        There is no matching data to display
                      </Box>
                    </Box>
                  }
                />
              </SpaceBetween>
            </Container>

            <Container>
              <SpaceBetween size="l">
                <Box variant="h3">Credit Usage</Box>
                <BarChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'bar',
                      data: creditUsageData,
                      color: '#688AE8',
                    },
                  ]}
                  xDomain={[1, 2, 3, 4, 5]}
                  yDomain={[0, 300]}
                  xTitle="Day"
                  yTitle=""
                  height={300}
                  hideFilter
                  hideLegend={false}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xTickFormatter: value => `x${value}`,
                    yTickFormatter: value => `y${Math.round(value / 50)}`,
                  }}
                  ariaLabel="Credit usage bar chart"
                  empty={
                    <Box textAlign="center" color="inherit">
                      <b>No data available</b>
                      <Box variant="p" color="inherit">
                        There is no data available
                      </Box>
                    </Box>
                  }
                  noMatch={
                    <Box textAlign="center" color="inherit">
                      <b>No matching data</b>
                      <Box variant="p" color="inherit">
                        There is no matching data to display
                      </Box>
                    </Box>
                  }
                />
              </SpaceBetween>
            </Container>
          </Grid>

          <Container
            header={
              <Header
                variant="h2"
                description="Devices on your local network"
                actions={
                  <Button variant="primary" iconName="external" iconAlign="right">
                    Add Device
                  </Button>
                }
              >
                My Devices
              </Header>
            }
          >
            <Table
              columnDefinitions={[
                {
                  id: 'name',
                  header: 'Column header',
                  cell: item => item.name,
                  sortingField: 'name',
                },
                {
                  id: 'type',
                  header: 'Column header',
                  cell: item => item.type,
                  sortingField: 'type',
                },
                {
                  id: 'status',
                  header: 'Column header',
                  cell: item => item.status,
                  sortingField: 'status',
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
                  id: 'lastSeen',
                  header: 'Column header',
                  cell: item => item.lastSeen,
                  sortingField: 'lastSeen',
                },
                {
                  id: 'traffic',
                  header: 'Column header',
                  cell: item => item.traffic,
                  sortingField: 'traffic',
                },
                {
                  id: 'location',
                  header: 'Column header',
                  cell: item => item.location,
                  sortingField: 'location',
                },
              ]}
              items={devicesData}
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
              trackBy="id"
              empty={
                <Box textAlign="center" color="inherit">
                  <b>No devices</b>
                  <Box variant="p" color="inherit">
                    No devices found.
                  </Box>
                </Box>
              }
              variant="borderless"
            />
          </Container>
        </SpaceBetween>
      }
    />
  );
}
