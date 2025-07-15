// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { HelpPanelContext } from '../../commons';

interface NetworkDashboardHeaderProps {
  actions?: React.ReactNode;
}

export function NetworkDashboardHeader({ actions }: NetworkDashboardHeaderProps) {
  return (
    <Header variant="h1" actions={actions} description="Network Traffic, Credit Usage, and Your Devices">
      Network Administration Dashboard
    </Header>
  );
}

export function NetworkDashboardMainInfo() {
  const { setHelpPanelContent } = React.useContext(HelpPanelContext);

  return (
    <Box variant="h2" padding="l">
      <SpaceBetween size="l">
        <div>
          <Box variant="h3">Network Administration Dashboard</Box>
          <Box variant="p">
            Monitor your network traffic, credit usage, and manage your devices from this centralized dashboard.
          </Box>
        </div>

        <div>
          <Box variant="h3">Key Features</Box>
          <Box variant="p">
            <ul>
              <li>Real-time network traffic monitoring</li>
              <li>Credit usage tracking with performance goals</li>
              <li>Device management and monitoring</li>
              <li>Administrative controls and settings</li>
            </ul>
          </Box>
        </div>

        <div>
          <Box variant="h3">Getting Started</Box>
          <Box variant="p">
            Use the charts to monitor your network performance and credit consumption. Manage your devices using the
            table below with options to add, remove, and configure devices.
          </Box>
        </div>
      </SpaceBetween>
    </Box>
  );
}
