import type { ComponentType } from "react"

const pages = import.meta.glob("@/pages/**/index.{ts,tsx}")

export const getLazyComponent = (pageName: string) => {
  const match = Object.entries(pages).find(([path]) =>
    new RegExp(`/pages/${pageName}/index\\.tsx?$`).test(path),
  )

  if (!match) throw new Error(`Page ${pageName} not found`)

  const loader = match[1]

  return async () => {
    const module = (await loader()) as { default: ComponentType }
    return { Component: module.default }
  }
}
