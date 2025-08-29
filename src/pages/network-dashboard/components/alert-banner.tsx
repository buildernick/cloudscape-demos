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
        backgroundColor: '#FFF4B4',
        padding: '13px 34px 13px 33px',
        justifyContent: 'space-between',
        border: '1px solid #000',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_5172_4753)">
            <mask
              id="mask0_5172_4753"
              style={{ maskType: 'luminance' }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="16"
              height="16"
            >
              <path d="M15.6544 0.470581H0.595581V15.5294H15.6544V0.470581Z" fill="white" />
            </mask>
            <g mask="url(#mask0_5172_4753)">
              <path
                d="M8.125 5.64703V8.78428M8.125 10.6666H8.13128M14.3995 7.99997C14.3995 11.4653 11.5903 14.2745 8.125 14.2745C4.65969 14.2745 1.85049 11.4653 1.85049 7.99997C1.85049 4.53466 4.65969 1.72546 8.125 1.72546C11.5903 1.72546 14.3995 4.53466 14.3995 7.99997Z"
                stroke="#946C00"
                strokeWidth="1.88235"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_5172_4753">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <div style={{ flex: 1 }}>
          <SpaceBetween size="xs">
            <div>
              <span
                style={{
                  color: '#946C00',
                  fontSize: '14px',
                  fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif',
                  fontWeight: '400',
                  lineHeight: '22px',
                }}
              >
                This is a warning message{' '}
                <Button variant="link" onClick={() => setShowDetails(!showDetails)} formAction="none">
                  <span style={{ color: '#946C00', fontSize: '14px', fontWeight: '600' }}>
                    {showDetails ? 'Show less' : 'More details'}
                  </span>
                </Button>
              </span>
            </div>
            {showDetails && (
              <div
                style={{
                  color: '#946C00',
                  fontSize: '14px',
                  lineHeight: '22px',
                  fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif',
                }}
              >
                <div>Additional detail line 1: Network connectivity issues detected in zone us-east-1a.</div>
                <div>Additional detail line 2: Automatic failover to backup systems has been initiated.</div>
                <div>Additional detail line 3: Please monitor your applications for any performance impact.</div>
              </div>
            )}
          </SpaceBetween>
        </div>
      </div>
      <Button variant="link" onClick={onDismiss} formAction="none">
        <span
          style={{
            color: '#946C00',
            fontWeight: '600',
            fontSize: '14px',
            fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif',
            textAlign: 'center',
            lineHeight: '22px',
          }}
        >
          Dismiss
        </span>
      </Button>
    </div>
  );
}
