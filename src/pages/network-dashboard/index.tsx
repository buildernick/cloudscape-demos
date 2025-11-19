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
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';
import Box from '@cloudscape-design/components/box';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import '../../styles/network-dashboard.scss';

// Sample data for network traffic (area chart)
const networkTrafficData = [
  {
    title: 'Site 1',
    type: 'area',
    data: [
      { x: 'x1', y: 35 },
      { x: 'x2', y: 42 },
      { x: 'x3', y: 38 },
      { x: 'x4', y: 40 },
      { x: 'x5', y: 35 },
      { x: 'x6', y: 48 },
      { x: 'x7', y: 52 },
      { x: 'x8', y: 50 },
      { x: 'x9', y: 55 },
      { x: 'x10', y: 58 },
      { x: 'x11', y: 60 },
      { x: 'x12', y: 45 },
    ],
  },
  {
    title: 'Site 2',
    type: 'area',
    data: [
      { x: 'x1', y: 25 },
      { x: 'x2', y: 22 },
      { x: 'x3', y: 20 },
      { x: 'x4', y: 18 },
      { x: 'x5', y: 15 },
      { x: 'x6', y: 10 },
      { x: 'x7', y: 12 },
      { x: 'x8', y: 8 },
      { x: 'x9', y: 10 },
      { x: 'x10', y: 6 },
      { x: 'x11', y: 5 },
      { x: 'x12', y: 18 },
    ],
  },
];

// Sample data for credit usage (bar chart)
const creditUsageData = [
  { x: 'x1', y: 60 },
  { x: 'x2', y: 85 },
  { x: 'x3', y: 70 },
  { x: 'x4', y: 40 },
  { x: 'x5', y: 75 },
];

// Sample device data for table
const generateDeviceData = () => {
  const devices = [];
  for (let i = 1; i <= 12; i++) {
    devices.push({
      id: `device-${i}`,
      name: `Device ${i}`,
      ipAddress: `192.168.1.${i + 10}`,
      macAddress: `00:1B:44:11:3A:${i.toString().padStart(2, '0')}`,
      status: i % 3 === 0 ? 'Offline' : 'Online',
      type: i % 2 === 0 ? 'Desktop' : 'Laptop',
      lastSeen: `2024-01-${(i + 10).toString().padStart(2, '0')}`,
      bandwidth: `${Math.floor(Math.random() * 100)} Mbps`,
    });
  }
  return devices;
};

const COLUMN_DEFINITIONS = [
  {
    id: 'name',
    header: 'Device Name',
    cell: (item: any) => item.name,
    sortingField: 'name',
  },
  {
    id: 'ipAddress',
    header: 'IP Address',
    cell: (item: any) => item.ipAddress,
    sortingField: 'ipAddress',
  },
  {
    id: 'macAddress',
    header: 'MAC Address',
    cell: (item: any) => item.macAddress,
  },
  {
    id: 'status',
    header: 'Status',
    cell: (item: any) => item.status,
    sortingField: 'status',
  },
  {
    id: 'type',
    header: 'Device Type',
    cell: (item: any) => item.type,
    sortingField: 'type',
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
  },
];

export default function NetworkDashboard() {
  const [filteringText, setFilteringText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [showWarning, setShowWarning] = useState(true);

  const devices = generateDeviceData();
  const itemsPerPage = 10;

  const filteredDevices = devices.filter(
    device =>
      device.name.toLowerCase().includes(filteringText.toLowerCase()) ||
      device.ipAddress.toLowerCase().includes(filteringText.toLowerCase()) ||
      device.macAddress.toLowerCase().includes(filteringText.toLowerCase()),
  );

  const paginatedDevices = filteredDevices.slice((currentPageIndex - 1) * itemsPerPage, currentPageIndex * itemsPerPage);

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
                <Button variant="primary" iconName="external" iconAlign="right">
                  Refresh Data
                </Button>
              }
            >
              Network Administration Dashboard
            </Header>
          }
        >
          <SpaceBetween size="l">
            {showWarning && (
              <Flashbar
                items={[
                  {
                    type: 'warning',
                    dismissible: true,
                    onDismiss: () => setShowWarning(false),
                    content: 'This is a warning message',
                  },
                ]}
              />
            )}

            <Container
              header={
                <SpaceBetween size="m" direction="horizontal">
                  <Grid gridDefinition={[{ colspan: { default: 12, xs: 8 } }]}>
                    <TextFilter
                      filteringText={filteringText}
                      filteringPlaceholder="Search devices..."
                      filteringAriaLabel="Filter devices"
                      onChange={({ detail }) => setFilteringText(detail.filteringText)}
                    />
                  </Grid>
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                    pagesCount={Math.ceil(filteredDevices.length / itemsPerPage)}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: pageNumber => `Page ${pageNumber}`,
                    }}
                  />
                </SpaceBetween>
              }
            />

            <Grid gridDefinition={[{ colspan: { default: 12, s: 6 } }, { colspan: { default: 12, s: 6 } }]}>
              <Container>
                <AreaChart
                  series={networkTrafficData}
                  xDomain={['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12']}
                  yDomain={[0, 100]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xTickFormatter: e => e,
                    yTickFormatter: e => `y${e}`,
                  }}
                  ariaLabel="Network traffic area chart"
                  height={300}
                  hideFilter
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
                    },
                  ]}
                  xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
                  yDomain={[0, 100]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xTickFormatter: e => e,
                    yTickFormatter: e => `y${e}`,
                  }}
                  ariaLabel="Credit usage bar chart"
                  height={300}
                  hideFilter
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
                columnDefinitions={COLUMN_DEFINITIONS}
                items={paginatedDevices}
                selectionType="multi"
                selectedItems={selectedItems}
                onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
                ariaLabels={{
                  selectionGroupLabel: 'Device selection',
                  allItemsSelectionLabel: ({ selectedItems }) => `${selectedItems.length} devices selected`,
                  itemSelectionLabel: ({ selectedItems }, item) => {
                    const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
                    return `${item.name} is ${isItemSelected ? '' : 'not'} selected`;
                  },
                }}
                trackBy="id"
                empty={
                  <Box textAlign="center" color="inherit">
                    <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                      <b>No devices</b>
                    </Box>
                    <Button>Add device</Button>
                  </Box>
                }
                sortingDisabled
              />
            </Container>
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
