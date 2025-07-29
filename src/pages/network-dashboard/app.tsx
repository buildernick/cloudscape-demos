// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState, useEffect } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import LineChart from '@cloudscape-design/components/line-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Flashbar from '@cloudscape-design/components/flashbar';
import { useCollection } from '@cloudscape-design/collection-hooks';

// Mock data for charts
const networkTrafficData = [
  { x: 'x1', y: 45 },
  { x: 'x2', y: 52 },
  { x: 'x3', y: 48 },
  { x: 'x4', y: 61 },
  { x: 'x5', y: 55 },
  { x: 'x6', y: 67 },
  { x: 'x7', y: 72 },
  { x: 'x8', y: 69 },
  { x: 'x9', y: 58 },
  { x: 'x10', y: 64 },
  { x: 'x11', y: 71 },
  { x: 'x12', y: 68 },
];

const networkTrafficSeries2 = [
  { x: 'x1', y: 35 },
  { x: 'x2', y: 42 },
  { x: 'x3', y: 38 },
  { x: 'x4', y: 51 },
  { x: 'x5', y: 45 },
  { x: 'x6', y: 57 },
  { x: 'x7', y: 62 },
  { x: 'x8', y: 59 },
  { x: 'x9', y: 48 },
  { x: 'x10', y: 54 },
  { x: 'x11', y: 61 },
  { x: 'x12', y: 58 },
];

const creditUsageData = [
  { x: 'x1', y: 183 },
  { x: 'x2', y: 257 },
  { x: 'x3', y: 213 },
  { x: 'x4', y: 122 },
  { x: 'x5', y: 210 },
];

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: 'Active' | 'Inactive' | 'Pending';
  registered: string;
  picture: string;
}

const columnDefinitions = [
  {
    id: 'picture',
    header: 'Avatar',
    cell: (item: User) => (
      <img 
        src={item.picture} 
        alt={item.name}
        style={{ width: '40px', height: '40px', borderRadius: '50%' }}
      />
    ),
  },
  {
    id: 'name',
    header: 'Name',
    cell: (item: User) => item.name,
    sortingField: 'name',
  },
  {
    id: 'email',
    header: 'Email',
    cell: (item: User) => item.email,
    sortingField: 'email',
  },
  {
    id: 'phone',
    header: 'Phone',
    cell: (item: User) => item.phone,
    sortingField: 'phone',
  },
  {
    id: 'location',
    header: 'Location',
    cell: (item: User) => item.location,
    sortingField: 'location',
  },
  {
    id: 'status',
    header: 'Status',
    cell: (item: User) => (
      <Box 
        color={item.status === 'Active' ? 'text-status-success' : 
              item.status === 'Pending' ? 'text-status-warning' : 
              'text-status-error'}
      >
        {item.status}
      </Box>
    ),
    sortingField: 'status',
  },
  {
    id: 'registered',
    header: 'Registered',
    cell: (item: User) => item.registered,
    sortingField: 'registered',
  },
];

export function App() {
  const [selectedItems, setSelectedItems] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://randomuser.me/api/?results=20&seed=network-dashboard');
        const data = await response.json();
        
        const transformedUsers: User[] = data.results.map((user: any, index: number) => ({
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          phone: user.phone,
          location: `${user.location.city}, ${user.location.country}`,
          status: ['Active', 'Inactive', 'Pending'][index % 3] as 'Active' | 'Inactive' | 'Pending',
          registered: new Date(user.registered.date).toLocaleDateString(),
          picture: user.picture.medium,
        }));
        
        setUsers(transformedUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    users,
    {
      filtering: {
        empty: (
          <Box textAlign="center" color="inherit">
            <Box variant="strong" textAlign="center" color="inherit">
              No users
            </Box>
            <Box variant="p" padding={{ bottom: 's' }} color="inherit">
              No users to display.
            </Box>
          </Box>
        ),
        noMatch: (
          <Box textAlign="center" color="inherit">
            <Box variant="strong" textAlign="center" color="inherit">
              No matches
            </Box>
            <Box variant="p" padding={{ bottom: 's' }} color="inherit">
              We can't find a match.
            </Box>
          </Box>
        ),
      },
      pagination: { pageSize: 10 },
      sorting: {},
      selection: {},
    }
  );

  return (
    <AppLayout
      navigationHide
      toolsHide
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <BreadcrumbGroup
                items={[
                  { text: 'Service', href: '#' },
                  { text: 'Administrative Dashboard', href: '#' },
                ]}
                ariaLabel="Breadcrumbs"
              />
              
              <Header
                variant="h1"
                description="Network Traffic, Credit Usage, and Your Users"
                actions={
                  <Button variant="primary" iconAlign="right" iconName="external">
                    Refresh Data
                  </Button>
                }
              >
                Network Administration Dashboard
              </Header>

              <Grid gridDefinition={[{ colspan: { default: 12, xs: 12, s: 12, m: 8, l: 8, xl: 8 } }]}>
                <TextFilter
                  {...filterProps}
                  filteringPlaceholder="Search users..."
                  filteringAriaLabel="Filter users"
                  countText={`${filteredItemsCount} matches`}
                />
              </Grid>

              <Flashbar
                items={[
                  {
                    type: 'error',
                    content: 'Critical network alert detected',
                    dismissible: true,
                    buttonText: 'Dismiss',
                  },
                ]}
              />
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {/* Charts Section */}
            <Grid
              gridDefinition={[
                { colspan: { default: 12, xxs: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
                { colspan: { default: 12, xxs: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
              ]}
            >
              <Container
                header={
                  <Header variant="h2">
                    Network traffic
                  </Header>
                }
              >
                <LineChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'area',
                      data: networkTrafficData,
                      color: '#688AE8',
                    },
                    {
                      title: 'Site 2',
                      type: 'area',
                      data: networkTrafficSeries2,
                      color: '#C33D69',
                    },
                  ]}
                  xDomain={['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12']}
                  yDomain={[0, 100]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'line chart',
                    xTickFormatter: (e) => e,
                    yTickFormatter: (e) => `y${e}`,
                  }}
                  ariaLabel="Network traffic chart"
                  height={300}
                  hideFilter
                  hideLegend={false}
                  loadingText="Loading chart"
                  recoveryText="Retry"
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle=""
                  empty={
                    <Box textAlign="center" color="inherit">
                      <b>No data available</b>
                      <Box variant="p" color="inherit">
                        There is no data available
                      </Box>
                    </Box>
                  }
                  noMatch={
                    <Box textAlign="center" color="inherit">
                      <b>No matching data</b>
                      <Box variant="p" color="inherit">
                        There is no matching data to display
                      </Box>
                    </Box>
                  }
                />
              </Container>

              <Container
                header={
                  <Header variant="h2">
                    Credit Usage
                  </Header>
                }
              >
                <BarChart
                  series={[
                    {
                      title: 'Site 1',
                      type: 'bar',
                      data: creditUsageData,
                      color: '#688AE8',
                    },
                  ]}
                  xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
                  yDomain={[0, 300]}
                  i18nStrings={{
                    filterLabel: 'Filter displayed data',
                    filterPlaceholder: 'Filter data',
                    filterSelectedAriaLabel: 'selected',
                    legendAriaLabel: 'Legend',
                    chartAriaRoleDescription: 'bar chart',
                    xTickFormatter: (e) => e,
                    yTickFormatter: (e) => `y${e}`,
                  }}
                  ariaLabel="Credit usage chart"
                  height={300}
                  hideFilter
                  hideLegend={false}
                  loadingText="Loading chart"
                  recoveryText="Retry"
                  xScaleType="categorical"
                  xTitle="Day"
                  yTitle=""
                  empty={
                    <Box textAlign="center" color="inherit">
                      <b>No data available</b>
                      <Box variant="p" color="inherit">
                        There is no data available
                      </Box>
                    </Box>
                  }
                  noMatch={
                    <Box textAlign="center" color="inherit">
                      <b>No matching data</b>
                      <Box variant="p" color="inherit">
                        There is no matching data to display
                      </Box>
                    </Box>
                  }
                />
              </Container>
            </Grid>

            {/* Users Table Section */}
            <Container
              header={
                <Header
                  variant="h2"
                  description="Network users and administrators"
                  actions={
                    <Button variant="primary" iconAlign="right" iconName="external">
                      Add User
                    </Button>
                  }
                >
                  Network Users
                </Header>
              }
            >
              <Table
                {...collectionProps}
                columnDefinitions={columnDefinitions}
                items={items}
                loading={loading}
                selectionType="multi"
                selectedItems={selectedItems}
                onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
                ariaLabels={{
                  itemSelectionLabel: (e, n) => `select ${n.name}`,
                  allItemsSelectionLabel: () => 'select all',
                  selectionGroupLabel: 'Item selection',
                }}
                renderAriaLive={({ firstIndex, lastIndex, totalItemsCount }) =>
                  `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
                }
                variant="container"
                stickyHeader
                loadingText="Loading users"
                pagination={<Pagination {...paginationProps} />}
                empty={
                  <Box textAlign="center" color="inherit">
                    <Box variant="strong" textAlign="center" color="inherit">
                      No users
                    </Box>
                    <Box variant="p" padding={{ bottom: 's' }} color="inherit">
                      No users to display.
                    </Box>
                    <Button>Add user</Button>
                  </Box>
                }
              />
            </Container>
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
