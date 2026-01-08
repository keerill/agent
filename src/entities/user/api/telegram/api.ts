import { action, withAsync, wrap } from "@reatom/core"

import { api } from "@/shared/api"

import { initUser } from "../init"
import type { TelegramUser } from "./types"

export const signInViaTg = action(async (user: TelegramUser) => {
  await wrap(api.post("/auth/telegram", { body: user }))
  await wrap(initUser())
}).extend(withAsync({ status: true }))
