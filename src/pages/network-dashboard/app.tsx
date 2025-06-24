// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Flashbar from '@cloudscape-design/components/flashbar';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';

import { Navigation } from '../commons';
import { NetworkTrafficChart, CreditUsageChart, DevicesTable } from './components';

export function NetworkDashboardApp() {
  const [filterText, setFilterText] = useState('');
  const [showAlert, setShowAlert] = useState(true);

  const alertItems = showAlert
    ? [
        {
          type: 'warning' as const,
          dismissible: true,
          onDismiss: () => setShowAlert(false),
          content: 'This is a warning message',
        },
      ]
    : [];

  return (
    <AppLayout
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <Header
                variant="h1"
                actions={
                  <Button variant="primary" iconName="refresh">
                    Refresh Data
                  </Button>
                }
                description="Network Traffic, Credit Usage, and Your Devices"
              >
                Network Administration Dashboard
              </Header>

              <Container>
                <SpaceBetween direction="horizontal" size="l">
                  <TextFilter
                    filteringText={filterText}
                    onChange={({ detail }) => setFilterText(detail.filteringText)}
                    filteringPlaceholder="Placeholder"
                  />

                  <SpaceBetween direction="horizontal" size="xs">
                    <Button variant="icon" iconName="angle-left" disabled />
                    <Button variant="normal">1</Button>
                    <Button variant="normal">2</Button>
                    <Button variant="normal">3</Button>
                    <Button variant="normal">4</Button>
                    <Button variant="normal">5</Button>
                    <Button variant="icon" iconName="angle-right" />
                    <div style={{ width: '2px', height: '32px', backgroundColor: '#414D5C' }} />
                    <Button variant="icon" iconName="settings" />
                  </SpaceBetween>
                </SpaceBetween>
              </Container>
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            <Flashbar items={alertItems} />

            <ColumnLayout columns={2} variant="default">
              <NetworkTrafficChart />
              <CreditUsageChart />
            </ColumnLayout>

            <Container
              header={
                <Header
                  variant="h2"
                  actions={
                    <Button variant="primary" iconName="add-plus">
                      Add Device
                    </Button>
                  }
                  description="Devices on your local network"
                >
                  My Devices
                </Header>
              }
            >
              <DevicesTable />
            </Container>
          </SpaceBetween>
        </ContentLayout>
      }
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#' },
            { text: 'Administrative Dashboard', href: '#' },
          ]}
        />
      }
      navigation={<Navigation activeHref="/network-dashboard" />}
      navigationOpen={false}
      toolsHide={true}
    />
  );
}
