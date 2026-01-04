import { reatomComponent } from "@reatom/react"
import type { MenuProps } from "antd"
import { Layout as BaseLayout, type LayoutProps } from "fsk-design-system"
import { Suspense } from "react"
import { Outlet, useNavigate } from "react-router"

import { fullName, user } from "@/entities/user"
import { useTheme } from "@/shared/theme"
import { Spin } from "@/shared/ui"

import LogoDark from "./logo/logo-dark.svg"
import LogoLight from "./logo/logo-light.svg"

export const Layout = reatomComponent(() => {
  const navigate = useNavigate()

  const { theme } = useTheme()

  const support: LayoutProps["header"]["support"] = {
    phone: "8 800 30-13-494",
    email: "partner-an@fsk.ru",
    popupExtraContent: (
      <>
        <div>График работы</div>
        <div>ПН-ПТ 9.30-20.00, СБ-ВС 10.00-18.00</div>
      </>
    ),
  }

  const notifications: LayoutProps["header"]["notifications"] = {
    popupContent: <div>Notifications</div>,
  }

  const userProfile = user()?.profile || {}
  const userMenu: LayoutProps["header"]["userMenu"] = {
    name: fullName(userProfile),
  }

  const header: LayoutProps["header"] = {
    logo: theme === "light" ? LogoLight : LogoDark,
    support,
    userMenu,
    notifications,
  }

  const menuItems: MenuProps["items"] = []

  const sider: LayoutProps["sider"] = {
    menu: {
      items: menuItems,
    },
    backBtn: { onBack: () => navigate("/") },
  }

  return (
    <BaseLayout header={header} sider={sider}>
      <Suspense fallback={<Spin spinning />}>
        <Outlet />
      </Suspense>
    </BaseLayout>
  )
})
