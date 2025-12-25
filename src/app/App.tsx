import "fsk-design-system/styles.css"

import { AuthProvider } from "./auth-provider"
import { ErrorBoundary } from "./error-boundary"
import { initSentry } from "./initSentry"
import { NotificationProvider } from "./notification-provider"
import { RouterProvider } from "./router-provider"
import { ThemeProvider } from "./theme"

initSentry()

export function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <NotificationProvider>
          <AuthProvider>
            <RouterProvider />
          </AuthProvider>
        </NotificationProvider>
      </ErrorBoundary>
    </ThemeProvider>
  )
}
