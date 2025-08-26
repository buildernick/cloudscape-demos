// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Alert from '@cloudscape-design/components/alert';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';

export function WarningBanner() {
  return (
    <Alert
      type="warning"
      dismissible
      action={
        <Button variant="link">
          Dismiss
        </Button>
      }
      header="Warning"
    >
      This is a warning message
    </Alert>
  );
}
