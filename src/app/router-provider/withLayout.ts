import { ROUTES_CONFIG, type Route } from "@/shared/routing"

export const withLayout = (layout: Route["layout"]) =>
  ROUTES_CONFIG.filter((r) => r.layout === layout).map(
    ({ path, Component }) => ({
      path,
      Component,
    }),
  )
