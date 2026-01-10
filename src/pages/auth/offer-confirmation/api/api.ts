import { action, withAsync, wrap } from "@reatom/core"

import { api } from "@/shared/api"

import { signIn } from "../../common/api"
import type { SignInForm } from "../../common/model"

export const confirmOffer = action(async (form: SignInForm, code: string) => {
  const { email, password } = form

  const signInBody = {
    email,
    password,
  }

  const agreementBody = {
    email,
    code,
  }

  await wrap(api.post("/offer-agreement/sign", { body: agreementBody }))
  await wrap(signIn(signInBody))
}).extend(withAsync({ status: true }))
