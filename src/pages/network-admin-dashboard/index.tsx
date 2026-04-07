// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useEffect, useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Flashbar from '@cloudscape-design/components/flashbar';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import Grid from '@cloudscape-design/components/grid';
import Toggle from '@cloudscape-design/components/toggle';
import CollectionPreferences from '@cloudscape-design/components/collection-preferences';

import * as localStorage from '../../common/local-storage';
import '@cloudscape-design/global-styles/dark-mode-utils.css';

// Network traffic data
const networkTrafficSeries = [
  {
    title: 'Site 1',
    type: 'area' as const,
    data: [
      { x: 'x1', y: 3.2 },
      { x: 'x2', y: 3.6 },
      { x: 'x3', y: 3.9 },
      { x: 'x4', y: 4.1 },
      { x: 'x5', y: 4.3 },
      { x: 'x6', y: 4.0 },
      { x: 'x7', y: 4.2 },
      { x: 'x8', y: 4.4 },
      { x: 'x9', y: 4.5 },
      { x: 'x10', y: 4.3 },
      { x: 'x11', y: 4.1 },
      { x: 'x12', y: 3.8 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area' as const,
    data: [
      { x: 'x1', y: 2.8 },
      { x: 'x2', y: 3.1 },
      { x: 'x3', y: 3.3 },
      { x: 'x4', y: 4.6 },
      { x: 'x5', y: 5.0 },
      { x: 'x6', y: 4.7 },
      { x: 'x7', y: 4.9 },
      { x: 'x8', y: 4.8 },
      { x: 'x9', y: 5.1 },
      { x: 'x10', y: 4.9 },
      { x: 'x11', y: 5.0 },
      { x: 'x12', y: 4.6 },
    ],
    color: '#C33D69',
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    y: 3.5,
    color: '#5F6B7A',
  },
];

// Credit usage data
const creditUsageData = [
  { x: 'x1', y: 4.2 },
  { x: 'x2', y: 6.1 },
  { x: 'x3', y: 4.8 },
  { x: 'x4', y: 3.2 },
  { x: 'x5', y: 4.9 },
];

const creditUsageSeries = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    data: creditUsageData,
    color: '#688AE8',
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    y: 4.0,
    color: '#5F6B7A',
  },
];

// Device data
const DEVICE_COLUMNS = [
  { id: 'name', header: 'Device name', cell: (item: Device) => item.name, sortingField: 'name' },
  { id: 'ipAddress', header: 'IP address', cell: (item: Device) => item.ipAddress, sortingField: 'ipAddress' },
  { id: 'macAddress', header: 'MAC address', cell: (item: Device) => item.macAddress },
  { id: 'type', header: 'Device type', cell: (item: Device) => item.type, sortingField: 'type' },
  { id: 'status', header: 'Status', cell: (item: Device) => item.status, sortingField: 'status' },
  { id: 'lastSeen', header: 'Last seen', cell: (item: Device) => item.lastSeen, sortingField: 'lastSeen' },
  { id: 'bandwidth', header: 'Bandwidth (Mbps)', cell: (item: Device) => item.bandwidth, sortingField: 'bandwidth' },
];

interface Device {
  id: string;
  name: string;
  ipAddress: string;
  macAddress: string;
  type: string;
  status: string;
  lastSeen: string;
  bandwidth: string;
}

const DEVICE_DATA: Device[] = [
  { id: '1', name: 'Router-01', ipAddress: '192.168.1.1', macAddress: 'AA:BB:CC:DD:EE:01', type: 'Router', status: 'Online', lastSeen: '2 min ago', bandwidth: '850' },
  { id: '2', name: 'Switch-02', ipAddress: '192.168.1.2', macAddress: 'AA:BB:CC:DD:EE:02', type: 'Switch', status: 'Online', lastSeen: '5 min ago', bandwidth: '620' },
  { id: '3', name: 'Workstation-03', ipAddress: '192.168.1.10', macAddress: 'AA:BB:CC:DD:EE:03', type: 'Workstation', status: 'Online', lastSeen: '1 min ago', bandwidth: '120' },
  { id: '4', name: 'Laptop-04', ipAddress: '192.168.1.11', macAddress: 'AA:BB:CC:DD:EE:04', type: 'Laptop', status: 'Idle', lastSeen: '15 min ago', bandwidth: '45' },
  { id: '5', name: 'Printer-05', ipAddress: '192.168.1.20', macAddress: 'AA:BB:CC:DD:EE:05', type: 'Printer', status: 'Offline', lastSeen: '2 hr ago', bandwidth: '0' },
  { id: '6', name: 'Server-06', ipAddress: '192.168.1.30', macAddress: 'AA:BB:CC:DD:EE:06', type: 'Server', status: 'Online', lastSeen: 'Just now', bandwidth: '1200' },
  { id: '7', name: 'Camera-07', ipAddress: '192.168.1.40', macAddress: 'AA:BB:CC:DD:EE:07', type: 'Camera', status: 'Online', lastSeen: '3 min ago', bandwidth: '25' },
  { id: '8', name: 'Tablet-08', ipAddress: '192.168.1.50', macAddress: 'AA:BB:CC:DD:EE:08', type: 'Tablet', status: 'Idle', lastSeen: '30 min ago', bandwidth: '10' },
  { id: '9', name: 'Phone-09', ipAddress: '192.168.1.51', macAddress: 'AA:BB:CC:DD:EE:09', type: 'Mobile', status: 'Online', lastSeen: '7 min ago', bandwidth: '55' },
  { id: '10', name: 'AccessPoint-10', ipAddress: '192.168.1.60', macAddress: 'AA:BB:CC:DD:EE:10', type: 'Access Point', status: 'Online', lastSeen: '1 min ago', bandwidth: '340' },
  { id: '11', name: 'NAS-11', ipAddress: '192.168.1.70', macAddress: 'AA:BB:CC:DD:EE:11', type: 'Storage', status: 'Online', lastSeen: '4 min ago', bandwidth: '780' },
  { id: '12', name: 'SmartTV-12', ipAddress: '192.168.1.80', macAddress: 'AA:BB:CC:DD:EE:12', type: 'Smart TV', status: 'Idle', lastSeen: '45 min ago', bandwidth: '15' },
  { id: '13', name: 'Gateway-13', ipAddress: '192.168.1.254', macAddress: 'AA:BB:CC:DD:EE:13', type: 'Gateway', status: 'Online', lastSeen: 'Just now', bandwidth: '920' },
  { id: '14', name: 'Firewall-14', ipAddress: '192.168.1.253', macAddress: 'AA:BB:CC:DD:EE:14', type: 'Firewall', status: 'Online', lastSeen: '2 min ago', bandwidth: '1100' },
];

const ITEMS_PER_PAGE = 14;

export default function NetworkAdminDashboard() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.load<boolean>('Awsui-Theme-Mode') ?? false;
  });
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState<Device[]>([]);
  const [warningDismissed, setWarningDismissed] = useState(false);

  useEffect(() => {
    const theme = darkMode ? 'awsui-dark-mode' : 'awsui-light-mode';
    document.body.classList.remove('awsui-dark-mode', 'awsui-light-mode');
    document.body.classList.add(theme);
    localStorage.save('Awsui-Theme-Mode', darkMode);
  }, [darkMode]);

  const filteredDevices = DEVICE_DATA.filter(
    device =>
      device.name.toLowerCase().includes(filterText.toLowerCase()) ||
      device.ipAddress.toLowerCase().includes(filterText.toLowerCase()) ||
      device.type.toLowerCase().includes(filterText.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredDevices.length / ITEMS_PER_PAGE);
  const paginatedDevices = filteredDevices.slice(
    (currentPageIndex - 1) * ITEMS_PER_PAGE,
    currentPageIndex * ITEMS_PER_PAGE,
  );

  const flashbarItems = warningDismissed
    ? []
    : [
        {
          type: 'warning' as const,
          content: 'This is a warning message',
          dismissible: true,
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
            { text: 'Administrative Dashboard', href: '/network-admin-dashboard' },
          ]}
          ariaLabel="Breadcrumb navigation"
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
            {/* Search + Pagination row */}
            <SpaceBetween direction="horizontal" size="xs" alignItems="center">
              <div style={{ flex: 1, minWidth: 0 }}>
                <TextFilter
                  filteringText={filterText}
                  filteringPlaceholder="Find devices"
                  filteringAriaLabel="Filter devices"
                  onChange={({ detail }) => {
                    setFilterText(detail.filteringText);
                    setCurrentPageIndex(1);
                  }}
                />
              </div>
              <Pagination
                currentPageIndex={currentPageIndex}
                pagesCount={Math.max(totalPages, 5)}
                onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                ariaLabels={{
                  nextPageLabel: 'Next page',
                  previousPageLabel: 'Previous page',
                  pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                }}
              />
              <CollectionPreferences
                title="Preferences"
                confirmLabel="Confirm"
                cancelLabel="Cancel"
                preferences={{}}
                onConfirm={() => {}}
                pageSizePreference={{
                  title: 'Page size',
                  options: [
                    { value: 10, label: '10 devices' },
                    { value: 14, label: '14 devices' },
                    { value: 20, label: '20 devices' },
                  ],
                }}
              />
            </SpaceBetween>

            {/* Warning Flashbar */}
            <Flashbar items={flashbarItems} />

            {/* Charts row */}
            <Grid
              gridDefinition={[
                { colspan: { default: 12, m: 6 } },
                { colspan: { default: 12, m: 6 } },
              ]}
            >
              {/* Network Traffic Area Chart */}
              <AreaChart
                series={networkTrafficSeries}
                xDomain={['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12']}
                yDomain={[0, 6]}
                xTitle="Day"
                yTitle=""
                ariaLabel="Network traffic chart"
                ariaDescription="Area chart showing network traffic for Site 1 and Site 2 over 12 days"
                height={300}
                hideFilter
                header={<Header variant="h2">Network traffic</Header>}
                i18nStrings={{
                  filterLabel: 'Filter data series',
                  filterPlaceholder: 'Filter series',
                  filterSelectedAriaLabel: 'selected',
                  detailPopoverDismissAriaLabel: 'Dismiss',
                  legendAriaLabel: 'Legend',
                  chartAriaRoleDescription: 'area chart',
                  yTickFormatter: (v: number) => `y${v}`,
                }}
              />

              {/* Credit Usage Bar Chart */}
              <BarChart
                series={creditUsageSeries}
                xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
                yDomain={[0, 7]}
                xTitle="Day"
                yTitle=""
                ariaLabel="Credit usage chart"
                ariaDescription="Bar chart showing credit usage for Site 1 over 5 periods"
                height={300}
                hideFilter
                header={<Header variant="h2">Credit Usage</Header>}
                i18nStrings={{
                  filterLabel: 'Filter data series',
                  filterPlaceholder: 'Filter series',
                  filterSelectedAriaLabel: 'selected',
                  detailPopoverDismissAriaLabel: 'Dismiss',
                  legendAriaLabel: 'Legend',
                  chartAriaRoleDescription: 'bar chart',
                  yTickFormatter: (v: number) => `y${v}`,
                }}
              />
            </Grid>

            {/* My Devices Table */}
            <Table
              columnDefinitions={DEVICE_COLUMNS}
              items={paginatedDevices}
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
              trackBy="id"
              ariaLabels={{
                selectionGroupLabel: 'Device selection',
                allItemsSelectionLabel: () => 'Select all devices',
                itemSelectionLabel: (data, row) => `Select ${row.name}`,
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
                <Box textAlign="center" color="inherit" padding="xxl">
                  <Box variant="p" color="inherit">
                    No devices found
                  </Box>
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
              pagination={
                <Pagination
                  currentPageIndex={currentPageIndex}
                  pagesCount={Math.max(totalPages, 1)}
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
