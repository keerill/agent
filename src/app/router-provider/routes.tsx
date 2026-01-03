import { type RouteObject } from "react-router"

import { ROUTES, getLazyComponent } from "@/shared/routing"

export const routes: RouteObject[] = [
  {
    path: "/",
    children: ROUTES.map(({ path, pageName }) => ({
      path,
      lazy: getLazyComponent(pageName),
    })),
  },
]
