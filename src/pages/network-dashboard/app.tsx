// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Alert from '@cloudscape-design/components/alert';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';
import Box from '@cloudscape-design/components/box';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Icon from '@cloudscape-design/components/icon';

import { CustomAppLayout } from '../commons/common-components';

import '@cloudscape-design/global-styles/dark-mode-utils.css';
import '../../styles/network-dashboard.scss';

// Generate sample data for network traffic (area chart)
const generateNetworkTrafficData = () => {
  // Creating data that resembles the Figma design pattern
  const data = [];
  const site1Values = [65, 72, 78, 85, 88, 82, 75, 70, 65, 60, 58, 55];
  const site2Values = [45, 58, 62, 68, 75, 80, 78, 72, 68, 62, 58, 52];

  for (let i = 1; i <= 12; i++) {
    data.push({
      x: i,
      y1: site1Values[i - 1],
      y2: site2Values[i - 1],
    });
  }
  return data;
};

// Generate sample data for credit usage (bar chart)
const generateCreditUsageData = () => {
  return [
    { x: 'Day 1', y: 183 },
    { x: 'Day 2', y: 257 },
    { x: 'Day 3', y: 213 },
    { x: 'Day 4', y: 122 },
    { x: 'Day 5', y: 210 },
  ];
};

// Generate sample devices data
const generateDevicesData = () => {
  const devices = [];
  const locations = ['Office', 'Home', 'Guest Room', 'Basement', 'Kitchen'];
  for (let i = 1; i <= 12; i++) {
    devices.push({
      id: `device-${i}`,
      name: `Device ${i}`,
      type: i % 3 === 0 ? 'Router' : i % 3 === 1 ? 'Laptop' : 'Phone',
      ipAddress: `192.168.1.${100 + i}`,
      macAddress: `00:1B:44:11:3A:${String(i).padStart(2, '0')}`,
      status: i % 4 === 0 ? 'Offline' : 'Online',
      bandwidth: `${Math.floor(Math.random() * 100)} Mbps`,
      lastSeen: `${Math.floor(Math.random() * 24)} hours ago`,
      location: locations[i % locations.length],
    });
  }
  return devices;
};

export function App() {
  const [filteringText, setFilteringText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [alertVisible, setAlertVisible] = useState(true);

  const networkTrafficData = generateNetworkTrafficData();
  const creditUsageData = generateCreditUsageData();
  const devicesData = generateDevicesData();

  const networkTrafficSeries = [
    {
      title: 'Site 1',
      type: 'area' as const,
      data: networkTrafficData.map(d => ({ x: d.x, y: d.y1 })),
      color: '#688AE8',
    },
    {
      title: 'Site 2',
      type: 'area' as const,
      data: networkTrafficData.map(d => ({ x: d.x, y: d.y2 })),
      color: '#C33D69',
    },
  ];

  const creditUsageSeries = [
    {
      title: 'Site 1',
      type: 'bar' as const,
      data: creditUsageData,
      color: '#688AE8',
    },
  ];

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
      id: 'ipAddress',
      header: 'IP Address',
      cell: (item: any) => item.ipAddress,
      sortingField: 'ipAddress',
    },
    {
      id: 'macAddress',
      header: 'MAC Address',
      cell: (item: any) => item.macAddress,
    },
    {
      id: 'status',
      header: 'Status',
      cell: (item: any) => item.status,
      sortingField: 'status',
    },
    {
      id: 'bandwidth',
      header: 'Bandwidth',
      cell: (item: any) => item.bandwidth,
    },
    {
      id: 'lastSeen',
      header: 'Last Seen',
      cell: (item: any) => item.lastSeen,
    },
    {
      id: 'location',
      header: 'Location',
      cell: (item: any) => item.location || 'N/A',
    },
  ];

  return (
    <CustomAppLayout
      contentType="default"
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#' },
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
                  <Button variant="primary" iconAlign="right" iconName="external">
                    Refresh Data
                  </Button>
                }
              >
                Network Administration Dashboard
              </Header>
              <Grid gridDefinition={[{ colspan: 8 }, { colspan: 4 }]}>
                <TextFilter
                  filteringText={filteringText}
                  filteringPlaceholder="Placeholder"
                  filteringAriaLabel="Filter content"
                  onChange={({ detail }) => setFilteringText(detail.filteringText)}
                />
                <Box float="right">
                  <SpaceBetween direction="horizontal" size="xs" alignItems="center">
                    <Pagination
                      currentPageIndex={currentPageIndex}
                      onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                      pagesCount={5}
                      ariaLabels={{
                        nextPageLabel: 'Next page',
                        previousPageLabel: 'Previous page',
                        pageLabel: pageNumber => `Page ${pageNumber}`,
                      }}
                    />
                    <Button iconName="settings" variant="icon" ariaLabel="Settings" />
                  </SpaceBetween>
                </Box>
              </Grid>
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {alertVisible && (
              <Alert
                type="error"
                dismissible
                onDismiss={() => setAlertVisible(false)}
              >
                This is a warning message
              </Alert>
            )}

            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              <Container header={<Header variant="h2">Network traffic</Header>}>
                <AreaChart
                  series={networkTrafficSeries}
                  xDomain={[1, 12]}
                  yDomain={[0, 100]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xTickFormatter: value => `x${Math.round(value as number)}`,
                    yTickFormatter: value => `y${Math.ceil((value as number) / 16.67)}`,
                  }}
                  ariaLabel="Network traffic area chart"
                  height={300}
                  xScaleType="linear"
                  xTitle="Day"
                  yTitle=""
                  hideFilter
                  hideLegend={false}
                  statusType="finished"
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
                <Box textAlign="center" padding={{ top: 's' }}>
                  <SpaceBetween direction="horizontal" size="xs">
                    <Box variant="small" color="text-body-secondary">
                      <span style={{ marginRight: '4px' }}>--</span> Performance goal
                    </Box>
                  </SpaceBetween>
                </Box>
              </Container>

              <Container header={<Header variant="h2">Credit Usage</Header>}>
                <BarChart
                  series={creditUsageSeries}
                  xDomain={['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5']}
                  yDomain={[0, 300]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    detailPopoverDismissAriaLabel: 'Dismiss',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xTickFormatter: value => value.toString().replace('Day ', 'x'),
                    yTickFormatter: value => `y${Math.ceil((value as number) / 50)}`,
                  }}
                  ariaLabel="Credit usage bar chart"
                  height={300}
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle=""
                  hideFilter
                  hideLegend={false}
                  statusType="finished"
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
                <Box textAlign="center" padding={{ top: 's' }}>
                  <SpaceBetween direction="horizontal" size="xs">
                    <Box variant="small" color="text-body-secondary">
                      <span style={{ marginRight: '4px' }}>--</span> Performance goal
                    </Box>
                  </SpaceBetween>
                </Box>
              </Container>
            </Grid>

            <Table
              columnDefinitions={columnDefinitions}
              items={devicesData}
              selectionType="multi"
              selectedItems={selectedItems}
              onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
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
            />
          </SpaceBetween>
        </ContentLayout>
      }
      navigationHide
      toolsHide
    />
  );
}
