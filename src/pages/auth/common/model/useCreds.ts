import { useLayoutEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router"

// import { ROUTES } from "@/shared/routing"

export const useCreds = () => {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const [email] = useState<string | null>(() => params.get("email"))
  const [password] = useState<string | null>(() => params.get("password"))

  useLayoutEffect(() => {
    // if (!email || !password) {
    //   navigate(ROUTES.auth.signIn, { replace: true })
    //   return
    // }

    const nextParams = new URLSearchParams(params)
    nextParams.delete("email")
    nextParams.delete("password")
    setParams(nextParams, { replace: true })
  }, [email, password, navigate, params, setParams])

  return { email, password }
}
