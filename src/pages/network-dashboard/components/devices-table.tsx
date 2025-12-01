// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Badge from '@cloudscape-design/components/badge';
import Table from '@cloudscape-design/components/table';
import SpaceBetween from '@cloudscape-design/components/space-between';

interface Device {
  id: string;
  name: string;
  ipAddress: string;
  macAddress: string;
  deviceType: string;
  status: 'Online' | 'Offline' | 'Connecting';
  lastSeen: string;
  dataUsage: string;
}

const mockDevices: Device[] = [
  {
    id: '1',
    name: 'MacBook Pro',
    ipAddress: '192.168.1.101',
    macAddress: '00:1B:44:11:3A:B7',
    deviceType: 'Laptop',
    status: 'Online',
    lastSeen: '2 minutes ago',
    dataUsage: '1.2 GB',
  },
  {
    id: '2',
    name: 'iPhone 14',
    ipAddress: '192.168.1.102',
    macAddress: '02:1A:11:FF:3C:B8',
    deviceType: 'Mobile',
    status: 'Online',
    lastSeen: '5 minutes ago',
    dataUsage: '450 MB',
  },
  {
    id: '3',
    name: 'Smart TV',
    ipAddress: '192.168.1.103',
    macAddress: '04:2C:22:AA:4D:C9',
    deviceType: 'Entertainment',
    status: 'Offline',
    lastSeen: '2 hours ago',
    dataUsage: '3.8 GB',
  },
  {
    id: '4',
    name: 'Echo Dot',
    ipAddress: '192.168.1.104',
    macAddress: '06:3D:33:BB:5E:DA',
    deviceType: 'Smart Speaker',
    status: 'Online',
    lastSeen: '1 minute ago',
    dataUsage: '125 MB',
  },
  {
    id: '5',
    name: 'Gaming Console',
    ipAddress: '192.168.1.105',
    macAddress: '08:4E:44:CC:6F:EB',
    deviceType: 'Gaming',
    status: 'Connecting',
    lastSeen: '10 minutes ago',
    dataUsage: '2.3 GB',
  },
  {
    id: '6',
    name: 'Printer',
    ipAddress: '192.168.1.106',
    macAddress: '0A:5F:55:DD:7G:FC',
    deviceType: 'Printer',
    status: 'Online',
    lastSeen: '30 minutes ago',
    dataUsage: '45 MB',
  },
  {
    id: '7',
    name: 'Tablet',
    ipAddress: '192.168.1.107',
    macAddress: '0C:6G:66:EE:8H:GD',
    deviceType: 'Tablet',
    status: 'Offline',
    lastSeen: '4 hours ago',
    dataUsage: '890 MB',
  },
  {
    id: '8',
    name: 'Smart Thermostat',
    ipAddress: '192.168.1.108',
    macAddress: '0E:7H:77:FF:9I:HE',
    deviceType: 'IoT Device',
    status: 'Online',
    lastSeen: '1 minute ago',
    dataUsage: '78 MB',
  },
  {
    id: '9',
    name: 'Security Camera',
    ipAddress: '192.168.1.109',
    macAddress: '10:8I:88:GG:AJ:IF',
    deviceType: 'Security',
    status: 'Online',
    lastSeen: '30 seconds ago',
    dataUsage: '1.8 GB',
  },
  {
    id: '10',
    name: 'Work Laptop',
    ipAddress: '192.168.1.110',
    macAddress: '12:9J:99:HH:BK:JG',
    deviceType: 'Laptop',
    status: 'Offline',
    lastSeen: '1 day ago',
    dataUsage: '2.1 GB',
  },
];

export function DevicesTable() {
  const [selectedItems, setSelectedItems] = useState<Device[]>([]);

  const getStatusBadge = (status: Device['status']) => {
    const colorMap = {
      Online: 'green',
      Offline: 'red',
      Connecting: 'blue',
    } as const;

    return <Badge color={colorMap[status]}>{status}</Badge>;
  };

  return (
    <Table
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      items={mockDevices}
      selectionType="multi"
      columnDefinitions={[
        {
          id: 'name',
          header: 'Device Name',
          cell: item => item.name,
          sortingField: 'name',
          isRowHeader: true,
        },
        {
          id: 'ipAddress',
          header: 'IP Address',
          cell: item => item.ipAddress,
          sortingField: 'ipAddress',
        },
        {
          id: 'macAddress',
          header: 'MAC Address',
          cell: item => item.macAddress,
          sortingField: 'macAddress',
        },
        {
          id: 'deviceType',
          header: 'Device Type',
          cell: item => item.deviceType,
          sortingField: 'deviceType',
        },
        {
          id: 'status',
          header: 'Status',
          cell: item => getStatusBadge(item.status),
          sortingField: 'status',
        },
        {
          id: 'lastSeen',
          header: 'Last Seen',
          cell: item => item.lastSeen,
          sortingField: 'lastSeen',
        },
        {
          id: 'dataUsage',
          header: 'Data Usage',
          cell: item => item.dataUsage,
          sortingField: 'dataUsage',
        },
      ]}
      variant="full-page"
      stickyHeader={true}
      stripedRows={true}
      resizableColumns={true}
      empty={
        <SpaceBetween size="m">
          <div style={{ textAlign: 'center' }}>
            <b>No devices found</b>
            <div>No devices are currently connected to your network.</div>
          </div>
        </SpaceBetween>
      }
    />
  );
}
