// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { CollectionPreferences } from '@cloudscape-design/components/collection-preferences';

interface Device {
  id: string;
  name: string;
  type: string;
  ipAddress: string;
  macAddress: string;
  status: string;
  lastSeen: string;
  bandwidth: string;
}

export function DevicesTable() {
  const [selectedItems, setSelectedItems] = useState<Device[]>([]);
  const [sortingColumn, setSortingColumn] = useState<any>({ sortingField: 'name' });
  const [sortingDescending, setSortingDescending] = useState(false);

  // Sample device data
  const devices: Device[] = [
    {
      id: '1',
      name: 'Router-Main',
      type: 'Router',
      ipAddress: '192.168.1.1',
      macAddress: '00:11:22:33:44:55',
      status: 'Active',
      lastSeen: '2 minutes ago',
      bandwidth: '1000 Mbps',
    },
    {
      id: '2',
      name: 'Laptop-Work',
      type: 'Computer',
      ipAddress: '192.168.1.101',
      macAddress: 'AA:BB:CC:DD:EE:FF',
      status: 'Active',
      lastSeen: '5 minutes ago',
      bandwidth: '150 Mbps',
    },
    {
      id: '3',
      name: 'Phone-Android',
      type: 'Mobile',
      ipAddress: '192.168.1.102',
      macAddress: '11:22:33:44:55:66',
      status: 'Idle',
      lastSeen: '1 hour ago',
      bandwidth: '50 Mbps',
    },
    {
      id: '4',
      name: 'Smart-TV',
      type: 'Entertainment',
      ipAddress: '192.168.1.103',
      macAddress: '77:88:99:AA:BB:CC',
      status: 'Active',
      lastSeen: '10 minutes ago',
      bandwidth: '75 Mbps',
    },
    {
      id: '5',
      name: 'Printer-Office',
      type: 'Printer',
      ipAddress: '192.168.1.104',
      macAddress: 'DD:EE:FF:00:11:22',
      status: 'Offline',
      lastSeen: '2 days ago',
      bandwidth: '10 Mbps',
    },
  ];

  const columnDefinitions = [
    {
      id: 'name',
      header: 'Device Name',
      cell: (item: Device) => item.name,
      sortingField: 'name',
      isRowHeader: true,
    },
    {
      id: 'type',
      header: 'Device Type',
      cell: (item: Device) => item.type,
      sortingField: 'type',
    },
    {
      id: 'ipAddress',
      header: 'IP Address',
      cell: (item: Device) => item.ipAddress,
      sortingField: 'ipAddress',
    },
    {
      id: 'macAddress',
      header: 'MAC Address',
      cell: (item: Device) => item.macAddress,
      sortingField: 'macAddress',
    },
    {
      id: 'status',
      header: 'Status',
      cell: (item: Device) => (
        <Box
          color={
            item.status === 'Active'
              ? 'text-status-success'
              : item.status === 'Idle'
              ? 'text-status-warning'
              : 'text-status-error'
          }
        >
          {item.status}
        </Box>
      ),
      sortingField: 'status',
    },
    {
      id: 'lastSeen',
      header: 'Last Seen',
      cell: (item: Device) => item.lastSeen,
      sortingField: 'lastSeen',
    },
    {
      id: 'bandwidth',
      header: 'Bandwidth',
      cell: (item: Device) => item.bandwidth,
      sortingField: 'bandwidth',
    },
  ];

  const handleSortingChange = (detail: any) => {
    setSortingColumn(detail.sortingColumn);
    setSortingDescending(detail.isDescending || false);
  };

  return (
    <Table
      columnDefinitions={columnDefinitions}
      items={devices}
      loadingText="Loading devices"
      selectionType="multi"
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      sortingColumn={sortingColumn}
      sortingDescending={sortingDescending}
      onSortingChange={({ detail }) => handleSortingChange(detail)}
      ariaLabels={{
        selectionGroupLabel: 'Items selection',
        allItemsSelectionLabel: ({ selectedItems }) =>
          `${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`,
        itemSelectionLabel: ({ selectedItems }, item) => {
          const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
          return `${item.name} is ${isItemSelected ? '' : 'not'} selected`;
        },
      }}
      renderAriaLive={({ firstIndex, lastIndex, totalItemsCount }) =>
        `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
      }
      variant="full-page"
      stickyHeader={false}
      stripedRows={false}
      submitEdit={() => {}}
      header={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Box variant="h3" margin="none">
              Devices ({devices.length})
            </Box>
          </div>
        </div>
      }
      empty={
        <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No devices</b>
            <span>No devices found.</span>
          </SpaceBetween>
        </Box>
      }
      filter={null}
      pagination={null}
      preferences={null}
    />
  );
}
