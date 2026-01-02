import { reatomComponent } from "@reatom/react"
import { Spin } from "fsk-design-system"
import { useEffect } from "react"

import { initUser } from "@/entities/user"

export const AuthProvider = reatomComponent(
  (props: React.PropsWithChildren) => {
    const { children } = props

    const isIniting = initUser.status().isPending

    useEffect(() => {
      initUser()
    }, [])

    return (
      <>
        {children}
        <Spin spinning={isIniting} />
      </>
    )
  },
)
