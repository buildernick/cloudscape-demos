// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useMemo } from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Table from '@cloudscape-design/components/table';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import TextFilter from '@cloudscape-design/components/text-filter';
import Badge from '@cloudscape-design/components/badge';

// Demo device data
const deviceData = [
  {
    id: 'device-1',
    name: 'Office Router',
    type: 'Router',
    status: 'Online',
    location: 'Main Office',
    usage: '15.2 GB',
    performance: '98%',
    lastSeen: '2 mins ago',
  },
  {
    id: 'device-2',
    name: 'Server-01',
    type: 'Server',
    status: 'Online',
    location: 'Data Center',
    usage: '145.8 GB',
    performance: '95%',
    lastSeen: '1 min ago',
  },
  {
    id: 'device-3',
    name: 'Laptop-Marketing',
    type: 'Laptop',
    status: 'Offline',
    location: 'Marketing Dept',
    usage: '8.4 GB',
    performance: '0%',
    lastSeen: '2 hours ago',
  },
  {
    id: 'device-4',
    name: 'Switch-Floor2',
    type: 'Switch',
    status: 'Online',
    location: 'Floor 2',
    usage: '32.1 GB',
    performance: '92%',
    lastSeen: '1 min ago',
  },
  {
    id: 'device-5',
    name: 'Printer-Office',
    type: 'Printer',
    status: 'Online',
    location: 'Main Office',
    usage: '0.2 GB',
    performance: '100%',
    lastSeen: '5 mins ago',
  },
  {
    id: 'device-6',
    name: 'Security-Camera-01',
    type: 'Camera',
    status: 'Online',
    location: 'Entrance',
    usage: '22.3 GB',
    performance: '89%',
    lastSeen: '30 secs ago',
  },
  {
    id: 'device-7',
    name: 'Workstation-Dev',
    type: 'Desktop',
    status: 'Online',
    location: 'Development',
    usage: '67.9 GB',
    performance: '94%',
    lastSeen: '1 min ago',
  },
  {
    id: 'device-8',
    name: 'Access-Point-03',
    type: 'Access Point',
    status: 'Warning',
    location: 'Conference Room',
    usage: '12.7 GB',
    performance: '78%',
    lastSeen: '3 mins ago',
  },
  {
    id: 'device-9',
    name: 'NAS-Storage',
    type: 'Storage',
    status: 'Online',
    location: 'Server Room',
    usage: '234.5 GB',
    performance: '96%',
    lastSeen: '1 min ago',
  },
  {
    id: 'device-10',
    name: 'Phone-Reception',
    type: 'VoIP Phone',
    status: 'Online',
    location: 'Reception',
    usage: '1.8 GB',
    performance: '100%',
    lastSeen: '2 mins ago',
  },
  {
    id: 'device-11',
    name: 'Tablet-Sales',
    type: 'Tablet',
    status: 'Offline',
    location: 'Sales Dept',
    usage: '4.2 GB',
    performance: '0%',
    lastSeen: '1 day ago',
  },
  {
    id: 'device-12',
    name: 'Firewall-Main',
    type: 'Firewall',
    status: 'Online',
    location: 'Network Edge',
    usage: '89.3 GB',
    performance: '97%',
    lastSeen: '30 secs ago',
  },
];

export function DevicesTable() {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [filteringText, setFilteringText] = useState('');

  const filteredItems = useMemo(() => {
    if (!filteringText.trim()) {
      return deviceData;
    }
    const searchText = filteringText.toLowerCase();
    return deviceData.filter(
      item =>
        item.name.toLowerCase().includes(searchText) ||
        item.type.toLowerCase().includes(searchText) ||
        item.status.toLowerCase().includes(searchText) ||
        item.location.toLowerCase().includes(searchText),
    );
  }, [filteringText]);

  const getStatusBadgeType = (status: string) => {
    switch (status.toLowerCase()) {
      case 'online':
        return 'success';
      case 'offline':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  };

  const columnDefinitions = [
    {
      id: 'name',
      header: 'Device Name',
      cell: (item: any) => item.name,
      sortingField: 'name',
      isRowHeader: true,
    },
    {
      id: 'type',
      header: 'Device Type',
      cell: (item: any) => item.type,
      sortingField: 'type',
    },
    {
      id: 'status',
      header: 'Status',
      cell: (item: any) => <Badge color={getStatusBadgeType(item.status)}>{item.status}</Badge>,
      sortingField: 'status',
    },
    {
      id: 'location',
      header: 'Location',
      cell: (item: any) => item.location,
      sortingField: 'location',
    },
    {
      id: 'usage',
      header: 'Data Usage',
      cell: (item: any) => item.usage,
      sortingField: 'usage',
    },
    {
      id: 'performance',
      header: 'Performance',
      cell: (item: any) => item.performance,
      sortingField: 'performance',
    },
    {
      id: 'lastSeen',
      header: 'Last Seen',
      cell: (item: any) => item.lastSeen,
      sortingField: 'lastSeen',
    },
  ];

  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Devices on your local network"
          actions={
            <Button variant="primary" iconName="add-plus">
              Add Device
            </Button>
          }
        >
          My Devices
        </Header>
      }
    >
      <SpaceBetween size="l">
        <TextFilter
          filteringText={filteringText}
          filteringPlaceholder="Find devices by name, type, location..."
          filteringAriaLabel="Filter devices"
          countText={`${filteredItems.length} ${filteredItems.length === 1 ? 'match' : 'matches'}`}
          onChange={({ detail }) => setFilteringText(detail.filteringText)}
        />
        <Table
          columnDefinitions={columnDefinitions}
          items={filteredItems}
          loadingText="Loading devices"
          selectionType="multi"
          trackBy="id"
          sortingDisabled={false}
          empty={
            <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
              <SpaceBetween size="m">
                <b>No devices found</b>
                <Button>Add Device</Button>
              </SpaceBetween>
            </Box>
          }
          filter={
            <TextFilter
              filteringText={filteringText}
              filteringPlaceholder="Find devices"
              filteringAriaLabel="Filter devices"
              countText={`${filteredItems.length} ${filteredItems.length === 1 ? 'match' : 'matches'}`}
              onChange={({ detail }) => setFilteringText(detail.filteringText)}
            />
          }
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
          header={
            <Header
              counter={
                selectedItems.length ? `(${selectedItems.length}/${filteredItems.length})` : `(${filteredItems.length})`
              }
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Button disabled={selectedItems.length === 0}>Configure</Button>
                  <Button disabled={selectedItems.length === 0}>Remove</Button>
                  <Button variant="primary" iconName="add-plus">
                    Add Device
                  </Button>
                </SpaceBetween>
              }
            >
              Devices
            </Header>
          }
        />
      </SpaceBetween>
    </Container>
  );
}
