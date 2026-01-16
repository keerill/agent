import { action, withAsync, withAsyncData, wrap } from "@reatom/core"

import { permissions } from "@/entities/permissions"
import { api } from "@/shared/api"

import { signIn } from "../../common/api"
import type { Offer } from "../model"

interface ConfirmDto {
  email: string
  password: string
  code: number
}

export const confirmOffer = action(async (body: ConfirmDto) => {
  await wrap(api.post("/offer-agreement/sign", { body }))
  await wrap(signIn({ email: body.email, password: body.password }))
  await wrap(permissions())
}).extend(withAsync({ status: true }))

export const offer = action(async () => {
  const data = await wrap(api.get<Offer>("/offer-agreement"))
  const urlResponse = await wrap(fetch(data.files[0].downloadUrl))
  const blob = await wrap(urlResponse.blob())
  return URL.createObjectURL(blob)
}).extend(withAsyncData())
