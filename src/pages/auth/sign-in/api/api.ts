import { action, withAsync, wrap } from "@reatom/core"

import { initUser } from "@/entities/user"
import { api } from "@/shared/api"

import type { TelegramUser } from "../model"

export const signInViaTg = action(async (user: TelegramUser) => {
  await wrap(api.post("/auth/telegram", { body: user }))
  await wrap(initUser())
}).extend(withAsync({ status: true }))
