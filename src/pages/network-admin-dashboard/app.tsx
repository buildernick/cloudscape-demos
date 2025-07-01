// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import ContentLayout from '@cloudscape-design/components/content-layout';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import LineChart from '@cloudscape-design/components/line-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Alert from '@cloudscape-design/components/alert';
import { BreadcrumbGroup } from '@cloudscape-design/components';

// Mock data for network traffic area chart
const networkTrafficData = [
  { day: 'x1', site1: 120, site2: 80 },
  { day: 'x2', site1: 130, site2: 90 },
  { day: 'x3', site1: 140, site2: 95 },
  { day: 'x4', site1: 120, site2: 85 },
  { day: 'x5', site1: 160, site2: 110 },
  { day: 'x6', site1: 150, site2: 100 },
  { day: 'x7', site1: 170, site2: 120 },
  { day: 'x8', site1: 140, site2: 90 },
  { day: 'x9', site1: 130, site2: 85 },
  { day: 'x10', site1: 145, site2: 95 },
  { day: 'x11', site1: 135, site2: 88 },
  { day: 'x12', site1: 155, site2: 105 },
];

const networkTrafficSeries = [
  {
    title: 'Site 1',
    type: 'line' as const,
    data: networkTrafficData.map(item => ({ x: item.day, y: item.site1 })),
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'line' as const,
    data: networkTrafficData.map(item => ({ x: item.day, y: item.site2 })),
    color: '#C33D69',
  },
];

// Mock data for credit usage bar chart
const creditUsageData = [
  { day: 'x1', usage: 75 },
  { day: 'x2', usage: 85 },
  { day: 'x3', usage: 78 },
  { day: 'x4', usage: 45 },
  { day: 'x5', usage: 80 },
];

const creditUsageSeries = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    data: creditUsageData.map(item => ({ x: item.day, y: item.usage })),
    color: '#688AE8',
  },
];

// Mock data for devices table
const deviceTableData = [
  { id: '1', name: 'Device 001', type: 'Router', status: 'Active', location: 'Building A', lastSeen: '5 min ago' },
  { id: '2', name: 'Device 002', type: 'Switch', status: 'Active', location: 'Building B', lastSeen: '2 min ago' },
  {
    id: '3',
    name: 'Device 003',
    type: 'Access Point',
    status: 'Inactive',
    location: 'Building C',
    lastSeen: '1 hour ago',
  },
  { id: '4', name: 'Device 004', type: 'Router', status: 'Active', location: 'Building A', lastSeen: '10 min ago' },
  { id: '5', name: 'Device 005', type: 'Switch', status: 'Active', location: 'Building D', lastSeen: '3 min ago' },
  {
    id: '6',
    name: 'Device 006',
    type: 'Access Point',
    status: 'Active',
    location: 'Building B',
    lastSeen: '1 min ago',
  },
  {
    id: '7',
    name: 'Device 007',
    type: 'Router',
    status: 'Maintenance',
    location: 'Building C',
    lastSeen: '30 min ago',
  },
  { id: '8', name: 'Device 008', type: 'Switch', status: 'Active', location: 'Building A', lastSeen: '5 min ago' },
];

const columnDefinitions = [
  {
    id: 'name',
    header: 'Device Name',
    cell: (item: any) => item.name,
    sortingField: 'name',
  },
  {
    id: 'type',
    header: 'Type',
    cell: (item: any) => item.type,
    sortingField: 'type',
  },
  {
    id: 'status',
    header: 'Status',
    cell: (item: any) => item.status,
    sortingField: 'status',
  },
  {
    id: 'location',
    header: 'Location',
    cell: (item: any) => item.location,
    sortingField: 'location',
  },
  {
    id: 'lastSeen',
    header: 'Last Seen',
    cell: (item: any) => item.lastSeen,
    sortingField: 'lastSeen',
  },
];

export function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteringText, setFilteringText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [isAlertVisible, setIsAlertVisible] = useState(true);

  const filteredItems = deviceTableData.filter(
    item =>
      item.name.toLowerCase().includes(filteringText.toLowerCase()) ||
      item.type.toLowerCase().includes(filteringText.toLowerCase()) ||
      item.status.toLowerCase().includes(filteringText.toLowerCase()) ||
      item.location.toLowerCase().includes(filteringText.toLowerCase()),
  );

  const pageSize = 10;
  const paginatedItems = filteredItems.slice((currentPageIndex - 1) * pageSize, currentPageIndex * pageSize);

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
            <Header
              variant="h1"
              description="Network Traffic, Credit Usage, and Your Devices"
              actions={
                <Button variant="primary" iconName="external">
                  Refresh Data
                </Button>
              }
            >
              Network Administration Dashboard
            </Header>
          }
        >
          <SpaceBetween size="l">
            {/* Search and Pagination Controls */}
            <Container>
              <Grid gridDefinition={[{ colspan: 8 }, { colspan: 4 }]}>
                <TextFilter
                  filteringText={filteringText}
                  filteringPlaceholder="Placeholder"
                  filteringAriaLabel="Filter devices"
                  onChange={({ detail }) => {
                    setFilteringText(detail.filteringText);
                    setCurrentPageIndex(1);
                  }}
                />
                <Box textAlign="right">
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    pagesCount={Math.ceil(filteredItems.length / pageSize)}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  />
                </Box>
              </Grid>
            </Container>

            {/* Alert Banner */}
            {isAlertVisible && (
              <Alert
                type="warning"
                dismissible
                onDismiss={() => setIsAlertVisible(false)}
                action={
                  <Button onClick={() => setIsAlertVisible(false)} variant="link">
                    Dismiss
                  </Button>
                }
              >
                This is a warning message
              </Alert>
            )}

            {/* Charts Grid */}
            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              {/* Network Traffic Chart */}
              <Container header={<Header variant="h2">Network traffic</Header>}>
                <LineChart
                  series={networkTrafficSeries}
                  xDomain={networkTrafficData.map(item => item.day)}
                  yDomain={[0, 200]}
                  height={300}
                  hideFilter
                  hideLegend={false}
                  xTitle="Day"
                  yTitle=""
                  ariaLabel="Network traffic line chart"
                  statusType="finished"
                  xScaleType="categorical"
                />
              </Container>

              {/* Credit Usage Chart */}
              <Container header={<Header variant="h2">Credit Usage</Header>}>
                <BarChart
                  series={creditUsageSeries}
                  xDomain={creditUsageData.map(item => item.day)}
                  yDomain={[0, 100]}
                  height={300}
                  hideFilter
                  hideLegend={false}
                  xTitle="Day"
                  yTitle=""
                  ariaLabel="Credit usage bar chart"
                  statusType="finished"
                />
              </Container>
            </Grid>

            {/* Devices Table */}
            <Container
              header={
                <Header
                  variant="h2"
                  description="Devices on your local network"
                  actions={
                    <Button variant="primary" iconName="external">
                      Add Device
                    </Button>
                  }
                >
                  My Devices
                </Header>
              }
            >
              <Table
                columnDefinitions={columnDefinitions}
                items={paginatedItems}
                loadingText="Loading devices"
                sortingDisabled
                variant="borderless"
                selectionType="multi"
                selectedItems={selectedItems}
                onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
                header={
                  <Header
                    counter={`(${filteredItems.length})`}
                    actions={
                      <SpaceBetween direction="horizontal" size="xs">
                        <Button disabled={selectedItems.length === 0}>Edit</Button>
                        <Button disabled={selectedItems.length === 0}>Delete</Button>
                      </SpaceBetween>
                    }
                  >
                    Devices
                  </Header>
                }
                footer={
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    pagesCount={Math.ceil(filteredItems.length / pageSize)}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  />
                }
                empty={
                  <Box textAlign="center" color="inherit">
                    <b>No devices</b>
                    <Box variant="p" color="inherit">
                      No devices to display.
                    </Box>
                  </Box>
                }
              />
            </Container>
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
