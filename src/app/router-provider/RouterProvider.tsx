import { isBrowser } from "@reatom/core"
import {
  RouterProvider as ReactRouterProvider,
  createBrowserRouter,
  createMemoryRouter,
} from "react-router"

import { routes } from "./routes"

let router
if (isBrowser()) {
  router = createBrowserRouter(routes)
} else {
  router = createMemoryRouter(routes)
}

export const RouterProvider = () => <ReactRouterProvider router={router} />
