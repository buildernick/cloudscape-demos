// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import AreaChart from '@cloudscape-design/components/area-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Box from '@cloudscape-design/components/box';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Flashbar from '@cloudscape-design/components/flashbar';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Table from '@cloudscape-design/components/table';
import TextFilter from '@cloudscape-design/components/text-filter';
import Toggle from '@cloudscape-design/components/toggle';
import TopNavigation from '@cloudscape-design/components/top-navigation';

import { CustomAppLayout } from '../commons/common-components';
import * as localStorage from '../../common/local-storage';
import logo from '../non-console/logo.svg';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

interface Device {
  name: string;
  ip: string;
  mac: string;
  type: string;
  status: 'success' | 'error' | 'warning' | 'info';
  statusLabel: string;
  lastSeen: string;
  manufacturer: string;
}

const devices: Device[] = [
  { name: 'Router-Main', ip: '192.168.1.1', mac: 'AA:BB:CC:11:22:01', type: 'Router', status: 'success', statusLabel: 'Active', lastSeen: '2 min ago', manufacturer: 'Cisco' },
  { name: 'Switch-Core', ip: '192.168.1.2', mac: 'AA:BB:CC:11:22:02', type: 'Switch', status: 'success', statusLabel: 'Active', lastSeen: '1 min ago', manufacturer: 'Juniper' },
  { name: 'AP-Floor1', ip: '192.168.1.10', mac: 'AA:BB:CC:11:22:03', type: 'Access Point', status: 'success', statusLabel: 'Active', lastSeen: '5 min ago', manufacturer: 'Ubiquiti' },
  { name: 'AP-Floor2', ip: '192.168.1.11', mac: 'AA:BB:CC:11:22:04', type: 'Access Point', status: 'warning', statusLabel: 'Degraded', lastSeen: '12 min ago', manufacturer: 'Ubiquiti' },
  { name: 'Firewall-Edge', ip: '192.168.1.254', mac: 'AA:BB:CC:11:22:05', type: 'Firewall', status: 'success', statusLabel: 'Active', lastSeen: '30 sec ago', manufacturer: 'Palo Alto' },
  { name: 'Server-Web01', ip: '192.168.2.10', mac: 'AA:BB:CC:11:22:06', type: 'Server', status: 'success', statusLabel: 'Active', lastSeen: '1 min ago', manufacturer: 'Dell' },
  { name: 'Server-DB01', ip: '192.168.2.20', mac: 'AA:BB:CC:11:22:07', type: 'Server', status: 'success', statusLabel: 'Active', lastSeen: '2 min ago', manufacturer: 'HPE' },
  { name: 'NAS-Storage', ip: '192.168.2.30', mac: 'AA:BB:CC:11:22:08', type: 'NAS', status: 'success', statusLabel: 'Active', lastSeen: '4 min ago', manufacturer: 'Synology' },
  { name: 'VoIP-Gateway', ip: '192.168.3.1', mac: 'AA:BB:CC:11:22:09', type: 'VoIP', status: 'warning', statusLabel: 'Degraded', lastSeen: '20 min ago', manufacturer: 'Poly' },
  { name: 'Camera-Lobby', ip: '192.168.4.10', mac: 'AA:BB:CC:11:22:10', type: 'IP Camera', status: 'success', statusLabel: 'Active', lastSeen: '3 min ago', manufacturer: 'Axis' },
  { name: 'Printer-Main', ip: '192.168.1.50', mac: 'AA:BB:CC:11:22:11', type: 'Printer', status: 'error', statusLabel: 'Offline', lastSeen: '2 hrs ago', manufacturer: 'HP' },
  { name: 'Switch-Edge', ip: '192.168.1.3', mac: 'AA:BB:CC:11:22:12', type: 'Switch', status: 'success', statusLabel: 'Active', lastSeen: '8 min ago', manufacturer: 'Aruba' },
  { name: 'AP-Lobby', ip: '192.168.1.12', mac: 'AA:BB:CC:11:22:13', type: 'Access Point', status: 'success', statusLabel: 'Active', lastSeen: '6 min ago', manufacturer: 'Cisco' },
  { name: 'UPS-Main', ip: '192.168.1.100', mac: 'AA:BB:CC:11:22:14', type: 'UPS', status: 'info', statusLabel: 'Maintenance', lastSeen: '15 min ago', manufacturer: 'APC' },
];

const networkTrafficDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const site1Values = [2.1, 2.8, 3.0, 2.6, 2.9, 3.1, 2.7, 3.2, 2.9, 3.0, 3.1, 2.9];
const site2Values = [3.2, 3.8, 4.1, 3.7, 4.5, 4.2, 4.0, 4.4, 4.1, 4.3, 4.5, 4.2];

const creditUsageCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
const creditUsageValues = [4.2, 5.8, 4.8, 3.2, 5.1];

const ITEMS_PER_PAGE = 10;

const topNavI18nStrings = {
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
  { id: 'security', text: 'Security' },
  { id: 'signout', text: 'Sign out' },
];

export default function NetworkDashboard() {
  const [darkMode, setDarkMode] = useState<boolean>(() => localStorage.load<boolean>('Awsui-Theme-Mode') ?? false);
  const [warningDismissed, setWarningDismissed] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [navSearchValue, setNavSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);

  useEffect(() => {
    const theme = darkMode ? 'awsui-dark-mode' : 'awsui-light-mode';
    document.body.classList.remove('awsui-dark-mode', 'awsui-light-mode');
    document.body.classList.add(theme);
    localStorage.save('Awsui-Theme-Mode', darkMode);
  }, [darkMode]);

  const filteredDevices = devices.filter(
    d =>
      d.name.toLowerCase().includes(filterText.toLowerCase()) ||
      d.ip.includes(filterText) ||
      d.type.toLowerCase().includes(filterText.toLowerCase()) ||
      d.manufacturer.toLowerCase().includes(filterText.toLowerCase()),
  );

  const pageCount = Math.ceil(filteredDevices.length / ITEMS_PER_PAGE);
  const paginatedDevices = filteredDevices.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);



  return (
    <>
      <TopNavigation
        i18nStrings={topNavI18nStrings}
        identity={{
          href: '/',
          title: 'Service name',
          logo: { src: logo, alt: 'Service name logo' },
        }}
        search={
          <Input
            ariaLabel="Search"
            clearAriaLabel="Clear"
            value={navSearchValue}
            type="search"
            placeholder="Search"
            onChange={({ detail }) => setNavSearchValue(detail.value)}
          />
        }
        utilities={[
          {
            type: 'button',
            text: 'Link',
            href: '#',
            external: true,
            externalIconAriaLabel: '(opens in new tab)',
          },
          {
            type: 'button',
            iconName: 'notification',
            ariaLabel: 'Notifications',
            badge: true,
          },
          {
            type: 'button',
            iconName: 'settings',
            title: 'Settings',
            ariaLabel: 'Settings',
          },
          {
            type: 'menu-dropdown',
            text: 'Customer name',
            iconName: 'user-profile',
            items: profileActions,
          },
        ]}
      />
      <CustomAppLayout
      navigationHide
      toolsHide
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '/' },
            { text: 'Administrative Dashboard', href: '#' },
          ]}
          ariaLabel="Breadcrumbs"
        />
      }
      notifications={
        <Flashbar
          items={
            warningDismissed
              ? []
              : [
                  {
                    type: 'warning',
                    content: 'This is a warning message',
                    dismissible: true,
                    dismissLabel: 'Dismiss',
                    onDismiss: () => setWarningDismissed(true),
                    id: 'network-warning',
                  },
                ]
          }
        />
      }
      content={
        <SpaceBetween size="l">
          <Header
            variant="h1"
            description="Network Traffic, Credit Usage, and Your Devices"
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Toggle
                  checked={darkMode}
                  onChange={({ detail }) => setDarkMode(detail.checked)}
                  ariaLabel="Toggle dark mode"
                >
                  Dark mode
                </Toggle>
                <Button variant="primary" iconName="external" iconAlign="right">
                  Refresh Data
                </Button>
              </SpaceBetween>
            }
          >
            Network Adminstration Dashboard
          </Header>

          <Grid gridDefinition={[{ colspan: { l: 6, m: 6, default: 12 } }, { colspan: { l: 6, m: 6, default: 12 } }]}>
            <Container>
              <AreaChart
                series={[
                  {
                    title: 'Site 1',
                    type: 'area',
                    data: networkTrafficDays.map((x, i) => ({ x, y: site1Values[i] })),
                    color: '#688AE8',
                  },
                  {
                    title: 'Site 2',
                    type: 'area',
                    data: networkTrafficDays.map((x, i) => ({ x, y: site2Values[i] })),
                    color: '#C33D69',
                  },
                  {
                    title: 'Performance goal',
                    type: 'threshold',
                    y: 3.5,
                    color: '#5F6B7A',
                  },
                ]}
                xDomain={[1, 12]}
                yDomain={[0, 6]}
                xTitle="Day"
                yTitle="Traffic (Gbps)"
                height={300}
                hideFilter
                ariaLabel="Network traffic area chart"
                i18nStrings={{
                  xTickFormatter: v => `Day ${v}`,
                  yTickFormatter: v => `${v}`,
                  filterLabel: 'Filter displayed data series',
                  filterPlaceholder: 'Filter series',
                  filterSelectedAriaLabel: 'selected',
                  detailPopoverDismissAriaLabel: 'Dismiss',
                  legendAriaLabel: 'Legend',
                  chartAriaRoleDescription: 'line chart',
                  detailTotalLabel: 'Total',
                }}
                errorText="Error loading data."
                loadingText="Loading chart"
                recoveryText="Retry"
                statusType="finished"
              />
            </Container>

            <Container>
              <BarChart
                series={[
                  {
                    title: 'Site 1',
                    type: 'bar',
                    data: creditUsageCategories.map((x, i) => ({ x, y: creditUsageValues[i] })),
                    color: '#688AE8',
                  },
                  {
                    title: 'Performance goal',
                    type: 'threshold',
                    y: 4.0,
                    color: '#5F6B7A',
                  },
                ]}
                xDomain={creditUsageCategories}
                yDomain={[0, 7]}
                xTitle="Day"
                yTitle="Credits Used"
                height={300}
                hideFilter
                ariaLabel="Credit usage bar chart"
                i18nStrings={{
                  filterLabel: 'Filter displayed data series',
                  filterPlaceholder: 'Filter series',
                  filterSelectedAriaLabel: 'selected',
                  detailPopoverDismissAriaLabel: 'Dismiss',
                  legendAriaLabel: 'Legend',
                  chartAriaRoleDescription: 'bar chart',
                  detailTotalLabel: 'Total',
                  yTickFormatter: v => `${v}`,
                }}
                errorText="Error loading data."
                loadingText="Loading chart"
                recoveryText="Retry"
                statusType="finished"
              />
            </Container>
          </Grid>

          <Table
            columnDefinitions={[
              {
                id: 'name',
                header: 'Device Name',
                cell: item => item.name,
                sortingField: 'name',
                isRowHeader: true,
              },
              {
                id: 'ip',
                header: 'IP Address',
                cell: item => item.ip,
                sortingField: 'ip',
              },
              {
                id: 'mac',
                header: 'MAC Address',
                cell: item => item.mac,
              },
              {
                id: 'type',
                header: 'Device Type',
                cell: item => item.type,
                sortingField: 'type',
              },
              {
                id: 'status',
                header: 'Status',
                cell: item => <StatusIndicator type={item.status}>{item.statusLabel}</StatusIndicator>,
                sortingField: 'statusLabel',
              },
              {
                id: 'lastSeen',
                header: 'Last Seen',
                cell: item => item.lastSeen,
                sortingField: 'lastSeen',
              },
              {
                id: 'manufacturer',
                header: 'Manufacturer',
                cell: item => item.manufacturer,
                sortingField: 'manufacturer',
              },
            ]}
            items={paginatedDevices}
            selectionType="multi"
            selectedItems={selectedDevices}
            onSelectionChange={({ detail }) => setSelectedDevices(detail.selectedItems)}
            ariaLabels={{
              selectionGroupLabel: 'Device selection',
              allItemsSelectionLabel: () => 'Select all devices',
              itemSelectionLabel: (_, item) => `Select ${item.name}`,
            }}
            header={
              <Header
                counter={selectedDevices.length ? `(${selectedDevices.length}/${devices.length})` : `(${devices.length})`}
                description="Devices on your local network"
                actions={
                  <Button variant="primary" iconName="external" iconAlign="right">
                    Add Device
                  </Button>
                }
              >
                My Devices
              </Header>
            }
            filter={
              <TextFilter
                filteringText={filterText}
                filteringPlaceholder="Find devices"
                filteringAriaLabel="Filter devices"
                onChange={({ detail }) => {
                  setFilterText(detail.filteringText);
                  setCurrentPage(1);
                }}
              />
            }
            pagination={
              <Pagination
                currentPageIndex={currentPage}
                pagesCount={pageCount}
                onChange={({ detail }) => setCurrentPage(detail.currentPageIndex)}
                ariaLabels={{
                  nextPageLabel: 'Next page',
                  previousPageLabel: 'Previous page',
                  pageLabel: page => `Page ${page} of ${pageCount}`,
                }}
              />
            }
            empty={
              <Box textAlign="center" color="inherit">
                <SpaceBetween size="s">
                  <b>No devices found</b>
                  <Box variant="p" color="inherit">
                    No devices match the current filter.
                  </Box>
                </SpaceBetween>
              </Box>
            }
            sortingDisabled={false}
            variant="full-page"
            stickyHeader
          />
        </SpaceBetween>
      }
    />
    </>
  );
}
