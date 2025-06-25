// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Icon from '@cloudscape-design/components/icon';
import SpaceBetween from '@cloudscape-design/components/space-between';

interface AlertBannerProps {
  type?: 'warning' | 'info' | 'error' | 'success';
  dismissible?: boolean;
  onDismiss?: () => void;
  children: React.ReactNode;
}

export function AlertBanner({ type = 'warning', dismissible = false, onDismiss, children }: AlertBannerProps) {
  const getIconName = () => {
    switch (type) {
      case 'warning':
        return 'status-warning';
      case 'error':
        return 'status-negative';
      case 'success':
        return 'status-positive';
      case 'info':
      default:
        return 'status-info';
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'warning':
        return '#FFF4B4';
      case 'error':
        return '#FFEAEA';
      case 'success':
        return '#EAFAF1';
      case 'info':
      default:
        return '#E8F4FD';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'warning':
        return '#946C00';
      case 'error':
        return '#D91515';
      case 'success':
        return '#037F0C';
      case 'info':
      default:
        return '#0972D3';
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        padding: '13px 34px 13px 33px',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        border: '1px solid #000',
        backgroundColor: getBackgroundColor(),
        width: '100%',
      }}
    >
      <SpaceBetween direction="horizontal" size="xs" alignItems="center">
        <Icon name={getIconName()} size="normal" />
        <Box color="inherit" fontSize="body-m" fontWeight="normal">
          <span style={{ color: getTextColor(), fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}>
            {children}
          </span>
        </Box>
      </SpaceBetween>
      {dismissible && onDismiss && (
        <Button variant="inline-link" onClick={onDismiss}>
          <span style={{ color: getTextColor(), fontWeight: '600' }}>Dismiss</span>
        </Button>
      )}
    </div>
  );
}
