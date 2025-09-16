// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Header from '@cloudscape-design/components/header';
import Table from '@cloudscape-design/components/table';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Checkbox from '@cloudscape-design/components/checkbox';

import { WidgetConfig } from '../interfaces';

// Sample device data for the table
const deviceData = [
  { 
    id: '1', 
    name: 'Device-001', 
    type: 'Router', 
    status: 'Active', 
    ipAddress: '192.168.1.1',
    location: 'Building A',
    uptime: '99.9%',
    lastSeen: '2 minutes ago'
  },
  { 
    id: '2', 
    name: 'Device-002', 
    type: 'Switch', 
    status: 'Active', 
    ipAddress: '192.168.1.2',
    location: 'Building A',
    uptime: '98.5%',
    lastSeen: '5 minutes ago'
  },
  { 
    id: '3', 
    name: 'Device-003', 
    type: 'Access Point', 
    status: 'Inactive', 
    ipAddress: '192.168.1.3',
    location: 'Building B',
    uptime: '95.2%',
    lastSeen: '1 hour ago'
  },
  { 
    id: '4', 
    name: 'Device-004', 
    type: 'Router', 
    status: 'Active', 
    ipAddress: '192.168.1.4',
    location: 'Building B',
    uptime: '99.1%',
    lastSeen: '1 minute ago'
  },
  { 
    id: '5', 
    name: 'Device-005', 
    type: 'Switch', 
    status: 'Active', 
    ipAddress: '192.168.1.5',
    location: 'Building C',
    uptime: '97.8%',
    lastSeen: '3 minutes ago'
  },
  { 
    id: '6', 
    name: 'Device-006', 
    type: 'Access Point', 
    status: 'Maintenance', 
    ipAddress: '192.168.1.6',
    location: 'Building C',
    uptime: '88.3%',
    lastSeen: '2 hours ago'
  },
];

function MyDevicesHeader() {
  return (
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
  );
}

function MyDevicesContent() {
  const [selectedItems, setSelectedItems] = useState([]);

  const columnDefinitions = [
    {
      id: 'name',
      header: 'Device Name',
      cell: (item: any) => item.name,
      sortingField: 'name',
    },
    {
      id: 'type',
      header: 'Type',
      cell: (item: any) => item.type,
      sortingField: 'type',
    },
    {
      id: 'status',
      header: 'Status',
      cell: (item: any) => item.status,
      sortingField: 'status',
    },
    {
      id: 'ipAddress',
      header: 'IP Address',
      cell: (item: any) => item.ipAddress,
      sortingField: 'ipAddress',
    },
    {
      id: 'location',
      header: 'Location',
      cell: (item: any) => item.location,
      sortingField: 'location',
    },
    {
      id: 'uptime',
      header: 'Uptime',
      cell: (item: any) => item.uptime,
      sortingField: 'uptime',
    },
    {
      id: 'lastSeen',
      header: 'Last Seen',
      cell: (item: any) => item.lastSeen,
      sortingField: 'lastSeen',
    },
  ];

  return (
    <Table
      columnDefinitions={columnDefinitions}
      items={deviceData}
      loadingText="Loading devices"
      selectionType="multi"
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      ariaLabels={{
        selectionGroupLabel: 'Items selection',
        allItemsSelectionLabel: ({ selectedItems }) =>
          `${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`,
        itemSelectionLabel: ({ selectedItems }, item) => {
          const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
          return `${item.name} is ${isItemSelected ? '' : 'not'} selected`;
        },
      }}
      trackBy="id"
      empty={
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <b>No devices found</b>
          <div>No devices are currently registered on your network.</div>
        </div>
      }
      header={
        <Header
          counter={`(${deviceData.length})`}
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button disabled={selectedItems.length === 0}>Remove</Button>
              <Button disabled={selectedItems.length === 0}>Configure</Button>
            </SpaceBetween>
          }
        >
          Network Devices
        </Header>
      }
    />
  );
}

export const myDevicesTable: WidgetConfig = {
  definition: { defaultRowSpan: 6, defaultColumnSpan: 4, minRowSpan: 4 },
  data: {
    icon: 'table',
    title: 'My Devices',
    description: 'Manage and monitor network devices',
    header: MyDevicesHeader,
    content: MyDevicesContent,
    staticMinHeight: 500,
    disableContentPaddings: true,
  },
};
