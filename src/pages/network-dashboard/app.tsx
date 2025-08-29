// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Flashbar from '@cloudscape-design/components/flashbar';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Table from '@cloudscape-design/components/table';
import Checkbox from '@cloudscape-design/components/checkbox';
import CollectionPreferences from '@cloudscape-design/components/collection-preferences';
import Link from '@cloudscape-design/components/link';
import Box from '@cloudscape-design/components/box';

import { CustomAppLayout } from '../commons/common-components';
import { NetworkTrafficChart } from './components/network-traffic-chart';
import { CreditUsageChart } from './components/credit-usage-chart';
import { DevicesTable } from './components/devices-table';

export default function App() {
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [showWarning, setShowWarning] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <CustomAppLayout
      content={
        <SpaceBetween size="l">
          <BreadcrumbGroup
            items={[
              { text: 'Service', href: '#' },
              { text: 'Administrative Dashboard', href: '#' },
            ]}
            ariaLabel="Breadcrumbs"
          />
          
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

          <Container>
            <Grid
              gridDefinition={[
                { colspan: { default: 12, xs: 12, s: 8, m: 8, l: 8, xl: 8 } },
                { colspan: { default: 12, xs: 12, s: 4, m: 4, l: 4, xl: 4 } }
              ]}
            >
              <TextFilter
                filteringText={filterText}
                filteringPlaceholder="Placeholder"
                onChange={({ detail }) => setFilterText(detail.filteringText)}
              />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                <Pagination
                  currentPageIndex={currentPageIndex}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  pagesCount={5}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber}`,
                  }}
                />
                <div style={{ width: '2px', height: '32px', backgroundColor: 'var(--color-border-divider-default)' }} />
                <Button variant="icon" iconName="settings" ariaLabel="Settings" />
              </div>
            </Grid>
          </Container>

          {showWarning && (
            <Flashbar
              items={[
                {
                  type: 'error',
                  content: 'This is a warning message',
                  dismissible: true,
                  onDismiss: () => setShowWarning(false),
                  buttonText: 'Dismiss',
                  onButtonClick: () => setShowWarning(false),
                },
              ]}
            />
          )}

          <Grid
            gridDefinition={[
              { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
              { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } }
            ]}
          >
            <NetworkTrafficChart />
            <CreditUsageChart />
          </Grid>

          <DevicesTable />
        </SpaceBetween>
      }
      navigationHide
      toolsHide
    />
  );
}
