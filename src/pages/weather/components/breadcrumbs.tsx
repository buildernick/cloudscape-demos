// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';

export function Breadcrumbs() {
  return (
    <BreadcrumbGroup
      items={[
        { text: 'Home', href: '#' },
        { text: 'Weather App', href: '#' },
      ]}
      expandAriaLabel="Show path"
      ariaLabel="Breadcrumbs"
    />
  );
}
