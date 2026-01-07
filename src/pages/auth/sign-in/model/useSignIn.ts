import { useState } from "react"

import { Form } from "@/shared/ui"

import type { SignInForm, SignInTab } from "./types"

export const useSignIn = () => {
  const [form] = Form.useForm<SignInForm>()

  const [tab, setTab] = useState<SignInTab>("email")

  return {
    form,
    tab,
    setTab,
  }
}
