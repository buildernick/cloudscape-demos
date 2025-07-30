// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import CollectionPreferences from '@cloudscape-design/components/collection-preferences';
import Pagination from '@cloudscape-design/components/pagination';

// Sample data for the devices table
const devicesData = [
  {
    id: '1',
    deviceName: 'Router-001',
    ipAddress: '192.168.1.1',
    macAddress: '00:11:22:33:44:55',
    deviceType: 'Router',
    status: 'Online',
    lastSeen: '2024-01-15 10:30:00',
    bandwidth: '100 Mbps',
  },
  {
    id: '2', 
    deviceName: 'Switch-001',
    ipAddress: '192.168.1.2',
    macAddress: '00:11:22:33:44:56',
    deviceType: 'Switch',
    status: 'Online',
    lastSeen: '2024-01-15 10:29:00',
    bandwidth: '1 Gbps',
  },
  {
    id: '3',
    deviceName: 'AP-001',
    ipAddress: '192.168.1.3',
    macAddress: '00:11:22:33:44:57',
    deviceType: 'Access Point',
    status: 'Offline',
    lastSeen: '2024-01-15 09:15:00',
    bandwidth: '54 Mbps',
  },
  {
    id: '4',
    deviceName: 'PC-001',
    ipAddress: '192.168.1.100',
    macAddress: '00:11:22:33:44:58',
    deviceType: 'Computer',
    status: 'Online',
    lastSeen: '2024-01-15 10:28:00',
    bandwidth: '100 Mbps',
  },
  {
    id: '5',
    deviceName: 'Printer-001',
    ipAddress: '192.168.1.101',
    macAddress: '00:11:22:33:44:59',
    deviceType: 'Printer',
    status: 'Online',
    lastSeen: '2024-01-15 10:25:00',
    bandwidth: '10 Mbps',
  },
  {
    id: '6',
    deviceName: 'Server-001',
    ipAddress: '192.168.1.10',
    macAddress: '00:11:22:33:44:60',
    deviceType: 'Server',
    status: 'Online',
    lastSeen: '2024-01-15 10:30:00',
    bandwidth: '1 Gbps',
  },
  {
    id: '7',
    deviceName: 'Camera-001',
    ipAddress: '192.168.1.50',
    macAddress: '00:11:22:33:44:61',
    deviceType: 'Security Camera',
    status: 'Online',
    lastSeen: '2024-01-15 10:27:00',
    bandwidth: '25 Mbps',
  },
  {
    id: '8',
    deviceName: 'Phone-001',
    ipAddress: '192.168.1.200',
    macAddress: '00:11:22:33:44:62',
    deviceType: 'IP Phone',
    status: 'Online',
    lastSeen: '2024-01-15 10:26:00',
    bandwidth: '5 Mbps',
  },
];

const columnDefinitions = [
  {
    id: 'deviceName',
    header: 'Device Name',
    cell: (item: any) => item.deviceName,
    sortingField: 'deviceName',
  },
  {
    id: 'ipAddress',
    header: 'IP Address',
    cell: (item: any) => item.ipAddress,
    sortingField: 'ipAddress',
  },
  {
    id: 'macAddress',
    header: 'MAC Address',
    cell: (item: any) => item.macAddress,
    sortingField: 'macAddress',
  },
  {
    id: 'deviceType',
    header: 'Device Type',
    cell: (item: any) => item.deviceType,
    sortingField: 'deviceType',
  },
  {
    id: 'status',
    header: 'Status',
    cell: (item: any) => item.status,
    sortingField: 'status',
  },
  {
    id: 'lastSeen',
    header: 'Last Seen',
    cell: (item: any) => item.lastSeen,
    sortingField: 'lastSeen',
  },
  {
    id: 'bandwidth',
    header: 'Bandwidth',
    cell: (item: any) => item.bandwidth,
    sortingField: 'bandwidth',
  },
];

export function DevicesTable() {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [sortingDescending, setSortingDescending] = useState(false);
  const [sortingColumn, setSortingColumn] = useState('deviceName');

  const itemsPerPage = 10;
  const paginatedItems = devicesData.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage
  );

  return (
    <Container>
      <Table
        columnDefinitions={columnDefinitions}
        items={paginatedItems}
        loadingText="Loading devices"
        selectionType="multi"
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
        sortingDescending={sortingDescending}
        sortingColumn={sortingColumn}
        onSortingChange={({ detail }) => {
          setSortingColumn(detail.sortingColumn.id!);
          setSortingDescending(detail.isDescending!);
        }}
        header={
          <Header
            variant="h2"
            description="Devices on your local network"
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button>Remove device</Button>
                <Button variant="primary" iconAlign="right" iconName="external">
                  Add Device
                </Button>
              </SpaceBetween>
            }
            counter={selectedItems.length > 0 ? `(${selectedItems.length}/${devicesData.length})` : `(${devicesData.length})`}
          >
            My Devices
          </Header>
        }
        empty={
          <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No devices</b>
              <Button>Add device</Button>
            </SpaceBetween>
          </Box>
        }
        pagination={
          <Pagination
            currentPageIndex={currentPageIndex}
            onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
            pagesCount={Math.ceil(devicesData.length / itemsPerPage)}
            ariaLabels={{
              nextPageLabel: 'Next page',
              previousPageLabel: 'Previous page',
              pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
            }}
          />
        }
        preferences={
          <CollectionPreferences
            title="Preferences"
            confirmLabel="Confirm"
            cancelLabel="Cancel"
            preferences={{
              pageSize: itemsPerPage,
              visibleContent: ['deviceName', 'ipAddress', 'macAddress', 'deviceType', 'status', 'lastSeen', 'bandwidth'],
            }}
            onConfirm={({ detail }) => {
              // Handle preferences change
            }}
            pageSizePreference={{
              title: 'Page size',
              options: [
                { value: 5, label: '5 devices' },
                { value: 10, label: '10 devices' },
                { value: 20, label: '20 devices' },
              ],
            }}
            visibleContentPreference={{
              title: 'Select visible columns',
              options: [
                {
                  label: 'Device properties',
                  options: columnDefinitions.map(({ id, header }) => ({ id, label: header })),
                },
              ],
            }}
          />
        }
      />
    </Container>
  );
}
