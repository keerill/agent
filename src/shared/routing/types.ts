import type { RouteObject } from "react-router"

import type { User, UserRole } from "@/entities/user"
import type { FlagName } from "@/shared/feature-flags"

export interface Route extends Omit<RouteObject, "children" | "element"> {
  /** Путь маршрута */
  path: string
  /** Вложенные маршруты */
  children?: Route[]
  /** Метаданные для меню и SEO */
  meta: RouteMeta
  /** Настройки доступа */
  access: RouteAccess
  /** Защитники доступа */
  guard?: RouteGuard
  /** Layout для страницы */
  layout?: "default" | "auth" | "guest"
  /** Динамический путь для меню (если отличается от path) */
  menuPath?: (user: User | null) => string
}

// export interface FlatRoute extends RouteConfig {
//   fullPath: string
//   parent?: FlatRoute
//   depth: number
// }

// export interface MenuItem {
//   key: string
//   title: string
//   path: string
//   icon?: React.ReactNode
//   order: number
//   children?: MenuItem[]
//   menuGroup?: string
//   sublinks?: string[]
//   trackKey?: string
//   onClick?: () => void
// }

type RouteAccess = "public" | "auth-only" | "guest-only"

interface RouteMeta {
  /** Отображаемое название в меню */
  title: string
  /** Описание для SEO */
  description?: string
  /** Иконка для меню (React компонент) */
  icon?: React.ReactNode
  /** Показывать ли в меню */
  showInMenu: boolean
  /** Порядок сортировки в меню */
  order: number
  /** Ключ для трекинга */
  trackKey?: string
  /** Группа меню */
  menuGroup?: string
  /** Breadcrumbs название */
  breadcrumb?: string | ((params: Record<string, string>) => string)
}

interface RouteGuard {
  /** Разрешённые роли (если пустой массив - доступно всем ролям) */
  allowedRoles?: UserRole[]
  /** Запрещённые роли */
  deniedRoles?: UserRole[]
  /** Feature flag, который должен быть включен */
  flag?: FlagName
  /** Проверка через кастомную функцию */
  customCheck?: (params: {
    user: User | null
    params: Record<string, string>
  }) => boolean | Promise<boolean>
}
