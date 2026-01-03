import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express"
import { renderToString } from "react-dom/server"
import {
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
} from "react-router"

import { routes } from "./router-provider"

const { query, dataRoutes, queryRoute } = createStaticHandler(routes)

export const handler = (expressRequest: ExpressRequest) => {
  const request = expressToFetchRequest(expressRequest)

  if (request.headers?.get?.("Accept")?.includes("application/json")) {
    return handleDataRequest(request)
  } else {
    return handleDocumentRequest(request)
  }
}

const expressToFetchRequest = (req: ExpressRequest) => {
  const origin = `${req.protocol}://${req.get("host")}`
  const url = new URL(req.originalUrl || req.url, origin)

  const controller = new AbortController()
  req.on("close", () => controller.abort())

  return new Request(url, {
    method: req.method,
    headers: new Headers(req.headers as HeadersInit),
    body: req.method === "GET" || req.method === "HEAD" ? undefined : req.body,
    signal: controller.signal,
  })
}

const handleDocumentRequest = async (request: Request) => {
  const context = await query(request)

  if (context instanceof Response) {
    return context
  }

  const router = createStaticRouter(dataRoutes, context)

  const html = renderToString(
    <StaticRouterProvider router={router} context={context} />,
  )

  const deepestMatch = context.matches[context.matches.length - 1]
  const actionHeaders = context.actionHeaders[deepestMatch.route.id]
  const loaderHeaders = context.loaderHeaders[deepestMatch.route.id]

  const headers = new Headers(actionHeaders)

  if (loaderHeaders) {
    for (const [key, value] of loaderHeaders.entries()) {
      headers.append(key, value)
    }
  }

  headers.set("Content-Type", "text/html; charset=utf-8")

  return {
    html,
    headers,
    status: context.statusCode,
  }
}

const handleDataRequest = async (request: Request) => {
  const newRequest =
    request.method === "POST" ?
      new Request(request.url, {
        method: request.method,
        headers: request.headers,
        // @ts-expect-error this is valid, types are wrong
        body: new URLSearchParams(await request.formData()),
      })
    : new Request(request.url, { headers: request.headers })

  const data = await queryRoute(newRequest)

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}

export const applyHeaders = (res: ExpressResponse, headers: Headers) => {
  headers.forEach((value, key) => {
    if (!/[^\t\x20-\x7e\x80-\xff]/.test(value)) {
      res.setHeader(key, value)
    }
  })
}
