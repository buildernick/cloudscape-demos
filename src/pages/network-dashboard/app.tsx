// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Grid from '@cloudscape-design/components/grid';
import Button from '@cloudscape-design/components/button';
import Pagination from '@cloudscape-design/components/pagination';
import TextFilter from '@cloudscape-design/components/text-filter';
import Box from '@cloudscape-design/components/box';
import Flashbar from '@cloudscape-design/components/flashbar';
import Table from '@cloudscape-design/components/table';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Toggle from '@cloudscape-design/components/toggle';
import Icon from '@cloudscape-design/components/icon';

import { CustomAppLayout } from '../commons/common-components';
import * as localStorage from '../../common/local-storage';

import '@cloudscape-design/global-styles/dark-mode-utils.css';
import '../../styles/base.scss';

// Mock data for network traffic area chart
const networkTrafficData = [
  { x: 'x1', y1: 40, y2: 30 },
  { x: 'x2', y1: 50, y2: 42 },
  { x: 'x3', y1: 55, y2: 48 },
  { x: 'x4', y1: 48, y2: 45 },
  { x: 'x5', y1: 52, y2: 50 },
  { x: 'x6', y1: 60, y2: 58 },
  { x: 'x7', y1: 35, y2: 25 },
  { x: 'x8', y1: 42, y2: 30 },
  { x: 'x9', y1: 18, y2: 15 },
  { x: 'x10', y1: 25, y2: 20 },
  { x: 'x11', y1: 48, y2: 38 },
  { x: 'x12', y1: 65, y2: 55 },
];

// Mock data for credit usage bar chart
const creditUsageData = [
  { x: 'x1', y: 45 },
  { x: 'x2', y: 62 },
  { x: 'x3', y: 52 },
  { x: 'x4', y: 30 },
  { x: 'x5', y: 51 },
];

// Mock table data for devices
const generateDevices = () => {
  const devices = [];
  for (let i = 1; i <= 12; i++) {
    devices.push({
      id: i,
      deviceName: `Device ${i}`,
      ipAddress: `192.168.1.${i}`,
      status: i % 3 === 0 ? 'Offline' : 'Online',
      type: i % 2 === 0 ? 'Router' : 'Computer',
      location: `Building ${Math.ceil(i / 3)}`,
      lastSeen: `${i} hours ago`,
      bandwidth: `${Math.floor(Math.random() * 100)} Mbps`,
    });
  }
  return devices;
};

export function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef<AppLayoutProps.Ref>(null);
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [dismissedWarning, setDismissedWarning] = useState(false);

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.load<boolean>('Awsui-Theme-Mode') ?? false;
  });

  React.useEffect(() => {
    const theme = darkMode ? 'awsui-dark-mode' : 'awsui-light-mode';
    document.body.classList.remove('awsui-dark-mode', 'awsui-light-mode');
    document.body.classList.add(theme);
    localStorage.save('Awsui-Theme-Mode', darkMode);
  }, [darkMode]);

  const devices = generateDevices();
  const filteredDevices = devices.filter(
    device =>
      device.deviceName.toLowerCase().includes(filterText.toLowerCase()) ||
      device.ipAddress.includes(filterText) ||
      device.status.toLowerCase().includes(filterText.toLowerCase()),
  );

  const columnDefinitions = [
    {
      id: 'deviceName',
      header: 'Device Name',
      cell: (item: any) => item.deviceName,
      sortingField: 'deviceName',
    },
    {
      id: 'ipAddress',
      header: 'IP Address',
      cell: (item: any) => item.ipAddress,
      sortingField: 'ipAddress',
    },
    {
      id: 'status',
      header: 'Status',
      cell: (item: any) => item.status,
      sortingField: 'status',
    },
    {
      id: 'type',
      header: 'Type',
      cell: (item: any) => item.type,
      sortingField: 'type',
    },
    {
      id: 'location',
      header: 'Location',
      cell: (item: any) => item.location,
      sortingField: 'location',
    },
    {
      id: 'lastSeen',
      header: 'Last Seen',
      cell: (item: any) => item.lastSeen,
      sortingField: 'lastSeen',
    },
    {
      id: 'bandwidth',
      header: 'Bandwidth',
      cell: (item: any) => item.bandwidth,
      sortingField: 'bandwidth',
    },
  ];

  return (
    <CustomAppLayout
      ref={appLayout}
      navigationHide
      toolsHide
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <BreadcrumbGroup
                items={[
                  { text: 'Service', href: '#/' },
                  { text: 'Administrative Dashboard', href: '#/network-dashboard' },
                ]}
              />

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

              {!dismissedWarning && (
                <Flashbar
                  items={[
                    {
                      type: 'warning',
                      content: 'This is a warning message',
                      dismissible: true,
                      onDismiss: () => setDismissedWarning(true),
                      id: 'warning-message',
                    },
                  ]}
                />
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <div style={{ flex: '1', maxWidth: '500px' }}>
                  <TextFilter
                    filteringText={filterText}
                    filteringPlaceholder="Placeholder"
                    filteringAriaLabel="Filter devices"
                    onChange={({ detail }) => setFilterText(detail.filteringText)}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    pagesCount={5}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  />
                  <div
                    style={{
                      width: '2px',
                      height: '32px',
                      backgroundColor: 'var(--color-border-divider-default)',
                    }}
                  />
                  <Button iconName="settings" variant="icon" ariaLabel="Settings" />
                </div>
              </div>
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            <Grid gridDefinition={[{ colspan: { default: 12, s: 6 } }, { colspan: { default: 12, s: 6 } }]}>
              <Container>
                <SpaceBetween size="m">
                  <Box variant="h3">Network traffic</Box>
                  <AreaChart
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
                    yDomain={[0, 70]}
                    i18nStrings={{
                      filterLabel: 'Filter displayed data',
                      filterPlaceholder: 'Filter data',
                      filterSelectedAriaLabel: 'selected',
                      detailPopoverDismissAriaLabel: 'Dismiss',
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'area chart',
                      xTickFormatter: e => e,
                      yTickFormatter: e => e.toString(),
                    }}
                    ariaLabel="Network traffic area chart"
                    height={300}
                    xScaleType="categorical"
                    xTitle="Day"
                    yTitle=""
                    empty={
                      <Box textAlign="center" color="inherit">
                        <b>No data available</b>
                        <Box variant="p" color="inherit">
                          There is no data available
                        </Box>
                      </Box>
                    }
                    noMatch={
                      <Box textAlign="center" color="inherit">
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
                  <Box variant="h3">Credit Usage</Box>
                  <BarChart
                    series={[
                      {
                        title: 'Site 1',
                        type: 'bar',
                        data: creditUsageData,
                        color: '#688AE8',
                      },
                    ]}
                    xDomain={creditUsageData.map(d => d.x)}
                    yDomain={[0, 70]}
                    i18nStrings={{
                      filterLabel: 'Filter displayed data',
                      filterPlaceholder: 'Filter data',
                      filterSelectedAriaLabel: 'selected',
                      detailPopoverDismissAriaLabel: 'Dismiss',
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'bar chart',
                      xTickFormatter: e => e,
                      yTickFormatter: e => e.toString(),
                    }}
                    ariaLabel="Credit usage bar chart"
                    height={300}
                    xScaleType="categorical"
                    xTitle="Day"
                    yTitle=""
                    empty={
                      <Box textAlign="center" color="inherit">
                        <b>No data available</b>
                        <Box variant="p" color="inherit">
                          There is no data available
                        </Box>
                      </Box>
                    }
                    noMatch={
                      <Box textAlign="center" color="inherit">
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

            <Table
              columnDefinitions={columnDefinitions}
              items={filteredDevices}
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
              ariaLabels={{
                selectionGroupLabel: 'Items selection',
                allItemsSelectionLabel: ({ selectedItems }) =>
                  `${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`,
                itemSelectionLabel: ({ selectedItems }, item) => {
                  const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
                  return `${item.deviceName} is ${isItemSelected ? '' : 'not '}selected`;
                },
              }}
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
              variant="full-page"
              stickyHeader
              empty={
                <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
                  <SpaceBetween size="m">
                    <b>No devices</b>
                    <Button>Add Device</Button>
                  </SpaceBetween>
                </Box>
              }
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
