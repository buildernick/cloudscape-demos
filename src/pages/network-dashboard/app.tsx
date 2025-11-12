// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
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
import Box from '@cloudscape-design/components/box';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';

import { CustomAppLayout } from '../commons/common-components';

interface Device {
  id: string;
  name: string;
  ipAddress: string;
  status: string;
  bandwidth: string;
  packets: string;
  errors: string;
  lastSeen: string;
}

const generateDeviceData = (): Device[] => {
  const devices: Device[] = [
    {
      id: 'device-1',
      name: 'Server-01',
      ipAddress: '192.168.1.10',
      status: 'Online',
      bandwidth: '125.4 Mbps',
      packets: '2.4M',
      errors: '0',
      lastSeen: '2 mins ago',
    },
    {
      id: 'device-2',
      name: 'Server-02',
      ipAddress: '192.168.1.11',
      status: 'Online',
      bandwidth: '89.7 Mbps',
      packets: '1.8M',
      errors: '0',
      lastSeen: '1 min ago',
    },
    {
      id: 'device-3',
      name: 'Router-Main',
      ipAddress: '192.168.1.1',
      status: 'Online',
      bandwidth: '542.1 Mbps',
      packets: '8.9M',
      errors: '2',
      lastSeen: 'Now',
    },
    {
      id: 'device-4',
      name: 'Gateway-01',
      ipAddress: '192.168.1.254',
      status: 'Online',
      bandwidth: '234.5 Mbps',
      packets: '3.2M',
      errors: '0',
      lastSeen: '30 secs ago',
    },
    {
      id: 'device-5',
      name: 'Workstation-01',
      ipAddress: '192.168.1.100',
      status: 'Online',
      bandwidth: '45.2 Mbps',
      packets: '890K',
      errors: '1',
      lastSeen: '5 mins ago',
    },
    {
      id: 'device-6',
      name: 'Workstation-02',
      ipAddress: '192.168.1.101',
      status: 'Online',
      bandwidth: '67.8 Mbps',
      packets: '1.2M',
      errors: '0',
      lastSeen: '3 mins ago',
    },
    {
      id: 'device-7',
      name: 'NAS-Storage',
      ipAddress: '192.168.1.50',
      status: 'Online',
      bandwidth: '320.6 Mbps',
      packets: '5.1M',
      errors: '0',
      lastSeen: 'Now',
    },
    {
      id: 'device-8',
      name: 'Printer-01',
      ipAddress: '192.168.1.200',
      status: 'Online',
      bandwidth: '2.1 Mbps',
      packets: '45K',
      errors: '0',
      lastSeen: '45 mins ago',
    },
    {
      id: 'device-9',
      name: 'Switch-01',
      ipAddress: '192.168.1.2',
      status: 'Online',
      bandwidth: '890.3 Mbps',
      packets: '15.2M',
      errors: '5',
      lastSeen: 'Now',
    },
    {
      id: 'device-10',
      name: 'AP-WiFi-01',
      ipAddress: '192.168.1.20',
      status: 'Online',
      bandwidth: '156.4 Mbps',
      packets: '2.8M',
      errors: '1',
      lastSeen: '1 min ago',
    },
    {
      id: 'device-11',
      name: 'VPN-Server',
      ipAddress: '192.168.1.30',
      status: 'Online',
      bandwidth: '203.5 Mbps',
      packets: '4.1M',
      errors: '0',
      lastSeen: '10 secs ago',
    },
    {
      id: 'device-12',
      name: 'Backup-01',
      ipAddress: '192.168.1.51',
      status: 'Online',
      bandwidth: '421.2 Mbps',
      packets: '6.7M',
      errors: '0',
      lastSeen: '2 mins ago',
    },
    {
      id: 'device-13',
      name: 'Laptop-Mobile',
      ipAddress: '192.168.1.120',
      status: 'Idle',
      bandwidth: '0 Mbps',
      packets: '0',
      errors: '0',
      lastSeen: '2 hours ago',
    },
  ];
  return devices;
};

const networkTrafficData = [
  { x: 'Mon', y1: 2.8, y2: 2.1 },
  { x: 'Tue', y1: 3.2, y2: 2.9 },
  { x: 'Wed', y1: 3.8, y2: 3.2 },
  { x: 'Thu', y1: 4.5, y2: 3.8 },
  { x: 'Fri', y1: 5.2, y2: 4.6 },
  { x: 'Sat', y1: 4.8, y2: 4.1 },
  { x: 'Sun', y1: 3.5, y2: 2.9 },
  { x: 'Mon', y1: 3.1, y2: 2.5 },
  { x: 'Tue', y1: 3.6, y2: 3.0 },
  { x: 'Wed', y1: 4.2, y2: 3.7 },
  { x: 'Thu', y1: 4.9, y2: 4.2 },
  { x: 'Fri', y1: 5.5, y2: 4.8 },
];

const creditUsageData = [
  { x: 'Mon', y: 2.8 },
  { x: 'Tue', y: 3.9 },
  { x: 'Wed', y: 4.2 },
  { x: 'Thu', y: 3.1 },
  { x: 'Fri', y: 4.8 },
];

export function App() {
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
  const [filteringText, setFilteringText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [showNotification, setShowNotification] = useState(true);

  const allDevices = generateDeviceData();

  const breadcrumbItems = [
    { text: 'Service', href: '#/' },
    { text: 'Administrative Dashboard', href: '#/network-dashboard' },
  ];

  return (
    <CustomAppLayout
      breadcrumbs={<BreadcrumbGroup items={breadcrumbItems} ariaLabel="Breadcrumbs" />}
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <Header
                variant="h1"
                description="Network Traffic, Credit Usage, and Your Devices"
                actions={
                  <Button variant="primary" iconName="external" iconAlign="right">
                    Refresh Data
                  </Button>
                }
              >
                Network Administration Dashboard
              </Header>
              {showNotification && (
                <Flashbar
                  items={[
                    {
                      type: 'warning',
                      dismissible: true,
                      onDismiss: () => setShowNotification(false),
                      content: 'This is a warning message',
                      id: 'warning-message',
                    },
                  ]}
                />
              )}
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              <Container>
                <SpaceBetween size="l">
                  <Box variant="h3" fontWeight="bold">
                    Network traffic
                  </Box>
                  <AreaChart
                    height={300}
                    series={[
                      {
                        title: 'Site 1',
                        type: 'area',
                        data: networkTrafficData.map(d => ({ x: d.x, y: d.y1 })),
                        color: '#688AE8',
                      },
                      {
                        title: 'Site 2',
                        type: 'area',
                        data: networkTrafficData.map(d => ({ x: d.x, y: d.y2 })),
                        color: '#C33D69',
                      },
                    ]}
                    xDomain={networkTrafficData.map(d => d.x)}
                    yDomain={[0, 6]}
                    xTitle="Day"
                    yTitle=""
                    ariaLabel="Network traffic area chart"
                    hideFilter
                    statusType="finished"
                    i18nStrings={{
                      filterLabel: 'Filter displayed data',
                      filterPlaceholder: 'Filter data',
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'area chart',
                      xTickFormatter: (value) => `${value}`,
                      yTickFormatter: (value) => `${value} Gbps`,
                    }}
                  />
                </SpaceBetween>
              </Container>

              <Container>
                <SpaceBetween size="l">
                  <Box variant="h3" fontWeight="bold">
                    Credit Usage
                  </Box>
                  <BarChart
                    height={300}
                    series={[
                      {
                        title: 'Site 1',
                        type: 'bar',
                        data: creditUsageData,
                        color: '#688AE8',
                      },
                    ]}
                    xDomain={creditUsageData.map(d => d.x)}
                    yDomain={[0, 6]}
                    xTitle="Day"
                    yTitle=""
                    ariaLabel="Credit usage bar chart"
                    hideFilter
                    statusType="finished"
                    i18nStrings={{
                      filterLabel: 'Filter displayed data',
                      filterPlaceholder: 'Filter data',
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'bar chart',
                      xTickFormatter: (value) => `${value}`,
                      yTickFormatter: (value) => `${value} Units`,
                    }}
                  />
                </SpaceBetween>
              </Container>
            </Grid>

            <Table
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
              variant="full-page"
              stickyHeader
              columnDefinitions={[
                {
                  id: 'name',
                  header: 'Device Name',
                  cell: (item) => item.name,
                  sortingField: 'name',
                },
                {
                  id: 'ipAddress',
                  header: 'IP Address',
                  cell: (item) => item.ipAddress,
                  sortingField: 'ipAddress',
                },
                {
                  id: 'status',
                  header: 'Status',
                  cell: (item) => item.status,
                  sortingField: 'status',
                },
                {
                  id: 'bandwidth',
                  header: 'Bandwidth',
                  cell: (item) => item.bandwidth,
                  sortingField: 'bandwidth',
                },
                {
                  id: 'packets',
                  header: 'Packets',
                  cell: (item) => item.packets,
                  sortingField: 'packets',
                },
                {
                  id: 'errors',
                  header: 'Errors',
                  cell: (item) => item.errors,
                  sortingField: 'errors',
                },
                {
                  id: 'lastSeen',
                  header: 'Last Seen',
                  cell: (item) => item.lastSeen,
                  sortingField: 'lastSeen',
                },
              ]}
              items={allDevices}
              selectionType="multi"
              selectedItems={selectedDevices}
              onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
              filter={
                <TextFilter
                  filteringText={filteringText}
                  filteringPlaceholder="Placeholder"
                  filteringAriaLabel="Filter devices"
                  onChange={({ detail }) => setFilteringText(detail.filteringText)}
                />
              }
              pagination={
                <Pagination
                  currentPageIndex={currentPageIndex}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  pagesCount={5}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: (pageNumber) => `Page ${pageNumber}`,
                  }}
                />
              }
              ariaLabels={{
                selectionGroupLabel: 'Items selection',
                allItemsSelectionLabel: () => 'select all',
                itemSelectionLabel: ({ selectedItems }, item) => item.id,
              }}
            />
          </SpaceBetween>
        </ContentLayout>
      }
      navigationHide
      toolsHide
      contentType="default"
    />
  );
}
