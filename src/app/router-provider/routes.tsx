import { Navigate, type RouteObject } from "react-router"

import { ROUTES, ROUTES_CONFIG } from "@/shared/routing"

import { NotFound } from "./NotFound"
import { Layout } from "./layout"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
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
    element: <Layout hideSider />,
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
