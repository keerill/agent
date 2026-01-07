import { Form } from "antd"
import { useState } from "react"

import type { SignInForm, SignInTab } from "./types"

export const useSignIn = () => {
  const [form] = Form.useForm<SignInForm>()

  const [tab, setTab] = useState<SignInTab>("email")
  const [error] = useState<string>("")

  return {
    form,
    tab,
    setTab,
    error,
  }
}
