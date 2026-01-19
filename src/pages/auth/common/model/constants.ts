import type { AuthTab } from "./types"

export const TABS: { key: AuthTab; label: string }[] = [
  { key: "email", label: "Электронная почта" },
  { key: "phone", label: "Телефон" },
]

export const QUERY_KEYS = {
  email: "email",
  password: "password",
}
