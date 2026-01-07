import { reatomComponent } from "@reatom/react"
import { Link } from "react-router"

import { user } from "@/entities/user"
import { ROUTES } from "@/shared/routing"

export const NotFound = reatomComponent(() => {
  const to = user() ? ROUTES.catalog : ROUTES.auth.signIn

  return (
    <h1>
      <span>NotFound</span>
      <Link to={to}>Go Back</Link>
    </h1>
  )
})
