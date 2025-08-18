// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Flashbar from '@cloudscape-design/components/flashbar';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import Badge from '@cloudscape-design/components/badge';

import '../../styles/network-dashboard.scss';

// Mock data for the charts
const networkTrafficData = [
  {
    title: 'Site 1',
    type: 'area',
    data: [
      { x: new Date('2024-01-01T00:00:00Z'), y: 20 },
      { x: new Date('2024-01-01T01:00:00Z'), y: 25 },
      { x: new Date('2024-01-01T02:00:00Z'), y: 30 },
      { x: new Date('2024-01-01T03:00:00Z'), y: 28 },
      { x: new Date('2024-01-01T04:00:00Z'), y: 35 },
      { x: new Date('2024-01-01T05:00:00Z'), y: 40 },
      { x: new Date('2024-01-01T06:00:00Z'), y: 45 },
      { x: new Date('2024-01-01T07:00:00Z'), y: 42 },
      { x: new Date('2024-01-01T08:00:00Z'), y: 38 },
      { x: new Date('2024-01-01T09:00:00Z'), y: 35 },
      { x: new Date('2024-01-01T10:00:00Z'), y: 30 },
      { x: new Date('2024-01-01T11:00:00Z'), y: 32 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area',
    data: [
      { x: new Date('2024-01-01T00:00:00Z'), y: 15 },
      { x: new Date('2024-01-01T01:00:00Z'), y: 18 },
      { x: new Date('2024-01-01T02:00:00Z'), y: 22 },
      { x: new Date('2024-01-01T03:00:00Z'), y: 26 },
      { x: new Date('2024-01-01T04:00:00Z'), y: 24 },
      { x: new Date('2024-01-01T05:00:00Z'), y: 20 },
      { x: new Date('2024-01-01T06:00:00Z'), y: 18 },
      { x: new Date('2024-01-01T07:00:00Z'), y: 16 },
      { x: new Date('2024-01-01T08:00:00Z'), y: 14 },
      { x: new Date('2024-01-01T09:00:00Z'), y: 12 },
      { x: new Date('2024-01-01T10:00:00Z'), y: 10 },
      { x: new Date('2024-01-01T11:00:00Z'), y: 12 },
    ],
    color: '#C33D69',
  },
];

const creditUsageData = [
  { x: 'x1', y: 183 },
  { x: 'x2', y: 257 },
  { x: 'x3', y: 213 },
  { x: 'x4', y: 122 },
  { x: 'x5', y: 210 },
];

// Mock data for devices table
const deviceData = [
  {
    id: '1',
    deviceName: 'Router-001',
    ipAddress: '192.168.1.1',
    status: 'Online',
    bandwidth: '1000 Mbps',
    lastSeen: '2 minutes ago',
    deviceType: 'Router',
    location: 'Main Office',
  },
  {
    id: '2',
    deviceName: 'Switch-002',
    ipAddress: '192.168.1.10',
    status: 'Online',
    bandwidth: '500 Mbps',
    lastSeen: '5 minutes ago',
    deviceType: 'Switch',
    location: 'Server Room',
  },
  {
    id: '3',
    deviceName: 'AP-003',
    ipAddress: '192.168.1.20',
    status: 'Warning',
    bandwidth: '100 Mbps',
    lastSeen: '1 hour ago',
    deviceType: 'Access Point',
    location: 'Floor 2',
  },
  {
    id: '4',
    deviceName: 'Firewall-004',
    ipAddress: '192.168.1.5',
    status: 'Online',
    bandwidth: '2000 Mbps',
    lastSeen: '30 seconds ago',
    deviceType: 'Firewall',
    location: 'DMZ',
  },
  {
    id: '5',
    deviceName: 'Printer-005',
    ipAddress: '192.168.1.50',
    status: 'Offline',
    bandwidth: '10 Mbps',
    lastSeen: '2 days ago',
    deviceType: 'Printer',
    location: 'Office Floor 1',
  },
];

const tableColumns = [
  {
    id: 'deviceName',
    header: 'Device Name',
    cell: (item: any) => item.deviceName,
    sortingField: 'deviceName',
    width: 150,
  },
  {
    id: 'ipAddress',
    header: 'IP Address',
    cell: (item: any) => item.ipAddress,
    width: 120,
  },
  {
    id: 'status',
    header: 'Status',
    cell: (item: any) => (
      <Badge
        color={
          item.status === 'Online'
            ? 'green'
            : item.status === 'Warning'
            ? 'red'
            : 'grey'
        }
      >
        {item.status}
      </Badge>
    ),
    width: 100,
  },
  {
    id: 'bandwidth',
    header: 'Bandwidth',
    cell: (item: any) => item.bandwidth,
    width: 120,
  },
  {
    id: 'lastSeen',
    header: 'Last Seen',
    cell: (item: any) => item.lastSeen,
    width: 120,
  },
  {
    id: 'deviceType',
    header: 'Device Type',
    cell: (item: any) => item.deviceType,
    width: 120,
  },
  {
    id: 'location',
    header: 'Location',
    cell: (item: any) => item.location,
    width: 150,
  },
];

export function NetworkDashboard() {
  const [filterText, setFilterText] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [showWarning, setShowWarning] = useState(true);
  const itemsPerPage = 10;

  // Filter devices based on search text
  const filteredDevices = deviceData.filter(
    device =>
      device.deviceName.toLowerCase().includes(filterText.toLowerCase()) ||
      device.ipAddress.includes(filterText) ||
      device.status.toLowerCase().includes(filterText.toLowerCase()) ||
      device.deviceType.toLowerCase().includes(filterText.toLowerCase()) ||
      device.location.toLowerCase().includes(filterText.toLowerCase())
  );

  // Paginate filtered devices
  const paginatedDevices = filteredDevices.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage
  );

  const breadcrumbs = [
    { text: 'Service', href: '/' },
    { text: 'Administrative Dashboard', href: '/network-dashboard' },
  ];

  const refreshData = () => {
    // Implement refresh functionality
    console.log('Refreshing data...');
  };

  return (
    <div className="network-dashboard">
      <AppLayout
      navigationHide
      toolsHide
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <BreadcrumbGroup items={breadcrumbs} />
              
              <Header
                variant="h1"
                description="Network Traffic, Credit Usage, and Your Devices"
                actions={
                  <Button 
                    variant="primary" 
                    iconAlign="right" 
                    iconName="external"
                    onClick={refreshData}
                  >
                    Refresh Data
                  </Button>
                }
              >
                Network Administration Dashboard
              </Header>

              {/* Search and Pagination Controls */}
              <div className="pagination-controls">
                <SpaceBetween size="s" direction="horizontal">
                <TextFilter
                  filteringText={filterText}
                  filteringPlaceholder="Placeholder"
                  onChange={({ detail }) => {
                    setFilterText(detail.filteringText);
                    setCurrentPageIndex(1);
                  }}
                />
                
                <Pagination
                  currentPageIndex={currentPageIndex}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  pagesCount={Math.ceil(filteredDevices.length / itemsPerPage)}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber}`,
                  }}
                />
                </SpaceBetween>
              </div>

              {/* Warning Message */}
              {showWarning && (
                <Flashbar
                  items={[
                    {
                      type: 'warning',
                      content: 'This is a warning message',
                      dismissible: true,
                      onDismiss: () => setShowWarning(false),
                      action: (
                        <Button onClick={() => setShowWarning(false)}>
                          Dismiss
                        </Button>
                      ),
                    },
                  ]}
                />
              )}
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {/* Charts Section */}
            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              <Container header={<Header variant="h2">Network traffic</Header>}>
                <AreaChart
                  series={networkTrafficData}
                  height={300}
                  xDomain={[
                    new Date('2024-01-01T00:00:00Z'),
                    new Date('2024-01-01T11:00:00Z'),
                  ]}
                  yDomain={[0, 50]}
                  xTitle="Day"
                  yTitle=""
                  legendTitle="Performance goal"
                  hideFilter
                  hideLegend={false}
                  i18nStrings={{
                    chartAriaRoleDescription: 'Area chart showing network traffic',
                    xAxisAriaRoleDescription: 'Time axis',
                    yAxisAriaRoleDescription: 'Traffic axis',
                  }}
                />
              </Container>

              <Container header={<Header variant="h2">Credit Usage</Header>}>
                <BarChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'bar',
                      data: creditUsageData,
                      color: '#688AE8',
                    },
                  ]}
                  height={300}
                  xTitle="Day"
                  yTitle=""
                  hideFilter
                  hideLegend={false}
                  i18nStrings={{
                    chartAriaRoleDescription: 'Bar chart showing credit usage',
                    xAxisAriaRoleDescription: 'Time axis',
                    yAxisAriaRoleDescription: 'Usage axis',
                  }}
                />
              </Container>
            </Grid>

            {/* My Devices Section */}
            <Container
              header={
                <Header
                  variant="h2"
                  description="Devices on your local network"
                  actions={
                    <Button variant="primary" iconAlign="right" iconName="external">
                      Add Device
                    </Button>
                  }
                >
                  My Devices
                </Header>
              }
            >
              <Table
                columnDefinitions={tableColumns}
                items={paginatedDevices}
                loading={false}
                selectionType="multi"
                selectedItems={selectedItems}
                onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
                sortingColumn={tableColumns[0]}
                empty={
                  <Box textAlign="center" color="inherit">
                    <Box variant="strong" textAlign="center" color="inherit">
                      No devices found
                    </Box>
                    <Box variant="p" padding={{ bottom: 's' }} color="inherit">
                      No devices match the current search criteria.
                    </Box>
                  </Box>
                }
                header={
                  <Header counter={`(${filteredDevices.length})`}>
                    Network Devices
                  </Header>
                }
              />
            </Container>
          </SpaceBetween>
        </ContentLayout>
      }
      />
    </div>
  );
}
