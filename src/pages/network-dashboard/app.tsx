// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { CustomAppLayout } from '../commons/common-components';
import { Breadcrumbs, Notifications } from '../commons';
import { NetworkDashboardContent } from './components/content';
import { NetworkDashboardHeader } from './components/header';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

export function App() {
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <CustomAppLayout
      content={
        <SpaceBetween size="m">
          <NetworkDashboardHeader 
            actions={
              <Button variant="primary" iconAlign="right" iconName="external">
                Refresh Data
              </Button>
            } 
          />
          <NetworkDashboardContent />
        </SpaceBetween>
      }
      breadcrumbs={
        <Breadcrumbs 
          items={[
            { text: 'Service', href: '#/' },
            { text: 'Administrative Dashboard', href: '#/network-dashboard' }
          ]} 
        />
      }
      navigationHide
      toolsHide
      notifications={<Notifications />}
    />
  );
}
