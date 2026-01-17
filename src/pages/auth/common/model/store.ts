import { atom } from "@reatom/core"

import type { AuthMeResponse } from "@/entities/user"

export const authMeData = atom<AuthMeResponse>()
