// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import HelpPanel from '@cloudscape-design/components/help-panel';
import Box from '@cloudscape-design/components/box';
import Link from '@cloudscape-design/components/link';

export function ToolsContent() {
  return (
    <HelpPanel
      header={<h2>Weather App</h2>}
      footer={
        <Box>
          <h3>Learn more</h3>
          <ul>
            <li>
              <Link external href="https://open-meteo.com/">
                Open-Meteo API Documentation
              </Link>
            </li>
            <li>
              <Link external href="https://cloudscape.design/">
                Cloudscape Design System
              </Link>
            </li>
          </ul>
        </Box>
      }
    >
      <Box variant="p">
        This weather application demonstrates how to integrate with the Open-Meteo API to display current weather
        conditions and forecasts.
      </Box>

      <Box variant="h3">Features</Box>
      <ul>
        <li>Search weather by city name or coordinates</li>
        <li>Current weather conditions with temperature, humidity, and wind</li>
        <li>24-hour hourly forecast</li>
        <li>7-day daily forecast</li>
        <li>Automatic location detection support</li>
      </ul>

      <Box variant="h3">Data Source</Box>
      <Box variant="p">Weather data is provided by Open-Meteo, a free weather API that offers:</Box>
      <ul>
        <li>High-resolution weather forecasts</li>
        <li>Historical weather data</li>
        <li>No API key required</li>
        <li>Open-source and free for non-commercial use</li>
      </ul>

      <Box variant="h3">Usage Tips</Box>
      <ul>
        <li>Enter city names in the format "City, Country" for best results</li>
        <li>Coordinates should be in decimal degrees format</li>
        <li>Use the refresh button to get the latest weather data</li>
        <li>All temperatures are displayed in Celsius</li>
        <li>Wind speeds are shown in kilometers per hour</li>
      </ul>
    </HelpPanel>
  );
}
