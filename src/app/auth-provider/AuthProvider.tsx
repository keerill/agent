import { reatomComponent } from "@reatom/react"
import { useEffect } from "react"

import { initUser } from "@/entities/user"
import { Spin } from "@/shared/ui"

export const AuthProvider = reatomComponent(
  (props: React.PropsWithChildren) => {
    const { children } = props

    const isIniting = initUser.status().isPending

    useEffect(() => {
      initUser()
    }, [])

    return (
      <Spin variant="circle" size="l" spinning={isIniting}>
        {children}
      </Spin>
    )
  },
)
