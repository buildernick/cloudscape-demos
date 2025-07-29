// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useEffect } from 'react';

import Table from '@cloudscape-design/components/table';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Badge from '@cloudscape-design/components/badge';

interface Device {
  id: string;
  deviceName: string;
  owner: string;
  ipAddress: string;
  macAddress: string;
  deviceType: string;
  status: 'online' | 'offline' | 'idle';
  lastSeen: string;
}

const deviceTypes = ['Laptop', 'Desktop', 'Smartphone', 'Tablet', 'Router', 'Printer', 'Smart TV'];
const statuses: ('online' | 'offline' | 'idle')[] = ['online', 'offline', 'idle'];

// Generate random IP and MAC addresses
const generateIpAddress = () => {
  return `192.168.1.${Math.floor(Math.random() * 254) + 1}`;
};

const generateMacAddress = () => {
  const hex = '0123456789ABCDEF';
  let mac = '';
  for (let i = 0; i < 6; i++) {
    if (i > 0) mac += ':';
    mac += hex[Math.floor(Math.random() * 16)] + hex[Math.floor(Math.random() * 16)];
  }
  return mac;
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const columnDefinitions = [
  {
    id: 'deviceName',
    header: 'Device Name',
    cell: (item: Device) => item.deviceName,
    sortingField: 'deviceName',
  },
  {
    id: 'owner',
    header: 'Owner',
    cell: (item: Device) => item.owner,
    sortingField: 'owner',
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
    cell: (item: Device) => (
      <Badge color={item.status === 'online' ? 'green' : item.status === 'offline' ? 'red' : 'grey'}>
        {item.status}
      </Badge>
    ),
    sortingField: 'status',
  },
  {
    id: 'lastSeen',
    header: 'Last Seen',
    cell: (item: Device) => item.lastSeen,
    sortingField: 'lastSeen',
  },
];

export function DevicesTable() {
  const [selectedItems, setSelectedItems] = useState<Device[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDevices = async () => {
    setLoading(true);
    try {
      // Fetch random users from the API
      const response = await fetch('https://randomuser.me/api/?results=14');
      const data = await response.json();

      // Transform the user data into device data
      const deviceData: Device[] = data.results.map((user: any, index: number) => {
        const firstName = user.name.first;
        const lastName = user.name.last;
        const deviceType = deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const lastSeenDate = new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)); // Random date within last week

        return {
          id: `device-${index + 1}`,
          deviceName: `${firstName}'s ${deviceType}`,
          owner: `${firstName} ${lastName}`,
          ipAddress: generateIpAddress(),
          macAddress: generateMacAddress(),
          deviceType,
          status,
          lastSeen: formatDate(lastSeenDate),
        };
      });

      setDevices(deviceData);
    } catch (error) {
      console.error('Failed to fetch devices:', error);
      // Fallback to empty array if API fails
      setDevices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <Table
      columnDefinitions={columnDefinitions}
      items={devices}
      loading={loading}
      selectionType="multi"
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      ariaLabels={{
        selectionGroupLabel: 'Items selection',
        allItemsSelectionLabel: ({ selectedItems }) =>
          `${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`,
        itemSelectionLabel: ({ selectedItems }, item) => {
          const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
          return `${item.deviceName} is ${isItemSelected ? '' : 'not '}selected`;
        },
      }}
      header={
        <Header
          variant="h2"
          description="Devices on your local network"
          counter={devices.length > 0 ? `(${devices.length})` : undefined}
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="primary" iconAlign="right" iconName="external">
                Add Device
              </Button>
            </SpaceBetween>
          }
        >
          My Devices
        </Header>
      }
      empty={
        <Box textAlign="center" color="inherit">
          <Box variant="strong" textAlign="center" color="inherit">
            No devices
          </Box>
          <Box variant="p" padding={{ bottom: 's' }} color="inherit">
            No devices to display.
          </Box>
        </Box>
      }
      loadingText="Loading devices..."
      variant="full-page"
    />
  );
}
