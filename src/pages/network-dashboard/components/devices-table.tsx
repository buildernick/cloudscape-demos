// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Table from '@cloudscape-design/components/table';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Badge from '@cloudscape-design/components/badge';

// Sample device data
const deviceData = [
  {
    id: '1',
    deviceName: 'MacBook-Pro-15',
    ipAddress: '192.168.1.10',
    macAddress: '00:1B:44:11:3A:B7',
    deviceType: 'Laptop',
    status: 'Online',
    bandwidth: '125 Mbps',
    lastSeen: '2 mins ago',
  },
  {
    id: '2',
    deviceName: 'Gaming-Desktop',
    ipAddress: '192.168.1.11',
    macAddress: '00:1B:44:11:3A:B8',
    deviceType: 'Desktop',
    status: 'Online',
    bandwidth: '250 Mbps',
    lastSeen: '5 mins ago',
  },
  {
    id: '3',
    deviceName: 'iPhone-13-Pro',
    ipAddress: '192.168.1.12',
    macAddress: '00:1B:44:11:3A:B9',
    deviceType: 'Mobile',
    status: 'Online',
    bandwidth: '85 Mbps',
    lastSeen: '1 min ago',
  },
  {
    id: '4',
    deviceName: 'Samsung-TV-65',
    ipAddress: '192.168.1.13',
    macAddress: '00:1B:44:11:3A:C0',
    deviceType: 'Smart TV',
    status: 'Offline',
    bandwidth: '45 Mbps',
    lastSeen: '2 hours ago',
  },
  {
    id: '5',
    deviceName: 'iPad-Air',
    ipAddress: '192.168.1.14',
    macAddress: '00:1B:44:11:3A:C1',
    deviceType: 'Tablet',
    status: 'Online',
    bandwidth: '95 Mbps',
    lastSeen: '30 secs ago',
  },
  {
    id: '6',
    deviceName: 'Nest-Hub-Max',
    ipAddress: '192.168.1.15',
    macAddress: '00:1B:44:11:3A:C2',
    deviceType: 'Smart Display',
    status: 'Online',
    bandwidth: '35 Mbps',
    lastSeen: '10 mins ago',
  },
  {
    id: '7',
    deviceName: 'Ring-Doorbell',
    ipAddress: '192.168.1.16',
    macAddress: '00:1B:44:11:3A:C3',
    deviceType: 'IoT Device',
    status: 'Online',
    bandwidth: '15 Mbps',
    lastSeen: '1 min ago',
  },
  {
    id: '8',
    deviceName: 'PlayStation-5',
    ipAddress: '192.168.1.17',
    macAddress: '00:1B:44:11:3A:C4',
    deviceType: 'Gaming Console',
    status: 'Offline',
    bandwidth: '180 Mbps',
    lastSeen: '5 hours ago',
  },
  {
    id: '9',
    deviceName: 'Work-Laptop',
    ipAddress: '192.168.1.18',
    macAddress: '00:1B:44:11:3A:C5',
    deviceType: 'Laptop',
    status: 'Online',
    bandwidth: '140 Mbps',
    lastSeen: '3 mins ago',
  },
  {
    id: '10',
    deviceName: 'Alexa-Echo-Dot',
    ipAddress: '192.168.1.19',
    macAddress: '00:1B:44:11:3A:C6',
    deviceType: 'Smart Speaker',
    status: 'Online',
    bandwidth: '12 Mbps',
    lastSeen: '8 mins ago',
  },
  {
    id: '11',
    deviceName: 'Printer-HP',
    ipAddress: '192.168.1.20',
    macAddress: '00:1B:44:11:3A:C7',
    deviceType: 'Printer',
    status: 'Offline',
    bandwidth: '5 Mbps',
    lastSeen: '1 day ago',
  },
  {
    id: '12',
    deviceName: 'Security-Camera-1',
    ipAddress: '192.168.1.21',
    macAddress: '00:1B:44:11:3A:C8',
    deviceType: 'Security Camera',
    status: 'Online',
    bandwidth: '22 Mbps',
    lastSeen: '5 mins ago',
  },
];

const columnDefinitions = [
  {
    id: 'deviceName',
    header: 'Device Name',
    cell: (item: (typeof deviceData)[0]) => item.deviceName,
    sortingField: 'deviceName',
    isRowHeader: true,
    width: 180,
  },
  {
    id: 'ipAddress',
    header: 'IP Address',
    cell: (item: (typeof deviceData)[0]) => item.ipAddress,
    sortingField: 'ipAddress',
    width: 140,
  },
  {
    id: 'macAddress',
    header: 'MAC Address',
    cell: (item: (typeof deviceData)[0]) => item.macAddress,
    sortingField: 'macAddress',
    width: 160,
  },
  {
    id: 'deviceType',
    header: 'Device Type',
    cell: (item: (typeof deviceData)[0]) => item.deviceType,
    sortingField: 'deviceType',
    width: 140,
  },
  {
    id: 'status',
    header: 'Status',
    cell: (item: (typeof deviceData)[0]) => (
      <Badge color={item.status === 'Online' ? 'green' : 'grey'}>{item.status}</Badge>
    ),
    sortingField: 'status',
    width: 100,
  },
  {
    id: 'bandwidth',
    header: 'Bandwidth',
    cell: (item: (typeof deviceData)[0]) => item.bandwidth,
    sortingField: 'bandwidth',
    width: 120,
  },
  {
    id: 'lastSeen',
    header: 'Last Seen',
    cell: (item: (typeof deviceData)[0]) => item.lastSeen,
    sortingField: 'lastSeen',
    width: 120,
  },
];

export function DevicesTable() {
  const [selectedItems, setSelectedItems] = useState<typeof deviceData>([]);
  const [sortingColumn, setSortingColumn] = useState<(typeof columnDefinitions)[0]>(columnDefinitions[0]);
  const [sortingDescending, setSortingDescending] = useState(false);

  return (
    <Table
      columnDefinitions={columnDefinitions}
      items={deviceData}
      loadingText="Loading devices"
      selectionType="multi"
      trackBy="id"
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      sortingColumn={sortingColumn}
      sortingDescending={sortingDescending}
      onSortingChange={({ detail }) => {
        setSortingColumn(detail.sortingColumn);
        setSortingDescending(detail.isDescending ?? false);
      }}
      ariaLabels={{
        selectionGroupLabel: 'Items selection',
        allItemsSelectionLabel: ({ selectedItems }) =>
          `${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`,
        itemSelectionLabel: ({ selectedItems }, item) => {
          const isSelected = selectedItems.includes(item);
          return `${item.deviceName} is ${isSelected ? '' : 'not '}selected`;
        },
      }}
      renderAriaLive={({ firstIndex, lastIndex, totalItemsCount }) =>
        `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
      }
      variant="full-page"
      stickyHeader
      resizableColumns
      header={
        <Header
          counter={
            selectedItems.length > 0 ? `(${selectedItems.length}/${deviceData.length})` : `(${deviceData.length})`
          }
          description="Devices on your local network"
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
        <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No devices</b>
            <Button>Add device</Button>
          </SpaceBetween>
        </Box>
      }
    />
  );
}
