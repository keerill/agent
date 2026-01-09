import { reatomComponent } from "@reatom/react"
import { Input } from "antd"

import { Flex, Form } from "@/shared/ui"
import { Button } from "@/shared/ui"

import { offer } from "../../common/api"
import { useEmail } from "../../common/model"
import cls from "../../common/styles.module.scss"
import { otpValidator } from "../model"

export const OfferConfirmation = reatomComponent(() => {
  const { email } = useEmail()
  console.log("email: ", email)

  //   export const confirmOfferAsync = reatomAsync(async (ctx, code: string) => {
  //   const { userEmail } = ctx.get(offerDataAtom)

  //   return await customFetch("/offer-agreement/sign", {
  //     method: "POST",
  //     body: {
  //       email: userEmail,
  //       code,
  //     },
  //   })
  // }, "confirmOfferAsync")
  // const onSubmit = async (body: ConfirmModel) => {
  //   try {
  //     await confirmOffer(body.code)

  //     const res = await fetchLogin(loginData)

  //     if (!("offerData" in res)) {
  //       fetchPermissions()
  //       setUser(res)
  //       setFormStatus("login")
  //       setLoginData({
  //         tab: "email",
  //         email: "",
  //         phone: "",
  //         password: "",
  //       })
  //     }

  //     navigate("/")
  //   } catch (err) {
  //     const error: Error =
  //       err instanceof Error ? err : new Error("Неверная почта или пароль")
  //     return {
  //       [FORM_ERROR]: error.message,
  //     }
  //   }
  // }

  return (
    <Flex className={cls.wrap} align="center" justify="center" vertical>
      <Form onFinish={(v) => console.log("v: ", v)}>
        <div className="title">Принятие оферты</div>

        <div className="subtitle">
          Для того, чтобы принять оферту, введите код подтверждения. Код можно
          получить в Telegram-боте
        </div>

        <Form.Item name="code" rules={[otpValidator()]}>
          <Input.OTP />
        </Form.Item>

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
