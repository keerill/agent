import { Link } from "react-router"

import { ROUTES } from "@/shared/routing"

export const Catalog = () => {
  return (
    <div>
      <h1>Catalog</h1>
      <Link to={ROUTES.auth.signIn}>SignIn</Link>
    </div>
  )
}
