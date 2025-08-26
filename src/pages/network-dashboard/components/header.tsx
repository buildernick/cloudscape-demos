// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';

export function NetworkDashboardHeader() {
  return (
    <SpaceBetween size="m">
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
      
      <div className="network-dashboard-header-controls">
        <div className="search-and-pagination">
          <TextFilter
            filteringText=""
            filteringPlaceholder="Placeholder"
            filteringAriaLabel="Filter devices"
            onChange={() => {}}
          />
          <div className="pagination-controls">
            <Pagination
              currentPageIndex={1}
              pagesCount={5}
              onChange={() => {}}
              ariaLabels={{
                nextPageLabel: 'Next page',
                previousPageLabel: 'Previous page',
                pageLabel: pageNumber => `Page ${pageNumber}`,
              }}
            />
          </div>
        </div>
      </div>
    </SpaceBetween>
  );
}
