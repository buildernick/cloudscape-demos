// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import { useCollection } from '@cloudscape-design/collection-hooks';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import CollectionPreferences from '@cloudscape-design/components/collection-preferences';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Flashbar, { FlashbarProps } from '@cloudscape-design/components/flashbar';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import HelpPanel from '@cloudscape-design/components/help-panel';
import Input from '@cloudscape-design/components/input';
import Pagination, { PaginationProps } from '@cloudscape-design/components/pagination';
import SideNavigation from '@cloudscape-design/components/side-navigation';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator, { StatusIndicatorProps } from '@cloudscape-design/components/status-indicator';
import Table, { TableProps } from '@cloudscape-design/components/table';
import TextFilter, { TextFilterProps } from '@cloudscape-design/components/text-filter';
import Toggle from '@cloudscape-design/components/toggle';
import TopNavigation from '@cloudscape-design/components/top-navigation';

import * as localStorage from '../../common/local-storage';
import { Breadcrumbs } from '../commons';
import { CustomAppLayout } from '../commons/common-components';
import { Device, creditUsageData, devices, networkTrafficData, performanceGoal } from './data';

import '@cloudscape-design/global-styles/dark-mode-utils.css';
import '../../styles/base.scss';
import '../../styles/top-navigation.scss';
import styles from './styles.module.scss';

const topNavigationI18nStrings = {
  searchIconAriaLabel: 'Search',
  searchDismissIconAriaLabel: 'Close search',
  overflowMenuTriggerText: 'More',
  overflowMenuTitleText: 'All',
  overflowMenuBackIconAriaLabel: 'Back',
  overflowMenuDismissIconAriaLabel: 'Close menu',
};

const profileActions = [
  { id: 'profile', text: 'Profile' },
  { id: 'preferences', text: 'Preferences' },
  { id: 'signout', text: 'Sign out' },
];

const navItems = [
  { type: 'link' as const, text: 'Dashboard', href: '#/' },
  { type: 'link' as const, text: 'Events', href: '#/events' },
  { type: 'link' as const, text: 'Tags', href: '#/tags' },
  { type: 'link' as const, text: 'Reports', href: '#/reports' },
  { type: 'link' as const, text: 'Limits', href: '#/limits' },
];

const statusDisplay: Record<Device['status'], { type: StatusIndicatorProps['type']; label: string }> = {
  online: { type: 'success', label: 'Online' },
  idle: { type: 'pending', label: 'Idle' },
  offline: { type: 'stopped', label: 'Offline' },
};

const columnDefinitions: TableProps.ColumnDefinition<Device>[] = [
  { id: 'name', header: 'Device name', cell: item => item.name, sortingField: 'name', isRowHeader: true },
  { id: 'ipAddress', header: 'IP address', cell: item => item.ipAddress, sortingField: 'ipAddress' },
  { id: 'macAddress', header: 'MAC address', cell: item => item.macAddress, sortingField: 'macAddress' },
  { id: 'type', header: 'Device type', cell: item => item.type, sortingField: 'type' },
  {
    id: 'status',
    header: 'Status',
    cell: item => (
      <StatusIndicator type={statusDisplay[item.status].type}>{statusDisplay[item.status].label}</StatusIndicator>
    ),
    sortingField: 'status',
  },
  { id: 'lastSeen', header: 'Last seen', cell: item => item.lastSeen, sortingField: 'lastSeen' },
  { id: 'bandwidthUsage', header: 'Bandwidth usage', cell: item => item.bandwidthUsage, sortingField: 'bandwidthUsage' },
];

const PAGE_SIZE_OPTIONS = [
  { value: 10, label: '10 devices' },
  { value: 20, label: '20 devices' },
  { value: 30, label: '30 devices' },
];

function NetworkTrafficChart() {
  return (
    <Container>
      <SpaceBetween size="m">
        <Box fontWeight="bold" fontSize="body-m">
          Network traffic
        </Box>
        <AreaChart
          height={300}
          series={[
            {
              title: 'Site 1',
              type: 'area',
              data: networkTrafficData.map(d => ({ x: d.day, y: d.site1 })),
              color: '#688AE8',
            },
            {
              title: 'Site 2',
              type: 'area',
              data: networkTrafficData.map(d => ({ x: d.day, y: d.site2 })),
              color: '#C33D69',
            },
            {
              title: 'Performance goal',
              type: 'threshold',
              y: performanceGoal,
              color: '#5F6B7A',
            },
          ]}
          xDomain={networkTrafficData.map(d => d.day)}
          yDomain={[1, 6]}
          xScaleType="categorical"
          xTitle="Day"
          yTitle="Network traffic"
          ariaLabel="Network traffic area chart"
          ariaDescription="Area chart comparing network traffic between Site 1 and Site 2 across 12 days, with a dashed performance goal line."
          hideFilter
          i18nStrings={{
            filterLabel: 'Filter displayed data',
            filterPlaceholder: 'Filter data',
            legendAriaLabel: 'Legend',
            chartAriaRoleDescription: 'area chart',
            xTickFormatter: x => `${x}`,
          }}
        />
      </SpaceBetween>
    </Container>
  );
}

function CreditUsageChart() {
  return (
    <Container>
      <SpaceBetween size="m">
        <Box fontWeight="bold" fontSize="body-m">
          Credit Usage
        </Box>
        <BarChart
          height={300}
          series={[
            {
              title: 'Site 1',
              type: 'bar',
              data: creditUsageData.map(d => ({ x: d.day, y: d.credits })),
              color: '#688AE8',
            },
          ]}
          xDomain={creditUsageData.map(d => d.day)}
          yDomain={[0, 700]}
          xScaleType="categorical"
          xTitle="Day"
          yTitle="Credit usage"
          ariaLabel="Credit usage bar chart"
          ariaDescription="Bar chart showing credit usage for Site 1 across 5 days."
          hideFilter
          i18nStrings={{
            filterLabel: 'Filter displayed data',
            filterPlaceholder: 'Filter data',
            legendAriaLabel: 'Legend',
            chartAriaRoleDescription: 'bar chart',
            xTickFormatter: x => `${x}`,
          }}
        />
      </SpaceBetween>
    </Container>
  );
}

function DevicesToolbar({
  filterProps,
  paginationProps,
}: {
  filterProps: TextFilterProps;
  paginationProps: PaginationProps;
}) {
  return (
    <div className={styles.toolbarRow}>
      <div className={styles.filterWrapper}>
        <TextFilter
          {...filterProps}
          filteringAriaLabel="Filter devices"
          filteringPlaceholder="Placeholder"
          filteringClearAriaLabel="Clear"
        />
      </div>
      <SpaceBetween direction="horizontal" size="xs" alignItems="center">
        <Pagination
          {...paginationProps}
          ariaLabels={{
            nextPageLabel: 'Next page',
            previousPageLabel: 'Previous page',
            pageLabel: pageNumber => `Page ${pageNumber}`,
          }}
        />
        <CollectionPreferences
          title="Preferences"
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          preferences={{ pageSize: 10 }}
          pageSizePreference={{ title: 'Page size', options: PAGE_SIZE_OPTIONS }}
        />
      </SpaceBetween>
    </div>
  );
}

function DevicesTable({
  items,
  collectionProps,
}: {
  items: readonly Device[];
  collectionProps: ReturnType<typeof useCollection<Device>>['collectionProps'];
}) {
  return (
    <Table
      {...collectionProps}
      columnDefinitions={columnDefinitions}
      items={items}
      selectionType="multi"
      variant="full-page"
      stickyHeader={true}
      resizableColumns={true}
      enableKeyboardNavigation={true}
      ariaLabels={{
        selectionGroupLabel: 'Device selection',
        allItemsSelectionLabel: () => 'Select all devices',
        itemSelectionLabel: (_data, row: Device) => `Select ${row.name}`,
      }}
      header={
        <Header
          variant="h2"
          description="Devices on your local network"
          actions={
            <Button variant="primary" iconAlign="right" iconName="external">
              Add Device
            </Button>
          }
        >
          My Devices
        </Header>
      }
    />
  );
}

export default function NetworkAdminDashboard() {
  const [darkMode, setDarkMode] = useState<boolean>(() => localStorage.load<boolean>('Awsui-Theme-Mode') ?? false);
  const [searchValue, setSearchValue] = useState('');
  const [toolsOpen, setToolsOpen] = useState(false);
  const [notifications, setNotifications] = useState<FlashbarProps.MessageDefinition[]>([
    {
      type: 'warning',
      content: 'This is a warning message',
      dismissLabel: 'Dismiss',
      dismissible: true,
      onDismiss: () => setNotifications([]),
      id: 'network-admin-dashboard-warning',
    },
  ]);

  useEffect(() => {
    const theme = darkMode ? 'awsui-dark-mode' : 'awsui-light-mode';
    document.body.classList.remove('awsui-dark-mode', 'awsui-light-mode');
    document.body.classList.add(theme);
    localStorage.save('Awsui-Theme-Mode', darkMode);
  }, [darkMode]);

  const { items, actions, collectionProps, filterProps, paginationProps } = useCollection(devices, {
    filtering: {
      empty: (
        <Box textAlign="center" color="inherit">
          <b>No devices</b>
          <Box variant="p" color="inherit">
            No devices found on your local network.
          </Box>
        </Box>
      ),
      noMatch: (
        <Box textAlign="center" color="inherit">
          <b>No matches</b>
          <Box variant="p" color="inherit">
            We can't find a match.
          </Box>
          <Button onClick={() => actions.setFiltering('')}>Clear filter</Button>
        </Box>
      ),
    },
    pagination: { pageSize: 10 },
    sorting: {},
    selection: {},
  });

  return (
    <>
      <TopNavigation
        i18nStrings={topNavigationI18nStrings}
        identity={{ href: '#', title: 'Service name' }}
        search={
          <Input
            ariaLabel="Search"
            clearAriaLabel="Clear"
            value={searchValue}
            type="search"
            placeholder="Search"
            onChange={({ detail }) => setSearchValue(detail.value)}
          />
        }
        utilities={[
          { type: 'button', text: 'Link', iconName: 'external', href: '#', external: true, ariaLabel: 'Link (opens in a new tab)' },
          { type: 'button', iconName: 'notification', ariaLabel: 'Notifications', badge: true, disableUtilityCollapse: true },
          { type: 'button', iconName: 'settings', title: 'Settings', ariaLabel: 'Settings' },
          { type: 'menu-dropdown', text: 'Customer name', iconName: 'user-profile', items: profileActions },
        ]}
      />
      <CustomAppLayout
        navigation={<SideNavigation activeHref="#/" items={navItems} header={{ text: 'Service', href: '#/' }} />}
        navigationOpen={false}
        breadcrumbs={<Breadcrumbs items={[{ text: 'Administrative Dashboard', href: '#' }]} />}
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        tools={
          <HelpPanel header={<h2>Administrative Dashboard</h2>}>
            <p>Monitor network traffic, credit usage, and devices connected to your local network.</p>
          </HelpPanel>
        }
        content={
          <ContentLayout
            header={
              <Header
                variant="h1"
                description="Network Traffic, Credit Usage, and Your Devices"
                actions={
                  <SpaceBetween direction="horizontal" size="xs">
                    <Toggle checked={darkMode} onChange={({ detail }) => setDarkMode(detail.checked)} ariaLabel="Toggle dark mode">
                      Dark mode
                    </Toggle>
                    <Button variant="primary" iconAlign="right" iconName="external">
                      Refresh Data
                    </Button>
                  </SpaceBetween>
                }
              >
                Network Administration Dashboard
              </Header>
            }
          >
            <SpaceBetween size="l">
              <DevicesToolbar filterProps={filterProps} paginationProps={paginationProps} />
              {notifications.length > 0 && <Flashbar items={notifications} />}
              <Grid gridDefinition={[{ colspan: { default: 12, m: 6 } }, { colspan: { default: 12, m: 6 } }]}>
                <NetworkTrafficChart />
                <CreditUsageChart />
              </Grid>
              <DevicesTable items={items} collectionProps={collectionProps} />
            </SpaceBetween>
          </ContentLayout>
        }
      />
    </>
  );
}
