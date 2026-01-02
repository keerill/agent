import { atom } from "@reatom/core"

import type { User } from "./types"

export const user = atom<User | null>(null)
