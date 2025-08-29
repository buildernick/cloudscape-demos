// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import Button from '@cloudscape-design/components/button';
import Link from '@cloudscape-design/components/link';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Icon from '@cloudscape-design/components/icon';

interface AlertBannerProps {
  onDismiss: () => void;
}

export function AlertBanner({ onDismiss }: AlertBannerProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(208, 2, 27, 1)',
        borderRadius: '12px',
        boxShadow: 'rgba(0, 7, 22, 0.1) 0px 4px 8px 0px',
        padding: '13px 34px 13px 33px',
        justifyContent: 'space-between',
        border: '1px solid #000',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
        <Icon
          name="status-warning"
          size="normal"
          variant="inverted"
        />
        <div style={{ flex: 1 }}>
          <SpaceBetween size="xs">
            <Box color="text-body-secondary">
              <span style={{ color: '#FFF' }}>
                This is a warning message{' '}
                <Link
                  variant="primary"
                  onFollow={() => setShowDetails(!showDetails)}
                  color="inverted"
                >
                  {showDetails ? 'Show less' : 'More details'}
                </Link>
              </span>
            </Box>
            {showDetails && (
              <Box>
                <div style={{ color: '#FFF', fontSize: '14px', lineHeight: '22px' }}>
                  <div>Additional detail line 1: Network connectivity issues detected in zone us-east-1a.</div>
                  <div>Additional detail line 2: Automatic failover to backup systems has been initiated.</div>
                  <div>Additional detail line 3: Please monitor your applications for any performance impact.</div>
                </div>
              </Box>
            )}
          </SpaceBetween>
        </div>
      </div>
      <Button
        variant="link"
        iconName="close"
        ariaLabel="Dismiss alert"
        onClick={onDismiss}
        formAction="none"
      >
        <span style={{ color: '#FFF', fontWeight: '600', fontSize: '14px' }}>
          Dismiss
        </span>
      </Button>
    </div>
  );
}
