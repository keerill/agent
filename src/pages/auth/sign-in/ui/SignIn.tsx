import React from "react"

import { Flex, Form } from "@/shared/ui"
import { Button, FormInput, FormPhoneInput, Tabs } from "@/shared/ui"
import {
  emailValidator,
  phoneValidator,
  requiredValidator,
} from "@/shared/validators"

import { type SignInTab, TABS, useSignIn } from "../model"
import cls from "./styles.module.css"

export const SignIn = () => {
  const { form, tab, setTab } = useSignIn()

  const beforeAutofillValueRef = React.useRef("")

  return (
    <Flex className={cls.wrap} align="center" justify="center" vertical>
      <div className="title">Авторизация</div>

      <Tabs
        type="square-orange"
        activeKey={tab}
        onChange={(key) => setTab(key as SignInTab)}
        items={TABS}
      />

      <Form
        form={form}
        layout="vertical"
        onFinish={(v) => console.log("v: ", v)}
      >
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

        <FormInput
          formItem={{
            name: "password",
            required: true,
            rules: [requiredValidator()],
          }}
          input={{
            label: "Пароль",
            type: "password",
            placeholder: "123456",
            size: "l",
          }}
        />

        <Form.Item>
          <Button htmlType="submit" size="l">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  )
}
