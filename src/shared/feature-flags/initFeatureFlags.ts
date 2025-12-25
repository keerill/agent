export async function initFeatureFlags() {
  const flags = await fetchFeatureFlags()
  const script = `
    <script type="text/javascript">
      const flags = ${JSON.stringify(flags)}
      window.featureFlags = flags
    </script>
    `

  return script
}

type FlagsDto = {
  name: string
  description: string
  jiraLink: string
  isEnabled: boolean
}[]

async function fetchFeatureFlags() {
  try {
    const response: FlagsDto = await fetch(
      `${import.meta.env.VITE_API_URL}/feature`,
    ).then((res) => res.json())
    const flags = Object.fromEntries(
      response.map(({ name, ...flag }) => [
        name,
        {
          description: flag.description,
          jiraLink: flag.jiraLink,
          isOn: flag.isEnabled,
        },
      ]),
    )
    return flags || {}
  } catch {
    return {}
  }
}
