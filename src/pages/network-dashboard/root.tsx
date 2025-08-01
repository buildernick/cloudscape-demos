// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@cloudscape-design/global-styles/index.css';
import { applyMode, Mode } from '@cloudscape-design/global-styles';
import NetworkDashboardPage from './index';

const searchParams = new URLSearchParams(window.location.search);
const mode = searchParams.get('theme') as Mode;
if (mode) {
  applyMode(mode);
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <BrowserRouter>
    <NetworkDashboardPage />
  </BrowserRouter>
);
