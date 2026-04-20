// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Flashbar from '@cloudscape-design/components/flashbar';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';
import Toggle from '@cloudscape-design/components/toggle';

import * as localStorage from '../../common/local-storage';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

// --- Chart data ---

const networkTrafficDays = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12'];

const site1TrafficData = [
  { x: 'Day 1', y: 42 },
  { x: 'Day 2', y: 58 },
  { x: 'Day 3', y: 65 },
  { x: 'Day 4', y: 71 },
  { x: 'Day 5', y: 69 },
  { x: 'Day 6', y: 78 },
  { x: 'Day 7', y: 74 },
  { x: 'Day 8', y: 80 },
  { x: 'Day 9', y: 76 },
  { x: 'Day 10', y: 82 },
  { x: 'Day 11', y: 79 },
  { x: 'Day 12', y: 85 },
];

const site2TrafficData = [
  { x: 'Day 1', y: 55 },
  { x: 'Day 2', y: 72 },
  { x: 'Day 3', y: 68 },
  { x: 'Day 4', y: 83 },
  { x: 'Day 5', y: 91 },
  { x: 'Day 6', y: 87 },
  { x: 'Day 7', y: 95 },
  { x: 'Day 8', y: 89 },
  { x: 'Day 9', y: 93 },
  { x: 'Day 10', y: 86 },
  { x: 'Day 11', y: 98 },
  { x: 'Day 12', y: 90 },
];

const creditUsageData = [
  { x: 'Day 1', y: 42 },
  { x: 'Day 2', y: 68 },
  { x: 'Day 3', y: 55 },
  { x: 'Day 4', y: 31 },
  { x: 'Day 5', y: 52 },
];

// --- Device table data ---

interface Device {
  name: string;
  ipAddress: string;
  macAddress: string;
  deviceType: string;
  status: 'active' | 'inactive' | 'warning';
  lastSeen: string;
  traffic: string;
  location: string;
}

const allDevices: Device[] = [
  { name: 'Router-Primary', ipAddress: '192.168.1.1', macAddress: 'A1:B2:C3:D4:E5:F6', deviceType: 'Router', status: 'active', lastSeen: '2 min ago', traffic: '245 MB/s', location: 'Server Room A' },
  { name: 'Switch-Core-01', ipAddress: '192.168.1.2', macAddress: 'B2:C3:D4:E5:F6:A1', deviceType: 'Switch', status: 'active', lastSeen: '1 min ago', traffic: '512 MB/s', location: 'Server Room A' },
  { name: 'AP-Floor-1', ipAddress: '192.168.1.10', macAddress: 'C3:D4:E5:F6:A1:B2', deviceType: 'Access Point', status: 'active', lastSeen: '30 sec ago', traffic: '78 MB/s', location: 'Floor 1' },
  { name: 'AP-Floor-2', ipAddress: '192.168.1.11', macAddress: 'D4:E5:F6:A1:B2:C3', deviceType: 'Access Point', status: 'warning', lastSeen: '5 min ago', traffic: '34 MB/s', location: 'Floor 2' },
  { name: 'Firewall-Edge', ipAddress: '10.0.0.1', macAddress: 'E5:F6:A1:B2:C3:D4', deviceType: 'Firewall', status: 'active', lastSeen: '45 sec ago', traffic: '890 MB/s', location: 'DMZ' },
  { name: 'NAS-Storage-01', ipAddress: '192.168.1.20', macAddress: 'F6:A1:B2:C3:D4:E5', deviceType: 'NAS', status: 'active', lastSeen: '2 min ago', traffic: '120 MB/s', location: 'Server Room B' },
  { name: 'Switch-Dist-02', ipAddress: '192.168.1.3', macAddress: 'A2:B3:C4:D5:E6:F7', deviceType: 'Switch', status: 'active', lastSeen: '1 min ago', traffic: '300 MB/s', location: 'Server Room A' },
  { name: 'Printer-HR', ipAddress: '192.168.2.50', macAddress: 'B3:C4:D5:E6:F7:A2', deviceType: 'Printer', status: 'inactive', lastSeen: '2 hours ago', traffic: '0.1 MB/s', location: 'HR Office' },
  { name: 'VoIP-Gateway', ipAddress: '192.168.3.1', macAddress: 'C4:D5:E6:F7:A2:B3', deviceType: 'VoIP', status: 'active', lastSeen: '15 sec ago', traffic: '12 MB/s', location: 'Telecom Room' },
  { name: 'Camera-Lobby', ipAddress: '192.168.4.10', macAddress: 'D5:E6:F7:A2:B3:C4', deviceType: 'IP Camera', status: 'active', lastSeen: '5 sec ago', traffic: '8 MB/s', location: 'Lobby' },
  { name: 'UPS-Monitor-01', ipAddress: '192.168.1.30', macAddress: 'E6:F7:A2:B3:C4:D5', deviceType: 'UPS', status: 'warning', lastSeen: '10 min ago', traffic: '0.5 MB/s', location: 'Server Room A' },
  { name: 'Load-Balancer', ipAddress: '10.0.1.1', macAddress: 'F7:A2:B3:C4:D5:E6', deviceType: 'Load Balancer', status: 'active', lastSeen: '30 sec ago', traffic: '650 MB/s', location: 'DMZ' },
  { name: 'AP-Conference', ipAddress: '192.168.1.15', macAddress: 'A3:B4:C5:D6:E7:F8', deviceType: 'Access Point', status: 'active', lastSeen: '1 min ago', traffic: '55 MB/s', location: 'Conference Room' },
];

const ITEMS_PER_PAGE = 10;

export default function NetworkDashboard() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.load<boolean>('Awsui-Theme-Mode') ?? false;
  });

  const [warningDismissed, setWarningDismissed] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);

  useEffect(() => {
    const theme = darkMode ? 'awsui-dark-mode' : 'awsui-light-mode';
    document.body.classList.remove('awsui-dark-mode', 'awsui-light-mode');
    document.body.classList.add(theme);
    localStorage.save('Awsui-Theme-Mode', darkMode);
  }, [darkMode]);

  const filteredDevices = allDevices.filter(
    device =>
      device.name.toLowerCase().includes(filterText.toLowerCase()) ||
      device.ipAddress.includes(filterText) ||
      device.deviceType.toLowerCase().includes(filterText.toLowerCase()) ||
      device.location.toLowerCase().includes(filterText.toLowerCase()),
  );

  const paginatedDevices = filteredDevices.slice(
    (currentPageIndex - 1) * ITEMS_PER_PAGE,
    currentPageIndex * ITEMS_PER_PAGE,
  );

  const totalPages = Math.ceil(filteredDevices.length / ITEMS_PER_PAGE);

  const flashbarItems = warningDismissed
    ? []
    : [
        {
          type: 'warning' as const,
          content: 'This is a warning message',
          dismissible: true,
          dismissLabel: 'Dismiss',
          onDismiss: () => setWarningDismissed(true),
        },
      ];

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
          ariaLabel="Breadcrumb navigation"
        />
      }
      notifications={<Flashbar items={flashbarItems} />}
      content={
        <ContentLayout
          header={
            <Header
              variant="h1"
              description="Network Traffic, Credit Usage, and Your Devices"
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Toggle
                    checked={darkMode}
                    onChange={({ detail }) => setDarkMode(detail.checked)}
                    ariaLabel="Toggle dark mode"
                  >
                    Dark mode
                  </Toggle>
                  <Button variant="primary" iconAlign="right" iconName="external">
                    Refresh Data
                  </Button>
                </SpaceBetween>
              }
            >
              Network Administration Dashboard
            </Header>
          }
        >
          <SpaceBetween size="l">
            {/* Charts Section */}
            <Grid
              gridDefinition={[
                { colspan: { default: 12, m: 6 } },
                { colspan: { default: 12, m: 6 } },
              ]}
            >
              {/* Network Traffic Area Chart */}
              <AreaChart
                series={[
                  {
                    title: 'Site 1',
                    type: 'area',
                    data: site1TrafficData,
                    color: '#688AE8',
                  },
                  {
                    title: 'Site 2',
                    type: 'area',
                    data: site2TrafficData,
                    color: '#C33D69',
                  },
                  {
                    title: 'Performance goal',
                    type: 'threshold',
                    y: 70,
                    color: '#5F6B7A',
                  },
                ]}
                xDomain={networkTrafficDays}
                yDomain={[0, 120]}
                xScaleType="categorical"
                xTitle="Day"
                yTitle="Traffic (MB/s)"
                ariaLabel="Network traffic area chart"
                ariaDescription="Area chart showing network traffic for Site 1 and Site 2 over 12 days"
                hideFilter
                height={300}
                i18nStrings={{
                  xTickFormatter: val => String(val).replace('Day ', 'x'),
                  filterLabel: 'Filter data series',
                  filterPlaceholder: 'Filter series',
                  filterSelectedAriaLabel: 'selected',
                  legendAriaLabel: 'Legend',
                  chartAriaRoleDescription: 'area chart',
                  detailTotalLabel: 'Total',
                  detailPopoverDismissAriaLabel: 'Dismiss',
                }}
                header={
                  <Header variant="h3">Network traffic</Header>
                }
              />

              {/* Credit Usage Bar Chart */}
              <BarChart
                series={[
                  {
                    title: 'Site 1',
                    type: 'bar',
                    data: creditUsageData,
                    color: '#688AE8',
                  },
                  {
                    title: 'Performance goal',
                    type: 'threshold',
                    y: 50,
                    color: '#5F6B7A',
                  },
                ]}
                xDomain={['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5']}
                yDomain={[0, 80]}
                xScaleType="categorical"
                xTitle="Day"
                yTitle="Credits Used"
                ariaLabel="Credit usage bar chart"
                ariaDescription="Bar chart showing credit usage for Site 1 over 5 days"
                hideFilter
                height={300}
                i18nStrings={{
                  xTickFormatter: (val, index) => `x${index + 1}`,
                  filterLabel: 'Filter data series',
                  filterPlaceholder: 'Filter series',
                  filterSelectedAriaLabel: 'selected',
                  legendAriaLabel: 'Legend',
                  chartAriaRoleDescription: 'bar chart',
                  detailTotalLabel: 'Total',
                  detailPopoverDismissAriaLabel: 'Dismiss',
                }}
                header={
                  <Header variant="h3">Credit Usage</Header>
                }
              />
            </Grid>

            {/* My Devices Table */}
            <Table
              ariaLabels={{
                itemSelectionLabel: (data, row) => `Select ${row.name}`,
                allItemsSelectionLabel: () => 'Select all devices',
                selectionGroupLabel: 'Device selection',
              }}
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
                },
                {
                  id: 'deviceType',
                  header: 'Device Type',
                  cell: item => item.deviceType,
                  sortingField: 'deviceType',
                },
                {
                  id: 'status',
                  header: 'Status',
                  cell: item => (
                    <StatusIndicator type={item.status === 'active' ? 'success' : item.status === 'warning' ? 'warning' : 'stopped'}>
                      {item.status === 'active' ? 'Active' : item.status === 'warning' ? 'Warning' : 'Inactive'}
                    </StatusIndicator>
                  ),
                  sortingField: 'status',
                },
                {
                  id: 'lastSeen',
                  header: 'Last Seen',
                  cell: item => item.lastSeen,
                  sortingField: 'lastSeen',
                },
                {
                  id: 'traffic',
                  header: 'Traffic',
                  cell: item => item.traffic,
                  sortingField: 'traffic',
                },
                {
                  id: 'location',
                  header: 'Location',
                  cell: item => item.location,
                  sortingField: 'location',
                },
              ]}
              items={paginatedDevices}
              selectionType="multi"
              selectedItems={selectedDevices}
              onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
              trackBy="name"
              header={
                <Header
                  variant="h2"
                  description="Devices on your local network"
                  counter={`(${filteredDevices.length})`}
                  actions={
                    <Button variant="primary" iconAlign="right" iconName="external">
                      Add Device
                    </Button>
                  }
                >
                  My Devices
                </Header>
              }
              filter={
                <SpaceBetween direction="horizontal" size="xs" alignItems="center">
                  <TextFilter
                    filteringText={filterText}
                    filteringPlaceholder="Find devices"
                    filteringAriaLabel="Filter devices"
                    countText={`${filteredDevices.length} matches`}
                    onChange={({ detail }) => {
                      setFilterText(detail.filteringText);
                      setCurrentPageIndex(1);
                    }}
                  />
                </SpaceBetween>
              }
              pagination={
                <Pagination
                  currentPageIndex={currentPageIndex}
                  pagesCount={totalPages}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber} of ${totalPages}`,
                  }}
                />
              }
              empty={
                <Box textAlign="center" color="inherit" padding={{ top: 'l', bottom: 'l' }}>
                  <Box variant="h3" padding={{ bottom: 'xs' }}>
                    No devices found
                  </Box>
                  <Box variant="p">Try changing the filter criteria</Box>
                </Box>
              }
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
