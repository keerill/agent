import type { RouteObject } from "react-router"

import type { User, UserRole } from "@/entities/user"
import type { FeatureFlagName } from "@/shared/feature-flags"

export interface Route extends Omit<RouteObject, "children" | "element"> {
  /** Путь маршрута */
  path: string
  /** Вложенные маршруты */
  children?: Route[]
  /** Заголовок вкладки */
  documentTitle: string
  /** Условия доступа */
  guard?: RouteGuard
  /** Layout для страницы */
  layout: "default" | "auth"
  /** Данные для меню */
  menu?: RouteMenu
}

interface RouteMenu {
  /** Заголовок */
  label: string
  /** Иконка */
  icon: React.ReactNode
  /** Группа меню */
  menuGroup: string
  /** Ключ для трекинга */
  trackKey?: string
}

interface RouteGuard {
  /** Разрешённые роли (если пустой массив - доступно всем ролям) */
  allowedRoles?: UserRole[]
  /** Запрещённые роли */
  deniedRoles?: UserRole[]
  /** Feature flag, который должен быть включен */
  flag?: FeatureFlagName
  /** Проверка через кастомную функцию */
  customCheck?: (params: {
    user: User | null
    params: Record<string, string>
  }) => boolean | Promise<boolean>
}
