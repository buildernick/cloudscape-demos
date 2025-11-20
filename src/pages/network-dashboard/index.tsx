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
import LineChart from '@cloudscape-design/components/line-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import TextFilter from '@cloudscape-design/components/text-filter';

// Sample data for Network Traffic chart
const networkTrafficData = [
  {
    title: 'Site 1',
    type: 'area',
    data: [
      { x: 1, y: 3 },
      { x: 2, y: 3.2 },
      { x: 3, y: 3.3 },
      { x: 4, y: 3.5 },
      { x: 5, y: 3.6 },
      { x: 6, y: 3.8 },
      { x: 7, y: 4 },
      { x: 8, y: 4.2 },
      { x: 9, y: 4.5 },
      { x: 10, y: 5 },
      { x: 11, y: 4.8 },
      { x: 12, y: 3.5 },
    ],
    valueFormatter: (value: number) => `${value.toFixed(1)}`,
  },
  {
    title: 'Site 2',
    type: 'area',
    data: [
      { x: 1, y: 4 },
      { x: 2, y: 4.2 },
      { x: 3, y: 4.5 },
      { x: 4, y: 4.8 },
      { x: 5, y: 5.2 },
      { x: 6, y: 5.5 },
      { x: 7, y: 5.3 },
      { x: 8, y: 5 },
      { x: 9, y: 4.7 },
      { x: 10, y: 4.5 },
      { x: 11, y: 4.2 },
      { x: 12, y: 4 },
    ],
    valueFormatter: (value: number) => `${value.toFixed(1)}`,
  },
];

// Sample data for Credit Usage chart
const creditUsageData = [
  {
    title: 'Site 1',
    type: 'bar',
    data: [
      { x: 1, y: 183 },
      { x: 2, y: 257 },
      { x: 3, y: 213 },
      { x: 4, y: 122 },
      { x: 5, y: 210 },
    ],
    valueFormatter: (value: number) => `${value}`,
  },
];

// Sample data for devices table
interface Device {
  id: string;
  name: string;
  ipAddress: string;
  macAddress: string;
  status: string;
  type: string;
  location: string;
  lastSeen: string;
}

const generateDevices = (): Device[] => {
  const devices: Device[] = [];
  for (let i = 1; i <= 12; i++) {
    devices.push({
      id: `device-${i}`,
      name: `Device ${i}`,
      ipAddress: `192.168.1.${100 + i}`,
      macAddress: `00:1B:44:11:3A:${i.toString(16).padStart(2, '0').toUpperCase()}`,
      status: i % 3 === 0 ? 'Offline' : 'Online',
      type: i % 2 === 0 ? 'Desktop' : 'Mobile',
      location: `Room ${Math.floor((i - 1) / 3) + 1}`,
      lastSeen: `${i} min ago`,
    });
  }
  return devices;
};

export default function NetworkDashboard() {
  const [selectedItems, setSelectedItems] = useState<Device[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [filteringText, setFilteringText] = useState('');
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

  const devices = generateDevices();
  const itemsPerPage = 10;

  const filteredDevices = devices.filter(device =>
    filteringText
      ? device.name.toLowerCase().includes(filteringText.toLowerCase()) ||
        device.ipAddress.includes(filteringText) ||
        device.macAddress.toLowerCase().includes(filteringText.toLowerCase())
      : true,
  );

  const paginatedDevices = filteredDevices.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage,
  );

  return (
    <AppLayout
      navigationHide
      toolsHide
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '/' },
            { text: 'Administrative Dashboard', href: '#' },
          ]}
          ariaLabel="Breadcrumbs"
        />
      }
      content={
        <ContentLayout
          header={
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
          }
        >
          <SpaceBetween size="l">
            {flashbarItems.length > 0 && <Flashbar items={flashbarItems} />}

            <Grid gridDefinition={[{ colspan: { default: 12, s: 6 } }, { colspan: { default: 12, s: 6 } }]}>
              <Container
                header={
                  <Header variant="h2" description="Day">
                    Network traffic
                  </Header>
                }
              >
                <LineChart
                  series={networkTrafficData}
                  xDomain={[1, 12]}
                  yDomain={[0, 6]}
                  height={300}
                  ariaLabel="Network traffic over time"
                  ariaDescription="Area chart showing network traffic for Site 1 and Site 2 over 12 days with a performance goal threshold"
                  xTitle="Day"
                  yTitle="Traffic"
                  legendTitle="Legend"
                  i18nStrings={{
                    xTickFormatter: (value: number) => `x${value}`,
                    yTickFormatter: (value: number) => `y${value}`,
                  }}
                  statusType="finished"
                />
              </Container>

              <Container
                header={
                  <Header variant="h2" description="Day">
                    Credit Usage
                  </Header>
                }
              >
                <BarChart
                  series={creditUsageData}
                  xDomain={[1, 2, 3, 4, 5]}
                  yDomain={[0, 300]}
                  height={300}
                  ariaLabel="Credit usage over time"
                  ariaDescription="Bar chart showing credit usage for Site 1 over 5 days"
                  xTitle="Day"
                  yTitle="Credits"
                  legendTitle="Legend"
                  i18nStrings={{
                    xTickFormatter: (value: number) => `x${value}`,
                    yTickFormatter: (value: number) => `y${value}`,
                  }}
                  statusType="finished"
                />
              </Container>
            </Grid>

            <Table
              columnDefinitions={[
                {
                  id: 'name',
                  header: 'Device Name',
                  cell: (item: Device) => item.name,
                  sortingField: 'name',
                  isRowHeader: true,
                },
                {
                  id: 'ipAddress',
                  header: 'IP Address',
                  cell: (item: Device) => item.ipAddress,
                  sortingField: 'ipAddress',
                },
                {
                  id: 'macAddress',
                  header: 'MAC Address',
                  cell: (item: Device) => item.macAddress,
                  sortingField: 'macAddress',
                },
                {
                  id: 'status',
                  header: 'Status',
                  cell: (item: Device) => item.status,
                  sortingField: 'status',
                },
                {
                  id: 'type',
                  header: 'Type',
                  cell: (item: Device) => item.type,
                  sortingField: 'type',
                },
                {
                  id: 'location',
                  header: 'Location',
                  cell: (item: Device) => item.location,
                  sortingField: 'location',
                },
                {
                  id: 'lastSeen',
                  header: 'Last Seen',
                  cell: (item: Device) => item.lastSeen,
                  sortingField: 'lastSeen',
                },
              ]}
              items={paginatedDevices}
              loadingText="Loading devices"
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
              trackBy="id"
              empty={
                <Box textAlign="center" color="inherit">
                  <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                    <b>No devices</b>
                  </Box>
                  <Box variant="p" color="inherit">
                    No devices found on your local network.
                  </Box>
                </Box>
              }
              filter={
                <TextFilter
                  filteringText={filteringText}
                  filteringPlaceholder="Search devices"
                  filteringAriaLabel="Filter devices"
                  onChange={({ detail }) => {
                    setFilteringText(detail.filteringText);
                    setCurrentPageIndex(1);
                  }}
                />
              }
              header={
                <Header
                  variant="h2"
                  description="Devices on your local network"
                  counter={
                    selectedItems.length > 0 ? `(${selectedItems.length}/${devices.length})` : `(${devices.length})`
                  }
                  actions={
                    <Button variant="primary" iconAlign="right" iconName="external">
                      Add Device
                    </Button>
                  }
                >
                  My Devices
                </Header>
              }
              pagination={
                <Pagination
                  currentPageIndex={currentPageIndex}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  pagesCount={Math.ceil(filteredDevices.length / itemsPerPage)}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                  }}
                />
              }
              ariaLabels={{
                selectionGroupLabel: 'Items selection',
                allItemsSelectionLabel: ({ selectedItems }) =>
                  `${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`,
                itemSelectionLabel: ({ selectedItems }, item) => {
                  const isItemSelected = selectedItems.filter(i => i.id === item.id).length > 0;
                  return `${item.name} is ${isItemSelected ? '' : 'not '}selected`;
                },
              }}
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
