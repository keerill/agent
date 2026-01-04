import { PERSIST_KEY } from "./constants"
import type { FeatureFlagsMap, FlagName } from "./types"

class FeatureFlagService {
  private flags: FeatureFlagsMap
  private initialFlags: FeatureFlagsMap

  constructor() {
    const localOverrides = JSON.parse(localStorage.getItem(PERSIST_KEY) || "{}")
    const ssrFlags = window.featureFlags || {}
    this.flags = { ...ssrFlags, ...localOverrides }
    this.initialFlags = { ...ssrFlags, ...localOverrides }
  }

  isEnabled(flag: FlagName): boolean {
    return Boolean(this.flags[flag]?.isOn)
  }

  getAll(): FeatureFlagsMap {
    return { ...this.flags }
  }

  setFlag(flag: FlagName, isOn: boolean) {
    this.flags[flag] = { ...this.flags[flag], isOn }
    localStorage.setItem(PERSIST_KEY, JSON.stringify(this.flags))
  }

  setFlags(flags: FeatureFlagsMap) {
    this.flags = { ...flags }
    localStorage.setItem(PERSIST_KEY, JSON.stringify(this.flags))
  }

  reset() {
    localStorage.removeItem(PERSIST_KEY)
    this.flags = { ...this.initialFlags }
  }
}

const initFeatureFlags = async () => {
  const flags = await fetchFeatureFlags()

  window.featureFlags = flags
}

type FlagsDto = {
  name: string
  description: string
  jiraLink: string
  isEnabled: boolean
}[]

const fetchFeatureFlags = async (): Promise<FeatureFlagsMap | object> => {
  try {
    const response: FlagsDto = await fetch(
      `${import.meta.env.VITE_API_URL}/feature`,
    ).then((res) => res.json())

    const flags = Object.fromEntries(
      response.map(({ name, ...flag }) => [
        name,
        {
          description: flag.description,
          jiraLink: flag.jiraLink,
          isOn: flag.isEnabled,
        },
      ]),
    )

    return flags || {}
  } catch {
    return {}
  }
}

;(async () => {
  await initFeatureFlags()
})()

export const featureFlags = new FeatureFlagService()
