import { action } from "@reatom/core"
import type { Action, AtomLike, AtomState, Ext } from "@reatom/core"

interface ResetExt<State> {
  reset: Action<[], State>
}

export const withReset =
  <Target extends AtomLike>(
    initialValue: AtomState<Target>,
  ): Ext<Target, ResetExt<AtomState<Target>>> =>
  (target) => ({
    reset: action(
      () => typeof target.set === "function" && target.set(initialValue),
      target.name ? `${target.name}.reset` : undefined,
    ),
  })
