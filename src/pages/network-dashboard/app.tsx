// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Flashbar from '@cloudscape-design/components/flashbar';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';

import '@cloudscape-design/global-styles/dark-mode-utils.css';
import './styles.scss';

// Mock data for Network Traffic chart
const networkTrafficData = [
  { x: 1, y1: 3.2, y2: 3.4 },
  { x: 2, y1: 3.5, y2: 3.8 },
  { x: 3, y1: 3.6, y2: 4.0 },
  { x: 4, y1: 3.8, y2: 4.1 },
  { x: 5, y1: 4.0, y2: 4.3 },
  { x: 6, y1: 4.2, y2: 4.4 },
  { x: 7, y1: 4.1, y2: 4.2 },
  { x: 8, y1: 3.9, y2: 4.0 },
  { x: 9, y1: 3.7, y2: 3.9 },
  { x: 10, y1: 4.5, y2: 4.8 },
  { x: 11, y1: 4.3, y2: 4.6 },
  { x: 12, y1: 3.6, y2: 3.9 },
];

// Mock data for Credit Usage chart
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
  name: `Device ${i + 1}`,
  ipAddress: `192.168.1.${i + 10}`,
  macAddress: `00:1B:44:11:3A:${(i + 10).toString(16).padStart(2, '0').toUpperCase()}`,
  status: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Inactive' : 'Pending',
  type: i % 2 === 0 ? 'Laptop' : 'Desktop',
  location: `Building ${Math.floor(i / 3) + 1}`,
  lastSeen: `${Math.floor(Math.random() * 24)} hours ago`,
}));

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [flashbarItems, setFlashbarItems] = useState([
    {
      type: 'warning' as const,
      content: 'This is a warning message',
      dismissible: true,
      dismissLabel: 'Dismiss',
      onDismiss: () => setFlashbarItems([]),
      id: 'warning-message',
    },
  ]);

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
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <Header
                variant="h1"
                description="Network Traffic, Credit Usage, and Your Devices"
                actions={
                  <Button variant="primary" iconName="external" iconAlign="right">
                    Refresh Data
                  </Button>
                }
              >
                Network Administration Dashboard
              </Header>
              
              <Grid gridDefinition={[{ colspan: { default: 12, xs: 8, s: 6 } }, { colspan: { default: 12, xs: 4, s: 6 } }]}>
                <Input
                  type="search"
                  placeholder="Placeholder"
                  value={searchValue}
                  onChange={({ detail }) => setSearchValue(detail.value)}
                />
                <div className="pagination-wrapper">
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                    pagesCount={5}
                  />
                </div>
              </Grid>

              {flashbarItems.length > 0 && <Flashbar items={flashbarItems} />}
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            <Grid gridDefinition={[{ colspan: { default: 12, s: 6 } }, { colspan: { default: 12, s: 6 } }]}>
              <Container>
                <AreaChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'area',
                      data: networkTrafficData.map(d => ({ x: d.x, y: d.y1 })),
                      color: '#688AE8',
                    },
                    {
                      title: 'Site 2',
                      type: 'area',
                      data: networkTrafficData.map(d => ({ x: d.x, y: d.y2 })),
                      color: '#C33D69',
                    },
                  ]}
                  xDomain={[1, 12]}
                  yDomain={[0, 6]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xTickFormatter: (value) => `x${value}`,
                    yTickFormatter: (value) => `y${value}`,
                  }}
                  ariaLabel="Network traffic area chart"
                  height={300}
                  xScaleType="linear"
                  xTitle="Day"
                  yTitle="Network traffic"
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
              </Container>

              <Container>
                <BarChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'bar',
                      data: creditUsageData,
                      color: '#688AE8',
                    },
                  ]}
                  xDomain={creditUsageData.map(d => d.x)}
                  yDomain={[0, 300]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xTickFormatter: (value) => `x${value}`,
                    yTickFormatter: (value) => `y${value}`,
                  }}
                  ariaLabel="Credit usage bar chart"
                  height={300}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle="Credit Usage"
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
              </Container>
            </Grid>

            <Table
              columnDefinitions={[
                {
                  id: 'name',
                  header: 'Device Name',
                  cell: item => item.name,
                  sortingField: 'name',
                },
                {
                  id: 'ipAddress',
                  header: 'IP Address',
                  cell: item => item.ipAddress,
                  sortingField: 'ipAddress',
                },
                {
                  id: 'macAddress',
                  header: 'MAC Address',
                  cell: item => item.macAddress,
                  sortingField: 'macAddress',
                },
                {
                  id: 'status',
                  header: 'Status',
                  cell: item => item.status,
                  sortingField: 'status',
                },
                {
                  id: 'type',
                  header: 'Type',
                  cell: item => item.type,
                  sortingField: 'type',
                },
                {
                  id: 'location',
                  header: 'Location',
                  cell: item => item.location,
                  sortingField: 'location',
                },
                {
                  id: 'lastSeen',
                  header: 'Last Seen',
                  cell: item => item.lastSeen,
                  sortingField: 'lastSeen',
                },
              ]}
              items={devicesData}
              loadingText="Loading devices"
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
              trackBy="id"
              empty={
                <Box textAlign="center" color="inherit">
                  <b>No devices</b>
                  <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                    No devices to display.
                  </Box>
                </Box>
              }
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
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
