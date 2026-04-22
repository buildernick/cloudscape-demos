// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Flashbar from '@cloudscape-design/components/flashbar';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Toggle from '@cloudscape-design/components/toggle';

import * as localStorage from '../../common/local-storage';
import '@cloudscape-design/global-styles/dark-mode-utils.css';

// --- Data ---

const networkTrafficDays = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12'];

const networkTrafficSeries = [
  {
    title: 'Site 1',
    type: 'area' as const,
    data: [
      { x: 'Day 1', y: 3.2 },
      { x: 'Day 2', y: 3.5 },
      { x: 'Day 3', y: 3.8 },
      { x: 'Day 4', y: 4.1 },
      { x: 'Day 5', y: 3.9 },
      { x: 'Day 6', y: 4.0 },
      { x: 'Day 7', y: 4.2 },
      { x: 'Day 8', y: 4.4 },
      { x: 'Day 9', y: 4.3 },
      { x: 'Day 10', y: 4.5 },
      { x: 'Day 11', y: 4.6 },
      { x: 'Day 12', y: 4.8 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area' as const,
    data: [
      { x: 'Day 1', y: 2.8 },
      { x: 'Day 2', y: 4.2 },
      { x: 'Day 3', y: 4.8 },
      { x: 'Day 4', y: 5.1 },
      { x: 'Day 5', y: 5.3 },
      { x: 'Day 6', y: 4.9 },
      { x: 'Day 7', y: 5.1 },
      { x: 'Day 8', y: 5.2 },
      { x: 'Day 9', y: 5.4 },
      { x: 'Day 10', y: 5.3 },
      { x: 'Day 11', y: 5.1 },
      { x: 'Day 12', y: 4.9 },
    ],
    color: '#C33D69',
  },
];

const creditUsageDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const creditUsageSeries = [
  {
    title: 'Credit Usage',
    type: 'bar' as const,
    data: [
      { x: 'Mon', y: 4.2 },
      { x: 'Tue', y: 6.5 },
      { x: 'Wed', y: 4.8 },
      { x: 'Thu', y: 3.1 },
      { x: 'Fri', y: 5.0 },
    ],
    color: '#688AE8',
  },
];

const generateDevices = () =>
  Array.from({ length: 50 }, (_, i) => ({
    id: `dev-${i + 1}`,
    deviceName: `Device-${String(i + 1).padStart(3, '0')}`,
    ipAddress: `192.168.1.${(i % 254) + 1}`,
    macAddress: `AA:BB:CC:DD:EE:${String(i % 256).padStart(2, '0').toUpperCase()}`,
    status: i % 5 === 0 ? 'Offline' : i % 7 === 0 ? 'Idle' : 'Online',
    type: ['Router', 'Switch', 'Endpoint', 'Server', 'Printer'][i % 5],
    bandwidth: `${(Math.random() * 100).toFixed(1)} Mbps`,
    lastSeen: `${Math.floor(Math.random() * 60) + 1}m ago`,
  }));

const allDevices = generateDevices();

const ITEMS_PER_PAGE = 13;

export default function NetworkDashboard() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.load<boolean>('Awsui-Theme-Mode') ?? false;
  });

  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState<typeof allDevices>([]);
  const [warningDismissed, setWarningDismissed] = useState(false);

  React.useEffect(() => {
    const theme = darkMode ? 'awsui-dark-mode' : 'awsui-light-mode';
    document.body.classList.remove('awsui-dark-mode', 'awsui-light-mode');
    document.body.classList.add(theme);
    localStorage.save('Awsui-Theme-Mode', darkMode);
  }, [darkMode]);

  const filteredDevices = allDevices.filter(
    d =>
      d.deviceName.toLowerCase().includes(filterText.toLowerCase()) ||
      d.ipAddress.includes(filterText) ||
      d.status.toLowerCase().includes(filterText.toLowerCase()) ||
      d.type.toLowerCase().includes(filterText.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredDevices.length / ITEMS_PER_PAGE);
  const pagedDevices = filteredDevices.slice(
    (currentPageIndex - 1) * ITEMS_PER_PAGE,
    currentPageIndex * ITEMS_PER_PAGE,
  );

  const flashbarItems = warningDismissed
    ? []
    : [
        {
          type: 'warning' as const,
          content: 'This is a warning message',
          dismissible: true,
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

              {!warningDismissed && <Flashbar items={flashbarItems} />}

              <Grid
                gridDefinition={[
                  { colspan: { default: 12, s: 6 } },
                  { colspan: { default: 12, s: 6 } },
                ]}
              >
                <Container>
                  <AreaChart
                    series={networkTrafficSeries}
                    xDomain={networkTrafficDays}
                    yDomain={[0, 7]}
                    xScaleType="categorical"
                    xTitle="Day"
                    height={280}
                    hideFilter
                    ariaLabel="Network traffic chart"
                    ariaDescription="Area chart showing network traffic for Site 1 and Site 2 over 12 days"
                    i18nStrings={{
                      filterLabel: 'Filter series',
                      filterPlaceholder: 'Filter series',
                      filterSelectedAriaLabel: 'selected',
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'area chart',
                      xAxisAriaRoleDescription: 'x axis',
                      yAxisAriaRoleDescription: 'y axis',
                      yTickFormatter: v => `${v}`,
                      xTickFormatter: v => v,
                    }}
                    header={
                      <Box variant="h3" padding={{ bottom: 's' }}>
                        Network traffic
                      </Box>
                    }
                  />
                </Container>

                <Container>
                  <BarChart
                    series={creditUsageSeries}
                    xDomain={creditUsageDays}
                    yDomain={[0, 8]}
                    xScaleType="categorical"
                    xTitle="Day"
                    height={280}
                    hideFilter
                    ariaLabel="Credit usage chart"
                    ariaDescription="Bar chart showing credit usage over the week"
                    i18nStrings={{
                      filterLabel: 'Filter series',
                      filterPlaceholder: 'Filter series',
                      filterSelectedAriaLabel: 'selected',
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'bar chart',
                      xAxisAriaRoleDescription: 'x axis',
                      yAxisAriaRoleDescription: 'y axis',
                      yTickFormatter: v => `${v}`,
                      xTickFormatter: v => v,
                    }}
                    header={
                      <Box variant="h3" padding={{ bottom: 's' }}>
                        Credit Usage
                      </Box>
                    }
                  />
                </Container>
              </Grid>
            </SpaceBetween>
          }
        >
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
                cell: item => item.status,
                sortingField: 'status',
              },
              {
                id: 'type',
                header: 'Device Type',
                cell: item => item.type,
                sortingField: 'type',
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
            items={pagedDevices}
            selectionType="multi"
            selectedItems={selectedItems}
            onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
            trackBy="id"
            ariaLabels={{
              selectionGroupLabel: 'Items selection',
              allItemsSelectionLabel: () => 'Select all devices',
              itemSelectionLabel: ({ selectedItems: s }, item) =>
                `${item.deviceName} is ${s.indexOf(item) >= 0 ? '' : 'not '}selected`,
            }}
            filter={
              <TextFilter
                filteringText={filterText}
                filteringPlaceholder="Find devices"
                filteringAriaLabel="Filter devices"
                countText={`${filteredDevices.length} matches`}
                onChange={({ detail }) => {
                  setFilterText(detail.filteringText);
                  setCurrentPageIndex(1);
                }}
              />
            }
            pagination={
              <Pagination
                currentPageIndex={currentPageIndex}
                pagesCount={totalPages}
                onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                ariaLabels={{
                  nextPageLabel: 'Next page',
                  previousPageLabel: 'Previous page',
                  pageLabel: page => `Page ${page} of ${totalPages}`,
                }}
              />
            }
            empty={
              <Box textAlign="center" color="inherit">
                <b>No devices found</b>
                <Box variant="p" color="inherit">
                  No devices match your search criteria.
                </Box>
              </Box>
            }
          />
        </ContentLayout>
      }
    />
  );
}
