// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';

// Sample device data matching the design
const devicesData = [
  {
    id: 1,
    name: 'Device-001',
    type: 'Router',
    status: 'Active',
    ipAddress: '192.168.1.1',
    location: 'Building A - Floor 1',
    lastSeen: '2024-01-15 14:30:00',
    bandwidth: '1 Gbps',
  },
  {
    id: 2,
    name: 'Device-002',
    type: 'Switch',
    status: 'Active',
    ipAddress: '192.168.1.2',
    location: 'Building A - Floor 2',
    lastSeen: '2024-01-15 14:25:00',
    bandwidth: '10 Gbps',
  },
  {
    id: 3,
    name: 'Device-003',
    type: 'Access Point',
    status: 'Inactive',
    ipAddress: '192.168.1.3',
    location: 'Building B - Floor 1',
    lastSeen: '2024-01-15 12:15:00',
    bandwidth: '500 Mbps',
  },
  {
    id: 4,
    name: 'Device-004',
    type: 'Firewall',
    status: 'Active',
    ipAddress: '192.168.1.4',
    location: 'Data Center',
    lastSeen: '2024-01-15 14:35:00',
    bandwidth: '5 Gbps',
  },
  {
    id: 5,
    name: 'Device-005',
    type: 'Router',
    status: 'Maintenance',
    ipAddress: '192.168.1.5',
    location: 'Building C - Floor 3',
    lastSeen: '2024-01-15 10:00:00',
    bandwidth: '2 Gbps',
  },
  {
    id: 6,
    name: 'Device-006',
    type: 'Switch',
    status: 'Active',
    ipAddress: '192.168.1.6',
    location: 'Building A - Floor 3',
    lastSeen: '2024-01-15 14:20:00',
    bandwidth: '10 Gbps',
  },
  {
    id: 7,
    name: 'Device-007',
    type: 'Access Point',
    status: 'Active',
    ipAddress: '192.168.1.7',
    location: 'Building B - Floor 2',
    lastSeen: '2024-01-15 14:10:00',
    bandwidth: '500 Mbps',
  },
  {
    id: 8,
    name: 'Device-008',
    type: 'Load Balancer',
    status: 'Active',
    ipAddress: '192.168.1.8',
    location: 'Data Center',
    lastSeen: '2024-01-15 14:30:00',
    bandwidth: '20 Gbps',
  },
];

export function DevicesTable() {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <SpaceBetween size="l">
      <Header
        variant="h2"
        description="Devices on your local network"
        actions={
          <Button variant="primary" iconAlign="right" iconName="add-plus">
            Add Device
          </Button>
        }
      >
        My Devices
      </Header>

      <Table
        columnDefinitions={[
          {
            id: 'name',
            header: 'Device Name',
            cell: item => item.name,
            sortingField: 'name',
          },
          {
            id: 'type',
            header: 'Type',
            cell: item => item.type,
            sortingField: 'type',
          },
          {
            id: 'status',
            header: 'Status',
            cell: item => item.status,
            sortingField: 'status',
          },
          {
            id: 'ipAddress',
            header: 'IP Address',
            cell: item => item.ipAddress,
            sortingField: 'ipAddress',
          },
          {
            id: 'location',
            header: 'Location',
            cell: item => item.location,
            sortingField: 'location',
          },
          {
            id: 'lastSeen',
            header: 'Last Seen',
            cell: item => item.lastSeen,
            sortingField: 'lastSeen',
          },
          {
            id: 'bandwidth',
            header: 'Bandwidth',
            cell: item => item.bandwidth,
            sortingField: 'bandwidth',
          },
        ]}
        items={devicesData}
        loadingText="Loading devices"
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
        selectionType="multi"
        trackBy="id"
        empty={
          <Box textAlign="center" color="inherit" margin={{ top: 'xxl', bottom: 'xxl' }}>
            <Box variant="strong" textAlign="center" color="inherit">
              No devices
            </Box>
            <Box variant="p" textAlign="center" color="inherit" padding={{ bottom: 's' }}>
              No devices to display.
            </Box>
            <Button>Add device</Button>
          </Box>
        }
        header={
          <Header
            counter={selectedItems.length ? `(${selectedItems.length}/${devicesData.length})` : `(${devicesData.length})`}
          >
            Devices
          </Header>
        }
        pagination={{
          currentPageIndex: 1,
          pagesCount: Math.ceil(devicesData.length / 10),
          onChange: () => {},
        }}
        sortingDisabled={false}
        variant="full-page"
      />
    </SpaceBetween>
  );
}
