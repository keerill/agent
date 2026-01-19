import { useLayoutEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router"

import { ROUTES } from "@/shared/routing"

interface Options {
  redirectIfMissing?: boolean
}

export const useCreds = (options?: Options) => {
  const { redirectIfMissing } = options || {}

  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const [email] = useState<string>(() => params.get("email") || "")
  const [password] = useState<string>(() => params.get("password") || "")

  useLayoutEffect(() => {
    if (redirectIfMissing && (!email || !password)) {
      navigate(ROUTES.auth.signIn, { replace: true })
      return
    }

    const nextParams = new URLSearchParams(params)
    nextParams.delete("email")
    nextParams.delete("password")
    setParams(nextParams, { replace: true })
  }, [redirectIfMissing, email, password, navigate, params, setParams])

  return { email, password }
}
