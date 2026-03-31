// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Alert from '@cloudscape-design/components/alert';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Modal from '@cloudscape-design/components/modal';
import Pagination from '@cloudscape-design/components/pagination';
import RadioGroup from '@cloudscape-design/components/radio-group';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';
import Box from '@cloudscape-design/components/box';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import '../../styles/network-dashboard.scss';

// Sample data for network traffic (area chart) - matching Figma design
const networkTrafficData = [
  {
    title: 'Site 1',
    type: 'area',
    data: [
      { x: new Date(2024, 0, 1), y: 35 },
      { x: new Date(2024, 0, 2), y: 42 },
      { x: new Date(2024, 0, 3), y: 38 },
      { x: new Date(2024, 0, 4), y: 40 },
      { x: new Date(2024, 0, 5), y: 35 },
      { x: new Date(2024, 0, 6), y: 48 },
      { x: new Date(2024, 0, 7), y: 52 },
      { x: new Date(2024, 0, 8), y: 50 },
      { x: new Date(2024, 0, 9), y: 55 },
      { x: new Date(2024, 0, 10), y: 58 },
      { x: new Date(2024, 0, 11), y: 60 },
      { x: new Date(2024, 0, 12), y: 45 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area',
    data: [
      { x: new Date(2024, 0, 1), y: 25 },
      { x: new Date(2024, 0, 2), y: 22 },
      { x: new Date(2024, 0, 3), y: 20 },
      { x: new Date(2024, 0, 4), y: 18 },
      { x: new Date(2024, 0, 5), y: 15 },
      { x: new Date(2024, 0, 6), y: 10 },
      { x: new Date(2024, 0, 7), y: 12 },
      { x: new Date(2024, 0, 8), y: 8 },
      { x: new Date(2024, 0, 9), y: 10 },
      { x: new Date(2024, 0, 10), y: 6 },
      { x: new Date(2024, 0, 11), y: 5 },
      { x: new Date(2024, 0, 12), y: 18 },
    ],
    color: '#C33D69',
  },
];

// Sample data for credit usage (bar chart)
const creditUsageData = [
  {
    title: 'Site 1',
    type: 'bar',
    data: [
      { x: 'x1', y: 60 },
      { x: 'x2', y: 85 },
      { x: 'x3', y: 70 },
      { x: 'x4', y: 40 },
      { x: 'x5', y: 75 },
    ],
  },
];

// Sample device data for table
const generateDeviceData = () => {
  const devices = [];
  const deviceNames = [
    'Desktop-Main',
    'Laptop-Office',
    'Server-001',
    'Workstation-Dev',
    'Laptop-Remote',
    'Server-002',
    'Desktop-Conference',
    'Laptop-Sales',
    'NAS-Storage',
    'Desktop-Design',
    'Laptop-Marketing',
    'Server-Backup',
  ];

  for (let i = 0; i < 12; i++) {
    devices.push({
      id: `device-${i + 1}`,
      name: deviceNames[i],
      ipAddress: `192.168.1.${i + 11}`,
      macAddress: `00:1B:44:11:3A:${(i + 1).toString().padStart(2, '0')}`,
      status: i % 3 === 2 ? 'Offline' : 'Online',
      type: i % 3 === 0 ? 'Desktop' : i % 3 === 1 ? 'Laptop' : 'Server',
      lastSeen: `2024-01-${(i + 11).toString().padStart(2, '0')}`,
      bandwidth: i % 3 === 2 ? '0 Mbps' : `${Math.floor(Math.random() * 50) + 45} Mbps`,
    });
  }
  return devices;
};

const COLUMN_DEFINITIONS = [
  {
    id: 'name',
    header: 'Device Name',
    cell: (item: any) => item.name,
    sortingField: 'name',
    minWidth: 140,
  },
  {
    id: 'ipAddress',
    header: 'IP Address',
    cell: (item: any) => item.ipAddress,
    sortingField: 'ipAddress',
    minWidth: 120,
  },
  {
    id: 'macAddress',
    header: 'MAC Address',
    cell: (item: any) => item.macAddress,
    minWidth: 140,
  },
  {
    id: 'status',
    header: 'Status',
    cell: (item: any) => item.status,
    sortingField: 'status',
    minWidth: 100,
  },
  {
    id: 'type',
    header: 'Device Type',
    cell: (item: any) => item.type,
    sortingField: 'type',
    minWidth: 120,
  },
  {
    id: 'lastSeen',
    header: 'Last Seen',
    cell: (item: any) => item.lastSeen,
    sortingField: 'lastSeen',
    minWidth: 110,
  },
  {
    id: 'bandwidth',
    header: 'Bandwidth',
    cell: (item: any) => item.bandwidth,
    minWidth: 100,
  },
];

export default function NetworkDashboard() {
  const [filteringText, setFilteringText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [showWarning, setShowWarning] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState('');

  const devices = generateDeviceData();
  const itemsPerPage = 10;

  const filteredDevices = devices.filter(
    device =>
      device.name.toLowerCase().includes(filteringText.toLowerCase()) ||
      device.ipAddress.toLowerCase().includes(filteringText.toLowerCase()) ||
      device.macAddress.toLowerCase().includes(filteringText.toLowerCase()),
  );

  const paginatedDevices = filteredDevices.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage,
  );

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
          ariaLabel="Navigation breadcrumbs"
        />
      }
      content={
        <ContentLayout
          header={
            <div style={{ gap: '14px', borderWidth: '5px', borderStyle: 'solid' }}>
              <Header
                variant="h1"
                description="Network Traffic, Credit Usage, and Your Devices"
                actions={
                  <Button
                    variant="primary"
                    iconName="external"
                    iconAlign="right"
                    onClick={() => setShowConfirmModal(true)}
                  >
                    Refresh Data
                  </Button>
                }
              >
                Network Administration Dashboard
              </Header>
            </div>
          }
        >
          <SpaceBetween size="l">
            {showWarning && (
              <Alert type="error" dismissible={true} onDismiss={() => setShowWarning(false)} dismissAriaLabel="Dismiss">
                This is a warning message
              </Alert>
            )}

            <Container>
              <div className="search-pagination-wrapper">
                <Grid
                  gridDefinition={[
                    { colspan: { default: 12, xs: 12, s: 8, m: 8, l: 9, xl: 9 } },
                    { colspan: { default: 12, xs: 12, s: 4, m: 4, l: 3, xl: 3 } },
                  ]}
                >
                  <TextFilter
                    filteringText={filteringText}
                    filteringPlaceholder="Placeholder"
                    filteringAriaLabel="Filter devices"
                    onChange={({ detail }) => setFilteringText(detail.filteringText)}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
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
                  </div>
                </Grid>
              </div>
            </Container>

            <Grid
              gridDefinition={[{ colspan: { default: 12, s: 12, m: 6 } }, { colspan: { default: 12, s: 12, m: 6 } }]}
            >
              <Container>
                <SpaceBetween size="m">
                  <Header variant="h3">Network traffic</Header>
                  <AreaChart
                    series={networkTrafficData}
                    xScaleType="time"
                    yDomain={[0, 100]}
                    i18nStrings={{
                      filterLabel: 'Filter displayed data',
                      filterPlaceholder: 'Filter data',
                      filterSelectedAriaLabel: 'selected',
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'area chart',
                      xTickFormatter: e =>
                        e
                          .toLocaleDateString('en-US', {
                            month: 'numeric',
                            day: 'numeric',
                          })
                          .split('/')
                          .join('/'),
                      yTickFormatter: e => `${e}`,
                    }}
                    ariaLabel="Network traffic area chart showing data for Site 1 and Site 2"
                    height={300}
                    hideFilter
                    xTitle="Day"
                    yTitle=""
                    statusType="finished"
                    empty={
                      <Box textAlign="center" color="inherit" padding={{ top: 'xxl', bottom: 'xxl' }}>
                        <b>No data available</b>
                        <Box variant="p" color="inherit">
                          There is no data available
                        </Box>
                      </Box>
                    }
                    noMatch={
                      <Box textAlign="center" color="inherit" padding={{ top: 'xxl', bottom: 'xxl' }}>
                        <b>No matching data</b>
                        <Box variant="p" color="inherit">
                          There is no matching data to display
                        </Box>
                      </Box>
                    }
                  />
                </SpaceBetween>
              </Container>

              <Container>
                <SpaceBetween size="m">
                  <Header variant="h3">Credit Usage</Header>
                  <BarChart
                    series={creditUsageData}
                    xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
                    yDomain={[0, 100]}
                    i18nStrings={{
                      filterLabel: 'Filter displayed data',
                      filterPlaceholder: 'Filter data',
                      filterSelectedAriaLabel: 'selected',
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'bar chart',
                      xTickFormatter: e => e,
                      yTickFormatter: e => `${e}`,
                    }}
                    ariaLabel="Credit usage bar chart showing daily usage"
                    height={300}
                    hideFilter
                    xTitle="Day"
                    yTitle=""
                    empty={
                      <Box textAlign="center" color="inherit" padding={{ top: 'xxl', bottom: 'xxl' }}>
                        <b>No data available</b>
                        <Box variant="p" color="inherit">
                          There is no data available
                        </Box>
                      </Box>
                    }
                    noMatch={
                      <Box textAlign="center" color="inherit" padding={{ top: 'xxl', bottom: 'xxl' }}>
                        <b>No matching data</b>
                        <Box variant="p" color="inherit">
                          There is no matching data to display
                        </Box>
                      </Box>
                    }
                  />
                </SpaceBetween>
              </Container>
            </Grid>

            <Container
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
            >
              <Table
                columnDefinitions={COLUMN_DEFINITIONS}
                items={paginatedDevices}
                selectionType="multi"
                selectedItems={selectedItems}
                onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
                ariaLabels={{
                  selectionGroupLabel: 'Device selection',
                  allItemsSelectionLabel: ({ selectedItems }) =>
                    `${selectedItems.length} ${selectedItems.length === 1 ? 'device' : 'devices'} selected`,
                  itemSelectionLabel: ({ selectedItems }, item) => {
                    const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
                    return `${item.name} is ${isItemSelected ? '' : 'not'} selected`;
                  },
                }}
                trackBy="id"
                empty={
                  <Box textAlign="center" color="inherit" padding={{ top: 'xxl', bottom: 'xxl' }}>
                    <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                      <b>No devices</b>
                    </Box>
                    <Button variant="primary">Add device</Button>
                  </Box>
                }
                variant="container"
                stickyHeader
                resizableColumns
              />
            </Container>
          </SpaceBetween>
        </ContentLayout>
      }
    >
      <Modal
        visible={showConfirmModal}
        onDismiss={() => setShowConfirmModal(false)}
        header="Confirm Data Refresh"
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link" onClick={() => setShowConfirmModal(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setShowConfirmModal(false);
                  setShowRatingModal(true);
                }}
              >
                Confirm
              </Button>
            </SpaceBetween>
          </Box>
        }
      >
        <SpaceBetween size="m">
          <Box variant="p">
            Are you sure you want to refresh the data? This will reload all network traffic, credit usage, and device
            information.
          </Box>
        </SpaceBetween>
      </Modal>

      <Modal
        visible={showRatingModal}
        onDismiss={() => {
          setShowRatingModal(false);
          setRating('');
        }}
        header="Rate Your Experience"
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button
                variant="link"
                onClick={() => {
                  setShowRatingModal(false);
                  setRating('');
                }}
              >
                Skip
              </Button>
              <Button
                variant="primary"
                disabled={!rating}
                onClick={() => {
                  setShowRatingModal(false);
                  setRating('');
                }}
              >
                Submit
              </Button>
            </SpaceBetween>
          </Box>
        }
      >
        <SpaceBetween size="m">
          <Box variant="p">How would you rate your experience refreshing the data?</Box>
          <RadioGroup
            value={rating}
            onChange={({ detail }) => setRating(detail.value)}
            items={[
              { value: '1', label: '1 - Very Poor' },
              { value: '2', label: '2 - Poor' },
              { value: '3', label: '3 - Below Average' },
              { value: '4', label: '4 - Fair' },
              { value: '5', label: '5 - Average' },
              { value: '6', label: '6 - Good' },
              { value: '7', label: '7 - Very Good' },
              { value: '8', label: '8 - Great' },
              { value: '9', label: '9 - Excellent' },
              { value: '10', label: '10 - Outstanding' },
            ]}
            ariaLabel="Rate your experience from 1 to 10"
          />
        </SpaceBetween>
      </Modal>
    </AppLayout>
  );
}
