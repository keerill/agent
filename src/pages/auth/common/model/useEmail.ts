import { useLayoutEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router"

import { ROUTES } from "@/shared/routing"

export const useEmail = () => {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const [email] = useState<string | null>(() => params.get("email"))

  useLayoutEffect(() => {
    if (!email) {
      navigate(ROUTES.auth.signIn, { replace: true })
      return
    }

    const nextParams = new URLSearchParams(params)
    nextParams.delete("email")
    setParams(nextParams, { replace: true })
  }, [email, navigate, params, setParams])

  return { email }
}
