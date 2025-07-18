// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Select from '@cloudscape-design/components/select';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';

export interface ChartSettings {
  networkTrafficType: string;
  networkTrafficTimeRange: string;
  creditUsageType: string;
  creditUsageTimeRange: string;
}

interface ChartControlsProps {
  settings: ChartSettings;
  onSettingsChange: (settings: ChartSettings) => void;
}

const chartTypeOptions = [
  { label: 'Area Chart', value: 'area' },
  { label: 'Line Chart', value: 'line' },
  { label: 'Bar Chart', value: 'bar' },
];

const timeRangeOptions = [
  { label: 'Last 24 Hours', value: 'last24h' },
  { label: 'Last Week', value: 'lastWeek' },
  { label: 'Last Month', value: 'lastMonth' },
  { label: 'Last 3 Months', value: 'last3Months' },
  { label: 'Last 6 Months', value: 'last6Months' },
  { label: 'Last Year', value: 'lastYear' },
];

export default function ChartControls({ settings, onSettingsChange }: ChartControlsProps) {
  const handleNetworkTrafficTypeChange = (value: string) => {
    onSettingsChange({
      ...settings,
      networkTrafficType: value,
    });
  };

  const handleNetworkTrafficTimeRangeChange = (value: string) => {
    onSettingsChange({
      ...settings,
      networkTrafficTimeRange: value,
    });
  };

  const handleCreditUsageTypeChange = (value: string) => {
    onSettingsChange({
      ...settings,
      creditUsageType: value,
    });
  };

  const handleCreditUsageTimeRangeChange = (value: string) => {
    onSettingsChange({
      ...settings,
      creditUsageTimeRange: value,
    });
  };

  return (
    <Container header={<Header variant="h2">Chart Configuration</Header>}>
      <Grid
        gridDefinition={[
          { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
          { colspan: { default: 12, xs: 12, s: 12, m: 6, l: 6, xl: 6 } },
        ]}
      >
        <SpaceBetween size="l">
          <Header variant="h3">Network Traffic Chart</Header>
          <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
            <FormField label="Chart Type">
              <Select
                selectedOption={chartTypeOptions.find(option => option.value === settings.networkTrafficType) || null}
                onChange={({ detail }) => handleNetworkTrafficTypeChange(detail.selectedOption.value!)}
                options={chartTypeOptions}
                placeholder="Select chart type"
              />
            </FormField>
            <FormField label="Time Range">
              <Select
                selectedOption={
                  timeRangeOptions.find(option => option.value === settings.networkTrafficTimeRange) || null
                }
                onChange={({ detail }) => handleNetworkTrafficTimeRangeChange(detail.selectedOption.value!)}
                options={timeRangeOptions}
                placeholder="Select time range"
              />
            </FormField>
          </Grid>
        </SpaceBetween>

        <SpaceBetween size="l">
          <Header variant="h3">Credit Usage Chart</Header>
          <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
            <FormField label="Chart Type">
              <Select
                selectedOption={chartTypeOptions.find(option => option.value === settings.creditUsageType) || null}
                onChange={({ detail }) => handleCreditUsageTypeChange(detail.selectedOption.value!)}
                options={chartTypeOptions}
                placeholder="Select chart type"
              />
            </FormField>
            <FormField label="Time Range">
              <Select
                selectedOption={timeRangeOptions.find(option => option.value === settings.creditUsageTimeRange) || null}
                onChange={({ detail }) => handleCreditUsageTimeRangeChange(detail.selectedOption.value!)}
                options={timeRangeOptions}
                placeholder="Select time range"
              />
            </FormField>
          </Grid>
        </SpaceBetween>
      </Grid>
    </Container>
  );
}
