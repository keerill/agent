import { atom, withLocalStorage } from "@reatom/core"

import type { User } from "./types"

export const user = atom<User | null>(null).extend(
  withLocalStorage("fsk-lka-user"),
)
