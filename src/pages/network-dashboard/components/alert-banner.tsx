// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

interface AlertBannerProps {
  dismissible?: boolean;
  onDismiss?: () => void;
  children: React.ReactNode;
}

export function AlertBanner({ dismissible = false, onDismiss, children }: AlertBannerProps) {
  return (
    <div
      style={{
        display: 'flex',
        padding: '13px 34px 13px 33px',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #000',
        backgroundColor: '#FFF4B4',
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
        <span
          style={{
            color: '#946C00',
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
            color: '#946C00',
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
