// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState, useEffect } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Flashbar from '@cloudscape-design/components/flashbar';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import Grid from '@cloudscape-design/components/grid';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Toggle from '@cloudscape-design/components/toggle';

import * as localStorage from '../../common/local-storage';
import '@cloudscape-design/global-styles/dark-mode-utils.css';

// Network traffic data — 12 days
const DAYS = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12'];
const CREDIT_DAYS = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'];

const networkTrafficSite1 = [30, 38, 45, 50, 42, 55, 60, 58, 63, 70, 65, 68];
const networkTrafficSite2 = [20, 28, 35, 40, 50, 45, 55, 60, 52, 58, 62, 55];
const networkPerformanceGoal = 45;

const creditUsageSite1 = [42, 58, 48, 32, 47];
const creditPerformanceGoal = 40;

const networkAreaSeries = [
  {
    title: 'Site 1',
    type: 'area' as const,
    data: DAYS.map((day, i) => ({ x: day, y: networkTrafficSite1[i] })),
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area' as const,
    data: DAYS.map((day, i) => ({ x: day, y: networkTrafficSite2[i] })),
    color: '#C33D69',
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    y: networkPerformanceGoal,
    color: '#5F6B7A',
  },
];

const creditBarSeries = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    data: CREDIT_DAYS.map((day, i) => ({ x: day, y: creditUsageSite1[i] })),
    color: '#688AE8',
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    y: creditPerformanceGoal,
    color: '#5F6B7A',
  },
];

// Device data from UserDataApi
interface Device {
  id: string;
  deviceName: string;
  ipAddress: string;
  macAddress: string;
  deviceType: string;
  status: string;
  lastSeen: string;
  bandwidthUsage: string;
}

const DEVICES: Device[] = [
  { id: 'dev-001', deviceName: 'Router-Core-01', ipAddress: '192.168.1.1', macAddress: 'A4:C3:F0:12:34:56', deviceType: 'Router', status: 'Online', lastSeen: '2024-01-15 10:30', bandwidthUsage: '1.2 GB' },
  { id: 'dev-002', deviceName: 'Switch-Floor2', ipAddress: '192.168.1.2', macAddress: 'B8:27:EB:45:67:89', deviceType: 'Switch', status: 'Online', lastSeen: '2024-01-15 10:29', bandwidthUsage: '856 MB' },
  { id: 'dev-003', deviceName: 'AP-Lobby', ipAddress: '192.168.1.10', macAddress: 'DC:A6:32:78:9A:BC', deviceType: 'Access Point', status: 'Online', lastSeen: '2024-01-15 10:28', bandwidthUsage: '432 MB' },
  { id: 'dev-004', deviceName: 'Server-Prod-01', ipAddress: '192.168.2.100', macAddress: 'E4:5F:01:AB:CD:EF', deviceType: 'Server', status: 'Online', lastSeen: '2024-01-15 10:30', bandwidthUsage: '3.7 GB' },
  { id: 'dev-005', deviceName: 'NAS-Storage-01', ipAddress: '192.168.2.101', macAddress: 'F0:18:98:CD:EF:12', deviceType: 'NAS', status: 'Online', lastSeen: '2024-01-15 10:27', bandwidthUsage: '5.1 GB' },
  { id: 'dev-006', deviceName: 'Firewall-Edge', ipAddress: '10.0.0.1', macAddress: '00:1A:2B:3C:4D:5E', deviceType: 'Firewall', status: 'Online', lastSeen: '2024-01-15 10:30', bandwidthUsage: '8.3 GB' },
  { id: 'dev-007', deviceName: 'Workstation-Dev01', ipAddress: '192.168.3.50', macAddress: '3C:5A:B4:56:78:90', deviceType: 'Workstation', status: 'Offline', lastSeen: '2024-01-14 18:45', bandwidthUsage: '245 MB' },
  { id: 'dev-008', deviceName: 'Printer-HR', ipAddress: '192.168.3.75', macAddress: 'AC:BC:32:90:AB:CD', deviceType: 'Printer', status: 'Idle', lastSeen: '2024-01-15 09:15', bandwidthUsage: '12 MB' },
  { id: 'dev-009', deviceName: 'AP-Conference', ipAddress: '192.168.1.11', macAddress: 'C8:D7:19:BC:DE:F0', deviceType: 'Access Point', status: 'Online', lastSeen: '2024-01-15 10:29', bandwidthUsage: '678 MB' },
  { id: 'dev-010', deviceName: 'Camera-Entrance', ipAddress: '192.168.4.20', macAddress: '5C:CF:7F:DE:F0:12', deviceType: 'IP Camera', status: 'Online', lastSeen: '2024-01-15 10:30', bandwidthUsage: '920 MB' },
  { id: 'dev-011', deviceName: 'VoIP-Phone-101', ipAddress: '192.168.5.101', macAddress: '00:11:22:EF:12:34', deviceType: 'VoIP Phone', status: 'Online', lastSeen: '2024-01-15 10:20', bandwidthUsage: '8 MB' },
  { id: 'dev-012', deviceName: 'Switch-Server-Room', ipAddress: '192.168.2.2', macAddress: '70:4D:7B:12:34:56', deviceType: 'Switch', status: 'Online', lastSeen: '2024-01-15 10:30', bandwidthUsage: '2.4 GB' },
  { id: 'dev-013', deviceName: 'Server-Backup-01', ipAddress: '192.168.2.102', macAddress: '8C:EC:4B:34:56:78', deviceType: 'Server', status: 'Warning', lastSeen: '2024-01-15 10:25', bandwidthUsage: '1.8 GB' },
];

const ITEMS_PER_PAGE = 10;

const commonChartI18n = {
  filterLabel: 'Filter displayed data',
  filterPlaceholder: 'Filter data',
  filterSelectedAriaLabel: 'selected',
  legendAriaLabel: 'Legend',
  chartAriaRoleDescription: 'chart',
  xAxisAriaRoleDescription: 'x axis',
  yAxisAriaRoleDescription: 'y axis',
};

export default function NetworkDashboard() {
  const [warningDismissed, setWarningDismissed] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.load<boolean>('Awsui-Theme-Mode') ?? false;
  });

  useEffect(() => {
    const theme = darkMode ? 'awsui-dark-mode' : 'awsui-light-mode';
    document.body.classList.remove('awsui-dark-mode', 'awsui-light-mode');
    document.body.classList.add(theme);
    localStorage.save('Awsui-Theme-Mode', darkMode);
  }, [darkMode]);

  const filteredDevices = DEVICES.filter(
    device =>
      device.deviceName.toLowerCase().includes(filterText.toLowerCase()) ||
      device.ipAddress.toLowerCase().includes(filterText.toLowerCase()) ||
      device.deviceType.toLowerCase().includes(filterText.toLowerCase()) ||
      device.status.toLowerCase().includes(filterText.toLowerCase()),
  );

  const paginatedDevices = filteredDevices.slice(
    (currentPageIndex - 1) * ITEMS_PER_PAGE,
    currentPageIndex * ITEMS_PER_PAGE,
  );

  const flashItems = warningDismissed
    ? []
    : [
        {
          type: 'error' as const,
          content: 'This is a warning message',
          dismissible: true,
          dismissLabel: 'Dismiss',
          onDismiss: () => setWarningDismissed(true),
          id: 'network-warning',
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
              Network Adminstration Dashboard
            </Header>
          }
        >
          <SpaceBetween size="l">
            {/* Search + Pagination bar */}
            <Grid
              gridDefinition={[
                { colspan: { default: 12, s: 8, m: 9 } },
                { colspan: { default: 12, s: 4, m: 3 } },
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
              <Box float="right">
                <Pagination
                  currentPageIndex={currentPageIndex}
                  pagesCount={Math.ceil(filteredDevices.length / ITEMS_PER_PAGE)}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                  }}
                />
              </Box>
            </Grid>

            {/* Warning flashbar */}
            {!warningDismissed && <Flashbar items={flashItems} />}

            {/* Charts */}
            <Grid
              gridDefinition={[
                { colspan: { default: 12, m: 6 } },
                { colspan: { default: 12, m: 6 } },
              ]}
            >
              {/* Network Traffic Area Chart */}
              <AreaChart
                series={networkAreaSeries}
                xDomain={DAYS}
                yDomain={[0, 80]}
                xScaleType="categorical"
                xTitle="Day"
                yTitle="Traffic (Mbps)"
                hideFilter
                ariaLabel="Network traffic area chart"
                ariaDescription="Area chart showing network traffic for Site 1 and Site 2 over 12 days with a performance goal threshold."
                i18nStrings={{
                  ...commonChartI18n,
                  chartAriaRoleDescription: 'area chart',
                }}
                height={300}
                statusType="finished"
                empty={
                  <Box textAlign="center" color="inherit">
                    <b>No data available</b>
                  </Box>
                }
                noMatch={
                  <Box textAlign="center" color="inherit">
                    <b>No matching data</b>
                  </Box>
                }
              />

              {/* Credit Usage Bar Chart */}
              <BarChart
                series={creditBarSeries}
                xDomain={CREDIT_DAYS}
                yDomain={[0, 70]}
                xScaleType="categorical"
                xTitle="Day"
                yTitle="Credits"
                hideFilter
                ariaLabel="Credit usage bar chart"
                ariaDescription="Bar chart showing credit usage for Site 1 over 5 days with a performance goal threshold."
                i18nStrings={{
                  ...commonChartI18n,
                  chartAriaRoleDescription: 'bar chart',
                }}
                height={300}
                statusType="finished"
                empty={
                  <Box textAlign="center" color="inherit">
                    <b>No data available</b>
                  </Box>
                }
                noMatch={
                  <Box textAlign="center" color="inherit">
                    <b>No matching data</b>
                  </Box>
                }
              />
            </Grid>

            {/* My Devices table */}
            <Table
              columnDefinitions={[
                {
                  id: 'deviceName',
                  header: 'Device Name',
                  cell: item => item.deviceName,
                  sortingField: 'deviceName',
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
                  cell: item => item.status,
                  sortingField: 'status',
                },
                {
                  id: 'lastSeen',
                  header: 'Last Seen',
                  cell: item => item.lastSeen,
                  sortingField: 'lastSeen',
                },
                {
                  id: 'bandwidthUsage',
                  header: 'Bandwidth Usage',
                  cell: item => item.bandwidthUsage,
                  sortingField: 'bandwidthUsage',
                },
              ]}
              items={paginatedDevices}
              selectionType="multi"
              selectedItems={selectedDevices}
              onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
              trackBy="id"
              ariaLabels={{
                selectionGroupLabel: 'Device selection',
                allItemsSelectionLabel: () => 'select all',
                itemSelectionLabel: ({ selectedItems }, item) =>
                  `${item.deviceName} is ${selectedItems.includes(item) ? '' : 'not '}selected`,
              }}
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
              empty={
                <Box textAlign="center" color="inherit" margin={{ top: 'xxl', bottom: 'xxl' }}>
                  <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                    No devices found
                  </Box>
                </Box>
              }
              filter={
                <TextFilter
                  filteringText={filterText}
                  filteringPlaceholder="Search devices"
                  filteringAriaLabel="Filter devices"
                  countText={`${filteredDevices.length} match${filteredDevices.length !== 1 ? 'es' : ''}`}
                  onChange={({ detail }) => {
                    setFilterText(detail.filteringText);
                    setCurrentPageIndex(1);
                  }}
                />
              }
              pagination={
                <Pagination
                  currentPageIndex={currentPageIndex}
                  pagesCount={Math.ceil(filteredDevices.length / ITEMS_PER_PAGE)}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                  }}
                />
              }
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
