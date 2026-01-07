import { reatomComponent } from "@reatom/react"
import { Navigate, Outlet } from "react-router"

import { user } from "@/entities/user"
import { ROUTES } from "@/shared/routing"

export const RequireAuth = reatomComponent(() => {
  if (!user()) {
    return <Navigate to={ROUTES.auth.signIn} replace />
  }

  return <Outlet />
})
