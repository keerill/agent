import { reatomComponent } from "@reatom/react"
import { Layout } from "fsk-design-system"
import { Suspense } from "react"
import { Outlet } from "react-router"

import { Spin } from "@/shared/ui"

import { ThemeToggler } from "../common/ThemeToggler"
import { Logo } from "../common/logo"
import cls from "../common/styles.module.scss"

export const AuthLayout = reatomComponent(() => {
  const header = {
    antProps: { className: cls.header },
    logo: <Logo />,
    extraContent: { afterLogo: <ThemeToggler /> },
  }

  return (
    <Layout header={header} antProps={{ rootClassName: cls.layout }}>
      <Suspense fallback={<Spin variant="circle" size="l" spinning />}>
        <Outlet />
      </Suspense>
    </Layout>
  )
})
