// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import Button from '@cloudscape-design/components/button';

interface AlertBannerProps {
  type?: 'warning' | 'info' | 'success' | 'error';
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function AlertBanner({ 
  type = 'warning', 
  message, 
  dismissible = true, 
  onDismiss 
}: AlertBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  const handleDismiss = () => {
    setDismissed(true);
    if (onDismiss) {
      onDismiss();
    }
  };

  if (dismissed) {
    return null;
  }

  const getBackgroundColor = () => {
    switch (type) {
      case 'warning':
        return '#FFF4B4';
      case 'info':
        return '#E7F3FF';
      case 'success':
        return '#E7F7E7';
      case 'error':
        return '#FFE7E7';
      default:
        return '#FFF4B4';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'warning':
        return '#946C00';
      case 'info':
        return '#0073BB';
      case 'success':
        return '#037F00';
      case 'error':
        return '#D91515';
      default:
        return '#946C00';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'warning':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_5172_4753)">
              <mask id="mask0_5172_4753" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                <path d="M15.6544 0.470581H0.595581V15.5294H15.6544V0.470581Z" fill="white"/>
              </mask>
              <g mask="url(#mask0_5172_4753)">
                <path 
                  d="M8.125 5.64703V8.78428M8.125 10.6666H8.13128M14.3995 7.99997C14.3995 11.4653 11.5903 14.2745 8.125 14.2745C4.65969 14.2745 1.85049 11.4653 1.85049 7.99997C1.85049 4.53466 4.65969 1.72546 8.125 1.72546C11.5903 1.72546 14.3995 4.53466 14.3995 7.99997Z" 
                  stroke={getIconColor()} 
                  strokeWidth="1.88235" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_5172_4753">
                <rect width="16" height="16" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="7" stroke={getIconColor()} strokeWidth="2"/>
            <path d="M8 4v4m0 4h.01" stroke={getIconColor()} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        padding: '13px 34px 13px 33px',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        border: '1px solid #000',
        backgroundColor: getBackgroundColor(),
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {getIcon()}
        <div 
          style={{ 
            color: getIconColor(), 
            fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif', 
            fontSize: '14px', 
            fontWeight: 400, 
            lineHeight: '22px' 
          }}
        >
          {message}
        </div>
      </div>
      {dismissible && (
        <Button
          variant="inline-link"
          onClick={handleDismiss}
          style={{ 
            color: getIconColor(), 
            fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif', 
            fontSize: '14px', 
            fontWeight: 600, 
            lineHeight: '22px' 
          }}
        >
          Dismiss
        </Button>
      )}
    </div>
  );
}
