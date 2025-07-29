import { Alert, Button } from '@cloudscape-design/components';

interface WarningBannerProps {
  message: string;
  onDismiss: () => void;
}

export function WarningBanner({ message, onDismiss }: WarningBannerProps) {
  return (
    <Alert
      type="warning"
      dismissible
      onDismiss={onDismiss}
      action={
        <Button onClick={onDismiss} variant="link">
          Dismiss
        </Button>
      }
    >
      {message}
    </Alert>
  );
}
