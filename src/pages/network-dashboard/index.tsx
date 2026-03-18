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
import Toggle from '@cloudscape-design/components/toggle';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import CollectionPreferences from '@cloudscape-design/components/collection-preferences';

import * as localStorage from '../../common/local-storage';
import '@cloudscape-design/global-styles/dark-mode-utils.css';

// Network traffic data for area chart
const networkTrafficSeries = [
  {
    title: 'Site 1',
    type: 'area' as const,
    data: [
      { x: new Date(2024, 0, 1), y: 35 },
      { x: new Date(2024, 0, 2), y: 42 },
      { x: new Date(2024, 0, 3), y: 48 },
      { x: new Date(2024, 0, 4), y: 51 },
      { x: new Date(2024, 0, 5), y: 47 },
      { x: new Date(2024, 0, 6), y: 53 },
      { x: new Date(2024, 0, 7), y: 61 },
      { x: new Date(2024, 0, 8), y: 58 },
      { x: new Date(2024, 0, 9), y: 65 },
      { x: new Date(2024, 0, 10), y: 70 },
      { x: new Date(2024, 0, 11), y: 67 },
      { x: new Date(2024, 0, 12), y: 72 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area' as const,
    data: [
      { x: new Date(2024, 0, 1), y: 55 },
      { x: new Date(2024, 0, 2), y: 60 },
      { x: new Date(2024, 0, 3), y: 52 },
      { x: new Date(2024, 0, 4), y: 68 },
      { x: new Date(2024, 0, 5), y: 63 },
      { x: new Date(2024, 0, 6), y: 74 },
      { x: new Date(2024, 0, 7), y: 79 },
      { x: new Date(2024, 0, 8), y: 72 },
      { x: new Date(2024, 0, 9), y: 80 },
      { x: new Date(2024, 0, 10), y: 85 },
      { x: new Date(2024, 0, 11), y: 82 },
      { x: new Date(2024, 0, 12), y: 78 },
    ],
    color: '#C33D69',
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    y: 60,
    color: '#5F6B7A',
  },
];

// Credit usage data for bar chart
const creditUsageSeries = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    data: [
      { x: 'Jan', y: 420 },
      { x: 'Feb', y: 580 },
      { x: 'Mar', y: 510 },
      { x: 'Apr', y: 310 },
      { x: 'May', y: 490 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    y: 450,
    color: '#5F6B7A',
  },
];

// Device data for the table
interface Device {
  id: string;
  deviceName: string;
  ipAddress: string;
  macAddress: string;
  status: string;
  type: string;
  lastSeen: string;
  bandwidth: string;
}

const devices: Device[] = [
  { id: '1', deviceName: 'Router-Primary', ipAddress: '192.168.1.1', macAddress: 'AA:BB:CC:DD:EE:01', status: 'Online', type: 'Router', lastSeen: '2 min ago', bandwidth: '1.2 Gbps' },
  { id: '2', deviceName: 'Workstation-01', ipAddress: '192.168.1.101', macAddress: 'AA:BB:CC:DD:EE:02', status: 'Online', type: 'Desktop', lastSeen: '5 min ago', bandwidth: '450 Mbps' },
  { id: '3', deviceName: 'Laptop-Nick', ipAddress: '192.168.1.102', macAddress: 'AA:BB:CC:DD:EE:03', status: 'Online', type: 'Laptop', lastSeen: '1 min ago', bandwidth: '320 Mbps' },
  { id: '4', deviceName: 'Server-DB', ipAddress: '192.168.1.20', macAddress: 'AA:BB:CC:DD:EE:04', status: 'Online', type: 'Server', lastSeen: 'Just now', bandwidth: '2.4 Gbps' },
  { id: '5', deviceName: 'Printer-Office', ipAddress: '192.168.1.150', macAddress: 'AA:BB:CC:DD:EE:05', status: 'Idle', type: 'Printer', lastSeen: '30 min ago', bandwidth: '10 Mbps' },
  { id: '6', deviceName: 'Switch-Floor2', ipAddress: '192.168.1.5', macAddress: 'AA:BB:CC:DD:EE:06', status: 'Online', type: 'Switch', lastSeen: '1 min ago', bandwidth: '800 Mbps' },
  { id: '7', deviceName: 'Camera-Lobby', ipAddress: '192.168.1.200', macAddress: 'AA:BB:CC:DD:EE:07', status: 'Online', type: 'Camera', lastSeen: '3 min ago', bandwidth: '25 Mbps' },
  { id: '8', deviceName: 'Tablet-Reception', ipAddress: '192.168.1.103', macAddress: 'AA:BB:CC:DD:EE:08', status: 'Online', type: 'Tablet', lastSeen: '8 min ago', bandwidth: '150 Mbps' },
  { id: '9', deviceName: 'NAS-Storage', ipAddress: '192.168.1.30', macAddress: 'AA:BB:CC:DD:EE:09', status: 'Online', type: 'Storage', lastSeen: 'Just now', bandwidth: '1.8 Gbps' },
  { id: '10', deviceName: 'Phone-VoIP-01', ipAddress: '192.168.1.210', macAddress: 'AA:BB:CC:DD:EE:10', status: 'Idle', type: 'VoIP Phone', lastSeen: '15 min ago', bandwidth: '5 Mbps' },
  { id: '11', deviceName: 'AP-Conference', ipAddress: '192.168.1.10', macAddress: 'AA:BB:CC:DD:EE:11', status: 'Online', type: 'Access Point', lastSeen: '2 min ago', bandwidth: '600 Mbps' },
  { id: '12', deviceName: 'Desktop-Finance', ipAddress: '192.168.1.104', macAddress: 'AA:BB:CC:DD:EE:12', status: 'Online', type: 'Desktop', lastSeen: '4 min ago', bandwidth: '280 Mbps' },
  { id: '13', deviceName: 'Server-Web', ipAddress: '192.168.1.21', macAddress: 'AA:BB:CC:DD:EE:13', status: 'Online', type: 'Server', lastSeen: 'Just now', bandwidth: '3.1 Gbps' },
  { id: '14', deviceName: 'Laptop-Remote', ipAddress: '192.168.1.105', macAddress: 'AA:BB:CC:DD:EE:14', status: 'Offline', type: 'Laptop', lastSeen: '2 hrs ago', bandwidth: '0 Mbps' },
];

const COLUMN_DEFINITIONS = [
  {
    id: 'deviceName',
    header: 'Device Name',
    cell: (item: Device) => item.deviceName,
    sortingField: 'deviceName',
    isRowHeader: true,
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
    id: 'status',
    header: 'Status',
    cell: (item: Device) => item.status,
    sortingField: 'status',
  },
  {
    id: 'type',
    header: 'Type',
    cell: (item: Device) => item.type,
    sortingField: 'type',
  },
  {
    id: 'lastSeen',
    header: 'Last Seen',
    cell: (item: Device) => item.lastSeen,
    sortingField: 'lastSeen',
  },
  {
    id: 'bandwidth',
    header: 'Bandwidth',
    cell: (item: Device) => item.bandwidth,
    sortingField: 'bandwidth',
  },
];

export default function NetworkDashboard() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.load<boolean>('Awsui-Theme-Mode') ?? false;
  });

  const [warningDismissed, setWarningDismissed] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState<Device[]>([]);
  const [preferences, setPreferences] = useState({ pageSize: 10 });

  useEffect(() => {
    const theme = darkMode ? 'awsui-dark-mode' : 'awsui-light-mode';
    document.body.classList.remove('awsui-dark-mode', 'awsui-light-mode');
    document.body.classList.add(theme);
    localStorage.save('Awsui-Theme-Mode', darkMode);
  }, [darkMode]);

  const filteredDevices = devices.filter(
    device =>
      device.deviceName.toLowerCase().includes(filterText.toLowerCase()) ||
      device.ipAddress.includes(filterText) ||
      device.type.toLowerCase().includes(filterText.toLowerCase()) ||
      device.status.toLowerCase().includes(filterText.toLowerCase()),
  );

  const pageSize = preferences.pageSize;
  const paginatedDevices = filteredDevices.slice((currentPageIndex - 1) * pageSize, currentPageIndex * pageSize);

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
          ariaLabel="Breadcrumb navigation"
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

              <SpaceBetween size="xs" direction="horizontal" alignItems="center">
                <div style={{ flex: 1, maxWidth: '600px' }}>
                  <TextFilter
                    filteringText={filterText}
                    filteringPlaceholder="Placeholder"
                    filteringAriaLabel="Search dashboard"
                    onChange={({ detail }) => setFilterText(detail.filteringText)}
                  />
                </div>
                <Pagination
                  currentPageIndex={currentPageIndex}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  pagesCount={Math.max(1, Math.ceil(filteredDevices.length / pageSize))}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                  }}
                />
              </SpaceBetween>

              <Flashbar items={flashbarItems} />
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {/* Charts section */}
            <Grid
              gridDefinition={[
                { colspan: { default: 12, m: 6 } },
                { colspan: { default: 12, m: 6 } },
              ]}
            >
              <Container>
                <AreaChart
                  series={networkTrafficSeries}
                  xDomain={[new Date(2024, 0, 1), new Date(2024, 0, 12)]}
                  yDomain={[0, 100]}
                  xScaleType="time"
                  i18nStrings={{
                    xTickFormatter: (value: number) =>
                      new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    yTickFormatter: (value: number) => `${value}`,
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    yLabel: 'Traffic (Mbps)',
                    xTitle: 'Day',
                    yTitle: 'Traffic (Mbps)',
                    detailTotalLabel: 'Total',
                  }}
                  ariaLabel="Network traffic area chart"
                  height={300}
                  hideFilter
                  xTitle="Day"
                  yTitle="Traffic (Mbps)"
                  empty={<Box textAlign="center">No data available</Box>}
                  noMatch={<Box textAlign="center">No matching data</Box>}
                  fitHeight
                />
              </Container>

              <Container>
                <BarChart
                  series={creditUsageSeries}
                  xDomain={['Jan', 'Feb', 'Mar', 'Apr', 'May']}
                  yDomain={[0, 700]}
                  i18nStrings={{
                    xTickFormatter: (value: string) => value,
                    yTickFormatter: (value: number) => `${value}`,
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    yLabel: 'Credits',
                    xTitle: 'Day',
                    yTitle: 'Credits',
                    detailTotalLabel: 'Total',
                  }}
                  ariaLabel="Credit usage bar chart"
                  height={300}
                  hideFilter
                  xTitle="Day"
                  yTitle="Credits"
                  empty={<Box textAlign="center">No data available</Box>}
                  noMatch={<Box textAlign="center">No matching data</Box>}
                  fitHeight
                />
              </Container>
            </Grid>

            {/* My Devices table */}
            <Table
              ariaLabels={{
                itemSelectionLabel: (data, row) => `Select ${row.deviceName}`,
                allItemsSelectionLabel: () => 'Select all devices',
                selectionGroupLabel: 'Device selection',
              }}
              columnDefinitions={COLUMN_DEFINITIONS}
              items={paginatedDevices}
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
              trackBy="id"
              header={
                <Header
                  variant="h2"
                  description="Devices on your local network"
                  counter={
                    selectedItems.length > 0
                      ? `(${selectedItems.length}/${filteredDevices.length})`
                      : `(${filteredDevices.length})`
                  }
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
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  pagesCount={Math.max(1, Math.ceil(filteredDevices.length / pageSize))}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                  }}
                />
              }
              preferences={
                <CollectionPreferences
                  title="Preferences"
                  confirmLabel="Confirm"
                  cancelLabel="Cancel"
                  preferences={preferences}
                  pageSizePreference={{
                    title: 'Page size',
                    options: [
                      { value: 10, label: '10 devices' },
                      { value: 20, label: '20 devices' },
                      { value: 50, label: '50 devices' },
                    ],
                  }}
                  onConfirm={({ detail }) => {
                    setPreferences({ pageSize: detail.pageSize ?? 10 });
                    setCurrentPageIndex(1);
                  }}
                />
              }
              empty={
                <Box textAlign="center" color="inherit" margin={{ top: 'xxl', bottom: 'xxl' }}>
                  <Box variant="h3" padding={{ bottom: 'xs' }}>
                    No devices found
                  </Box>
                  <Box variant="p">Try adjusting your search or add a new device.</Box>
                </Box>
              }
              loadingText="Loading devices"
              sortingDisabled={false}
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
