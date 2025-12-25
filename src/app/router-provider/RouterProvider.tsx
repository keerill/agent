import { RouterProvider as ReactRouterProvider } from "react-router"

import { router } from "./router"

export const RouterProvider = () => <ReactRouterProvider router={router} />
