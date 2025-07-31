// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import Box from '@cloudscape-design/components/box';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import Alert from '@cloudscape-design/components/alert';
import Pagination from '@cloudscape-design/components/pagination';
import TextFilter from '@cloudscape-design/components/text-filter';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';


const breadcrumbs = [
  {
    text: 'Service',
    href: '#',
  },
  {
    text: 'Administrative Dashboard',
    href: '#',
  },
];

// Sample data for network traffic chart
const networkTrafficSeries = [
  {
    title: 'Site 1',
    type: 'area',
    data: [
      { x: 'x1', y: 3 },
      { x: 'x2', y: 4 },
      { x: 'x3', y: 6 },
      { x: 'x4', y: 8 },
      { x: 'x5', y: 7 },
      { x: 'x6', y: 5 },
      { x: 'x7', y: 4 },
      { x: 'x8', y: 6 },
      { x: 'x9', y: 8 },
      { x: 'x10', y: 9 },
      { x: 'x11', y: 7 },
      { x: 'x12', y: 5 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area',
    data: [
      { x: 'x1', y: 4 },
      { x: 'x2', y: 5 },
      { x: 'x3', y: 4 },
      { x: 'x4', y: 6 },
      { x: 'x5', y: 8 },
      { x: 'x6', y: 7 },
      { x: 'x7', y: 6 },
      { x: 'x8', y: 5 },
      { x: 'x9', y: 7 },
      { x: 'x10', y: 8 },
      { x: 'x11', y: 6 },
      { x: 'x12', y: 4 },
    ],
    color: '#C33D69',
  },
];

// Sample data for credit usage chart
const creditUsageSeries = [
  {
    title: 'Site 1',
    type: 'bar',
    data: [
      { x: 'x1', y: 183 },
      { x: 'x2', y: 257 },
      { x: 'x3', y: 213 },
      { x: 'x4', y: 122 },
      { x: 'x5', y: 210 },
    ],
    color: '#688AE8',
  },
];

const commonChartProps = {
  loadingText: 'Loading chart',
  errorText: 'Error loading data.',
  recoveryText: 'Retry',
  empty: (
    <Box textAlign="center" color="inherit">
      <b>No data available</b>
    </Box>
  ),
  noMatch: (
    <Box textAlign="center" color="inherit">
      <b>No matching data</b>
    </Box>
  ),
  i18nStrings: {
    legendAriaLabel: 'Legend',
    chartAriaRoleDescription: 'chart',
    xAxisAriaRoleDescription: 'x axis',
    yAxisAriaRoleDescription: 'y axis',
    xTickFormatter: (e: any) => e,
    yTickFormatter: (e: any) => `y${e}`,
  },
};

// Sample data for devices table
const deviceData = [
  {
    id: '1',
    deviceName: 'Router-01',
    ipAddress: '192.168.1.1',
    status: 'Online',
    type: 'Router',
    location: 'Building A',
    lastSeen: '2 minutes ago',
    bandwidth: '1 Gbps',
  },
  {
    id: '2',
    deviceName: 'Switch-02',
    ipAddress: '192.168.1.2',
    status: 'Online',
    type: 'Switch',
    location: 'Building A',
    lastSeen: '5 minutes ago',
    bandwidth: '100 Mbps',
  },
  {
    id: '3',
    deviceName: 'AP-03',
    ipAddress: '192.168.1.3',
    status: 'Offline',
    type: 'Access Point',
    location: 'Building B',
    lastSeen: '1 hour ago',
    bandwidth: '300 Mbps',
  },
  {
    id: '4',
    deviceName: 'Router-04',
    ipAddress: '192.168.1.4',
    status: 'Online',
    type: 'Router',
    location: 'Building B',
    lastSeen: '1 minute ago',
    bandwidth: '1 Gbps',
  },
  {
    id: '5',
    deviceName: 'Switch-05',
    ipAddress: '192.168.1.5',
    status: 'Warning',
    type: 'Switch',
    location: 'Building C',
    lastSeen: '10 minutes ago',
    bandwidth: '100 Mbps',
  },
  {
    id: '6',
    deviceName: 'AP-06',
    ipAddress: '192.168.1.6',
    status: 'Online',
    type: 'Access Point',
    location: 'Building C',
    lastSeen: '3 minutes ago',
    bandwidth: '300 Mbps',
  },
  {
    id: '7',
    deviceName: 'Firewall-07',
    ipAddress: '192.168.1.7',
    status: 'Online',
    type: 'Firewall',
    location: 'Data Center',
    lastSeen: '30 seconds ago',
    bandwidth: '10 Gbps',
  },
  {
    id: '8',
    deviceName: 'Router-08',
    ipAddress: '192.168.1.8',
    status: 'Online',
    type: 'Router',
    location: 'Building D',
    lastSeen: '4 minutes ago',
    bandwidth: '1 Gbps',
  },
  {
    id: '9',
    deviceName: 'Switch-09',
    ipAddress: '192.168.1.9',
    status: 'Offline',
    type: 'Switch',
    location: 'Building D',
    lastSeen: '2 hours ago',
    bandwidth: '100 Mbps',
  },
  {
    id: '10',
    deviceName: 'AP-10',
    ipAddress: '192.168.1.10',
    status: 'Online',
    type: 'Access Point',
    location: 'Building E',
    lastSeen: '1 minute ago',
    bandwidth: '300 Mbps',
  },
];

const columnDefinitions = [
  {
    id: 'deviceName',
    header: 'Device Name',
    cell: (item: any) => item.deviceName,
    sortingField: 'deviceName',
  },
  {
    id: 'ipAddress',
    header: 'IP Address',
    cell: (item: any) => item.ipAddress,
    sortingField: 'ipAddress',
  },
  {
    id: 'status',
    header: 'Status',
    cell: (item: any) => item.status,
    sortingField: 'status',
  },
  {
    id: 'type',
    header: 'Type',
    cell: (item: any) => item.type,
    sortingField: 'type',
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
  {
    id: 'bandwidth',
    header: 'Bandwidth',
    cell: (item: any) => item.bandwidth,
    sortingField: 'bandwidth',
  },
];

export function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [filterText, setFilterText] = useState('');

  const filteredItems = deviceData.filter(
    item =>
      item.deviceName.toLowerCase().includes(filterText.toLowerCase()) ||
      item.ipAddress.toLowerCase().includes(filterText.toLowerCase()) ||
      item.type.toLowerCase().includes(filterText.toLowerCase()) ||
      item.location.toLowerCase().includes(filterText.toLowerCase()),
  );

  const paginatedItems = filteredItems.slice((currentPageIndex - 1) * 10, currentPageIndex * 10);

  return (
    <AppLayout
      navigationHide
      toolsHide
      content={
        <SpaceBetween size="l">
          <BreadcrumbGroup items={breadcrumbs} />

          <Alert
            type="warning"
            dismissible
            onDismiss={() => {}}
          >
            This is a warning message
          </Alert>

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

          <SpaceBetween size="m">
            <TextFilter
              filteringText={filterText}
              filteringPlaceholder="Placeholder"
              filteringAriaLabel="Filter devices"
              onChange={({ detail }) => setFilterText(detail.filteringText)}
            />

            <Pagination
              currentPageIndex={1}
              pagesCount={5}
              ariaLabels={{
                nextPageLabel: 'Next page',
                previousPageLabel: 'Previous page',
                pageLabel: pageNumber => `Page ${pageNumber}`,
              }}
            />
          </SpaceBetween>

          <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
            <Container header={<Header variant="h2">Network traffic</Header>}>
              <AreaChart
                {...commonChartProps}
                series={networkTrafficSeries}
                xDomain={['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12']}
                yDomain={[0, 10]}
                ariaLabel="Network traffic area chart"
                height={300}
                xScaleType="categorical"
                xTitle="Day"
                yTitle=""
                i18nStrings={{
                  ...commonChartProps.i18nStrings,
                  chartAriaRoleDescription: 'area chart',
                }}
              />
            </Container>

            <Container header={<Header variant="h2">Credit Usage</Header>}>
              <BarChart
                {...commonChartProps}
                series={creditUsageSeries}
                xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
                yDomain={[0, 300]}
                ariaLabel="Credit usage bar chart"
                height={300}
                xScaleType="categorical"
                xTitle="Day"
                yTitle=""
                i18nStrings={{
                  ...commonChartProps.i18nStrings,
                  chartAriaRoleDescription: 'bar chart',
                  yTickFormatter: (e: any) => `y${Math.floor(e / 50) + 1}`,
                }}
              />
            </Container>
          </Grid>

          <Container
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
          >
            <Table
              columnDefinitions={columnDefinitions}
              items={paginatedItems}
              loadingText="Loading devices"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
              selectionType="multi"
              trackBy="id"
              empty={
                <Box textAlign="center" color="inherit">
                  <Box variant="strong" color="inherit">
                    No devices
                  </Box>
                  <Box variant="p" padding={{ bottom: 's' }} color="inherit">
                    No devices to display.
                  </Box>
                  <Button>Add device</Button>
                </Box>
              }
              filter={
                <TextFilter
                  filteringText={filterText}
                  filteringPlaceholder="Find devices"
                  filteringAriaLabel="Filter devices"
                  onChange={({ detail }) => {
                    setFilterText(detail.filteringText);
                    setCurrentPageIndex(1);
                  }}
                />
              }
              header={
                <Header counter={filteredItems.length > 0 ? `(${filteredItems.length})` : undefined}>
                  Network Devices
                </Header>
              }
              pagination={
                <Pagination
                  currentPageIndex={currentPageIndex}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  pagesCount={Math.ceil(filteredItems.length / 10)}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                  }}
                />
              }
            />
          </Container>
        </SpaceBetween>
      }
    />
  );
}
