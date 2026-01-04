import type { ComponentProps } from "react"
import { RouterProvider } from "react-router"

import { AuthProvider } from "./auth-provider"
import { ErrorBoundary } from "./error-boundary"
import { initSentry } from "./initSentry"
import { NotificationProvider } from "./notification-provider"
import { ThemeProvider } from "./theme-provider"

initSentry()

interface Props {
  router: ComponentProps<typeof RouterProvider>["router"]
}

export const App = (props: Props) => {
  const { router } = props

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <NotificationProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </NotificationProvider>
      </ErrorBoundary>
    </ThemeProvider>
  )
}
