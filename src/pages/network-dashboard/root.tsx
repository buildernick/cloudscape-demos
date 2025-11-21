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
import Box from '@cloudscape-design/components/box';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Grid from '@cloudscape-design/components/grid';

// Sample data for Network Traffic chart
const networkTrafficData = [
  {
    title: 'Site 1',
    type: 'area',
    data: [
      { x: 'x1', y: 180 },
      { x: 'x2', y: 150 },
      { x: 'x3', y: 135 },
      { x: 'x4', y: 132 },
      { x: 'x5', y: 135 },
      { x: 'x6', y: 120 },
      { x: 'x7', y: 110 },
      { x: 'x8', y: 130 },
      { x: 'x9', y: 145 },
      { x: 'x10', y: 115 },
      { x: 'x11', y: 95 },
      { x: 'x12', y: 130 },
    ],
  },
  {
    title: 'Site 2',
    type: 'area',
    data: [
      { x: 'x1', y: 90 },
      { x: 'x2', y: 100 },
      { x: 'x3', y: 95 },
      { x: 'x4', y: 85 },
      { x: 'x5', y: 75 },
      { x: 'x6', y: 60 },
      { x: 'x7', y: 70 },
      { x: 'x8', y: 75 },
      { x: 'x9', y: 85 },
      { x: 'x10', y: 50 },
      { x: 'x11', y: 45 },
      { x: 'x12', y: 65 },
    ],
  },
];

// Sample data for Credit Usage chart
const creditUsageData = [
  { x: 'x1', y: 183 },
  { x: 'x2', y: 257 },
  { x: 'x3', y: 213 },
  { x: 'x4', y: 122 },
  { x: 'x5', y: 210 },
];

// Sample data for devices table
const devicesData = Array.from({ length: 12 }, (_, i) => ({
  id: `device-${i + 1}`,
  column1: 'Cell Value',
  column2: 'Cell Value',
  column3: 'Cell Value',
  column4: 'Cell Value',
  column5: 'Cell Value',
  column6: 'Cell Value',
  column7: 'Cell Value',
}));

export default function NetworkDashboard() {
  const [searchValue, setSearchValue] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);

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
                  <Button variant="primary" iconName="external" iconAlign="right">
                    Refresh Data
                  </Button>
                }
              >
                Network Adminstration Dashboard
              </Header>

              <Grid
                gridDefinition={[
                  { colspan: { default: 12, xs: 12, s: 8 } },
                  { colspan: { default: 12, xs: 12, s: 4 } },
                ]}
              >
                <Input
                  type="search"
                  placeholder="Placeholder"
                  value={searchValue}
                  onChange={({ detail }) => setSearchValue(detail.value)}
                  ariaLabel="Search"
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
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
                  <div style={{ width: '2px', height: '32px', background: 'var(--color-border-divider-default)' }} />
                  <Button iconName="settings" variant="icon" ariaLabel="Settings" />
                </div>
              </Grid>

              <Flashbar
                items={[
                  {
                    type: 'warning',
                    dismissible: true,
                    content: 'This is a warning message',
                    buttonText: 'Dismiss',
                    onButtonClick: () => {},
                  },
                ]}
              />
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              <Container>
                <AreaChart
                  series={networkTrafficData}
                  xDomain={['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12']}
                  yDomain={[0, 300]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xTickFormatter: e => e,
                    yTickFormatter: undefined,
                  }}
                  ariaLabel="Network traffic area chart"
                  height={300}
                  xScaleType="categorical"
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
                />
              </Container>

              <Container>
                <BarChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'bar',
                      data: creditUsageData,
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
                    xTickFormatter: e => e,
                    yTickFormatter: undefined,
                  }}
                  ariaLabel="Credit usage bar chart"
                  height={300}
                  xScaleType="categorical"
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
                />
              </Container>
            </Grid>

            <Table
              columnDefinitions={[
                {
                  id: 'column1',
                  header: 'Column header',
                  cell: item => item.column1,
                  sortingField: 'column1',
                },
                {
                  id: 'column2',
                  header: 'Column header',
                  cell: item => item.column2,
                  sortingField: 'column2',
                },
                {
                  id: 'column3',
                  header: 'Column header',
                  cell: item => item.column3,
                  sortingField: 'column3',
                },
                {
                  id: 'column4',
                  header: 'Column header',
                  cell: item => item.column4,
                  sortingField: 'column4',
                },
                {
                  id: 'column5',
                  header: 'Column header',
                  cell: item => item.column5,
                  sortingField: 'column5',
                },
                {
                  id: 'column6',
                  header: 'Column header',
                  cell: item => item.column6,
                  sortingField: 'column6',
                },
                {
                  id: 'column7',
                  header: 'Column header',
                  cell: item => item.column7,
                  sortingField: 'column7',
                },
              ]}
              items={devicesData}
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
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
              loadingText="Loading devices"
              empty={
                <Box textAlign="center" color="inherit">
                  <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                    <b>No devices</b>
                  </Box>
                  <Button>Add device</Button>
                </Box>
              }
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
