import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core'
import { provideRouter, withComponentInputBinding } from '@angular/router'
import { provideHttpClient } from '@angular/common/http'

import { routes } from './app.routes'
import { provideSignalFormsConfig } from '@angular/forms/signals'
import { NG_STATUS_CLASSES } from '@angular/forms/signals/compat'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideSignalFormsConfig({
      classes: { ...NG_STATUS_CLASSES },
    }),
  ],
}
