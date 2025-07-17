// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Alert from '@cloudscape-design/components/alert';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import Checkbox from '@cloudscape-design/components/checkbox';
import Link from '@cloudscape-design/components/link';
import Pagination from '@cloudscape-design/components/pagination';
import TextFilter from '@cloudscape-design/components/text-filter';

import { NetworkTrafficChart } from './charts/network-traffic-chart';
import { CreditUsageChart } from './charts/credit-usage-chart';

// Mock data for the device table
const deviceData = [
  {
    id: '1',
    name: 'Router-01',
    type: 'Router',
    status: 'Online',
    ipAddress: '192.168.1.1',
    lastSeen: '2 minutes ago',
    bandwidth: '1.2 Gbps',
  },
  {
    id: '2',
    name: 'Switch-Main',
    type: 'Switch',
    status: 'Online',
    ipAddress: '192.168.1.2',
    lastSeen: '1 minute ago',
    bandwidth: '850 Mbps',
  },
  {
    id: '3',
    name: 'AP-Office-1',
    type: 'Access Point',
    status: 'Warning',
    ipAddress: '192.168.1.101',
    lastSeen: '5 minutes ago',
    bandwidth: '320 Mbps',
  },
  {
    id: '4',
    name: 'Firewall-Edge',
    type: 'Firewall',
    status: 'Online',
    ipAddress: '192.168.1.254',
    lastSeen: '30 seconds ago',
    bandwidth: '2.1 Gbps',
  },
  {
    id: '5',
    name: 'Server-DB-01',
    type: 'Server',
    status: 'Offline',
    ipAddress: '192.168.1.10',
    lastSeen: '2 hours ago',
    bandwidth: 'N/A',
  },
];

const columnDefinitions = [
  {
    id: 'name',
    header: 'Device Name',
    cell: (item: any) => <Link href={`#/device/${item.id}`}>{item.name}</Link>,
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
    cell: (item: any) => (
      <Box
        color={
          item.status === 'Online'
            ? 'text-status-success'
            : item.status === 'Warning'
              ? 'text-status-warning'
              : 'text-status-error'
        }
      >
        {item.status}
      </Box>
    ),
    sortingField: 'status',
  },
  {
    id: 'ipAddress',
    header: 'IP Address',
    cell: (item: any) => item.ipAddress,
    sortingField: 'ipAddress',
  },
  {
    id: 'lastSeen',
    header: 'Last Seen',
    cell: (item: any) => item.lastSeen,
    sortingField: 'lastSeen',
  },
  {
    id: 'bandwidth',
    header: 'Bandwidth',
    cell: (item: any) => item.bandwidth,
    sortingField: 'bandwidth',
  },
];

export function Content() {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredItems, setFilteredItems] = useState(deviceData);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    if (value === '') {
      setFilteredItems(deviceData);
    } else {
      setFilteredItems(
        deviceData.filter(
          item =>
            item.name.toLowerCase().includes(value.toLowerCase()) ||
            item.type.toLowerCase().includes(value.toLowerCase()) ||
            item.status.toLowerCase().includes(value.toLowerCase()) ||
            item.ipAddress.includes(value),
        ),
      );
    }
    setCurrentPageIndex(1);
  };

  const itemsPerPage = 5;
  const startIndex = (currentPageIndex - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <SpaceBetween size="l">
      {/* Warning Banner */}
      <Alert type="warning" dismissible>
        High network traffic detected on Router-01. Consider load balancing to improve performance.
      </Alert>

      {/* Search Bar */}
      <Container>
        <Input
          onChange={({ detail }) => handleSearchChange(detail.value)}
          value={searchValue}
          type="search"
          placeholder="Search devices, IP addresses, or status..."
        />
      </Container>

      {/* Charts Section */}
      <ColumnLayout columns={2} variant="text-grid">
        <Container
          header={
            <Header variant="h2" description="Monitor real-time network traffic across sites">
              Network traffic
            </Header>
          }
        >
          <NetworkTrafficChart />
        </Container>

        <Container
          header={
            <Header variant="h2" description="Track credit consumption and performance goals">
              Credit Usage
            </Header>
          }
        >
          <CreditUsageChart />
        </Container>
      </ColumnLayout>

      {/* Device Management Section */}
      <Container
        header={
          <Header
            variant="h2"
            description="Devices on your local network"
            actions={<Button variant="primary">Add Device</Button>}
          >
            My Devices
          </Header>
        }
      >
        <SpaceBetween size="l">
          <TextFilter
            filteringText={searchValue}
            filteringPlaceholder="Find devices"
            filteringAriaLabel="Filter devices"
            onChange={({ detail }) => handleSearchChange(detail.filteringText)}
          />

          <Table
            columnDefinitions={columnDefinitions}
            items={currentItems}
            loadingText="Loading devices"
            selectionType="multi"
            trackBy="id"
            empty={
              <Box textAlign="center" color="inherit">
                <b>No devices</b>
                <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                  No devices found matching your search criteria.
                </Box>
                <Button>Add Device</Button>
              </Box>
            }
            selectedItems={selectedItems}
            onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
            header={
              <Header
                counter={
                  selectedItems.length
                    ? `(${selectedItems.length}/${filteredItems.length})`
                    : `(${filteredItems.length})`
                }
                actions={
                  <SpaceBetween direction="horizontal" size="xs">
                    <Button disabled={selectedItems.length === 0}>Edit</Button>
                    <Button disabled={selectedItems.length === 0}>Delete</Button>
                  </SpaceBetween>
                }
              >
                Devices
              </Header>
            }
            pagination={
              <Pagination
                currentPageIndex={currentPageIndex}
                pagesCount={totalPages}
                onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
              />
            }
          />
        </SpaceBetween>
      </Container>
    </SpaceBetween>
  );
}
