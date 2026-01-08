import { reatomComponent } from "@reatom/react"
import { useLayoutEffect } from "react"

import { Flex, Form } from "@/shared/ui"
import { Button, FormInput } from "@/shared/ui"
import { emailValidator, requiredValidator } from "@/shared/validators"

import cls from "../../common/styles.module.scss"
import { useEmail } from "../../common/useEmail"
import { offer } from "../api"

export const OfferConfirmation = reatomComponent(() => {
  const [form] = Form.useForm<{ email: string }>()

  const { email } = useEmail()
  console.log("email: ", email)

  useLayoutEffect(() => {
    offer()
  }, [])

  const onClickOffer = () => window.open(offer.data(), "_blank")

  return (
    <Flex className={cls.wrap} align="center" justify="center" vertical>
      <Form form={form}>
        <div className="title">Принятие оферты</div>

        <div className="subtitle">
          Для того, чтобы принять оферту, введите код подтверждения. Код можно
          получить в Telegram-боте
        </div>

        <FormInput
          formItem={{
            name: "email",
            required: true,
            rules: [requiredValidator(), emailValidator()],
          }}
          input={{
            label: "E-mail",
            placeholder: "example@mail.ru",
            size: "l",
          }}
        />

        <Form.Item>
          <Button htmlType="submit">Подтвердить оферту</Button>
        </Form.Item>

        <Button
          className="tg-bot"
          type="extra-primary"
          onClick={() =>
            window.open(import.meta.env.VITE_TG_AUTH_BOT_URL, "_blank")
          }
        >
          Перейти в Telegram-бота
        </Button>

        <Button type="extra-primary" onClick={onClickOffer}>
          Ознакомиться с офертой
        </Button>
      </Form>
    </Flex>
  )
})
