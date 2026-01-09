import type { Rule } from "@/shared/ui"

export const otpValidator = (): Rule => ({
  validator(_: unknown, value: string) {
    if (value && value.length === 6) {
      return Promise.resolve()
    }
    return Promise.reject("Код должен состоять из 6 цифр")
  },
})
