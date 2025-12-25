// ==================== РОЛИ И ПРАВА ====================
export type MerchantManagerRole =
  | "merchant_manager" // Менеджер ОПП
  | "merchant_sales_manager" // Сотрудник ОП
  | "mortgage_manager" // Ипотечный менеджер
  | "sales_dept_manager" // Руководитель управления продаж
  | "head_of_sales" // Начальник отдела продаж

export type AgentRole =
  | "agency_admin" // Администратор (агентства)
  | "manager_branch" // Менеджер (офиса)
  | "agent" // Агент

export type UserRole = MerchantManagerRole | AgentRole

// ==================== БАЗОВЫЕ ИНТЕРФЕЙСЫ ====================
interface Photo {
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
}

interface Profile {
  id?: number
  email: string
  firstName: string
  lastName: string | null
  middleName: string | null
  phone: string
  telegramUserId: string | null
  isDeleted?: boolean
  fileId?: number | null
  createdAt: string
  updatedAt: string
  photo: Photo | null
}

interface Agency {
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

interface Branch {
  id: number
  name: string
  address: string
  agencyId: number
  createdAt: string
  updatedAt: string
  agency: Agency
}

// ==================== КОНКРЕТНЫЕ ТИПЫ ПОЛЬЗОВАТЕЛЕЙ ====================
interface MerchantManagerBase {
  id: number
  profileId: number
  description: string | null
  role: MerchantManagerRole
  position: string | null
  getActNotice: boolean
  territoryCode: number | null
  createdAt: string
  updatedAt: string
  profile: Profile
}

interface MerchantManager extends MerchantManagerBase {
  merchantId: number
}

interface MerchantSalesManager extends MerchantManagerBase {
  merchantId: number
}

interface MortgageManager extends MerchantManagerBase {
  merchantId: number
}

interface SalesDeptManager extends MerchantManagerBase {
  merchantId: number
}

interface HeadOfSales extends MerchantManagerBase {
  merchantId: number
}

interface AgentBase {
  id: number
  additionalPhone: string | null
  description: string | null
  role: AgentRole
  position: string | null
  profileId: number
  branchId: number
  createdAt: string
  updatedAt: string
  branch: Branch
  profile: Profile
}

interface AgencyAdmin extends AgentBase {
  role: "agency_admin"
}

interface ManagerBranch extends AgentBase {
  role: "manager_branch"
}

interface Agent extends AgentBase {
  role: "agent"
}

// ==================== ОБЪЕДИНЕННЫЕ ТИПЫ ====================
export type MerchantManagerUser =
  | MerchantManager
  | MerchantSalesManager
  | MortgageManager
  | SalesDeptManager
  | HeadOfSales

export type AgentUser = AgencyAdmin | ManagerBranch | Agent

export type User = MerchantManagerUser | AgentUser
