// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { NetworkTrafficChart } from './network-traffic-chart';
import { CreditUsageChart } from './credit-usage-chart';
import { DevicesTable } from './devices-table';

export function NetworkDashboardContent() {
  return (
    <SpaceBetween size="l">
      {/* Charts Row */}
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

      {/* Devices Table */}
      <DevicesTable />
    </SpaceBetween>
  );
}
