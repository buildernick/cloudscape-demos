// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import TextFilter from '@cloudscape-design/components/text-filter';

// Mock device data
const deviceData = [
  {
    id: '1',
    deviceName: 'Router-01',
    ipAddress: '192.168.1.1',
    macAddress: '00:11:22:33:44:55',
    deviceType: 'Router',
    status: 'Online',
    lastSeen: '2024-01-15 14:30:00',
    bandwidth: '1 Gbps',
  },
  {
    id: '2',
    deviceName: 'Switch-Main',
    ipAddress: '192.168.1.2',
    macAddress: '00:11:22:33:44:56',
    deviceType: 'Switch',
    status: 'Online',
    lastSeen: '2024-01-15 14:29:45',
    bandwidth: '10 Gbps',
  },
  {
    id: '3',
    deviceName: 'AP-Floor1',
    ipAddress: '192.168.1.10',
    macAddress: '00:11:22:33:44:57',
    deviceType: 'Access Point',
    status: 'Online',
    lastSeen: '2024-01-15 14:28:30',
    bandwidth: '300 Mbps',
  },
  {
    id: '4',
    deviceName: 'Printer-Office',
    ipAddress: '192.168.1.50',
    macAddress: '00:11:22:33:44:58',
    deviceType: 'Printer',
    status: 'Offline',
    lastSeen: '2024-01-15 13:45:00',
    bandwidth: '100 Mbps',
  },
  {
    id: '5',
    deviceName: 'Camera-Entrance',
    ipAddress: '192.168.1.100',
    macAddress: '00:11:22:33:44:59',
    deviceType: 'IP Camera',
    status: 'Online',
    lastSeen: '2024-01-15 14:30:15',
    bandwidth: '10 Mbps',
  },
  {
    id: '6',
    deviceName: 'NAS-Storage',
    ipAddress: '192.168.1.200',
    macAddress: '00:11:22:33:44:60',
    deviceType: 'NAS',
    status: 'Online',
    lastSeen: '2024-01-15 14:29:00',
    bandwidth: '1 Gbps',
  },
  {
    id: '7',
    deviceName: 'Phone-Conference',
    ipAddress: '192.168.1.75',
    macAddress: '00:11:22:33:44:61',
    deviceType: 'VoIP Phone',
    status: 'Online',
    lastSeen: '2024-01-15 14:27:30',
    bandwidth: '64 Kbps',
  },
  {
    id: '8',
    deviceName: 'Laptop-Admin',
    ipAddress: '192.168.1.150',
    macAddress: '00:11:22:33:44:62',
    deviceType: 'Laptop',
    status: 'Online',
    lastSeen: '2024-01-15 14:25:00',
    bandwidth: '300 Mbps',
  },
];

const columnDefinitions = [
  {
    id: 'selection',
    header: '',
    cell: () => null,
    width: 50,
    minWidth: 50,
  },
  {
    id: 'deviceName',
    header: 'Device Name',
    cell: (item: any) => item.deviceName,
    sortingField: 'deviceName',
    isRowHeader: true,
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
  const [sortingColumn, setSortingColumn] = useState<any>({ sortingField: 'deviceName' });
  const [sortingDescending, setSortingDescending] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [filteringText, setFilteringText] = useState('');

  const filteredItems = deviceData.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(filteringText.toLowerCase())
    )
  );

  const itemsPerPage = 10;
  const startIndex = (currentPageIndex - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  return (
    <Table
      ariaLabels={{
        selectionGroupLabel: 'Items selection',
        allItemsSelectionLabel: ({ selectedItems }) =>
          `${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`,
        itemSelectionLabel: ({ selectedItems }, item) =>
          `${item.deviceName} is ${selectedItems.indexOf(item) < 0 ? 'not ' : ''}selected`,
      }}
      columnDefinitions={columnDefinitions}
      items={paginatedItems}
      loadingText="Loading devices"
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      sortingColumn={sortingColumn}
      sortingDescending={sortingDescending}
      onSortingChange={({ detail }) => {
        setSortingColumn(detail.sortingColumn);
        setSortingDescending(detail.isDescending || false);
      }}
      selectionType="multi"
      trackBy="id"
      empty={
        <Box textAlign="center" color="inherit">
          <Box padding={{ bottom: 's' }} variant="p" color="inherit">
            No devices found.
          </Box>
          <Button>Add device</Button>
        </Box>
      }
      filter={
        <TextFilter
          filteringText={filteringText}
          filteringPlaceholder="Find devices"
          filteringAriaLabel="Filter devices"
          onChange={({ detail }) => {
            setFilteringText(detail.filteringText);
            setCurrentPageIndex(1);
          }}
        />
      }
      header={
        <Header
          counter={
            selectedItems.length ? `(${selectedItems.length}/${filteredItems.length})` : `(${filteredItems.length})`
          }
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button disabled={selectedItems.length === 0}>Edit</Button>
              <Button disabled={selectedItems.length === 0}>Delete</Button>
              <Button variant="primary">Add device</Button>
            </SpaceBetween>
          }
        >
          Devices
        </Header>
      }
      pagination={
        <Pagination
          currentPageIndex={currentPageIndex}
          onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
          pagesCount={Math.ceil(filteredItems.length / itemsPerPage)}
          ariaLabels={{
            nextPageLabel: 'Next page',
            previousPageLabel: 'Previous page',
            pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
          }}
        />
      }
    />
  );
}
