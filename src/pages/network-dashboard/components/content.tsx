// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Grid from '@cloudscape-design/components/grid';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Flashbar from '@cloudscape-design/components/flashbar';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';

import { NetworkTrafficChart } from './network-traffic-chart';
import { CreditUsageChart } from './credit-usage-chart';
import { DevicesTable } from './devices-table';

export function Content() {
  return (
    <SpaceBetween size="l">
      {/* Warning Message */}
      <Flashbar
        items={[
          {
            type: 'warning',
            content: 'This is a warning message',
            dismissible: true,
            id: 'warning-message',
          },
        ]}
      />

      {/* Search and Pagination */}
      <Grid gridDefinition={[{ colspan: { default: 8, xs: 12 } }, { colspan: { default: 4, xs: 12 } }]}>
        <TextFilter filteringPlaceholder="Placeholder" filteringText="" />
        <Pagination
          currentPageIndex={1}
          pagesCount={5}
          ariaLabels={{
            nextPageLabel: 'Next page',
            previousPageLabel: 'Previous page',
            pageLabel: pageNumber => `Page ${pageNumber}`,
          }}
        />
      </Grid>

      {/* Charts */}
      <Grid
        gridDefinition={[
          { colspan: { default: 6, s: 6, m: 6, l: 6, xl: 6, xs: 12 } },
          { colspan: { default: 6, s: 6, m: 6, l: 6, xl: 6, xs: 12 } },
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
