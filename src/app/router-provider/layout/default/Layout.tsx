import { reatomComponent } from "@reatom/react"
import { Layout, type LayoutProps } from "fsk-design-system"
import { Suspense } from "react"
import { Link, Outlet, useNavigate } from "react-router"

import { fullName, signOut, user } from "@/entities/user"
import { ROUTES, ROUTES_CONFIG } from "@/shared/routing"
import { Spin } from "@/shared/ui"

import { ThemeToggler } from "../common/ThemeToggler"
import { Logo } from "../common/logo"
import cls from "../common/styles.module.scss"

interface Props {
  hideSider?: boolean
}

export const DefaultLayout = reatomComponent((props: Props) => {
  const { hideSider } = props

  const navigate = useNavigate()

  const header = {
    antProps: { className: cls.header },
    logo: (
      <Link to={ROUTES.catalog}>
        <Logo />
      </Link>
    ),
    support,
    notifications,
    userMenu: {
      name: fullName(user()?.profile || {}),
      onLogout: signOut,
    },
    extraContent: { afterLogo: <ThemeToggler /> },
  }

  const menuItems: NonNullable<LayoutProps["sider"]>["menu"]["items"] =
    ROUTES_CONFIG.filter((item) => item.menu).map((item) => ({
      key: item.path,
      label: item.menu!.label,
      icon: item.menu!.icon,
      onClick: () => navigate(item.path),
    }))

  const sider: LayoutProps["sider"] =
    hideSider ? undefined : (
      {
        menu: {
          items: menuItems,
        },
        backBtn: { onBack: () => navigate(ROUTES.catalog) },
      }
    )

  return (
    <Layout
      header={header}
      sider={sider}
      antProps={{ rootClassName: cls.layout }}
    >
      <Suspense fallback={<Spin variant="circle" size="l" spinning />}>
        <Outlet />
      </Suspense>
    </Layout>
  )
})

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
