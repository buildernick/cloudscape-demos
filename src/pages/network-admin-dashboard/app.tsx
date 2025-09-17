// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Flashbar from '@cloudscape-design/components/flashbar';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';

import { Breadcrumbs } from '../commons';
import { NetworkTrafficChart } from './components/network-traffic-chart';
import { CreditUsageChart } from './components/credit-usage-chart';
import { devicesData, devicesColumnDefinitions } from './data/devices-data';

export function App() {
  const [searchText, setSearchText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [dismissedWarning, setDismissedWarning] = useState(false);
  const itemsPerPage = 10;

  // Filter devices based on search text
  const filteredDevices = devicesData.filter(device =>
    Object.values(device).some(value => 
      value?.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  // Paginate the filtered devices
  const paginatedDevices = filteredDevices.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage
  );

  return (
    <AppLayout
      navigationHide
      toolsHide
      notifications={
        !dismissedWarning ? (
          <Flashbar
            items={[
              {
                type: 'warning',
                content: 'This is a warning message',
                dismissible: true,
                onDismiss: () => setDismissedWarning(true),
                buttonText: 'Dismiss',
              },
            ]}
          />
        ) : undefined
      }
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
              Network Administration Dashboard
            </Header>
          }
        >
          <SpaceBetween size="l">
            {/* Charts Section */}
            <Grid
              gridDefinition={[
                { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
                { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
              ]}
            >
              <Container>
                <NetworkTrafficChart />
              </Container>
              <Container>
                <CreditUsageChart />
              </Container>
            </Grid>

            {/* Devices Section */}
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
                renderAriaLive={({ firstIndex, lastIndex, totalItemsCount }) =>
                  `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
                }
                columnDefinitions={devicesColumnDefinitions}
                items={paginatedDevices}
                selectedItems={selectedItems}
                onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
                selectionType="multi"
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
                    counter={selectedItems.length > 0 ? `(${selectedItems.length}/10)` : undefined}
                    actions={
                      <SpaceBetween direction="horizontal" size="xs">
                        <TextFilter
                          filteringText={searchText}
                          filteringPlaceholder="Placeholder"
                          filteringAriaLabel="Filter devices"
                          onChange={({ detail }) => {
                            setSearchText(detail.filteringText);
                            setCurrentPageIndex(1);
                          }}
                        />
                        <Pagination
                          currentPageIndex={currentPageIndex}
                          onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                          pagesCount={Math.ceil(filteredDevices.length / itemsPerPage)}
                          ariaLabels={{
                            nextPageLabel: 'Next page',
                            previousPageLabel: 'Previous page',
                            pageLabel: pageNumber => `Page ${pageNumber}`,
                          }}
                        />
                      </SpaceBetween>
                    }
                  >
                    Devices ({filteredDevices.length})
                  </Header>
                }
                pagination={
                  <Pagination
                    currentPageIndex={currentPageIndex}
                    onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                    pagesCount={Math.ceil(filteredDevices.length / itemsPerPage)}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: pageNumber => `Page ${pageNumber}`,
                    }}
                  />
                }
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
      breadcrumbs={
        <Breadcrumbs
          items={[
            { text: 'Service', href: '#/' },
            { text: 'Administrative Dashboard', href: '#/network-admin-dashboard' },
          ]}
        />
      }
    />
  );
}
