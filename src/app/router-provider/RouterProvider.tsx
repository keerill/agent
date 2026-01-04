import {
  RouterProvider as ReactRouterProvider,
  createBrowserRouter,
} from "react-router"

import { routes } from "./routes"

const router = createBrowserRouter(routes)

export const RouterProvider = () => <ReactRouterProvider router={router} />
