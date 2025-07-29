// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Header from '@cloudscape-design/components/header';

interface NetworkDashboardHeaderProps {
  actions?: React.ReactNode;
}

export function NetworkDashboardHeader({ actions }: NetworkDashboardHeaderProps) {
  return (
    <Header
      variant="h1"
      description="Network Traffic, Credit Usage, and Your Devices"
      actions={actions}
    >
      Network Administration Dashboard
    </Header>
  );
}
