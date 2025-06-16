# Weather App

A comprehensive weather application built with Cloudscape Design System components and the Open-Meteo API.

## Features

- **Current Weather**: Real-time weather conditions including temperature, humidity, wind speed, and more
- **Location Search**: Search by city name or enter coordinates directly
- **Hourly Forecast**: 24-hour detailed forecast
- **Daily Forecast**: 7-day weather outlook
- **Responsive Design**: Optimized for all screen sizes using Cloudscape components

## Components

- `WeatherContent`: Main container component that orchestrates the weather app
- `LocationInput`: Handles user input for city names or coordinates
- `CurrentWeather`: Displays current weather conditions
- `WeatherForecast`: Shows hourly and daily forecasts in tabbed interface
- `ToolsContent`: Help panel with usage instructions and API information

## Data Source

Weather data is provided by [Open-Meteo](https://open-meteo.com/), a free weather API that offers:

- High-resolution weather forecasts
- No API key required
- Free for non-commercial use
- Global coverage with local weather models

## API Integration

The app uses two main Open-Meteo endpoints:

1. **Weather Forecast API**: `https://api.open-meteo.com/v1/forecast`

   - Current conditions
   - Hourly forecasts (24 hours)
   - Daily forecasts (7 days)

2. **Geocoding API**: `https://geocoding-api.open-meteo.com/v1/search`
   - Converts city names to coordinates
   - Location lookup and validation

## Usage

1. Navigate to `/weather` in the application
2. Enter a city name or coordinates
3. View current conditions and forecasts
4. Use the refresh button to update data
5. Access help information via the info button

## Technical Details

- Built with TypeScript for type safety
- Uses React hooks for state management
- Implements proper error handling and loading states
- Follows Cloudscape Design System patterns
- Responsive grid layout
- Accessible design with ARIA labels

## Dependencies

- React 18+
- Cloudscape Design System components
- TypeScript
- Native fetch API for HTTP requests
