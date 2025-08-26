// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Grid from '@cloudscape-design/components/grid';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { Breadcrumbs } from '../commons';
import { NetworkDashboardContent } from './components/content';
import { NetworkDashboardHeader } from './components/header';
import { WarningBanner } from './components/warning-banner';

export function App() {
  return (
    <AppLayout
      navigationHide
      toolsHide
      content={
        <ContentLayout
          header={
            <SpaceBetween size="s">
              <Breadcrumbs
                items={[
                  { text: 'Service', href: '#' },
                  { text: 'Administrative Dashboard', href: '#' },
                ]}
              />
              <NetworkDashboardHeader />
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            <WarningBanner />
            <NetworkDashboardContent />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
