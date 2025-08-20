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
  dismissible?: boolean;
  type?: 'warning' | 'error' | 'info';
}

export default function WarningBanner({ 
  message, 
  onDismiss, 
  dismissible = true, 
  type = 'warning' 
}: WarningBannerProps) {
  const getBackgroundColor = () => {
    switch (type) {
      case 'error': return '#d02;
      case 'warning': return '#FFF4B4';
      case 'info': return '#e1f5fe';
      default: return '#FFF4B4';
    }
  };

  const getIconName = () => {
    switch (type) {
      case 'error': return 'status-negative';
      case 'warning': return 'status-warning';
      case 'info': return 'status-info';
      default: return 'status-warning';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'error': return '#fff';
      case 'warning': return '#946C00';
      case 'info': return '#1976d2';
      default: return '#946C00';
    }
  };

  return (
    <Box
      padding="s"
      margin={{ bottom: 'm' }}
      borderRadius="12px"
      backgroundColor={getBackgroundColor()}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <SpaceBetween direction="horizontal" size="s" alignItems="center">
        <Icon name={getIconName()} size="medium" />
        <Box color={getTextColor()} fontSize="body-m">
          {message}
        </Box>
      </SpaceBetween>
      
      {dismissible && (
        <SpaceBetween direction="horizontal" size="s">
          <Button variant="link" onClick={onDismiss}>
            Dismiss
          </Button>
          <Button 
            variant="icon" 
            iconName="close"
            onClick={onDismiss}
            ariaLabel="Close warning banner"
          />
        </SpaceBetween>
      )}
    </Box>
  );
}