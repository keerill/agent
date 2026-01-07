import { Navigate, type RouteObject } from "react-router"

import { ROUTES, ROUTES_CONFIG } from "@/shared/routing"

import { NotFound } from "./NotFound"
import { AuthLayout, BaseLayout } from "./layout"

export const routes: RouteObject[] = [
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

  {
    path: "*",
    element: <NotFound />,
  },
]
