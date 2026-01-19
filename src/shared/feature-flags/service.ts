import {
  action,
  atom,
  computed,
  withAsync,
  withLocalStorage,
  wrap,
} from "@reatom/core"

import { PERSIST_KEY } from "./constants"
import type { FeatureFlagName, FeatureFlagsMap } from "./types"

interface FlagDto {
  name: FeatureFlagName
  description: string
  jiraLink: string
  isEnabled: boolean
}

const remoteFeatureFlags = atom<FeatureFlagsMap>({} as FeatureFlagsMap).extend(
  withLocalStorage(PERSIST_KEY),
)

export const localFeatureFlags = atom<
  Partial<Record<FeatureFlagName, boolean>>
>({}).extend(withLocalStorage(`${PERSIST_KEY}-local`))

export const featureFlags = computed(() => {
  const remote = remoteFeatureFlags()
  const overrides = localFeatureFlags()

  return Object.fromEntries(
    Object.entries(remote).map(([key, value]) => [
      key,
      {
        ...value,
        isOn: overrides[key as FeatureFlagName] ?? value.isOn,
      },
    ]),
  ) as FeatureFlagsMap
})

export const initFeatureFlags = action(async (resetOverrides?: boolean) => {
  const raw = await wrap(
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/feature`),
  )
  const data: FlagDto[] = await wrap(raw.json())

  const remoteFlags = mapDtoToFlags(data)

  remoteFeatureFlags.set(remoteFlags)

  if (resetOverrides) {
    localFeatureFlags.set({})
  }
}).extend(withAsync({ status: true }))

const mapDtoToFlags = (data: FlagDto[]): FeatureFlagsMap =>
  Object.fromEntries(
    data.map(({ name, description, jiraLink, isEnabled }) => [
      name,
      { description, jiraLink, isOn: isEnabled },
    ]),
  ) as FeatureFlagsMap
