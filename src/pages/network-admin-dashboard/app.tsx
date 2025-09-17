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
import Modal from '@cloudscape-design/components/modal';

import { Breadcrumbs } from '../commons';
import { NetworkTrafficChart } from './components/network-traffic-chart';
import { CreditUsageChart } from './components/credit-usage-chart';
import { devicesData, devicesColumnDefinitions } from './data/devices-data';

export function App() {
  const [searchText, setSearchText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [dismissedWarning, setDismissedWarning] = useState(false);
  const [showRefreshModal, setShowRefreshModal] = useState(false);
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
        <>
          <Breadcrumbs
            items={[
              { text: 'Service', href: '#/' },
              { text: 'Administrative Dashboard', href: '#/network-admin-dashboard' },
            ]}
          />
          {!dismissedWarning && (
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                backgroundColor: 'rgba(208, 2, 27, 1)',
                borderRadius: '12px',
                boxShadow: 'rgba(0, 7, 22, 0.1) 0px 4px 8px 0px',
                justifyContent: 'space-between',
                overflowWrap: 'break-word',
                position: 'relative',
                wordWrap: 'break-word',
                padding: '8px 16px',
                margin: '12px 0',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: 'white',
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ flexShrink: 0 }}
                >
                  <path
                    d="M8 5v4M8 10v2M6.52 1.88l-5.33 9.76c-.13.23-.19.5-.19.76 0 .88.71 1.59 1.59 1.59H13.4c.88 0 1.59-.71 1.59-1.59 0-.27-.07-.53-.19-.76L9.48 1.88C9.18 1.34 8.62 1 8 1s-1.18.34-1.48.88Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
                <span style={{ color: 'white', fontSize: '14px', fontWeight: '400' }}>
                  This is a warning message
                </span>
              </div>
              <button
                type="button"
                onClick={() => setDismissedWarning(true)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '20px',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '14px',
                  padding: '4px 20px',
                  cursor: 'pointer',
                }}
              >
                Dismiss
              </button>
            </div>
          )}
        </>
      }
    />
  );
}
