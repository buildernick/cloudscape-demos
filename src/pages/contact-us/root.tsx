// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useRef, useState } from 'react';
import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Form from '@cloudscape-design/components/form';
import FormField from '@cloudscape-design/components/form-field';
import Input from '@cloudscape-design/components/input';
import Textarea from '@cloudscape-design/components/textarea';
import Select from '@cloudscape-design/components/select';
import Button from '@cloudscape-design/components/button';
import Alert from '@cloudscape-design/components/alert';
import Box from '@cloudscape-design/components/box';

import { CustomAppLayout, Navigation, Notifications } from '../commons/common-components';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  priority: { label: string; value: string } | null;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  priority?: string;
}

const subjectOptions = [
  { label: 'General inquiry', value: 'general' },
  { label: 'Technical support', value: 'technical' },
  { label: 'Feature request', value: 'feature' },
  { label: 'Bug report', value: 'bug' },
  { label: 'Partnership', value: 'partnership' },
  { label: 'Other', value: 'other' },
];

const Breadcrumbs = () => (
  <BreadcrumbGroup
    items={[
      { text: 'Home', href: '/' },
      { text: 'Contact us', href: '/contact-us' },
    ]}
    expandAriaLabel="Show path"
    ariaLabel="Breadcrumbs"
  />
);

function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: null,
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    if (!formData.priority) {
      newErrors.priority = 'Priority is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        priority: null,
      });
      setErrors({});
    } catch (error) {
      console.error('Failed to submit form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Container>
      <SpaceBetween size="l">
        <Header variant="h1">Contact us</Header>

        <Box variant="p">
          We'd love to hear from you! Whether you have a question about features, need technical support, or want to
          share feedback, our team is ready to help.
        </Box>

        {submitSuccess && (
          <Alert
            type="success"
            dismissible
            onDismiss={() => setSubmitSuccess(false)}
            header="Message sent successfully"
          >
            Thank you for contacting us! We'll get back to you as soon as possible.
          </Alert>
        )}

        <Form
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button
                variant="link"
                onClick={() => {
                  setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                    priority: null,
                  });
                  setErrors({});
                }}
              >
                Clear
              </Button>
              <Button variant="primary" loading={isSubmitting} onClick={handleSubmit}>
                Send message
              </Button>
            </SpaceBetween>
          }
        >
          <SpaceBetween size="l">
            <FormField label="Name" errorText={errors.name} constraintText="Your full name">
              <Input
                value={formData.name}
                onChange={({ detail }) => handleInputChange('name', detail.value)}
                placeholder="Enter your full name"
                invalid={!!errors.name}
              />
            </FormField>

            <FormField
              label="Email address"
              errorText={errors.email}
              constraintText="We'll use this to respond to your inquiry"
            >
              <Input
                value={formData.email}
                onChange={({ detail }) => handleInputChange('email', detail.value)}
                placeholder="Enter your email address"
                type="email"
                invalid={!!errors.email}
              />
            </FormField>

            <FormField label="Priority" errorText={errors.priority} constraintText="How urgent is your inquiry?">
              <Select
                selectedOption={formData.priority}
                onChange={({ detail }) => handleInputChange('priority', detail.selectedOption)}
                options={subjectOptions}
                placeholder="Select priority level"
                invalid={!!errors.priority}
              />
            </FormField>

            <FormField label="Subject" errorText={errors.subject} constraintText="Brief description of your inquiry">
              <Input
                value={formData.subject}
                onChange={({ detail }) => handleInputChange('subject', detail.value)}
                placeholder="Enter subject"
                invalid={!!errors.subject}
              />
            </FormField>

            <FormField
              label="Message"
              errorText={errors.message}
              constraintText="Please provide details about your inquiry (minimum 10 characters)"
            >
              <Textarea
                value={formData.message}
                onChange={({ detail }) => handleInputChange('message', detail.value)}
                placeholder="Enter your message here..."
                rows={6}
                invalid={!!errors.message}
              />
            </FormField>
          </SpaceBetween>
        </Form>
      </SpaceBetween>
    </Container>
  );
}

export function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef<AppLayoutProps.Ref>(null);

  return (
    <CustomAppLayout
      ref={appLayout}
      navigation={<Navigation activeHref="#/contact-us" />}
      notifications={<Notifications />}
      breadcrumbs={<Breadcrumbs />}
      content={
        <ContentLayout>
          <ContactForm />
        </ContentLayout>
      }
      contentType="form"
      toolsHide
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
    />
  );
}
