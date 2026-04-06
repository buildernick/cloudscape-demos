// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Flashbar from '@cloudscape-design/components/flashbar';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import Toggle from '@cloudscape-design/components/toggle';
import Container from '@cloudscape-design/components/container';

import * as localStorage from '../../common/local-storage';

import '@cloudscape-design/global-styles/dark-mode-utils.css';
import '../../styles/network-dashboard.scss';

// --- Device data ---
interface Device {
  name: string;
  ipAddress: string;
  macAddress: string;
  type: string;
  status: string;
  lastSeen: string;
  dataUsage: string;
}

const devices: Device[] = [
  { name: 'Router-Primary', ipAddress: '192.168.1.1', macAddress: 'A4:C3:F0:12:34:56', type: 'Router', status: 'Active', lastSeen: '2 min ago', dataUsage: '1.2 GB' },
  { name: 'Laptop-01', ipAddress: '192.168.1.101', macAddress: 'B8:27:EB:45:12:CD', type: 'Laptop', status: 'Active', lastSeen: '5 min ago', dataUsage: '340 MB' },
  { name: 'SmartTV-Living', ipAddress: '192.168.1.110', macAddress: 'DC:A6:32:7F:23:AB', type: 'Smart TV', status: 'Idle', lastSeen: '12 min ago', dataUsage: '2.8 GB' },
  { name: 'Printer-Office', ipAddress: '192.168.1.120', macAddress: '00:1A:C2:78:9D:EF', type: 'Printer', status: 'Offline', lastSeen: '3 hrs ago', dataUsage: '12 MB' },
  { name: 'Tablet-02', ipAddress: '192.168.1.115', macAddress: 'F4:5C:89:A1:32:77', type: 'Tablet', status: 'Active', lastSeen: '1 min ago', dataUsage: '560 MB' },
  { name: 'Desktop-02', ipAddress: '192.168.1.102', macAddress: '28:D2:44:83:AA:1F', type: 'Desktop', status: 'Active', lastSeen: 'Just now', dataUsage: '4.1 GB' },
  { name: 'SmartSpeaker-Kitchen', ipAddress: '192.168.1.130', macAddress: '74:DA:38:CC:54:11', type: 'Smart Speaker', status: 'Active', lastSeen: '8 min ago', dataUsage: '45 MB' },
  { name: 'SecurityCam-01', ipAddress: '192.168.1.140', macAddress: 'AC:22:0B:77:D4:39', type: 'IP Camera', status: 'Active', lastSeen: 'Just now', dataUsage: '18.6 GB' },
  { name: 'NAS-Storage', ipAddress: '192.168.1.150', macAddress: '00:11:32:C4:81:B2', type: 'NAS', status: 'Active', lastSeen: '30 sec ago', dataUsage: '32.4 GB' },
  { name: 'Phone-Personal', ipAddress: '192.168.1.116', macAddress: 'E8:FA:02:19:AB:CD', type: 'Smartphone', status: 'Active', lastSeen: '3 min ago', dataUsage: '820 MB' },
  { name: 'Switch-Office', ipAddress: '192.168.1.5', macAddress: 'CC:40:D0:57:F3:02', type: 'Network Switch', status: 'Active', lastSeen: 'Just now', dataUsage: '6.7 GB' },
  { name: 'AccessPoint-01', ipAddress: '192.168.1.3', macAddress: '9C:8E:CD:33:22:11', type: 'Access Point', status: 'Active', lastSeen: 'Just now', dataUsage: '14.3 GB' },
  { name: 'Thermostat-Main', ipAddress: '192.168.1.160', macAddress: '00:AA:BB:CC:11:22', type: 'IoT Device', status: 'Active', lastSeen: '15 min ago', dataUsage: '2 MB' },
];

// --- Chart data ---
const networkTrafficDays = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12'];
const site1TrafficData = [320, 450, 380, 520, 490, 470, 530, 500, 540, 460, 510, 490];
const site2TrafficData = [510, 480, 520, 540, 580, 500, 560, 545, 570, 500, 530, 560];
const performanceGoal = 420;

const creditUsageDays = ['Period 1', 'Period 2', 'Period 3', 'Period 4', 'Period 5'];
const creditData = [420, 680, 510, 330, 500];
const creditGoal = 400;

export function App() {
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
  const [warningDismissed, setWarningDismissed] = useState(false);
  const [headerSearch, setHeaderSearch] = useState('');
  const [headerPage, setHeaderPage] = useState(1);
  const headerTotalPages = 5;
  const itemsPerPage = 10;

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.load<boolean>('Awsui-Theme-Mode') ?? false;
  });

  React.useEffect(() => {
    const theme = darkMode ? 'awsui-dark-mode' : 'awsui-light-mode';
    document.body.classList.remove('awsui-dark-mode', 'awsui-light-mode');
    document.body.classList.add(theme);
    localStorage.save('Awsui-Theme-Mode', darkMode);
  }, [darkMode]);

  const filteredDevices = devices.filter(device =>
    device.name.toLowerCase().includes(filterText.toLowerCase()) ||
    device.ipAddress.includes(filterText) ||
    device.type.toLowerCase().includes(filterText.toLowerCase()) ||
    device.status.toLowerCase().includes(filterText.toLowerCase()),
  );

  const paginatedDevices = filteredDevices.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage,
  );

  const flashbarItems = warningDismissed ? [] : [
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
            { text: 'Administrative Dashboard', href: '/network-dashboard' },
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
              Network Administration Dashboard
            </Header>
          }
        >
          <SpaceBetween size="l">
            {/* Header search + pagination bar */}
            <div className="network-dashboard__header-bar">
              <div className="network-dashboard__header-search">
                <TextFilter
                  filteringText={headerSearch}
                  filteringPlaceholder="Placeholder"
                  filteringAriaLabel="Search dashboard"
                  onChange={({ detail }) => setHeaderSearch(detail.filteringText)}
                />
              </div>
              <div className="network-dashboard__header-controls">
                <Pagination
                  currentPageIndex={headerPage}
                  onChange={({ detail }) => setHeaderPage(detail.currentPageIndex)}
                  pagesCount={headerTotalPages}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber} of ${headerTotalPages}`,
                  }}
                />
                <Button iconName="settings" variant="icon" ariaLabel="Preferences" />
              </div>
            </div>

            {/* Warning flashbar */}
            <Flashbar items={flashbarItems} />

            {/* Charts section */}
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
                      data: networkTrafficDays.map((day, i) => ({ x: day, y: site1TrafficData[i] })),
                      color: '#688AE8',
                    },
                    {
                      title: 'Site 2',
                      type: 'area',
                      data: networkTrafficDays.map((day, i) => ({ x: day, y: site2TrafficData[i] })),
                      color: '#C33D69',
                    },
                    {
                      title: 'Performance goal',
                      type: 'threshold',
                      y: performanceGoal,
                      color: '#5F6B7A',
                    },
                  ]}
                  xTitle="Day"
                  yTitle="Network traffic (Mbps)"
                  ariaLabel="Network traffic area chart"
                  ariaDescription="Area chart showing daily network traffic for Site 1 and Site 2 compared to performance goal."
                  height={300}
                  xScaleType="categorical"
                  i18nStrings={{
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xAxisAriaRoleDescription: 'x axis',
                    yAxisAriaRoleDescription: 'y axis',
                    filterLabel: 'Filter displayed series',
                    filterPlaceholder: 'Filter series',
                    filterSelectedAriaLabel: 'selected',
                  }}
                  hideFilter
                  header={
                    <Header variant="h2">Network traffic</Header>
                  }
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
              <Container>
                <BarChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'bar',
                      data: creditUsageDays.map((day, i) => ({ x: day, y: creditData[i] })),
                      color: '#688AE8',
                    },
                    {
                      title: 'Performance goal',
                      type: 'threshold',
                      y: creditGoal,
                      color: '#5F6B7A',
                    },
                  ]}
                  xTitle="Day"
                  yTitle="Credit Usage"
                  ariaLabel="Credit usage bar chart"
                  ariaDescription="Bar chart showing credit usage per period with performance goal threshold."
                  height={300}
                  xScaleType="categorical"
                  i18nStrings={{
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xAxisAriaRoleDescription: 'x axis',
                    yAxisAriaRoleDescription: 'y axis',
                    filterLabel: 'Filter displayed series',
                    filterPlaceholder: 'Filter series',
                    filterSelectedAriaLabel: 'selected',
                  }}
                  hideFilter
                  header={
                    <Header variant="h2">Credit Usage</Header>
                  }
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
              columnDefinitions={[
                {
                  id: 'name',
                  header: 'Device name',
                  cell: item => item.name,
                  sortingField: 'name',
                },
                {
                  id: 'ipAddress',
                  header: 'IP address',
                  cell: item => item.ipAddress,
                  sortingField: 'ipAddress',
                },
                {
                  id: 'macAddress',
                  header: 'MAC address',
                  cell: item => item.macAddress,
                },
                {
                  id: 'type',
                  header: 'Device type',
                  cell: item => item.type,
                  sortingField: 'type',
                },
                {
                  id: 'status',
                  header: 'Status',
                  cell: item => item.status,
                  sortingField: 'status',
                },
                {
                  id: 'lastSeen',
                  header: 'Last seen',
                  cell: item => item.lastSeen,
                },
                {
                  id: 'dataUsage',
                  header: 'Data usage',
                  cell: item => item.dataUsage,
                  sortingField: 'dataUsage',
                },
              ]}
              items={paginatedDevices}
              selectionType="multi"
              selectedItems={selectedDevices}
              onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
              ariaLabels={{
                itemSelectionLabel: (_data, row) => `Select ${row.name}`,
                allItemsSelectionLabel: () => 'Select all devices',
                selectionGroupLabel: 'Device selection',
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
                <SpaceBetween direction="horizontal" size="xs" alignItems="center">
                  <TextFilter
                    filteringText={filterText}
                    filteringPlaceholder="Find devices"
                    filteringAriaLabel="Filter devices"
                    countText={filterText ? `${filteredDevices.length} matches` : undefined}
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
                <Box textAlign="center" color="inherit" margin={{ vertical: 'l' }}>
                  <Box variant="p" color="inherit">
                    No devices found
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
