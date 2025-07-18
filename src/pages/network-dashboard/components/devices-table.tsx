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
    id: 'device',
    header: 'Column header',
    cell: (item: any) => item.device,
    sortingField: 'device',
    minWidth: 120,
  },
  {
    id: 'column1',
    header: 'Column header',
    cell: (item: any) => item.column1,
    sortingField: 'column1',
    minWidth: 120,
  },
  {
    id: 'column2',
    header: 'Column header',
    cell: (item: any) => item.column2,
    sortingField: 'column2',
    minWidth: 120,
  },
  {
    id: 'column3',
    header: 'Column header',
    cell: (item: any) => item.column3,
    sortingField: 'column3',
    minWidth: 120,
  },
  {
    id: 'column4',
    header: 'Column header',
    cell: (item: any) => item.column4,
    sortingField: 'column4',
    minWidth: 120,
  },
  {
    id: 'column5',
    header: 'Column header',
    cell: (item: any) => item.column5,
    sortingField: 'column5',
    minWidth: 120,
  },
  {
    id: 'column6',
    header: 'Column header',
    cell: (item: any) => item.column6,
    sortingField: 'column6',
    minWidth: 120,
  },
  {
    id: 'column7',
    header: 'Column header',
    cell: (item: any) => item.column7,
    sortingField: 'column7',
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
