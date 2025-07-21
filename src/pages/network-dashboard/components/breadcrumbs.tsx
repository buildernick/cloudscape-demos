// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';

interface BreadcrumbItem {
  text: string;
  href?: string;
}

interface CustomBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function CustomBreadcrumbs({ items }: CustomBreadcrumbsProps) {
  return <BreadcrumbGroup items={items} ariaLabel="Breadcrumbs" />;
}
