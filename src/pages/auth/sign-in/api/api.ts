import { action, withAsync, wrap } from "@reatom/core"

import { initUser } from "@/entities/user"
import { api } from "@/shared/api"

import type { SignInForm, TelegramUser } from "../model"

export const signIn = action(async (form: SignInForm) => {
  const body = {
    email: form.email,
    phone: form.phone?.replace(/\D/g, ""),
    password: form.password,
  }

  await wrap(api.post("/auth/login", { body }))
  await wrap(initUser())
}).extend(withAsync({ status: true }))

export const signInViaTg = action(async (user: TelegramUser) => {
  await wrap(api.post("/auth/telegram", { body: user }))
  await wrap(initUser())
}).extend(withAsync({ status: true }))
