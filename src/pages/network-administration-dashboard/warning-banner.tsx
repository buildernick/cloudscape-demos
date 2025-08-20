// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Icon from '@cloudscape-design/components/icon';

export interface WarningBannerProps {
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
  const getIconName = () => {
    switch (type) {
      case 'error': return 'status-negative';
      case 'warning': return 'status-warning';
      case 'info': return 'status-info';
      default: return 'status-warning';
    }
  };

  return (
    <div className={`warning-banner ${type}`}>
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
