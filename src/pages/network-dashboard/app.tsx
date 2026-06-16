// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useEffect, useState } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Flashbar from '@cloudscape-design/components/flashbar';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';
import Toggle from '@cloudscape-design/components/toggle';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

import * as localStorage from '../../common/local-storage';
import '@cloudscape-design/global-styles/dark-mode-utils.css';

interface Device {
  id: string;
  name: string;
  ipAddress: string;
  macAddress: string;
  type: string;
  status: string;
  location: string;
  lastSeen: string;
}

const DEVICES: Device[] = [
  { id: '1', name: 'Router-Main-01', ipAddress: '192.168.1.1', macAddress: 'A4:C3:F0:85:AC:2D', type: 'Router', status: 'Active', location: 'Building A', lastSeen: '2 min ago' },
  { id: '2', name: 'Switch-Floor2-01', ipAddress: '192.168.1.10', macAddress: 'B8:27:EB:4C:1A:7E', type: 'Switch', status: 'Active', location: 'Building B', lastSeen: '5 min ago' },
  { id: '3', name: 'AP-Lobby-01', ipAddress: '192.168.1.20', macAddress: 'DC:A6:32:1E:3B:4C', type: 'Access Point', status: 'Active', location: 'Lobby', lastSeen: '1 min ago' },
  { id: '4', name: 'Firewall-Edge-01', ipAddress: '10.0.0.1', macAddress: 'F0:18:98:47:2A:C1', type: 'Firewall', status: 'Active', location: 'Server Room', lastSeen: 'Just now' },
  { id: '5', name: 'NAS-Storage-01', ipAddress: '192.168.1.50', macAddress: '00:11:32:AB:CD:EF', type: 'NAS', status: 'Active', location: 'Server Room', lastSeen: '3 min ago' },
  { id: '6', name: 'AP-Floor1-02', ipAddress: '192.168.1.25', macAddress: 'EC:08:6B:9A:3F:11', type: 'Access Point', status: 'Warning', location: 'Building A', lastSeen: '15 min ago' },
  { id: '7', name: 'Switch-Server-01', ipAddress: '192.168.1.15', macAddress: '00:1A:2B:3C:4D:5E', type: 'Switch', status: 'Active', location: 'Server Room', lastSeen: '2 min ago' },
  { id: '8', name: 'Camera-Ext-01', ipAddress: '192.168.2.10', macAddress: 'AC:BC:32:D7:E3:05', type: 'IP Camera', status: 'Active', location: 'Parking Lot', lastSeen: '30 sec ago' },
  { id: '9', name: 'Printer-Admin-01', ipAddress: '192.168.1.80', macAddress: '44:85:00:EF:9C:A2', type: 'Printer', status: 'Idle', location: 'Admin Office', lastSeen: '42 min ago' },
  { id: '10', name: 'VoIP-Phone-101', ipAddress: '192.168.3.101', macAddress: '00:90:7F:12:34:56', type: 'VoIP Phone', status: 'Active', location: 'Building A', lastSeen: '1 min ago' },
  { id: '11', name: 'Router-Backup-01', ipAddress: '10.0.1.1', macAddress: 'C8:D3:FF:00:AB:CD', type: 'Router', status: 'Standby', location: 'Server Room', lastSeen: '8 min ago' },
  { id: '12', name: 'AP-Conf-Room-01', ipAddress: '192.168.1.30', macAddress: '48:2C:6A:1E:E3:7F', type: 'Access Point', status: 'Active', location: 'Conference Room', lastSeen: '4 min ago' },
  { id: '13', name: 'UPS-Monitor-01', ipAddress: '192.168.1.90', macAddress: '00:D0:95:AA:BB:CC', type: 'UPS Monitor', status: 'Active', location: 'Server Room', lastSeen: '10 min ago' },
  { id: '14', name: 'Switch-Lab-01', ipAddress: '192.168.4.1', macAddress: '8C:16:45:F3:22:1A', type: 'Switch', status: 'Active', location: 'Lab', lastSeen: '6 min ago' },
];

const networkTrafficData = [
  { x: new Date(2024, 0, 1), site1: 3800, site2: 2800 },
  { x: new Date(2024, 0, 2), site1: 3500, site2: 4200 },
  { x: new Date(2024, 0, 3), site1: 4100, site2: 4800 },
  { x: new Date(2024, 0, 4), site1: 4400, site2: 5200 },
  { x: new Date(2024, 0, 5), site1: 3900, site2: 5500 },
  { x: new Date(2024, 0, 6), site1: 4200, site2: 5300 },
  { x: new Date(2024, 0, 7), site1: 4600, site2: 5400 },
  { x: new Date(2024, 0, 8), site1: 4300, site2: 4900 },
  { x: new Date(2024, 0, 9), site1: 4500, site2: 5100 },
  { x: new Date(2024, 0, 10), site1: 4800, site2: 5400 },
  { x: new Date(2024, 0, 11), site1: 4200, site2: 5000 },
  { x: new Date(2024, 0, 12), site1: 3900, site2: 4700 },
];

const creditUsageData = [
  { x: 'Jan', y: 4200 },
  { x: 'Feb', y: 6800 },
  { x: 'Mar', y: 4900 },
  { x: 'Apr', y: 3100 },
  { x: 'May', y: 5300 },
];

const PERFORMANCE_GOAL = 4000;

export function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.load<boolean>('Awsui-Theme-Mode') ?? false;
  });
  const [warningDismissed, setWarningDismissed] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);

  const itemsPerPage = 10;

  useEffect(() => {
    const theme = darkMode ? 'awsui-dark-mode' : 'awsui-light-mode';
    document.body.classList.remove('awsui-dark-mode', 'awsui-light-mode');
    document.body.classList.add(theme);
    localStorage.save('Awsui-Theme-Mode', darkMode);
  }, [darkMode]);

  const filteredDevices = DEVICES.filter(device =>
    filterText === '' ||
    device.name.toLowerCase().includes(filterText.toLowerCase()) ||
    device.ipAddress.includes(filterText) ||
    device.type.toLowerCase().includes(filterText.toLowerCase()) ||
    device.location.toLowerCase().includes(filterText.toLowerCase())
  );

  const pageCount = Math.ceil(filteredDevices.length / itemsPerPage);
  const paginatedDevices = filteredDevices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const flashbarItems = warningDismissed ? [] : [
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
                    iconAlign="right"
                    iconName="external"
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
            <div className="network-toolbar">
              <div className="network-toolbar__filter">
                <TextFilter
                  filteringText={filterText}
                  filteringPlaceholder="Search devices, IPs, locations..."
                  filteringAriaLabel="Filter network resources"
                  onChange={({ detail }) => {
                    setFilterText(detail.filteringText);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <div className="network-toolbar__pagination">
                <Pagination
                  currentPageIndex={currentPage}
                  pagesCount={pageCount}
                  onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber} of ${pageCount}`,
                  }}
                />
              </div>
            </div>

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
                      data: networkTrafficData.map(d => ({ x: d.x, y: d.site1 })),
                      color: '#688AE8',
                    },
                    {
                      title: 'Site 2',
                      type: 'area',
                      data: networkTrafficData.map(d => ({ x: d.x, y: d.site2 })),
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
                  yDomain={[0, 7000]}
                  xScaleType="time"
                  xTitle="Day"
                  yTitle="Network traffic (Mbps)"
                  ariaLabel="Network traffic area chart"
                  height={280}
                  i18nStrings={{
                    xTickFormatter: (d: Date) =>
                      `Jan ${d.getDate()}`,
                    yTickFormatter: (v: number) =>
                      v >= 1000 ? `${(v / 1000).toFixed(1)}k` : `${v}`,
                    filterLabel: 'Filter series',
                    filterPlaceholder: 'Filter series',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'line chart',
                  }}
                />
              </Container>

              <Container>
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
                      y: PERFORMANCE_GOAL,
                      color: '#5F6B7A',
                    },
                  ]}
                  xDomain={creditUsageData.map(d => d.x)}
                  yDomain={[0, 8000]}
                  xTitle="Day"
                  yTitle="Credit usage"
                  ariaLabel="Credit usage bar chart"
                  height={280}
                  i18nStrings={{
                    yTickFormatter: (v: number) =>
                      v >= 1000 ? `${(v / 1000).toFixed(1)}k` : `${v}`,
                    filterLabel: 'Filter series',
                    filterPlaceholder: 'Filter series',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                  }}
                />
              </Container>
            </Grid>

            <Table
              columnDefinitions={[
                {
                  id: 'name',
                  header: 'Device Name',
                  cell: item => item.name,
                  sortingField: 'name',
                  minWidth: 160,
                },
                {
                  id: 'ipAddress',
                  header: 'IP Address',
                  cell: item => item.ipAddress,
                  sortingField: 'ipAddress',
                  minWidth: 130,
                },
                {
                  id: 'macAddress',
                  header: 'MAC Address',
                  cell: item => item.macAddress,
                  minWidth: 160,
                },
                {
                  id: 'type',
                  header: 'Device Type',
                  cell: item => item.type,
                  sortingField: 'type',
                  minWidth: 130,
                },
                {
                  id: 'status',
                  header: 'Status',
                  cell: item => (
                    <StatusIndicator
                      type={
                        item.status === 'Active' ? 'success' :
                        item.status === 'Warning' ? 'warning' :
                        item.status === 'Idle' ? 'stopped' :
                        'info'
                      }
                    >
                      {item.status}
                    </StatusIndicator>
                  ),
                  sortingField: 'status',
                  minWidth: 120,
                },
                {
                  id: 'location',
                  header: 'Location',
                  cell: item => item.location,
                  sortingField: 'location',
                  minWidth: 140,
                },
                {
                  id: 'lastSeen',
                  header: 'Last Seen',
                  cell: item => item.lastSeen,
                  minWidth: 120,
                },
              ]}
              items={paginatedDevices}
              selectionType="multi"
              selectedItems={selectedDevices}
              onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
              ariaLabels={{
                selectionGroupLabel: 'Device selection',
                allItemsSelectionLabel: () => 'Select all devices',
                itemSelectionLabel: (_, item) => `Select ${item.name}`,
              }}
              header={
                <Header
                  counter={`(${filteredDevices.length})`}
                  description="Devices on your local network"
                  actions={
                    <Button
                      variant="primary"
                      iconAlign="right"
                      iconName="external"
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
              empty={
                <Box textAlign="center" color="inherit">
                  <b>No devices</b>
                  <Box variant="p" color="inherit">
                    No devices match your filter criteria.
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
                    setCurrentPage(1);
                  }}
                />
              }
              pagination={
                <Pagination
                  currentPageIndex={currentPage}
                  pagesCount={pageCount}
                  onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber} of ${pageCount}`,
                  }}
                />
              }
              variant="full-page"
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
