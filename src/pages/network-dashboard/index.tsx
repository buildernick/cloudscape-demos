// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Container from '@cloudscape-design/components/container';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import Grid from '@cloudscape-design/components/grid';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Flashbar from '@cloudscape-design/components/flashbar';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import './network-dashboard.scss';

// Mock data for network traffic chart
const networkTrafficData = [
  { x: new Date(2024, 0, 1), y: 35 },
  { x: new Date(2024, 0, 2), y: 42 },
  { x: new Date(2024, 0, 3), y: 38 },
  { x: new Date(2024, 0, 4), y: 45 },
  { x: new Date(2024, 0, 5), y: 40 },
  { x: new Date(2024, 0, 6), y: 52 },
  { x: new Date(2024, 0, 7), y: 48 },
  { x: new Date(2024, 0, 8), y: 55 },
  { x: new Date(2024, 0, 9), y: 50 },
  { x: new Date(2024, 0, 10), y: 62 },
  { x: new Date(2024, 0, 11), y: 58 },
  { x: new Date(2024, 0, 12), y: 65 },
];

const networkTrafficSeries = [
  {
    title: 'Site 1',
    type: 'area',
    data: networkTrafficData.map(d => ({ x: d.x, y: d.y * 0.6 })),
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area',
    data: networkTrafficData.map(d => ({ x: d.x, y: d.y * 0.4 })),
    color: '#C33D69',
  },
];

// Mock data for credit usage chart
const creditUsageData = [
  { x: 'x1', y: 183 },
  { x: 'x2', y: 257 },
  { x: 'x3', y: 213 },
  { x: 'x4', y: 122 },
  { x: 'x5', y: 210 },
];

// Mock data for devices table
const devicesData = [
  {
    id: '1',
    deviceName: 'Router-001',
    ipAddress: '192.168.1.1',
    deviceType: 'Router',
    status: 'Active',
    location: 'Server Room A',
    lastSeen: '2024-12-19 10:30 AM',
    macAddress: '00:1B:44:11:3A:B7',
  },
  {
    id: '2',
    deviceName: 'Switch-012',
    ipAddress: '192.168.1.10',
    deviceType: 'Switch',
    status: 'Active',
    location: 'Server Room A',
    lastSeen: '2024-12-19 10:25 AM',
    macAddress: '00:1B:44:11:3A:B8',
  },
  {
    id: '3',
    deviceName: 'AP-WiFi-03',
    ipAddress: '192.168.1.25',
    deviceType: 'Access Point',
    status: 'Inactive',
    location: 'Floor 2 East',
    lastSeen: '2024-12-19 09:45 AM',
    macAddress: '00:1B:44:11:3A:B9',
  },
  {
    id: '4',
    deviceName: 'Firewall-Main',
    ipAddress: '192.168.1.2',
    deviceType: 'Firewall',
    status: 'Active',
    location: 'Server Room B',
    lastSeen: '2024-12-19 10:32 AM',
    macAddress: '00:1B:44:11:3A:BA',
  },
  {
    id: '5',
    deviceName: 'Camera-001',
    ipAddress: '192.168.1.100',
    deviceType: 'IP Camera',
    status: 'Active',
    location: 'Entrance',
    lastSeen: '2024-12-19 10:28 AM',
    macAddress: '00:1B:44:11:3A:BB',
  },
  {
    id: '6',
    deviceName: 'Printer-HP01',
    ipAddress: '192.168.1.50',
    deviceType: 'Printer',
    status: 'Active',
    location: 'Office Floor 1',
    lastSeen: '2024-12-19 10:15 AM',
    macAddress: '00:1B:44:11:3A:BC',
  },
  {
    id: '7',
    deviceName: 'NAS-Storage',
    ipAddress: '192.168.1.200',
    deviceType: 'NAS',
    status: 'Active',
    location: 'Server Room C',
    lastSeen: '2024-12-19 10:31 AM',
    macAddress: '00:1B:44:11:3A:BD',
  },
  {
    id: '8',
    deviceName: 'IoT-Sensor-01',
    ipAddress: '192.168.1.150',
    deviceType: 'IoT Sensor',
    status: 'Active',
    location: 'Conference Room',
    lastSeen: '2024-12-19 10:20 AM',
    macAddress: '00:1B:44:11:3A:BE',
  },
  {
    id: '9',
    deviceName: 'VoIP-Phone-05',
    ipAddress: '192.168.1.75',
    deviceType: 'VoIP Phone',
    status: 'Inactive',
    location: 'Office Floor 2',
    lastSeen: '2024-12-19 08:30 AM',
    macAddress: '00:1B:44:11:3A:BF',
  },
  {
    id: '10',
    deviceName: 'UPS-Battery',
    ipAddress: '192.168.1.5',
    deviceType: 'UPS',
    status: 'Active',
    location: 'Server Room A',
    lastSeen: '2024-12-19 10:29 AM',
    macAddress: '00:1B:44:11:3A:C0',
  },
];

const columnDefinitions = [
  {
    id: 'deviceName',
    header: 'Device Name',
    cell: (item: any) => item.deviceName,
    sortingField: 'deviceName',
    width: 150,
  },
  {
    id: 'ipAddress',
    header: 'IP Address',
    cell: (item: any) => item.ipAddress,
    sortingField: 'ipAddress',
    width: 130,
  },
  {
    id: 'deviceType',
    header: 'Device Type',
    cell: (item: any) => item.deviceType,
    sortingField: 'deviceType',
    width: 120,
  },
  {
    id: 'status',
    header: 'Status',
    cell: (item: any) => (
      <Box color={item.status === 'Active' ? 'text-status-success' : 'text-status-error'}>{item.status}</Box>
    ),
    sortingField: 'status',
    width: 100,
  },
  {
    id: 'location',
    header: 'Location',
    cell: (item: any) => item.location,
    sortingField: 'location',
    width: 150,
  },
  {
    id: 'lastSeen',
    header: 'Last Seen',
    cell: (item: any) => item.lastSeen,
    sortingField: 'lastSeen',
    width: 160,
  },
  {
    id: 'macAddress',
    header: 'MAC Address',
    cell: (item: any) => item.macAddress,
    sortingField: 'macAddress',
    width: 150,
  },
];

export default function NetworkDashboard() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [showWarning, setShowWarning] = useState(true);
  const itemsPerPage = 10;

  // Filter devices based on search text
  const filteredDevices = devicesData.filter(device =>
    Object.values(device).some(value => value.toString().toLowerCase().includes(filterText.toLowerCase())),
  );

  // Paginate the filtered devices
  const paginatedDevices = filteredDevices.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage,
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
                  { text: 'Service', href: '#' },
                  { text: 'Administrative Dashboard', href: '#' },
                ]}
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
              <Grid
                gridDefinition={[
                  { colspan: { default: 12, xs: 12, s: 12, m: 8, l: 8, xl: 8 } },
                  { colspan: { default: 12, xs: 12, s: 12, m: 4, l: 4, xl: 4 } },
                ]}
              >
                <TextFilter
                  filteringText={filterText}
                  filteringPlaceholder="Placeholder"
                  filteringAriaLabel="Filter devices"
                  onChange={({ detail }) => {
                    setFilterText(detail.filteringText);
                    setCurrentPageIndex(1);
                  }}
                />
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
              </Grid>
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
                    dismissLabel: 'Dismiss',
                  },
                ]}
              />
            )}

            <ColumnLayout columns={2} borders="vertical">
              <Container header={<Header variant="h2">Network traffic</Header>}>
                <AreaChart
                  series={networkTrafficSeries}
                  xDomain={[new Date(2024, 0, 1), new Date(2024, 0, 12)]}
                  yDomain={[0, 100]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xTickFormatter: e =>
                      e
                        .toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          timeZone: 'UTC',
                        })
                        .split(',')
                        .join('\n'),
                    yTickFormatter: function numberFormatter(e) {
                      return Math.abs(e) >= 1e9
                        ? (e / 1e9).toFixed(1).replace(/\.0$/, '') + 'G'
                        : Math.abs(e) >= 1e6
                          ? (e / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
                          : Math.abs(e) >= 1e3
                            ? (e / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'
                            : e.toFixed(2);
                    },
                  }}
                  ariaLabel="Network traffic area chart"
                  errorText="Error loading data."
                  height={300}
                  hideFilter
                  hideLegend={false}
                  loadingText="Loading chart"
                  recoveryText="Retry"
                  xScaleType="time"
                  xTitle="Day"
                  yTitle=""
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
                        Try different filter settings
                      </Box>
                    </Box>
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
                  xDomain={creditUsageData.map(d => d.x)}
                  yDomain={[0, 300]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    yTickFormatter: function numberFormatter(e) {
                      return Math.abs(e) >= 1e9
                        ? (e / 1e9).toFixed(1).replace(/\.0$/, '') + 'G'
                        : Math.abs(e) >= 1e6
                          ? (e / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
                          : Math.abs(e) >= 1e3
                            ? (e / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'
                            : e.toFixed(2);
                    },
                  }}
                  ariaLabel="Credit usage bar chart"
                  errorText="Error loading data."
                  height={300}
                  hideFilter
                  hideLegend={false}
                  loadingText="Loading chart"
                  recoveryText="Retry"
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle=""
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
                        Try different filter settings
                      </Box>
                    </Box>
                  }
                />
              </Container>
            </ColumnLayout>

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
                items={paginatedDevices}
                loadingText="Loading devices"
                selectedItems={selectedItems}
                onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
                selectionType="multi"
                trackBy="id"
                empty={
                  <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
                    <b>No devices</b>
                    <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                      No devices to display.
                    </Box>
                    <Button>Add device</Button>
                  </Box>
                }
                filter={
                  <TextFilter
                    filteringText={filterText}
                    onChange={({ detail }) => {
                      setFilterText(detail.filteringText);
                      setCurrentPageIndex(1);
                    }}
                    filteringPlaceholder="Find devices"
                    filteringAriaLabel="Filter devices"
                    countText={`${filteredDevices.length} matches`}
                  />
                }
                header={
                  <Header
                    counter={
                      selectedItems.length
                        ? `(${selectedItems.length}/${filteredDevices.length})`
                        : `(${filteredDevices.length})`
                    }
                  >
                    Devices
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
              />
            </Container>
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
