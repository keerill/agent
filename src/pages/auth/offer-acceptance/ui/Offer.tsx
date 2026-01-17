import { reatomComponent } from "@reatom/react"
import { Input } from "antd"
import { useEffect, useState } from "react"

import { useNotifyAction } from "@/shared/hooks"
import { Flex, Form } from "@/shared/ui"
import { Button } from "@/shared/ui"

import { useCreds } from "../../common/model"
import cls from "../../common/styles.module.scss"
import { confirmOffer, offer } from "../api"
import { type AcceptanceForm, otpValidator } from "../model"

export const OfferAcceptance = reatomComponent(() => {
  const [form] = Form.useForm<AcceptanceForm>()

  const { email, password } = useCreds()

  const [isAccepted, setIsAccepted] = useState(false)

  useEffect(() => {
    offer()
  }, [])

  const onClickOffer = () => window.open(offer.data(), "_blank")

  const confirmOfferAction = useNotifyAction({
    action: confirmOffer,
    onError: true,
  })
  const isConfirming = confirmOffer.status().isPending

  const onSubmit = () => {
    confirmOfferAction({ email, password, code: form.getFieldValue("code") })
  }

  return (
    <Flex className={cls.wrap} align="center" justify="center" vertical>
      <Form form={form} onFinish={onSubmit}>
        <div className="title">Принятие оферты</div>

        <div className="subtitle">
          {isAccepted ?
            "Для того, чтобы принять оферту, введите код подтверждения. Код можно получить в Telegram-боте"
          : "Чтобы войти в Личный кабинет, пожалуйста ознакомьтесь и примите условия Оферты"
          }
        </div>

        {isAccepted && (
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
            htmlType={isAccepted ? "submit" : "button"}
            loading={isConfirming}
            onClick={() => requestAnimationFrame(() => setIsAccepted(true))}
          >
            {isAccepted ? "Подтвердить" : "Принять оферту"}
          </Button>
        </Form.Item>

        {isAccepted && (
          <Button
            className="tg-bot"
            type="extra-primary"
            onClick={() =>
              window.open(
                import.meta.env.VITE_OFFER_AGREEMENT_BOT_LINK,
                "_blank",
              )
            }
          >
            Перейти в Telegram-бота
          </Button>
        )}

        <Button type="extra-primary" onClick={onClickOffer}>
          Ознакомиться с офертой
        </Button>
      </Form>
    </Flex>
  )
})
