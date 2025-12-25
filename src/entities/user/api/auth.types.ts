import type { AgentRole, MerchantManagerRole } from "../model"

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

export interface MerchantManagerMeResponse {
  id: number
  merchantId: number
  profileId: number
  description: string | null
  role: MerchantManagerRole
  position: string | null
  getActNotice: boolean
  territoryCode: number | null
  createdAt: string
  updatedAt: string
  profile: {
    email: string
    firstName: string
    lastName: string | null
    middleName: string | null
    phone: string
    telegramUserId: string | null
    createdAt: string
    photo: {
      id: number
      key: string
      fileName: string
      public: boolean
      type: string
      shrinkedKey: string
      missing: boolean
      createdAt: string
      updatedAt: string
      downloadUrl: string
    } | null
  }
}

export interface AgentMeResponse {
  id: number
  additionalPhone: string | null
  description: string | null
  role: AgentRole
  position: string | null
  profileId: number
  branchId: number
  createdAt: string
  updatedAt: string
  branch: {
    id: number
    name: string
    address: string
    agencyId: number
    createdAt: string
    updatedAt: string
    agency: {
      id: number
      name: string
      categoryId: number
      email: string
      address: string
      blockType: "unblock" | "block"
      postAddress: string | null
      legalAddress: string | null
      externalEmails: string[]
      postIsMainAddress: boolean
      merchantManagerId: number
      createdAt: string
      updatedAt: string
    }
  }
  profile: {
    id: number
    email: string
    firstName: string
    lastName: string | null
    middleName: string | null
    phone: string
    isDeleted: boolean
    telegramUserId: string | null
    fileId: number | null
    createdAt: string
    updatedAt: string
    photo: {
      id: number
      key: string
      fileName: string
      public: boolean
      type: string
      shrinkedKey: string
      missing: boolean
      createdAt: string
      updatedAt: string
      downloadUrl: string
    } | null
  }
}
