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

export const featureFlags = new FeatureFlagService()
