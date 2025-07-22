// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import Table from '@cloudscape-design/components/table';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Checkbox from '@cloudscape-design/components/checkbox';

interface Device {
  id: string;
  name: string;
  ipAddress: string;
  macAddress: string;
  deviceType: string;
  status: string;
  lastSeen: string;
  bandwidth: string;
}

// Mock data for devices table
const mockDevices: Device[] = [
  {
    id: '1',
    name: 'MacBook Pro',
    ipAddress: '192.168.1.100',
    macAddress: '00:1B:44:11:3A:B7',
    deviceType: 'Laptop',
    status: 'Online',
    lastSeen: '2024-01-15 10:30 AM',
    bandwidth: '54 Mbps',
  },
  {
    id: '2',
    name: 'iPhone 13',
    ipAddress: '192.168.1.101',
    macAddress: '00:1B:44:11:3A:B8',
    deviceType: 'Mobile',
    status: 'Online',
    lastSeen: '2024-01-15 10:25 AM',
    bandwidth: '25 Mbps',
  },
  {
    id: '3',
    name: 'Smart TV',
    ipAddress: '192.168.1.102',
    macAddress: '00:1B:44:11:3A:B9',
    deviceType: 'Entertainment',
    status: 'Offline',
    lastSeen: '2024-01-14 8:45 PM',
    bandwidth: '15 Mbps',
  },
  {
    id: '4',
    name: 'Router',
    ipAddress: '192.168.1.1',
    macAddress: '00:1B:44:11:3A:BA',
    deviceType: 'Network',
    status: 'Online',
    lastSeen: '2024-01-15 10:30 AM',
    bandwidth: '100 Mbps',
  },
  {
    id: '5',
    name: 'Gaming Console',
    ipAddress: '192.168.1.103',
    macAddress: '00:1B:44:11:3A:BB',
    deviceType: 'Gaming',
    status: 'Online',
    lastSeen: '2024-01-15 9:15 AM',
    bandwidth: '45 Mbps',
  },
  {
    id: '6',
    name: 'Smart Speaker',
    ipAddress: '192.168.1.104',
    macAddress: '00:1B:44:11:3A:BC',
    deviceType: 'IoT',
    status: 'Online',
    lastSeen: '2024-01-15 10:20 AM',
    bandwidth: '5 Mbps',
  },
  {
    id: '7',
    name: 'Tablet',
    ipAddress: '192.168.1.105',
    macAddress: '00:1B:44:11:3A:BD',
    deviceType: 'Tablet',
    status: 'Offline',
    lastSeen: '2024-01-14 6:30 PM',
    bandwidth: '20 Mbps',
  },
  {
    id: '8',
    name: 'Security Camera',
    ipAddress: '192.168.1.106',
    macAddress: '00:1B:44:11:3A:BE',
    deviceType: 'Security',
    status: 'Online',
    lastSeen: '2024-01-15 10:30 AM',
    bandwidth: '8 Mbps',
  },
  {
    id: '9',
    name: 'Smart Thermostat',
    ipAddress: '192.168.1.107',
    macAddress: '00:1B:44:11:3A:BF',
    deviceType: 'IoT',
    status: 'Online',
    lastSeen: '2024-01-15 10:15 AM',
    bandwidth: '2 Mbps',
  },
  {
    id: '10',
    name: 'Print Server',
    ipAddress: '192.168.1.108',
    macAddress: '00:1B:44:11:3A:C0',
    deviceType: 'Printer',
    status: 'Online',
    lastSeen: '2024-01-15 8:45 AM',
    bandwidth: '10 Mbps',
  },
];

export function DevicesTable() {
  const [selectedItems, setSelectedItems] = useState<Device[]>([]);
  const [sortingColumn, setSortingColumn] = useState<string>('name');
  const [sortingDescending, setSortingDescending] = useState(false);

  const columnDefinitions = [

    {
      id: 'name',
      header: 'Device Name',
      cell: (item: Device) => item.name,
      sortingField: 'name',
      isRowHeader: true,
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
      id: 'deviceType',
      header: 'Device Type',
      cell: (item: Device) => item.deviceType,
      sortingField: 'deviceType',
    },
    {
      id: 'status',
      header: 'Status',
      cell: (item: Device) => item.status,
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

  const sortedItems = [...mockDevices].sort((a, b) => {
    const aValue = a[sortingColumn as keyof Device];
    const bValue = b[sortingColumn as keyof Device];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const comparison = aValue.localeCompare(bValue);
      return sortingDescending ? -comparison : comparison;
    }
    
    return 0;
  });

  return (
    <Table
      columnDefinitions={columnDefinitions}
      items={sortedItems}
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      sortingColumn={sortingColumn}
      sortingDescending={sortingDescending}
      onSortingChange={({ detail }) => {
        setSortingColumn(detail.sortingColumn.sortingField || 'name');
        setSortingDescending(detail.isDescending || false);
      }}
      selectionType="multi"
      ariaLabels={{
        selectionGroupLabel: 'Devices selection',
        allItemsSelectionLabel: ({ selectedItems }) =>
          `${selectedItems.length} ${selectedItems.length === 1 ? 'device' : 'devices'} selected`,
        itemSelectionLabel: ({ selectedItems }, item) => {
          const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
          return `${item.name} is ${isItemSelected ? '' : 'not '}selected`;
        },
      }}
      trackBy="id"
      empty="No devices found"
      variant="container"
    />
  );
}
