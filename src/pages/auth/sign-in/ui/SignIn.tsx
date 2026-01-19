import { reatomComponent } from "@reatom/react"
import { useState } from "react"
import { Link, useNavigate } from "react-router"

import { useNotifyAction } from "@/shared/hooks"
import { ROUTES } from "@/shared/routing"
import { Button, Flex, Form, FormInput } from "@/shared/ui"
import { requiredValidator } from "@/shared/validators"

import { signIn } from "../../common/api"
import {
  type AuthTab,
  QUERY_KEYS,
  type SignInForm,
  authMeData,
} from "../../common/model"
import { AuthTabsForm } from "../../common/ui"
import cls from "../../common/ui/styles.module.scss"
import { signInViaTg } from "../api"
import { type TelegramUser } from "../model"
import { Telegram } from "./Telegram"

const handleTgAuth = (user: TelegramUser) => {
  if (signIn.status().isPending || signInViaTg.status().isPending) return
  signInViaTg(user)
}

export const SignIn = reatomComponent(() => {
  const navigate = useNavigate()
  const [tab, setTab] = useState<AuthTab>("email")

  const signInAction = useNotifyAction({
    action: async (values: SignInForm) => {
      try {
        await signIn(values)
      } catch (error) {
        if (
          error instanceof Error &&
          error.message ===
            "Необходимо подписать договор оферты для продолжения работы"
        ) {
          navigate(
            `${ROUTES.auth.offerAcceptance}?${QUERY_KEYS.email}=${
              authMeData()?.email || values.email
            }&${QUERY_KEYS.password}=${values.password}`,
            { replace: true },
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

        <AuthTabsForm tab={tab} onTabChange={setTab} />

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

        <Telegram onAuth={handleTgAuth} />
      </Form>
    </Flex>
  )
})

const PasswordLabel = () => (
  <span className="password-label">
    <span>Пароль</span>
    <Link to={ROUTES.auth.passwordReset}>Не помню пароль</Link>
  </span>
)
