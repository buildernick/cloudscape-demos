// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Flashbar from '@cloudscape-design/components/flashbar';
import Grid from '@cloudscape-design/components/grid';
import Container from '@cloudscape-design/components/container';
import LineChart from '@cloudscape-design/components/line-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import { IconProps } from '@cloudscape-design/components/icon';

import { CustomAppLayout } from '../commons/common-components';
import { Navigation } from '../commons';

// Mock data for the line chart (area-style)
const lineChartData = [
  {
    title: 'Site 1',
    type: 'line' as const,
    data: [
      { x: new Date('2024-01-01'), y: 10 },
      { x: new Date('2024-01-02'), y: 15 },
      { x: new Date('2024-01-03'), y: 12 },
      { x: new Date('2024-01-04'), y: 18 },
      { x: new Date('2024-01-05'), y: 22 },
      { x: new Date('2024-01-06'), y: 16 },
      { x: new Date('2024-01-07'), y: 25 },
      { x: new Date('2024-01-08'), y: 20 },
      { x: new Date('2024-01-09'), y: 28 },
      { x: new Date('2024-01-10'), y: 24 },
      { x: new Date('2024-01-11'), y: 30 },
      { x: new Date('2024-01-12'), y: 26 },
    ],
    color: '#688AE8',
  },
  {
    title: 'Site 2',
    type: 'line' as const,
    data: [
      { x: new Date('2024-01-01'), y: 8 },
      { x: new Date('2024-01-02'), y: 12 },
      { x: new Date('2024-01-03'), y: 10 },
      { x: new Date('2024-01-04'), y: 14 },
      { x: new Date('2024-01-05'), y: 18 },
      { x: new Date('2024-01-06'), y: 12 },
      { x: new Date('2024-01-07'), y: 20 },
      { x: new Date('2024-01-08'), y: 16 },
      { x: new Date('2024-01-09'), y: 22 },
      { x: new Date('2024-01-10'), y: 18 },
      { x: new Date('2024-01-11'), y: 24 },
      { x: new Date('2024-01-12'), y: 20 },
    ],
    color: '#C33D69',
  },
];

// Mock data for the bar chart
const barChartData = [
  {
    title: 'Site 1',
    type: 'bar' as const,
    data: [
      { x: 'x1', y: 45 },
      { x: 'x2', y: 65 },
      { x: 'x3', y: 55 },
      { x: 'x4', y: 30 },
      { x: 'x5', y: 52 },
    ],
    color: '#688AE8',
  },
];

// Mock data for the table
const tableItems = [
  {
    id: '1',
    columnHeader1: 'Cell Value',
    columnHeader2: 'Cell Value',
    columnHeader3: 'Cell Value',
    columnHeader4: 'Cell Value',
    columnHeader5: 'Cell Value',
    columnHeader6: 'Cell Value',
    columnHeader7: 'Cell Value',
  },
  {
    id: '2',
    columnHeader1: 'Cell Value',
    columnHeader2: 'Cell Value',
    columnHeader3: 'Cell Value',
    columnHeader4: 'Cell Value',
    columnHeader5: 'Cell Value',
    columnHeader6: 'Cell Value',
    columnHeader7: 'Cell Value',
  },
  {
    id: '3',
    columnHeader1: 'Cell Value',
    columnHeader2: 'Cell Value',
    columnHeader3: 'Cell Value',
    columnHeader4: 'Cell Value',
    columnHeader5: 'Cell Value',
    columnHeader6: 'Cell Value',
    columnHeader7: 'Cell Value',
  },
  {
    id: '4',
    columnHeader1: 'Cell Value',
    columnHeader2: 'Cell Value',
    columnHeader3: 'Cell Value',
    columnHeader4: 'Cell Value',
    columnHeader5: 'Cell Value',
    columnHeader6: 'Cell Value',
    columnHeader7: 'Cell Value',
  },
  {
    id: '5',
    columnHeader1: 'Cell Value',
    columnHeader2: 'Cell Value',
    columnHeader3: 'Cell Value',
    columnHeader4: 'Cell Value',
    columnHeader5: 'Cell Value',
    columnHeader6: 'Cell Value',
    columnHeader7: 'Cell Value',
  },
  {
    id: '6',
    columnHeader1: 'Cell Value',
    columnHeader2: 'Cell Value',
    columnHeader3: 'Cell Value',
    columnHeader4: 'Cell Value',
    columnHeader5: 'Cell Value',
    columnHeader6: 'Cell Value',
    columnHeader7: 'Cell Value',
  },
  {
    id: '7',
    columnHeader1: 'Cell Value',
    columnHeader2: 'Cell Value',
    columnHeader3: 'Cell Value',
    columnHeader4: 'Cell Value',
    columnHeader5: 'Cell Value',
    columnHeader6: 'Cell Value',
    columnHeader7: 'Cell Value',
  },
  {
    id: '8',
    columnHeader1: 'Cell Value',
    columnHeader2: 'Cell Value',
    columnHeader3: 'Cell Value',
    columnHeader4: 'Cell Value',
    columnHeader5: 'Cell Value',
    columnHeader6: 'Cell Value',
    columnHeader7: 'Cell Value',
  },
  {
    id: '9',
    columnHeader1: 'Cell Value',
    columnHeader2: 'Cell Value',
    columnHeader3: 'Cell Value',
    columnHeader4: 'Cell Value',
    columnHeader5: 'Cell Value',
    columnHeader6: 'Cell Value',
    columnHeader7: 'Cell Value',
  },
  {
    id: '10',
    columnHeader1: 'Cell Value',
    columnHeader2: 'Cell Value',
    columnHeader3: 'Cell Value',
    columnHeader4: 'Cell Value',
    columnHeader5: 'Cell Value',
    columnHeader6: 'Cell Value',
    columnHeader7: 'Cell Value',
  },
];

// Table column definitions
const columnDefinitions = [
  {
    id: 'columnHeader1',
    header: 'Column header',
    cell: (item: any) => item.columnHeader1,
    sortingField: 'columnHeader1',
  },
  {
    id: 'columnHeader2',
    header: 'Column header',
    cell: (item: any) => item.columnHeader2,
    sortingField: 'columnHeader2',
  },
  {
    id: 'columnHeader3',
    header: 'Column header',
    cell: (item: any) => item.columnHeader3,
    sortingField: 'columnHeader3',
  },
  {
    id: 'columnHeader4',
    header: 'Column header',
    cell: (item: any) => item.columnHeader4,
    sortingField: 'columnHeader4',
  },
  {
    id: 'columnHeader5',
    header: 'Column header',
    cell: (item: any) => item.columnHeader5,
    sortingField: 'columnHeader5',
  },
  {
    id: 'columnHeader6',
    header: 'Column header',
    cell: (item: any) => item.columnHeader6,
    sortingField: 'columnHeader6',
  },
  {
    id: 'columnHeader7',
    header: 'Column header',
    cell: (item: any) => item.columnHeader7,
    sortingField: 'columnHeader7',
  },
];

export function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<typeof tableItems>([]);
  const [filteringText, setFilteringText] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const appLayout = useRef<AppLayoutProps.Ref>(null);

  const itemsPerPage = 10;
  const filteredItems = tableItems.filter(item =>
    Object.values(item).some(value => value.toString().toLowerCase().includes(filteringText.toLowerCase())),
  );
  const paginatedItems = filteredItems.slice((currentPageIndex - 1) * itemsPerPage, currentPageIndex * itemsPerPage);

  return (
    <CustomAppLayout
      ref={appLayout}
      navigation={<Navigation activeHref="#/network-dashboard" />}
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#' },
            { text: 'Administrative Dashboard', href: '#/network-dashboard' },
          ]}
          expandAriaLabel="Show path"
          ariaLabel="Breadcrumbs"
        />
      }
      content={
        <SpaceBetween size="m">
          {/* Header */}
          <Header
            variant="h1"
            actions={
              <Button variant="primary" iconAlign="right" iconName="refresh" onClick={() => window.location.reload()}>
                Refresh Data
              </Button>
            }
            description="Collection description"
          >
            Administration Dashboard
          </Header>

          {/* Warning Banner */}
          <Flashbar
            items={[
              {
                type: 'warning',
                content: 'This is a warning message',
                dismissible: true,
                id: 'warning-message',
              },
            ]}
          />

          {/* Search and Pagination Controls */}
          <Container>
            <Grid
              gridDefinition={[
                { colspan: { default: 12, xs: 12, s: 8, m: 8, l: 8, xl: 8 } },
                { colspan: { default: 12, xs: 12, s: 4, m: 4, l: 4, xl: 4 } },
              ]}
            >
              <TextFilter
                filteringText={filteringText}
                filteringPlaceholder="Placeholder"
                filteringAriaLabel="Filter data"
                onChange={({ detail }) => {
                  setFilteringText(detail.filteringText);
                  setCurrentPageIndex(1);
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
                <Pagination
                  currentPageIndex={currentPageIndex}
                  onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                  pagesCount={Math.ceil(filteredItems.length / itemsPerPage)}
                  ariaLabels={{
                    nextPageLabel: 'Next page',
                    previousPageLabel: 'Previous page',
                    pageLabel: pageNumber => `Page ${pageNumber}`,
                  }}
                />
                <div style={{ width: '2px', height: '32px', backgroundColor: 'var(--color-border-divider-default)' }} />
                <Button variant="icon" iconName="settings" ariaLabel="Settings" />
              </div>
            </Grid>
          </Container>

          {/* Charts Section */}
          <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
            {/* Line Chart */}
            <Container>
              <LineChart
                series={lineChartData}
                xDomain={[new Date('2024-01-01'), new Date('2024-01-12')]}
                yDomain={[0, 35]}
                xScaleType="time"
                i18nStrings={{
                  filterLabel: 'Filter displayed data',
                  filterPlaceholder: 'Filter data',
                  filterSelectedAriaLabel: 'selected',
                  legendAriaLabel: 'Legend',
                  chartAriaRoleDescription: 'line chart',
                  xTickFormatter: e => e.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                  yTickFormatter: e => e.toString(),
                }}
                ariaLabel="Network performance over time"
                height={300}
                xTitle="X-axis label"
                yTitle="y-axis label"
                hideLegend={false}
              />
            </Container>

            {/* Bar Chart */}
            <Container>
              <BarChart
                series={barChartData}
                xDomain={['x1', 'x2', 'x3', 'x4', 'x5']}
                yDomain={[0, 70]}
                i18nStrings={{
                  filterLabel: 'Filter displayed data',
                  filterPlaceholder: 'Filter data',
                  filterSelectedAriaLabel: 'selected',
                  legendAriaLabel: 'Legend',
                  chartAriaRoleDescription: 'bar chart',
                  xTickFormatter: e => e.toString(),
                  yTickFormatter: e => e.toString(),
                }}
                ariaLabel="Performance metrics by category"
                height={300}
                xTitle="X-axis label"
                yTitle="y-axis label"
                hideLegend={false}
              />
            </Container>
          </Grid>

          {/* Data Table */}
          <Table
            columnDefinitions={columnDefinitions}
            items={paginatedItems}
            selectedItems={selectedItems}
            onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
            selectionType="multi"
            ariaLabels={{
              selectionGroupLabel: 'Data selection',
              allItemsSelectionLabel: ({ selectedItems }) =>
                `${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} selected`,
              itemSelectionLabel: ({ selectedItems }, item) => {
                const isItemSelected = selectedItems.filter(i => i.id === item.id).length;
                return `${item.id} is ${isItemSelected ? '' : 'not '}selected`;
              },
            }}
            trackBy="id"
            variant="full-page"
            stickyHeader={true}
            wrapLines={false}
            stripedRows={false}
            resizableColumns={true}
            empty={
              <Box textAlign="center" color="inherit">
                <Box variant="strong" textAlign="center" color="inherit">
                  No data found
                </Box>
                <Box variant="p" padding={{ bottom: 's' }} color="inherit">
                  Try adjusting your search.
                </Box>
              </Box>
            }
            header={
              <Header
                counter={
                  selectedItems.length > 0
                    ? `(${selectedItems.length}/${filteredItems.length})`
                    : `(${filteredItems.length})`
                }
              >
                Network Data
              </Header>
            }
            pagination={
              <Pagination
                currentPageIndex={currentPageIndex}
                onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                pagesCount={Math.ceil(filteredItems.length / itemsPerPage)}
                ariaLabels={{
                  nextPageLabel: 'Next page',
                  previousPageLabel: 'Previous page',
                  pageLabel: pageNumber => `Page ${pageNumber}`,
                }}
              />
            }
          />
        </SpaceBetween>
      }
      tools={
        <SpaceBetween size="m">
          <Box variant="h3">Help</Box>
          <Box variant="p">
            This dashboard provides network monitoring and administration capabilities. Use the charts to analyze
            performance trends and the table to manage network resources.
          </Box>
        </SpaceBetween>
      }
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      navigationOpen={false}
      toolsWidth={400}
    />
  );
}
