import { memo, useEffect, useRef } from "react"

import type { TelegramUser } from "../model"

interface Props {
  onAuth: (user: TelegramUser) => void
}

export const Telegram = memo((props: Props) => {
  const { onAuth } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const scriptRef = useRef<HTMLScriptElement>()

  useEffect(() => {
    window.telegramAuthLogin = { onAuthCallback: onAuth }

    const script = document.createElement("script")

    script.async = true
    script.src = "https://telegram.org/js/telegram-widget.js?22"

    script.setAttribute(
      "data-telegram-login",
      import.meta.env.VITE_TG_AUTH_BOT_URL,
    )
    script.setAttribute("data-size", "medium")
    script.setAttribute("data-request-access", "write")
    script.setAttribute("data-userpic", "false")
    script.setAttribute("data-onauth", "telegramAuthLogin.onAuthCallback(user)")

    scriptRef.current = script
    containerRef.current?.appendChild(script)

    return () => {
      scriptRef.current?.remove()

      if (containerRef.current) {
        const iframe = containerRef.current.querySelector<HTMLIFrameElement>(
          'iframe[src*="oauth.telegram.org"]',
        )
        iframe?.remove()
      }
    }
  }, [onAuth])

  return <div ref={containerRef} className="tg-widget" />
})
