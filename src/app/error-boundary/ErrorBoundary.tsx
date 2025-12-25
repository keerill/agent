import * as Sentry from "@sentry/react"
import type { ErrorBoundaryProps } from "@sentry/react"

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return <Sentry.ErrorBoundary {...props} fallback={<Fallback />} />
}

function Fallback() {
  const showLink =
    window.location.pathname !== "/" &&
    window.location.pathname !== "/login" &&
    window.location.pathname !== "/reset-password"

  console.log("showLink: ", showLink)

  return <div>Fallback</div>
}
