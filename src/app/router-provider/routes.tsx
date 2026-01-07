import { Navigate, type RouteObject } from "react-router"

import { ROUTES, ROUTES_CONFIG } from "@/shared/routing"

import { NotFound } from "./NotFound"
import { RequireAuth, RequireNoAuth } from "./guards"
import { AuthLayout, BaseLayout } from "./layout"

export const routes: RouteObject[] = [
  {
    element: <RequireAuth />,
    children: [
      {
        path: "/",
        element: <BaseLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={ROUTES.catalog} replace />,
          },
          ...ROUTES_CONFIG.default.map(({ path, Component }) => ({
            path,
            Component,
          })),
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
          ...ROUTES_CONFIG.auth.map(({ path, Component }) => ({
            path,
            Component,
          })),
        ],
      },
    ],
  },

  {
    path: ROUTES.notFound,
    element: <NotFound />,
  },

  {
    path: "*",
    element: <Navigate to={ROUTES.notFound} replace />,
  },
]
