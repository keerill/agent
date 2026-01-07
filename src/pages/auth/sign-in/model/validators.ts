const EMAIL_REGEX =
  /^[а-яА-Яa-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[а-яА-Яa-zA-Z0-9-]{2,}(?:\.[а-яА-Яa-zA-Z0-9-]{2,})+$/

export const emailValidator = () => ({
  validator(_: unknown, value?: string) {
    if (!value) {
      return Promise.reject("Обязательное поле")
    }
    if (!EMAIL_REGEX.test(value)) {
      return Promise.reject("Некорректная почта")
    }
    return Promise.resolve()
  },
})

export const phoneValidator = () => ({
  validator(_: unknown, value?: string) {
    if (!value) {
      return Promise.reject("Обязательное поле")
    }

    return Promise.resolve()
  },
})
