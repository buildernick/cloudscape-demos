// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

interface AlertBannerProps {
  type?: 'warning' | 'info' | 'error' | 'success';
  dismissible?: boolean;
  onDismiss?: () => void;
  children: React.ReactNode;
}

export function AlertBanner({ type = 'warning', dismissible = false, onDismiss, children }: AlertBannerProps) {
  const getStyles = () => {
    switch (type) {
      case 'warning':
        return {
          backgroundColor: '#FFF4B4',
          borderColor: '#946C00',
          textColor: '#946C00',
          iconPath:
            'M8.125 5.64703V8.78428M8.125 10.6666H8.13128M14.3995 7.99997C14.3995 11.4653 11.5903 14.2745 8.125 14.2745C4.65969 14.2745 1.85049 11.4653 1.85049 7.99997C1.85049 4.53466 4.65969 1.72546 8.125 1.72546C11.5903 1.72546 14.3995 4.53466 14.3995 7.99997Z',
        };
      case 'error':
        return {
          backgroundColor: '#FFEAEA',
          borderColor: '#D91515',
          textColor: '#D91515',
          iconPath:
            'M8 3V7M8 11H8.01M15 8C15 11.866 11.866 15 8 15C4.134 15 1 11.866 1 8C1 4.134 4.134 1 8 1C11.866 1 15 4.134 15 8Z',
        };
      case 'success':
        return {
          backgroundColor: '#EAFAF1',
          borderColor: '#037F0C',
          textColor: '#037F0C',
          iconPath:
            'M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z',
        };
      case 'info':
      default:
        return {
          backgroundColor: '#E8F4FD',
          borderColor: '#0972D3',
          textColor: '#0972D3',
          iconPath:
            'M8 7V13M8 3H8.01M15 8C15 11.866 11.866 15 8 15C4.134 15 1 11.866 1 8C1 4.134 4.134 1 8 1C11.866 1 15 4.134 15 8Z',
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      style={{
        display: 'flex',
        padding: '13px 34px 13px 33px',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #000',
        backgroundColor: styles.backgroundColor,
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
                d={styles.iconPath}
                stroke={styles.textColor}
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
        <span
          style={{
            color: styles.textColor,
            fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif',
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '22px',
          }}
        >
          {children}
        </span>
      </div>
      {dismissible && onDismiss && (
        <button
          onClick={onDismiss}
          style={{
            color: styles.textColor,
            fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif',
            fontSize: '14px',
            fontWeight: '600',
            lineHeight: '22px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          Dismiss
        </button>
      )}
    </div>
  );
}
