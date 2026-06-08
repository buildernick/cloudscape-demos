// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useEffect, useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Flashbar from '@cloudscape-design/components/flashbar';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import Toggle from '@cloudscape-design/components/toggle';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

import * as localStorage from '../../common/local-storage';
import '@cloudscape-design/global-styles/dark-mode-utils.css';

interface Device {
  id: string;
  name: string;
  ipAddress: string;
  macAddress: string;
  type: string;
  status: 'active' | 'inactive' | 'warning';
  lastSeen: string;
  bandwidth: string;
}

const deviceData: Device[] = [
  { id: '1', name: 'Router-Primary', ipAddress: '192.168.1.1', macAddress: 'AA:BB:CC:DD:EE:01', type: 'Router', status: 'active', lastSeen: '2 min ago', bandwidth: '450 Mbps' },
  { id: '2', name: 'Switch-Floor1', ipAddress: '192.168.1.10', macAddress: 'AA:BB:CC:DD:EE:02', type: 'Switch', status: 'active', lastSeen: '5 min ago', bandwidth: '1.2 Gbps' },
  { id: '3', name: 'AP-Conference-A', ipAddress: '192.168.1.20', macAddress: 'AA:BB:CC:DD:EE:03', type: 'Access Point', status: 'active', lastSeen: '1 min ago', bandwidth: '320 Mbps' },
  { id: '4', name: 'Workstation-Dev-01', ipAddress: '192.168.1.101', macAddress: 'AA:BB:CC:DD:EE:04', type: 'Workstation', status: 'active', lastSeen: 'Just now', bandwidth: '95 Mbps' },
  { id: '5', name: 'Workstation-Dev-02', ipAddress: '192.168.1.102', macAddress: 'AA:BB:CC:DD:EE:05', type: 'Workstation', status: 'warning', lastSeen: '12 min ago', bandwidth: '45 Mbps' },
  { id: '6', name: 'Server-DB-01', ipAddress: '192.168.1.50', macAddress: 'AA:BB:CC:DD:EE:06', type: 'Server', status: 'active', lastSeen: 'Just now', bandwidth: '780 Mbps' },
  { id: '7', name: 'Server-App-01', ipAddress: '192.168.1.51', macAddress: 'AA:BB:CC:DD:EE:07', type: 'Server', status: 'active', lastSeen: 'Just now', bandwidth: '640 Mbps' },
  { id: '8', name: 'Laptop-Marketing-05', ipAddress: '192.168.1.130', macAddress: 'AA:BB:CC:DD:EE:08', type: 'Laptop', status: 'inactive', lastSeen: '2 hrs ago', bandwidth: '0 Mbps' },
  { id: '9', name: 'Printer-Floor2', ipAddress: '192.168.1.200', macAddress: 'AA:BB:CC:DD:EE:09', type: 'Printer', status: 'active', lastSeen: '45 min ago', bandwidth: '2 Mbps' },
  { id: '10', name: 'Camera-Lobby', ipAddress: '192.168.1.210', macAddress: 'AA:BB:CC:DD:EE:0A', type: 'Camera', status: 'active', lastSeen: '1 min ago', bandwidth: '15 Mbps' },
  { id: '11', name: 'AP-Conference-B', ipAddress: '192.168.1.21', macAddress: 'AA:BB:CC:DD:EE:0B', type: 'Access Point', status: 'warning', lastSeen: '8 min ago', bandwidth: '110 Mbps' },
  { id: '12', name: 'Firewall-Edge', ipAddress: '10.0.0.1', macAddress: 'AA:BB:CC:DD:EE:0C', type: 'Firewall', status: 'active', lastSeen: 'Just now', bandwidth: '890 Mbps' },
];

const networkTrafficSeries = [
  {
    title: 'Site 1',
    type: 'area' as const,
    data: [
      { x: new Date(2024, 0, 1), y: 320 },
      { x: new Date(2024, 0, 2), y: 280 },
      { x: new Date(2024, 0, 3), y: 410 },
      { x: new Date(2024, 0, 4), y: 390 },
      { x: new Date(2024, 0, 5), y: 450 },
      { x: new Date(2024, 0, 6), y: 430 },
      { x: new Date(2024, 0, 7), y: 500 },
      { x: new Date(2024, 0, 8), y: 470 },
      { x: new Date(2024, 0, 9), y: 510 },
      { x: new Date(2024, 0, 10), y: 490 },
      { x: new Date(2024, 0, 11), y: 460 },
      { x: new Date(2024, 0, 12), y: 440 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area' as const,
    data: [
      { x: new Date(2024, 0, 1), y: 420 },
      { x: new Date(2024, 0, 2), y: 480 },
      { x: new Date(2024, 0, 3), y: 390 },
      { x: new Date(2024, 0, 4), y: 510 },
      { x: new Date(2024, 0, 5), y: 530 },
      { x: new Date(2024, 0, 6), y: 490 },
      { x: new Date(2024, 0, 7), y: 540 },
      { x: new Date(2024, 0, 8), y: 520 },
      { x: new Date(2024, 0, 9), y: 560 },
      { x: new Date(2024, 0, 10), y: 540 },
      { x: new Date(2024, 0, 11), y: 510 },
      { x: new Date(2024, 0, 12), y: 530 },
    ],
    color: '#C33D69',
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    y: 400,
    color: '#5F6B7A',
  },
];

const creditUsageSeries = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    data: [
      { x: 'Jan', y: 420 },
      { x: 'Feb', y: 680 },
      { x: 'Mar', y: 510 },
      { x: 'Apr', y: 320 },
      { x: 'May', y: 490 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    y: 400,
    color: '#5F6B7A',
  },
];

const ITEMS_PER_PAGE = 10;

export default function NetworkDashboard() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.load<boolean>('Awsui-Theme-Mode') ?? false;
  });
  const [warningDismissed, setWarningDismissed] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [selectedItems, setSelectedItems] = useState<Device[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const theme = darkMode ? 'awsui-dark-mode' : 'awsui-light-mode';
    document.body.classList.remove('awsui-dark-mode', 'awsui-light-mode');
    document.body.classList.add(theme);
    localStorage.save('Awsui-Theme-Mode', darkMode);
  }, [darkMode]);

  const filteredDevices = deviceData.filter(
    device =>
      device.name.toLowerCase().includes(filterText.toLowerCase()) ||
      device.ipAddress.includes(filterText) ||
      device.type.toLowerCase().includes(filterText.toLowerCase()),
  );

  const paginatedDevices = filteredDevices.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const flashbarItems = warningDismissed
    ? []
    : [
        {
          type: 'warning' as const,
          content: 'This is a warning message',
          dismissible: true,
          onDismiss: () => setWarningDismissed(true),
          id: 'network-warning',
        },
      ];

  const columnDefinitions = [
    {
      id: 'name',
      header: 'Device Name',
      cell: (item: Device) => item.name,
      sortingField: 'name',
      minWidth: 160,
    },
    {
      id: 'ipAddress',
      header: 'IP Address',
      cell: (item: Device) => item.ipAddress,
      sortingField: 'ipAddress',
      minWidth: 140,
    },
    {
      id: 'macAddress',
      header: 'MAC Address',
      cell: (item: Device) => item.macAddress,
      minWidth: 160,
    },
    {
      id: 'type',
      header: 'Device Type',
      cell: (item: Device) => item.type,
      sortingField: 'type',
      minWidth: 130,
    },
    {
      id: 'status',
      header: 'Status',
      cell: (item: Device) => {
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
        return <StatusIndicator type={typeMap[item.status]}>{labelMap[item.status]}</StatusIndicator>;
      },
      sortingField: 'status',
      minWidth: 120,
    },
    {
      id: 'lastSeen',
      header: 'Last Seen',
      cell: (item: Device) => item.lastSeen,
      sortingField: 'lastSeen',
      minWidth: 120,
    },
    {
      id: 'bandwidth',
      header: 'Bandwidth',
      cell: (item: Device) => item.bandwidth,
      sortingField: 'bandwidth',
      minWidth: 120,
    },
  ];

  const chartI18n = {
    filterLabel: 'Filter displayed data',
    filterPlaceholder: 'Filter data',
    filterSelectedAriaLabel: 'selected',
    legendAriaLabel: 'Legend',
    chartAriaRoleDescription: 'chart',
    xAxisAriaRoleDescription: 'x axis',
    yAxisAriaRoleDescription: 'y axis',
  };

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
              Network Adminstration Dashboard
            </Header>
          }
        >
          <SpaceBetween size="l">
            {/* Charts section */}
            <Grid gridDefinition={[{ colspan: { default: 12, m: 6 } }, { colspan: { default: 12, m: 6 } }]}>
              <Container header={<Header variant="h3">Network traffic</Header>}>
                <AreaChart
                  series={networkTrafficSeries}
                  xDomain={[new Date(2024, 0, 1), new Date(2024, 0, 12)]}
                  yDomain={[0, 600]}
                  i18nStrings={{
                    ...chartI18n,
                    chartAriaRoleDescription: 'area chart',
                    xTickFormatter: (d: Date) =>
                      d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                  }}
                  ariaLabel="Network traffic chart"
                  height={280}
                  xTitle="Day"
                  yTitle="Traffic (Mbps)"
                  hideFilter
                  empty={
                    <Box textAlign="center" color="inherit">
                      <b>No data</b>
                    </Box>
                  }
                  noMatch={
                    <Box textAlign="center" color="inherit">
                      <b>No matching data</b>
                    </Box>
                  }
                />
              </Container>

              <Container header={<Header variant="h3">Credit Usage</Header>}>
                <BarChart
                  series={creditUsageSeries}
                  xDomain={['Jan', 'Feb', 'Mar', 'Apr', 'May']}
                  yDomain={[0, 700]}
                  i18nStrings={{
                    ...chartI18n,
                    chartAriaRoleDescription: 'bar chart',
                  }}
                  ariaLabel="Credit usage chart"
                  height={280}
                  xTitle="Day"
                  yTitle="Credits"
                  hideFilter
                  empty={
                    <Box textAlign="center" color="inherit">
                      <b>No data</b>
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

            {/* Devices table */}
            <Table
              columnDefinitions={columnDefinitions}
              items={paginatedDevices}
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
              trackBy="id"
              ariaLabels={{
                itemSelectionLabel: (_data, row) => `Select ${row.name}`,
                allItemsSelectionLabel: () => 'Select all devices',
                selectionGroupLabel: 'Device selection',
              }}
              filter={
                <TextFilter
                  filteringText={filterText}
                  filteringPlaceholder="Find devices"
                  filteringAriaLabel="Filter devices"
                  onChange={({ detail }) => {
                    setFilterText(detail.filteringText);
                    setCurrentPage(1);
                  }}
                />
              }
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
              pagination={
                <Pagination
                  currentPageIndex={currentPage}
                  pagesCount={Math.ceil(filteredDevices.length / ITEMS_PER_PAGE)}
                  onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber}`,
                  }}
                />
              }
              empty={
                <Box textAlign="center" color="inherit" padding="xxl">
                  <SpaceBetween size="s">
                    <b>No devices found</b>
                    <Box variant="p" color="inherit">
                      No devices match your filter criteria.
                    </Box>
                  </SpaceBetween>
                </Box>
              }
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
