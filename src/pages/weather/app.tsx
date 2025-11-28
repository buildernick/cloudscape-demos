// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState, useRef } from 'react';
import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import { Navigation } from '../commons';
import { CustomAppLayout } from '../commons/common-components';
import { WeatherContent } from './components/weather-content';
import { ToolsContent } from './components/tools-content';
import { Breadcrumbs } from './components/breadcrumbs';

export function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef<AppLayoutProps.Ref>(null);

  return (
    <CustomAppLayout
      ref={appLayout}
      navigation={<Navigation activeHref="#/weather" />}
      breadcrumbs={<Breadcrumbs />}
      content={
        <WeatherContent
          loadHelpPanelContent={() => {
            setToolsOpen(true);
            appLayout.current?.focusToolsClose();
          }}
        />
      }
      tools={<ToolsContent />}
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
    />
  );
}
