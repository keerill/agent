import { MoonStars, SunFog } from "@/shared/icons"
import { useTheme } from "@/shared/theme"
import { Button } from "@/shared/ui"

export const ThemeToggler = () => {
  const { theme, changeTheme } = useTheme()

  const isLight = theme === "light"

  return (
    <Button
      type="link-secondary"
      onClick={() => changeTheme(isLight ? "dark" : "light")}
      icon={isLight ? <SunFog /> : <MoonStars />}
    />
  )
}
