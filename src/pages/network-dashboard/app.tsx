// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Alert from '@cloudscape-design/components/alert';
import Header from '@cloudscape-design/components/header';
import Grid from '@cloudscape-design/components/grid';
import Modal from '@cloudscape-design/components/modal';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { NetworkTrafficChart } from './components/network-traffic-chart';
import { CreditUsageChart } from './components/credit-usage-chart';
import { DevicesTable } from './components/devices-table';

export function App() {
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [isRefreshModalVisible, setIsRefreshModalVisible] = useState(false);

  const handleRefreshData = () => {
    // Implement actual refresh logic here
    console.log('Refreshing data...');
    setIsRefreshModalVisible(false);
  };

  return (
    <>
      <AppLayout
        navigationHide
        toolsHide
        content={
          <ContentLayout
            header={
              <SpaceBetween size="m">
                <BreadcrumbGroup
                  items={[
                    { text: 'Service', href: '#' },
                    { text: 'Administrative Dashboard', href: '#' },
                  ]}
                  expandAriaLabel="Show path"
                  ariaLabel="Breadcrumbs"
                />

                <Header
                  variant="h1"
                  description="Network Traffic, Credit Usage, and Your Devices"
                  actions={
                    <Button
                      variant="primary"
                      iconName="external"
                      iconAlign="right"
                      onClick={() => setIsRefreshModalVisible(true)}
                    >
                      Refresh Data
                    </Button>
                  }
                >
                  Network Administration Dashboard
                </Header>

                <Grid
                  gridDefinition={[
                    { colspan: { default: 12, xs: 12, s: 8, m: 8, l: 8, xl: 8 } },
                    { colspan: { default: 12, xs: 12, s: 4, m: 4, l: 4, xl: 4 } },
                  ]}
                >
                  <TextFilter
                    filteringText={filterText}
                    filteringPlaceholder="Placeholder"
                    filteringAriaLabel="Filter content"
                    onChange={({ detail }) => setFilterText(detail.filteringText)}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
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
                    <div style={{ width: '2px', height: '32px', backgroundColor: '#414D5C' }} />
                    <Button iconName="settings" variant="icon" />
                  </div>
                </Grid>

                <Alert type="error" dismissible buttonText="Dismiss" onDismiss={() => {}}>
                  This is a warning message
                </Alert>
              </SpaceBetween>
            }
          >
            <SpaceBetween size="l">
              <Grid
                gridDefinition={[
                  { colspan: { default: 12, s: 12, m: 6, l: 6, xl: 6 } },
                  { colspan: { default: 12, s: 12, m: 6, l: 6, xl: 6 } },
                ]}
              >
                <NetworkTrafficChart />
                <CreditUsageChart />
              </Grid>

              <DevicesTable />
            </SpaceBetween>
          </ContentLayout>
        }
      />

      <Modal
        onDismiss={() => setIsRefreshModalVisible(false)}
        visible={isRefreshModalVisible}
        closeAriaLabel="Close modal"
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link" onClick={() => setIsRefreshModalVisible(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleRefreshData}>
                Refresh Data
              </Button>
            </SpaceBetween>
          </Box>
        }
        header="Confirm Data Refresh"
      >
        <SpaceBetween size="m">
          <Box variant="span">
            Are you sure you want to refresh all data? This will reload network traffic, credit usage, and device
            information.
          </Box>
        </SpaceBetween>
      </Modal>
    </>
  );
}
