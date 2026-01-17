import { action, withAsync, withAsyncData, wrap } from "@reatom/core"

import { api } from "@/shared/api"

import { signIn } from "../../common/api"
import type { Offer } from "../model"

interface ConfirmDto {
  email: string
  password: string
  code: number
}

export const confirmOffer = action(async (body: ConfirmDto) => {
  await wrap(
    api.post("/offer-agreement/sign", {
      body: { email: body.email, code: body.code },
    }),
  )
  await wrap(signIn({ email: body.email, password: body.password }))
}).extend(withAsync({ status: true }))

export const offer = action(async () => {
  const data = await wrap(api.get<Offer>("/offer-agreement"))
  const urlResponse = await wrap(fetch(data.files[0].downloadUrl))
  const blob = await wrap(urlResponse.blob())
  return URL.createObjectURL(blob)
}).extend(withAsyncData())
