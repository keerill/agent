import { reatomComponent } from "@reatom/react"

import { Flex, Form } from "@/shared/ui"
import { Button } from "@/shared/ui"

import { offer } from "../../common/api"
import { useEmail } from "../../common/model"
import cls from "../../common/styles.module.scss"

export const OfferConfirmation = reatomComponent(() => {
  const [form] = Form.useForm<{ email: string }>()

  const { email } = useEmail()
  console.log("email: ", email)

  return (
    <Flex className={cls.wrap} align="center" justify="center" vertical>
      <Form form={form}>
        <div className="title">Принятие оферты</div>

        <div className="subtitle">
          Для того, чтобы принять оферту, введите код подтверждения. Код можно
          получить в Telegram-боте
        </div>

        <Form.Item>
          <Button htmlType="submit">Подтвердить оферту</Button>
        </Form.Item>

        <Button
          className="tg-bot"
          type="extra-primary"
          onClick={() =>
            window.open(import.meta.env.VITE_OFFER_AGREEMENT_BOT_LINK, "_blank")
          }
        >
          Перейти в Telegram-бота
        </Button>

        <Button
          type="extra-primary"
          onClick={() => window.open(offer.data(), "_blank")}
        >
          Ознакомиться с офертой
        </Button>
      </Form>
    </Flex>
  )
})
