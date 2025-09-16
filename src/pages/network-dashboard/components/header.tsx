// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Header from '@cloudscape-design/components/header';
import HelpPanel from '@cloudscape-design/components/help-panel';
import Input from '@cloudscape-design/components/input';
import Grid from '@cloudscape-design/components/grid';
import Pagination from '@cloudscape-design/components/pagination';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { ExternalLinkGroup, InfoLink, useHelpPanel } from '../../commons';

export function NetworkDashboardMainInfo() {
  return (
    <HelpPanel
      header={<h2>Network Administration Dashboard</h2>}
      footer={
        <ExternalLinkGroup
          items={[
            { href: '#', text: 'Network Traffic Documentation' },
            { href: '#', text: 'Credit Usage Guide' },
            { href: '#', text: 'Device Management API Reference' },
            { href: '#', text: 'Network Administration Best Practices' },
          ]}
        />
      }
    >
      <p>
        The Network Administration Dashboard provides comprehensive monitoring and management capabilities for your 
        network infrastructure. Track network traffic patterns, monitor credit usage, and manage devices across 
        your network environment.
      </p>
    </HelpPanel>
  );
}

interface NetworkDashboardHeaderProps {
  actions: React.ReactNode;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function NetworkDashboardHeader({ actions, searchValue, onSearchChange }: NetworkDashboardHeaderProps) {
  const loadHelpPanelContent = useHelpPanel();
  
  return (
    <SpaceBetween size="m">
      <Header
        variant="h1"
        info={<InfoLink onFollow={() => loadHelpPanelContent(<NetworkDashboardMainInfo />)} />}
        description="Network Traffic, Credit Usage, and Your Devices"
        actions={actions}
      >
        Network Administration Dashboard
      </Header>
      
      {/* Search and Pagination Controls */}
      <Grid
        gridDefinition={[
          { colspan: { default: 12, xs: 12, s: 8, m: 8, l: 8, xl: 8 } },
          { colspan: { default: 12, xs: 12, s: 4, m: 4, l: 4, xl: 4 } }
        ]}
      >
        <Input
          type="search"
          placeholder="Placeholder"
          value={searchValue}
          onChange={({ detail }) => onSearchChange(detail.value)}
          clearAriaLabel="Clear search"
        />
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
          <Pagination
            currentPageIndex={1}
            pagesCount={5}
            ariaLabels={{
              nextPageLabel: 'Next page',
              previousPageLabel: 'Previous page',
              pageLabel: pageNumber => `Page ${pageNumber}`,
            }}
          />
          <div style={{ width: '2px', height: '32px', backgroundColor: '#414D5C' }} />
          <Button iconName="settings" variant="icon" />
        </div>
      </Grid>
    </SpaceBetween>
  );
}
