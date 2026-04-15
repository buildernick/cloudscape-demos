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
import Toggle from '@cloudscape-design/components/toggle';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

import * as localStorage from '../../common/local-storage';
import '@cloudscape-design/global-styles/dark-mode-utils.css';

// ── Types ──────────────────────────────────────────────────────────────────────
interface Device {
  id: string;
  name: string;
  ipAddress: string;
  macAddress: string;
  status: 'online' | 'offline' | 'warning';
  type: string;
  location: string;
  lastSeen: string;
  trafficUsage: string;
}

// ── Sample Data ────────────────────────────────────────────────────────────────
const DEVICES: Device[] = [
  { id: '1', name: 'Router-Core-01', ipAddress: '192.168.1.1', macAddress: 'AA:BB:CC:DD:EE:01', status: 'online', type: 'Router', location: 'Data Center A', lastSeen: '2 min ago', trafficUsage: '4.2 GB' },
  { id: '2', name: 'Switch-Floor-02', ipAddress: '192.168.1.2', macAddress: 'AA:BB:CC:DD:EE:02', status: 'online', type: 'Switch', location: 'Floor 2', lastSeen: '1 min ago', trafficUsage: '1.8 GB' },
  { id: '3', name: 'AP-Lobby-03', ipAddress: '192.168.1.3', macAddress: 'AA:BB:CC:DD:EE:03', status: 'warning', type: 'Access Point', location: 'Lobby', lastSeen: '5 min ago', trafficUsage: '0.9 GB' },
  { id: '4', name: 'Firewall-Edge-04', ipAddress: '10.0.0.1', macAddress: 'AA:BB:CC:DD:EE:04', status: 'online', type: 'Firewall', location: 'Data Center A', lastSeen: 'Just now', trafficUsage: '6.1 GB' },
  { id: '5', name: 'Server-DB-05', ipAddress: '192.168.2.10', macAddress: 'AA:BB:CC:DD:EE:05', status: 'online', type: 'Server', location: 'Data Center B', lastSeen: '3 min ago', trafficUsage: '2.4 GB' },
  { id: '6', name: 'NAS-Storage-06', ipAddress: '192.168.2.20', macAddress: 'AA:BB:CC:DD:EE:06', status: 'offline', type: 'Storage', location: 'Data Center B', lastSeen: '2 hours ago', trafficUsage: '0 GB' },
  { id: '7', name: 'Camera-Ext-07', ipAddress: '192.168.3.5', macAddress: 'AA:BB:CC:DD:EE:07', status: 'online', type: 'IP Camera', location: 'Exterior', lastSeen: 'Just now', trafficUsage: '0.3 GB' },
  { id: '8', name: 'Printer-HR-08', ipAddress: '192.168.1.50', macAddress: 'AA:BB:CC:DD:EE:08', status: 'online', type: 'Printer', location: 'HR Office', lastSeen: '15 min ago', trafficUsage: '0.1 GB' },
  { id: '9', name: 'Switch-Server-09', ipAddress: '192.168.2.1', macAddress: 'AA:BB:CC:DD:EE:09', status: 'online', type: 'Switch', location: 'Data Center A', lastSeen: '1 min ago', trafficUsage: '3.7 GB' },
  { id: '10', name: 'AP-ConfRoom-10', ipAddress: '192.168.1.60', macAddress: 'AA:BB:CC:DD:EE:10', status: 'online', type: 'Access Point', location: 'Conference Room', lastSeen: '4 min ago', trafficUsage: '0.5 GB' },
  { id: '11', name: 'VPN-Gateway-11', ipAddress: '10.0.0.5', macAddress: 'AA:BB:CC:DD:EE:11', status: 'online', type: 'VPN Gateway', location: 'Data Center A', lastSeen: 'Just now', trafficUsage: '2.2 GB' },
  { id: '12', name: 'Router-Branch-12', ipAddress: '172.16.0.1', macAddress: 'AA:BB:CC:DD:EE:12', status: 'warning', type: 'Router', location: 'Branch Office', lastSeen: '8 min ago', trafficUsage: '1.1 GB' },
];

const NETWORK_TRAFFIC_DATA = [
  { x: new Date(2024, 0, 1), site1: 3.2, site2: 3.8 },
  { x: new Date(2024, 0, 2), site1: 3.5, site2: 4.2 },
  { x: new Date(2024, 0, 3), site1: 3.8, site2: 4.8 },
  { x: new Date(2024, 0, 4), site1: 3.4, site2: 5.1 },
  { x: new Date(2024, 0, 5), site1: 3.6, site2: 4.9 },
  { x: new Date(2024, 0, 6), site1: 3.9, site2: 5.3 },
  { x: new Date(2024, 0, 7), site1: 4.1, site2: 4.7 },
  { x: new Date(2024, 0, 8), site1: 3.7, site2: 4.4 },
  { x: new Date(2024, 0, 9), site1: 4.2, site2: 5.2 },
  { x: new Date(2024, 0, 10), site1: 4.4, site2: 5.4 },
  { x: new Date(2024, 0, 11), site1: 4.3, site2: 5.1 },
  { x: new Date(2024, 0, 12), site1: 3.9, site2: 4.8 },
];

const CREDIT_USAGE_DATA = [
  { x: 'Jan', y: 4.2 },
  { x: 'Feb', y: 6.5 },
  { x: 'Mar', y: 5.1 },
  { x: 'Apr', y: 3.2 },
  { x: 'May', y: 5.0 },
];

const PERFORMANCE_GOAL = 4.0;

// ── Page Component ─────────────────────────────────────────────────────────────
export default function NetworkDashboard() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.load<boolean>('Awsui-Theme-Mode') ?? false;
  });
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
  const [warningDismissed, setWarningDismissed] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    const theme = darkMode ? 'awsui-dark-mode' : 'awsui-light-mode';
    document.body.classList.remove('awsui-dark-mode', 'awsui-light-mode');
    document.body.classList.add(theme);
    localStorage.save('Awsui-Theme-Mode', darkMode);
  }, [darkMode]);

  const filteredDevices = DEVICES.filter(device =>
    device.name.toLowerCase().includes(filterText.toLowerCase()) ||
    device.ipAddress.includes(filterText) ||
    device.type.toLowerCase().includes(filterText.toLowerCase()) ||
    device.location.toLowerCase().includes(filterText.toLowerCase())
  );

  const paginatedDevices = filteredDevices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const flashbarItems = warningDismissed ? [] : [
    {
      type: 'warning' as const,
      content: 'This is a warning message',
      dismissible: true,
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
                  <Button
                    variant="primary"
                    iconName="external"
                    iconAlign="right"
                    href="#"
                    target="_blank"
                  >
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
              <Container>
                <AreaChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'area',
                      data: NETWORK_TRAFFIC_DATA.map(d => ({ x: d.x, y: d.site1 })),
                      color: '#688AE8',
                    },
                    {
                      title: 'Site 2',
                      type: 'area',
                      data: NETWORK_TRAFFIC_DATA.map(d => ({ x: d.x, y: d.site2 })),
                      color: '#C33D69',
                    },
                    {
                      title: 'Performance goal',
                      type: 'threshold',
                      y: PERFORMANCE_GOAL,
                      color: '#5F6B7A',
                    },
                  ]}
                  xDomain={[
                    new Date(2024, 0, 1),
                    new Date(2024, 0, 12),
                  ]}
                  yDomain={[0, 7]}
                  i18nStrings={{
                    xTickFormatter: (d: Date) =>
                      d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    yTickFormatter: (v: number) => `${v}`,
                    filterLabel: 'Filter series',
                    filterPlaceholder: 'Filter series',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xAxisAriaRoleDescription: 'x axis',
                    yAxisAriaRoleDescription: 'y axis',
                    detailTotalLabel: 'Total',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                  }}
                  ariaLabel="Network traffic area chart"
                  height={240}
                  hideFilter
                  xTitle="Day"
                  yTitle="Network traffic"
                />
              </Container>

              {/* Credit Usage Bar Chart */}
              <Container>
                <BarChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'bar',
                      data: CREDIT_USAGE_DATA.map(d => ({ x: d.x, y: d.y })),
                      color: '#688AE8',
                    },
                    {
                      title: 'Performance goal',
                      type: 'threshold',
                      y: PERFORMANCE_GOAL,
                      color: '#5F6B7A',
                    },
                  ]}
                  xDomain={CREDIT_USAGE_DATA.map(d => d.x)}
                  yDomain={[0, 7]}
                  i18nStrings={{
                    xTickFormatter: (v: string) => v,
                    yTickFormatter: (v: number) => `${v}`,
                    filterLabel: 'Filter series',
                    filterPlaceholder: 'Filter series',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xAxisAriaRoleDescription: 'x axis',
                    yAxisAriaRoleDescription: 'y axis',
                    detailTotalLabel: 'Total',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                  }}
                  ariaLabel="Credit usage bar chart"
                  height={240}
                  hideFilter
                  xTitle="Day"
                  yTitle="Credit Usage"
                />
              </Container>
            </Grid>

            {/* My Devices Table Section */}
            <Table
              ariaLabels={{
                itemSelectionLabel: (_data, row) => `Select ${row.name}`,
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
                  id: 'status',
                  header: 'Status',
                  cell: item => (
                    <StatusIndicator
                      type={
                        item.status === 'online'
                          ? 'success'
                          : item.status === 'warning'
                          ? 'warning'
                          : 'error'
                      }
                    >
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </StatusIndicator>
                  ),
                  sortingField: 'status',
                },
                {
                  id: 'type',
                  header: 'Device Type',
                  cell: item => item.type,
                  sortingField: 'type',
                },
                {
                  id: 'location',
                  header: 'Location',
                  cell: item => item.location,
                  sortingField: 'location',
                },
                {
                  id: 'lastSeen',
                  header: 'Last Seen',
                  cell: item => item.lastSeen,
                  sortingField: 'lastSeen',
                },
                {
                  id: 'trafficUsage',
                  header: 'Traffic Usage',
                  cell: item => item.trafficUsage,
                  sortingField: 'trafficUsage',
                },
              ]}
              items={paginatedDevices}
              selectionType="multi"
              selectedItems={selectedDevices}
              onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
              header={
                <Header
                  variant="h2"
                  description="Devices on your local network"
                  counter={`(${filteredDevices.length})`}
                  actions={
                    <Button
                      variant="primary"
                      iconName="external"
                      iconAlign="right"
                      href="#"
                      target="_blank"
                    >
                      Add Device
                    </Button>
                  }
                >
                  My Devices
                </Header>
              }
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
              pagination={
                <Pagination
                  currentPageIndex={currentPage}
                  pagesCount={Math.ceil(filteredDevices.length / itemsPerPage)}
                  onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                  }}
                />
              }
              empty={
                <Box textAlign="center" color="inherit">
                  <b>No devices found</b>
                  <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                    No devices match your filter criteria.
                  </Box>
                </Box>
              }
              sortingDisabled={false}
              variant="full-page"
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
