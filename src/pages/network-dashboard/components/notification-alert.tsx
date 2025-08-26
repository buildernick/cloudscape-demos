// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Icon from '@cloudscape-design/components/icon';
import SpaceBetween from '@cloudscape-design/components/space-between';

export function NotificationAlert() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return null;
  }

  return (
    <div className="notification-alert">
      <SpaceBetween direction="horizontal" size="s" alignItems="center">
        <Icon name="status-warning" variant="warning" />
        <Box variant="span">This is a warning message</Box>
        <Button 
          variant="inline-link" 
          onClick={() => setDismissed(true)}
        >
          Dismiss
        </Button>
      </SpaceBetween>
    </div>
  );
}
