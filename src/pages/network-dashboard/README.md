# Network Administration Dashboard

## Overview

A fully responsive network administration dashboard built with AWS Cloudscape Design System, following WCAG 2.1 accessibility guidelines.

## Features

### 1. **Dashboard Header**

- Breadcrumb navigation: Service > Administrative Dashboard
- Page title: "Network Administration Dashboard"
- Description: "Network Traffic, Credit Usage, and Your Devices"
- Primary action: "Refresh Data" button with external icon

### 2. **Warning Banner**

- Dismissible warning flashbar
- Accessible with proper ARIA roles
- Yellow background (#FFF4B4) matching design specifications

### 3. **Search & Pagination**

- Text filter with placeholder "Placeholder"
- Real-time filtering of device data
- Responsive pagination control
- Grid layout adapts to screen size

### 4. **Network Traffic Chart (Area Chart)**

- Displays traffic data for Site 1 and Site 2
- Time-series data visualization
- Custom colors matching Figma design:
  - Site 1: #688AE8 (blue)
  - Site 2: #C33D69 (pink)
- Responsive height (300px on desktop, 250px on mobile)
- X-axis: Day
- Y-axis: Traffic values (0-100)
- Performance goal threshold line

### 5. **Credit Usage Chart (Bar Chart)**

- Displays credit usage over 5 days
- Bar visualization
- Color: #688AE8 (blue)
- Responsive height
- X-axis: Day
- Y-axis: Credit values (0-100)

### 6. **My Devices Table**

- Multi-select table with checkboxes
- Columns:
  - Device Name
  - IP Address
  - MAC Address
  - Status (Online/Offline)
  - Device Type (Desktop/Laptop/Server/NAS)
  - Last Seen (date)
  - Bandwidth (Mbps)
- Features:
  - Sortable columns
  - Resizable columns
  - Sticky header
  - Responsive layout
  - Pagination (10 items per page)
- Sample data: 12 devices with varied status

## Accessibility (WCAG 2.1 Compliant)

### Semantic Structure

- Uses semantic HTML elements (`<main>`, `<nav>`, `<section>`)
- Proper heading hierarchy (h1 → h2 → h3)
- Landmark regions for screen readers

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Visible focus indicators (2px outline)
- Tab order follows logical flow
- Arrow keys work in charts and tables

### ARIA Implementation

- `ariaLabel` on all major components
- `ariaRole` for dynamic content
- Descriptive labels for screen readers
- Live regions for chart updates

### Visual Accessibility

- Color contrast ratios meet WCAG AA standards
- Text resizes up to 200% without loss of functionality
- High contrast mode support
- Reduced motion support for users with vestibular disorders

### Assistive Technology

- Screen reader compatible
- All images have descriptive alt text (or are decorative)
- Form inputs have associated labels
- Tables have proper headers and scope

## Responsive Design

### Breakpoints

- **Mobile** (< 576px): Single column layout, compact spacing
- **Tablet** (576px - 992px): Adjusted grid, medium spacing
- **Desktop** (> 992px): Full grid layout, standard spacing

### Responsive Features

- Charts scale fluidly
- Table scrolls horizontally on small screens
- Grid adapts from 2 columns to 1 column
- Search and pagination stack vertically on mobile
- Font sizes adjust for readability
- Touch-friendly targets (min 44x44px)

## Technical Stack

### Components Used

- **@cloudscape-design/components**:
  - AppLayout
  - BreadcrumbGroup
  - Button
  - Container
  - ContentLayout
  - Flashbar
  - Grid
  - Header
  - Pagination
  - Table
  - TextFilter
  - AreaChart
  - BarChart
  - SpaceBetween
  - Box

### Styling

- SCSS with Cloudscape design tokens
- No inline styles
- Flexbox and CSS Grid for layouts
- NO absolute positioning (fully fluid)
- Media queries for responsive behavior

### Data Source

- Sample data generated in component
- Can be connected to `/public/UserDataApi.json`
- Supports real-time filtering and pagination

## File Structure

```
src/pages/network-dashboard/
├── index.tsx              # Main dashboard component
└── README.md             # This file

src/styles/
└── network-dashboard.scss # Dashboard-specific styles

public/
└── UserDataApi.json      # Sample API data
```

## Usage

### Accessing the Dashboard

1. Navigate to the homepage: `/`
2. Find "Network Administration Dashboard" in the Dashboards category
3. Or go directly to: `/network-dashboard`

### Filtering Devices

- Type in the search box to filter by:
  - Device name
  - IP address
  - MAC address

### Selecting Devices

- Click checkboxes to select individual devices
- Use header checkbox to select all visible devices
- Selection count shown in ARIA labels

### Navigation

- Use breadcrumbs to navigate back
- "Refresh Data" button to reload data (currently UI only)
- "Add Device" button to add new devices (currently UI only)

## Future Enhancements

1. **Data Integration**

   - Connect to real API endpoints
   - WebSocket for real-time updates
   - Export functionality

2. **Advanced Features**

   - Device editing and deletion
   - Bulk operations on selected devices
   - Advanced filtering (by status, type, date range)
   - Chart zoom and pan
   - Custom date range selection

3. **Notifications**

   - Real-time alerts for offline devices
   - Bandwidth threshold warnings
   - System status notifications

4. **Preferences**
   - Save user preferences
   - Custom chart colors
   - Table column visibility
   - Items per page setting

## Browser Support

- Chrome (last 3 versions)
- Firefox (last 3 versions)
- Safari (last 3 versions)
- Edge (last 3 versions)

## Performance

- Lazy loading for charts
- Optimized re-renders with React.memo
- Debounced search filtering
- Virtual scrolling for large datasets (future)

## Testing

- Keyboard navigation tested
- Screen reader tested (NVDA, JAWS, VoiceOver)
- Cross-browser tested
- Mobile device tested
- Color contrast validated
- Accessibility audit passed

## License

Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0
