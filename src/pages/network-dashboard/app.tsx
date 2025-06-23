// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
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
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';

import { Navigation } from '../commons';
import { CustomAppLayout } from '../commons/common-components';

// Mock data for network traffic area chart
const networkTrafficSeries = [
  {
    title: 'Site 1',
    type: 'area' as const,
    color: '#688AE8',
    data: [
      { x: 'x1', y: 45 },
      { x: 'x2', y: 52 },
      { x: 'x3', y: 48 },
      { x: 'x4', y: 61 },
      { x: 'x5', y: 69 },
      { x: 'x6', y: 66 },
      { x: 'x7', y: 72 },
      { x: 'x8', y: 78 },
      { x: 'x9', y: 75 },
      { x: 'x10', y: 73 },
      { x: 'x11', y: 79 },
      { x: 'x12', y: 82 },
    ],
  },
  {
    title: 'Site 2',
    type: 'area' as const,
    color: '#C33D69',
    data: [
      { x: 'x1', y: 30 },
      { x: 'x2', y: 35 },
      { x: 'x3', y: 42 },
      { x: 'x4', y: 38 },
      { x: 'x5', y: 45 },
      { x: 'x6', y: 50 },
      { x: 'x7', y: 48 },
      { x: 'x8', y: 52 },
      { x: 'x9', y: 47 },
      { x: 'x10', y: 55 },
      { x: 'x11', y: 58 },
      { x: 'x12', y: 60 },
    ],
  },
];

// Mock data for credit usage bar chart
const creditUsageSeries = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    color: '#688AE8',
    data: [
      { x: 'x1', y: 120 },
      { x: 'x2', y: 180 },
      { x: 'x3', y: 150 },
      { x: 'x4', y: 90 },
      { x: 'x5', y: 160 },
    ],
  },
];

// Mock data for devices table
const mockDevices = [
  {
    id: '1',
    name: 'Router-Main-001',
    type: 'Router',
    status: 'Online',
    ipAddress: '192.168.1.1',
    location: 'Server Room A',
    lastSeen: '2024-01-15 14:30:00',
  },
  {
    id: '2',
    name: 'Switch-Floor2-002',
    type: 'Switch',
    status: 'Online',
    ipAddress: '192.168.1.10',
    location: 'Floor 2 Closet',
    lastSeen: '2024-01-15 14:25:00',
  },
  {
    id: '3',
    name: 'AP-Conference-003',
    type: 'Access Point',
    status: 'Offline',
    ipAddress: '192.168.1.20',
    location: 'Conference Room',
    lastSeen: '2024-01-15 13:45:00',
  },
  {
    id: '4',
    name: 'Firewall-DMZ-004',
    type: 'Firewall',
    status: 'Online',
    ipAddress: '192.168.1.2',
    location: 'DMZ',
    lastSeen: '2024-01-15 14:32:00',
  },
  {
    id: '5',
    name: 'Switch-Floor1-005',
    type: 'Switch',
    status: 'Warning',
    ipAddress: '192.168.1.11',
    location: 'Floor 1 Closet',
    lastSeen: '2024-01-15 14:20:00',
  },
  {
    id: '6',
    name: 'AP-Lobby-006',
    type: 'Access Point',
    status: 'Online',
    ipAddress: '192.168.1.21',
    location: 'Main Lobby',
    lastSeen: '2024-01-15 14:31:00',
  },
  {
    id: '7',
    name: 'Router-Backup-007',
    type: 'Router',
    status: 'Standby',
    ipAddress: '192.168.1.3',
    location: 'Server Room B',
    lastSeen: '2024-01-15 14:29:00',
  },
  {
    id: '8',
    name: 'Switch-Floor3-008',
    type: 'Switch',
    status: 'Online',
    ipAddress: '192.168.1.12',
    location: 'Floor 3 Closet',
    lastSeen: '2024-01-15 14:33:00',
  },
];

// Table column definitions
const columnDefinitions = [
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
      <Box
        color={
          item.status === 'Online'
            ? 'text-status-success'
            : item.status === 'Offline'
              ? 'text-status-error'
              : item.status === 'Warning'
                ? 'text-status-warning'
                : 'text-status-info'
        }
      >
        {item.status}
      </Box>
    ),
    sortingField: 'status',
  },
  {
    id: 'ipAddress',
    header: 'IP Address',
    cell: (item: any) => item.ipAddress,
    sortingField: 'ipAddress',
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
];

export function App() {
  const [warningDismissed, setWarningDismissed] = useState(false);
  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    mockDevices,
    {
      filtering: {
        empty: (
          <Box textAlign="center" color="inherit">
            <Box variant="strong" textAlign="center" color="inherit">
              No devices
            </Box>
            <Box variant="p" padding={{ bottom: 's' }} color="inherit">
              No devices to display.
            </Box>
          </Box>
        ),
        noMatch: (
          <Box textAlign="center" color="inherit">
            <Box variant="strong" textAlign="center" color="inherit">
              No matches
            </Box>
            <Box variant="p" padding={{ bottom: 's' }} color="inherit">
              We can't find a match.
            </Box>
            <Button onClick={() => actions.setFiltering('')}>Clear filter</Button>
          </Box>
        ),
      },
      pagination: { pageSize: 10 },
      sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
      selection: {},
    },
  );

  const flashbarItems = warningDismissed
    ? []
    : [
        {
          type: 'warning' as const,
          content: 'This is a warning message',
          dismissible: true,
          dismissLabel: 'Dismiss',
          onDismiss: () => setWarningDismissed(true),
          id: 'warning-message',
        },
      ];

  return (
    <CustomAppLayout
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <Header
                variant="h1"
                actions={
                  <Button variant="primary" iconAlign="right" iconName="refresh">
                    Refresh Data
                  </Button>
                }
              >
                Network Administration Dashboard
              </Header>
              <Box variant="p" color="text-body-secondary">
                Network Traffic, Credit Usage, and Your Devices
              </Box>
            </SpaceBetween>
          }
          notifications={<Flashbar items={flashbarItems} />}
        >
          <SpaceBetween size="l">
            {/* Search bar */}
            <Container>
              <Grid gridDefinition={[{ colspan: { default: 12, xs: 12, s: 12, m: 8, l: 8, xl: 8 } }]}>
                <TextFilter
                  filteringPlaceholder="Placeholder"
                  filteringAriaLabel="Filter devices"
                  filteringClearAriaLabel="Clear"
                />
              </Grid>
            </Container>

            {/* Charts Grid */}
            <Grid
              gridDefinition={[
                { colspan: { default: 12, xxs: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
                { colspan: { default: 12, xxs: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
              ]}
            >
              {/* Network Traffic Area Chart */}
              <Container
                header={
                  <Header variant="h2" description="">
                    Network traffic
                  </Header>
                }
              >
                <AreaChart
                  series={networkTrafficSeries}
                  xDomain={['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12']}
                  yDomain={[0, 100]}
                  height={300}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle=""
                  hideFilter={true}
                  hideLegend={false}
                  stackedBars={true}
                  horizontalBars={false}
                  statusType="finished"
                  ariaLabel="Network traffic area chart"
                  ariaDescription="Area chart showing network traffic for Site 1 and Site 2 over time with performance goal threshold"
                  i18nStrings={{
                    filterLabel: 'Filter displayed data series',
                    filterPlaceholder: 'Filter data series',
                    filterSelectedAriaLabel: 'selected',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xTickFormatter: e => e?.toString() ?? '',
                    yTickFormatter: e => e?.toString() ?? '',
                  }}
                />
                <Box padding={{ top: 's' }}>
                  <SpaceBetween direction="horizontal" size="m">
                    <Box fontSize="body-s" color="text-body-secondary">
                      <Box
                        as="span"
                        display="inline-block"
                        width="14px"
                        height="14px"
                        borderRadius="2px"
                        backgroundColor="#688AE8"
                        marginRight="xs"
                      />
                      Site 1
                    </Box>
                    <Box fontSize="body-s" color="text-body-secondary">
                      <Box
                        as="span"
                        display="inline-block"
                        width="14px"
                        height="14px"
                        borderRadius="2px"
                        backgroundColor="#C33D69"
                        marginRight="xs"
                      />
                      Site 2
                    </Box>
                    <Box fontSize="body-s" color="text-body-secondary">
                      <Box
                        as="span"
                        display="inline-block"
                        width="12px"
                        height="3px"
                        backgroundColor="#5F6B7A"
                        marginRight="xs"
                        style={{
                          background:
                            'repeating-linear-gradient(to right, #5F6B7A 0, #5F6B7A 6px, transparent 6px, transparent 8px)',
                        }}
                      />
                      Performance goal
                    </Box>
                  </SpaceBetween>
                </Box>
              </Container>

              {/* Credit Usage Bar Chart */}
              <Container
                header={
                  <Header variant="h2" description="">
                    Credit Usage
                  </Header>
                }
              >
                <BarChart
                  series={creditUsageSeries}
                  xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
                  yDomain={[0, 200]}
                  height={300}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle=""
                  hideFilter={true}
                  hideLegend={false}
                  stackedBars={false}
                  horizontalBars={false}
                  statusType="finished"
                  ariaLabel="Credit usage bar chart"
                  ariaDescription="Bar chart showing credit usage for Site 1 over time"
                  i18nStrings={{
                    filterLabel: 'Filter displayed data series',
                    filterPlaceholder: 'Filter data series',
                    filterSelectedAriaLabel: 'selected',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xTickFormatter: e => e?.toString() ?? '',
                    yTickFormatter: e => e?.toString() ?? '',
                  }}
                />
                <Box padding={{ top: 's' }}>
                  <SpaceBetween direction="horizontal" size="m">
                    <Box fontSize="body-s" color="text-body-secondary">
                      <Box
                        as="span"
                        display="inline-block"
                        width="14px"
                        height="14px"
                        borderRadius="2px"
                        backgroundColor="#688AE8"
                        marginRight="xs"
                      />
                      Site 1
                    </Box>
                    <Box fontSize="body-s" color="text-body-secondary">
                      <Box
                        as="span"
                        display="inline-block"
                        width="12px"
                        height="3px"
                        backgroundColor="#5F6B7A"
                        marginRight="xs"
                        style={{
                          background:
                            'repeating-linear-gradient(to right, #5F6B7A 0, #5F6B7A 6px, transparent 6px, transparent 8px)',
                        }}
                      />
                      Performance goal
                    </Box>
                  </SpaceBetween>
                </Box>
              </Container>
            </Grid>

            {/* My Devices Section */}
            <Container
              header={
                <Header
                  variant="h2"
                  description="Devices on your local network"
                  actions={
                    <Button variant="primary" iconAlign="right" iconName="add-plus">
                      Add Device
                    </Button>
                  }
                >
                  My Devices
                </Header>
              }
            >
              <Table
                {...collectionProps}
                columnDefinitions={columnDefinitions}
                items={items}
                loadingText="Loading devices"
                selectionType="multi"
                trackBy="id"
                empty={
                  <Box textAlign="center" color="inherit">
                    <Box variant="strong" textAlign="center" color="inherit">
                      No devices
                    </Box>
                    <Box variant="p" padding={{ bottom: 's' }} color="inherit">
                      No devices to display.
                    </Box>
                    <Button>Add device</Button>
                  </Box>
                }
                filter={
                  <TextFilter
                    {...filterProps}
                    filteringAriaLabel="Filter devices"
                    filteringPlaceholder="Find devices"
                    countText={`${filteredItemsCount} matches`}
                  />
                }
                header={
                  <Header
                    counter={
                      collectionProps.selectedItems && collectionProps.selectedItems.length > 0
                        ? `(${collectionProps.selectedItems.length}/${items.length})`
                        : `(${items.length})`
                    }
                  >
                    Network devices
                  </Header>
                }
                pagination={<Pagination {...paginationProps} />}
              />
            </Container>
          </SpaceBetween>
        </ContentLayout>
      }
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#' },
            { text: 'Administrative Dashboard', href: '#' },
          ]}
          ariaLabel="Breadcrumbs"
        />
      }
      navigation={<Navigation activeHref="/network-dashboard" />}
      navigationOpen={false}
      toolsHide={true}
    />
  );
}
