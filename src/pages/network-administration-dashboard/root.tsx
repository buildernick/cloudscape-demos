// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { createRoot } from 'react-dom/client';
import '@cloudscape-design/global-styles/index.css';
import NetworkAdministrationDashboard from './index';

function App() {
  return <NetworkAdministrationDashboard />;
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
