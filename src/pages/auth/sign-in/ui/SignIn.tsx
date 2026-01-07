import { Link } from "react-router"

import { ROUTES } from "@/shared/routing"

export const SignIn = () => {
  return (
    <div>
      <h1>SignIn</h1>
      <Link to={ROUTES.catalog}>Catalog</Link>
    </div>
  )
}
