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
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Box from '@cloudscape-design/components/box';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Toggle from '@cloudscape-design/components/toggle';

import * as localStorage from '../../common/local-storage';
import '@cloudscape-design/global-styles/dark-mode-utils.css';

// --- Chart Data ---
const networkDays = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12'];

const networkTrafficSite1 = [320, 380, 350, 420, 400, 460, 430, 480, 410, 390, 440, 470];
const networkTrafficSite2 = [280, 310, 370, 340, 390, 420, 450, 400, 370, 410, 380, 500];
const networkPerformanceGoal = 350;

const creditUsageData = [420, 560, 490, 310, 480];
const creditDays = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
const creditPerformanceGoal = 400;

// --- Device Table Data ---
interface Device {
  id: string;
  name: string;
  ipAddress: string;
  macAddress: string;
  type: string;
  status: 'active' | 'inactive' | 'warning';
  lastSeen: string;
  dataUsage: string;
}

const deviceData: Device[] = [
  { id: '1', name: 'Router-Primary', ipAddress: '192.168.1.1', macAddress: 'AA:BB:CC:DD:EE:01', type: 'Router', status: 'active', lastSeen: '2 min ago', dataUsage: '1.2 TB' },
  { id: '2', name: 'Workstation-HQ-01', ipAddress: '192.168.1.101', macAddress: 'AA:BB:CC:DD:EE:02', type: 'Desktop', status: 'active', lastSeen: '5 min ago', dataUsage: '340 GB' },
  { id: '3', name: 'Workstation-HQ-02', ipAddress: '192.168.1.102', macAddress: 'AA:BB:CC:DD:EE:03', type: 'Desktop', status: 'active', lastSeen: '12 min ago', dataUsage: '280 GB' },
  { id: '4', name: 'NAS-Storage-01', ipAddress: '192.168.1.200', macAddress: 'AA:BB:CC:DD:EE:04', type: 'NAS', status: 'active', lastSeen: '1 min ago', dataUsage: '8.6 TB' },
  { id: '5', name: 'Switch-Floor-2', ipAddress: '192.168.1.10', macAddress: 'AA:BB:CC:DD:EE:05', type: 'Switch', status: 'warning', lastSeen: '30 min ago', dataUsage: '450 GB' },
  { id: '6', name: 'Laptop-DEV-01', ipAddress: '192.168.1.150', macAddress: 'AA:BB:CC:DD:EE:06', type: 'Laptop', status: 'active', lastSeen: '3 min ago', dataUsage: '95 GB' },
  { id: '7', name: 'Laptop-DEV-02', ipAddress: '192.168.1.151', macAddress: 'AA:BB:CC:DD:EE:07', type: 'Laptop', status: 'inactive', lastSeen: '2 hrs ago', dataUsage: '62 GB' },
  { id: '8', name: 'AP-Floor-1', ipAddress: '192.168.1.20', macAddress: 'AA:BB:CC:DD:EE:08', type: 'Access Point', status: 'active', lastSeen: '4 min ago', dataUsage: '720 GB' },
  { id: '9', name: 'AP-Floor-2', ipAddress: '192.168.1.21', macAddress: 'AA:BB:CC:DD:EE:09', type: 'Access Point', status: 'active', lastSeen: '6 min ago', dataUsage: '610 GB' },
  { id: '10', name: 'Server-DB-01', ipAddress: '192.168.1.50', macAddress: 'AA:BB:CC:DD:EE:10', type: 'Server', status: 'active', lastSeen: '1 min ago', dataUsage: '2.1 TB' },
  { id: '11', name: 'Server-App-01', ipAddress: '192.168.1.51', macAddress: 'AA:BB:CC:DD:EE:11', type: 'Server', status: 'active', lastSeen: '1 min ago', dataUsage: '1.8 TB' },
  { id: '12', name: 'Firewall-Edge', ipAddress: '192.168.1.254', macAddress: 'AA:BB:CC:DD:EE:12', type: 'Firewall', status: 'warning', lastSeen: '45 min ago', dataUsage: '980 GB' },
  { id: '13', name: 'Printer-Office-01', ipAddress: '192.168.1.180', macAddress: 'AA:BB:CC:DD:EE:13', type: 'Printer', status: 'inactive', lastSeen: '1 day ago', dataUsage: '4 GB' },
  { id: '14', name: 'Camera-Lobby', ipAddress: '192.168.1.170', macAddress: 'AA:BB:CC:DD:EE:14', type: 'IP Camera', status: 'active', lastSeen: '1 min ago', dataUsage: '310 GB' },
];

const DEVICES_PER_PAGE = 10;

function StatusCell({ status }: { status: Device['status'] }) {
  const typeMap: Record<Device['status'], 'success' | 'warning' | 'stopped'> = {
    active: 'success',
    warning: 'warning',
    inactive: 'stopped',
  };
  const labelMap: Record<Device['status'], string> = {
    active: 'Active',
    warning: 'Warning',
    inactive: 'Inactive',
  };
  return <StatusIndicator type={typeMap[status]}>{labelMap[status]}</StatusIndicator>;
}

export default function NetworkDashboard() {
  const [warningDismissed, setWarningDismissed] = useState(false);
  const [deviceFilter, setDeviceFilter] = useState('');
  const [devicePage, setDevicePage] = useState(1);
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.load<boolean>('Awsui-Theme-Mode') ?? false;
  });

  useEffect(() => {
    const theme = darkMode ? 'awsui-dark-mode' : 'awsui-light-mode';
    document.body.classList.remove('awsui-dark-mode', 'awsui-light-mode');
    document.body.classList.add(theme);
    localStorage.save('Awsui-Theme-Mode', darkMode);
  }, [darkMode]);

  const filteredDevices = deviceData.filter(
    d =>
      d.name.toLowerCase().includes(deviceFilter.toLowerCase()) ||
      d.ipAddress.includes(deviceFilter) ||
      d.type.toLowerCase().includes(deviceFilter.toLowerCase()) ||
      d.status.toLowerCase().includes(deviceFilter.toLowerCase()),
  );

  const paginatedDevices = filteredDevices.slice((devicePage - 1) * DEVICES_PER_PAGE, devicePage * DEVICES_PER_PAGE);

  const areaChartSeries = [
    {
      title: 'Site 1',
      type: 'area' as const,
      data: networkTrafficSite1.map((y, i) => ({ x: networkDays[i], y })),
      color: '#688AE8',
    },
    {
      title: 'Site 2',
      type: 'area' as const,
      data: networkTrafficSite2.map((y, i) => ({ x: networkDays[i], y })),
      color: '#C33D69',
    },
    {
      title: 'Performance goal',
      type: 'threshold' as const,
      y: networkPerformanceGoal,
      color: '#5F6B7A',
    },
  ];

  const barChartSeries = [
    {
      title: 'Site 1',
      type: 'bar' as const,
      data: creditUsageData.map((y, i) => ({ x: creditDays[i], y })),
      color: '#688AE8',
    },
    {
      title: 'Performance goal',
      type: 'threshold' as const,
      y: creditPerformanceGoal,
      color: '#5F6B7A',
    },
  ];

  const flashbarItems = warningDismissed
    ? []
    : [
        {
          type: 'warning' as const,
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
            { text: 'Administrative Dashboard', href: '/network-dashboard' },
          ]}
          ariaLabel="Breadcrumbs"
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

              <Flashbar items={flashbarItems} />
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {/* Charts Row */}
            <Grid
              gridDefinition={[
                { colspan: { default: 12, m: 6 } },
                { colspan: { default: 12, m: 6 } },
              ]}
            >
              {/* Network Traffic Area Chart */}
              <Container header={<Header variant="h3">Network traffic</Header>}>
                <AreaChart
                  series={areaChartSeries}
                  xDomain={networkDays}
                  yDomain={[0, 600]}
                  xTitle="Day"
                  yTitle="Bandwidth (Mbps)"
                  ariaLabel="Network traffic area chart"
                  ariaDescription="Area chart showing network traffic for Site 1 and Site 2 over 12 days with a performance goal threshold."
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xAxisAriaRoleDescription: 'x axis',
                    yAxisAriaRoleDescription: 'y axis',
                  }}
                  hideFilter
                  height={300}
                  loadingText="Loading network traffic data"
                  errorText="Error loading data."
                  recoveryText="Retry"
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
              </Container>

              {/* Credit Usage Bar Chart */}
              <Container header={<Header variant="h3">Credit Usage</Header>}>
                <BarChart
                  series={barChartSeries}
                  xDomain={creditDays}
                  yDomain={[0, 650]}
                  xTitle="Day"
                  yTitle="Credits"
                  ariaLabel="Credit usage bar chart"
                  ariaDescription="Bar chart showing credit usage for Site 1 over 5 months with a performance goal threshold."
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xAxisAriaRoleDescription: 'x axis',
                    yAxisAriaRoleDescription: 'y axis',
                  }}
                  hideFilter
                  height={300}
                  loadingText="Loading credit usage data"
                  errorText="Error loading data."
                  recoveryText="Retry"
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
              </Container>
            </Grid>

            {/* My Devices Table */}
            <Table
              columnDefinitions={[
                {
                  id: 'name',
                  header: 'Device Name',
                  cell: (item: Device) => item.name,
                  sortingField: 'name',
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
                },
                {
                  id: 'type',
                  header: 'Device Type',
                  cell: (item: Device) => item.type,
                  sortingField: 'type',
                },
                {
                  id: 'status',
                  header: 'Status',
                  cell: (item: Device) => <StatusCell status={item.status} />,
                  sortingField: 'status',
                },
                {
                  id: 'lastSeen',
                  header: 'Last Seen',
                  cell: (item: Device) => item.lastSeen,
                },
                {
                  id: 'dataUsage',
                  header: 'Data Usage',
                  cell: (item: Device) => item.dataUsage,
                  sortingField: 'dataUsage',
                },
              ]}
              items={paginatedDevices}
              selectionType="multi"
              selectedItems={selectedDevices}
              onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
              trackBy="id"
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
                <TextFilter
                  filteringText={deviceFilter}
                  filteringPlaceholder="Search devices"
                  filteringAriaLabel="Filter devices"
                  countText={`${filteredDevices.length} matches`}
                  onChange={({ detail }) => {
                    setDeviceFilter(detail.filteringText);
                    setDevicePage(1);
                  }}
                />
              }
              pagination={
                <Pagination
                  currentPageIndex={devicePage}
                  pagesCount={Math.ceil(filteredDevices.length / DEVICES_PER_PAGE)}
                  onChange={({ detail }) => setDevicePage(detail.currentPageIndex)}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                  }}
                />
              }
              loadingText="Loading devices"
              empty={
                <Box textAlign="center" color="inherit">
                  <b>No devices found</b>
                  <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                    No devices match your search criteria.
                  </Box>
                </Box>
              }
              ariaLabels={{
                selectionGroupLabel: 'Device selection',
                allItemsSelectionLabel: ({ selectedItems }) =>
                  `${selectedItems.length} ${selectedItems.length === 1 ? 'device' : 'devices'} selected`,
                itemSelectionLabel: ({ selectedItems }, item) => {
                  const isSelected = selectedItems.filter(i => i.id === item.id).length > 0;
                  return `${item.name} is ${isSelected ? '' : 'not '}selected`;
                },
              }}
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
