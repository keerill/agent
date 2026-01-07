import { Flex, Form } from "antd"
import React from "react"

import { Button, FormInput, FormPhoneInput, Tabs } from "@/shared/ui"
import { phoneValidator } from "@/shared/validators"

import { type SignInTab, TABS, useSignIn } from "../model"
import cls from "./styles.module.scss"

export const SignIn = () => {
  const { form, tab, setTab, error } = useSignIn()

  const beforeAutofillValueRef = React.useRef("")

  return (
    <Flex className={cls.wrap} align="center" justify="center" vertical>
      <Tabs
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
              rules: [{ type: "email", message: "Неверный e-mail" }],
            }}
            input={{
              label: "E-mail",
              placeholder: "e-mail",
              size: "l",
            }}
          />
        : <FormPhoneInput
            formItem={{
              name: "phone",
              // eslint-disable-next-line react-hooks/refs
              rules: [phoneValidator(false, false, beforeAutofillValueRef)],
            }}
            input={{
              label: "Телефон",
              placeholder: "телефон",
              size: "l",
            }}
          />
        }

        <FormInput
          formItem={{
            name: "password",
            rules: [{ required: true, message: "Обязательное поле" }],
          }}
          input={{
            label: "Пароль",
            type: "password",
            placeholder: "пароль",
            size: "l",
          }}
        />

        {error && <div className={cls.error}>{error}</div>}

        <Form.Item>
          <Button htmlType="submit" size="l" block>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  )
}
