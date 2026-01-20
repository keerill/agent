import { lazy } from "react"

import { Flag, Widget } from "@/shared/icons"

import { ROUTES } from "./routes"
import type { Route } from "./types"

const Catalog = lazy(() => import("@/pages/catalog"))
const FeatureFlags = lazy(() => import("@/pages/feature-flags"))
const SignIn = lazy(() => import("@/pages/auth/sign-in"))
const OfferAcceptance = lazy(() => import("@/pages/auth/offer-acceptance"))
const PasswordReset = lazy(() => import("@/pages/auth/password-reset"))

export const ROUTES_CONFIG: Route[] = [
  // Основные страницы
  {
    path: ROUTES.catalog,
    Component: Catalog,
    documentTitle: "Каталог объектов",
    layout: "default",
    menu: {
      label: "Каталог",
      icon: <Widget />,
      menuGroup: "main",
    },
  },
  {
    path: ROUTES.featureFlags,
    Component: FeatureFlags,
    documentTitle: "Feature Flags",
    layout: "default",
    menu: {
      label: "Feature Flags",
      icon: <Flag />,
      menuGroup: "stage",
    },
  },

  // Авторизация
  {
    path: ROUTES.auth.signIn,
    Component: SignIn,
    documentTitle: "Вход",
    layout: "auth",
  },
  {
    path: ROUTES.auth.offerAcceptance,
    Component: OfferAcceptance,
    documentTitle: "Принятие оферты",
    layout: "auth",
  },
  {
    path: ROUTES.auth.passwordReset,
    Component: PasswordReset,
    documentTitle: "Сброс пароля",
    layout: "auth",
  },
]
