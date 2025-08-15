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
    <>
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          left: '-10000px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
        onFocus={e => {
          e.target.style.position = 'static';
          e.target.style.left = 'auto';
          e.target.style.width = 'auto';
          e.target.style.height = 'auto';
          e.target.style.overflow = 'visible';
          e.target.style.padding = '8px';
          e.target.style.backgroundColor = '#0073bb';
          e.target.style.color = 'white';
          e.target.style.textDecoration = 'none';
          e.target.style.zIndex = '9999';
        }}
        onBlur={e => {
          e.target.style.position = 'absolute';
          e.target.style.left = '-10000px';
          e.target.style.width = '1px';
          e.target.style.height = '1px';
          e.target.style.overflow = 'hidden';
          e.target.style.padding = '0';
        }}
      >
        Skip to main content
      </a>

      <AppLayout
        content={
          <ContentLayout header={<DashboardHeader />}>
            <main id="main-content" role="main">
              <SpaceBetween size="l">
                <DashboardContent />
              </SpaceBetween>
            </main>
          </ContentLayout>
        }
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Service', href: '#' },
              { text: 'Administrative Dashboard', href: '#' },
            ]}
            ariaLabel="Breadcrumb navigation"
          />
        }
        navigationHide
        toolsHide
      />
    </>
  );
}
