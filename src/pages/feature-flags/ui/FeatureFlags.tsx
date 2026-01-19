import { reatomComponent } from "@reatom/react"
import { RefreshCircle } from "fsk-design-system/icons"

import {
  type FeatureFlagName,
  type FeatureFlagsMap,
  featureFlags,
  initFeatureFlags,
} from "@/shared/feature-flags"
import { Button, Flex, Switch } from "@/shared/ui"

import cls from "./styles.module.scss"

export const FeatureFlags = reatomComponent(() => {
  const flags = featureFlags()

  const flagsList = Object.entries(flags)

  const isAllOn = flagsList.every(([_, { isOn }]) => isOn)

  const handleToggle = (key: FeatureFlagName) => () => {
    featureFlags.set((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        isOn: !prev[key].isOn,
      },
    }))
  }

  const handleToggleAll = () => {
    const isOn = !isAllOn

    const updatedFlags = Object.fromEntries(
      flagsList.map(([key, value]) => [key, { ...value, isOn }]),
    )

    featureFlags.set(updatedFlags as FeatureFlagsMap)
  }

  const handleRefresh = () => {
    initFeatureFlags(true)
  }

  const isRefreshing = initFeatureFlags.status().isPending

  return (
    <Flex className={cls.wrap} vertical gap={16}>
      <Flex gap={8}>
        <Button onClick={handleToggleAll} loading={isRefreshing}>
          {isAllOn ? "Выключить все" : "Включить все"}
        </Button>

        <Button
          className="refresh-btn"
          type="extra-primary"
          icon={<RefreshCircle />}
          onClick={handleRefresh}
          loading={isRefreshing}
        >
          Получить список акутальных флагов с бэка
        </Button>
      </Flex>

      <Flex vertical gap={8}>
        {flagsList.map(([key, { isOn, description, jiraLink }]) => (
          <Flex key={key} align="center" gap={4}>
            <Switch
              value={isOn}
              onChange={handleToggle(key as FeatureFlagName)}
            />
            {jiraLink ?
              <a href={jiraLink} target="_blank">
                {description}
              </a>
            : <span>{description}</span>}
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
})
