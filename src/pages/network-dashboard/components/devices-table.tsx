// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useEffect } from 'react';

import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import Spinner from '@cloudscape-design/components/spinner';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

interface UserDevice {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  gender: string;
  nationality: string;
  registeredDate: string;
  picture: string;
}

const generateRandomDeviceType = () => {
  const deviceTypes = ['Laptop', 'Desktop', 'Mobile', 'Tablet', 'Router', 'Smart TV', 'IoT Device'];
  return deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
};

const generateRandomIPAddress = () => {
  return `192.168.1.${Math.floor(Math.random() * 254) + 1}`;
};

const generateRandomStatus = () => {
  const statuses = ['Online', 'Offline', 'Idle'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const columnDefinitions = [
  {
    id: 'selection',
    header: '',
    cell: () => <input type="checkbox" />,
    width: 40,
    minWidth: 40,
  },
  {
    id: 'name',
    header: 'Device Owner',
    cell: (item: UserDevice) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <img src={item.picture} alt={item.name} width="32" height="32" style={{ borderRadius: '16px' }} />
        <span>{item.name}</span>
      </div>
    ),
    sortingField: 'name',
    minWidth: 180,
  },
  {
    id: 'email',
    header: 'Email',
    cell: (item: UserDevice) => item.email,
    sortingField: 'email',
    minWidth: 200,
  },
  {
    id: 'phone',
    header: 'Phone',
    cell: (item: UserDevice) => item.phone,
    sortingField: 'phone',
    minWidth: 140,
  },
  {
    id: 'deviceType',
    header: 'Device Type',
    cell: (item: UserDevice) => generateRandomDeviceType(),
    minWidth: 120,
  },
  {
    id: 'ipAddress',
    header: 'IP Address',
    cell: (item: UserDevice) => generateRandomIPAddress(),
    minWidth: 120,
  },
  {
    id: 'location',
    header: 'Location',
    cell: (item: UserDevice) => item.location,
    sortingField: 'location',
    minWidth: 150,
  },
  {
    id: 'status',
    header: 'Status',
    cell: (item: UserDevice) => {
      const status = generateRandomStatus();
      const type = status === 'Online' ? 'success' : status === 'Offline' ? 'error' : 'warning';
      return <StatusIndicator type={type}>{status}</StatusIndicator>;
    },
    minWidth: 100,
  },
  {
    id: 'registered',
    header: 'Registered',
    cell: (item: UserDevice) => item.registeredDate,
    sortingField: 'registeredDate',
    minWidth: 120,
  },
];

export default function DevicesTable() {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const itemsPerPage = 10;

  const paginatedItems = deviceData.slice((currentPageIndex - 1) * itemsPerPage, currentPageIndex * itemsPerPage);

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
        items={paginatedItems}
        selectionType="multi"
        selectedItems={selectedItems}
        onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
        ariaLabels={{
          selectionGroupLabel: 'Device selection',
          selectAllLabel: 'Select all devices',
          itemSelectionLabel: ({ selectedItems }, item) => {
            const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
            return `${item.device} is ${isItemSelected ? 'selected' : 'not selected'}`;
          },
        }}
        pagination={
          <Pagination
            currentPageIndex={currentPageIndex}
            onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
            pagesCount={Math.ceil(deviceData.length / itemsPerPage)}
            ariaLabels={{
              nextPageLabel: 'Next page',
              previousPageLabel: 'Previous page',
              pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
            }}
          />
        }
        stickyHeader
        variant="embedded"
      />
    </Container>
  );
}
