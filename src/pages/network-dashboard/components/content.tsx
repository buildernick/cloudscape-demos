// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Flashbar from '@cloudscape-design/components/flashbar';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';

import { NetworkTrafficChart } from './network-traffic-chart';
import { CreditUsageChart } from './credit-usage-chart';
import { DevicesTable } from './devices-table';

interface ContentProps {
  refreshKey?: number;
}

export function Content({ refreshKey }: ContentProps = {}) {
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  return (
    <SpaceBetween size="l">
      {/* Warning Alert Banner */}
      <Flashbar
        items={[
          {
            type: 'warning',
            content: 'This is a warning message',
            dismissible: true,
            dismissLabel: 'Dismiss',
          },
        ]}
      />

      {/* Filter and Pagination Controls */}
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '113px' }}>
          <div style={{ flex: 1 }}>
            <TextFilter
              filteringText={filterText}
              filteringPlaceholder="Placeholder"
              onChange={({ detail }) => setFilterText(detail.filteringText)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
            <div style={{ width: '2px', height: '32px', backgroundColor: '#414D5C' }} />
            <div style={{ width: '26px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '16px', height: '16px', fill: '#D1D5DB' }}>
                <svg viewBox="0 0 16 16">
                  <path d="M8 0C6.11 0 4.6 1.51 4.6 3.38c0 .36.06.71.16 1.04L0 16h2.53l1.13-2.4h8.68L13.47 16H16L11.24 4.42c.1-.33.16-.68.16-1.04C11.4 1.51 9.89 0 8 0zm0 2c.76 0 1.38.62 1.38 1.38S8.76 4.76 8 4.76 6.62 4.14 6.62 3.38 7.24 2 8 2zM5.47 11.6l2.53-5.36 2.53 5.36H5.47z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Charts Grid */}
      <Grid gridDefinition={[{ colspan: { default: 12, xs: 12, s: 6, m: 6, l: 6, xl: 6 } }, { colspan: { default: 12, xs: 12, s: 6, m: 6, l: 6, xl: 6 } }]}>
        <NetworkTrafficChart />
        <CreditUsageChart />
      </Grid>

      {/* Devices Table */}
      <DevicesTable />
    </SpaceBetween>
  );
}
