import { reatomComponent } from "@reatom/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

import { useNotifyAction } from "@/shared/hooks"
import { ROUTES } from "@/shared/routing"
import { Button, Flex, Form } from "@/shared/ui"

import { type AuthTab, useCreds } from "../../common/model"
import { AuthTabsForm } from "../../common/ui"
import cls from "../../common/ui/styles.module.scss"
import { resetPassword } from "../api"
import { type ResetForm } from "../model"

export const PasswordReset = reatomComponent(() => {
  const navigate = useNavigate()
  const [tab, setTab] = useState<AuthTab>("email")

  const [form] = Form.useForm<ResetForm>()

  const { email } = useCreds()

  useEffect(() => {
    if (!email) return

    form.setFieldsValue({ email })
  }, [form, email])

  const handleBack = () => navigate(ROUTES.auth.signIn, { replace: true })

  const resetPasswordAction = useNotifyAction({
    action: resetPassword,
    onError: true,
  })

  const isResetting = resetPassword.status().isPending
  const isSent = resetPassword.status().isEverSettled

  return (
    <Flex className={cls.wrap} align="center" justify="center" vertical>
      <Form form={form} onFinish={resetPasswordAction}>
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
              <Button htmlType="submit" loading={isResetting}>
                Получить ссылку
              </Button>
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
