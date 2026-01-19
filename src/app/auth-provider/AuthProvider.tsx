import { reatomComponent } from "@reatom/react"
import { useEffect } from "react"

import { initUser, signOut, user } from "@/entities/user"
import { initFeatureFlags } from "@/shared/feature-flags"
import { ROUTES } from "@/shared/routing"
import { Spin } from "@/shared/ui"

export const AuthProvider = reatomComponent(
  (props: React.PropsWithChildren) => {
    const { children } = props

    const authRoutes: string[] = Object.values(ROUTES.auth)

    const isSignOutting = signOut.status().isPending

    const isIniting =
      initFeatureFlags.status().isFirstPending ||
      (initUser.status().isPending &&
        !authRoutes.includes(window.location.pathname))

    useEffect(() => {
      initFeatureFlags()

      if (!user()) return

      initUser()
    }, [])

    return (
      <Spin variant="circle" size="l" spinning={isIniting || isSignOutting}>
        {children}
      </Spin>
    )
  },
)
