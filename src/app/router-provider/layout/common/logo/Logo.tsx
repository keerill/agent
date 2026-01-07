import { useTheme } from "@/shared/theme"

import LogoDark from "./logo-dark.svg"
import LogoLight from "./logo-light.svg"

export const Logo = () => {
  const { theme } = useTheme()

  return theme === "light" ? <LogoLight /> : <LogoDark />
}
