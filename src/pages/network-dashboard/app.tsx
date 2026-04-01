// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import Flashbar from '@cloudscape-design/components/flashbar';
import Pagination from '@cloudscape-design/components/pagination';
import SpaceBetween from '@cloudscape-design/components/space-between';

import ChartControls, { ChartSettings } from './components/chart-controls';
import DevicesTable from './components/devices-table';
import DynamicChart from './components/dynamic-chart';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [chartSettings, setChartSettings] = useState<ChartSettings>({
    networkTrafficType: 'area',
    networkTrafficTimeRange: 'lastWeek',
    creditUsageType: 'bar',
    creditUsageTimeRange: 'lastWeek',
  });

  const networkTrafficSeries = [
    {
      title: 'Site 1',
      type: chartSettings.networkTrafficType,
      data: [{ x: 1, y: 3500 }], // Base data, will be replaced by dynamic data
      color: '#ec7211',
    },
    {
      title: 'Site 2',
      type: chartSettings.networkTrafficType,
      data: [{ x: 1, y: 3200 }], // Base data, will be replaced by dynamic data
      color: '#2ea597',
    },
    {
      title: 'Performance goal',
      type: 'threshold',
      data: [{ x: 1, y: 3800 }], // Base data, will be replaced by dynamic data
      color: '#000000',
    },
  ];

  const creditUsageSeries = [
    {
      title: 'Site 1',
      type: chartSettings.creditUsageType,
      data: [{ x: 1, y: 850 }], // Base data, will be replaced by dynamic data
      color: '#5294cf',
    },
    {
      title: 'Performance goal',
      type: 'threshold',
      data: [{ x: 1, y: 900 }], // Base data, will be replaced by dynamic data
      color: '#000000',
    },
  ];

  return (
    <AppLayout
      navigationHide
      toolsHide
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <BreadcrumbGroup
                items={[
                  { text: 'Service', href: '#' },
                  { text: 'Administrative Dashboard', href: '#' },
                ]}
              />
              <Header
                variant="h1"
                description="Network Traffic, Credit Usage, and Your Devices"
                actions={
                  <Button variant="primary" iconName="refresh">
                    Refresh Data
                  </Button>
                }
              >
                Network Administration Dashboard
              </Header>
              <Flashbar
                items={[
                  {
                    type: 'warning',
                    content: 'This is a warning message',
                    dismissible: true,
                    buttonText: 'Dismiss',
                  },
                ]}
              />
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            <Container>
              <Grid gridDefinition={[{ colspan: { default: 12, xs: 12, s: 12, m: 8, l: 8, xl: 8 } }]}>
                <Input
                  value={searchValue}
                  onChange={({ detail }) => setSearchValue(detail.value)}
                  placeholder="Placeholder"
                  type="search"
                />
              </Grid>
              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  currentPageIndex={currentPageIndex}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  pagesCount={5}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Go to page ${pageNumber}`,
                  }}
                />
              </div>
            </Container>

            <ChartControls settings={chartSettings} onSettingsChange={setChartSettings} />

            <Grid
              gridDefinition={[
                { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
                { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
              ]}
            >
              <DynamicChart
                title="Network Traffic"
                chartType={chartSettings.networkTrafficType}
                timeRange={chartSettings.networkTrafficTimeRange}
                series={networkTrafficSeries}
                unit="MB/s"
              />
              <DynamicChart
                title="Credit Usage"
                chartType={chartSettings.creditUsageType}
                timeRange={chartSettings.creditUsageTimeRange}
                series={creditUsageSeries}
                unit="credits"
              />
            </Grid>

            <DevicesTable />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
