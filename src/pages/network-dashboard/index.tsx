// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import Button from '@cloudscape-design/components/button';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';

import Icon from '@cloudscape-design/components/icon';
import Modal from '@cloudscape-design/components/modal';
import Box from '@cloudscape-design/components/box';

import { NetworkTrafficChart } from './components/network-traffic-chart';
import { CreditUsageChart } from './components/credit-usage-chart';
import { DevicesTable } from './components/devices-table';
import { WarningBanner } from './components/warning-banner';

export default function NetworkDashboard() {
  const [filterText, setFilterText] = useState('');
  const [showRefreshModal, setShowRefreshModal] = useState(false);

  const handleRefreshData = () => {
    setShowRefreshModal(false);
    // Here you would typically call your data refresh logic
    console.log('Refreshing dashboard data...');
  };

  return (
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
              />

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
                Network Administration Dashboard
              </Header>

              <Grid gridDefinition={[{ colspan: { default: 12, xs: 12, s: 12, m: 8, l: 8, xl: 8 } }, { colspan: 4 }]}>
                <TextFilter
                  filteringText={filterText}
                  filteringPlaceholder="Placeholder"
                  onChange={({ detail }) => setFilterText(detail.filteringText)}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
                  <Pagination
                    currentPageIndex={1}
                    pagesCount={5}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: pageNumber => `Page ${pageNumber}`,
                    }}
                  />
                  <div style={{ width: '2px', height: '32px', backgroundColor: '#414D5C' }}></div>
                  <Button variant="icon" iconName="settings" />
                </div>
              </Grid>

              <WarningBanner message="This is a warning message" />
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {/* Charts Section */}
            <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
              <NetworkTrafficChart />
              <CreditUsageChart />
            </Grid>

            {/* Devices Section */}
            <Container>
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
              <DevicesTable />
            </Container>
          </SpaceBetween>

          {/* Refresh Confirmation Modal */}
          <Modal
            onDismiss={() => setShowRefreshModal(false)}
            visible={showRefreshModal}
            size="small"
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
              <Box>
                Are you sure you want to refresh all dashboard data? This will reload network traffic, credit usage, and
                device information.
              </Box>
              <Box variant="small" color="text-status-info">
                This action may take a few moments to complete.
              </Box>
            </SpaceBetween>
          </Modal>
        </ContentLayout>
      }
    />
  );
}
