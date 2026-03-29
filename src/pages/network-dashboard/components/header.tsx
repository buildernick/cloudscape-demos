// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import SpaceBetween from '@cloudscape-design/components/space-between';

interface NetworkDashboardHeaderProps {
  actions?: React.ReactNode;
}

export function NetworkDashboardHeader({ actions }: NetworkDashboardHeaderProps) {
  return (
    <Container>
      <SpaceBetween size="m">
        <Header
          variant="h1"
          description="Network Traffic, Credit Usage, and Your Devices"
          actions={actions}
        >
          Network Administration Dashboard
        </Header>
      </SpaceBetween>
    </Container>
  );
}
