// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Icon from '@cloudscape-design/components/icon';
import SpaceBetween from '@cloudscape-design/components/space-between';

interface WarningMessageProps {
  message: string;
  onDismiss?: () => void;
}

export default function WarningMessage({ message, onDismiss }: WarningMessageProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Box padding="m" backgroundColor="background-status-warning" borderRadius="normal" border="status-warning">
      <SpaceBetween direction="horizontal" size="s" alignItems="center">
        <Icon name="status-warning" size="medium" variant="warning" />
        <Box variant="span" fontWeight="normal" color="text-status-warning">
          {message}
        </Box>
        <Button variant="icon" iconName="close" ariaLabel="Dismiss warning" onClick={handleDismiss} />
      </SpaceBetween>
    </Box>
  );
}
