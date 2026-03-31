// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import './custom-styles.scss';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Flashbar from '@cloudscape-design/components/flashbar';
import Grid from '@cloudscape-design/components/grid';
import Box from '@cloudscape-design/components/box';
import Table from '@cloudscape-design/components/table';
import Container from '@cloudscape-design/components/container';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Modal from '@cloudscape-design/components/modal';
import Badge from '@cloudscape-design/components/badge';

const CHART_COLORS = ['#688AE8', '#C33D69'];

// Sample data for charts matching the Figma design
const areaChartData = [
  { x: 'x1', y1: 95, y2: 85 },
  { x: 'x2', y1: 105, y2: 95 },
  { x: 'x3', y1: 120, y2: 110 },
  { x: 'x4', y1: 115, y2: 105 },
  { x: 'x5', y1: 130, y2: 115 },
  { x: 'x6', y1: 145, y2: 125 },
  { x: 'x7', y1: 155, y2: 135 },
  { x: 'x8', y1: 150, y2: 130 },
  { x: 'x9', y1: 165, y2: 140 },
  { x: 'x10', y1: 175, y2: 150 },
  { x: 'x11', y1: 185, y2: 160 },
  { x: 'x12', y1: 195, y2: 170 },
];

const barChartData = [
  { x: 'x1', y: 183 },
  { x: 'x2', y: 257 },
  { x: 'x3', y: 213 },
  { x: 'x4', y: 122 },
  { x: 'x5', y: 210 },
];

// Sample data for devices table
const deviceTypes = ['Workstation', 'Server', 'Router', 'Switch', 'Printer', 'Access Point'];
const deviceNames = [
  'Office-PC-01',
  'Marketing-Laptop',
  'Dev-Server-01',
  'Router-Main',
  'Switch-Floor2',
  'Printer-HP-01',
  'AP-Conference',
  'Database-Server',
  'File-Server',
  'Backup-Server',
  'Security-Camera-01',
  'VoIP-Phone-01',
  'Tablet-Meeting',
  'Laptop-Sales',
  'Desktop-HR',
];

const deviceData = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: deviceNames[i] || `Device-${i + 1}`,
  type: deviceTypes[i % deviceTypes.length],
  status: i % 4 === 0 ? 'Online' : i % 4 === 1 ? 'Offline' : i % 4 === 2 ? 'Maintenance' : 'Online',
  ip: `192.168.${Math.floor(i / 10) + 1}.${(i % 10) + 100}`,
  lastSeen: i % 4 === 1 ? `${Math.floor(Math.random() * 48 + 1)}h ago` : 'Active',
  usage: `${Math.floor(Math.random() * 80 + 10)}%`,
  bandwidth: `${Math.floor(Math.random() * 400 + 50)} Mbps`,
}));

const tableColumnDefinitions = [
  {
    id: 'name',
    header: 'Device Name',
    cell: (item: any) => item.name,
    sortingField: 'name',
  },
  {
    id: 'type',
    header: 'Type',
    cell: (item: any) => item.type,
    sortingField: 'type',
  },
  {
    id: 'status',
    header: 'Status',
    cell: (item: any) => (
      <Badge color={item.status === 'Online' ? 'green' : item.status === 'Offline' ? 'red' : 'blue'}>
        {item.status}
      </Badge>
    ),
    sortingField: 'status',
  },
  {
    id: 'ip',
    header: 'IP Address',
    cell: (item: any) => item.ip,
    sortingField: 'ip',
  },
  {
    id: 'lastSeen',
    header: 'Last Seen',
    cell: (item: any) => item.lastSeen,
    sortingField: 'lastSeen',
  },
  {
    id: 'usage',
    header: 'CPU Usage',
    cell: (item: any) => item.usage,
    sortingField: 'usage',
  },
  {
    id: 'bandwidth',
    header: 'Bandwidth',
    cell: (item: any) => item.bandwidth,
    sortingField: 'bandwidth',
  },
];

export default function NetworkAdministrationDashboard() {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [showAddDeviceModal, setShowAddDeviceModal] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const itemsPerPage = 10;

  // Filter and paginate device data
  const filteredDevices = deviceData.filter(
    device =>
      device.name.toLowerCase().includes(filterText.toLowerCase()) ||
      device.type.toLowerCase().includes(filterText.toLowerCase()) ||
      device.status.toLowerCase().includes(filterText.toLowerCase()),
  );

  const paginatedDevices = filteredDevices.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage,
  );

  const handleRefreshData = () => {
    // Simulate data refresh
    console.log('Refreshing data...');
  };

  const handleAddDevice = () => {
    setShowAddDeviceModal(true);
  };

  return (
    <AppLayout
      navigationHide
      toolsHide
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <BreadcrumbGroup
                items={[
                  { text: 'Service', href: '/' },
                  { text: 'Administrative Dashboard', href: '/network-administration-dashboard' },
                ]}
                ariaLabel="Breadcrumbs"
              />

              <Header
                variant="h1"
                description="Network Traffic, Credit Usage, and Your Devices"
                actions={
                  <Button variant="primary" iconAlign="right" iconName="external" onClick={handleRefreshData}>
                    Refresh Data
                  </Button>
                }
              >
                Network Administration Dashboard
              </Header>

              <Grid
                gridDefinition={[
                  { colspan: { default: 12, xs: 12, s: 8, m: 8, l: 8, xl: 8 } },
                  { colspan: { default: 12, xs: 12, s: 4, m: 4, l: 4, xl: 4 } },
                ]}
              >
                <TextFilter
                  filteringText={filterText}
                  filteringPlaceholder="Placeholder"
                  filteringAriaLabel="Filter devices"
                  onChange={({ detail }) => {
                    setFilterText(detail.filteringText);
                    setCurrentPageIndex(1);
                  }}
                />
                <Box display="flex" justifyContent="space-between" alignItems="center">
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
                  <Button iconName="settings" variant="icon" />
                </Box>
              </Grid>

              {showWarning && (
                <div className="custom-warning-flashbar">
                  <Flashbar
                    items={[
                      {
                        type: 'warning',
                        content: 'This is a warning message',
                        dismissible: true,
                        onDismiss: () => setShowWarning(false),
                        buttonText: 'Dismiss',
                      },
                    ]}
                  />
                </div>
              )}
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {/* Charts Section */}
            <Grid
              gridDefinition={[
                { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
                { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
              ]}
            >
              <Container header={<Header variant="h2">Network traffic</Header>}>
                <AreaChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'area',
                      data: areaChartData.map(d => ({ x: d.x, y: d.y1 })),
                      color: CHART_COLORS[0],
                    },
                    {
                      title: 'Site 2',
                      type: 'area',
                      data: areaChartData.map(d => ({ x: d.x, y: d.y2 })),
                      color: CHART_COLORS[1],
                    },
                  ]}
                  xDomain={areaChartData.map(d => d.x)}
                  yDomain={[0, 220]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xTickFormatter: e => e.toString(),
                    yTickFormatter: e => e.toString(),
                  }}
                  ariaLabel="Network traffic area chart"
                  height={300}
                  hideLegend={false}
                  hideFilter={true}
                  xScaleType="categorical"
                  yTitle=""
                  xTitle="Day"
                  statusType="finished"
                  additionalFilters={
                    <Box>
                      <SpaceBetween direction="horizontal" size="s">
                        <Box fontSize="body-s" color="text-status-inactive">
                          ■ Site 1
                        </Box>
                        <Box fontSize="body-s" color="text-status-inactive">
                          ■ Site 2
                        </Box>
                        <Box fontSize="body-s" color="text-status-inactive">
                          --- Performance goal
                        </Box>
                      </SpaceBetween>
                    </Box>
                  }
                />
              </Container>

              <Container header={<Header variant="h2">Credit Usage</Header>}>
                <BarChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'bar',
                      data: barChartData,
                      color: CHART_COLORS[0],
                    },
                  ]}
                  xDomain={barChartData.map(d => d.x)}
                  yDomain={[0, 300]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xTickFormatter: e => e.toString(),
                    yTickFormatter: e => e.toString(),
                  }}
                  ariaLabel="Credit usage bar chart"
                  height={300}
                  hideLegend={false}
                  hideFilter={true}
                  xScaleType="categorical"
                  yTitle=""
                  xTitle="Day"
                  statusType="finished"
                  additionalFilters={
                    <Box>
                      <SpaceBetween direction="horizontal" size="s">
                        <Box fontSize="body-s" color="text-status-inactive">
                          ■ Site 1
                        </Box>
                        <Box fontSize="body-s" color="text-status-inactive">
                          --- Performance goal
                        </Box>
                      </SpaceBetween>
                    </Box>
                  }
                />
              </Container>
            </Grid>

            {/* Devices Table Section */}
            <Container
              header={
                <Header
                  variant="h2"
                  description="Devices on your local network"
                  actions={
                    <Button variant="primary" iconAlign="right" iconName="external" onClick={handleAddDevice}>
                      Add Device
                    </Button>
                  }
                >
                  My Devices
                </Header>
              }
            >
              <Table
                columnDefinitions={tableColumnDefinitions}
                items={paginatedDevices}
                loadingText="Loading devices"
                selectionType="multi"
                selectedItems={selectedItems}
                onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
                trackBy="id"
                ariaLabels={{
                  selectionGroupLabel: 'Device selection',
                  itemSelectionLabel: ({ selectedItems }, item) =>
                    `${item.name} is ${selectedItems.filter(i => i.id === item.id).length ? '' : 'not '}selected`,
                  allItemsSelectionLabel: ({ selectedItems }) =>
                    `${selectedItems.length} ${selectedItems.length === 1 ? 'device' : 'devices'} selected`,
                }}
                empty={
                  <Box textAlign="center" color="inherit">
                    <Box variant="strong" textAlign="center" color="inherit">
                      No devices found
                    </Box>
                    <Box variant="p" padding={{ bottom: 's' }} color="inherit">
                      Try different search criteria.
                    </Box>
                  </Box>
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
                header={<Header counter={`(${filteredDevices.length})`}>Network Devices</Header>}
              />
            </Container>
          </SpaceBetween>

          {/* Add Device Modal */}
          <Modal
            onDismiss={() => setShowAddDeviceModal(false)}
            visible={showAddDeviceModal}
            closeAriaLabel="Close modal"
            size="medium"
            footer={
              <Box float="right">
                <SpaceBetween direction="horizontal" size="xs">
                  <Button variant="link" onClick={() => setShowAddDeviceModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={() => setShowAddDeviceModal(false)}>
                    Add Device
                  </Button>
                </SpaceBetween>
              </Box>
            }
            header="Add New Device"
          >
            <Box>
              <Box variant="p">Configure a new device for network monitoring.</Box>
            </Box>
          </Modal>
        </ContentLayout>
      }
    />
  );
}
