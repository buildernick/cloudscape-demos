// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Alert from '@cloudscape-design/components/alert';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Input from '@cloudscape-design/components/input';
import Pagination from '@cloudscape-design/components/pagination';
import Icon from '@cloudscape-design/components/icon';
import Modal from '@cloudscape-design/components/modal';
import { NetworkTrafficChart } from './components/network-traffic-chart';
import { CreditUsageChart } from './components/credit-usage-chart';
import { DevicesTable } from './components/devices-table';

export function NetworkDashboard() {
  const [searchValue, setSearchValue] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [showRefreshModal, setShowRefreshModal] = useState(false);

  const handleRefreshData = () => {
    // Simulate data refresh
    console.log('Data refreshed!');
    setShowRefreshModal(false);
    // Here you would typically call your data refresh API
  };

  return (
    <>
      <AppLayout
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Service', href: '#' },
              { text: 'Administrative Dashboard', href: '#' },
            ]}
            expandAriaLabel="Show path"
            ariaLabel="Breadcrumbs"
          />
        }
        navigationHide
        toolsHide
        notifications={
          <Alert type="warning" dismissible dismissAriaLabel="Close alert">
            This is a warning message
          </Alert>
        }
        content={
          <ContentLayout
            defaultPadding
            header={
              <Header
                variant="h1"
                description="Network Traffic, Credit Usage, and Your Devices"
                actions={
                  <Button variant="primary" iconName="refresh" onClick={() => setShowRefreshModal(true)}>
                    Refresh Data
                  </Button>
                }
              >
                Network Administration Dashboard
              </Header>
            }
          >
            <SpaceBetween size="l">
              {/* Search and Pagination */}
              <Container>
                <Grid
                  gridDefinition={[
                    { colspan: { default: 12, xs: 12, s: 8, m: 8, l: 8, xl: 8 } },
                    { colspan: { default: 12, xs: 12, s: 4, m: 4, l: 4, xl: 4 } },
                  ]}
                >
                  <Input
                    type="search"
                    placeholder="Placeholder"
                    value={searchValue}
                    onChange={({ detail }) => setSearchValue(detail.value)}
                  />
                  <Box textAlign="right">
                    <Pagination
                      currentPageIndex={currentPageIndex}
                      onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                      pagesCount={5}
                      ariaLabels={{
                        nextPageLabel: 'Next page',
                        previousPageLabel: 'Previous page',
                        pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                      }}
                    />
                    <Box margin={{ left: 's' }} display="inline-block">
                      <Button iconName="settings" variant="icon" />
                    </Box>
                  </Box>
                </Grid>
              </Container>

              {/* Charts Section */}
              <Grid
                gridDefinition={[
                  { colspan: { default: 12, s: 12, m: 6, l: 6, xl: 6 } },
                  { colspan: { default: 12, s: 12, m: 6, l: 6, xl: 6 } },
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
                      <Button variant="primary" iconName="add-plus">
                        Add Device
                      </Button>
                    }
                  >
                    My Devices
                  </Header>
                }
              >
                <DevicesTable />
              </Container>
            </SpaceBetween>
          </ContentLayout>
        }
      />

      {/* Refresh Confirmation Modal */}
      <Modal
        onDismiss={() => setShowRefreshModal(false)}
        visible={showRefreshModal}
        size="medium"
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link" onClick={() => setShowRefreshModal(false)}>
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
            Are you sure you want to refresh all dashboard data? This will reload network traffic, credit usage, and
            device information from the servers.
          </Box>
          <Box variant="small" color="text-status-info">
            This process may take a few moments to complete.
          </Box>
        </SpaceBetween>
      </Modal>
    </>
  );
}
