// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import FormField from '@cloudscape-design/components/form-field';
import Input from '@cloudscape-design/components/input';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';

interface CitySearchProps {
  onSearch: (cityName: string) => void;
  loading: boolean;
}

export function CitySearch({ onSearch, loading }: CitySearchProps) {
  const [cityName, setCityName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityName.trim()) {
      onSearch(cityName.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && cityName.trim()) {
      onSearch(cityName.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <SpaceBetween direction="horizontal" size="s">
        <FormField stretch>
          <Input
            value={cityName}
            onChange={({ detail }) => setCityName(detail.value)}
            onKeyDown={handleKeyPress}
            placeholder="Search for a city..."
            type="search"
            disabled={loading}
          />
        </FormField>
        <Button variant="primary" loading={loading} disabled={!cityName.trim()}>
          Search
        </Button>
      </SpaceBetween>
    </form>
  );
}
