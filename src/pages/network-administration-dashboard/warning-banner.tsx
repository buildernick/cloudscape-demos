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
  const getBannerStyles = () => {
    const baseStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '13px 34px 13px 33px',
      borderRadius: '12px',
      border: '1px solid #000',
      marginBottom: '16px',
      boxShadow: 'rgba(0, 7, 22, 0.1) 0px 4px 8px 0px'
    };

    switch (type) {
      case 'error':
        return {
          ...baseStyles,
          backgroundColor: 'rgba(208, 2, 27, 1)',
          color: '#fff'
        };
      case 'warning':
        return {
          ...baseStyles,
          backgroundColor: '#FFF4B4',
          color: '#946C00'
        };
      case 'info':
        return {
          ...baseStyles,
          backgroundColor: '#e1f5fe',
          color: '#1976d2'
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: '#FFF4B4',
          color: '#946C00'
        };
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

  const bannerStyles = getBannerStyles();

  return (
    <div style={bannerStyles}>
      <SpaceBetween direction="horizontal" size="s" alignItems="center">
        <Icon name={getIconName()} />
        <Box fontSize="body-m">
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
    </div>
  );
}
