// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Grid from '@cloudscape-design/components/grid';
import Flashbar from '@cloudscape-design/components/flashbar';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Icon from '@cloudscape-design/components/icon';

import { NetworkTrafficChart } from './components/network-traffic-chart';
import { CreditUsageChart } from './components/credit-usage-chart';
import { DevicesTable } from './components/devices-table';

export function App() {
  const [searchText, setSearchText] = useState('');
  const [showAlert, setShowAlert] = useState(true);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const breadcrumbItems = [
    { text: 'Service', href: '#/' },
    { text: 'Administrative Dashboard', href: '#/network-dashboard' },
  ];

  const alertItems = showAlert ? [
    {
      type: 'warning' as const,
      content: 'This is a warning message',
      dismissible: true,
      onDismiss: () => setShowAlert(false),
      dismissLabel: 'Dismiss',
    },
  ] : [];

  return (
    <AppLayout
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <BreadcrumbGroup items={breadcrumbItems} />
              <Header
                variant="h1"
                description="Network Traffic, Credit Usage, and Your Devices"
                actions={
                  <Button
                    variant="primary"
                    iconName="external"
                    iconAlign="right"
                    onClick={() => window.location.reload()}
                  >
                    Refresh Data
                  </Button>
                }
              >
                Network Administration Dashboard
              </Header>
              <Flashbar items={alertItems} />
              <div className="search-and-pagination">
                <Grid
                  gridDefinition={[
                    { colspan: { default: 12, s: 8 } },
                    { colspan: { default: 12, s: 4 } },
                  ]}
                >
                  <TextFilter
                    filteringText={searchText}
                    filteringPlaceholder="Placeholder"
                    filteringAriaLabel="Filter devices"
                    onChange={({ detail }) => setSearchText(detail.filteringText)}
                  />
                  <div className="pagination-wrapper">
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
                    <Icon name="settings" size="normal" />
                  </div>
                </Grid>
              </div>
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {/* Charts Section */}
            <Grid
              gridDefinition={[
                { colspan: { default: 12, m: 6 } },
                { colspan: { default: 12, m: 6 } },
              ]}
            >
              <NetworkTrafficChart />
              <CreditUsageChart />
            </Grid>

            {/* Devices Section */}
            <Container
              header={
                <Header
                  variant="h2"
                  description="Devices on your local network"
                  actions={
                    <Button
                      variant="primary"
                      iconName="external"
                      iconAlign="right"
                    >
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
      navigationOpen={false}
      toolsHide={true}
    />
  );
}
