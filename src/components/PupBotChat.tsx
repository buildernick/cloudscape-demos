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
            <button
              className="pupbot-header-button"
              onClick={onToggle}
              aria-label="Minimize chat"
            >
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976305 0.683418 -0.0976305 1.31658 0.292893 1.70711L4.29289 5.70711C4.68342 6.09763 5.31658 6.09763 5.70711 5.70711L9.70711 1.70711C10.0976 1.31658 10.0976 0.683418 9.70711 0.292893C9.31658 -0.0976311 8.68342 -0.0976311 8.29289 0.292893L5 3.58579L1.70711 0.292893Z" fill="white"/>
              </svg>
            </button>
            <button
              className="pupbot-header-button"
              aria-label="More options"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 10C21.1046 10 22 10.8954 22 12C22 13.1046 21.1046 14 20 14C18.8954 14 18 13.1046 18 12C18 10.8954 18.8954 10 20 10ZM12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10ZM4 10C5.10457 10 6 10.8954 6 12C6 13.1046 5.10457 14 4 14C2.89543 14 2 13.1046 2 12C2 10.8954 2.89543 10 4 10Z" fill="white"/>
              </svg>
            </button>
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
            <button className="pupbot-action-button">Contact mission control</button>
            <button className="pupbot-action-button">Check space traffic</button>
            <button className="pupbot-action-button">Track shipment</button>
            <button className="pupbot-action-button">Redeem Treat Rewards™</button>
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
                <button className="pupbot-icon-button" aria-label="Voice input">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21.9999 13.5C22.0074 12.4627 21.6539 11.4552 20.9999 10.65V7.21C20.9999 6.26317 20.8134 5.32561 20.4511 4.45085C20.0888 3.57609 19.5577 2.78127 18.8882 2.11176C18.2187 1.44225 17.4238 0.911165 16.5491 0.548829C15.6743 0.186492 14.7368 0 13.7899 0L10.2099 0C8.29773 0 6.46384 0.759623 5.1117 2.11176C3.75956 3.4639 2.99994 5.29779 2.99994 7.21V10.71C2.35544 11.4972 2.00224 12.4826 1.99994 13.5C2.00258 14.6927 2.47753 15.8357 3.32088 16.6791C4.16422 17.5224 5.30728 17.9974 6.49994 18H7.08994C7.59569 17.9974 8.07998 17.7953 8.43761 17.4377C8.79524 17.08 8.99731 16.5958 8.99994 16.09V10.91C8.99731 10.4042 8.79524 9.91996 8.43761 9.56233C8.07998 9.2047 7.59569 9.00263 7.08994 9H6.49994C5.98743 9.00505 5.47976 9.09982 4.99994 9.28V7.21C5.00258 5.82903 5.55234 4.50539 6.52883 3.52889C7.50532 2.5524 8.82897 2.00264 10.2099 2H13.7899C15.1709 2.00264 16.4946 2.5524 17.471 3.52889C18.4475 4.50539 18.9973 5.82903 18.9999 7.21V9.28C18.5201 9.09982 18.0125 9.00505 17.4999 9H16.9099C16.4042 9.00263 15.9199 9.2047 15.5623 9.56233C15.2046 9.91996 15.0026 10.4042 14.9999 10.91V16.09C15.0026 16.5958 15.2046 17.08 15.5623 17.4377C15.9199 17.7953 16.4042 17.9974 16.9099 18H16.9999V19C16.9999 19.5304 16.7892 20.0391 16.4142 20.4142C16.0391 20.7893 15.5304 21 14.9999 21H14.7199C14.5454 20.6977 14.2949 20.4464 13.9931 20.2709C13.6914 20.0955 13.349 20.0021 12.9999 20H10.9999C10.4695 20 9.9608 20.2107 9.58573 20.5858C9.21065 20.9609 8.99994 21.4696 8.99994 22C8.99994 22.5304 9.21065 23.0391 9.58573 23.4142C9.9608 23.7893 10.4695 24 10.9999 24H12.9999C13.349 23.9979 13.6914 23.9045 13.9931 23.7291C14.2949 23.5536 14.5454 23.3023 14.7199 23H14.9999C16.0608 23 17.0782 22.5786 17.8284 21.8284C18.5785 21.0783 18.9999 20.0609 18.9999 19V17.72C19.8745 17.4124 20.6323 16.8416 21.1695 16.086C21.7066 15.3304 21.9967 14.4271 21.9999 13.5ZM6.99994 11V16H6.49994C5.8369 16 5.20101 15.7366 4.73217 15.2678C4.26333 14.7989 3.99994 14.163 3.99994 13.5C3.99994 12.837 4.26333 12.2011 4.73217 11.7322C5.20101 11.2634 5.8369 11 6.49994 11H6.99994ZM17.4999 16H16.9999V11H17.4999C18.163 11 18.7989 11.2634 19.2677 11.7322C19.7365 12.2011 19.9999 12.837 19.9999 13.5C19.9999 14.163 19.7365 14.7989 19.2677 15.2678C18.7989 15.7366 18.163 16 17.4999 16Z" fill="#00688D"/>
                  </svg>
                </button>
                <button className="pupbot-icon-button" aria-label="Settings">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 0C9.62663 0 7.30655 0.703788 5.33316 2.02236C3.35977 3.34094 1.8217 5.21509 0.913451 7.4078C0.00519943 9.60051 -0.232441 12.0133 0.230582 14.3411C0.693605 16.6689 1.83649 18.8071 3.51472 20.4853C5.19295 22.1635 7.33115 23.3064 9.65892 23.7694C11.9867 24.2324 14.3995 23.9948 16.5922 23.0866C18.7849 22.1783 20.6591 20.6402 21.9776 18.6668C23.2962 16.6935 24 14.3734 24 12C24 8.8174 22.7357 5.76515 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0V0ZM21.16 8H17.26C16.7591 5.97691 15.8803 4.06672 14.67 2.37C16.1007 2.7704 17.4247 3.48301 18.547 4.45651C19.6692 5.43002 20.5616 6.64022 21.16 8ZM15.62 14H8.38001C8.19998 12.6727 8.19998 11.3273 8.38001 10H15.62C15.8 11.3273 15.8 12.6727 15.62 14ZM15.21 16C14.5999 18.1424 13.5011 20.1141 12 21.76C10.4989 20.1141 9.40008 18.1424 8.79001 16H15.21ZM8.79001 8C9.40251 5.86154 10.5011 3.89363 12 2.25C13.4989 3.89363 14.5975 5.86154 15.21 8H8.79001ZM9.33001 2.37C8.11967 4.06672 7.24091 5.97691 6.74001 8H2.84001C3.43841 6.64022 4.33084 5.43002 5.45305 4.45651C6.57527 3.48301 7.89935 2.7704 9.33001 2.37ZM2.20001 10H6.36001C6.20004 11.3285 6.20004 12.6715 6.36001 14H2.20001C1.93334 12.68 1.93334 11.32 2.20001 10ZM2.84001 16H6.73001C7.23442 18.0236 8.11655 19.9338 9.33001 21.63C7.89935 21.2296 6.57527 20.517 5.45305 19.5435C4.33084 18.57 3.43841 17.3598 2.84001 16ZM14.67 21.63C15.8835 19.9338 16.7656 18.0236 17.27 16H21.16C20.5616 17.3598 19.6692 18.57 18.547 19.5435C17.4247 20.517 16.1007 21.2296 14.67 21.63ZM21.8 14H17.64C17.8 12.6715 17.8 11.3285 17.64 10H21.8C22.0667 11.32 22.0667 12.68 21.8 14Z" fill="#00688D"/>
                  </svg>
                </button>
                <button className="pupbot-icon-button" aria-label="Location">
                  <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
                    <path d="M7.39074 23.7929L7.37193 23.778L7.36778 23.7744C2.63586 19.9088 -0.0762185 14.0972 0.000517472 7.98744L0.0005766 7.9834C0.00963115 3.57254 3.58783 0 8.00044 0C12.3354 0 15.865 3.44784 15.9966 7.75082L15.9999 7.983V7.987L16.0011 8.39017C15.9581 14.2193 13.3822 19.7391 8.94545 23.5141L8.6329 23.7746C8.62935 23.7775 8.62579 23.7804 8.62221 23.7832C8.5979 23.8028 8.57282 23.8209 8.5471 23.8377L8.51908 23.8551C8.49722 23.8686 8.47528 23.8807 8.45297 23.892C8.43708 23.9001 8.42065 23.9079 8.40406 23.9152C8.38881 23.9219 8.37352 23.9281 8.3581 23.934C8.33318 23.9437 8.30804 23.9522 8.28269 23.9596C8.27317 23.9622 8.2635 23.9649 8.2538 23.9674C8.22729 23.9745 8.20054 23.9804 8.17365 23.9851C8.1572 23.9878 8.1409 23.9902 8.12456 23.9923C8.10207 23.9952 8.07964 23.9972 8.05719 23.9985C8.03879 23.9995 8.01976 24 8.00072 24L7.94271 23.9983C7.92077 23.9972 7.89895 23.9952 7.8772 23.9925L7.8272 23.9849C7.80447 23.9811 7.78206 23.9764 7.75978 23.9709L7.70786 23.9564C7.69127 23.9515 7.67459 23.9459 7.65803 23.9398C7.63662 23.9319 7.61542 23.9234 7.59449 23.9141C7.57653 23.9062 7.55879 23.8977 7.54124 23.8886C7.52351 23.8795 7.50616 23.8698 7.48906 23.8597L7.42744 23.8196L7.41593 23.811L7.41193 23.808L7.40893 23.806L7.39074 23.7929ZM8.00044 2C4.76204 2 2.12287 4.56557 2.00458 7.77506L2.00044 8L2.00036 8.01256C1.93477 13.2349 4.13235 18.2153 8.00065 21.6842C11.7683 18.3065 13.9506 13.4959 14.0011 8.42455L14.0005 8.01281L14.0004 8C14.0004 4.68629 11.3141 2 8.00044 2ZM8.00044 4C10.2096 4 12.0004 5.79086 12.0004 8C12.0004 10.2091 10.2096 12 8.00044 12C5.7913 12 4.00044 10.2091 4.00044 8C4.00044 5.79086 5.7913 4 8.00044 4ZM8.00044 6C6.89587 6 6.00044 6.89543 6.00044 8C6.00044 9.10457 6.89587 10 8.00044 10C9.10501 10 10.0004 9.10457 10.0004 8C10.0004 6.89543 9.10501 6 8.00044 6Z" fill="#00688D"/>
                  </svg>
                </button>
              </div>
              <button className="pupbot-send-button">
                Send
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M15.45 7.11001L1.45001 0.110009C0.640006 -0.289991 -0.249994 0.490009 0.0600063 1.34001L1.88001 6.34001C2.02001 6.74001 2.40001 7.00001 2.82001 7.00001H8.02001C8.57001 7.00001 9.02001 7.45001 9.02001 8.00001C9.02001 8.55001 8.57001 9.00001 8.02001 9.00001H2.82001C2.40001 9.00001 2.02001 9.26001 1.88001 9.66001L0.0600063 14.66C-0.249994 15.51 0.640006 16.3 1.44001 15.89L15.44 8.89001C16.18 8.52001 16.18 7.47001 15.44 7.11001H15.45Z" fill="#02080E"/>
                </svg>
              </button>
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
