// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Grid from '@cloudscape-design/components/grid';
import Input from '@cloudscape-design/components/input';
import Pagination from '@cloudscape-design/components/pagination';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import Icon from '@cloudscape-design/components/icon';

const networkTrafficData = [
  {
    title: 'Site 1',
    type: 'area',
    data: [
      { x: new Date(2023, 0, 1), y: 150 },
      { x: new Date(2023, 0, 2), y: 180 },
      { x: new Date(2023, 0, 3), y: 165 },
      { x: new Date(2023, 0, 4), y: 190 },
      { x: new Date(2023, 0, 5), y: 210 },
      { x: new Date(2023, 0, 6), y: 230 },
      { x: new Date(2023, 0, 7), y: 195 },
      { x: new Date(2023, 0, 8), y: 185 },
      { x: new Date(2023, 0, 9), y: 205 },
      { x: new Date(2023, 0, 10), y: 220 },
      { x: new Date(2023, 0, 11), y: 190 },
      { x: new Date(2023, 0, 12), y: 175 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'area',
    data: [
      { x: new Date(2023, 0, 1), y: 90 },
      { x: new Date(2023, 0, 2), y: 110 },
      { x: new Date(2023, 0, 3), y: 95 },
      { x: new Date(2023, 0, 4), y: 85 },
      { x: new Date(2023, 0, 5), y: 100 },
      { x: new Date(2023, 0, 6), y: 130 },
      { x: new Date(2023, 0, 7), y: 95 },
      { x: new Date(2023, 0, 8), y: 75 },
      { x: new Date(2023, 0, 9), y: 90 },
      { x: new Date(2023, 0, 10), y: 65 },
      { x: new Date(2023, 0, 11), y: 85 },
      { x: new Date(2023, 0, 12), y: 95 },
    ],
    color: '#C33D69',
  },
];

const creditUsageData = [
  { x: 'Day 1', y: 183 },
  { x: 'Day 2', y: 257 },
  { x: 'Day 3', y: 213 },
  { x: 'Day 4', y: 122 },
  { x: 'Day 5', y: 210 },
];

const deviceData = Array.from({ length: 12 }, (_, i) => ({
  id: `device-${i + 1}`,
  name: 'Cell Value',
  status: 'Cell Value',
  type: 'Cell Value',
  ip: 'Cell Value',
  mac: 'Cell Value',
  location: 'Cell Value',
  lastSeen: 'Cell Value',
}));

function CustomAlert({ type, content, dismissible, onDismiss }) {
  const [isVisible, setIsVisible] = useState(true);

  const getTypeStyles = () => {
    switch (type) {
      case 'error':
        return {
          backgroundColor: 'rgba(212, 6, 10, 1)',
          color: '#ffffff',
          borderColor: 'rgba(212, 6, 10, 1)',
        };
      case 'warning':
        return {
          backgroundColor: 'rgb(255, 243, 180)',
          color: '#946C00',
          borderColor: '#946C00',
        };
      default:
        return {
          backgroundColor: 'rgb(229, 243, 255)',
          color: '#0972d3',
          borderColor: '#0972d3',
        };
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  if (!isVisible) {
    return null;
  }

  const typeStyles = getTypeStyles();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        backgroundColor: typeStyles.backgroundColor,
        borderRadius: '12px',
        boxShadow: 'rgba(0, 7, 22, 0.1) 0px 4px 8px 0px',
        padding: '13px 34px 13px 33px',
        border: `1px solid ${typeStyles.borderColor}`,
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Icon name="status-warning" variant="normal" />
        <span style={{ color: typeStyles.color, fontSize: '14px', lineHeight: '22px' }}>
          {content}
        </span>
      </div>
      {dismissible && (
        <button
          onClick={handleDismiss}
          style={{
            background: 'none',
            border: 'none',
            color: typeStyles.color,
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            lineHeight: '22px',
            padding: 0,
          }}
        >
          Dismiss
        </button>
      )}
    </div>
  );
}

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedDevices, setSelectedDevices] = useState([]);

  return (
    <AppLayout
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#' },
            { text: 'Administrative Dashboard', href: '#' },
          ]}
        />
      }
      navigationHide
      toolsHide
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

              <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
                <Input
                  value={searchValue}
                  onChange={({ detail }) => setSearchValue(detail.value)}
                  placeholder="Placeholder"
                  type="search"
                  ariaLabel="Search"
                />
                <div
                  className="pagination-container"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}
                >
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
                  <Box color="text-body-secondary" display="inline">
                    <Icon name="settings" />
                  </Box>
                </div>
              </Grid>

              <CustomAlert
                type="error"
                content="This is a warning message"
                dismissible={true}
              />
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              <Container>
                <AreaChart
                  series={networkTrafficData}
                  xDomain={[new Date(2023, 0, 1), new Date(2023, 0, 12)]}
                  yDomain={[0, 250]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'area chart',
                    xTickFormatter: value => {
                      const date = new Date(value);
                      return `x${date.getDate()}`;
                    },
                    yTickFormatter: value => `y${Math.round(value / 50)}`,
                  }}
                  ariaLabel="Network traffic area chart"
                  height={300}
                  hideFilter
                  xScaleType="time"
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
                  legendTitle="Legend"
                  additionalFilters={
                    <Box>
                      <Box variant="awsui-key-label">Performance goal</Box>
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
                  xDomain={creditUsageData.map(d => d.x)}
                  yDomain={[0, 300]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    yTickFormatter: value => `y${Math.round(value / 50)}`,
                  }}
                  ariaLabel="Credit usage bar chart"
                  height={300}
                  hideFilter
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
                  legendTitle="Legend"
                  additionalFilters={
                    <Box>
                      <Box variant="awsui-key-label">Performance goal</Box>
                    </Box>
                  }
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
                  isRowHeader: true,
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
              items={deviceData}
              selectionType="multi"
              selectedItems={selectedDevices}
              onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
              ariaLabels={{
                selectionGroupLabel: 'Items selection',
                allItemsSelectionLabel: ({ selectedItems }) =>
                  `${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`,
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
