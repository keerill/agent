import { Suspense } from "react"
import { Outlet, type RouteObject } from "react-router"

import { ROUTES } from "@/shared/routing"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    ),
    children: ROUTES.map(({ path, Component }) => ({
      path,
      Component,
    })),
  },
]
