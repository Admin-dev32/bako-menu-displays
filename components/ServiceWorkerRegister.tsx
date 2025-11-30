'use client';

import { useEffect } from 'react';

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.info('Service worker registered:', registration.scope);
        })
        .catch(error => {
          console.error('Service worker registration failed:', error);
        });
    }
  }, []);

  return null;
}

export default ServiceWorkerRegister;
