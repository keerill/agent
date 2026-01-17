import { reatomComponent } from "@reatom/react"
import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router"

import { useNotifyAction } from "@/shared/hooks"
import { ROUTES } from "@/shared/routing"
import { Flex, Form } from "@/shared/ui"
import { Button, FormInput, FormPhoneInput, Tabs } from "@/shared/ui"
import {
  emailValidator,
  phoneValidator,
  requiredValidator,
} from "@/shared/validators"

import { signIn } from "../../common/api"
import { type SignInForm, authMeData, querykeys } from "../../common/model"
import cls from "../../common/styles.module.scss"
import { signInViaTg } from "../api"
import { type SignInTab, TABS, type TelegramUser } from "../model"
import { Telegram } from "./Telegram"

const onAuthTg = (user: TelegramUser) => {
  if (signIn.status().isPending || signInViaTg.status().isPending) return

  signInViaTg(user)
}

export const SignIn = reatomComponent(() => {
  const navigate = useNavigate()

  const [tab, setTab] = useState<SignInTab>("email")

  const beforeAutofillValueRef = useRef("")

  const signInAction = useNotifyAction({
    action: async (v: SignInForm) => {
      try {
        await signIn(v)
      } catch (error) {
        if (
          error instanceof Error &&
          error.message ===
            "Необходимо подписать договор оферты для продолжения работы"
        ) {
          navigate(
            `${ROUTES.auth.offerAcceptance}?${querykeys.email}=${authMeData()?.email || v.email}&${querykeys.password}=${v.password}`,
            {
              replace: true,
            },
          )
        }
      }
    },
    onError: true,
  })

  const isSignInning =
    signIn.status().isPending || signInViaTg.status().isPending

  return (
    <Flex className={cls.wrap} align="center" justify="center" vertical>
      <Form onFinish={signInAction}>
        <div className="title">Авторизация</div>

        <Tabs
          type="square-orange"
          activeKey={tab}
          onChange={(key) => setTab(key as SignInTab)}
          items={TABS}
        />

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
              rules: [phoneValidator(false, false, beforeAutofillValueRef)],
            }}
            input={{
              label: "Телефон",
              placeholder: "+7 999 999 99 99",
              size: "l",
              defaultIso2: "ru",
              defaultValue: "+7",
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
          <Button htmlType="submit" loading={isSignInning}>
            Войти
          </Button>
        </Form.Item>

        <Telegram onAuth={onAuthTg} />
      </Form>
    </Flex>
  )
})

const PasswordLabel = () => {
  return (
    <span className="password-label">
      <span>Пароль</span>
      <Link to={ROUTES.auth.resetPassword}>Не помню пароль</Link>
    </span>
  )
}
