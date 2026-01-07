import type { Rule } from "@/shared/ui"

export const emailValidator = (overrides?: Rule): Rule => ({
  type: "email",
  message: "Неверный e-mail",
  ...overrides,
})
