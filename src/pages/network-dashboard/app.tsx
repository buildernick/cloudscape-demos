// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { Breadcrumbs } from '../commons';
import { CustomAppLayout } from '../commons/common-components';
import { Content } from './components/content';
import { NetworkDashboardHeader } from './components/header';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

export function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef<AppLayoutProps.Ref>(null);

  return (
    <CustomAppLayout
      ref={appLayout}
      content={
        <SpaceBetween size="m">
          <NetworkDashboardHeader 
            actions={
              <Button variant="primary" iconAlign="right" iconName="external">
                Refresh Data
              </Button>
            } 
          />
          <Content />
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
    />
  );
}
