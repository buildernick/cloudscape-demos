// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Table from '@cloudscape-design/components/table';
import Button from '@cloudscape-design/components/button';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';

interface Device {
  id: string;
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
  col6: string;
  col7: string;
}

export function DevicesTable() {
  const [selectedItems, setSelectedItems] = useState<Device[]>([]);

  // Sample data for the table
  const items: Device[] = Array.from({ length: 13 }, (_, index) => ({
    id: `device-${index + 1}`,
    col1: 'Cell Value',
    col2: 'Cell Value',
    col3: 'Cell Value',
    col4: 'Cell Value',
    col5: 'Cell Value',
    col6: 'Cell Value',
    col7: 'Cell Value',
  }));

  const columnDefinitions = [
    {
      id: 'col1',
      header: 'Column header',
      cell: (item: Device) => item.col1,
      sortingField: 'col1',
    },
    {
      id: 'col2',
      header: 'Column header',
      cell: (item: Device) => item.col2,
      sortingField: 'col2',
    },
    {
      id: 'col3',
      header: 'Column header',
      cell: (item: Device) => item.col3,
      sortingField: 'col3',
    },
    {
      id: 'col4',
      header: 'Column header',
      cell: (item: Device) => item.col4,
      sortingField: 'col4',
    },
    {
      id: 'col5',
      header: 'Column header',
      cell: (item: Device) => item.col5,
      sortingField: 'col5',
    },
    {
      id: 'col6',
      header: 'Column header',
      cell: (item: Device) => item.col6,
      sortingField: 'col6',
    },
    {
      id: 'col7',
      header: 'Column header',
      cell: (item: Device) => item.col7,
      sortingField: 'col7',
    },
  ];

  return (
    <Container
      header={
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
      }
    >
      <Table
        columnDefinitions={columnDefinitions}
        items={items}
        selectionType="multi"
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
        ariaLabels={{
          selectionGroupLabel: 'Items selection',
          allItemsSelectionLabel: ({ selectedItems }) =>
            `${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`,
          itemSelectionLabel: ({ selectedItems }, item) => {
            const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
            return `${item.col1} is ${isItemSelected ? '' : 'not '}selected`;
          },
        }}
        trackBy="id"
        empty={
          <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No devices</b>
              <Button>Add device</Button>
            </SpaceBetween>
          </Box>
        }
        loadingText="Loading devices"
        stickyHeader
      />
    </Container>
  );
}
