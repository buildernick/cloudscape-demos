// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useEffect, useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import CollectionPreferences from '@cloudscape-design/components/collection-preferences';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Container from '@cloudscape-design/components/container';
import Alert from '@cloudscape-design/components/alert';
import Header from '@cloudscape-design/components/header';
import Modal from '@cloudscape-design/components/modal';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator, { StatusIndicatorProps } from '@cloudscape-design/components/status-indicator';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';
import Toggle from '@cloudscape-design/components/toggle';

import * as localStorage from '../../common/local-storage';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

const days = ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12'];
const site1Traffic = [2.4, 2.6, 2.9, 3.1, 3.5, 3.6, 3.9, 4.1, 3.9, 4.0, 4.1, 4.8];
const site2Traffic = [0.3, 0.6, 0.6, 0.5, 1.4, 1.2, 0.8, 0.5, 0.6, 1.2, 0.4, -0.5];

const areaSeries = [
  {
    title: 'Site 1',
    type: 'area' as const,
    color: '#6b8ae8',
    data: days.map((day, i) => ({ x: i + 1, y: site1Traffic[i] })),
  },
  {
    title: 'Site 2',
    type: 'area' as const,
    color: '#c33d69',
    data: days.map((day, i) => ({
      x: i + 1,
      y: Math.round((site1Traffic[i] + Math.max(site2Traffic[i], 0.3)) * 10) / 10,
    })),
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    y: 3.3,
  },
];

const barSeries = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    color: '#6b8ae8',
    data: [
      { x: 'x1', y: 4.4 },
      { x: 'x2', y: 5.8 },
      { x: 'x3', y: 4.9 },
      { x: 'x4', y: 3.2 },
      { x: 'x5', y: 4.8 },
    ],
  },
  {
    title: 'Performance goal',
    type: 'threshold' as const,
    y: 4.0,
  },
];

interface Device {
  id: string;
  name: string;
  type: string;
  ip: string;
  site: string;
  status: StatusIndicatorProps.Type;
  statusLabel: string;
  traffic: string;
  lastSeen: string;
}

const deviceTypes = ['Router', 'Switch', 'Access point', 'Firewall', 'Gateway'];
const statuses: Array<[StatusIndicatorProps.Type, string]> = [
  ['success', 'Online'],
  ['success', 'Online'],
  ['warning', 'Degraded'],
  ['stopped', 'Offline'],
];

const devices: Device[] = Array.from({ length: 14 }, (_, i) => {
  const [status, statusLabel] = statuses[i % statuses.length];
  return {
    id: `device-${i + 1}`,
    name: `device-${String(i + 1).padStart(3, '0')}`,
    type: deviceTypes[i % deviceTypes.length],
    ip: `10.0.${Math.floor(i / 4)}.${10 + i}`,
    site: i % 2 === 0 ? 'Site 1' : 'Site 2',
    status,
    statusLabel,
    traffic: `${(12.5 + i * 3.7).toFixed(1)} GB`,
    lastSeen: `${i + 1} min ago`,
  };
});

const columnDefinitions = [
  { id: 'name', header: 'Device name', cell: (item: Device) => item.name, sortingField: 'name' },
  { id: 'type', header: 'Type', cell: (item: Device) => item.type, sortingField: 'type' },
  { id: 'ip', header: 'IP address', cell: (item: Device) => item.ip, sortingField: 'ip' },
  { id: 'site', header: 'Site', cell: (item: Device) => item.site, sortingField: 'site' },
  {
    id: 'status',
    header: 'Status',
    cell: (item: Device) => <StatusIndicator type={item.status}>{item.statusLabel}</StatusIndicator>,
    sortingField: 'statusLabel',
  },
  { id: 'traffic', header: 'Traffic (24h)', cell: (item: Device) => item.traffic, sortingField: 'traffic' },
  { id: 'lastSeen', header: 'Last seen', cell: (item: Device) => item.lastSeen, sortingField: 'lastSeen' },
];

export default function NetworkDashboard() {
  const [darkMode, setDarkMode] = useState<boolean>(() => localStorage.load<boolean>('Awsui-Theme-Mode') ?? false);
  const [refreshModalVisible, setRefreshModalVisible] = useState(false);
  const [warningVisible, setWarningVisible] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedItems, setSelectedItems] = useState<Device[]>([]);

  useEffect(() => {
    const theme = darkMode ? 'awsui-dark-mode' : 'awsui-light-mode';
    document.body.classList.remove('awsui-dark-mode', 'awsui-light-mode');
    document.body.classList.add(theme);
    localStorage.save('Awsui-Theme-Mode', darkMode);
  }, [darkMode]);

  const filteredDevices = devices.filter(device =>
    Object.values(device).some(value => String(value).toLowerCase().includes(filterText.toLowerCase())),
  );
  const pagesCount = Math.max(1, Math.ceil(filteredDevices.length / pageSize));
  const pageItems = filteredDevices.slice((currentPageIndex - 1) * pageSize, currentPageIndex * pageSize);

  return (
    <>
      <AppLayout
        navigationHide
        toolsHide
        breadcrumbs={
          <BreadcrumbGroup
            ariaLabel="Breadcrumbs"
            items={[
              { text: 'Service', href: '/' },
              { text: 'Administrative Dashboard', href: '/network-dashboard' },
            ]}
          />
        }
        content={
          <ContentLayout
            header={
              <SpaceBetween size="m">
                <Header
                  variant="h1"
                  description="Network Traffic, Credit Usage, and Your Devices"
                  actions={
                    <SpaceBetween direction="horizontal" size="xs" alignItems="center">
                      <Toggle
                        checked={darkMode}
                        onChange={({ detail }) => setDarkMode(detail.checked)}
                        ariaLabel="Toggle dark mode"
                      >
                        Dark mode
                      </Toggle>
                      <Button
                        variant="primary"
                        iconAlign="right"
                        iconName="external"
                        onClick={() => setRefreshModalVisible(true)}
                      >
                        Refresh Data
                      </Button>
                    </SpaceBetween>
                  }
                >
                  Network Administration Dashboard
                </Header>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 320px' }}>
                    <TextFilter
                      filteringText={filterText}
                      filteringPlaceholder="Find devices"
                      filteringAriaLabel="Filter devices"
                      onChange={({ detail }) => {
                        setFilterText(detail.filteringText);
                        setCurrentPageIndex(1);
                      }}
                    />
                  </div>
                  <SpaceBetween direction="horizontal" size="xs" alignItems="center">
                    <Pagination
                      currentPageIndex={currentPageIndex}
                      pagesCount={pagesCount}
                      onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                      ariaLabels={{
                        nextPageLabel: 'Next page',
                        previousPageLabel: 'Previous page',
                        pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                      }}
                    />
                    <CollectionPreferences
                      title="Preferences"
                      confirmLabel="Confirm"
                      cancelLabel="Cancel"
                      preferences={{ pageSize }}
                      onConfirm={({ detail }) => {
                        setPageSize(detail.pageSize ?? 10);
                        setCurrentPageIndex(1);
                      }}
                      pageSizePreference={{
                        title: 'Page size',
                        options: [
                          { value: 5, label: '5 devices' },
                          { value: 10, label: '10 devices' },
                          { value: 20, label: '20 devices' },
                        ],
                      }}
                    />
                  </SpaceBetween>
                </div>
              </SpaceBetween>
            }
          >
            <SpaceBetween size="l">
              {warningVisible && (
                <Alert
                  type="warning"
                  dismissible
                  statusIconAriaLabel="Warning"
                  onDismiss={() => setWarningVisible(false)}
                >
                  This is a warning message
                </Alert>
              )}
              <ColumnLayout columns={2}>
                <Container header={<Header variant="h2">Network traffic</Header>}>
                  <AreaChart
                    series={areaSeries}
                    xScaleType="linear"
                    xTitle="Day"
                    yTitle="Traffic (TB)"
                    height={260}
                    hideFilter
                    xTickFormatter={value => `x${value}`}
                    yTickFormatter={value => `y${value}`}
                    ariaLabel="Network traffic area chart for Site 1 and Site 2"
                    detailPopoverFooter={() => null}
                    i18nStrings={{
                      xTickFormatter: value => `x${value}`,
                      yTickFormatter: value => `y${value}`,
                    }}
                    empty={<Box textAlign="center">No data available</Box>}
                    noMatch={<Box textAlign="center">No matching data</Box>}
                  />
                </Container>
                <Container header={<Header variant="h2">Credit Usage</Header>}>
                  <BarChart
                    series={barSeries}
                    xScaleType="categorical"
                    xTitle="Day"
                    yTitle="Credits"
                    height={260}
                    hideFilter
                    ariaLabel="Credit usage bar chart for Site 1"
                    empty={<Box textAlign="center">No data available</Box>}
                    noMatch={<Box textAlign="center">No matching data</Box>}
                  />
                </Container>
              </ColumnLayout>

              <Table
                variant="borderless"
                columnDefinitions={columnDefinitions}
                items={pageItems}
                selectionType="multi"
                selectedItems={selectedItems}
                onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
                trackBy="id"
                ariaLabels={{
                  selectionGroupLabel: 'Device selection',
                  allItemsSelectionLabel: () => 'Select all devices',
                  itemSelectionLabel: (_, item) => `Select ${item.name}`,
                }}
                header={
                  <Header
                    variant="h1"
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
                empty={
                  <Box textAlign="center" color="inherit">
                    <b>No devices</b>
                  </Box>
                }
              />
            </SpaceBetween>
          </ContentLayout>
        }
      />
      <Modal
        visible={refreshModalVisible}
        onDismiss={() => setRefreshModalVisible(false)}
        header="Refresh data"
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link" onClick={() => setRefreshModalVisible(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setRefreshModalVisible(false)}>
                Confirm
              </Button>
            </SpaceBetween>
          </Box>
        }
      >
        Are you sure?
      </Modal>
    </>
  );
}
