// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import SideNavigation from '@cloudscape-design/components/side-navigation';

export function NetworkDashboardSideNavigation() {
  return (
    <SideNavigation
      activeHref="#/network-dashboard"
      header={{ text: 'Network Administration', href: '#/network-dashboard' }}
      items={[
        { type: 'link', text: 'Overview', href: '#/network-dashboard' },
        { type: 'link', text: 'Network Traffic', href: '#/network-dashboard/traffic' },
        { type: 'link', text: 'Credit Usage', href: '#/network-dashboard/credits' },
        { type: 'link', text: 'Device Management', href: '#/network-dashboard/devices' },
        { type: 'divider' },
        { type: 'link', text: 'Settings', href: '#/network-dashboard/settings' },
        { type: 'link', text: 'Alerts', href: '#/network-dashboard/alerts' },
      ]}
    />
  );
}
