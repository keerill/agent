import type { ReactNode } from "react"

import { type NotificationArgsProps, useNotification } from "@/shared/ui"

type Args = Omit<NotificationArgsProps, "message"> & {
  message: ReactNode | undefined
}

interface Props<Params, Result> {
  action: (params: Params) => Promise<Result>
  onSuccess?: Args
  onError?: Args | boolean
}

export const useNotifyAction = <Params, Result>(
  props: Props<Params, Result>,
) => {
  const { action: fn, onSuccess, onError } = props

  const notify = useNotification()

  const apiAction = async (params: Params) => {
    try {
      const result = await fn(params)

      if (onSuccess?.message) {
        notify.success(onSuccess)
      }

      return result
    } catch (err) {
      let message = ""

      if (
        err instanceof Error &&
        "errors" in err &&
        Array.isArray(err.errors)
      ) {
        message = err.errors.map((err) => err.message).join("; ")
      } else if (err instanceof Error) {
        message = err.message
      } else if (typeof err === "string") {
        message = err
      }

      if (onError) {
        notify.error({
          ...(typeof onError === "boolean" ? {} : onError),
          message,
        })
      } else {
        throw err
      }
    }
  }

  return apiAction
}
