// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Icon from '@cloudscape-design/components/icon';

interface WarningBannerProps {
  message: string;
  onDismiss?: () => void;
}

export function WarningBanner({ message, onDismiss }: WarningBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '13px 34px 13px 33px',
        background: '#FFF4B4',
        border: '1px solid #946C00',
        borderRadius: '4px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Icon name="status-warning" size="normal" />
        <Box color="text-body-secondary" fontSize="body-m">
          {message}
        </Box>
      </div>
      <Button variant="link" onClick={handleDismiss} ariaLabel="Dismiss warning">
        <Box fontSize="body-m" fontWeight="bold" color="text-body-secondary">
          Dismiss
        </Box>
      </Button>
    </div>
  );
}
