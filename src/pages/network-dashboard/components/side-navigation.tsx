// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import SideNavigation from '@cloudscape-design/components/side-navigation';

export function NetworkDashboardSideNavigation() {
  return (
    <SideNavigation
      activeHref="#/network-dashboard"
      header={{ href: '#/', text: 'Cloudscape Design' }}
      items={[
        { type: 'link', text: 'Dashboard', href: '#/' },
        { type: 'link', text: 'Network Dashboard', href: '#/network-dashboard' },
        { type: 'divider' },
        {
          type: 'section',
          text: 'Network Management',
          items: [
            { type: 'link', text: 'Traffic Analysis', href: '#/network-dashboard/traffic' },
            { type: 'link', text: 'Credit Usage', href: '#/network-dashboard/credits' },
            { type: 'link', text: 'Device Management', href: '#/network-dashboard/devices' },
          ],
        },
        {
          type: 'section',
          text: 'Configuration',
          items: [
            { type: 'link', text: 'Network Settings', href: '#/network-dashboard/settings' },
            { type: 'link', text: 'Alerts', href: '#/network-dashboard/alerts' },
          ],
        },
      ]}
    />
  );
}
