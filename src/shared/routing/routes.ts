import { lazy } from "react"

import type { Route } from "./types"

const Catalog = lazy(() => import("@/pages/catalog"))
const SignIn = lazy(() => import("@/pages/auth/sign-in"))

export const ROUTES: Route[] = [
  // Публичные маршруты (доступны всем)
  {
    path: "/catalog",
    Component: Catalog,
    meta: {
      title: "Каталог",
      showInMenu: true,
      order: 0,
      icon: "icon",
      menuGroup: "main",
    },
    access: "public",
  },
  {
    path: "/auth/sign-in",
    Component: SignIn,
    meta: {
      title: "Вход",
      showInMenu: true,
      order: 0,
      icon: "icon",
      menuGroup: "main",
    },
    access: "public",
  },

  // {
  //   path: "/auth/reset-password",
  //   page: "auth/reset-password",
  //   meta: {
  //     title: "Сброс пароля",
  //     showInMenu: false,
  //     order: 0,
  //   },
  //   access: "guest-only",
  //   layout: "guest",
  // },

  // {
  //   path: "/agent/:agentId/customer",
  //   component: () => import("@/screens/Customers"),
  //   meta: {
  //     title: "Мои клиенты",
  //     showInMenu: true,
  //     order: 11,
  //     icon: UsersProfilesIcon,
  //     menuGroup: "activities",
  //     trackKey: "my_clients",
  //   },
  //   access: "auth-only",
  //   layout: "auth",
  //   guard: {
  //     deniedRoles: ["head_of_sales", "sales_dept_manager"],
  //   },
  //   menuPath: (user) => (user ? `/agent/${user.id}/customer` : "/"),
  // },

  // {
  //   path: "/mortgage-exceptions",
  //   meta: {
  //     title: "Ипотечные исключения",
  //     showInMenu: true,
  //     order: 30,
  //     icon: MatchIcon,
  //     menuGroup: "mortgage",
  //   },
  //   access: "auth-only",
  //   layout: "auth",
  //   guard: {
  //     allowedRoles: ["mortgage_manager"],
  //     requiredFlag: "mortgageExceptions",
  //   },
  //   children: [
  //     {
  //       path: "",
  //       component: () => import("@/screens/MortgageExceptions"),
  //     },
  //     {
  //       path: "create",
  //       component: () => import("@/screens/CreateMortgageExceptions"),
  //       meta: {
  //         title: "Создание исключения",
  //         showInMenu: false,
  //         order: 0,
  //         breadcrumb: "Создание",
  //       },
  //     },
  //     {
  //       path: ":exceptionId",
  //       component: () => import("@/screens/MortgageException"),
  //       meta: {
  //         title: "Ипотечное исключение",
  //         showInMenu: false,
  //         order: 0,
  //         breadcrumb: (params) => `Исключение ${params.exceptionId}`,
  //       },
  //     },
  //     {
  //       path: "edit/:exceptionId",
  //       component: () => import("@/screens/EditMortgageException"),
  //       meta: {
  //         title: "Редактирование исключения",
  //         showInMenu: false,
  //         order: 0,
  //         breadcrumb: "Редактирование",
  //       },
  //     },
  //   ],
  // },

  // Маршруты для stage окружения
  // {
  //   path: "/feature-flags",
  //   page: "feature-flags",
  //   meta: {
  //     title: "Feature Flags",
  //     showInMenu: true,
  //     order: 100,
  //     icon: "icon",
  //     menuGroup: "stage",
  //   },
  //   access: "auth-only",
  //   layout: "auth",
  //   guard: {
  //     customCheck: () => import.meta.env.VITE_IS_STAGE === "true",
  //   },
  // },
]
