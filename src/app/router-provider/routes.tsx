import { Navigate, type RouteObject } from "react-router"

import { ROUTES } from "@/shared/routing"

import { NotFound } from "./NotFound"
import { RequireAuth, RequireNoAuth } from "./guards"
import { AuthLayout, DefaultLayout } from "./layout"
import { withLayout } from "./withLayout"

export const routes: RouteObject[] = [
  {
    element: <RequireAuth />,
    children: [
      {
        path: "/",
        element: <DefaultLayout />,
        children: [
          { index: true, element: <Navigate to={ROUTES.catalog} replace /> },
          ...withLayout("default"),
        ],
      },
    ],
  },

  {
    element: <RequireNoAuth />,
    children: [
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={ROUTES.auth.signIn} replace />,
          },
          ...withLayout("auth"),
        ],
      },
    ],
  },

  { path: ROUTES.notFound, element: <NotFound /> },
  { path: "*", element: <Navigate to={ROUTES.notFound} replace /> },
]
