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
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import Modal from '@cloudscape-design/components/modal';

// Sample data for the area chart (Network Traffic)
const networkTrafficData = [
  {
    title: 'Site 1',
    type: 'area',
    data: [
      { x: 1, y: 70 },
      { x: 2, y: 100 },
      { x: 3, y: 110 },
      { x: 4, y: 120 },
      { x: 5, y: 140 },
      { x: 6, y: 165 },
      { x: 7, y: 155 },
      { x: 8, y: 135 },
      { x: 9, y: 120 },
      { x: 10, y: 140 },
      { x: 11, y: 130 },
      { x: 12, y: 95 },
    ],
    valueFormatter: (value: number) => `${value}%`,
  },
  {
    title: 'Site 2',
    type: 'area',
    data: [
      { x: 1, y: 100 },
      { x: 2, y: 120 },
      { x: 3, y: 115 },
      { x: 4, y: 110 },
      { x: 5, y: 105 },
      { x: 6, y: 80 },
      { x: 7, y: 50 },
      { x: 8, y: 30 },
      { x: 9, y: 40 },
      { x: 10, y: 60 },
      { x: 11, y: 70 },
      { x: 12, y: 85 },
    ],
    valueFormatter: (value: number) => `${value}%`,
  },
];

// Sample data for the bar chart (Credit Usage)
const creditUsageData = [
  { x: 1, y: 65 },
  { x: 2, y: 90 },
  { x: 3, y: 75 },
  { x: 4, y: 45 },
  { x: 5, y: 78 },
];

// Sample table data for devices
const deviceTableItems = Array.from({ length: 12 }, (_, index) => ({
  id: `device-${index + 1}`,
  column1: 'Cell Value',
  column2: 'Cell Value',
  column3: 'Cell Value',
  column4: 'Cell Value',
  column5: 'Cell Value',
  column6: 'Cell Value',
  column7: 'Cell Value',
}));

export function App() {
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [filterText, setFilterText] = useState('');
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [showRefreshModal, setShowRefreshModal] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  const handleRefreshConfirm = () => {
    setShowRefreshModal(false);
    // Add your refresh logic here
    console.log('Data refreshed');
  };

  return (
    <>
      <Modal
        onDismiss={() => setShowRefreshModal(false)}
        visible={showRefreshModal}
        header="Confirm refresh"
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link" onClick={() => setShowRefreshModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleRefreshConfirm}>
                Refresh
              </Button>
            </SpaceBetween>
          </Box>
        }
      >
        Are you sure you want to refresh the data? This will reload all network traffic, credit usage, and device
        information.
      </Modal>
      <AppLayout
        navigationHide
        toolsHide
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Service', href: '/' },
              { text: 'Administrative Dashboard', href: '#' },
            ]}
            ariaLabel="Breadcrumbs"
          />
        }
        content={
          <ContentLayout
            header={
              <SpaceBetween size="m">
                <div style={{ borderWidth: '3px', borderStyle: 'solid' }}>
                  <Header
                    variant="h1"
                    description="Network Traffic, Credit Usage, and Your Devices"
                    actions={
                      <Button
                        variant="primary"
                        iconAlign="right"
                        iconName="external"
                        onClick={() => setShowRefreshModal(true)}
                      >
                        Refresh Data
                      </Button>
                    }
                  >
                    Network Adminstration Dashboard
                  </Header>
                </div>
                <Grid
                  gridDefinition={[
                    { colspan: { default: 12, xs: 12, s: 8 } },
                    { colspan: { default: 12, xs: 12, s: 4 } },
                  ]}
                >
                  <TextFilter
                    filteringText={filterText}
                    filteringPlaceholder="Placeholder"
                    filteringAriaLabel="Filter resources"
                    onChange={({ detail }) => setFilterText(detail.filteringText)}
                  />
                  <Box float="right">
                    <SpaceBetween size="xs" direction="horizontal" alignItems="center">
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
              {showAlert && (
                <Alert type="error" dismissible onDismiss={() => setShowAlert(false)}>
                  This is a warning message
                </Alert>
              )}

              <Grid
                gridDefinition={[
                  { colspan: { default: 12, xs: 12, s: 12, m: 6 } },
                  { colspan: { default: 12, xs: 12, s: 12, m: 6 } },
                ]}
              >
                <Container>
                  <AreaChart
                    series={networkTrafficData}
                    xDomain={[1, 12]}
                    yDomain={[0, 200]}
                    height={300}
                    i18nStrings={{
                      filterLabel: 'Filter displayed data',
                      filterPlaceholder: 'Filter data',
                      filterSelectedAriaLabel: 'selected',
                      detailPopoverDismissAriaLabel: 'Dismiss',
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'area chart',
                      xTickFormatter: (value: number) => `x${value}`,
                      yTickFormatter: (value: number) => `y${value}`,
                    }}
                    ariaLabel="Network traffic area chart"
                    ariaDescription="Area chart showing network traffic across two sites with performance goal threshold"
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
                      <SpaceBetween size="xs" direction="horizontal">
                        <Box variant="span" fontSize="body-s" color="text-status-inactive">
                          Performance goal
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
                        data: creditUsageData,
                        valueFormatter: (value: number) => `${value}`,
                      },
                    ]}
                    xDomain={[1, 2, 3, 4, 5]}
                    yDomain={[0, 100]}
                    height={300}
                    i18nStrings={{
                      filterLabel: 'Filter displayed data',
                      filterPlaceholder: 'Filter data',
                      filterSelectedAriaLabel: 'selected',
                      detailPopoverDismissAriaLabel: 'Dismiss',
                      legendAriaLabel: 'Legend',
                      chartAriaRoleDescription: 'bar chart',
                      xTickFormatter: (value: number) => `x${value}`,
                      yTickFormatter: (value: number) => `y${value}`,
                    }}
                    ariaLabel="Credit usage bar chart"
                    ariaDescription="Bar chart showing credit usage over five days with performance goal threshold"
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
                      <SpaceBetween size="xs" direction="horizontal">
                        <Box variant="span" fontSize="body-s" color="text-status-inactive">
                          Performance goal
                        </Box>
                      </SpaceBetween>
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
                    isRowHeader: true,
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
                items={deviceTableItems}
                loadingText="Loading devices"
                selectionType="multi"
                trackBy="id"
                selectedItems={selectedItems}
                onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
                empty={
                  <Box textAlign="center" color="inherit">
                    <b>No devices</b>
                    <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                      No devices to display.
                    </Box>
                    <Button>Add Device</Button>
                  </Box>
                }
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
                ariaLabels={{
                  selectionGroupLabel: 'Items selection',
                  allItemsSelectionLabel: ({ selectedItems }) =>
                    `${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`,
                  itemSelectionLabel: ({ selectedItems }, item) => {
                    const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
                    return `${item.column1} is ${isItemSelected ? '' : 'not'} selected`;
                  },
                }}
              />
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </>
  );
}
