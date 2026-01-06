import { reatomComponent } from "@reatom/react"
import type { MenuProps } from "antd"
import { Layout as BaseLayout, type LayoutProps } from "fsk-design-system"
import { Suspense } from "react"
import { Link, Outlet, useNavigate } from "react-router"

import { fullName, user } from "@/entities/user"
import { useTheme } from "@/shared/theme"
import { Spin } from "@/shared/ui"

import { ThemeToggler } from "./ThemeToggler"
import LogoDark from "./logo/logo-dark.svg"
import LogoLight from "./logo/logo-light.svg"
import cls from "./styles.module.scss"

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

export const Layout = reatomComponent(() => {
  const navigate = useNavigate()

  const { theme } = useTheme()

  const header = {
    antProps: { className: cls.header },
    logo: (
      <Link to="/">
        {theme === "light" ?
          <LogoLight />
        : <LogoDark />}
      </Link>
    ),
    support,
    notifications,
    userMenu: {
      name: fullName(user()?.profile || {}),
    },
    extraContent: { afterLogo: <ThemeToggler /> },
  }

  const menuItems: MenuProps["items"] = []

  const sider: LayoutProps["sider"] = {
    menu: {
      items: menuItems,
    },
    backBtn: { onBack: () => navigate("/") },
  }

  return (
    <BaseLayout
      header={header}
      sider={sider}
      antProps={{ rootClassName: cls.layout }}
    >
      <Suspense fallback={<Spin variant="circle" size="l" spinning />}>
        <Outlet />
      </Suspense>
    </BaseLayout>
  )
})
