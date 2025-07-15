// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Modal from '@cloudscape-design/components/modal';
import Box from '@cloudscape-design/components/box';

import { Breadcrumbs, HelpPanelProvider, Notifications } from '../commons';
import { CustomAppLayout } from '../commons/common-components';
import { Content } from './components/content';
import { NetworkDashboardHeader, NetworkDashboardMainInfo } from './components/header';
import { NetworkDashboardSideNavigation } from './components/side-navigation';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

export function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [toolsContent, setToolsContent] = useState<React.ReactNode>(() => <NetworkDashboardMainInfo />);
  const [showRefreshConfirm, setShowRefreshConfirm] = useState(false);
  const appLayout = useRef<AppLayoutProps.Ref>(null);

  const handleToolsContentChange = (content: React.ReactNode) => {
    setToolsOpen(true);
    setToolsContent(content);
    appLayout.current?.focusToolsClose();
  };

  const handleRefreshClick = () => {
    setShowRefreshConfirm(true);
  };

  const handleRefreshConfirm = () => {
    setShowRefreshConfirm(false);
    // Add actual refresh logic here
    console.log('Refreshing dashboard data...');
  };

  const handleRefreshCancel = () => {
    setShowRefreshConfirm(false);
  };

  return (
    <HelpPanelProvider value={handleToolsContentChange}>
      <CustomAppLayout
        ref={appLayout}
        content={
          <SpaceBetween size="m">
            <NetworkDashboardHeader
              actions={
                <Button variant="primary" iconName="refresh" onClick={handleRefreshClick}>
                  Refresh Data
                </Button>
              }
            />
            <Content />
          </SpaceBetween>
        }
        breadcrumbs={
          <Breadcrumbs
            items={[
              { text: 'Service', href: '#/' },
              { text: 'Administrative Dashboard', href: '#/' },
            ]}
          />
        }
        navigation={<NetworkDashboardSideNavigation />}
        tools={toolsContent}
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        notifications={<Notifications />}
      />

      <Modal
        onDismiss={handleRefreshCancel}
        visible={showRefreshConfirm}
        header="Confirm refresh"
        closeAriaLabel="Close modal"
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link" onClick={handleRefreshCancel}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleRefreshConfirm}>
                Refresh
              </Button>
            </SpaceBetween>
          </Box>
        }
      >
        <SpaceBetween size="m">
          <Box variant="span">
            Are you sure you want to refresh the dashboard data? This will reload all network traffic, credit usage, and
            device information.
          </Box>
        </SpaceBetween>
      </Modal>
    </HelpPanelProvider>
  );
}
