import { lazy } from "react"

import { ROUTES } from "./routes"
import type { Route } from "./types"

const Catalog = lazy(() => import("@/pages/catalog"))
const SignIn = lazy(() => import("@/pages/auth/sign-in"))
const OfferAcceptance = lazy(() => import("@/pages/auth/offer-acceptance"))
const PasswordReset = lazy(() => import("@/pages/auth/password-reset"))

export const ROUTES_CONFIG: Record<string, Route[]> = {
  default: [
    {
      path: ROUTES.catalog,
      Component: Catalog,
      meta: {
        title: "Каталог",
        showInMenu: true,
        order: 0,
        icon: "icon",
        menuGroup: "main",
      },
    },
    {
      path: ROUTES.catalogItem(":id"),
      Component: Catalog,
      meta: {
        title: "Каталог item",
        showInMenu: true,
        order: 0,
        icon: "icon",
        menuGroup: "main",
      },
    },
  ],

  auth: [
    {
      path: ROUTES.auth.signIn,
      Component: SignIn,
      meta: {
        title: "Вход",
      },
    },
    {
      path: ROUTES.auth.offerAcceptance,
      Component: OfferAcceptance,
      meta: {
        title: "Принятие оферты",
      },
    },
    {
      path: ROUTES.auth.passwordReset,
      Component: PasswordReset,
      meta: {
        title: "Сброс пароля",
      },
    },
  ],
}
