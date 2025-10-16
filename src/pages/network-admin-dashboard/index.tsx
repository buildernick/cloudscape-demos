// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Alert from '@cloudscape-design/components/alert';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import Pagination from '@cloudscape-design/components/pagination';
import Input from '@cloudscape-design/components/input';

const breadcrumbItems = [
  { text: 'Service', href: '/' },
  { text: 'Administrative Dashboard', href: '/network-admin-dashboard' },
];

// Sample data for Network Traffic (Area Chart)
const networkTrafficData = [
  { x: 1, site1: 3, site2: 1 },
  { x: 2, site1: 4, site2: 1.5 },
  { x: 3, site1: 4.5, site2: 2 },
  { x: 4, site1: 5, site2: 2.5 },
  { x: 5, site1: 5.5, site2: 3 },
  { x: 6, site1: 6, site2: 3.5 },
  { x: 7, site1: 5.5, site2: 4 },
  { x: 8, site1: 5, site2: 4.2 },
  { x: 9, site1: 4, site2: 3.8 },
  { x: 10, site1: 3.5, site2: 3 },
  { x: 11, site1: 3, site2: 2.5 },
  { x: 12, site1: 3.5, site2: 2 },
];

// Sample data for Credit Usage (Bar Chart)
const creditUsageData = [
  { x: 1, usage: 183 },
  { x: 2, usage: 257 },
  { x: 3, usage: 213 },
  { x: 4, usage: 122 },
  { x: 5, usage: 210 },
];

// Sample data for devices table
const devicesData = Array.from({ length: 12 }, (_, i) => ({
  id: `device-${i + 1}`,
  name: 'Cell Value',
  ipAddress: 'Cell Value',
  macAddress: 'Cell Value',
  status: 'Cell Value',
  type: 'Cell Value',
  location: 'Cell Value',
  lastSeen: 'Cell Value',
}));

export default function NetworkAdminDashboard() {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [alertVisible, setAlertVisible] = useState(true);

  const columnDefinitions = [
    {
      id: 'name',
      header: 'Column header',
      cell: item => item.name,
      sortingField: 'name',
      isRowHeader: true,
    },
    {
      id: 'ipAddress',
      header: 'Column header',
      cell: item => item.ipAddress,
      sortingField: 'ipAddress',
    },
    {
      id: 'macAddress',
      header: 'Column header',
      cell: item => item.macAddress,
      sortingField: 'macAddress',
    },
    {
      id: 'status',
      header: 'Column header',
      cell: item => item.status,
      sortingField: 'status',
    },
    {
      id: 'type',
      header: 'Column header',
      cell: item => item.type,
      sortingField: 'type',
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
  ];

  return (
    <AppLayout
      navigationHide
      toolsHide
      breadcrumbs={<BreadcrumbGroup items={breadcrumbItems} ariaLabel="Breadcrumbs" />}
      content={
        <SpaceBetween size="l">
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
              { colspan: { default: 12, s: 6 } },
              { colspan: { default: 12, s: 6 } },
            ]}
          >
            <Input
              type="search"
              placeholder="Placeholder"
              value={searchValue}
              onChange={({ detail }) => setSearchValue(detail.value)}
              ariaLabel="Search input"
            />
            <Box textAlign="right">
              <SpaceBetween direction="horizontal" size="xs">
                <Pagination
                  currentPageIndex={currentPage}
                  onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
                  pagesCount={5}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber}`,
                  }}
                />
                <Box color="text-status-inactive" display="inline">
                  <Box
                    variant="span"
                    padding={{ horizontal: 'xs' }}
                    color="text-body-secondary"
                    fontSize="body-s"
                  >
                    |
                  </Box>
                </Box>
                <Button iconName="settings" variant="icon" ariaLabel="Settings" />
              </SpaceBetween>
            </Box>
          </Grid>

          {alertVisible && (
            <Alert
              dismissible
              type="warning"
              onDismiss={() => setAlertVisible(false)}
              dismissAriaLabel="Close warning"
            >
              This is a warning message
            </Alert>
          )}

          <Grid
            gridDefinition={[
              { colspan: { default: 12, m: 6 } },
              { colspan: { default: 12, m: 6 } },
            ]}
          >
            <Container>
              <AreaChart
                series={[
                  {
                    title: 'Site 1',
                    type: 'area',
                    data: networkTrafficData.map(d => ({ x: d.x, y: d.site1 })),
                  },
                  {
                    title: 'Site 2',
                    type: 'area',
                    data: networkTrafficData.map(d => ({ x: d.x, y: d.site2 })),
                  },
                ]}
                xDomain={networkTrafficData.map(d => d.x)}
                yDomain={[0, 7]}
                xScaleType="categorical"
                xTitle="Day"
                yTitle="Network traffic"
                ariaLabel="Network traffic area chart"
                height={300}
                hideLegend={false}
                i18nStrings={{
                  chartAriaRoleDescription: 'Area chart showing network traffic over time',
                  xTickFormatter: x => `x${x}`,
                  yTickFormatter: y => `y${Math.round(y)}`,
                }}
                additionalFilters={
                  <SpaceBetween direction="horizontal" size="xs">
                    <Box fontSize="body-s" color="text-body-secondary">
                      <Box variant="span" fontWeight="normal">
                        <Box
                          variant="span"
                          display="inline-block"
                          padding={{ right: 'xxs' }}
                        >
                          <svg width="12" height="3" aria-hidden="true">
                            <rect width="6" height="3" rx="1" fill="#5F6B7A" />
                            <rect x="8" width="6" height="3" rx="1" fill="#5F6B7A" />
                          </svg>
                        </Box>
                        Performance goal
                      </Box>
                    </Box>
                  </SpaceBetween>
                }
              />
            </Container>

            <Container>
              <BarChart
                series={[
                  {
                    title: 'Site 1',
                    type: 'bar',
                    data: creditUsageData.map(d => ({ x: d.x, y: d.usage })),
                  },
                ]}
                xDomain={creditUsageData.map(d => d.x)}
                yDomain={[0, 300]}
                xScaleType="categorical"
                xTitle="Day"
                yTitle="Credit Usage"
                ariaLabel="Credit usage bar chart"
                height={300}
                hideLegend={false}
                i18nStrings={{
                  chartAriaRoleDescription: 'Bar chart showing credit usage by day',
                  xTickFormatter: x => `x${x}`,
                  yTickFormatter: y => `y${Math.round(y)}`,
                }}
                additionalFilters={
                  <SpaceBetween direction="horizontal" size="xs">
                    <Box fontSize="body-s" color="text-body-secondary">
                      <Box variant="span" fontWeight="normal">
                        <Box
                          variant="span"
                          display="inline-block"
                          padding={{ right: 'xxs' }}
                        >
                          <svg width="12" height="3" aria-hidden="true">
                            <rect width="6" height="3" rx="1" fill="#5F6B7A" />
                            <rect x="8" width="6" height="3" rx="1" fill="#5F6B7A" />
                          </svg>
                        </Box>
                        Performance goal
                      </Box>
                    </Box>
                  </SpaceBetween>
                }
              />
            </Container>
          </Grid>

          <Table
            columnDefinitions={columnDefinitions}
            items={devicesData}
            selectionType="multi"
            selectedItems={selectedDevices}
            onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
            ariaLabels={{
              selectionGroupLabel: 'Device selection',
              allItemsSelectionLabel: () => 'Select all devices',
              itemSelectionLabel: ({ selectedItems }, item) => {
                const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
                return `${item.name} is ${isItemSelected ? '' : 'not '}selected`;
              },
            }}
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
            empty={
              <Box textAlign="center" color="inherit">
                <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                  <b>No devices</b>
                </Box>
                <Button>Add Device</Button>
              </Box>
            }
          />
        </SpaceBetween>
      }
    />
  );
}
