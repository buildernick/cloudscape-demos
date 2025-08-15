// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Grid from '@cloudscape-design/components/grid';
import Flashbar from '@cloudscape-design/components/flashbar';
import { NetworkTrafficChart } from './charts/network-traffic-chart';
import { CreditUsageChart } from './charts/credit-usage-chart';
import { DevicesTable } from './devices-table';

export function DashboardContent() {
  return (
    <SpaceBetween size="l">
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
      
      <div style={{ padding: '40px 0 50px 0' }}>
        <Grid
          gridDefinition={[
            { colspan: { default: 12, s: 6 } },
            { colspan: { default: 12, s: 6 } },
          ]}
        >
          <NetworkTrafficChart />
          <CreditUsageChart />
        </Grid>
      </div>
      
      <DevicesTable />
    </SpaceBetween>
  );
}
