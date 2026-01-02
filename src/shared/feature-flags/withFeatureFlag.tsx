import { type ComponentType, Suspense, lazy } from "react"

import type { FlagName } from "./types"
import { useFeatureFlag } from "./useFeatureFlag"

export const withFeatureFlag = (
  Component: ComponentType,
  flagName: FlagName,
  FallbackComponent?: ComponentType,
): ComponentType => {
  return () => {
    const isEnabled = useFeatureFlag(flagName)

    if (!isEnabled) {
      return FallbackComponent ? <FallbackComponent /> : null
    }

    return <Component />
  }
}

export const withFeatureFlagLazy = (
  importFunc: () => Promise<{ default: ComponentType }>,
  flagName: FlagName,
  FallbackComponent?: ComponentType,
): ComponentType => {
  const LazyComponent = lazy(importFunc)

  const Wrapped = () => (
    <Suspense fallback={<h1>Loading...</h1>}>
      <LazyComponent />
    </Suspense>
  )

  return withFeatureFlag(Wrapped, flagName, FallbackComponent)
}
