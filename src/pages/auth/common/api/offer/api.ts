import { action, withAsyncData, wrap } from "@reatom/core"

import { api } from "@/shared/api"

import type { Offer } from "../../model"

export const offer = action(async () => {
  const data = await wrap(api.get<Offer>("/offer-agreement"))
  const urlResponse = await wrap(fetch(data.files[0].downloadUrl))
  const blob = await wrap(urlResponse.blob())
  return URL.createObjectURL(blob)
}).extend(withAsyncData())
