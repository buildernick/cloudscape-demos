// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useEffect } from 'react';

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

// Device types and statuses for random assignment
const deviceTypes = ['Router', 'Switch', 'Access Point', 'Firewall', 'Server'];
const deviceStatuses = ['Online', 'Warning', 'Offline'];
const bandwidthOptions = ['1.2 Gbps', '850 Mbps', '320 Mbps', '2.1 Gbps', '750 Mbps', 'N/A'];

const columnDefinitions = [
  {
    id: 'name',
    header: 'User Name',
    cell: (item: any) => <Link href={`#/user/${item.id}`}>{item.name}</Link>,
    sortingField: 'name',
  },
  {
    id: 'email',
    header: 'Email',
    cell: (item: any) => item.email,
    sortingField: 'email',
  },
  {
    id: 'phone',
    header: 'Phone',
    cell: (item: any) => item.phone,
    sortingField: 'phone',
  },
  {
    id: 'location',
    header: 'Location',
    cell: (item: any) => `${item.location.city}, ${item.location.country}`,
    sortingField: 'location',
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
    id: 'registered',
    header: 'Registered',
    cell: (item: any) => new Date(item.registered.date).toLocaleDateString(),
    sortingField: 'registered',
  },
];

export function Content() {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [userData, setUserData] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=20');
        const data = await response.json();

        // Transform randomuser.me data to match our table structure
        const transformedUsers = data.results.map((user: any, index: number) => ({
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          phone: user.phone,
          location: {
            city: user.location.city,
            country: user.location.country,
          },
          status: deviceStatuses[Math.floor(Math.random() * deviceStatuses.length)],
          registered: user.registered,
          picture: user.picture.thumbnail,
        }));

        setUserData(transformedUsers);
        setFilteredItems(transformedUsers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    if (value === '') {
      setFilteredItems(userData);
    } else {
      setFilteredItems(
        userData.filter(
          item =>
            item.name.toLowerCase().includes(value.toLowerCase()) ||
            item.email.toLowerCase().includes(value.toLowerCase()) ||
            item.status.toLowerCase().includes(value.toLowerCase()) ||
            item.location.city.toLowerCase().includes(value.toLowerCase()) ||
            item.location.country.toLowerCase().includes(value.toLowerCase()),
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
      <Alert type="error" dismissible>
        High network traffic detected on Router-01. Consider load balancing to improve performance.
      </Alert>

      {/* Search Bar */}
      <Container>
        <Input
          onChange={({ detail }) => handleSearchChange(detail.value)}
          value={searchValue}
          type="search"
          placeholder="Search users, emails, locations, or status..."
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

      {/* User Management Section */}
      <Container
        header={
          <Header
            variant="h2"
            description="Users on your network"
            actions={<Button variant="primary">Add User</Button>}
          >
            Network Users
          </Header>
        }
      >
        <SpaceBetween size="l">
          <TextFilter
            filteringText={searchValue}
            filteringPlaceholder="Find users"
            filteringAriaLabel="Filter users"
            onChange={({ detail }) => handleSearchChange(detail.filteringText)}
          />

          <Table
            columnDefinitions={columnDefinitions}
            items={currentItems}
            loadingText="Loading users"
            selectionType="multi"
            trackBy="id"
            empty={
              <Box textAlign="center" color="inherit">
                <b>No users</b>
                <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                  No users found matching your search criteria.
                </Box>
                <Button>Add User</Button>
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
