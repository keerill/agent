import { reatomComponent } from "@reatom/react"
import { Navigate, Outlet } from "react-router"

import { user } from "@/entities/user"
import { ROUTES } from "@/shared/routing"

export const RequireNoAuth = reatomComponent(() => {
  if (user()) {
    return <Navigate to={ROUTES.catalog} replace />
  }

  return <Outlet />
})
