import { reatomComponent } from "@reatom/react"
import { useLayoutEffect } from "react"
import { useNavigate } from "react-router"

import { ROUTES } from "@/shared/routing"
import { Flex, Form } from "@/shared/ui"
import { Button, FormInput } from "@/shared/ui"
import { emailValidator, requiredValidator } from "@/shared/validators"

import cls from "../../common/styles.module.scss"
import { offer } from "../api"

export const OfferAcceptance = reatomComponent(() => {
  const navigate = useNavigate()

  const [form] = Form.useForm<{ email: string }>()

  useLayoutEffect(() => {
    const params = new URLSearchParams(new URL(window.location.href).search)
    const email = params.get("email")

    if (!email) {
      navigate(ROUTES.auth.signIn)
      return
    }

    offer()

    // params.delete("email")
    // window.history.replaceState(null, "", `?${params.toString()}`)

    form.setFieldValue("email", email)
  }, [])

  const onClickOffer = () => window.open(offer.data(), "_blank")

  return (
    <Flex className={cls.wrap} align="center" justify="center" vertical>
      <Form form={form}>
        <div className="title">Принятие оферты</div>

        <div className="subtitle">
          Чтобы войти в Личный кабинет, пожалуйста ознакомьтесь и примите
          условия Оферты
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
          <Button htmlType="submit">Принять оферту</Button>
        </Form.Item>

        <Button type="extra-outline" onClick={onClickOffer}>
          Ознакомиться с офертой
        </Button>
      </Form>
    </Flex>
  )
})
