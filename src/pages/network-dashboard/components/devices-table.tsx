// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Table from '@cloudscape-design/components/table';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';

// Sample device data
const sampleDevices = Array.from({ length: 12 }, (_, index) => ({
  id: `device-${index + 1}`,
  name: `Cell Value`,
  type: `Cell Value`,
  status: `Cell Value`,
  location: `Cell Value`,
  usage: `Cell Value`,
  performance: `Cell Value`,
  lastSeen: `Cell Value`,
}));

export function DevicesTable() {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const columnDefinitions = [
    {
      id: 'name',
      header: 'Column header',
      cell: (item: any) => item.name,
      sortingField: 'name',
      isRowHeader: true,
    },
    {
      id: 'type',
      header: 'Column header',
      cell: (item: any) => item.type,
      sortingField: 'type',
    },
    {
      id: 'status',
      header: 'Column header',
      cell: (item: any) => item.status,
      sortingField: 'status',
    },
    {
      id: 'location',
      header: 'Column header',
      cell: (item: any) => item.location,
      sortingField: 'location',
    },
    {
      id: 'usage',
      header: 'Column header',
      cell: (item: any) => item.usage,
      sortingField: 'usage',
    },
    {
      id: 'performance',
      header: 'Column header',
      cell: (item: any) => item.performance,
      sortingField: 'performance',
    },
    {
      id: 'lastSeen',
      header: 'Column header',
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
      <Table
        columnDefinitions={columnDefinitions}
        items={sampleDevices}
        loadingText="Loading devices"
        selectionType="multi"
        trackBy="id"
        empty={
          <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No devices</b>
              <Button>Add Device</Button>
            </SpaceBetween>
          </Box>
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
              selectedItems.length ? `(${selectedItems.length}/${sampleDevices.length})` : `(${sampleDevices.length})`
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
    </Container>
  );
}
