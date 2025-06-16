// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import SpaceBetween from '@cloudscape-design/components/space-between';
import FormField from '@cloudscape-design/components/form-field';
import Input from '@cloudscape-design/components/input';
import Button from '@cloudscape-design/components/button';
import Grid from '@cloudscape-design/components/grid';
import { LocationData } from '../types';
import { fetchLocationCoordinates } from '../services/weather-service';

interface LocationInputProps {
  onLocationSubmit: (location: LocationData) => void;
  loading: boolean;
}

export function LocationInput({ onLocationSubmit, loading }: LocationInputProps) {
  const [cityInput, setCityInput] = useState('');
  const [latInput, setLatInput] = useState('');
  const [lngInput, setLngInput] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);

  const handleCitySearch = async () => {
    if (!cityInput.trim()) {
      setInputError('Please enter a city name');
      return;
    }

    setSearchLoading(true);
    setInputError(null);

    try {
      const locationData = await fetchLocationCoordinates(cityInput.trim());
      onLocationSubmit(locationData);
      setCityInput('');
    } catch (error) {
      setInputError(error instanceof Error ? error.message : 'Failed to find location');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleCoordinatesSubmit = () => {
    const lat = parseFloat(latInput);
    const lng = parseFloat(lngInput);

    if (isNaN(lat) || isNaN(lng)) {
      setInputError('Please enter valid latitude and longitude values');
      return;
    }

    if (lat < -90 || lat > 90) {
      setInputError('Latitude must be between -90 and 90');
      return;
    }

    if (lng < -180 || lng > 180) {
      setInputError('Longitude must be between -180 and 180');
      return;
    }

    setInputError(null);
    const locationData: LocationData = {
      name: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
      latitude: lat,
      longitude: lng,
    };

    onLocationSubmit(locationData);
    setLatInput('');
    setLngInput('');
  };

  return (
    <SpaceBetween size="l">
      <Grid gridDefinition={[{ colspan: { default: 12, xs: 12, s: 8, m: 6, l: 4 } }]}>
        <FormField
          label="Search by city name"
          description="Enter a city name to get weather data"
          errorText={inputError}
        >
          <SpaceBetween direction="horizontal" size="xs">
            <Input
              value={cityInput}
              onChange={({ detail }) => {
                setCityInput(detail.value);
                setInputError(null);
              }}
              placeholder="e.g., San Francisco, London, Tokyo"
              disabled={loading || searchLoading}
            />
            <Button
              onClick={handleCitySearch}
              loading={searchLoading}
              disabled={loading || !cityInput.trim()}
              variant="primary"
            >
              Search
            </Button>
          </SpaceBetween>
        </FormField>
      </Grid>

      <Grid
        gridDefinition={[
          { colspan: { default: 12, xs: 12, s: 4, m: 3, l: 2 } },
          { colspan: { default: 12, xs: 12, s: 4, m: 3, l: 2 } },
          { colspan: { default: 12, xs: 12, s: 4, m: 3, l: 2 } },
        ]}
      >
        <FormField label="Latitude" description="Latitude coordinate (-90 to 90)">
          <Input
            value={latInput}
            onChange={({ detail }) => {
              setLatInput(detail.value);
              setInputError(null);
            }}
            placeholder="37.7749"
            disabled={loading || searchLoading}
            type="number"
          />
        </FormField>

        <FormField label="Longitude" description="Longitude coordinate (-180 to 180)">
          <Input
            value={lngInput}
            onChange={({ detail }) => {
              setLngInput(detail.value);
              setInputError(null);
            }}
            placeholder="-122.4194"
            disabled={loading || searchLoading}
            type="number"
          />
        </FormField>

        <FormField label=" " description=" ">
          <Button
            onClick={handleCoordinatesSubmit}
            disabled={loading || searchLoading || !latInput || !lngInput}
            variant="normal"
          >
            Get Weather
          </Button>
        </FormField>
      </Grid>
    </SpaceBetween>
  );
}
