// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Flashbar from '@cloudscape-design/components/flashbar';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';

import { AreaChart } from '@cloudscape-design/components';
import { BarChart } from '@cloudscape-design/components';

export function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [showWarning, setShowWarning] = useState(true);

  // Sample data for network traffic area chart
  const networkTrafficData = [
    { x: 1, y1: 3, y2: 2.5 },
    { x: 2, y1: 3.5, y2: 3 },
    { x: 3, y1: 3.2, y2: 3.5 },
    { x: 4, y1: 3.8, y2: 4 },
    { x: 5, y1: 4.2, y2: 4.5 },
    { x: 6, y1: 4.5, y2: 5 },
    { x: 7, y1: 4.8, y2: 5.2 },
    { x: 8, y1: 4.5, y2: 4.8 },
    { x: 9, y1: 4.2, y2: 4.5 },
    { x: 10, y1: 4, y2: 4.2 },
    { x: 11, y1: 3.8, y2: 4 },
    { x: 12, y1: 3.5, y2: 3.8 },
  ];

  // Sample data for credit usage bar chart
  const creditUsageData = [
    { x: 1, y: 183 },
    { x: 2, y: 257 },
    { x: 3, y: 213 },
    { x: 4, y: 122 },
    { x: 5, y: 210 },
  ];

  // Sample device data
  const devices = Array.from({ length: 12 }, (_, i) => ({
    id: `device-${i + 1}`,
    name: 'Cell Value',
    column2: 'Cell Value',
    column3: 'Cell Value',
    column4: 'Cell Value',
    column5: 'Cell Value',
    column6: 'Cell Value',
    column7: 'Cell Value',
  }));

  const columnDefinitions = [
    {
      id: 'name',
      header: 'Column header',
      cell: (item: any) => item.name,
      sortingField: 'name',
    },
    {
      id: 'column2',
      header: 'Column header',
      cell: (item: any) => item.column2,
    },
    {
      id: 'column3',
      header: 'Column header',
      cell: (item: any) => item.column3,
    },
    {
      id: 'column4',
      header: 'Column header',
      cell: (item: any) => item.column4,
    },
    {
      id: 'column5',
      header: 'Column header',
      cell: (item: any) => item.column5,
    },
    {
      id: 'column6',
      header: 'Column header',
      cell: (item: any) => item.column6,
    },
    {
      id: 'column7',
      header: 'Column header',
      cell: (item: any) => item.column7,
    },
  ];

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
            <SpaceBetween size="m">
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

              {showWarning && (
                <Flashbar
                  items={[
                    {
                      type: 'warning',
                      content: 'This is a warning message',
                      dismissible: true,
                      onDismiss: () => setShowWarning(false),
                      dismissLabel: 'Dismiss',
                      buttonText: 'Dismiss',
                    },
                  ]}
                />
              )}
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              <Container>
                <AreaChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'area',
                      data: networkTrafficData.map(d => ({ x: d.x, y: d.y1 })),
                      valueFormatter: (value: number) => `${value.toFixed(1)}`,
                    },
                    {
                      title: 'Site 2',
                      type: 'area',
                      data: networkTrafficData.map(d => ({ x: d.x, y: d.y2 })),
                      valueFormatter: (value: number) => `${value.toFixed(1)}`,
                    },
                  ]}
                  xDomain={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                  yDomain={[0, 6]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xTickFormatter: (value: number) => `x${value}`,
                    yTickFormatter: (value: number) => `y${value}`,
                  }}
                  ariaLabel="Network traffic area chart"
                  height={300}
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
                      valueFormatter: (value: number) => `${value}`,
                    },
                  ]}
                  xDomain={[1, 2, 3, 4, 5]}
                  yDomain={[0, 300]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xTickFormatter: (value: number) => `x${value}`,
                    yTickFormatter: (value: number) => `y${value}`,
                  }}
                  ariaLabel="Credit usage bar chart"
                  height={300}
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
              columnDefinitions={columnDefinitions}
              items={devices}
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
              ariaLabels={{
                selectionGroupLabel: 'Items selection',
                allItemsSelectionLabel: ({ selectedItems }) =>
                  `${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`,
                itemSelectionLabel: ({ selectedItems }, item) => item.name,
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
                  counter={`(${devices.length})`}
                >
                  My Devices
                </Header>
              }
              filter={
                <Input
                  type="search"
                  placeholder="Placeholder"
                  value={searchValue}
                  onChange={({ detail }) => setSearchValue(detail.value)}
                  ariaLabel="Search devices"
                />
              }
              pagination={
                <Pagination
                  currentPageIndex={currentPageIndex}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  pagesCount={Math.ceil(devices.length / 10)}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: (pageNumber: number) => `Page ${pageNumber}`,
                  }}
                />
              }
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
