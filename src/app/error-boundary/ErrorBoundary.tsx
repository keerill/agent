import * as Sentry from "@sentry/react"
import type { ErrorBoundaryProps } from "@sentry/react"

export const ErrorBoundary = (props: ErrorBoundaryProps) => {
  return <Sentry.ErrorBoundary {...props} fallback={<Fallback />} />
}

const Fallback = () => {
  // const showLink =
  //   window.location.pathname !== "/" &&
  //   window.location.pathname !== "/login" &&
  //   window.location.pathname !== "/reset-password"

  // console.log("showLink: ", showLink)

  return <h1>ErrorBoundary</h1>
}
