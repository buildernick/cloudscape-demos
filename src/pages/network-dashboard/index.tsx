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
import Input from '@cloudscape-design/components/input';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Toggle from '@cloudscape-design/components/toggle';

import * as localStorage from '../../common/local-storage';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

interface DeviceItem {
  id: string;
  name: string;
  ipAddress: string;
  macAddress: string;
  deviceType: string;
  status: string;
  bandwidth: string;
  lastSeen: string;
}

const DEVICES_DATA: DeviceItem[] = [
  {
    id: '1',
    name: 'Router-Main',
    ipAddress: '192.168.1.1',
    macAddress: '00:1B:44:11:3A:B7',
    deviceType: 'Router',
    status: 'Active',
    bandwidth: '1.2 Gbps',
    lastSeen: '2 mins ago',
  },
  {
    id: '2',
    name: 'Laptop-Office',
    ipAddress: '192.168.1.15',
    macAddress: 'A4:5E:60:E8:2F:9C',
    deviceType: 'Computer',
    status: 'Active',
    bandwidth: '245 Mbps',
    lastSeen: '1 min ago',
  },
  {
    id: '3',
    name: 'iPhone-12',
    ipAddress: '192.168.1.22',
    macAddress: '8C:85:90:3B:07:D1',
    deviceType: 'Mobile',
    status: 'Active',
    bandwidth: '89 Mbps',
    lastSeen: '5 mins ago',
  },
  {
    id: '4',
    name: 'Smart-TV',
    ipAddress: '192.168.1.30',
    macAddress: 'B8:27:EB:4F:A6:12',
    deviceType: 'Media',
    status: 'Active',
    bandwidth: '156 Mbps',
    lastSeen: '3 mins ago',
  },
  {
    id: '5',
    name: 'Nest-Thermostat',
    ipAddress: '192.168.1.45',
    macAddress: '18:B4:30:6C:D2:87',
    deviceType: 'IoT',
    status: 'Active',
    bandwidth: '12 Mbps',
    lastSeen: '10 mins ago',
  },
  {
    id: '6',
    name: 'Gaming-Console',
    ipAddress: '192.168.1.50',
    macAddress: '00:D9:D1:E4:5F:2A',
    deviceType: 'Gaming',
    status: 'Idle',
    bandwidth: '5 Mbps',
    lastSeen: '1 hour ago',
  },
  {
    id: '7',
    name: 'Printer-HP',
    ipAddress: '192.168.1.60',
    macAddress: '34:17:EB:C4:91:5D',
    deviceType: 'Printer',
    status: 'Active',
    bandwidth: '8 Mbps',
    lastSeen: '15 mins ago',
  },
  {
    id: '8',
    name: 'Security-Camera-1',
    ipAddress: '192.168.1.70',
    macAddress: 'DC:A6:32:1F:8E:41',
    deviceType: 'Camera',
    status: 'Active',
    bandwidth: '45 Mbps',
    lastSeen: '1 min ago',
  },
  {
    id: '9',
    name: 'Alexa-Echo',
    ipAddress: '192.168.1.75',
    macAddress: '68:37:E9:1C:2B:94',
    deviceType: 'IoT',
    status: 'Active',
    bandwidth: '18 Mbps',
    lastSeen: '2 mins ago',
  },
  {
    id: '10',
    name: 'Tablet-iPad',
    ipAddress: '192.168.1.80',
    macAddress: 'F0:18:98:7A:3D:C6',
    deviceType: 'Tablet',
    status: 'Idle',
    bandwidth: '2 Mbps',
    lastSeen: '2 hours ago',
  },
];

const NETWORK_TRAFFIC_DATA = [
  { x: 1, site1: 120, site2: 80 },
  { x: 2, site1: 135, site2: 95 },
  { x: 3, site1: 142, site2: 88 },
  { x: 4, site1: 138, site2: 92 },
  { x: 5, site1: 145, site2: 98 },
  { x: 6, site1: 155, site2: 105 },
  { x: 7, site1: 148, site2: 110 },
  { x: 8, site1: 152, site2: 102 },
  { x: 9, site1: 160, site2: 95 },
  { x: 10, site1: 158, site2: 100 },
  { x: 11, site1: 165, site2: 108 },
  { x: 12, site1: 170, site2: 115 },
];

const CREDIT_USAGE_DATA = [
  { x: 1, y: 183 },
  { x: 2, y: 257 },
  { x: 3, y: 213 },
  { x: 4, y: 122 },
  { x: 5, y: 210 },
];

export default function NetworkDashboard() {
  const [selectedItems, setSelectedItems] = useState<DeviceItem[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.load<boolean>('Awsui-Theme-Mode') ?? false;
  });
  const [flashbarItems, setFlashbarItems] = useState([
    {
      type: 'warning' as const,
      content: 'This is a warning message',
      dismissible: true,
      dismissLabel: 'Dismiss',
      onDismiss: () => setFlashbarItems([]),
      id: 'warning-message',
    },
  ]);

  useEffect(() => {
    const theme = darkMode ? 'awsui-dark-mode' : 'awsui-light-mode';
    document.body.classList.remove('awsui-dark-mode', 'awsui-light-mode');
    document.body.classList.add(theme);
    localStorage.save('Awsui-Theme-Mode', darkMode);
  }, [darkMode]);

  const pageSize = 10;
  const filteredDevices = DEVICES_DATA.filter(
    device =>
      device.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      device.ipAddress.includes(searchValue) ||
      device.deviceType.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const paginatedDevices = filteredDevices.slice((currentPageIndex - 1) * pageSize, currentPageIndex * pageSize);

  return (
    <AppLayout
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '/' },
            { text: 'Administrative Dashboard', href: '#' },
          ]}
        />
      }
      navigationHide
      toolsHide
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
                  <Button variant="primary" iconName="external" iconAlign="right">
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
            <Flashbar items={flashbarItems} />

            <Grid
              gridDefinition={[
                { colspan: { default: 12, s: 6 } },
                { colspan: { default: 12, s: 6 } },
              ]}
            >
              <Container>
                <AreaChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'area',
                      data: NETWORK_TRAFFIC_DATA.map(d => ({ x: d.x, y: d.site1 })),
                      valueFormatter: value => `${value} GB`,
                    },
                    {
                      title: 'Site 2',
                      type: 'area',
                      data: NETWORK_TRAFFIC_DATA.map(d => ({ x: d.x, y: d.site2 })),
                      valueFormatter: value => `${value} GB`,
                    },
                  ]}
                  xDomain={[1, 12]}
                  yDomain={[0, 200]}
                  xTitle="Day"
                  yTitle="Network traffic"
                  ariaLabel="Network traffic area chart"
                  height={300}
                  hideFilter
                  legendTitle="Legend"
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xTickFormatter: value => `x${value}`,
                    yTickFormatter: undefined,
                  }}
                />
              </Container>

              <Container>
                <BarChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'bar',
                      data: CREDIT_USAGE_DATA,
                      valueFormatter: value => `${value} credits`,
                    },
                  ]}
                  xDomain={[1, 2, 3, 4, 5]}
                  yDomain={[0, 300]}
                  xTitle="Day"
                  yTitle="Credit Usage"
                  ariaLabel="Credit usage bar chart"
                  height={300}
                  hideFilter
                  legendTitle="Legend"
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xTickFormatter: value => `x${value}`,
                    yTickFormatter: undefined,
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
                  id: 'bandwidth',
                  header: 'Bandwidth',
                  cell: item => item.bandwidth,
                },
                {
                  id: 'lastSeen',
                  header: 'Last Seen',
                  cell: item => item.lastSeen,
                },
              ]}
              items={paginatedDevices}
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
              header={
                <Header
                  variant="h2"
                  description="Devices on your local network"
                  actions={
                    <Button variant="primary" iconName="external" iconAlign="right">
                      Add Device
                    </Button>
                  }
                >
                  My Devices
                </Header>
              }
              filter={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ flex: 1 }}>
                    <Input
                      type="search"
                      value={searchValue}
                      onChange={({ detail }) => {
                        setSearchValue(detail.value);
                        setCurrentPageIndex(1);
                      }}
                      placeholder="Placeholder"
                      ariaLabel="Search devices"
                    />
                  </div>
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    pagesCount={Math.ceil(filteredDevices.length / pageSize)}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: pageNumber => `Page ${pageNumber}`,
                    }}
                  />
                  <Button iconName="settings" variant="icon" ariaLabel="Settings" />
                </div>
              }
              pagination={
                <Pagination
                  currentPageIndex={currentPageIndex}
                  pagesCount={Math.ceil(filteredDevices.length / pageSize)}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber}`,
                  }}
                />
              }
              empty={
                <Box textAlign="center" color="inherit">
                  <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                    <b>No devices</b>
                  </Box>
                  <Button>Add device</Button>
                </Box>
              }
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
