import type { Rule } from "@/shared/ui"

export const requiredValidator = (overrides?: Rule): Rule => ({
  required: true,
  message: "Обязательное поле",
  ...overrides,
})
