import { action, withAsync, wrap } from "@reatom/core"

import { initUser } from "@/entities/user"
import { api } from "@/shared/api"

import type { SignInForm } from "../../model"

export const signIn = action(async (form: SignInForm) => {
  const { email, phone, password } = form

  const body = {
    email,
    phone: phone?.replace(/\D/g, ""),
    password,
  }

  await wrap(api.post("/auth/login", { body }))
  await wrap(initUser())
}).extend(withAsync({ status: true }))
