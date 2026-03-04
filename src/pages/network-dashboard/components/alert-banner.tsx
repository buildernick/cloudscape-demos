// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Icon from '@cloudscape-design/components/icon';
import SpaceBetween from '@cloudscape-design/components/space-between';

interface AlertBannerProps {
  type?: 'warning' | 'error' | 'success' | 'info';
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  dismissLabel?: string;
}

export function AlertBanner({
  type = 'warning',
  message,
  dismissible = false,
  onDismiss,
  dismissLabel = 'Dismiss',
}: AlertBannerProps) {
  const getBackgroundColor = () => {
    switch (type) {
      case 'warning':
        return '#FFF4B4';
      case 'error':
        return '#FFEAEA';
      case 'success':
        return '#EAFAF1';
      case 'info':
        return '#E7F3FF';
      default:
        return '#FFF4B4';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'warning':
        return '#946C00';
      case 'error':
        return '#D13313';
      case 'success':
        return '#037F0C';
      case 'info':
        return '#0972D3';
      default:
        return '#946C00';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'warning':
        return '#946C00';
      case 'error':
        return '#D13313';
      case 'success':
        return '#037F0C';
      case 'info':
        return '#0972D3';
      default:
        return '#946C00';
    }
  };

  const getIconName = () => {
    switch (type) {
      case 'warning':
        return 'status-warning';
      case 'error':
        return 'status-negative';
      case 'success':
        return 'status-positive';
      case 'info':
        return 'status-info';
      default:
        return 'status-warning';
    }
  };

  return (
    <Box
      padding="m"
      style={{
        backgroundColor: getBackgroundColor(),
        border: `1px solid ${getBorderColor()}`,
        borderRadius: '8px',
      }}
    >
      <SpaceBetween direction="horizontal" size="s" alignItems="center">
        <SpaceBetween direction="horizontal" size="s" alignItems="center">
          <Icon name={getIconName()} size="normal" variant="normal" />
          <Box fontSize="body-m" fontWeight="normal" color={getTextColor()}>
            {message}
          </Box>
        </SpaceBetween>
        {dismissible && onDismiss && (
          <Button
            variant="inline-link"
            onClick={onDismiss}
            fontSize="body-m"
            fontWeight="bold"
            style={{ color: getTextColor() }}
          >
            {dismissLabel}
          </Button>
        )}
      </SpaceBetween>
    </Box>
  );
}
