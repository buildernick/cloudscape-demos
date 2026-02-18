// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Header from '@cloudscape-design/components/header';
import HelpPanel from '@cloudscape-design/components/help-panel';
import Link from '@cloudscape-design/components/link';

import { ExternalLinkGroup, InfoLink } from '../../commons';

interface NetworkDashboardHeaderProps {
  actions?: React.ReactNode;
}

export function NetworkDashboardHeader({ actions }: NetworkDashboardHeaderProps) {
  return (
    <Header
      variant="h1"
      actions={actions}
      description="Network Traffic, Credit Usage, and Your Devices"
      info={<InfoLink onFollow={() => void 0} />}
    >
      Network Administration Dashboard
    </Header>
  );
}

export function NetworkDashboardMainInfo() {
  return (
    <HelpPanel
      header={<h2>Network Administration Dashboard</h2>}
      footer={
        <ExternalLinkGroup
          items={[
            {
              href: 'https://docs.aws.amazon.com/cloudformation/',
              text: 'AWS CloudFormation User Guide',
            },
            {
              href: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/',
              text: 'AWS CloudFormation API Reference',
            },
            {
              href: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-reference.html',
              text: 'Template Reference',
            },
          ]}
        />
      }
    >
      <p>
        Monitor your network performance, track credit usage, and manage devices across your infrastructure. Use this
        dashboard to keep track of network traffic patterns, credit consumption, and device status.
      </p>
      <p>
        The dashboard provides real-time insights into your network operations with interactive charts and detailed
        device management capabilities.
      </p>
    </HelpPanel>
  );
}
