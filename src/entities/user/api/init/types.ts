import type { AgentRole, MerchantManagerRole } from "../../model"

export interface AuthMeResponse {
  exp: number
  iat: number
  jti: string
  iss: string
  aud: string
  sub: string
  typ: "Bearer"
  azp: string
  session_state: string
  acr: string
  "allowed-origins": string[]
  realm_access: {
    roles: string[]
  }
  resource_access: {
    account: {
      roles: string[]
    }
  }
  scope: string
  sid: string
  email_verified: boolean
  preferred_username: string
  email: string
  role: MerchantManagerRole | AgentRole
  profileId: number
}
