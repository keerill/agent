import { action, withAsync } from "@reatom/core"

import { user } from "../../model"

export const signOut = action(async () => {
  try {
    // TODO: он не работает,
    // потому что ждет refreshTokeн в теле запроса, а они http-only
    // await wrap(api.post("/auth/logout"))
  } finally {
    user.set(null)
  }
}).extend(withAsync({ status: true }))
