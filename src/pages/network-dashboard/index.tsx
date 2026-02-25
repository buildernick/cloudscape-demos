// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Flashbar from '@cloudscape-design/components/flashbar';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import enMessages from '@cloudscape-design/components/i18n/messages/all.en.json';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';
import Toggle from '@cloudscape-design/components/toggle';

import * as localStorage from '../../common/local-storage';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

// --- Network Traffic (Area Chart) data ---
const networkTrafficSeries = [
  {
    title: 'Site 1',
    type: 'area' as const,
    data: [
      { x: 1, y: 3.2 },
      { x: 2, y: 3.5 },
      { x: 3, y: 3.0 },
      { x: 4, y: 3.8 },
      { x: 5, y: 3.4 },
      { x: 6, y: 3.3 },
      { x: 7, y: 3.9 },
      { x: 8, y: 3.6 },
      { x: 9, y: 4.0 },
      { x: 10, y: 4.1 },
      { x: 11, y: 3.8 },
      { x: 12, y: 3.5 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area' as const,
    data: [
      { x: 1, y: 3.0 },
      { x: 2, y: 3.2 },
      { x: 3, y: 3.8 },
      { x: 4, y: 4.2 },
      { x: 5, y: 4.8 },
      { x: 6, y: 4.5 },
      { x: 7, y: 4.3 },
      { x: 8, y: 4.6 },
      { x: 9, y: 4.9 },
      { x: 10, y: 5.0 },
      { x: 11, y: 4.7 },
      { x: 12, y: 4.3 },
    ],
    color: '#C33D69',
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    y: 3.5,
    color: '#5F6B7A',
  },
] as const;

// --- Credit Usage (Bar Chart) data ---
const creditUsageCategories = ['x1', 'x2', 'x3', 'x4', 'x5'];

const creditUsageSeries = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    data: [
      { x: 'x1', y: 4.2 },
      { x: 'x2', y: 5.8 },
      { x: 'x3', y: 4.8 },
      { x: 'x4', y: 3.2 },
      { x: 'x5', y: 4.5 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    y: 3.5,
    color: '#5F6B7A',
  },
] as const;

// --- Device table data ---
interface Device {
  id: string;
  deviceName: string;
  ipAddress: string;
  status: string;
  deviceType: string;
  location: string;
  lastSeen: string;
  bandwidth: string;
}

const DEVICE_COLUMN_DEFS = [
  { id: 'deviceName', header: 'Device Name', cell: (item: Device) => item.deviceName },
  { id: 'ipAddress', header: 'IP Address', cell: (item: Device) => item.ipAddress },
  { id: 'status', header: 'Status', cell: (item: Device) => item.status },
  { id: 'deviceType', header: 'Device Type', cell: (item: Device) => item.deviceType },
  { id: 'location', header: 'Location', cell: (item: Device) => item.location },
  { id: 'lastSeen', header: 'Last Seen', cell: (item: Device) => item.lastSeen },
  { id: 'bandwidth', header: 'Bandwidth', cell: (item: Device) => item.bandwidth },
];

const DEVICE_STATUSES = ['Active', 'Idle', 'Offline'];
const DEVICE_TYPES = ['Router', 'Switch', 'Hub', 'Server'];
const DEVICE_LOCATIONS = ['US-East', 'US-West', 'EU-Central'];

const devices: Device[] = Array.from({ length: 12 }, (_, i) => ({
  id: `device-${i + 1}`,
  deviceName: `Device-${String(i + 1).padStart(3, '0')}`,
  ipAddress: `192.168.1.${i + 10}`,
  status: DEVICE_STATUSES[i % 3],
  deviceType: DEVICE_TYPES[i % 4],
  location: DEVICE_LOCATIONS[i % 3],
  lastSeen: `${(i + 1) * 5}m ago`,
  bandwidth: `${(10 + i * 7).toFixed(1)} Mbps`,
}));

const ITEMS_PER_PAGE = 10;

const areaChartI18n = {
  filterLabel: 'Filter series',
  filterPlaceholder: 'Filter series',
  filterSelectedAriaLabel: 'selected',
  detailPopoverDismissAriaLabel: 'Dismiss',
  legendAriaLabel: 'Legend',
  chartAriaRoleDescription: 'area chart',
  xAxisAriaRoleDescription: 'x axis',
  yAxisAriaRoleDescription: 'y axis',
  xTickFormatter: (v: number) => `x${v}`,
  yTickFormatter: (v: number) => `y${v}`,
};

const barChartI18n = {
  filterLabel: 'Filter series',
  filterPlaceholder: 'Filter series',
  filterSelectedAriaLabel: 'selected',
  detailPopoverDismissAriaLabel: 'Dismiss',
  legendAriaLabel: 'Legend',
  chartAriaRoleDescription: 'bar chart',
  xAxisAriaRoleDescription: 'x axis',
  yAxisAriaRoleDescription: 'y axis',
  yTickFormatter: (v: number) => `y${v}`,
};

export default function NetworkDashboard() {
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState<Device[]>([]);
  const [warningVisible, setWarningVisible] = useState(true);

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
      d.status.toLowerCase().includes(filterText.toLowerCase()),
  );

  const paginatedDevices = filteredDevices.slice(
    (currentPageIndex - 1) * ITEMS_PER_PAGE,
    currentPageIndex * ITEMS_PER_PAGE,
  );

  const flashItems = warningVisible
    ? [
        {
          type: 'warning' as const,
          content: 'This is a warning message',
          dismissible: true,
          onDismiss: () => setWarningVisible(false),
        },
      ]
    : [];

  return (
    <I18nProvider locale="en" messages={[enMessages]}>
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

                <Grid
                  gridDefinition={[
                    { colspan: { default: 12, m: 8 } },
                    { colspan: { default: 12, m: 4 } },
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
                  <Box float="right">
                    <Pagination
                      currentPageIndex={currentPageIndex}
                      onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                      pagesCount={5}
                      ariaLabels={{
                        nextPageLabel: 'Next page',
                        previousPageLabel: 'Previous page',
                        pageLabel: n => `Page ${n} of 5`,
                      }}
                    />
                  </Box>
                </Grid>

                {warningVisible && <Flashbar items={flashItems} />}
              </SpaceBetween>
            }
          >
            <SpaceBetween size="l">
              {/* Charts */}
              <Grid
                gridDefinition={[
                  { colspan: { default: 12, m: 6 } },
                  { colspan: { default: 12, m: 6 } },
                ]}
              >
                <Container>
                  <AreaChart
                    series={networkTrafficSeries}
                    xDomain={[1, 12]}
                    yDomain={[0, 6]}
                    height={300}
                    xTitle="Day"
                    xScaleType="linear"
                    ariaLabel="Network traffic"
                    ariaDescription="Area chart showing network traffic for Site 1 and Site 2 across 12 days."
                    hideFilter
                    i18nStrings={areaChartI18n}
                  />
                </Container>

                <Container>
                  <BarChart
                    series={creditUsageSeries}
                    xDomain={creditUsageCategories}
                    yDomain={[0, 6]}
                    height={300}
                    xTitle="Day"
                    xScaleType="categorical"
                    ariaLabel="Credit usage"
                    ariaDescription="Bar chart showing credit usage for Site 1 across 5 days."
                    hideFilter
                    i18nStrings={barChartI18n}
                  />
                </Container>
              </Grid>

              {/* Devices Table */}
              <Table
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
                columnDefinitions={DEVICE_COLUMN_DEFS}
                items={paginatedDevices}
                selectionType="multi"
                selectedItems={selectedItems}
                onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
                trackBy="id"
                ariaLabels={{
                  selectionGroupLabel: 'Device selection',
                  allItemsSelectionLabel: () => 'Select all devices',
                  itemSelectionLabel: ({ selectedItems: s }, item) =>
                    `${item.deviceName} is ${s.includes(item) ? '' : 'not '}selected`,
                }}
                pagination={
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                    pagesCount={Math.max(1, Math.ceil(filteredDevices.length / ITEMS_PER_PAGE))}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: n => `Page ${n}`,
                    }}
                  />
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
                empty={
                  <Box textAlign="center" color="inherit" padding="xl">
                    <Box variant="strong">No devices found</Box>
                    <Box variant="p" color="inherit">
                      No devices match the current filter.
                    </Box>
                  </Box>
                }
              />
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </I18nProvider>
  );
}
