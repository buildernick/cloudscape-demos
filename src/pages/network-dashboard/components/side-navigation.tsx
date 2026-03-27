// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Badge from '@cloudscape-design/components/badge';

import { CommonNavigation } from '../../commons';

const navItems = [
  { type: 'link', text: 'Dashboard', href: '#/' },
  { type: 'link', text: 'Network Overview', href: '#/network-overview' },
  { type: 'link', text: 'Traffic Analysis', href: '#/traffic-analysis' },
  { type: 'link', text: 'Device Management', href: '#/device-management' },
  { type: 'link', text: 'Credit Usage', href: '#/credit-usage' },
  { type: 'divider' },
  {
    type: 'link',
    text: 'Alerts',
    info: <Badge color="red">3</Badge>,
    href: '#/alerts',
  },
  {
    type: 'link',
    text: 'Documentation',
    external: true,
    externalIconAriaLabel: 'Opens in a new tab',
    href: '#/documentation',
  },
] as const;

export function NetworkDashboardSideNavigation() {
  return <CommonNavigation items={navItems} />;
}
