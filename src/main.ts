import { isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { App } from './app/app';
import { appConfig } from './app/app.config';

async function prepareApp() {
  if (isDevMode()) {
    const { worker } = await import('./mocks/browser');
    return worker.start({
      onUnhandledRequest: 'warn',
    });
  }

  return Promise.resolve();
}

prepareApp().then(() => {
  bootstrapApplication(App, appConfig);
});
