import { Flex, Form } from "antd"

import { Button, FormInput, Tabs } from "@/shared/ui"

import {
  type SignInTab,
  TABS,
  emailValidator,
  phoneValidator,
  useSignIn,
} from "../model"
import cls from "./styles.module.scss"

export const SignIn = () => {
  const { form, tab, setTab, error } = useSignIn()

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
              rules: [emailValidator()],
            }}
            input={{
              label: "E-mail",
              placeholder: "e-mail",
              size: "l",
            }}
          />
        : <FormInput
            formItem={{
              name: "phone",
              rules: [phoneValidator()],
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
