// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
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
import Box from '@cloudscape-design/components/box';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';

import { CustomAppLayout } from '../commons/common-components';

interface Device {
  id: string;
  column1: string;
  column2: string;
  column3: string;
  column4: string;
  column5: string;
  column6: string;
  column7: string;
}

const generateDeviceData = (): Device[] => {
  const devices: Device[] = [];
  for (let i = 1; i <= 13; i++) {
    devices.push({
      id: `device-${i}`,
      column1: 'Cell Value',
      column2: 'Cell Value',
      column3: 'Cell Value',
      column4: 'Cell Value',
      column5: 'Cell Value',
      column6: 'Cell Value',
      column7: 'Cell Value',
    });
  }
  return devices;
};

const networkTrafficData = [
  { x: 'x1', y1: 3, y2: 2.5 },
  { x: 'x2', y1: 3.2, y2: 2.7 },
  { x: 'x3', y1: 3.5, y2: 3 },
  { x: 'x4', y1: 4, y2: 3.5 },
  { x: 'x5', y1: 4.5, y2: 4 },
  { x: 'x6', y1: 5.5, y2: 5 },
  { x: 'x7', y1: 5, y2: 4.5 },
  { x: 'x8', y1: 4.5, y2: 4 },
  { x: 'x9', y1: 4, y2: 3.5 },
  { x: 'x10', y1: 4.2, y2: 3.8 },
  { x: 'x11', y1: 4.5, y2: 4 },
  { x: 'x12', y1: 4, y2: 3.5 },
];

const creditUsageData = [
  { x: 'x1', y: 3 },
  { x: 'x2', y: 4.2 },
  { x: 'x3', y: 3.5 },
  { x: 'x4', y: 2 },
  { x: 'x5', y: 3.4 },
];

export function App() {
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
  const [filteringText, setFilteringText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [showNotification, setShowNotification] = useState(true);

  const allDevices = generateDeviceData();

  const breadcrumbItems = [
    { text: 'Service', href: '#/' },
    { text: 'Administrative Dashboard', href: '#/network-dashboard' },
  ];

  return (
    <CustomAppLayout
      breadcrumbs={<BreadcrumbGroup items={breadcrumbItems} ariaLabel="Breadcrumbs" />}
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
                Network Administration Dashboard
              </Header>
              {showNotification && (
                <Flashbar
                  items={[
                    {
                      type: 'warning',
                      dismissible: true,
                      onDismiss: () => setShowNotification(false),
                      content: 'This is a warning message',
                      id: 'warning-message',
                    },
                  ]}
                />
              )}
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              <Container header={<Header variant="h2">Network traffic</Header>}>
                <AreaChart
                  height={300}
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
                  yDomain={[0, 6]}
                  xTitle="Day"
                  yTitle=""
                  ariaLabel="Network traffic area chart"
                  hideFilter
                  legendTitle="Legend"
                  additionalFilters={
                    <Box color="text-status-info" fontSize="body-s">
                      Performance goal
                    </Box>
                  }
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xTickFormatter: (value) => value.toString(),
                    yTickFormatter: (value) => value.toString(),
                  }}
                />
              </Container>

              <Container header={<Header variant="h2">Credit Usage</Header>}>
                <BarChart
                  height={300}
                  series={[
                    {
                      title: 'Site 1',
                      type: 'bar',
                      data: creditUsageData,
                      color: '#688AE8',
                    },
                  ]}
                  xDomain={creditUsageData.map(d => d.x)}
                  yDomain={[0, 6]}
                  xTitle="Day"
                  yTitle=""
                  ariaLabel="Credit usage bar chart"
                  hideFilter
                  legendTitle="Legend"
                  additionalFilters={
                    <Box color="text-status-info" fontSize="body-s">
                      Performance goal
                    </Box>
                  }
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xTickFormatter: (value) => value.toString(),
                    yTickFormatter: (value) => value.toString(),
                  }}
                />
              </Container>
            </Grid>

            <Table
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
              variant="full-page"
              stickyHeader
              columnDefinitions={[
                {
                  id: 'column1',
                  header: 'Column header',
                  cell: (item) => item.column1,
                  sortingField: 'column1',
                },
                {
                  id: 'column2',
                  header: 'Column header',
                  cell: (item) => item.column2,
                  sortingField: 'column2',
                },
                {
                  id: 'column3',
                  header: 'Column header',
                  cell: (item) => item.column3,
                  sortingField: 'column3',
                },
                {
                  id: 'column4',
                  header: 'Column header',
                  cell: (item) => item.column4,
                  sortingField: 'column4',
                },
                {
                  id: 'column5',
                  header: 'Column header',
                  cell: (item) => item.column5,
                  sortingField: 'column5',
                },
                {
                  id: 'column6',
                  header: 'Column header',
                  cell: (item) => item.column6,
                  sortingField: 'column6',
                },
                {
                  id: 'column7',
                  header: 'Column header',
                  cell: (item) => item.column7,
                  sortingField: 'column7',
                },
              ]}
              items={allDevices}
              selectionType="multi"
              selectedItems={selectedDevices}
              onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
              filter={
                <TextFilter
                  filteringText={filteringText}
                  filteringPlaceholder="Placeholder"
                  filteringAriaLabel="Filter devices"
                  onChange={({ detail }) => setFilteringText(detail.filteringText)}
                />
              }
              pagination={
                <Pagination
                  currentPageIndex={currentPageIndex}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  pagesCount={5}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: (pageNumber) => `Page ${pageNumber}`,
                  }}
                />
              }
              ariaLabels={{
                selectionGroupLabel: 'Items selection',
                allItemsSelectionLabel: () => 'select all',
                itemSelectionLabel: ({ selectedItems }, item) => item.id,
              }}
            />
          </SpaceBetween>
        </ContentLayout>
      }
      navigationHide
      toolsHide
      contentType="default"
    />
  );
}
