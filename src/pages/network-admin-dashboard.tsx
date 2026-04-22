// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Flashbar from '@cloudscape-design/components/flashbar';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import ContentLayout from '@cloudscape-design/components/content-layout';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Toggle from '@cloudscape-design/components/toggle';
import * as localStorage from '../common/local-storage';
import { useEffect } from 'react';

// ── Sample device data ──────────────────────────────────────────────────────
interface Device {
  id: string;
  deviceName: string;
  ipAddress: string;
  macAddress: string;
  status: string;
  deviceType: string;
  lastSeen: string;
  bandwidth: string;
}

const DEVICES: Device[] = [
  { id: '1', deviceName: 'Router-Gateway-01', ipAddress: '192.168.1.1', macAddress: 'AA:BB:CC:DD:EE:01', status: 'Online', deviceType: 'Router', lastSeen: '2024-01-15 14:32', bandwidth: '450 Mbps' },
  { id: '2', deviceName: 'Workstation-Alice', ipAddress: '192.168.1.24', macAddress: 'AA:BB:CC:DD:EE:02', status: 'Online', deviceType: 'Desktop', lastSeen: '2024-01-15 14:30', bandwidth: '120 Mbps' },
  { id: '3', deviceName: 'Laptop-Bob', ipAddress: '192.168.1.45', macAddress: 'AA:BB:CC:DD:EE:03', status: 'Idle', deviceType: 'Laptop', lastSeen: '2024-01-15 13:58', bandwidth: '35 Mbps' },
  { id: '4', deviceName: 'Server-Prod-01', ipAddress: '192.168.1.10', macAddress: 'AA:BB:CC:DD:EE:04', status: 'Online', deviceType: 'Server', lastSeen: '2024-01-15 14:32', bandwidth: '800 Mbps' },
  { id: '5', deviceName: 'PrintStation-Floor2', ipAddress: '192.168.1.78', macAddress: 'AA:BB:CC:DD:EE:05', status: 'Offline', deviceType: 'Printer', lastSeen: '2024-01-15 09:15', bandwidth: '0 Mbps' },
  { id: '6', deviceName: 'Camera-LobbyNorth', ipAddress: '192.168.1.91', macAddress: 'AA:BB:CC:DD:EE:06', status: 'Online', deviceType: 'Camera', lastSeen: '2024-01-15 14:32', bandwidth: '12 Mbps' },
  { id: '7', deviceName: 'Switch-Core-B2', ipAddress: '192.168.1.5', macAddress: 'AA:BB:CC:DD:EE:07', status: 'Online', deviceType: 'Switch', lastSeen: '2024-01-15 14:32', bandwidth: '1200 Mbps' },
  { id: '8', deviceName: 'Tablet-Reception', ipAddress: '192.168.1.112', macAddress: 'AA:BB:CC:DD:EE:08', status: 'Idle', deviceType: 'Tablet', lastSeen: '2024-01-15 12:44', bandwidth: '8 Mbps' },
  { id: '9', deviceName: 'NAS-Backup-01', ipAddress: '192.168.1.15', macAddress: 'AA:BB:CC:DD:EE:09', status: 'Online', deviceType: 'NAS', lastSeen: '2024-01-15 14:31', bandwidth: '250 Mbps' },
  { id: '10', deviceName: 'AP-Floor3-East', ipAddress: '192.168.1.52', macAddress: 'AA:BB:CC:DD:EE:10', status: 'Online', deviceType: 'Access Point', lastSeen: '2024-01-15 14:32', bandwidth: '340 Mbps' },
  { id: '11', deviceName: 'VoIP-Phone-Conf01', ipAddress: '192.168.1.130', macAddress: 'AA:BB:CC:DD:EE:11', status: 'Online', deviceType: 'VoIP Phone', lastSeen: '2024-01-15 14:28', bandwidth: '2 Mbps' },
  { id: '12', deviceName: 'Workstation-Carol', ipAddress: '192.168.1.67', macAddress: 'AA:BB:CC:DD:EE:12', status: 'Online', deviceType: 'Desktop', lastSeen: '2024-01-15 14:30', bandwidth: '95 Mbps' },
];

// ── Network traffic area chart data ─────────────────────────────────────────
const TRAFFIC_DAYS = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12'];
const SITE1_TRAFFIC = [320, 360, 340, 410, 390, 430, 460, 420, 450, 480, 440, 390];
const SITE2_TRAFFIC = [460, 500, 520, 480, 550, 530, 510, 560, 480, 520, 500, 540];
const PERFORMANCE_GOAL = 400;

// ── Credit usage bar chart data ──────────────────────────────────────────────
const CREDIT_DAYS = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'];
const CREDIT_USAGE = [420, 650, 500, 310, 520];

// ── Column definitions ───────────────────────────────────────────────────────
const COLUMN_DEFINITIONS = [
  { id: 'deviceName', header: 'Device Name', cell: (item: Device) => item.deviceName, sortingField: 'deviceName' },
  { id: 'ipAddress', header: 'IP Address', cell: (item: Device) => item.ipAddress, sortingField: 'ipAddress' },
  { id: 'macAddress', header: 'MAC Address', cell: (item: Device) => item.macAddress },
  { id: 'deviceType', header: 'Device Type', cell: (item: Device) => item.deviceType, sortingField: 'deviceType' },
  { id: 'status', header: 'Status', cell: (item: Device) => item.status, sortingField: 'status' },
  { id: 'bandwidth', header: 'Bandwidth', cell: (item: Device) => item.bandwidth, sortingField: 'bandwidth' },
  { id: 'lastSeen', header: 'Last Seen', cell: (item: Device) => item.lastSeen, sortingField: 'lastSeen' },
];

export default function NetworkAdminDashboard() {
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState<Device[]>([]);
  const [warningDismissed, setWarningDismissed] = useState(false);

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.load<boolean>('Awsui-Theme-Mode') ?? false;
  });

  useEffect(() => {
    const theme = darkMode ? 'awsui-dark-mode' : 'awsui-light-mode';
    document.body.classList.remove('awsui-dark-mode', 'awsui-light-mode');
    document.body.classList.add(theme);
    localStorage.save('Awsui-Theme-Mode', darkMode);
  }, [darkMode]);

  const itemsPerPage = 10;

  const filteredDevices = DEVICES.filter(
    device =>
      device.deviceName.toLowerCase().includes(filterText.toLowerCase()) ||
      device.ipAddress.includes(filterText) ||
      device.deviceType.toLowerCase().includes(filterText.toLowerCase()) ||
      device.status.toLowerCase().includes(filterText.toLowerCase()),
  );

  const paginatedDevices = filteredDevices.slice((currentPageIndex - 1) * itemsPerPage, currentPageIndex * itemsPerPage);

  const flashbarItems = [
    ...(!warningDismissed
      ? [
          {
            type: 'warning' as const,
            content: 'This is a warning message',
            dismissible: true,
            onDismiss: () => setWarningDismissed(true),
            id: 'network-warning',
          },
        ]
      : []),
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

              <SpaceBetween direction="horizontal" size="xs">
                <div style={{ flexGrow: 1, maxWidth: 600 }}>
                  <TextFilter
                    filteringText={filterText}
                    filteringPlaceholder="Search devices..."
                    filteringAriaLabel="Search devices"
                    onChange={({ detail }) => {
                      setFilterText(detail.filteringText);
                      setCurrentPageIndex(1);
                    }}
                  />
                </div>
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
              </SpaceBetween>

              {flashbarItems.length > 0 && <Flashbar items={flashbarItems} />}
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {/* Charts row */}
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
                      data: TRAFFIC_DAYS.map((day, i) => ({ x: day, y: SITE1_TRAFFIC[i] })),
                      color: '#688AE8',
                    },
                    {
                      title: 'Site 2',
                      type: 'area',
                      data: TRAFFIC_DAYS.map((day, i) => ({ x: day, y: SITE2_TRAFFIC[i] })),
                      color: '#C33D69',
                    },
                    {
                      title: 'Performance goal',
                      type: 'threshold',
                      y: PERFORMANCE_GOAL,
                      color: '#5F6B7A',
                    },
                  ]}
                  xDomain={TRAFFIC_DAYS}
                  yDomain={[0, 700]}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle="Mbps"
                  height={300}
                  hideFilter
                  i18nStrings={{
                    xTickFormatter: (value) => value,
                    yTickFormatter: (value) => `${value}`,
                    filterLabel: 'Filter',
                    filterPlaceholder: 'Filter series',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    yAxisAriaRoleDescription: 'y axis',
                    xAxisAriaRoleDescription: 'x axis',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                    detailTotalLabel: 'Total',
                  }}
                  ariaLabel="Network traffic area chart"
                  ariaDescription="Area chart showing network traffic for Site 1 and Site 2 over 12 days compared to performance goal"
                />
                <Box variant="h3" padding={{ top: 'xs' }}>Network traffic</Box>
              </Container>

              {/* Credit Usage Bar Chart */}
              <Container>
                <BarChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'bar',
                      data: CREDIT_DAYS.map((day, i) => ({ x: day, y: CREDIT_USAGE[i] })),
                      color: '#688AE8',
                    },
                    {
                      title: 'Performance goal',
                      type: 'threshold',
                      y: 450,
                      color: '#5F6B7A',
                    },
                  ]}
                  xDomain={CREDIT_DAYS}
                  yDomain={[0, 800]}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle="Credits"
                  height={300}
                  hideFilter
                  i18nStrings={{
                    filterLabel: 'Filter',
                    filterPlaceholder: 'Filter series',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    yAxisAriaRoleDescription: 'y axis',
                    xAxisAriaRoleDescription: 'x axis',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                    detailTotalLabel: 'Total',
                  }}
                  ariaLabel="Credit usage bar chart"
                  ariaDescription="Bar chart showing credit usage per day compared to performance goal"
                />
                <Box variant="h3" padding={{ top: 'xs' }}>Credit Usage</Box>
              </Container>
            </Grid>

            {/* My Devices Table */}
            <Table
              variant="full-page"
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
              columnDefinitions={COLUMN_DEFINITIONS}
              items={paginatedDevices}
              trackBy="id"
              stickyHeader
              enableKeyboardNavigation
              ariaLabels={{
                selectionGroupLabel: 'Device selection',
                allItemsSelectionLabel: () => 'Select all devices',
                itemSelectionLabel: (_, item) => `Select ${item.deviceName}`,
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
              filter={
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
              empty={
                <Box textAlign="center" color="inherit" margin={{ top: 'xxl', bottom: 'xxl' }}>
                  <Box variant="h3" padding={{ bottom: 'xs' }}>
                    No devices found
                  </Box>
                  <Box variant="p">Try changing the filter text or add a new device.</Box>
                </Box>
              }
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
