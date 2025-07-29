// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import LineChart from '@cloudscape-design/components/line-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Flashbar from '@cloudscape-design/components/flashbar';
import { useCollection } from '@cloudscape-design/collection-hooks';

// Mock data for charts
const networkTrafficData = [
  { x: 'x1', y: 45 },
  { x: 'x2', y: 52 },
  { x: 'x3', y: 48 },
  { x: 'x4', y: 61 },
  { x: 'x5', y: 55 },
  { x: 'x6', y: 67 },
  { x: 'x7', y: 72 },
  { x: 'x8', y: 69 },
  { x: 'x9', y: 58 },
  { x: 'x10', y: 64 },
  { x: 'x11', y: 71 },
  { x: 'x12', y: 68 },
];

const networkTrafficSeries2 = [
  { x: 'x1', y: 35 },
  { x: 'x2', y: 42 },
  { x: 'x3', y: 38 },
  { x: 'x4', y: 51 },
  { x: 'x5', y: 45 },
  { x: 'x6', y: 57 },
  { x: 'x7', y: 62 },
  { x: 'x8', y: 59 },
  { x: 'x9', y: 48 },
  { x: 'x10', y: 54 },
  { x: 'x11', y: 61 },
  { x: 'x12', y: 58 },
];

const creditUsageData = [
  { x: 'x1', y: 183 },
  { x: 'x2', y: 257 },
  { x: 'x3', y: 213 },
  { x: 'x4', y: 122 },
  { x: 'x5', y: 210 },
];

interface Device {
  id: string;
  name: string;
  type: string;
  ip: string;
  status: 'Online' | 'Offline' | 'Warning';
  lastSeen: string;
  bandwidth: string;
  uptime: string;
}

// Mock data for devices table
const deviceData: Device[] = [
  { id: '1', name: 'Router-Main', type: 'Router', ip: '192.168.1.1', status: 'Online', lastSeen: '2 minutes ago', bandwidth: '1 Gbps', uptime: '45 days' },
  { id: '2', name: 'Switch-Office', type: 'Switch', ip: '192.168.1.2', status: 'Online', lastSeen: '5 minutes ago', bandwidth: '100 Mbps', uptime: '32 days' },
  { id: '3', name: 'AP-Conference', type: 'Access Point', ip: '192.168.1.10', status: 'Offline', lastSeen: '2 hours ago', bandwidth: '300 Mbps', uptime: '12 days' },
  { id: '4', name: 'Firewall-Main', type: 'Firewall', ip: '192.168.1.254', status: 'Online', lastSeen: '1 minute ago', bandwidth: '10 Gbps', uptime: '89 days' },
  { id: '5', name: 'Server-DB', type: 'Server', ip: '192.168.1.100', status: 'Warning', lastSeen: '30 minutes ago', bandwidth: '1 Gbps', uptime: '156 days' },
  { id: '6', name: 'Printer-Office', type: 'Printer', ip: '192.168.1.200', status: 'Online', lastSeen: '1 hour ago', bandwidth: '10 Mbps', uptime: '8 days' },
  { id: '7', name: 'Camera-Lobby', type: 'Security Camera', ip: '192.168.1.201', status: 'Online', lastSeen: '3 minutes ago', bandwidth: '50 Mbps', uptime: '67 days' },
  { id: '8', name: 'NAS-Storage', type: 'NAS', ip: '192.168.1.101', status: 'Online', lastSeen: '10 minutes ago', bandwidth: '1 Gbps', uptime: '234 days' },
  { id: '9', name: 'Switch-Floor2', type: 'Switch', ip: '192.168.2.1', status: 'Online', lastSeen: '7 minutes ago', bandwidth: '100 Mbps', uptime: '78 days' },
  { id: '10', name: 'AP-Floor2', type: 'Access Point', ip: '192.168.2.10', status: 'Online', lastSeen: '4 minutes ago', bandwidth: '300 Mbps', uptime: '45 days' },
];

const columnDefinitions = [
  {
    id: 'name',
    header: 'Device Name',
    cell: (item: Device) => item.name,
    sortingField: 'name',
  },
  {
    id: 'type',
    header: 'Device Type',
    cell: (item: Device) => item.type,
    sortingField: 'type',
  },
  {
    id: 'ip',
    header: 'IP Address',
    cell: (item: Device) => item.ip,
    sortingField: 'ip',
  },
  {
    id: 'status',
    header: 'Status',
    cell: (item: Device) => (
      <Box
        color={item.status === 'Online' ? 'text-status-success' :
              item.status === 'Warning' ? 'text-status-warning' :
              'text-status-error'}
      >
        {item.status}
      </Box>
    ),
    sortingField: 'status',
  },
  {
    id: 'lastSeen',
    header: 'Last Seen',
    cell: (item: Device) => item.lastSeen,
    sortingField: 'lastSeen',
  },
  {
    id: 'bandwidth',
    header: 'Bandwidth',
    cell: (item: Device) => item.bandwidth,
    sortingField: 'bandwidth',
  },
  {
    id: 'uptime',
    header: 'Uptime',
    cell: (item: Device) => item.uptime,
    sortingField: 'uptime',
  },
];

export function App() {
  const [selectedItems, setSelectedItems] = useState<Device[]>([]);

  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    deviceData,
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
          </Box>
        ),
      },
      pagination: { pageSize: 10 },
      sorting: {},
      selection: {},
    }
  );

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
                  { text: 'Service', href: '#' },
                  { text: 'Administrative Dashboard', href: '#' },
                ]}
                ariaLabel="Breadcrumbs"
              />
              
              <Header
                variant="h1"
                description="Network Traffic, Credit Usage, and Your Devices"
                actions={
                  <Button variant="primary" iconAlign="right" iconName="external">
                    Refresh Data
                  </Button>
                }
              >
                Network Administration Dashboard
              </Header>

              <Grid gridDefinition={[{ colspan: { default: 12, xs: 12, s: 12, m: 8, l: 8, xl: 8 } }]}>
                <TextFilter
                  {...filterProps}
                  filteringPlaceholder="Placeholder"
                  filteringAriaLabel="Filter devices"
                  countText={`${filteredItemsCount} matches`}
                />
              </Grid>

              <Flashbar
                items={[
                  {
                    type: 'warning',
                    content: 'This is a warning message',
                    dismissible: true,
                    buttonText: 'Dismiss',
                  },
                ]}
              />
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {/* Charts Section */}
            <Grid
              gridDefinition={[
                { colspan: { default: 12, xxs: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
                { colspan: { default: 12, xxs: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
              ]}
            >
              <Container
                header={
                  <Header variant="h2">
                    Network traffic
                  </Header>
                }
              >
                <LineChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'area',
                      data: networkTrafficData,
                      color: '#688AE8',
                    },
                    {
                      title: 'Site 2',
                      type: 'area',
                      data: networkTrafficSeries2,
                      color: '#C33D69',
                    },
                  ]}
                  xDomain={['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12']}
                  yDomain={[0, 100]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'line chart',
                    xTickFormatter: (e) => e,
                    yTickFormatter: (e) => `y${e}`,
                  }}
                  ariaLabel="Network traffic chart"
                  height={300}
                  hideFilter
                  hideLegend={false}
                  loadingText="Loading chart"
                  recoveryText="Retry"
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
              </Container>

              <Container
                header={
                  <Header variant="h2">
                    Credit Usage
                  </Header>
                }
              >
                <BarChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'bar',
                      data: creditUsageData,
                      color: '#688AE8',
                    },
                  ]}
                  xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
                  yDomain={[0, 300]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xTickFormatter: (e) => e,
                    yTickFormatter: (e) => `y${e}`,
                  }}
                  ariaLabel="Credit usage chart"
                  height={300}
                  hideFilter
                  hideLegend={false}
                  loadingText="Loading chart"
                  recoveryText="Retry"
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
              </Container>
            </Grid>

            {/* Devices Table Section */}
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
                {...collectionProps}
                columnDefinitions={columnDefinitions}
                items={items}
                selectionType="multi"
                selectedItems={selectedItems}
                onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
                ariaLabels={{
                  itemSelectionLabel: (e, n) => `select ${n.name}`,
                  allItemsSelectionLabel: () => 'select all',
                  selectionGroupLabel: 'Item selection',
                }}
                renderAriaLive={({ firstIndex, lastIndex, totalItemsCount }) =>
                  `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
                }
                variant="container"
                stickyHeader
                loadingText="Loading devices"
                pagination={<Pagination {...paginationProps} />}
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
              />
            </Container>
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
