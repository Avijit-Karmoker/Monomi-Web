import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

import { User } from '@/typings'

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn:
      'https://38412eb7068841f8b7b404e04df6aacc@o29963.ingest.sentry.io/5666544',
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 0.01,
  })
}

const ErrorReporting = {
  capture(error: any) {
    return Sentry.captureException(error)
  },
  setUser(user: User | null) {
    let payload: Parameters<typeof Sentry.setUser>[0] = null

    if (user) {
      payload = { id: user.id }
    }

    Sentry.setUser(payload)
  },
}

export default ErrorReporting
