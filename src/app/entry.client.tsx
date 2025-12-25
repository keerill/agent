import { StrictMode } from "react"
import { hydrateRoot } from "react-dom/client"
import { type RouterState, createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"

import { routes } from "./routes"

const router = createBrowserRouter(routes, {
  hydrationData: window.__staticRouterHydrationData,
})

hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

declare global {
  interface Window {
    __staticRouterHydrationData: Partial<
      Pick<RouterState, "loaderData" | "actionData" | "errors">
    >
  }
}
