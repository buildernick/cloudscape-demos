// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';

export function DashboardHeader() {
  return (
    <SpaceBetween size="l">
      <Header
        variant="h1"
        description="Network Traffic, Credit Usage, and Your Devices"
        actions={
          <Button variant="primary" iconAlign="right" iconName="external">
            Refresh Data
          </Button>
        }
      >
        Network Administration Dashboard
      </Header>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '113px' }}>
        <div style={{ flex: 1 }}>
          <TextFilter
            filteringText=""
            filteringPlaceholder="Search dashboard content"
            ariaLabel="Search dashboard content"
            onChange={() => {}}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Pagination
            currentPageIndex={1}
            pagesCount={5}
            ariaLabels={{
              nextPageLabel: 'Next page',
              previousPageLabel: 'Previous page',
              pageLabel: pageNumber => `Page ${pageNumber}`,
            }}
          />
          <div
            style={{ width: '2px', height: '32px', backgroundColor: '#414D5C' }}
            role="separator"
            aria-orientation="vertical"
          />
          <Button variant="icon" iconName="settings" ariaLabel="Dashboard settings" />
        </div>
      </div>
    </SpaceBetween>
  );
}
