import { hydrateRoot } from "react-dom/client"
import { type RouterState, createBrowserRouter } from "react-router"

import { App } from "./App"
import { routes } from "./router-provider"

const router = createBrowserRouter(routes, {
  hydrationData: window.__staticRouterHydrationData,
})

hydrateRoot(document.getElementById("root")!, <App router={router} />)

declare global {
  interface Window {
    __staticRouterHydrationData: Partial<
      Pick<RouterState, "loaderData" | "actionData" | "errors">
    >
  }
}
