// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { CityInfo } from '../app';

interface RecentCitiesProps {
  cities: CityInfo[];
  onCitySelect: (city: CityInfo) => void;
}

export function RecentCities({ cities, onCitySelect }: RecentCitiesProps) {
  if (cities.length === 0) {
    return null;
  }

  return (
    <SpaceBetween size="s">
      <Box variant="h3">Recent Cities</Box>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {cities.map((city, index) => (
          <Button key={`${city.name}-${city.country}-${index}`} variant="normal" onClick={() => onCitySelect(city)}>
            {city.name}
            {city.country && `, ${city.country}`}
          </Button>
        ))}
      </div>
    </SpaceBetween>
  );
}
