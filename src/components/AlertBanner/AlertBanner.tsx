import React from 'react';
import './AlertBanner.scss';

export type AlertBannerSeverity = 'error' | 'warning' | 'info' | 'success';
export type AlertBannerVariant = 'filled' | 'outlined' | 'standard';

export interface AlertBannerProps {
  severity: AlertBannerSeverity;
  variant?: AlertBannerVariant;
  title?: string;
  description?: string;
  showDescription?: boolean;
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const SEVERITY_ICONS = {
  error: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.0834 13.75H11.9167V15.5833H10.0834V13.75ZM10.0834 6.41666H11.9167V11.9167H10.0834V6.41666ZM10.9909 1.83333C5.93087 1.83333 1.83337 5.93999 1.83337 11C1.83337 16.06 5.93087 20.1667 10.9909 20.1667C16.06 20.1667 20.1667 16.06 20.1667 11C20.1667 5.93999 16.06 1.83333 10.9909 1.83333ZM11 18.3333C6.94837 18.3333 3.66671 15.0517 3.66671 11C3.66671 6.94833 6.94837 3.66666 11 3.66666C15.0517 3.66666 18.3334 6.94833 18.3334 11C18.3334 15.0517 15.0517 18.3333 11 18.3333Z" />
    </svg>
  ),
  warning: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 5.94916L17.9025 17.875H4.09746L11 5.94916ZM11 2.29166L0.916626 19.7083H21.0833L11 2.29166Z" />
      <path d="M11.9166 15.125H10.0833V16.9583H11.9166V15.125Z" />
      <path d="M11.9166 9.62499H10.0833V14.2083H11.9166V9.62499Z" />
    </svg>
  ),
  info: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.0834 6.41668H11.9167V8.25001H10.0834V6.41668ZM10.0834 10.0833H11.9167V15.5833H10.0834V10.0833ZM11 1.83334C5.94004 1.83334 1.83337 5.94001 1.83337 11C1.83337 16.06 5.94004 20.1667 11 20.1667C16.06 20.1667 20.1667 16.06 20.1667 11C20.1667 5.94001 16.06 1.83334 11 1.83334ZM11 18.3333C6.95754 18.3333 3.66671 15.0425 3.66671 11C3.66671 6.95751 6.95754 3.66668 11 3.66668C15.0425 3.66668 18.3334 6.95751 18.3334 11C18.3334 15.0425 15.0425 18.3333 11 18.3333Z" />
    </svg>
  ),
  success: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.2075 6.94831L9.16671 12.9891L5.87587 9.70748L4.58337 11L9.16671 15.5833L16.5 8.24998L15.2075 6.94831ZM11 1.83331C5.94004 1.83331 1.83337 5.93998 1.83337 11C1.83337 16.06 5.94004 20.1666 11 20.1666C16.06 20.1666 20.1667 16.06 20.1667 11C20.1667 5.93998 16.06 1.83331 11 1.83331ZM11 18.3333C6.94837 18.3333 3.66671 15.0516 3.66671 11C3.66671 6.94831 6.94837 3.66665 11 3.66665C15.0517 3.66665 18.3334 6.94831 18.3334 11C18.3334 15.0516 15.0517 18.3333 11 18.3333Z" />
    </svg>
  ),
};

export const AlertBanner: React.FC<AlertBannerProps> = ({
  severity,
  variant = 'filled',
  title,
  description,
  showDescription = true,
  onClose,
  className = '',
  children,
}) => {
  const alertClassName = ['alert-banner', `alert-banner--${severity}`, `alert-banner--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={alertClassName} role="alert" aria-live="polite">
      <div className="alert-banner__icon-container">
        <div className="alert-banner__icon">{SEVERITY_ICONS[severity]}</div>
      </div>

      <div className="alert-banner__content">
        {title && <div className="alert-banner__title">{title}</div>}

        {showDescription && description && <div className="alert-banner__description">{description}</div>}

        {children && <div className="alert-banner__children">{children}</div>}
      </div>

      {onClose && (
        <button className="alert-banner__close-button" onClick={onClose} aria-label="Close alert" type="button">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default AlertBanner;
