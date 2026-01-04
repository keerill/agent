/// <reference types="vite-plugin-svgr/client" />
import type { FeatureFlagsMap } from "@/shared/feature-flags"

declare global {
  interface ViteTypeOptions {
    strictImportMetaEnv: unknown
  }

  interface ImportMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_WEBSOCKET_URL: string
    readonly VITE_IS_STAGE: string
    readonly VITE_TG_AUTH_BOT_URL: string
    readonly VITE_DSN_URL: string
    readonly VITE_PROD_URL: string
    readonly VITE_S3_DOMAIN: string
    readonly VITE_SUPPORT_BOT_LINK: string
    readonly VITE_OFFER_AGREEMENT_BOT_LINK: string
    readonly VITE_TELEGRAM_URL: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }

  interface Window {
    featureFlags: FeatureFlagsMap | object
  }
}
