// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Grid from '@cloudscape-design/components/grid';

import { BaseStaticWidget, networkTrafficChart, creditUsageChart, myDevicesTable } from '../widgets';

export function Content() {
  return (
    <Grid
      gridDefinition={[
        { colspan: { l: 6, m: 6, default: 12 } }, // Network Traffic Chart
        { colspan: { l: 6, m: 6, default: 12 } }, // Credit Usage Chart
        { colspan: { l: 12, m: 12, default: 12 } }, // My Devices Table
      ]}
    >
      {[networkTrafficChart, creditUsageChart, myDevicesTable].map((widget, index) => (
        <BaseStaticWidget key={index} config={widget.data} />
      ))}
    </Grid>
  );
}
