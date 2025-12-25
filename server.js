import express from "express"
import fs from "node:fs/promises"

import { initFeatureFlags } from "./src/shared/feature-flags"

const isProduction = process.env.NODE_ENV === "production"
const port = 3000
const base = "/"

const templateHtml =
  isProduction ? await fs.readFile("./dist/client/index.html", "utf-8") : ""

const app = express()

/** @type {import('vite').ViteDevServer | undefined} */
let vite
if (!isProduction) {
  const { createServer } = await import("vite")
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import("compression")).default
  const sirv = (await import("sirv")).default
  app.use(compression())
  app.use(base, sirv("./dist/client", { extensions: [] }))
}

app.use("*all", async (req, res, next) => {
  try {
    const skipPaths = ["/.well-known"]

    if (skipPaths.some((path) => req.originalUrl.startsWith(path))) {
      return next()
    }

    const url = req.originalUrl.replace(base, "")

    /** @type {string} */
    let template
    let handler
    let applyHeaders
    if (!isProduction) {
      template = await fs.readFile("./index.html", "utf-8")
      template = await vite.transformIndexHtml(url, template)
      const entry = await vite.ssrLoadModule("/src/app/entry.server.tsx")
      handler = entry.handler
      applyHeaders = entry.applyHeaders
    } else {
      template = templateHtml
      const entry = await vite.ssrLoadModule("/src/app/entry.server.tsx")
      handler = entry.handler
      applyHeaders = entry.applyHeaders
    }

    const result = await handler(req)

    if (result instanceof Response) {
      return result.send()
    }

    const featureFlagsScript = await initFeatureFlags()

    const html = template
      .replace(`<!--app-html-->`, result.html ?? "")
      .replace(`<!--app-feature-flags-script-->`, featureFlagsScript)

    res.status(result.status)
    applyHeaders(res, result.headers)
    res.send(html)
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
