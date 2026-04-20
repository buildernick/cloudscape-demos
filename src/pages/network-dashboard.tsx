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
import Alert from '@cloudscape-design/components/alert';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import Toggle from '@cloudscape-design/components/toggle';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import * as localStorage from '../common/local-storage';
import '@cloudscape-design/global-styles/dark-mode-utils.css';

// ---- Chart Data ----
const networkDays = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12'];

const site1Traffic = [320, 410, 380, 490, 520, 450, 400, 530, 510, 480, 420, 460];
const site2Traffic = [280, 370, 420, 550, 580, 490, 460, 570, 540, 500, 430, 490];

const creditDays = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
const creditUsage = [4200, 6100, 5300, 3100, 5700];
const CREDIT_GOAL = 4500;

// ---- Device Table Data ----
interface Device {
  deviceName: string;
  ipAddress: string;
  macAddress: string;
  status: 'online' | 'offline' | 'warning';
  deviceType: string;
  location: string;
  lastSeen: string;
}

const devices: Device[] = [
  { deviceName: 'Router-Core-01', ipAddress: '192.168.1.1', macAddress: 'AA:BB:CC:11:22:33', status: 'online', deviceType: 'Router', location: 'Data Center', lastSeen: '2 min ago' },
  { deviceName: 'Switch-Floor2', ipAddress: '192.168.1.10', macAddress: 'AA:BB:CC:44:55:66', status: 'online', deviceType: 'Switch', location: 'Floor 2', lastSeen: '5 min ago' },
  { deviceName: 'AP-Lobby-01', ipAddress: '192.168.1.20', macAddress: 'AA:BB:CC:77:88:99', status: 'warning', deviceType: 'Access Point', location: 'Lobby', lastSeen: '12 min ago' },
  { deviceName: 'Server-Web-01', ipAddress: '192.168.2.1', macAddress: 'DD:EE:FF:11:22:33', status: 'online', deviceType: 'Server', location: 'Data Center', lastSeen: '1 min ago' },
  { deviceName: 'Server-DB-01', ipAddress: '192.168.2.2', macAddress: 'DD:EE:FF:44:55:66', status: 'online', deviceType: 'Server', location: 'Data Center', lastSeen: '1 min ago' },
  { deviceName: 'Workstation-HR-01', ipAddress: '192.168.3.10', macAddress: 'GG:HH:II:11:22:33', status: 'offline', deviceType: 'Workstation', location: 'HR Office', lastSeen: '3 hrs ago' },
  { deviceName: 'Printer-Floor1', ipAddress: '192.168.3.50', macAddress: 'GG:HH:II:44:55:66', status: 'online', deviceType: 'Printer', location: 'Floor 1', lastSeen: '18 min ago' },
  { deviceName: 'AP-Conf-Room-A', ipAddress: '192.168.1.21', macAddress: 'AA:BB:CC:AA:BB:CC', status: 'online', deviceType: 'Access Point', location: 'Conf Room A', lastSeen: '8 min ago' },
  { deviceName: 'Firewall-01', ipAddress: '192.168.0.1', macAddress: 'FF:11:22:33:44:55', status: 'online', deviceType: 'Firewall', location: 'Data Center', lastSeen: '2 min ago' },
  { deviceName: 'NAS-Storage-01', ipAddress: '192.168.2.10', macAddress: 'DD:EE:FF:AA:BB:CC', status: 'warning', deviceType: 'NAS', location: 'Storage Room', lastSeen: '25 min ago' },
  { deviceName: 'Camera-Entrance', ipAddress: '192.168.4.1', macAddress: '11:22:33:44:55:66', status: 'online', deviceType: 'IP Camera', location: 'Entrance', lastSeen: '3 min ago' },
  { deviceName: 'Workstation-Dev-05', ipAddress: '192.168.3.15', macAddress: 'GG:HH:II:AA:BB:CC', status: 'online', deviceType: 'Workstation', location: 'Dev Office', lastSeen: '7 min ago' },
];

const DEVICES_PER_PAGE = 8;

const statusType: Record<Device['status'], 'success' | 'error' | 'warning'> = {
  online: 'success',
  offline: 'error',
  warning: 'warning',
};

const statusLabel: Record<Device['status'], string> = {
  online: 'Online',
  offline: 'Offline',
  warning: 'Warning',
};

export default function NetworkDashboard() {
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [warningDismissed, setWarningDismissed] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
  const [chartPage, setChartPage] = useState(1);

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.load<boolean>('Awsui-Theme-Mode') ?? false;
  });

  useEffect(() => {
    const theme = darkMode ? 'awsui-dark-mode' : 'awsui-light-mode';
    document.body.classList.remove('awsui-dark-mode', 'awsui-light-mode');
    document.body.classList.add(theme);
    localStorage.save('Awsui-Theme-Mode', darkMode);
  }, [darkMode]);

  const filteredDevices = devices.filter(
    d =>
      d.deviceName.toLowerCase().includes(filterText.toLowerCase()) ||
      d.ipAddress.includes(filterText) ||
      d.deviceType.toLowerCase().includes(filterText.toLowerCase()) ||
      d.location.toLowerCase().includes(filterText.toLowerCase()),
  );

  const paginatedDevices = filteredDevices.slice((currentPage - 1) * DEVICES_PER_PAGE, currentPage * DEVICES_PER_PAGE);
  const totalPages = Math.max(1, Math.ceil(filteredDevices.length / DEVICES_PER_PAGE));

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
                Network Administration Dashboard
              </Header>

              <SpaceBetween direction="horizontal" size="xs" alignItems="center">
                <Box style={{ flex: 1 }}>
                  <TextFilter
                    filteringText={filterText}
                    filteringPlaceholder="Search devices, IP, type, location..."
                    filteringAriaLabel="Filter devices"
                    onChange={({ detail }) => {
                      setFilterText(detail.filteringText);
                      setCurrentPage(1);
                    }}
                  />
                </Box>
                <Pagination
                  currentPageIndex={chartPage}
                  pagesCount={5}
                  onChange={({ detail }) => setChartPage(detail.currentPageIndex)}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber} of 5`,
                  }}
                />
              </SpaceBetween>

              {!warningDismissed && (
                <Alert
                  type="warning"
                  dismissible
                  onDismiss={() => setWarningDismissed(true)}
                >
                  This is a warning message
                </Alert>
              )}
            </SpaceBetween>
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
              <Container>
                <AreaChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'area',
                      data: networkDays.map((day, i) => ({ x: day, y: site1Traffic[i] })),
                      color: '#688AE8',
                    },
                    {
                      title: 'Site 2',
                      type: 'area',
                      data: networkDays.map((day, i) => ({ x: day, y: site2Traffic[i] })),
                      color: '#C33D69',
                    },
                    {
                      title: 'Performance goal',
                      type: 'line',
                      data: networkDays.map(day => ({ x: day, y: 400 })),
                      color: '#5F6B7A',
                      valueFormatter: () => '400 Mbps',
                    },
                  ]}
                  xDomain={networkDays}
                  xScaleType="categorical"
                  yDomain={[0, 1500]}
                  height={300}
                  xTitle="Day"
                  yTitle="Network traffic (Mbps)"
                  ariaLabel="Network traffic area chart"
                  hideFilter
                  statusType="finished"
                  loadingText="Loading chart..."
                  errorText="Error loading data."
                  recoveryText="Retry"
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xTickFormatter: x => x,
                    yTickFormatter: y => `${y}`,
                  }}
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

              <Container>
                <BarChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'bar',
                      data: creditDays.map((day, i) => ({ x: day, y: creditUsage[i] })),
                      color: '#688AE8',
                    },
                    {
                      title: 'Performance goal',
                      type: 'threshold',
                      y: CREDIT_GOAL,
                      color: '#5F6B7A',
                    },
                  ]}
                  xDomain={creditDays}
                  yDomain={[0, 7000]}
                  height={300}
                  xTitle="Day"
                  yTitle="Credit Usage"
                  ariaLabel="Credit usage bar chart"
                  hideFilter
                  statusType="finished"
                  loadingText="Loading chart..."
                  errorText="Error loading data."
                  recoveryText="Retry"
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xTickFormatter: x => x,
                    yTickFormatter: y => `${y}`,
                  }}
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

            {/* Devices Table */}
            <Table
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
                  id: 'status',
                  header: 'Status',
                  cell: item => (
                    <StatusIndicator type={statusType[item.status]}>
                      {statusLabel[item.status]}
                    </StatusIndicator>
                  ),
                  sortingField: 'status',
                },
                {
                  id: 'deviceType',
                  header: 'Device Type',
                  cell: item => item.deviceType,
                  sortingField: 'deviceType',
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
              ]}
              items={paginatedDevices}
              selectionType="multi"
              selectedItems={selectedDevices}
              onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
              trackBy="deviceName"
              ariaLabels={{
                selectionGroupLabel: 'Device selection',
                allItemsSelectionLabel: () => 'Select all devices',
                itemSelectionLabel: (_, item) => `Select ${item.deviceName}`,
              }}
              filter={
                <TextFilter
                  filteringText={filterText}
                  filteringPlaceholder="Search devices"
                  filteringAriaLabel="Filter devices"
                  countText={`${filteredDevices.length} matches`}
                  onChange={({ detail }) => {
                    setFilterText(detail.filteringText);
                    setCurrentPage(1);
                  }}
                />
              }
              pagination={
                <Pagination
                  currentPageIndex={currentPage}
                  pagesCount={totalPages}
                  onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber} of ${totalPages}`,
                  }}
                />
              }
              empty={
                <Box textAlign="center" color="inherit" margin={{ top: 'l', bottom: 'l' }}>
                  <Box variant="strong" color="inherit">
                    No devices found
                  </Box>
                  <Box variant="p" color="inherit">
                    Try adjusting your search filter.
                  </Box>
                </Box>
              }
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
