// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useState } from 'react';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import './PupBotChat.scss';

interface PupBotChatProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function PupBotChat({ isOpen, onToggle }: PupBotChatProps) {
  const [message, setMessage] = useState('');

  const rocketIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M14.77 1.28a6.77 6.77 0 0 1 8.95 8.95l-5.66 5.65a5.43 5.43 0 0 1-.77.7L12 22l-5.29-5.58a5.43 5.43 0 0 1-.77-.7L.28 10.07A6.77 6.77 0 0 1 9.23 1.28l2.77 2.77 2.77-2.77zm-3.84 6.13a1.93 1.93 0 1 0 2.73 2.73 1.93 1.93 0 0 0-2.73-2.73z"
            fill="#D73502"/>
    </svg>
  );

  if (!isOpen) {
    return (
      <div className="pupbot-chat-trigger">
        <Button
          variant="primary"
          onClick={onToggle}
          ariaLabel="Open PupBot chat"
        >
          💬
        </Button>
      </div>
    );
  }

  return (
    <div className="pupbot-chat-container">
      <div className="pupbot-chat-window">
        {/* Header */}
        <div className="pupbot-chat-header">
          <div className="pupbot-chat-title">
            <span>PupBot</span>
          </div>
          <div className="pupbot-chat-actions">
            <Button
              variant="icon"
              iconName="angle-down"
              onClick={onToggle}
              ariaLabel="Minimize chat"
            />
            <Button
              variant="icon"
              iconName="ellipsis"
              ariaLabel="More options"
            />
          </div>
        </div>

        {/* Chat Content */}
        <div className="pupbot-chat-content">
          {/* Introduction */}
          <div className="pupbot-intro">
            <div className="pupbot-avatar-large">
              {rocketIcon}
            </div>
            <Box variant="h2" textAlign="center">PupBot</Box>
            <Box variant="p" textAlign="center" color="text-body-secondary">
              Firefly's virtual assistant for on-demand support
            </Box>
            <Button variant="normal">
              Explore my skills
            </Button>
          </div>

          <div className="pupbot-divider" />

          {/* Message */}
          <div className="pupbot-message">
            <div className="pupbot-message-content">
              <div className="pupbot-avatar-small">
                {rocketIcon}
              </div>
              <div className="pupbot-message-body">
                <div className="pupbot-message-meta">
                  <span className="pupbot-sender">PupBot</span>
                  <span className="pupbot-time">9:22 AM</span>
                </div>
                <div className="pupbot-message-bubble">
                  Welcome, fellow space pup! How can I help you today?
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pupbot-quick-actions">
            <Button variant="normal">Contact mission control</Button>
            <Button variant="normal">Check space traffic</Button>
            <Button variant="normal">Track shipment</Button>
            <Button variant="normal">Redeem Treat Rewards™</Button>
          </div>
        </div>

        {/* Message Input */}
        <div className="pupbot-input-section">
          <div className="pupbot-divider" />
          <div className="pupbot-input-area">
            <div className="pupbot-textarea-container">
              <textarea
                className="pupbot-textarea"
                placeholder="Message Pupbot"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
              <div className="pupbot-input-help">
                Press SHIFT + ENTER to insert a new line.
              </div>
              <div className="pupbot-char-count">
                {message.length}/200 characters
              </div>
            </div>
            
            <div className="pupbot-input-actions">
              <div className="pupbot-secondary-actions">
                <Button variant="icon" iconName="microphone" ariaLabel="Voice input" />
                <Button variant="icon" iconName="settings" ariaLabel="Settings" />
                <Button variant="icon" iconName="location-marker" ariaLabel="Location" />
              </div>
              <Button variant="primary" iconName="angle-right-double">
                Send
              </Button>
            </div>
          </div>

          <div className="pupbot-divider" />
          
          <div className="pupbot-disclaimer">
            <Box variant="small" color="text-body-secondary">
              ℹ️ PupBot may not always be accurate. Verify responses.
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}
