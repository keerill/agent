import { useEffect, useState } from "react"

import { featureFlags } from "./service"
import type { FlagName } from "./types"

export function useFeatureFlag(flag: FlagName) {
  const [enabled, setEnabled] = useState(featureFlags.isEnabled(flag))

  useEffect(() => {
    setEnabled(featureFlags.isEnabled(flag))
  }, [flag])

  return enabled
}
