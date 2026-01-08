import { useCallback, useRef, useState } from "react"
import { Link } from "react-router"

import { type TelegramUser, signInViaTg } from "@/entities/user"
import { useNotifyAction } from "@/shared/hooks"
import { ROUTES } from "@/shared/routing"
import { Flex, Form } from "@/shared/ui"
import { Button, FormInput, FormPhoneInput, Tabs } from "@/shared/ui"
import {
  emailValidator,
  phoneValidator,
  requiredValidator,
} from "@/shared/validators"

import { signIn } from "../api"
import { type SignInTab, TABS } from "../model"
import { Telegram } from "./Telegram"
import cls from "./styles.module.scss"

export const SignIn = () => {
  const [tab, setTab] = useState<SignInTab>("email")

  const beforeAutofillValueRef = useRef("")

  const signInAction = useNotifyAction({
    action: signIn,
    onError: true,
  })

  const onAuthTg = useCallback(
    () => (user: TelegramUser) => {
      if (signInViaTg.pending()) return

      signInViaTg(user)
    },
    [],
  )

  return (
    <Flex className={cls.wrap} align="center" justify="center" vertical>
      <div className="title">Авторизация</div>

      <Tabs
        type="square-orange"
        activeKey={tab}
        onChange={(key) => setTab(key as SignInTab)}
        items={TABS}
      />

      <Form onFinish={signInAction}>
        {tab === "email" ?
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
        : <FormPhoneInput
            formItem={{
              name: "phone",
              required: true,
              // eslint-disable-next-line react-hooks/refs
              rules: [phoneValidator(false, false, beforeAutofillValueRef)],
            }}
            input={{
              label: "Телефон",
              placeholder: "+7 999 999 99 99",
              size: "l",
            }}
          />
        }

        {/* TODO: Заменить надо Input.Password */}
        <FormInput
          formItem={{
            name: "password",
            required: true,
            rules: [requiredValidator()],
          }}
          input={{
            className: "password-input",
            label: <PasswordLabel />,
            type: "password",
            placeholder: "123456",
            size: "l",
          }}
        />

        <Form.Item>
          <Button htmlType="submit">Войти</Button>
        </Form.Item>

        <Telegram onAuth={onAuthTg} />
      </Form>
    </Flex>
  )
}

const PasswordLabel = () => {
  return (
    <span className="password-label">
      <span>Пароль</span>
      <Link to={ROUTES.auth.resetPassword}>Не помню пароль</Link>
    </span>
  )
}
