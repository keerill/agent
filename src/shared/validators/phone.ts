import type { MaskitoMask, MaskitoMaskExpression } from "@maskito/core"

import { createMaskOptions, findCountry, initCountries } from "@/shared/utils"

const countriesData = initCountries()

export const phoneValidator = (
  clearableCountryCode: boolean,
  preserveCountryCode: boolean,
  beforeAutofillValueRef: React.MutableRefObject<string>,
) => ({
  validator(_: unknown, value: string) {
    const country = findCountry(countriesData, value, undefined)

    const maskOptions = createMaskOptions(
      country,
      clearableCountryCode,
      preserveCountryCode,
      beforeAutofillValueRef,
    )

    const maxLength = maskLength(maskOptions.mask, { value, selection: [0, 0] })

    if (value.length < maxLength) {
      return Promise.reject("Некорректный номер телефона")
    }

    return Promise.resolve()
  },
})

type ElementState = {
  value: string
  selection: [number, number]
}

const maskLength = (mask: MaskitoMask, elementState?: ElementState): number => {
  return flattenMask(mask, elementState)
    .map((m) => (m instanceof RegExp ? 1 : m.length))
    .reduce((a, b) => a + b, 0)
}

const flattenMask = (
  mask: MaskitoMask,
  elementState?: ElementState,
): (RegExp | string)[] => {
  let resolved: MaskitoMaskExpression

  if (typeof mask === "function") {
    resolved = mask(elementState!)
  } else {
    resolved = mask
  }

  if (Array.isArray(resolved)) {
    return resolved
  }

  return [resolved]
}
