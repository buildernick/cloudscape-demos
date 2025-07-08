// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Box from '@cloudscape-design/components/box';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Flashbar from '@cloudscape-design/components/flashbar';

// Mock data for the charts
const networkTrafficData = [
  { x: 'x1', y: 15 },
  { x: 'x2', y: 25 },
  { x: 'x3', y: 22 },
  { x: 'x4', y: 18 },
  { x: 'x5', y: 28 },
  { x: 'x6', y: 35 },
  { x: 'x7', y: 32 },
  { x: 'x8', y: 29 },
  { x: 'x9', y: 33 },
  { x: 'x10', y: 38 },
  { x: 'x11', y: 42 },
  { x: 'x12', y: 40 },
];

const networkTrafficSeries2 = [
  { x: 'x1', y: 25 },
  { x: 'x2', y: 35 },
  { x: 'x3', y: 30 },
  { x: 'x4', y: 28 },
  { x: 'x5', y: 38 },
  { x: 'x6', y: 45 },
  { x: 'x7', y: 42 },
  { x: 'x8', y: 39 },
  { x: 'x9', y: 43 },
  { x: 'x10', y: 48 },
  { x: 'x11', y: 52 },
  { x: 'x12', y: 50 },
];

const creditUsageData = [
  { x: 'x1', y: 65 },
  { x: 'x2', y: 95 },
  { x: 'x3', y: 85 },
  { x: 'x4', y: 45 },
  { x: 'x5', y: 78 },
];

// Mock data for the devices table
const deviceData = [
  {
    id: '1',
    deviceName: 'Router-01',
    deviceType: 'Router',
    ipAddress: '192.168.1.1',
    status: 'Active',
    location: 'Building A',
    lastSeen: '2 minutes ago',
    bandwidth: '1 Gbps',
  },
  {
    id: '2',
    deviceName: 'Switch-03',
    deviceType: 'Switch',
    ipAddress: '192.168.1.10',
    status: 'Active',
    location: 'Building B',
    lastSeen: '5 minutes ago',
    bandwidth: '10 Gbps',
  },
  {
    id: '3',
    deviceName: 'AP-Floor2',
    deviceType: 'Access Point',
    ipAddress: '192.168.1.25',
    status: 'Inactive',
    location: 'Floor 2',
    lastSeen: '2 hours ago',
    bandwidth: '300 Mbps',
  },
  {
    id: '4',
    deviceName: 'Firewall-01',
    deviceType: 'Firewall',
    ipAddress: '192.168.1.5',
    status: 'Active',
    location: 'Server Room',
    lastSeen: '1 minute ago',
    bandwidth: '5 Gbps',
  },
  {
    id: '5',
    deviceName: 'Router-02',
    deviceType: 'Router',
    ipAddress: '192.168.1.2',
    status: 'Warning',
    location: 'Building C',
    lastSeen: '15 minutes ago',
    bandwidth: '1 Gbps',
  },
  {
    id: '6',
    deviceName: 'Switch-04',
    deviceType: 'Switch',
    ipAddress: '192.168.1.11',
    status: 'Active',
    location: 'Floor 3',
    lastSeen: '3 minutes ago',
    bandwidth: '10 Gbps',
  },
  {
    id: '7',
    deviceName: 'AP-Reception',
    deviceType: 'Access Point',
    ipAddress: '192.168.1.30',
    status: 'Active',
    location: 'Reception',
    lastSeen: '1 minute ago',
    bandwidth: '300 Mbps',
  },
  {
    id: '8',
    deviceName: 'Printer-HP1',
    deviceType: 'Printer',
    ipAddress: '192.168.1.50',
    status: 'Active',
    location: 'Office A',
    lastSeen: '10 minutes ago',
    bandwidth: '100 Mbps',
  },
  {
    id: '9',
    deviceName: 'Server-DB1',
    deviceType: 'Server',
    ipAddress: '192.168.1.100',
    status: 'Active',
    location: 'Server Room',
    lastSeen: '30 seconds ago',
    bandwidth: '10 Gbps',
  },
  {
    id: '10',
    deviceName: 'Camera-01',
    deviceType: 'Security Camera',
    ipAddress: '192.168.1.200',
    status: 'Active',
    location: 'Entrance',
    lastSeen: '5 minutes ago',
    bandwidth: '100 Mbps',
  },
  {
    id: '11',
    deviceName: 'Workstation-IT1',
    deviceType: 'Workstation',
    ipAddress: '192.168.1.150',
    status: 'Active',
    location: 'IT Department',
    lastSeen: '2 minutes ago',
    bandwidth: '1 Gbps',
  },
  {
    id: '12',
    deviceName: 'UPS-Main',
    deviceType: 'UPS',
    ipAddress: '192.168.1.250',
    status: 'Warning',
    location: 'Server Room',
    lastSeen: '1 hour ago',
    bandwidth: '10 Mbps',
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
    id: 'deviceType',
    header: 'Device Type',
    cell: (item: any) => item.deviceType,
    sortingField: 'deviceType',
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
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [showWarning, setShowWarning] = useState(true);

  const filteredItems = deviceData.filter(
    item =>
      item.deviceName.toLowerCase().includes(filterText.toLowerCase()) ||
      item.deviceType.toLowerCase().includes(filterText.toLowerCase()) ||
      item.ipAddress.includes(filterText),
  );

  return (
    <AppLayout
      navigationHide
      toolsHide
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <BreadcrumbGroup
                items={[
                  { text: 'Service', href: '/' },
                  { text: 'Administrative Dashboard', href: '#' },
                ]}
                ariaLabel="Breadcrumbs"
              />

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

              <SpaceBetween size="m" direction="horizontal">
                <Grid gridDefinition={[{ colspan: { default: 12, xs: 12, s: 12, m: 8, l: 8, xl: 8 } }]}>
                  <TextFilter
                    filteringText={filterText}
                    filteringPlaceholder="Placeholder"
                    filteringAriaLabel="Filter devices"
                    onChange={({ detail }) => setFilterText(detail.filteringText)}
                  />
                </Grid>

                <Pagination
                  currentPageIndex={1}
                  pagesCount={5}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                  }}
                />
              </SpaceBetween>
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {showWarning && (
              <Flashbar
                items={[
                  {
                    type: 'warning',
                    content: 'This is a warning message',
                    dismissible: true,
                    onDismiss: () => setShowWarning(false),
                    buttonText: 'Dismiss',
                  },
                ]}
              />
            )}

            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              <Container header={<Header variant="h2">Network traffic</Header>}>
                <AreaChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'area',
                      data: networkTrafficData,
                      color: '#688AE8',
                    },
                    {
                      title: 'Site 2',
                      type: 'area',
                      data: networkTrafficSeries2,
                      color: '#C33D69',
                    },
                  ]}
                  xDomain={networkTrafficData.map(point => point.x)}
                  yDomain={[0, 60]}
                  height={300}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle=""
                  hideFilter
                  hideLegend={false}
                  statusType="finished"
                  empty={<Box textAlign="center">No data available</Box>}
                  noMatch={<Box textAlign="center">No matching data</Box>}
                  additionalFilters={
                    <SpaceBetween size="xs" direction="horizontal">
                      <Box fontSize="body-s" color="text-status-info">
                        Performance goal
                      </Box>
                    </SpaceBetween>
                  }
                />
              </Container>

              <Container header={<Header variant="h2">Credit Usage</Header>}>
                <BarChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'bar',
                      data: creditUsageData,
                      color: '#688AE8',
                    },
                  ]}
                  xDomain={creditUsageData.map(point => point.x)}
                  yDomain={[0, 100]}
                  height={300}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle=""
                  hideFilter
                  hideLegend={false}
                  statusType="finished"
                  empty={<Box textAlign="center">No data available</Box>}
                  noMatch={<Box textAlign="center">No matching data</Box>}
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
                items={filteredItems}
                loadingText="Loading devices"
                sortingDisabled
                variant="borderless"
                selectionType="multi"
                selectedItems={selectedItems}
                onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
                empty={
                  <Box textAlign="center" color="inherit">
                    <Box variant="p" color="inherit">
                      No devices found
                    </Box>
                  </Box>
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
        </ContentLayout>
      }
    />
  );
}
