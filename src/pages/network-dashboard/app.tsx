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
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';

// Mock data for network traffic (area chart)
const networkTrafficData = [
  { 
    title: 'Site 1',
    type: 'area',
    data: [
      { x: new Date('2024-01-01'), y: 25 },
      { x: new Date('2024-01-02'), y: 45 },
      { x: new Date('2024-01-03'), y: 35 },
      { x: new Date('2024-01-04'), y: 55 },
      { x: new Date('2024-01-05'), y: 40 },
      { x: new Date('2024-01-06'), y: 65 },
      { x: new Date('2024-01-07'), y: 50 },
      { x: new Date('2024-01-08'), y: 70 },
      { x: new Date('2024-01-09'), y: 60 },
      { x: new Date('2024-01-10'), y: 80 },
      { x: new Date('2024-01-11'), y: 75 },
      { x: new Date('2024-01-12'), y: 85 }
    ]
  },
  { 
    title: 'Site 2',
    type: 'area',
    data: [
      { x: new Date('2024-01-01'), y: 15 },
      { x: new Date('2024-01-02'), y: 25 },
      { x: new Date('2024-01-03'), y: 20 },
      { x: new Date('2024-01-04'), y: 30 },
      { x: new Date('2024-01-05'), y: 25 },
      { x: new Date('2024-01-06'), y: 35 },
      { x: new Date('2024-01-07'), y: 30 },
      { x: new Date('2024-01-08'), y: 40 },
      { x: new Date('2024-01-09'), y: 35 },
      { x: new Date('2024-01-10'), y: 45 },
      { x: new Date('2024-01-11'), y: 40 },
      { x: new Date('2024-01-12'), y: 50 }
    ]
  }
];

// Mock data for credit usage (bar chart)
const creditUsageData = [
  { x: 'Day 1', y: 75 },
  { x: 'Day 2', y: 100 },
  { x: 'Day 3', y: 85 },
  { x: 'Day 4', y: 45 },
  { x: 'Day 5', y: 90 }
];

// Mock data for devices table
const devicesData = [
  {
    id: '1',
    deviceName: 'Router-Main',
    ipAddress: '192.168.1.1',
    deviceType: 'Router',
    status: 'Online',
    lastSeen: '2 minutes ago',
    bandwidth: '1 Gbps',
    location: 'Data Center A'
  },
  {
    id: '2', 
    deviceName: 'Switch-Floor1',
    ipAddress: '192.168.1.10',
    deviceType: 'Switch',
    status: 'Online',
    lastSeen: '5 minutes ago',
    bandwidth: '10 Gbps',
    location: 'Floor 1'
  },
  {
    id: '3',
    deviceName: 'AP-Office',
    ipAddress: '192.168.1.50',
    deviceType: 'Access Point',
    status: 'Offline',
    lastSeen: '2 hours ago',
    bandwidth: '300 Mbps',
    location: 'Office Wing'
  },
  {
    id: '4',
    deviceName: 'Server-DB1',
    ipAddress: '192.168.1.100',
    deviceType: 'Server',
    status: 'Online',
    lastSeen: '1 minute ago',
    bandwidth: '10 Gbps',
    location: 'Data Center A'
  },
  {
    id: '5',
    deviceName: 'Firewall-DMZ',
    ipAddress: '192.168.1.5',
    deviceType: 'Firewall',
    status: 'Online',
    lastSeen: '3 minutes ago',
    bandwidth: '5 Gbps',
    location: 'DMZ'
  }
];

const columnDefinitions = [
  {
    id: 'deviceName',
    header: 'Device Name',
    cell: (item: any) => item.deviceName,
    sortingField: 'deviceName'
  },
  {
    id: 'ipAddress',
    header: 'IP Address',
    cell: (item: any) => item.ipAddress,
    sortingField: 'ipAddress'
  },
  {
    id: 'deviceType',
    header: 'Device Type',
    cell: (item: any) => item.deviceType,
    sortingField: 'deviceType'
  },
  {
    id: 'status',
    header: 'Status',
    cell: (item: any) => item.status,
    sortingField: 'status'
  },
  {
    id: 'lastSeen',
    header: 'Last Seen',
    cell: (item: any) => item.lastSeen,
    sortingField: 'lastSeen'
  },
  {
    id: 'bandwidth',
    header: 'Bandwidth',
    cell: (item: any) => item.bandwidth,
    sortingField: 'bandwidth'
  },
  {
    id: 'location',
    header: 'Location',
    cell: (item: any) => item.location,
    sortingField: 'location'
  }
];

export function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [warningDismissed, setWarningDismissed] = useState(false);
  const itemsPerPage = 10;

  // Filter devices based on search text
  const filteredDevices = devicesData.filter(device =>
    device.deviceName.toLowerCase().includes(filterText.toLowerCase()) ||
    device.ipAddress.includes(filterText) ||
    device.deviceType.toLowerCase().includes(filterText.toLowerCase()) ||
    device.status.toLowerCase().includes(filterText.toLowerCase())
  );

  // Paginate filtered devices
  const paginatedDevices = filteredDevices.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage
  );

  const breadcrumbItems = [
    { text: 'Service', href: '#' },
    { text: 'Administrative Dashboard', href: '#' }
  ];

  const flashbarItems = warningDismissed ? [] : [
    {
      type: 'warning' as const,
      content: 'This is a warning message',
      dismissible: true,
      onDismiss: () => setWarningDismissed(true),
      buttonText: 'Dismiss'
    }
  ];

  return (
    <AppLayout
      navigationHide
      toolsHide
      breadcrumbs={<BreadcrumbGroup items={breadcrumbItems} />}
      notifications={<Flashbar items={flashbarItems} />}
      content={
        <ContentLayout
          header={
            <Header
              variant="h1"
              description="Network Traffic, Credit Usage, and Your Devices"
              actions={
                <Button 
                  variant="primary" 
                  iconAlign="right" 
                  iconName="external"
                  onClick={() => window.location.reload()}
                >
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
              <SpaceBetween direction="horizontal" size="l">
                <TextFilter
                  filteringText={filterText}
                  filteringPlaceholder="Placeholder"
                  onChange={({ detail }) => setFilterText(detail.filteringText)}
                />
                <Pagination
                  currentPageIndex={currentPageIndex}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  pagesCount={Math.ceil(filteredDevices.length / itemsPerPage)}
                />
              </SpaceBetween>
            </Container>

            {/* Charts Section */}
            <Grid
              gridDefinition={[
                { colspan: { default: 12, xxs: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
                { colspan: { default: 12, xxs: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } }
              ]}
            >
              {/* Network Traffic Chart */}
              <Container
                header={
                  <Header variant="h2">
                    Network traffic
                  </Header>
                }
              >
                <AreaChart
                  series={networkTrafficData}
                  xDomain={[new Date('2024-01-01'), new Date('2024-01-12')]}
                  yDomain={[0, 100]}
                  height={300}
                  xScaleType="time"
                  xTitle="Day"
                  yTitle=""
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart'
                  }}
                  hideFilter
                  fitHeight
                />
              </Container>

              {/* Credit Usage Chart */}
              <Container
                header={
                  <Header variant="h2">
                    Credit Usage
                  </Header>
                }
              >
                <BarChart
                  series={[{
                    title: 'Site 1',
                    type: 'bar',
                    data: creditUsageData
                  }]}
                  xDomain={creditUsageData.map(d => d.x)}
                  yDomain={[0, 120]}
                  height={300}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle=""
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart'
                  }}
                  hideFilter
                  fitHeight
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
                    <Button 
                      variant="primary" 
                      iconAlign="right" 
                      iconName="external"
                    >
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
                items={paginatedDevices}
                selection={{
                  type: 'multi',
                  selectedItems,
                  onSelectionChange: ({ detail }) => setSelectedItems(detail.selectedItems)
                }}
                sortingDisabled
                variant="borderless"
                trackBy="id"
                empty={
                  <Box textAlign="center" color="inherit">
                    <b>No devices</b>
                    <Box variant="p" color="inherit">
                      No devices found.
                    </Box>
                  </Box>
                }
                header={
                  <Header counter={filteredDevices.length > 0 ? `(${filteredDevices.length})` : undefined}>
                    Network Devices
                  </Header>
                }
              />
            </Container>
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
