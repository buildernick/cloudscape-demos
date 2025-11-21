// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Flashbar from '@cloudscape-design/components/flashbar';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import Grid from '@cloudscape-design/components/grid';
import Box from '@cloudscape-design/components/box';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';

const NETWORK_TRAFFIC_DATA = [
  { x: 'x1', y1: 3, y2: 2 },
  { x: 'x2', y1: 3.5, y2: 2.5 },
  { x: 'x3', y1: 3.8, y2: 3 },
  { x: 'x4', y1: 4.2, y2: 3.2 },
  { x: 'x5', y1: 4.5, y2: 3.5 },
  { x: 'x6', y1: 4.8, y2: 3.8 },
  { x: 'x7', y1: 5, y2: 4 },
  { x: 'x8', y1: 4.7, y2: 3.7 },
  { x: 'x9', y1: 4.5, y2: 3.5 },
  { x: 'x10', y1: 5.2, y2: 4.2 },
  { x: 'x11', y1: 5, y2: 4 },
  { x: 'x12', y1: 4.8, y2: 3.8 },
];

const CREDIT_USAGE_DATA = [
  { x: 'x1', y: 4 },
  { x: 'x2', y: 5.5 },
  { x: 'x3', y: 4.8 },
  { x: 'x4', y: 2.5 },
  { x: 'x5', y: 4.7 },
];

const DEVICE_DATA = Array.from({ length: 12 }, (_, i) => ({
  id: `device-${i + 1}`,
  name: 'Cell Value',
  type: 'Cell Value',
  status: 'Cell Value',
  ip: 'Cell Value',
  mac: 'Cell Value',
  location: 'Cell Value',
  lastSeen: 'Cell Value',
}));

export default function NetworkDashboard() {
  const [searchValue, setSearchValue] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState<typeof DEVICE_DATA>([]);
  const [flashbarItems, setFlashbarItems] = useState([
    {
      type: 'warning' as const,
      content: 'This is a warning message',
      dismissible: true,
      dismissLabel: 'Dismiss',
      onDismiss: () => setFlashbarItems([]),
      id: 'warning-message',
    },
  ]);

  return (
    <AppLayout
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '/' },
            { text: 'Administrative Dashboard', href: '#' },
          ]}
          ariaLabel="Breadcrumbs"
        />
      }
      navigationHide
      toolsHide
      content={
        <ContentLayout
          header={
            <Header
              variant="h1"
              description="Network Traffic, Credit Usage, and Your Devices"
              actions={
                <Button variant="primary" iconAlign="right" iconName="external">
                  Refresh Data
                </Button>
              }
            >
              Network Adminstration Dashboard
            </Header>
          }
        >
          <SpaceBetween size="l">
            <Flashbar items={flashbarItems} />

            <Container
              header={
                <SpaceBetween direction="horizontal" size="xs" alignItems="center">
                  <Box flex="1">
                    <Input
                      type="search"
                      placeholder="Placeholder"
                      value={searchValue}
                      onChange={({ detail }) => setSearchValue(detail.value)}
                      ariaLabel="Search"
                    />
                  </Box>
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    pagesCount={5}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: pageNumber => `Page ${pageNumber}`,
                    }}
                  />
                  <Button iconName="settings" variant="icon" ariaLabel="Settings" />
                </SpaceBetween>
              }
            />

            <Grid
              gridDefinition={[
                { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
                { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
              ]}
            >
              <Container>
                <AreaChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'area',
                      data: NETWORK_TRAFFIC_DATA.map(d => ({ x: d.x, y: d.y1 })),
                      color: '#688AE8',
                    },
                    {
                      title: 'Site 2',
                      type: 'area',
                      data: NETWORK_TRAFFIC_DATA.map(d => ({ x: d.x, y: d.y2 })),
                      color: '#C33D69',
                    },
                  ]}
                  xDomain={NETWORK_TRAFFIC_DATA.map(d => d.x)}
                  yDomain={[0, 6]}
                  height={300}
                  hideFilter
                  ariaLabel="Network traffic area chart"
                  xTitle="Day"
                  yTitle="Network traffic"
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
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xTickFormatter: e =>
                      e
                        .toString()
                        .split('T')[0]
                        .split('-')
                        .reverse()
                        .join('/'),
                    yTickFormatter: undefined,
                  }}
                  legendTitle="Legend"
                />
              </Container>

              <Container>
                <BarChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'bar',
                      data: CREDIT_USAGE_DATA,
                      color: '#688AE8',
                    },
                  ]}
                  xDomain={CREDIT_USAGE_DATA.map(d => d.x)}
                  yDomain={[0, 6]}
                  height={300}
                  hideFilter
                  ariaLabel="Credit usage bar chart"
                  xTitle="Day"
                  yTitle="Credit Usage"
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
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xTickFormatter: e =>
                      e
                        .toString()
                        .split('T')[0]
                        .split('-')
                        .reverse()
                        .join('/'),
                    yTickFormatter: undefined,
                  }}
                  legendTitle="Legend"
                />
              </Container>
            </Grid>

            <Table
              columnDefinitions={[
                {
                  id: 'name',
                  header: 'Column header',
                  cell: item => item.name,
                  sortingField: 'name',
                },
                {
                  id: 'type',
                  header: 'Column header',
                  cell: item => item.type,
                  sortingField: 'type',
                },
                {
                  id: 'status',
                  header: 'Column header',
                  cell: item => item.status,
                  sortingField: 'status',
                },
                {
                  id: 'ip',
                  header: 'Column header',
                  cell: item => item.ip,
                  sortingField: 'ip',
                },
                {
                  id: 'mac',
                  header: 'Column header',
                  cell: item => item.mac,
                  sortingField: 'mac',
                },
                {
                  id: 'location',
                  header: 'Column header',
                  cell: item => item.location,
                  sortingField: 'location',
                },
                {
                  id: 'lastSeen',
                  header: 'Column header',
                  cell: item => item.lastSeen,
                  sortingField: 'lastSeen',
                },
              ]}
              items={DEVICE_DATA}
              loadingText="Loading devices"
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
              trackBy="id"
              empty={
                <Box textAlign="center" color="inherit">
                  <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                    <b>No devices</b>
                  </Box>
                  <Button>Add device</Button>
                </Box>
              }
              header={
                <Header
                  counter={selectedItems.length > 0 ? `(${selectedItems.length}/${DEVICE_DATA.length})` : undefined}
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
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
