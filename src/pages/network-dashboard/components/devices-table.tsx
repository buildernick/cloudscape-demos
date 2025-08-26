// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Table from '@cloudscape-design/components/table';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';

// Sample device data with realistic information
const deviceData = [
  {
    id: 'device-1',
    name: 'MacBook Pro - John',
    status: 'Connected',
    type: 'Laptop',
    network: 'Office-WiFi',
    ip: '192.168.1.45',
    location: 'Conference Room A',
    lastSeen: '2 minutes ago',
  },
  {
    id: 'device-2',
    name: 'iPhone 14 - Sarah',
    status: 'Connected',
    type: 'Mobile',
    network: 'Office-WiFi',
    ip: '192.168.1.78',
    location: 'Marketing Dept',
    lastSeen: '5 minutes ago',
  },
  {
    id: 'device-3',
    name: 'Dell Workstation',
    status: 'Offline',
    type: 'Desktop',
    network: 'Ethernet',
    ip: '192.168.1.102',
    location: 'Dev Room 2',
    lastSeen: '1 hour ago',
  },
  {
    id: 'device-4',
    name: 'iPad Pro - Design Team',
    status: 'Connected',
    type: 'Tablet',
    network: 'Office-WiFi',
    ip: '192.168.1.156',
    location: 'Design Studio',
    lastSeen: '10 minutes ago',
  },
  {
    id: 'device-5',
    name: 'HP Printer - Floor 2',
    status: 'Connected',
    type: 'Printer',
    network: 'Office-WiFi',
    ip: '192.168.1.89',
    location: 'Floor 2 - East',
    lastSeen: '3 minutes ago',
  },
  {
    id: 'device-6',
    name: 'Samsung Galaxy - Mike',
    status: 'Connected',
    type: 'Mobile',
    network: 'Office-WiFi',
    ip: '192.168.1.134',
    location: 'Sales Office',
    lastSeen: '8 minutes ago',
  },
  {
    id: 'device-7',
    name: 'Surface Laptop - Lisa',
    status: 'Connected',
    type: 'Laptop',
    network: 'Office-WiFi',
    ip: '192.168.1.67',
    location: 'HR Department',
    lastSeen: '1 minute ago',
  },
  {
    id: 'device-8',
    name: 'Security Camera - Main',
    status: 'Connected',
    type: 'IoT Device',
    network: 'Security-Net',
    ip: '192.168.2.15',
    location: 'Main Entrance',
    lastSeen: 'Just now',
  },
  {
    id: 'device-9',
    name: 'Conference Room TV',
    status: 'Standby',
    type: 'Display',
    network: 'Office-WiFi',
    ip: '192.168.1.201',
    location: 'Conference Room B',
    lastSeen: '25 minutes ago',
  },
  {
    id: 'device-10',
    name: 'ThinkPad - Alex',
    status: 'Connected',
    type: 'Laptop',
    network: 'Office-WiFi',
    ip: '192.168.1.93',
    location: 'Engineering',
    lastSeen: '7 minutes ago',
  },
  {
    id: 'device-11',
    name: 'Apple Watch - Sarah',
    status: 'Connected',
    type: 'Wearable',
    network: 'Office-WiFi',
    ip: '192.168.1.179',
    location: 'Marketing Dept',
    lastSeen: '12 minutes ago',
  },
  {
    id: 'device-12',
    name: 'Roku TV - Lounge',
    status: 'Connected',
    type: 'Media Device',
    network: 'Guest-WiFi',
    ip: '192.168.3.44',
    location: 'Employee Lounge',
    lastSeen: '18 minutes ago',
  },
  {
    id: 'device-13',
    name: 'NAS Server - Backup',
    status: 'Connected',
    type: 'Server',
    network: 'Ethernet',
    ip: '192.168.1.250',
    location: 'Server Room',
    lastSeen: '30 seconds ago',
  },
  {
    id: 'device-14',
    name: 'Canon Scanner',
    status: 'Offline',
    type: 'Scanner',
    network: 'Office-WiFi',
    ip: '192.168.1.88',
    location: 'Admin Office',
    lastSeen: '2 hours ago',
  },
  {
    id: 'device-15',
    name: 'Smart Thermostat',
    status: 'Connected',
    type: 'IoT Device',
    network: 'IoT-Network',
    ip: '192.168.4.12',
    location: 'HVAC Control',
    lastSeen: '5 seconds ago',
  },
  {
    id: 'device-16',
    name: 'Galaxy Tab - Tom',
    status: 'Connected',
    type: 'Tablet',
    network: 'Office-WiFi',
    ip: '192.168.1.167',
    location: 'Operations',
    lastSeen: '15 minutes ago',
  },
  {
    id: 'device-17',
    name: 'Ring Doorbell',
    status: 'Connected',
    type: 'IoT Device',
    network: 'Security-Net',
    ip: '192.168.2.8',
    location: 'Front Door',
    lastSeen: '2 minutes ago',
  },
  {
    id: 'device-18',
    name: 'MacBook Air - Emma',
    status: 'Disconnected',
    type: 'Laptop',
    network: 'Office-WiFi',
    ip: '192.168.1.112',
    location: 'Finance Dept',
    lastSeen: '3 hours ago',
  },
  {
    id: 'device-19',
    name: 'Xerox Printer - Floor 1',
    status: 'Connected',
    type: 'Printer',
    network: 'Office-WiFi',
    ip: '192.168.1.91',
    location: 'Floor 1 - West',
    lastSeen: '6 minutes ago',
  },
  {
    id: 'device-20',
    name: 'Chromecast - Meeting Room',
    status: 'Connected',
    type: 'Media Device',
    network: 'Office-WiFi',
    ip: '192.168.1.188',
    location: 'Meeting Room C',
    lastSeen: '11 minutes ago',
  },
];

const columnDefinitions = [
  {
    id: 'name',
    header: 'Device Name',
    cell: (item: any) => item.name,
    sortingField: 'name',
    isRowHeader: true,
  },
  {
    id: 'status',
    header: 'Status',
    cell: (item: any) => item.status,
    sortingField: 'status',
  },
  {
    id: 'type',
    header: 'Device Type',
    cell: (item: any) => item.type,
    sortingField: 'type',
  },
  {
    id: 'network',
    header: 'Network',
    cell: (item: any) => item.network,
    sortingField: 'network',
  },
  {
    id: 'ip',
    header: 'IP Address',
    cell: (item: any) => item.ip,
    sortingField: 'ip',
  },
  {
    id: 'location',
    header: 'Location',
    cell: (item: any) => item.location,
    sortingField: 'location',
  },
  {
    id: 'lastSeen',
    header: 'Last Seen',
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
