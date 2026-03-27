// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';

interface AlertBannerProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  dismissible?: boolean;
  onDismiss?: () => void;
  children: React.ReactNode;
}

export default function AlertBanner({ type = 'info', dismissible = false, onDismiss, children }: AlertBannerProps) {
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#d1fae5';
      case 'warning':
        return '#fef3c7';
      case 'error':
        return '#fee2e2';
      default:
        return '#dbeafe';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return '#10b981';
      case 'warning':
        return '#f59e0b';
      case 'error':
        return '#ef4444';
      default:
        return '#3b82f6';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return '#059669';
      case 'warning':
        return '#d97706';
      case 'error':
        return '#dc2626';
      default:
        return '#2563eb';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8C0 12.42 3.58 16 8 16C12.42 16 16 12.42 16 8C16 3.58 12.42 0 8 0ZM6.5 11.5L3 8L4.41 6.59L6.5 8.67L11.59 3.58L13 5L6.5 11.5Z"
              fill={getIconColor()}
            />
          </svg>
        );
      case 'warning':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.86603 1.5C8.48113 0.833333 7.51887 0.833333 7.13397 1.5L0.535898 13.5C0.150998 14.1667 0.632122 15 1.40192 15H14.5981C15.3679 15 15.849 14.1667 15.4641 13.5L8.86603 1.5ZM8 5C8.55228 5 9 5.44772 9 6V9C9 9.55228 8.55228 10 8 10C7.44772 10 7 9.55228 7 9V6C7 5.44772 7.44772 5 8 5ZM8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13Z"
              fill={getIconColor()}
            />
          </svg>
        );
      case 'error':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8C0 12.42 3.58 16 8 16C12.42 16 16 12.42 16 8C16 3.58 12.42 0 8 0ZM4.29 4.29C4.68 3.9 5.31 3.9 5.7 4.29L8 6.59L10.29 4.29C10.68 3.9 11.31 3.9 11.7 4.29C12.09 4.68 12.09 5.31 11.7 5.7L9.41 8L11.7 10.29C12.09 10.68 12.09 11.31 11.7 11.7C11.31 12.09 10.68 12.09 10.29 11.7L8 9.41L5.7 11.7C5.31 12.09 4.68 12.09 4.29 11.7C3.9 11.31 3.9 10.68 4.29 10.29L6.59 8L4.29 5.7C3.9 5.31 3.9 4.68 4.29 4.29Z"
              fill={getIconColor()}
            />
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8C0 12.42 3.58 16 8 16C12.42 16 16 12.42 16 8C16 3.58 12.42 0 8 0ZM8 4C8.55 4 9 4.45 9 5V9C9 9.55 8.55 10 8 10C7.45 10 7 9.55 7 9V5C7 4.45 7.45 4 8 4ZM8 13C8.55 13 9 12.55 9 12C9 11.45 8.55 11 8 11C7.45 11 7 11.45 7 12C7 12.55 7.45 13 8 13Z"
              fill={getIconColor()}
            />
          </svg>
        );
    }
  };

  return (
    <Box
      padding="m"
      margin={{ bottom: 's' }}
      style={{
        backgroundColor: getBackgroundColor(),
        border: `1px solid ${getBorderColor()}`,
        borderRadius: '8px',
      }}
    >
      <SpaceBetween direction="horizontal" size="s" alignItems="center">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
          {getIcon()}
          <Box variant="span" color="inherit">
            {children}
          </Box>
        </div>
        {dismissible && onDismiss && (
          <Button variant="link" onClick={onDismiss} ariaLabel="Dismiss alert">
            Dismiss
          </Button>
        )}
      </SpaceBetween>
    </Box>
  );
}
