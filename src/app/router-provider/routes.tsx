import { type RouteObject } from "react-router"

import { ROUTES } from "@/shared/routing"

import { NotFound } from "./NotFound"
import { Layout } from "./layout"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: ROUTES.default.map(({ path, Component }) => ({
      path,
      Component,
    })),
  },

  {
    path: "/auth",
    element: <Layout />,
    children: ROUTES.auth.map(({ path, Component }) => ({
      path,
      Component,
    })),
  },

  {
    path: "*",
    element: <NotFound />,
  },
]
