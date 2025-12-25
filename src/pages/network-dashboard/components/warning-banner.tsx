// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Icon from '@cloudscape-design/components/icon';

interface WarningBannerProps {
  message: string;
  onDismiss: () => void;
  dismissText?: string;
}

export function WarningBanner({ message, onDismiss, dismissText = 'Dismiss' }: WarningBannerProps) {
  return (
    <Box
      padding="m"
      margin={{ bottom: 'm' }}
      backgroundColor="background-notification-warning"
      color="text-status-warning"
    >
      <SpaceBetween size="s" direction="horizontal" alignItems="center">
        <Icon name="status-warning" variant="warning" />
        <Box variant="span" fontWeight="normal">
          {message}
        </Box>
        <Button variant="link" onClick={onDismiss} ariaLabel={`${dismissText} warning`}>
          {dismissText}
        </Button>
      </SpaceBetween>
    </Box>
  );
}
