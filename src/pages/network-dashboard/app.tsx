import { useState } from 'react';
import {
  AppLayout,
  Button,
  Container,
  Grid,
  Header,
  BreadcrumbGroup,
  ContentLayout,
  SpaceBetween,
  Box,
  TextFilter,
  Pagination,
  Table,
  ColumnLayout,
  StatusIndicator,
  Alert,
  Link,
} from '@cloudscape-design/components';
import { NetworkTrafficChart } from './components/network-traffic-chart';
import { CreditUsageChart } from './components/credit-usage-chart';
import { DevicesTable } from './components/devices-table';
import { WarningBanner } from './components/warning-banner';
import { AddDeviceButton } from './components/add-device-button';

const breadcrumbItems = [
  { text: 'Service', href: '#' },
  { text: 'Administrative Dashboard', href: '#' },
];

export function App() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <AppLayout
      navigationHide
      toolsHide
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <BreadcrumbGroup items={breadcrumbItems} />
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

              <Grid
                gridDefinition={[
                  { colspan: { default: 12, xs: 12, s: 8, m: 8, l: 8, xl: 8 } },
                  { colspan: { default: 12, xs: 12, s: 4, m: 4, l: 4, xl: 4 } },
                ]}
              >
                <TextFilter filteringPlaceholder="Placeholder" filteringText="" onChange={() => {}} />
                <Box textAlign="right">
                  <Pagination
                    currentPageIndex={1}
                    pagesCount={5}
                    ariaLabels={{
                      nextPageLabel: 'Next page',
                      previousPageLabel: 'Previous page',
                      pageLabel: pageNumber => `Page ${pageNumber} of all pages`,
                    }}
                  />
                </Box>
              </Grid>
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            {showBanner && <WarningBanner message="This is a warning message" onDismiss={() => setShowBanner(false)} />}

            <ColumnLayout columns={2} borders="vertical">
              <Container>
                <NetworkTrafficChart />
              </Container>
              <Container>
                <CreditUsageChart />
              </Container>
            </ColumnLayout>

            <Container
              header={
                <Header
                  variant="h2"
                  description="Devices on your local network"
                  actions={<AddDeviceButton />}
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
    />
  );
}
