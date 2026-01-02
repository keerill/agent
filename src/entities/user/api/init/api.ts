import { action, withAsync, wrap } from "@reatom/core"

import { api } from "@/shared/api"

import { type User, user } from "../../model"
import type { AuthMeResponse } from "./types"
import { getMeEndpoint } from "./utils"

export const initUser = action(async () => {
  if (!user()) return

  const authMeData = await wrap(api.get<AuthMeResponse>("/auth/me"))

  const meData = await wrap(
    api.get<User | { message: string }>(getMeEndpoint(authMeData.role)),
  )

  if ("message" in meData) return

  user.set(meData)
}).extend(withAsync({ status: true }))
