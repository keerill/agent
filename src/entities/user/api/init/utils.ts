import {
  MERCHANT_MANAGER_ROLES,
  type MerchantManagerRole,
  type UserRole,
} from "../../model"

export const getMeEndpoint = (role: UserRole) => {
  return MERCHANT_MANAGER_ROLES.includes(role as MerchantManagerRole) ?
      "/merchant-manager/me"
    : "/agent/me"
}
