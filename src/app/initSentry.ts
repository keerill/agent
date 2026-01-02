import * as Sentry from "@sentry/react"
import { useEffect } from "react"
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router"

export const initSentry = () => {
  if (import.meta.env.VITE_IS_STAGE === "true" || !import.meta.env.PROD) return

  Sentry.init({
    dsn: import.meta.env.VITE_DSN_URL,
    environment: import.meta.env.MODE,
    integrations: [
      Sentry.reactRouterV7BrowserTracingIntegration({
        useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      }),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    tracePropagationTargets: [import.meta.env.VITE_PROD_URL],

    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  })
}
