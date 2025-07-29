// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { App } from './app';

import '../../styles/base.scss';

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

// Mock data for devices table
const deviceData = [
  { id: '1', name: 'Router-Main', type: 'Router', ip: '192.168.1.1', status: 'Online', lastSeen: '2 minutes ago', bandwidth: '1 Gbps', uptime: '45 days' },
  { id: '2', name: 'Switch-Office', type: 'Switch', ip: '192.168.1.2', status: 'Online', lastSeen: '5 minutes ago', bandwidth: '100 Mbps', uptime: '32 days' },
  { id: '3', name: 'AP-Conference', type: 'Access Point', ip: '192.168.1.10', status: 'Offline', lastSeen: '2 hours ago', bandwidth: '300 Mbps', uptime: '12 days' },
  { id: '4', name: 'Firewall-Main', type: 'Firewall', ip: '192.168.1.254', status: 'Online', lastSeen: '1 minute ago', bandwidth: '10 Gbps', uptime: '89 days' },
  { id: '5', name: 'Server-DB', type: 'Server', ip: '192.168.1.100', status: 'Warning', lastSeen: '30 minutes ago', bandwidth: '1 Gbps', uptime: '156 days' },
  { id: '6', name: 'Printer-Office', type: 'Printer', ip: '192.168.1.200', status: 'Online', lastSeen: '1 hour ago', bandwidth: '10 Mbps', uptime: '8 days' },
  { id: '7', name: 'Camera-Lobby', type: 'Security Camera', ip: '192.168.1.201', status: 'Online', lastSeen: '3 minutes ago', bandwidth: '50 Mbps', uptime: '67 days' },
  { id: '8', name: 'NAS-Storage', type: 'NAS', ip: '192.168.1.101', status: 'Online', lastSeen: '10 minutes ago', bandwidth: '1 Gbps', uptime: '234 days' },
  { id: '9', name: 'Switch-Floor2', type: 'Switch', ip: '192.168.2.1', status: 'Online', lastSeen: '7 minutes ago', bandwidth: '100 Mbps', uptime: '78 days' },
  { id: '10', name: 'AP-Floor2', type: 'Access Point', ip: '192.168.2.10', status: 'Online', lastSeen: '4 minutes ago', bandwidth: '300 Mbps', uptime: '45 days' },
];

const columnDefinitions = [
  {
    id: 'name',
    header: 'Device Name',
    cell: (item: any) => item.name,
    sortingField: 'name',
  },
  {
    id: 'type',
    header: 'Device Type',
    cell: (item: any) => item.type,
    sortingField: 'type',
  },
  {
    id: 'ip',
    header: 'IP Address',
    cell: (item: any) => item.ip,
    sortingField: 'ip',
  },
  {
    id: 'status',
    header: 'Status',
    cell: (item: any) => (
      <Box 
        color={item.status === 'Online' ? 'text-status-success' : 
              item.status === 'Warning' ? 'text-status-warning' : 
              'text-status-error'}
      >
        {item.status}
      </Box>
    ),
    sortingField: 'status',
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
  {
    id: 'uptime',
    header: 'Uptime',
    cell: (item: any) => item.uptime,
    sortingField: 'uptime',
  },
];

export default function NetworkDashboardDemo() {
  return <App />;
}
