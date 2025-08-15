// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useMemo } from 'react';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import Pagination from '@cloudscape-design/components/pagination';
import TextFilter from '@cloudscape-design/components/text-filter';
import PropertyFilter from '@cloudscape-design/components/property-filter';
import CollectionPreferences from '@cloudscape-design/components/collection-preferences';

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

// Property filter definitions
const FILTER_PROPERTIES = [
  {
    propertyLabel: 'Device Name',
    key: 'name',
    groupValuesLabel: 'Device names',
    operators: [':', '!:', '=', '!='],
  },
  {
    propertyLabel: 'Type',
    key: 'type',
    groupValuesLabel: 'Device types',
    operators: [':', '!:', '=', '!='],
  },
  {
    propertyLabel: 'Status',
    key: 'status',
    groupValuesLabel: 'Statuses',
    operators: [':', '!:', '=', '!='],
  },
  {
    propertyLabel: 'IP Address',
    key: 'ipAddress',
    groupValuesLabel: 'IP addresses',
    operators: [':', '!:', '=', '!='],
  },
  {
    propertyLabel: 'Location',
    key: 'location',
    groupValuesLabel: 'Locations',
    operators: [':', '!:', '=', '!='],
  },
  {
    propertyLabel: 'Bandwidth',
    key: 'bandwidth',
    groupValuesLabel: 'Bandwidth values',
    operators: [':', '!:', '=', '!='],
  },
];

export function DevicesTable() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [textFilter, setTextFilter] = useState('');
  const [propertyFilter, setPropertyFilter] = useState({ tokens: [], operation: 'and' });
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [preferences, setPreferences] = useState({
    pageSize: 10,
    visibleColumns: ['name', 'type', 'status', 'ipAddress', 'location', 'lastSeen', 'bandwidth'],
    wrapLines: false,
    stripedRows: false,
  });

  // Filter data based on text and property filters
  const filteredData = useMemo(() => {
    let filtered = devicesData;

    // Apply text filter
    if (textFilter) {
      filtered = filtered.filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(textFilter.toLowerCase())
        )
      );
    }

    // Apply property filter
    if (propertyFilter.tokens.length > 0) {
      filtered = filtered.filter(item => {
        const tokenMatches = propertyFilter.tokens.map(token => {
          const { propertyKey, operator, value } = token;
          const itemValue = item[propertyKey]?.toString().toLowerCase() || '';
          const filterValue = value.toLowerCase();

          switch (operator) {
            case ':':
              return itemValue.includes(filterValue);
            case '!:':
              return !itemValue.includes(filterValue);
            case '=':
              return itemValue === filterValue;
            case '!=':
              return itemValue !== filterValue;
            default:
              return true;
          }
        });

        return propertyFilter.operation === 'and'
          ? tokenMatches.every(Boolean)
          : tokenMatches.some(Boolean);
      });
    }

    return filtered;
  }, [textFilter, propertyFilter]);

  // Paginate filtered data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPageIndex - 1) * preferences.pageSize;
    return filteredData.slice(startIndex, startIndex + preferences.pageSize);
  }, [filteredData, currentPageIndex, preferences.pageSize]);

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
        filter={
          <SpaceBetween size="s">
            <TextFilter
              filteringText={textFilter}
              onChange={({ detail }) => setTextFilter(detail.filteringText)}
              filteringPlaceholder="Search devices"
              countText={`${filteredData.length} ${filteredData.length === 1 ? 'match' : 'matches'}`}
            />
            <PropertyFilter
              query={propertyFilter}
              onChange={({ detail }) => setPropertyFilter(detail)}
              filteringProperties={FILTER_PROPERTIES}
              filteringPlaceholder="Filter devices by property"
              countText={`${filteredData.length} ${filteredData.length === 1 ? 'match' : 'matches'}`}
              expandToViewport
            />
          </SpaceBetween>
        }
        preferences={
          <CollectionPreferences
            title="Preferences"
            confirmLabel="Confirm"
            cancelLabel="Cancel"
            onConfirm={({ detail }) => setPreferences(detail)}
            preferences={preferences}
            pageSizePreference={{
              title: 'Page size',
              options: [
                { value: 5, label: '5 devices' },
                { value: 10, label: '10 devices' },
                { value: 20, label: '20 devices' },
                { value: 50, label: '50 devices' },
              ],
            }}
            visibleContentPreference={{
              title: 'Select visible columns',
              options: [
                { id: 'name', label: 'Device Name' },
                { id: 'type', label: 'Type' },
                { id: 'status', label: 'Status' },
                { id: 'ipAddress', label: 'IP Address' },
                { id: 'location', label: 'Location' },
                { id: 'lastSeen', label: 'Last Seen' },
                { id: 'bandwidth', label: 'Bandwidth' },
              ],
            }}
            wrapLinesPreference={{
              label: 'Wrap lines',
              description: 'Wrap table cell content',
            }}
            stripedRowsPreference={{
              label: 'Striped rows',
              description: 'Add alternating row colors',
            }}
          />
        }
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
        ].filter(column => preferences.visibleColumns.includes(column.id))}
        items={paginatedData}
        visibleColumns={preferences.visibleColumns}
        wrapLines={preferences.wrapLines}
        stripedRows={preferences.stripedRows}
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
            counter={selectedItems.length ? `(${selectedItems.length}/${filteredData.length})` : `(${filteredData.length})`}
          >
            Devices
          </Header>
        }
        pagination={
          <Pagination
            currentPageIndex={currentPageIndex}
            pagesCount={Math.ceil(filteredData.length / preferences.pageSize)}
            onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
            ariaLabels={{
              nextPageLabel: 'Next page',
              previousPageLabel: 'Previous page',
              pageLabel: (pageNumber) => `Page ${pageNumber}`,
            }}
          />
        }
        sortingDisabled={false}
        variant="full-page"
      />
    </SpaceBetween>
  );
}
