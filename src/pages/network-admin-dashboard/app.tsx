// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import SpaceBetween from '@cloudscape-design/components/space-between';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import { DashboardHeader } from './components/header';
import { DashboardContent } from './components/content';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

export function App() {
  return (
    <AppLayout
      content={
        <ContentLayout
          header={<DashboardHeader />}
        >
          <SpaceBetween size="l">
            <DashboardContent />
          </SpaceBetween>
        </ContentLayout>
      }
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#' },
            { text: 'Administrative Dashboard', href: '#' },
          ]}
        />
      }
      navigationHide
      toolsHide
    />
  );
}
