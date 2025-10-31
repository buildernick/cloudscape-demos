// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState, useCallback } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Modal from '@cloudscape-design/components/modal';
import Box from '@cloudscape-design/components/box';

import { Breadcrumbs } from '../commons';
import { CustomAppLayout } from '../commons/common-components';
import { Content } from './components/content';
import { NetworkDashboardHeader } from './components/header';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

export function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [showRefreshModal, setShowRefreshModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const appLayout = useRef<AppLayoutProps.Ref>(null);

  const handleRefreshClick = useCallback(() => {
    setShowRefreshModal(true);
  }, []);

  const handleConfirmRefresh = useCallback(async () => {
    setRefreshing(true);
    setShowRefreshModal(false);

    // Trigger refresh by incrementing the key
    setRefreshKey(prev => prev + 1);

    // Simulate some loading time
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleCancelRefresh = useCallback(() => {
    setShowRefreshModal(false);
  }, []);

  return (
    <>
      <CustomAppLayout
        ref={appLayout}
        content={
          <SpaceBetween size="m">
            <NetworkDashboardHeader
              actions={
                <Button
                  variant="primary"
                  iconAlign="right"
                  iconName="external"
                  onClick={handleRefreshClick}
                  loading={refreshing}
                >
                  Refresh Data
                </Button>
              }
            />
            <Content refreshKey={refreshKey} />
          </SpaceBetween>
        }
        breadcrumbs={
          <Breadcrumbs
            items={[
              { text: 'Service', href: '#/' },
              { text: 'Administrative Dashboard', href: '#/network-dashboard' },
            ]}
          />
        }
        navigationHide
        toolsHide
      />

      <Modal
        onDismiss={handleCancelRefresh}
        visible={showRefreshModal}
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link" onClick={handleCancelRefresh}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleConfirmRefresh}>
                Refresh
              </Button>
            </SpaceBetween>
          </Box>
        }
        header="Confirm data refresh"
      >
        <Box variant="p">
          Are you sure you want to refresh the dashboard data? This will reload all charts and device information.
        </Box>
      </Modal>
    </>
  );
}
