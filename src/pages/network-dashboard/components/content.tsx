// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Flashbar from '@cloudscape-design/components/flashbar';

import { NetworkTrafficChart } from './network-traffic-chart';
import { CreditUsageChart } from './credit-usage-chart';
import { DevicesTable } from './devices-table';

export function NetworkDashboardContent() {
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  return (
    <SpaceBetween size="l">
      {/* Warning Banner */}
      <Flashbar
        items={[
          {
            type: 'error',
            content: 'This is a warning message',
            dismissible: true,
          },
        ]}
      />

      {/* Search and Pagination */}
      <Container>
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
                pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
              }}
            />
            <div style={{ width: '2px', height: '32px', backgroundColor: 'var(--color-border-divider-default)' }} />
            <div style={{ width: '26px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: 'var(--color-text-interactive-disabled)' }} />
            </div>
          </div>
        </Grid>
      </Container>

      {/* Charts Section */}
      <Grid
        gridDefinition={[
          { colspan: { default: 12, l: 6 } },
          { colspan: { default: 12, l: 6 } },
        ]}
      >
        <NetworkTrafficChart />
        <CreditUsageChart />
      </Grid>

      {/* Devices Table */}
      <DevicesTable />
    </SpaceBetween>
  );
}
