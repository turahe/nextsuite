import React from 'react';
import { usePWA } from '../hooks/usePWA';
import { Button, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { Icon } from './Component';

export const PWAUpdateNotification: React.FC = () => {
  const { needRefresh, reloadApp, dismissUpdate } = usePWA();

  if (!needRefresh) return null;

  return (
    <Toast className="position-fixed" style={{ top: '20px', right: '20px', zIndex: 1050 }}>
      <ToastHeader icon="success" toggle={dismissUpdate}>
        App Update Available
      </ToastHeader>
      <ToastBody>
        <p>A new version of the app is available!</p>
        <div className="d-flex gap-2">
          <Button color="primary" size="sm" onClick={reloadApp}>
            <Icon name="reload" className="me-1" />
            Update Now
          </Button>
          <Button color="secondary" size="sm" onClick={dismissUpdate}>
            Later
          </Button>
        </div>
      </ToastBody>
    </Toast>
  );
};

export const PWAOfflineNotification: React.FC = () => {
  const { offlineReady, dismissOffline } = usePWA();

  if (!offlineReady) return null;

  return (
    <Toast className="position-fixed" style={{ top: '20px', right: '20px', zIndex: 1050 }}>
      <ToastHeader icon="info" toggle={dismissOffline}>
        App Ready for Offline Use
      </ToastHeader>
      <ToastBody>
        <p>The app is now cached and ready to work offline!</p>
        <Button color="primary" size="sm" onClick={dismissOffline}>
          <Icon name="check" className="me-1" />
          Got it
        </Button>
      </ToastBody>
    </Toast>
  );
};

export const PWAInstallPrompt: React.FC = () => {
  const { isInstallable, installApp } = usePWA();

  if (!isInstallable) return null;

  const handleInstall = async () => {
    const installed = await installApp();
    if (installed) {
      console.log('App installed successfully');
    }
  };

  return (
    <Toast className="position-fixed" style={{ bottom: '20px', right: '20px', zIndex: 1050 }}>
      <ToastHeader icon="primary">
        Install NextSuite
      </ToastHeader>
      <ToastBody>
        <p>Install NextSuite for a better experience!</p>
        <div className="d-flex gap-2">
          <Button color="primary" size="sm" onClick={handleInstall}>
            <Icon name="download" className="me-1" />
            Install App
          </Button>
        </div>
      </ToastBody>
    </Toast>
  );
};

export const PWANotifications: React.FC = () => {
  return (
    <>
      <PWAUpdateNotification />
      <PWAOfflineNotification />
      <PWAInstallPrompt />
    </>
  );
};