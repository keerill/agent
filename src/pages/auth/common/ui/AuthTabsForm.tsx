import { useRef } from "react"

import { FormInput, FormPhoneInput, Tabs } from "@/shared/ui"
import {
  emailValidator,
  phoneValidator,
  requiredValidator,
} from "@/shared/validators"

import { type AuthTab, TABS } from "../model"

type Props = {
  tab: AuthTab
  onTabChange: (tab: AuthTab) => void
}

export const AuthTabsForm = ({ tab, onTabChange }: Props) => {
  const beforeAutofillValueRef = useRef("")

  return (
    <>
      <Tabs
        type="square-orange"
        activeKey={tab}
        items={TABS}
        onChange={(key) => onTabChange(key as AuthTab)}
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
            // eslint-disable-next-line react-hooks/refs
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
    </>
  )
}
