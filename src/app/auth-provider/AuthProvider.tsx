import styled from "@emotion/styled"
import { useAction, useAtom } from "@reatom/npm-react"
import React from "react"

import { fetchMeAsync, userAtom } from "@/modules/entities/user"
import { Loader } from "@/shared-components/Loader"

export const AuthProvider = (props: React.PropsWithChildren) => {
  const { children } = props

  const fetchMe = useAction(fetchMeAsync)
  const [{ isPending }] = useAtom(fetchMeAsync.statusesAtom)

  const [user, setUser] = useAtom(userAtom)

  const fetchAndSetMe = async () => {
    if (!user.fullName) return

    const res = await fetchMe()

    if ("offerData" in res) return

    setUser(res)
  }

  React.useEffect(() => {
    fetchAndSetMe()
  }, [])

  return (
    <>
      {children}
      <StyledLoader isLoading={isPending} />
    </>
  )
}

const StyledLoader = styled(Loader)`
  position: fixed;
  z-index: 9999;

  backdrop-filter: blur(8px);
  background: rgba(20, 20, 20, 0.3);

  .spinner {
    width: 40px;
    height: 40px;

    border-width: 4px;
  }
`
