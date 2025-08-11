import React, { useState } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Grid from '@cloudscape-design/components/grid';
import Box from '@cloudscape-design/components/box';
import FormField from '@cloudscape-design/components/form-field';
import Select from '@cloudscape-design/components/select';
import Input from '@cloudscape-design/components/input';
import Checkbox from '@cloudscape-design/components/checkbox';
import Button from '@cloudscape-design/components/button';
import ExpandableSection from '@cloudscape-design/components/expandable-section';
import { AlertBanner, AlertBannerSeverity, AlertBannerVariant } from '../../components/AlertBanner';

export default function AlertBannerDemo() {
  const [severity, setSeverity] = useState<AlertBannerSeverity>('info');
  const [variant, setVariant] = useState<AlertBannerVariant>('filled');
  const [title, setTitle] = useState('Sample Title');
  const [description, setDescription] = useState('This is a sample description for the alert banner component.');
  const [showDescription, setShowDescription] = useState(true);
  const [showCloseButton, setShowCloseButton] = useState(true);
  const [customContent, setCustomContent] = useState('');

  const severityOptions = [
    { label: 'Error', value: 'error' },
    { label: 'Warning', value: 'warning' },
    { label: 'Info', value: 'info' },
    { label: 'Success', value: 'success' }
  ];

  const variantOptions = [
    { label: 'Filled', value: 'filled' },
    { label: 'Outlined', value: 'outlined' },
    { label: 'Standard', value: 'standard' }
  ];

  const handleClose = () => {
    console.log('Alert banner closed');
  };

  return (
    <AppLayout
      navigationHide
      toolsHide
      content={
        <ContentLayout
          header={
            <Header
              variant="h1"
              description="Interactive demo of the AlertBanner component with different configurations and variants."
            >
              AlertBanner Component Demo
            </Header>
          }
        >
          <SpaceBetween size="l">
            {/* Live Preview */}
            <Container header={<Header variant="h2">Live Preview</Header>}>
              <SpaceBetween size="m">
                <AlertBanner
                  severity={severity}
                  variant={variant}
                  title={title}
                  description={showDescription ? description : undefined}
                  showDescription={showDescription}
                  onClose={showCloseButton ? handleClose : undefined}
                >
                  {customContent && <div>{customContent}</div>}
                </AlertBanner>
              </SpaceBetween>
            </Container>

            {/* Configuration Controls */}
            <Container header={<Header variant="h2">Configuration</Header>}>
              <SpaceBetween size="m">
                <Grid
                  gridDefinition={[
                    { colspan: { default: 12, xs: 12, s: 6, m: 4, l: 3, xl: 3 } },
                    { colspan: { default: 12, xs: 12, s: 6, m: 4, l: 3, xl: 3 } },
                    { colspan: { default: 12, xs: 12, s: 6, m: 4, l: 3, xl: 3 } },
                    { colspan: { default: 12, xs: 12, s: 6, m: 4, l: 3, xl: 3 } }
                  ]}
                >
                  <FormField label="Severity">
                    <Select
                      selectedOption={{ label: severity, value: severity }}
                      onChange={({ detail }) => setSeverity(detail.selectedOption.value as AlertBannerSeverity)}
                      options={severityOptions}
                    />
                  </FormField>

                  <FormField label="Variant">
                    <Select
                      selectedOption={{ label: variant, value: variant }}
                      onChange={({ detail }) => setVariant(detail.selectedOption.value as AlertBannerVariant)}
                      options={variantOptions}
                    />
                  </FormField>

                  <FormField label="Options">
                    <SpaceBetween size="s">
                      <Checkbox
                        checked={showDescription}
                        onChange={({ detail }) => setShowDescription(detail.checked)}
                      >
                        Show Description
                      </Checkbox>
                      <Checkbox
                        checked={showCloseButton}
                        onChange={({ detail }) => setShowCloseButton(detail.checked)}
                      >
                        Show Close Button
                      </Checkbox>
                    </SpaceBetween>
                  </FormField>
                </Grid>

                <Grid
                  gridDefinition={[
                    { colspan: { default: 12, xs: 12, s: 6, m: 6, l: 6, xl: 6 } },
                    { colspan: { default: 12, xs: 12, s: 6, m: 6, l: 6, xl: 6 } }
                  ]}
                >
                  <FormField label="Title">
                    <Input
                      value={title}
                      onChange={({ detail }) => setTitle(detail.value)}
                      placeholder="Enter alert title"
                    />
                  </FormField>

                  <FormField label="Description">
                    <Input
                      value={description}
                      onChange={({ detail }) => setDescription(detail.value)}
                      placeholder="Enter alert description"
                    />
                  </FormField>
                </Grid>

                <FormField label="Custom Content" description="Additional content to display in the alert">
                  <Input
                    value={customContent}
                    onChange={({ detail }) => setCustomContent(detail.value)}
                    placeholder="Enter custom content (optional)"
                  />
                </FormField>
              </SpaceBetween>
            </Container>

            {/* All Variants Showcase */}
            <ExpandableSection
              headerText="All Variants Showcase"
              defaultExpanded={false}
            >
              <SpaceBetween size="l">
                {/* Filled Variants */}
                <Container header={<Header variant="h3">Filled Variants</Header>}>
                  <SpaceBetween size="m">
                    <AlertBanner
                      severity="error"
                      variant="filled"
                      title="Error Alert"
                      description="This is an error message in filled variant."
                      onClose={handleClose}
                    />
                    <AlertBanner
                      severity="warning"
                      variant="filled"
                      title="Warning Alert"
                      description="This is a warning message in filled variant."
                      onClose={handleClose}
                    />
                    <AlertBanner
                      severity="info"
                      variant="filled"
                      title="Info Alert"
                      description="This is an info message in filled variant."
                      onClose={handleClose}
                    />
                    <AlertBanner
                      severity="success"
                      variant="filled"
                      title="Success Alert"
                      description="This is a success message in filled variant."
                      onClose={handleClose}
                    />
                  </SpaceBetween>
                </Container>

                {/* Outlined Variants */}
                <Container header={<Header variant="h3">Outlined Variants</Header>}>
                  <SpaceBetween size="m">
                    <AlertBanner
                      severity="error"
                      variant="outlined"
                      title="Error Alert"
                      description="This is an error message in outlined variant."
                      onClose={handleClose}
                    />
                    <AlertBanner
                      severity="warning"
                      variant="outlined"
                      title="Warning Alert"
                      description="This is a warning message in outlined variant."
                      onClose={handleClose}
                    />
                    <AlertBanner
                      severity="info"
                      variant="outlined"
                      title="Info Alert"
                      description="This is an info message in outlined variant."
                      onClose={handleClose}
                    />
                    <AlertBanner
                      severity="success"
                      variant="outlined"
                      title="Success Alert"
                      description="This is a success message in outlined variant."
                      onClose={handleClose}
                    />
                  </SpaceBetween>
                </Container>

                {/* Standard Variants */}
                <Container header={<Header variant="h3">Standard Variants</Header>}>
                  <SpaceBetween size="m">
                    <AlertBanner
                      severity="error"
                      variant="standard"
                      title="Error Alert"
                      description="This is an error message in standard variant."
                      onClose={handleClose}
                    />
                    <AlertBanner
                      severity="warning"
                      variant="standard"
                      title="Warning Alert"
                      description="This is a warning message in standard variant."
                      onClose={handleClose}
                    />
                    <AlertBanner
                      severity="info"
                      variant="standard"
                      title="Info Alert"
                      description="This is an info message in standard variant."
                      onClose={handleClose}
                    />
                    <AlertBanner
                      severity="success"
                      variant="standard"
                      title="Success Alert"
                      description="This is a success message in standard variant."
                      onClose={handleClose}
                    />
                  </SpaceBetween>
                </Container>

                {/* Variations */}
                <Container header={<Header variant="h3">Content Variations</Header>}>
                  <SpaceBetween size="m">
                    <AlertBanner
                      severity="info"
                      variant="filled"
                      title="Title Only"
                      showDescription={false}
                      onClose={handleClose}
                    />
                    <AlertBanner
                      severity="warning"
                      variant="outlined"
                      description="Description only, no title displayed."
                      onClose={handleClose}
                    />
                    <AlertBanner
                      severity="success"
                      variant="standard"
                      title="With Custom Content"
                      description="This alert includes additional custom content below."
                    >
                      <Box margin={{ top: 's' }}>
                        <Button variant="primary" size="small">
                          Take Action
                        </Button>
                      </Box>
                    </AlertBanner>
                    <AlertBanner
                      severity="error"
                      variant="filled"
                      title="No Close Button"
                      description="This alert cannot be dismissed by the user."
                    />
                  </SpaceBetween>
                </Container>
              </SpaceBetween>
            </ExpandableSection>

            {/* Usage Information */}
            <Container header={<Header variant="h2">Usage Information</Header>}>
              <SpaceBetween size="m">
                <Box variant="h3">Properties</Box>
                <Box>
                  <ul>
                    <li><strong>severity</strong>: 'error' | 'warning' | 'info' | 'success' - The type of alert</li>
                    <li><strong>variant</strong>: 'filled' | 'outlined' | 'standard' - Visual style variant</li>
                    <li><strong>title</strong>: string - Optional title text</li>
                    <li><strong>description</strong>: string - Optional description text</li>
                    <li><strong>showTitle</strong>: boolean - Whether to display the title</li>
                    <li><strong>showDescription</strong>: boolean - Whether to display the description</li>
                    <li><strong>onClose</strong>: function - Callback when close button is clicked</li>
                    <li><strong>className</strong>: string - Additional CSS classes</li>
                    <li><strong>children</strong>: ReactNode - Custom content to display</li>
                  </ul>
                </Box>

                <Box variant="h3">Accessibility Features</Box>
                <Box>
                  <ul>
                    <li>ARIA role="alert" for immediate announcement to screen readers</li>
                    <li>ARIA live region with polite setting for non-disruptive updates</li>
                    <li>Keyboard-accessible close button with proper focus indicators</li>
                    <li>High contrast color combinations for better visibility</li>
                    <li>Semantic HTML structure for proper navigation</li>
                  </ul>
                </Box>

                <Box variant="h3">Best Practices</Box>
                <Box>
                  <ul>
                    <li>Use appropriate severity levels to match the message importance</li>
                    <li>Keep titles concise and descriptions clear and actionable</li>
                    <li>Provide a close button for dismissible alerts</li>
                    <li>Use filled variant for high-priority alerts</li>
                    <li>Use outlined or standard variants for less critical information</li>
                    <li>Test with screen readers to ensure accessibility</li>
                  </ul>
                </Box>
              </SpaceBetween>
            </Container>
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
