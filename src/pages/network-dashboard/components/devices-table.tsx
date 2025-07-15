// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';

const deviceData = [
  {
    id: '1',
    device: 'Device Name',
    column1: 'Cell Value',
    column2: 'Cell Value',
    column3: 'Cell Value',
    column4: 'Cell Value',
    column5: 'Cell Value',
    column6: 'Cell Value',
    column7: 'Cell Value',
  },
  {
    id: '2',
    device: 'Device Name',
    column1: 'Cell Value',
    column2: 'Cell Value',
    column3: 'Cell Value',
    column4: 'Cell Value',
    column5: 'Cell Value',
    column6: 'Cell Value',
    column7: 'Cell Value',
  },
  {
    id: '3',
    device: 'Device Name',
    column1: 'Cell Value',
    column2: 'Cell Value',
    column3: 'Cell Value',
    column4: 'Cell Value',
    column5: 'Cell Value',
    column6: 'Cell Value',
    column7: 'Cell Value',
  },
  {
    id: '4',
    device: 'Device Name',
    column1: 'Cell Value',
    column2: 'Cell Value',
    column3: 'Cell Value',
    column4: 'Cell Value',
    column5: 'Cell Value',
    column6: 'Cell Value',
    column7: 'Cell Value',
  },
  {
    id: '5',
    device: 'Device Name',
    column1: 'Cell Value',
    column2: 'Cell Value',
    column3: 'Cell Value',
    column4: 'Cell Value',
    column5: 'Cell Value',
    column6: 'Cell Value',
    column7: 'Cell Value',
  },
  {
    id: '6',
    device: 'Device Name',
    column1: 'Cell Value',
    column2: 'Cell Value',
    column3: 'Cell Value',
    column4: 'Cell Value',
    column5: 'Cell Value',
    column6: 'Cell Value',
    column7: 'Cell Value',
  },
  {
    id: '7',
    device: 'Device Name',
    column1: 'Cell Value',
    column2: 'Cell Value',
    column3: 'Cell Value',
    column4: 'Cell Value',
    column5: 'Cell Value',
    column6: 'Cell Value',
    column7: 'Cell Value',
  },
  {
    id: '8',
    device: 'Device Name',
    column1: 'Cell Value',
    column2: 'Cell Value',
    column3: 'Cell Value',
    column4: 'Cell Value',
    column5: 'Cell Value',
    column6: 'Cell Value',
    column7: 'Cell Value',
  },
];

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
