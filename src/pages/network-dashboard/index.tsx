// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import AppLayoutToolbar from '@cloudscape-design/components/app-layout-toolbar';
import AreaChart, { AreaChartProps } from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import { MixedLineBarChartProps } from '@cloudscape-design/components/mixed-line-bar-chart';
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

import { isVisualRefresh } from '../../common/apply-mode';
import * as localStorage from '../../common/local-storage';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

// ────────────────────────────────────────────────
// Network Traffic data (area chart)
// ────────────────────────────────────────────────
const networkDays = [
  'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6',
  'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12',
];

const site1Traffic = [2.1, 3.0, 2.8, 3.3, 3.1, 3.7, 3.5, 3.9, 3.7, 4.1, 4.4, 4.2];
const site2Traffic = [2.9, 2.4, 3.4, 4.0, 3.7, 2.9, 4.4, 4.7, 4.1, 4.6, 4.5, 4.1];

const networkTrafficSeries: AreaChartProps.Series<string>[] = [
  {
    type: 'area',
    title: 'Site 1',
    color: '#688AE8',
    data: networkDays.map((day, i) => ({ x: day, y: site1Traffic[i] })),
  },
  {
    type: 'area',
    title: 'Site 2',
    color: '#C33D69',
    data: networkDays.map((day, i) => ({ x: day, y: site2Traffic[i] })),
  },
  {
    type: 'threshold',
    title: 'Performance goal',
    y: 3.3,
    color: '#5F6B7A',
  },
];

// ────────────────────────────────────────────────
// Credit Usage data (bar chart)
// ────────────────────────────────────────────────
const creditDays = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'];
const creditValues = [4.2, 5.8, 4.8, 3.2, 4.8];

type BarSeries = MixedLineBarChartProps.BarDataSeries<string> | MixedLineBarChartProps.ThresholdSeries<string>;

const creditUsageSeries: BarSeries[] = [
  {
    type: 'bar',
    title: 'Site 1',
    color: '#688AE8',
    data: creditDays.map((day, i) => ({ x: day, y: creditValues[i] })),
  },
  {
    type: 'threshold',
    title: 'Performance goal',
    y: 4.0,
    color: '#5F6B7A',
  },
];

// ────────────────────────────────────────────────
// Devices table data
// ────────────────────────────────────────────────
interface Device {
  id: string;
  deviceName: string;
  ipAddress: string;
  macAddress: string;
  deviceType: string;
  status: string;
  lastSeen: string;
  bandwidthUsage: string;
}

const devices: Device[] = [
  { id: '1',  deviceName: 'router-core-01',     ipAddress: '192.168.1.1',  macAddress: 'AA:BB:CC:DD:EE:01', deviceType: 'Router',      status: 'Online',   lastSeen: '2 min ago',  bandwidthUsage: '1.2 Gbps' },
  { id: '2',  deviceName: 'switch-floor-02',    ipAddress: '192.168.1.2',  macAddress: 'AA:BB:CC:DD:EE:02', deviceType: 'Switch',      status: 'Online',   lastSeen: '5 min ago',  bandwidthUsage: '450 Mbps' },
  { id: '3',  deviceName: 'ap-lobby-03',        ipAddress: '192.168.1.3',  macAddress: 'AA:BB:CC:DD:EE:03', deviceType: 'Access Point',status: 'Online',   lastSeen: '1 min ago',  bandwidthUsage: '230 Mbps' },
  { id: '4',  deviceName: 'firewall-edge-04',   ipAddress: '192.168.1.4',  macAddress: 'AA:BB:CC:DD:EE:04', deviceType: 'Firewall',    status: 'Online',   lastSeen: 'Just now',   bandwidthUsage: '2.4 Gbps' },
  { id: '5',  deviceName: 'server-nas-05',      ipAddress: '192.168.1.5',  macAddress: 'AA:BB:CC:DD:EE:05', deviceType: 'NAS Server',  status: 'Online',   lastSeen: '3 min ago',  bandwidthUsage: '780 Mbps' },
  { id: '6',  deviceName: 'camera-entrance-06', ipAddress: '192.168.1.6',  macAddress: 'AA:BB:CC:DD:EE:06', deviceType: 'IP Camera',   status: 'Offline',  lastSeen: '2 hrs ago',  bandwidthUsage: '0 Mbps'   },
  { id: '7',  deviceName: 'printer-office-07',  ipAddress: '192.168.1.7',  macAddress: 'AA:BB:CC:DD:EE:07', deviceType: 'Printer',     status: 'Idle',     lastSeen: '15 min ago', bandwidthUsage: '5 Mbps'   },
  { id: '8',  deviceName: 'ap-conference-08',   ipAddress: '192.168.1.8',  macAddress: 'AA:BB:CC:DD:EE:08', deviceType: 'Access Point',status: 'Online',   lastSeen: '1 min ago',  bandwidthUsage: '320 Mbps' },
  { id: '9',  deviceName: 'switch-server-09',   ipAddress: '192.168.1.9',  macAddress: 'AA:BB:CC:DD:EE:09', deviceType: 'Switch',      status: 'Online',   lastSeen: '4 min ago',  bandwidthUsage: '1.1 Gbps' },
  { id: '10', deviceName: 'voip-gateway-10',    ipAddress: '192.168.1.10', macAddress: 'AA:BB:CC:DD:EE:10', deviceType: 'VoIP Gateway',status: 'Online',   lastSeen: '2 min ago',  bandwidthUsage: '45 Mbps'  },
  { id: '11', deviceName: 'ups-monitor-11',     ipAddress: '192.168.1.11', macAddress: 'AA:BB:CC:DD:EE:11', deviceType: 'UPS Monitor', status: 'Online',   lastSeen: '10 min ago', bandwidthUsage: '2 Mbps'   },
  { id: '12', deviceName: 'router-backup-12',   ipAddress: '192.168.1.12', macAddress: 'AA:BB:CC:DD:EE:12', deviceType: 'Router',      status: 'Standby',  lastSeen: '1 hr ago',   bandwidthUsage: '0 Mbps'   },
  { id: '13', deviceName: 'ap-rooftop-13',      ipAddress: '192.168.1.13', macAddress: 'AA:BB:CC:DD:EE:13', deviceType: 'Access Point',status: 'Online',   lastSeen: 'Just now',   bandwidthUsage: '185 Mbps' },
];

const columnDefinitions = [
  { id: 'deviceName',     header: 'Device Name',     cell: (d: Device) => d.deviceName,     sortingField: 'deviceName'     },
  { id: 'ipAddress',      header: 'IP Address',      cell: (d: Device) => d.ipAddress,      sortingField: 'ipAddress'      },
  { id: 'macAddress',     header: 'MAC Address',     cell: (d: Device) => d.macAddress                                      },
  { id: 'deviceType',     header: 'Device Type',     cell: (d: Device) => d.deviceType,     sortingField: 'deviceType'     },
  { id: 'status',         header: 'Status',          cell: (d: Device) => d.status,         sortingField: 'status'         },
  { id: 'lastSeen',       header: 'Last Seen',       cell: (d: Device) => d.lastSeen                                       },
  { id: 'bandwidthUsage', header: 'Bandwidth Usage', cell: (d: Device) => d.bandwidthUsage                                 },
];

const DEVICES_PER_PAGE = 10;

const commonChartI18n = {
  filterLabel: 'Filter displayed data',
  filterPlaceholder: 'Filter data',
  filterSelectedAriaLabel: 'selected',
  legendAriaLabel: 'Legend',
  chartAriaRoleDescription: 'chart',
  xAxisAriaRoleDescription: 'x axis',
  yAxisAriaRoleDescription: 'y axis',
};

const chartEmpty = (
  <Box textAlign="center" color="inherit">
    <b>No data available</b>
  </Box>
);

const chartNoMatch = (
  <Box textAlign="center" color="inherit">
    <b>No matching data</b>
  </Box>
);

// ────────────────────────────────────────────────
// Page component
// ────────────────────────────────────────────────
export default function NetworkDashboard() {
  const [warningDismissed, setWarningDismissed] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.load<boolean>('Awsui-Theme-Mode') ?? false;
  });

  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    const theme = checked ? 'awsui-dark-mode' : 'awsui-light-mode';
    document.body.classList.remove('awsui-dark-mode', 'awsui-light-mode');
    document.body.classList.add(theme);
    localStorage.save('Awsui-Theme-Mode', checked);
  };

  const filteredDevices = devices.filter(
    d =>
      d.deviceName.toLowerCase().includes(filterText.toLowerCase()) ||
      d.ipAddress.includes(filterText) ||
      d.deviceType.toLowerCase().includes(filterText.toLowerCase()) ||
      d.status.toLowerCase().includes(filterText.toLowerCase()),
  );

  const paginatedDevices = filteredDevices.slice(
    (currentPageIndex - 1) * DEVICES_PER_PAGE,
    currentPageIndex * DEVICES_PER_PAGE,
  );

  const flashbarItems = warningDismissed
    ? []
    : [
        {
          type: 'warning' as const,
          content: 'This is a warning message',
          dismissible: true,
          dismissLabel: 'Dismiss warning',
          onDismiss: () => setWarningDismissed(true),
        },
      ];

  const Layout = isVisualRefresh ? AppLayoutToolbar : AppLayout;

  return (
    <I18nProvider locale="en" messages={[enMessages]}>
      <Layout
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
                        onChange={({ detail }) => handleDarkModeToggle(detail.checked)}
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

                <Flashbar items={flashbarItems} />
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
                <Container header={<Header variant="h2">Network traffic</Header>}>
                  <AreaChart
                    series={networkTrafficSeries}
                    xDomain={networkDays}
                    yDomain={[0, 6]}
                    xScaleType="categorical"
                    xTitle="Day"
                    height={280}
                    hideFilter
                    i18nStrings={{
                      ...commonChartI18n,
                      chartAriaRoleDescription: 'area chart',
                    }}
                    ariaLabel="Network traffic over time"
                    loadingText="Loading chart"
                    errorText="Error loading data."
                    recoveryText="Retry"
                    empty={chartEmpty}
                    noMatch={chartNoMatch}
                  />
                </Container>

                <Container header={<Header variant="h2">Credit Usage</Header>}>
                  <BarChart
                    series={creditUsageSeries}
                    xDomain={creditDays}
                    yDomain={[0, 7]}
                    xScaleType="categorical"
                    xTitle="Day"
                    height={280}
                    hideFilter
                    i18nStrings={{
                      ...commonChartI18n,
                      chartAriaRoleDescription: 'bar chart',
                    }}
                    ariaLabel="Credit usage over time"
                    loadingText="Loading chart"
                    errorText="Error loading data."
                    recoveryText="Retry"
                    empty={chartEmpty}
                    noMatch={chartNoMatch}
                  />
                </Container>
              </Grid>

              {/* Devices table */}
              <Table
                columnDefinitions={columnDefinitions}
                items={paginatedDevices}
                selectionType="multi"
                selectedItems={selectedDevices}
                onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
                trackBy="id"
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
                    countText={`${filteredDevices.length} match${filteredDevices.length !== 1 ? 'es' : ''}`}
                    onChange={({ detail }) => {
                      setFilterText(detail.filteringText);
                      setCurrentPageIndex(1);
                    }}
                  />
                }
                pagination={
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    pagesCount={Math.ceil(filteredDevices.length / DEVICES_PER_PAGE)}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
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
                    <Box variant="p">Try changing the filter or add a new device.</Box>
                  </Box>
                }
                loadingText="Loading devices"
                stickyHeader
              />
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </I18nProvider>
  );
}
