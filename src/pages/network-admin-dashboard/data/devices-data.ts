// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { TableProps } from '@cloudscape-design/components/table';

export interface Device {
  id: string;
  name: string;
  type: string;
  ipAddress: string;
  macAddress: string;
  status: string;
  lastSeen: string;
  bandwidth: string;
}

export const devicesData: Device[] = [
  {
    id: '1',
    name: 'Router-Main',
    type: 'Router',
    ipAddress: '192.168.1.1',
    macAddress: '00:11:22:33:44:55',
    status: 'Online',
    lastSeen: '2024-01-15 14:30:25',
    bandwidth: '1 Gbps',
  },
  {
    id: '2',
    name: 'Laptop-Office',
    type: 'Computer',
    ipAddress: '192.168.1.101',
    macAddress: '00:11:22:33:44:56',
    status: 'Online',
    lastSeen: '2024-01-15 14:29:15',
    bandwidth: '100 Mbps',
  },
  {
    id: '3',
    name: 'Phone-Mobile',
    type: 'Mobile',
    ipAddress: '192.168.1.102',
    macAddress: '00:11:22:33:44:57',
    status: 'Online',
    lastSeen: '2024-01-15 14:28:45',
    bandwidth: '150 Mbps',
  },
  {
    id: '4',
    name: 'Printer-HP',
    type: 'Printer',
    ipAddress: '192.168.1.103',
    macAddress: '00:11:22:33:44:58',
    status: 'Offline',
    lastSeen: '2024-01-15 12:15:30',
    bandwidth: '10 Mbps',
  },
  {
    id: '5',
    name: 'Smart-TV',
    type: 'Entertainment',
    ipAddress: '192.168.1.104',
    macAddress: '00:11:22:33:44:59',
    status: 'Online',
    lastSeen: '2024-01-15 14:25:10',
    bandwidth: '25 Mbps',
  },
  {
    id: '6',
    name: 'Tablet-iPad',
    type: 'Tablet',
    ipAddress: '192.168.1.105',
    macAddress: '00:11:22:33:44:60',
    status: 'Online',
    lastSeen: '2024-01-15 14:20:05',
    bandwidth: '80 Mbps',
  },
  {
    id: '7',
    name: 'Security-Camera',
    type: 'IoT',
    ipAddress: '192.168.1.106',
    macAddress: '00:11:22:33:44:61',
    status: 'Online',
    lastSeen: '2024-01-15 14:30:00',
    bandwidth: '5 Mbps',
  },
  {
    id: '8',
    name: 'Smart-Speaker',
    type: 'IoT',
    ipAddress: '192.168.1.107',
    macAddress: '00:11:22:33:44:62',
    status: 'Online',
    lastSeen: '2024-01-15 14:28:20',
    bandwidth: '2 Mbps',
  },
  {
    id: '9',
    name: 'Gaming-Console',
    type: 'Entertainment',
    ipAddress: '192.168.1.108',
    macAddress: '00:11:22:33:44:63',
    status: 'Offline',
    lastSeen: '2024-01-15 10:45:12',
    bandwidth: '200 Mbps',
  },
  {
    id: '10',
    name: 'Thermostat',
    type: 'IoT',
    ipAddress: '192.168.1.109',
    macAddress: '00:11:22:33:44:64',
    status: 'Online',
    lastSeen: '2024-01-15 14:27:35',
    bandwidth: '1 Mbps',
  },
];

export const devicesColumnDefinitions: TableProps.ColumnDefinition<Device>[] = [
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
    id: 'ipAddress',
    header: 'IP Address',
    cell: item => item.ipAddress,
    sortingField: 'ipAddress',
  },
  {
    id: 'macAddress',
    header: 'MAC Address',
    cell: item => item.macAddress,
    sortingField: 'macAddress',
  },
  {
    id: 'status',
    header: 'Status',
    cell: item => item.status,
    sortingField: 'status',
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
];
