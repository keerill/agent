import { action, atom, withAsync, withLocalStorage, wrap } from "@reatom/core"

import { withReset } from "../utils"
import { PERSIST_KEY } from "./constants"
import type { FeatureFlag, FeatureFlagsMap, FlagName } from "./types"

interface FlagDto {
  name: FlagName
  description: string
  jiraLink: string
  isEnabled: boolean
}

const initialFeatureFlags = atom<FeatureFlagsMap>()
export const featureFlags = atom<FeatureFlagsMap>().extend(
  withLocalStorage(PERSIST_KEY),
  withReset(initialFeatureFlags()),
)

export const initFeatureFlags = action(async () => {
  const raw = await wrap(
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/feature`),
  )
  const data: FlagDto[] = await wrap(raw.json())

  const flags = Object.fromEntries<FeatureFlag>(
    data.map(({ name, ...flag }) => [
      name,
      {
        description: flag.description,
        jiraLink: flag.jiraLink,
        isOn: flag.isEnabled,
      },
    ]),
  ) as FeatureFlagsMap

  featureFlags.set(flags)
  initialFeatureFlags.set(flags)
}).extend(withAsync({ status: true }))
