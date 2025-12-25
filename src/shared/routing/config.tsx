import {
  HomeOutlined,
  LoginOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons"
import { lazy } from "react"

import type { RouteConfig } from "./types"

// Lazy компоненты с именными экспортами для лучшей отладки
const HomePage = lazy(() =>
  import("../pages/HomePage").then((module) => ({ default: module.HomePage })),
)

const LoginPage = lazy(() =>
  import("../pages/LoginPage").then((module) => ({
    default: module.LoginPage,
  })),
)

const AgencyListPage = lazy(() =>
  import("../pages/agency/ListPage").then((module) => ({
    default: module.AgencyListPage,
  })),
)

const AgencyEditPage = lazy(() =>
  import("../pages/agency/EditPage").then((module) => ({
    default: module.AgencyEditPage,
  })),
)

const MerchantSettingsPage = lazy(() =>
  import("../pages/settings/MerchantSettings").then((module) => ({
    default: module.MerchantSettingsPage,
  })),
)

// Layout компоненты
const PublicLayout = lazy(() => import("../layouts/PublicLayout"))
const AdminLayout = lazy(() => import("../layouts/AdminLayout"))

// Константы ключей
export const ROUTE_KEYS = {
  HOME: "home",
  LOGIN: "login",
  REGISTER: "register",
  CATALOG: "catalog",
  AGENCY: "agency",
  AGENCY_LIST: "agency.list",
  AGENCY_CREATE: "agency.create",
  AGENCY_EDIT: "agency.edit",
  AGENCY_VIEW: "agency.view",
  MERCHANT_SETTINGS: "merchant.settings",
  PROFILE: "profile",
  ADMIN_DASHBOARD: "admin.dashboard",
} as const

// Тип для ключей
export type RouteKeys = (typeof ROUTE_KEYS)[keyof typeof ROUTE_KEYS]

// Основная конфигурация маршрутов
export const routesConfig: RouteConfig[] = [
  {
    key: ROUTE_KEYS.HOME,
    path: "/",
    component: HomePage,
    meta: {
      menu: {
        label: "Главная",
        icon: <HomeOutlined />,
        order: 0,
      },
      layout: "public",
      access: { auth: "any" },
      title: "Главная страница",
    },
  },
  {
    key: ROUTE_KEYS.LOGIN,
    path: "/login",
    component: LoginPage,
    meta: {
      menu: {
        label: "Вход",
        icon: <LoginOutlined />,
        hidden: true, // Не показывать в меню
      },
      layout: "unauthorized",
      access: { auth: "unauthorized" },
      title: "Вход в систему",
    },
  },
  {
    key: ROUTE_KEYS.CATALOG,
    path: "/catalog",
    component: lazy(() => import("../pages/CatalogPage")),
    meta: {
      menu: {
        label: "Каталог",
        icon: <ShoppingOutlined />,
        order: 1,
      },
      layout: "public",
      access: { auth: "any" },
      title: "Каталог товаров",
    },
  },
  {
    key: ROUTE_KEYS.AGENCY,
    path: "/agency",
    meta: {
      menu: {
        label: "Агентства",
        icon: <TeamOutlined />,
        order: 2,
      },
      layout: "authorized",
      access: {
        auth: "authorized",
        roles: ["admin", "manager"],
      },
      featureFlag: "agencyModuleEnabled",
      breadcrumb: "Агентства",
    },
    children: [
      {
        key: ROUTE_KEYS.AGENCY_LIST,
        path: "/agency",
        component: AgencyListPage,
        index: true,
        meta: {
          layout: "authorized",
          access: { auth: "authorized" },
          breadcrumb: "Список",
        },
      },
      {
        key: ROUTE_KEYS.AGENCY_CREATE,
        path: "/agency/create",
        component: lazy(() => import("../pages/agency/CreatePage")),
        meta: {
          menu: {
            label: "Создать агентство",
            hidden: true,
          },
          layout: "authorized",
          access: { auth: "authorized" },
          breadcrumb: "Создание",
        },
      },
      {
        key: ROUTE_KEYS.AGENCY_EDIT,
        path: (params) => `/agency/edit/${params.id}`,
        component: AgencyEditPage,
        meta: {
          menu: {
            label: "Редактировать агентство",
            hidden: true,
          },
          layout: "authorized",
          access: { auth: "authorized" },
          breadcrumb: "Редактирование",
        },
      },
      {
        key: ROUTE_KEYS.AGENCY_VIEW,
        path: (params) => `/agency/${params.id}`,
        component: lazy(() => import("../pages/agency/ViewPage")),
        meta: {
          menu: {
            label: "Просмотр агентства",
            hidden: true,
          },
          layout: "authorized",
          access: { auth: "authorized" },
          breadcrumb: "Просмотр",
        },
      },
    ],
  },
  {
    key: ROUTE_KEYS.MERCHANT_SETTINGS,
    path: "/settings/merchant",
    component: MerchantSettingsPage,
    meta: {
      menu: {
        label: "Настройки мерчанта",
        icon: <SettingOutlined />,
        order: 3,
      },
      layout: "authorized",
      access: {
        auth: "authorized",
        roles: ["merchant", "admin"],
      },
      featureFlag: "merchantSettingsEnabled",
      title: "Настройки мерчанта",
    },
  },
  {
    key: ROUTE_KEYS.ADMIN_DASHBOARD,
    path: "/admin",
    component: lazy(() => import("../pages/admin/Dashboard")),
    meta: {
      menu: {
        label: "Админ панель",
        icon: <DashboardOutlined />,
        order: 99,
      },
      layout: AdminLayout, // Кастомный layout
      access: {
        auth: "authorized",
        roles: ["admin"],
        check: (user) => user?.roles.includes("admin") && user.isAuthenticated,
      },
      title: "Административная панель",
    },
  },
]
