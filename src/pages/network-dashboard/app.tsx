// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Flashbar from '@cloudscape-design/components/flashbar';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Header from '@cloudscape-design/components/header';
import ContentLayout from '@cloudscape-design/components/content-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Grid from '@cloudscape-design/components/grid';

import { NetworkCharts } from './components/network-charts';
import { DevicesTable } from './components/devices-table';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

export function App() {
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showWarning, setShowWarning] = useState(true);

  const flashbarItems = showWarning
    ? [
        {
          type: 'error' as const,
          dismissible: true,
          content: 'This is a warning message',
          onDismiss: () => setShowWarning(false),
          dismissLabel: 'Dismiss',
        },
      ]
    : [];

  return (
    <AppLayout
      navigationHide
      toolsHide
      notifications={<Flashbar items={flashbarItems} />}
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <BreadcrumbGroup
                items={[
                  { text: 'Service', href: '#/' },
                  { text: 'Administrative Dashboard', href: '#' },
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
                Network Adminstration Dashboard
              </Header>

              <Grid
                gridDefinition={[
                  { colspan: { default: 12, xs: 12, s: 8 } },
                  { colspan: { default: 12, xs: 12, s: 4 } },
                ]}
              >
                <TextFilter
                  filteringText={filterText}
                  filteringPlaceholder="Placeholder"
                  onChange={({ detail }) => setFilterText(detail.filteringText)}
                />
                <Box textAlign="right">
                  <Pagination
                    currentPageIndex={currentPage}
                    pagesCount={5}
                    onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: pageNumber => `Page ${pageNumber}`,
                    }}
                  />
                </Box>
              </Grid>
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            <NetworkCharts />
            <DevicesTable />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
