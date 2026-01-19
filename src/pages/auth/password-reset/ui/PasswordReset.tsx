import { reatomComponent } from "@reatom/react"
import { useState } from "react"
import { useNavigate } from "react-router"

import { ROUTES } from "@/shared/routing"
import { Button, Flex, Form } from "@/shared/ui"

import type { AuthTab } from "../../common/model"
import cls from "../../common/styles.module.scss"
import { AuthTabsForm } from "../../common/ui"
import { type AcceptanceForm } from "../model"

export const PasswordReset = reatomComponent(() => {
  const navigate = useNavigate()
  const [tab, setTab] = useState<AuthTab>("email")
  const [isSent, setIsSent] = useState(false)

  const [form] = Form.useForm<AcceptanceForm>()

  const handleSubmit = () => setIsSent(true)
  const handleBack = () => navigate(ROUTES.auth.signIn, { replace: true })

  return (
    <Flex className={cls.wrap} align="center" justify="center" vertical>
      <Form form={form} onFinish={handleSubmit}>
        <div className="title">
          {isSent ? "Ссылка отправлена" : "Восстановление пароля"}
        </div>

        <div className="subtitle">
          {isSent ?
            "Для восстановления пароля следуйте инструкциям из сообщения"
          : "Мы отправим на вашу электронную почту ссылку для восстановления пароля"
          }
        </div>

        {!isSent && (
          <>
            <AuthTabsForm tab={tab} onTabChange={setTab} />

            <Form.Item>
              <Button htmlType="submit">Получить ссылку</Button>
            </Form.Item>
          </>
        )}

        <Button type="extra-primary" onClick={handleBack}>
          {isSent ? "Ок" : "Отмена"}
        </Button>
      </Form>
    </Flex>
  )
})
