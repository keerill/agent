import { action, atom, withAsync, withLocalStorage, wrap } from "@reatom/core"

import { PERSIST_KEY } from "./constants"
import type { FeatureFlagName, FeatureFlagsMap } from "./types"

interface FlagDto {
  name: FeatureFlagName
  description: string
  jiraLink: string
  isEnabled: boolean
}

export const featureFlags = atom<FeatureFlagsMap>({} as FeatureFlagsMap).extend(
  withLocalStorage(PERSIST_KEY),
)

export const initFeatureFlags = action(async (reset?: boolean) => {
  const raw = await wrap(
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/feature`),
  )
  const data: FlagDto[] = await wrap(raw.json())

  const remoteFlags = mapDtoToFlags(data)

  if (!reset) {
    const persisted = featureFlags()
    if (persisted) {
      featureFlags.set(mergeWithPersisted(remoteFlags, persisted))
      return
    }
  }

  featureFlags.set(remoteFlags)
}).extend(withAsync({ status: true }))

const mapDtoToFlags = (data: FlagDto[]): FeatureFlagsMap =>
  Object.fromEntries(
    data.map(({ name, description, jiraLink, isEnabled }) => [
      name,
      { description, jiraLink, isOn: isEnabled },
    ]),
  ) as FeatureFlagsMap

const mergeWithPersisted = (
  remote: FeatureFlagsMap,
  persisted: FeatureFlagsMap,
): FeatureFlagsMap =>
  Object.fromEntries(
    Object.entries(remote).map(([key, value]) => [
      key,
      {
        ...value,
        isOn:
          key in persisted ?
            persisted[key as FeatureFlagName].isOn
          : value.isOn,
      },
    ]),
  ) as FeatureFlagsMap
