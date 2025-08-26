// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Flashbar from '@cloudscape-design/components/flashbar';
import Header from '@cloudscape-design/components/header';
import Grid from '@cloudscape-design/components/grid';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { NetworkTrafficChart } from './components/network-traffic-chart';
import { CreditUsageChart } from './components/credit-usage-chart';
import { DevicesTable } from './components/devices-table';

export function App() {
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

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
                expandAriaLabel="Show path"
                ariaLabel="Breadcrumbs"
              />
              
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

              <Grid
                gridDefinition={[
                  { colspan: { default: 12, xs: 12, s: 8, m: 8, l: 8, xl: 8 } },
                  { colspan: { default: 12, xs: 12, s: 4, m: 4, l: 4, xl: 4 } }
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

              <Flashbar
                items={[
                  {
                    type: 'warning',
                    content: 'This is a warning message',
                    dismissible: true,
                    buttonText: 'Dismiss',
                    onButtonClick: () => {},
                  },
                ]}
              />
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            <Grid
              gridDefinition={[
                { colspan: { default: 12, l: 6 } },
                { colspan: { default: 12, l: 6 } }
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
  );
}
