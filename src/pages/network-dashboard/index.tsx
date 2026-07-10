// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useEffect, useMemo, useState } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import Toggle from '@cloudscape-design/components/toggle';
import Flashbar, { FlashbarProps } from '@cloudscape-design/components/flashbar';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';

import * as localStorage from '../../common/local-storage';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

interface Device {
  name: string;
  ipAddress: string;
  macAddress: string;
  type: string;
  status: 'online' | 'offline';
  lastSeen: string;
  bandwidth: string;
}

const deviceTypes = ['Laptop', 'Smartphone', 'Smart TV', 'Desktop', 'Tablet', 'IoT Sensor', 'Printer'];

const devices: Device[] = Array.from({ length: 23 }, (_, index) => {
  const type = deviceTypes[index % deviceTypes.length];
  const isOnline = index % 4 !== 0;
  return {
    name: `${type}-${(index + 1).toString().padStart(2, '0')}`,
    ipAddress: `192.168.1.${(index + 10) % 254}`,
    macAddress: `3C:22:${(index + 1).toString(16).padStart(2, '0').toUpperCase()}:A1:B4:0${index % 10}`,
    type,
    status: isOnline ? 'online' : 'offline',
    lastSeen: isOnline ? 'Just now' : `${(index % 6) + 1}h ago`,
    bandwidth: `${(1.2 + (index % 9) * 0.6).toFixed(1)} GB`,
  };
});

const networkTrafficDays = Array.from({ length: 12 }, (_, index) => `Day ${index + 1}`);
const site1Traffic = [220, 260, 300, 320, 300, 340, 330, 360, 430, 480, 475, 330];
const site2Traffic = [250, 290, 330, 480, 470, 450, 440, 410, 560, 545, 540, 340];

const creditUsageWeeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
const creditUsage = [430, 580, 460, 310, 465];

const pageSize = 5;

export default function NetworkDashboard() {
  const [darkMode, setDarkMode] = useState<boolean>(() => localStorage.load<boolean>('Awsui-Theme-Mode') ?? false);

  useEffect(() => {
    const theme = darkMode ? 'awsui-dark-mode' : 'awsui-light-mode';
    document.body.classList.remove('awsui-dark-mode', 'awsui-light-mode');
    document.body.classList.add(theme);
    localStorage.save('Awsui-Theme-Mode', darkMode);
  }, [darkMode]);

  const [filteringText, setFilteringText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [flashItems, setFlashItems] = useState<FlashbarProps.MessageDefinition[]>([
    {
      type: 'warning',
      content: 'This is a warning message',
      dismissible: true,
      dismissLabel: 'Dismiss',
      onDismiss: () => setFlashItems([]),
      id: 'network-warning',
    },
  ]);

  const filteredDevices = useMemo(
    () => devices.filter(device => device.name.toLowerCase().includes(filteringText.toLowerCase())),
    [filteringText],
  );
  const pagesCount = Math.max(1, Math.ceil(filteredDevices.length / pageSize));
  const pagedDevices = filteredDevices.slice((currentPageIndex - 1) * pageSize, currentPageIndex * pageSize);

  return (
    <AppLayout
      navigationHide
      toolsHide
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#' },
            { text: 'Administrative Dashboard', href: '#' },
          ]}
          ariaLabel="Breadcrumbs"
        />
      }
      content={
        <ContentLayout
          header={
            <SpaceBetween size="l">
              <Header
                variant="h1"
                description="Network Traffic, Credit Usage, and Your Devices"
                actions={
                  <SpaceBetween direction="horizontal" size="m" alignItems="center">
                    <Toggle checked={darkMode} onChange={({ detail }) => setDarkMode(detail.checked)} ariaLabel="Toggle dark mode">
                      Dark mode
                    </Toggle>
                    <Button variant="primary" iconName="external" iconAlign="right">
                      Refresh Data
                    </Button>
                  </SpaceBetween>
                }
              >
                Network Adminstration Dashboard
              </Header>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <TextFilter
                    filteringText={filteringText}
                    filteringPlaceholder="Placeholder"
                    filteringAriaLabel="Filter devices"
                    onChange={({ detail }) => {
                      setFilteringText(detail.filteringText);
                      setCurrentPageIndex(1);
                    }}
                  />
                </div>
                <Pagination
                  currentPageIndex={currentPageIndex}
                  pagesCount={pagesCount}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                  }}
                />
                <Button iconName="settings" variant="icon" ariaLabel="Open preferences" />
              </div>
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {flashItems.length > 0 && <Flashbar items={flashItems} />}

            <Grid gridDefinition={[{ colspan: { default: 12, s: 6 } }, { colspan: { default: 12, s: 6 } }]}>
              <Container>
                <AreaChart
                  height={300}
                  fitHeight
                  hideFilter
                  series={[
                    {
                      title: 'Site 1',
                      type: 'area',
                      data: networkTrafficDays.map((day, index) => ({ x: day, y: site1Traffic[index] })),
                      color: '#688AE8',
                      valueFormatter: value => `${value} GB`,
                    },
                    {
                      title: 'Site 2',
                      type: 'area',
                      data: networkTrafficDays.map((day, index) => ({ x: day, y: site2Traffic[index] })),
                      color: '#C33D69',
                      valueFormatter: value => `${value} GB`,
                    },
                    {
                      title: 'Performance goal',
                      type: 'threshold',
                      y: 350,
                      color: '#5F6B7A',
                      valueFormatter: value => `${value} GB`,
                    },
                  ]}
                  xDomain={networkTrafficDays}
                  yDomain={[0, 600]}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle="Network traffic"
                  ariaLabel="Network traffic"
                  ariaDescription="Area chart comparing network traffic between Site 1 and Site 2 against a performance goal."
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xTickFormatter: x => x,
                    yTickFormatter: y => `${y}`,
                  }}
                  empty={
                    <Box textAlign="center" color="inherit">
                      <b>No data available</b>
                    </Box>
                  }
                />
              </Container>

              <Container>
                <BarChart
                  height={300}
                  fitHeight
                  hideFilter
                  hideLegend
                  series={[
                    {
                      type: 'bar',
                      title: 'Site 1',
                      data: creditUsageWeeks.map((week, index) => ({ x: week, y: creditUsage[index] })),
                      color: '#688AE8',
                      valueFormatter: value => `${value} credits`,
                    },
                  ]}
                  xDomain={creditUsageWeeks}
                  yDomain={[0, 600]}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle="Credit Usage"
                  ariaLabel="Credit Usage"
                  ariaDescription="Bar chart showing weekly credit usage."
                  i18nStrings={{
                    xTickFormatter: x => x,
                    yTickFormatter: y => `${y}`,
                  }}
                  empty={
                    <Box textAlign="center" color="inherit">
                      <b>No data available</b>
                    </Box>
                  }
                />
              </Container>
            </Grid>

            <Table<Device>
              header={
                <Header variant="h1" description="Devices on your local network" actions={<Button variant="primary" iconName="external" iconAlign="right">Add Device</Button>}>
                  My Devices
                </Header>
              }
              columnDefinitions={[
                { id: 'name', header: 'Device name', cell: item => item.name, sortingField: 'name' },
                { id: 'ipAddress', header: 'IP address', cell: item => item.ipAddress },
                { id: 'macAddress', header: 'MAC address', cell: item => item.macAddress },
                { id: 'type', header: 'Type', cell: item => item.type },
                {
                  id: 'status',
                  header: 'Status',
                  cell: item => (
                    <StatusIndicator type={item.status === 'online' ? 'success' : 'stopped'}>
                      {item.status === 'online' ? 'Online' : 'Offline'}
                    </StatusIndicator>
                  ),
                },
                { id: 'lastSeen', header: 'Last seen', cell: item => item.lastSeen },
                { id: 'bandwidth', header: 'Bandwidth usage', cell: item => item.bandwidth },
              ]}
              items={pagedDevices}
              selectionType="multi"
              ariaLabels={{
                itemSelectionLabel: (_data, row) => `Select ${row.name}`,
                allItemsSelectionLabel: () => 'Select all devices',
                selectionGroupLabel: 'Device selection',
              }}
              empty={
                <Box textAlign="center" color="inherit">
                  <b>No devices</b>
                </Box>
              }
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
