import type { ComponentType, LazyExoticComponent, ReactNode } from "react"

type UserRole = "admin" | "merchant" | "manager" | "user" | "guest"

interface User {
  id: string
  roles: UserRole[]
  isAuthenticated: boolean
}

export interface RouteConfig {
  key: RouteKey
  path: RoutePath
  component?: ComponentType | LazyExoticComponent<ComponentType>
  loader?: <T, D>(params: T) => Promise<D>
  action?: <T, D>(params: T) => Promise<D>
  errorElement?: ReactNode

  meta: {
    menu?: {
      label: string | ReactNode
      icon?: ReactNode
      order?: number
      hidden?: boolean
    }

    layout: "authorized" | "unauthorized" | "public" | ComponentType

    access: {
      auth: "any" | "authorized" | "unauthorized"
      roles?: UserRole[]
      check?: (user: User | null) => boolean
    }

    featureFlag?: string

    title?: string
    breadcrumb?: string
    requiresAuth?: boolean
  }

  children?: RouteConfig[]
  index?: boolean
}

export interface PathCacheEntry {
  key: string
  path: string
  timestamp: number
}

type RouteKey = string

type RoutePath = string | ((params: Record<string, string | number>) => string)
