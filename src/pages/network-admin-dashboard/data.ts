// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

export interface NetworkTrafficPoint {
  day: string;
  site1: number;
  site2: number;
}

export const performanceGoal = 3.4;

export const networkTrafficData: NetworkTrafficPoint[] = [
  { day: 'x1', site1: 2.6, site2: 2.6 },
  { day: 'x2', site1: 3.3, site2: 3.5 },
  { day: 'x3', site1: 3.6, site2: 3.7 },
  { day: 'x4', site1: 3.8, site2: 4.9 },
  { day: 'x5', site1: 4.1, site2: 4.9 },
  { day: 'x6', site1: 3.9, site2: 4.5 },
  { day: 'x7', site1: 4.0, site2: 4.6 },
  { day: 'x8', site1: 3.8, site2: 4.4 },
  { day: 'x9', site1: 4.2, site2: 5.3 },
  { day: 'x10', site1: 4.9, site2: 5.3 },
  { day: 'x11', site1: 4.8, site2: 5.2 },
  { day: 'x12', site1: 3.6, site2: 3.6 },
];

export interface CreditUsagePoint {
  day: string;
  credits: number;
}

export const creditUsageData: CreditUsagePoint[] = [
  { day: 'x1', credits: 420 },
  { day: 'x2', credits: 580 },
  { day: 'x3', credits: 510 },
  { day: 'x4', credits: 320 },
  { day: 'x5', credits: 540 },
];

export type DeviceStatus = 'online' | 'offline' | 'idle';

export interface Device {
  id: string;
  name: string;
  ipAddress: string;
  macAddress: string;
  type: string;
  status: DeviceStatus;
  lastSeen: string;
  bandwidthUsage: string;
}

const deviceTemplates: Array<Omit<Device, 'id' | 'ipAddress' | 'macAddress'>> = [
  { name: 'Living Room Router', type: 'Router', status: 'online', lastSeen: 'Just now', bandwidthUsage: '128 GB' },
  { name: "Nick's Laptop", type: 'Laptop', status: 'online', lastSeen: '2 minutes ago', bandwidthUsage: '42 GB' },
  { name: 'Kitchen Smart TV', type: 'Smart TV', status: 'idle', lastSeen: '18 minutes ago', bandwidthUsage: '87 GB' },
  { name: 'Front Door Camera', type: 'Security Camera', status: 'online', lastSeen: '1 minute ago', bandwidthUsage: '64 GB' },
  { name: 'Office Desktop', type: 'Desktop', status: 'offline', lastSeen: '3 hours ago', bandwidthUsage: '19 GB' },
  { name: "Sam's Smartphone", type: 'Smartphone', status: 'online', lastSeen: 'Just now', bandwidthUsage: '11 GB' },
  { name: 'Guest Tablet', type: 'Tablet', status: 'idle', lastSeen: '45 minutes ago', bandwidthUsage: '6 GB' },
  { name: 'Garage IoT Sensor', type: 'IoT Sensor', status: 'online', lastSeen: '4 minutes ago', bandwidthUsage: '1 GB' },
  { name: 'Study Printer', type: 'Printer', status: 'offline', lastSeen: '1 day ago', bandwidthUsage: '<1 GB' },
  { name: 'Bedroom Smart Speaker', type: 'Smart Speaker', status: 'online', lastSeen: '6 minutes ago', bandwidthUsage: '3 GB' },
];

function buildIpAddress(index: number) {
  return `192.168.1.${(index % 250) + 2}`;
}

function buildMacAddress(index: number) {
  const hex = index.toString(16).padStart(6, '0').toUpperCase();
  return `A4:5E:60:${hex.slice(0, 2)}:${hex.slice(2, 4)}:${hex.slice(4, 6)}`;
}

export const devices: Device[] = Array.from({ length: 45 }, (_, index) => {
  const template = deviceTemplates[index % deviceTemplates.length];
  const suffix = Math.floor(index / deviceTemplates.length);
  return {
    id: `device-${index + 1}`,
    ipAddress: buildIpAddress(index),
    macAddress: buildMacAddress(index),
    ...template,
    name: suffix > 0 ? `${template.name} ${suffix + 1}` : template.name,
  };
});
