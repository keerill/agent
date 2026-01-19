import { reatomComponent } from "@reatom/react"
import { Input } from "antd"
import { useEffect, useState } from "react"

import { useNotifyAction } from "@/shared/hooks"
import { Button, Flex, Form } from "@/shared/ui"

import { useCreds } from "../../common/model"
import cls from "../../common/ui/styles.module.scss"
import { confirmOffer, offer } from "../api"
import { type AcceptanceForm, otpValidator } from "../model"

export const OfferAcceptance = reatomComponent(() => {
  const [form] = Form.useForm<AcceptanceForm>()
  const { email, password } = useCreds({ redirectIfMissing: true })

  const [hasAcceptedOffer, setHasAcceptedOffer] = useState(false)

  useEffect(() => {
    if (!email) return

    offer()
  }, [email])

  const confirmOfferAction = useNotifyAction({
    action: ({ code }: AcceptanceForm) =>
      confirmOffer({ email, password, code }),
    onError: true,
  })

  const isConfirming = confirmOffer.status().isPending

  const handleAcceptClick = () => {
    requestAnimationFrame(() => setHasAcceptedOffer(true))
  }

  const handleOpenBot = () => {
    window.open(import.meta.env.VITE_OFFER_AGREEMENT_BOT_LINK, "_blank")
  }

  const handleOpenOffer = () => {
    const url = offer.data()
    if (url) window.open(url, "_blank")
  }

  return (
    <Flex className={cls.wrap} align="center" justify="center" vertical>
      <Form form={form} onFinish={confirmOfferAction}>
        <div className="title">Принятие оферты</div>

        <div className="subtitle">
          {hasAcceptedOffer ?
            "Для того, чтобы принять оферту, введите код подтверждения. Код можно получить в Telegram-боте"
          : "Чтобы войти в Личный кабинет, пожалуйста ознакомьтесь и примите условия Оферты"
          }
        </div>

        {hasAcceptedOffer && (
          <Form.Item
            name="code"
            className="otp"
            rules={[otpValidator()]}
            validateTrigger="onBlur"
          >
            <Input.OTP length={4} />
          </Form.Item>
        )}

        <Form.Item>
          <Button
            htmlType={hasAcceptedOffer ? "submit" : "button"}
            loading={isConfirming}
            onClick={!hasAcceptedOffer ? handleAcceptClick : undefined}
          >
            {hasAcceptedOffer ? "Подтвердить" : "Принять оферту"}
          </Button>
        </Form.Item>

        {hasAcceptedOffer && (
          <Button
            className="tg-bot"
            type="extra-primary"
            onClick={handleOpenBot}
          >
            Перейти в Telegram-бота
          </Button>
        )}

        <Button type="extra-primary" onClick={handleOpenOffer}>
          Ознакомиться с офертой
        </Button>
      </Form>
    </Flex>
  )
})
