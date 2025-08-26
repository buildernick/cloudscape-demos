// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Table from '@cloudscape-design/components/table';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';

// Sample device data
const generateDeviceData = () => {
  const devices = [];
  for (let i = 1; i <= 15; i++) {
    devices.push({
      id: `device-${i}`,
      name: 'Cell Value',
      status: 'Cell Value',
      type: 'Cell Value',
      network: 'Cell Value',
      ip: 'Cell Value',
      location: 'Cell Value',
      lastSeen: 'Cell Value',
    });
  }
  return devices;
};

const deviceData = generateDeviceData();

const columnDefinitions = [
  {
    id: 'name',
    header: 'Column header',
    cell: (item: any) => item.name,
    sortingField: 'name',
    isRowHeader: true,
  },
  {
    id: 'status',
    header: 'Column header',
    cell: (item: any) => item.status,
    sortingField: 'status',
  },
  {
    id: 'type',
    header: 'Column header',
    cell: (item: any) => item.type,
    sortingField: 'type',
  },
  {
    id: 'network',
    header: 'Column header',
    cell: (item: any) => item.network,
    sortingField: 'network',
  },
  {
    id: 'ip',
    header: 'Column header',
    cell: (item: any) => item.ip,
    sortingField: 'ip',
  },
  {
    id: 'location',
    header: 'Column header',
    cell: (item: any) => item.location,
    sortingField: 'location',
  },
  {
    id: 'lastSeen',
    header: 'Column header',
    cell: (item: any) => item.lastSeen,
    sortingField: 'lastSeen',
  },
];

export function DevicesTable() {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [sortingColumn, setSortingColumn] = useState<any>({ sortingField: 'name' });
  const [isDescending, setIsDescending] = useState(false);

  return (
    <Container>
      <SpaceBetween size="l">
        <Header
          variant="h2"
          description="Devices on your local network"
          actions={
            <Button variant="primary" iconName="external" iconAlign="right">
              Add Device
            </Button>
          }
        >
          My Devices
        </Header>
        
        <Table
          columnDefinitions={columnDefinitions}
          items={deviceData}
          loadingText="Loading devices"
          trackBy="id"
          empty={
            <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
              <SpaceBetween size="xxs">
                <div>
                  <b>No devices</b>
                  <Box variant="p" color="inherit">
                    No devices found.
                  </Box>
                </div>
              </SpaceBetween>
            </Box>
          }
          selectionType="multi"
          selectedItems={selectedItems}
          onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
          sortingColumn={sortingColumn}
          sortingDescending={isDescending}
          onSortingChange={({ detail }) => {
            setSortingColumn(detail.sortingColumn);
            setIsDescending(detail.isDescending);
          }}
          header={
            <Header counter={`(${deviceData.length})`}>
              Devices
            </Header>
          }
          preferences={
            <div />
          }
        />
      </SpaceBetween>
    </Container>
  );
}
