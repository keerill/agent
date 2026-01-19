import { action, withAsync, wrap } from "@reatom/core"

import { api } from "@/shared/api"

import { type ResetForm } from "../model"

export const resetPassword = action(async (form: ResetForm) => {
  const { email, phone } = form

  const body = {
    email,
    phone: phone?.replace(/\D/g, ""),
  }

  await wrap(api.post("/auth/reset-password", { body }))
}).extend(withAsync({ status: true }))
