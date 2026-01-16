import { action, withAsyncData, wrap } from "@reatom/core"

import { api } from "@/shared/api"

import type { Permission } from "./types"

export const permissions = action(async () => {
  const data = await wrap(api.get<Permission[]>("/auth/permissions"))
  return data
}).extend(withAsyncData())
