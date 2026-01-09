import { reatomComponent } from "@reatom/react"
import { useEffect } from "react"
import { useNavigate } from "react-router"

import { ROUTES } from "@/shared/routing"
import { Flex, Form } from "@/shared/ui"
import { Button, FormInput } from "@/shared/ui"
import { emailValidator, requiredValidator } from "@/shared/validators"

import { offer } from "../../common/api"
import { useEmail } from "../../common/model"
import cls from "../../common/styles.module.scss"

export const OfferAcceptance = reatomComponent(() => {
  const navigate = useNavigate()

  const [form] = Form.useForm<{ email: string }>()

  const { email } = useEmail()

  useEffect(() => {
    offer()
    form.setFieldValue("email", email)
  }, [])

  const onClickOffer = () => window.open(offer.data(), "_blank")

  const onSubmit = () => {
    navigate(`${ROUTES.auth.offerConfirmation}?email=${email}`, {
      replace: true,
    })
  }

  return (
    <Flex className={cls.wrap} align="center" justify="center" vertical>
      <Form form={form} onFinish={onSubmit}>
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

        <Button type="extra-primary" onClick={onClickOffer}>
          Ознакомиться с офертой
        </Button>
      </Form>
    </Flex>
  )
})
