// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState, useRef } from 'react';
import { useCollection } from '@cloudscape-design/collection-hooks';
import {
  AppLayout,
  TopNavigation,
  Header,
  ContentLayout,
  Container,
  Grid,
  Box,
  Button,
  SpaceBetween,
  Flashbar,
  BreadcrumbGroup,
  Input,
  Pagination,
  Table,
  TableProps,
  AreaChart,
  BarChart,
  TextFilter,
  Badge
} from '@cloudscape-design/components';
import styles from './styles.module.scss';

// Mock data for network devices
const networkDevices = Array.from({ length: 50 }, (_, index) => ({
  id: `device-${index + 1}`,
  name: `Device ${index + 1}`,
  ipAddress: `192.168.1.${index + 10}`,
  deviceType: ['Router', 'Switch', 'Computer', 'Phone', 'Tablet'][index % 5],
  status: ['Online', 'Offline', 'Warning'][index % 3],
  lastSeen: `${Math.floor(Math.random() * 60)} minutes ago`,
  bandwidth: `${Math.floor(Math.random() * 100 + 50)} Mbps`,
  location: ['Living Room', 'Office', 'Kitchen', 'Bedroom', 'Basement'][index % 5]
}));

// Mock data for network traffic chart - based on Figma design
const networkTrafficData = [
  { x: 'x1', y1: 35, y2: 25 },
  { x: 'x2', y1: 30, y2: 20 },
  { x: 'x3', y1: 32, y2: 22 },
  { x: 'x4', y1: 28, y2: 18 },
  { x: 'x5', y1: 25, y2: 15 },
  { x: 'x6', y1: 20, y2: 12 },
  { x: 'x7', y1: 15, y2: 8 },
  { x: 'x8', y1: 10, y2: 5 },
  { x: 'x9', y1: 8, y2: 3 },
  { x: 'x10', y1: 15, y2: 10 },
  { x: 'x11', y1: 25, y2: 18 },
  { x: 'x12', y1: 35, y2: 28 }
];

// Mock data for credit usage chart
const creditUsageData = [
  { x: 'x1', y: 60 },
  { x: 'x2', y: 85 },
  { x: 'x3', y: 70 },
  { x: 'x4', y: 40 },
  { x: 'x5', y: 75 }
];

export default function App() {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<typeof networkDevices>([]);
  const appLayoutRef = useRef<any>();

  const columnDefinitions: TableProps.ColumnDefinition<typeof networkDevices[0]>[] = [
    {
      id: 'name',
      header: 'Device Name',
      cell: item => item.name,
      sortingField: 'name'
    },
    {
      id: 'ipAddress',
      header: 'IP Address',
      cell: item => item.ipAddress,
      sortingField: 'ipAddress'
    },
    {
      id: 'deviceType',
      header: 'Device Type',
      cell: item => item.deviceType,
      sortingField: 'deviceType'
    },
    {
      id: 'status',
      header: 'Status',
      cell: item => item.status,
      sortingField: 'status'
    },
    {
      id: 'lastSeen',
      header: 'Last Seen',
      cell: item => item.lastSeen,
      sortingField: 'lastSeen'
    },
    {
      id: 'bandwidth',
      header: 'Bandwidth',
      cell: item => item.bandwidth,
      sortingField: 'bandwidth'
    },
    {
      id: 'location',
      header: 'Location',
      cell: item => item.location,
      sortingField: 'location'
    }
  ];

  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    networkDevices,
    {
      filtering: {
        empty: (
          <Box textAlign="center" color="inherit">
            <b>No devices</b>
            <Box variant="p" color="inherit">
              No devices to display.
            </Box>
          </Box>
        ),
        noMatch: (
          <Box textAlign="center" color="inherit">
            <b>No matches</b>
            <Box variant="p" color="inherit">
              We can't find a match.
            </Box>
          </Box>
        )
      },
      pagination: { pageSize: 10 },
      sorting: {},
      selection: {}
    }
  );

  return (
    <>
      <TopNavigation
        identity={{
          href: "#",
          title: "Service name",
          logo: {
            src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDMiIGhlaWdodD0iMzEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQzIiBoZWlnaHQ9IjMxIiByeD0iMiIgZmlsbD0iIzIzMkYzRSIgc3Ryb2tlPSIjRDFENURCIi8+PHRleHQgeD0iNiIgeT0iMjEiIGZvbnQtZmFtaWx5PSJPcGVuIFNhbnMiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNGQkZCRkIiPkxvZ288L3RleHQ+PC9zdmc+",
            alt: "Logo"
          }
        }}
        search={
          <Input
            type="search"
            placeholder="Search"
            ariaLabel="Search"
          />
        }
        utilities={[
          {
            type: "button",
            text: "Link",
            href: "https://example.com",
            external: true,
            externalIconAriaLabel: " (opens in a new tab)"
          },
          {
            type: "menu-dropdown",
            iconName: "notification",
            badge: true,
            ariaLabel: "Notifications",
            title: "Notifications",
            items: [
              {
                id: "notifications",
                text: "View all notifications"
              }
            ]
          },
          {
            type: "menu-dropdown",
            iconName: "settings",
            ariaLabel: "Settings",
            title: "Settings",
            items: [
              {
                id: "settings-org",
                text: "Organizational settings"
              },
              {
                id: "settings-project",
                text: "Project settings"
              }
            ]
          },
          {
            type: "menu-dropdown",
            text: "Customer name",
            description: "email@example.com",
            iconName: "user-profile",
            items: [
              {
                id: "profile",
                text: "Profile"
              },
              {
                id: "preferences",
                text: "Preferences"
              },
              {
                id: "security",
                text: "Security"
              },
              {
                type: "divider"
              },
              {
                id: "signout",
                text: "Sign out"
              }
            ]
          }
        ]}
      />
      <AppLayout
        ref={appLayoutRef}
        navigationOpen={navigationOpen}
        onNavigationChange={({ detail }) => setNavigationOpen(detail.open)}
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        navigationHide={true}
        toolsHide={true}
        content={
          <ContentLayout
            header={
              <SpaceBetween size="m">
                <BreadcrumbGroup
                  items={[
                    { text: "Service", href: "#" },
                    { text: "Administrative Dashboard", href: "#" }
                  ]}
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
                
                <Flashbar
                  items={[
                    {
                      type: 'warning',
                      content: 'This is a warning message',
                      dismissible: true,
                      buttonText: 'Dismiss',
                      onButtonClick: () => {}
                    }
                  ]}
                />

                <Grid
                  gridDefinition={[
                    { colspan: { default: 12, xs: 12, s: 6, m: 6, l: 6, xl: 6 } },
                    { colspan: { default: 12, xs: 12, s: 6, m: 6, l: 6, xl: 6 } }
                  ]}
                >
                  <Container
                    header={
                      <Header variant="h2">
                        Network traffic
                      </Header>
                    }
                  >
                    <AreaChart
                      series={[
                        {
                          title: "Site 1",
                          type: "area",
                          data: networkTrafficData.map(d => ({ x: d.x, y: d.y1 })),
                          color: "#688AE8"
                        },
                        {
                          title: "Site 2", 
                          type: "area",
                          data: networkTrafficData.map(d => ({ x: d.x, y: d.y2 })),
                          color: "#C33D69"
                        }
                      ]}
                      xDomain={[new Date(2024, 0, 1), new Date(2024, 0, 12)]}
                      yDomain={[0, 60]}
                      xTitle="Day"
                      yTitle=""
                      height={300}
                      hideFilter
                      hideLegend={false}
                      detailPopoverSeriesNameColumnHeader="Series"
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
                          title: "Site 1",
                          type: "bar",
                          data: creditUsageData,
                          color: "#688AE8"
                        }
                      ]}
                      xDomain={creditUsageData.map(d => d.x)}
                      yDomain={[0, 100]}
                      xTitle="Day"
                      yTitle=""
                      height={300}
                      hideFilter
                      hideLegend={false}
                    />
                  </Container>
                </Grid>
              </SpaceBetween>
            }
          >
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
                  counter={`(${networkDevices.length})`}
                >
                  My Devices
                </Header>
              }
            >
              <Table
                {...collectionProps}
                selectedItems={selectedItems}
                onSelectionChange={({ detail }) =>
                  setSelectedItems(detail.selectedItems)
                }
                columnDefinitions={columnDefinitions}
                items={items}
                loadingText="Loading devices"
                selectionType="multi"
                trackBy="id"
                empty={
                  <Box textAlign="center" color="inherit">
                    <b>No devices</b>
                    <Box
                      variant="p"
                      color="inherit"
                    >
                      No devices to display.
                    </Box>
                  </Box>
                }
                filter={
                  <TextFilter
                    {...filterProps}
                    filteringPlaceholder="Find devices"
                    countText={filteredItemsCount === 1 ? "1 match" : `${filteredItemsCount} matches`}
                  />
                }
                header={
                  <Header
                    counter={
                      selectedItems.length
                        ? `(${selectedItems.length}/${networkDevices.length})`
                        : `(${networkDevices.length})`
                    }
                  >
                    Devices
                  </Header>
                }
                pagination={<Pagination {...paginationProps} />}
              />
            </Container>
          </ContentLayout>
        }
      />
    </>
  );
}
