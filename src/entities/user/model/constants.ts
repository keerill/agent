import type { AgentRole, MerchantManagerRole, UserRole } from "./types"

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  merchant_manager: "Менеджер ОПП",
  merchant_sales_manager: "Сотрудник ОП",
  mortgage_manager: "Ипотечный менеджер",
  sales_dept_manager: "Руководитель управления продаж",
  head_of_sales: "Начальник отдела продаж",
  agency_admin: "Администратор агентства",
  manager_branch: "Менеджер офиса",
  agent: "Агент",
}

export const MERCHANT_MANAGER_ROLES: MerchantManagerRole[] = [
  "merchant_manager",
  "merchant_sales_manager",
  "mortgage_manager",
  "sales_dept_manager",
  "head_of_sales",
]

export const AGENT_ROLES: AgentRole[] = [
  "agency_admin",
  "manager_branch",
  "agent",
]

export const USER_ROLE_GROUPS = {
  MERCHANT_MANAGEMENT: [
    "merchant_manager",
    "merchant_sales_manager",
  ] as MerchantManagerRole[],
  MORTGAGE_MANAGEMENT: ["mortgage_manager"] as MerchantManagerRole[],
  SALES_MANAGEMENT: [
    "sales_dept_manager",
    "head_of_sales",
  ] as MerchantManagerRole[],
  AGENCY_MANAGEMENT: ["agency_admin", "manager_branch"] as AgentRole[],
  AGENTS: ["agent"] as AgentRole[],
} as const
