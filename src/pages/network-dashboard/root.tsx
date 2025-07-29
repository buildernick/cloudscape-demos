// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { createRoot } from 'react-dom/client';
import { applyMode, Mode } from '../../common/apply-mode';
import '@cloudscape-design/global-styles/index.css';

import NetworkDashboard from './index';

const root = createRoot(document.getElementById('app')!);
applyMode(Mode.Light);
root.render(<NetworkDashboard />);
